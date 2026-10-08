import { createGunzip } from 'zlib'
import { updateActivity } from './progress'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { streamResponseToFile } from './streamDownload'

// The offline games catalogs ship as gzipped SQLite assets on GitHub
// PRERELEASES of this repo (prerelease so electron-updater's /releases/latest
// never sees them). Install is stage-validate-swap: the expanded file lands
// beside the target, must pass `inspect`, and only then replaces the old one,
// so a bad download can never destroy an installed catalog.
const GITHUB_OWNER = 'Xamiru'
const GITHUB_REPO = 'NaviHUB'
const GH_HEADERS = { 'user-agent': 'NaviHUB' }

export interface CatalogReleaseSpec {
  tag: string
  asset: string
  target: string
  label: string
  maxArchiveBytes: number
  maxDatabaseBytes: number
  timeoutMs: number
  inspect: (tmpPath: string) => void
  // Releases the open handle on the old file just before the swap.
  close: () => void
}

export async function installCatalogRelease(spec: CatalogReleaseSpec): Promise<void> {
  const relRes = await fetchWithRetry(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${spec.tag}`,
    {
      headers: { ...GH_HEADERS, accept: 'application/vnd.github+json' },
      timeoutMs: 20_000,
      maxResponseBytes: MAX_API_RESPONSE_BYTES
    }
  )
  if (!relRes.ok) {
    throw new Error(`Catalog release not found (${relRes.status}) — has ${spec.tag} been published?`)
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const rel = (await relRes.json()) as any
  const asset = (rel?.assets ?? []).find((a: any) => a?.name === spec.asset)
  if (!asset?.browser_download_url) {
    throw new Error(`The ${spec.tag} release has no ${spec.asset} download.`)
  }

  updateActivity({ phase: 'fetching' })
  const dlRes = await fetchWithRetry(String(asset.browser_download_url), {
    headers: GH_HEADERS,
    timeoutMs: spec.timeoutMs
  })
  if (!dlRes.ok) throw new Error(`Catalog download failed (${dlRes.status})`)
  let progressMark = 0
  await streamResponseToFile(dlRes, spec.target, {
    label: spec.label,
    maxInputBytes: spec.maxArchiveBytes,
    maxOutputBytes: spec.maxDatabaseBytes,
    transform: createGunzip(),
    replace: true,
    onProgress: (done, total) => {
      // Keep progress responsive without churning the task row for every small
      // network chunk. Completion is surfaced by the writing phase below.
      if (done === 0 || done === total || done - progressMark >= 512 * 1024) {
        progressMark = done
        updateActivity({ phase: 'fetching', done, total })
      }
    },
    validateTemp: (tmp) => {
      spec.inspect(tmp)
    },
    beforeCommit: () => {
      updateActivity({ phase: 'writing' })
      spec.close()
    }
  })
}
