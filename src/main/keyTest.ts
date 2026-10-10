// IO half of Settings → Accounts & keys "Test": read the SAVED key, send the
// probe keyTestCore describes, and interpret the answer. The renderer never
// holds a key (inputs are always blank), so the test cannot use a draft.

import type { KeyTestResult } from '@shared/types'
import type { TestableKey } from '@shared/keyTests'
import { fetchWithRetry } from './http'
import * as settingsRepo from './repos/settingsRepo'
import { interpretProbe, probeFor } from './keyTestCore'

const PROBE_TIMEOUT_MS = 15_000
// The answer is a status line; a provider's model list or config is small.
const PROBE_MAX_BYTES = 2 * 1024 * 1024

export async function testKey(key: TestableKey): Promise<KeyTestResult> {
  const secret = settingsRepo.get(key)?.trim()
  if (!secret) return { ok: false, message: 'No key is saved yet.' }
  const raUsername = settingsRepo.get('ra.username')?.trim() ?? ''
  if (key === 'ra.api_key' && !raUsername) {
    return { ok: false, message: 'Save the RetroAchievements username first.' }
  }

  const probe = probeFor(key, secret, { raUsername })
  let res: Response
  try {
    // One attempt and no 429 wait: the user is watching a button.
    res = await fetchWithRetry(
      probe.url,
      {
        method: probe.method,
        headers: probe.headers,
        body: probe.body,
        timeoutMs: PROBE_TIMEOUT_MS,
        rateLimitWaits: 0,
        maxResponseBytes: PROBE_MAX_BYTES
      },
      0
    )
  } catch {
    return { ok: false, message: `Could not reach ${probe.service}. Check the connection.` }
  }
  let body: unknown = null
  try {
    body = await res.json()
  } catch {
    body = null
  }
  return interpretProbe(key, probe.service, res.status, body)
}
