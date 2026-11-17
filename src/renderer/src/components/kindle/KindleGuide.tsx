import type { ReactNode } from 'react'

// The Kindle page's how-to: what NaviHUB does with the Kindle, how to connect
// it on each machine, and what each import rule means. Collapsed by default so
// the page stays a tool; every part opens on its own.

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="rounded border border-line-subtle px-3 py-2">
      <summary className="cursor-pointer text-sm font-medium">{title}</summary>
      <div className="mt-2 space-y-2 text-sm text-gray-300">{children}</div>
    </details>
  )
}

export default function KindleGuide() {
  return (
    <section className="mb-6" aria-label="How the Kindle page works">
      <h2 className="label mb-2">How it works</h2>
      <div className="space-y-2">
        <Part title="What NaviHUB does with your Kindle">
          <p>
            It reads KOReader&apos;s files: reading progress, finished status, highlights and reading time. Nothing
            is read until you press Check Kindle. The only thing that writes to the Kindle is Send to Kindle, and only
            into its own NaviHUB folder.
          </p>
          <p>
            Import from Kindle shows a preview with a checkbox for every change. Only what you tick is written to
            your library, and Undo last import puts it back, except anything you have changed since.
          </p>
          <p>
            Each check keeps a copy of KOReader&apos;s data in the <code>kindle/snapshots</code> folder inside
            NaviHUB&apos;s data folder (<code>~/.config/navihub</code> on Linux, <code>%APPDATA%\navihub</code> on
            Windows). The newest ten are kept, plus the largest older one, so a reset Kindle never pushes out the last full
            copy. If KOReader&apos;s data is ever lost, a copy is there.
          </p>
        </Part>

        <Part title="Connecting the Kindle">
          <p>
            <strong>Linux:</strong> plug the Kindle in with USB and unlock it. When it shows up in the file manager,
            press Check Kindle.
          </p>
          <p>
            <strong>Windows:</strong> NaviHUB cannot read the Kindle directly yet. With Explorer, copy the
            Kindle&apos;s <code>documents</code> and <code>koreader</code> folders into one folder on the PC, then
            choose that folder under Copied Kindle folder below. A connected Kindle is always used first.
          </p>
          <p>
            To help build direct Windows access, run the read-only probe once with the Kindle plugged in:{' '}
            <code>powershell -NoProfile -ExecutionPolicy Bypass -File scripts\kindle-probe.ps1</code> from the
            NaviHUB folder. It changes nothing on the Kindle and prints where it saved its result.
          </p>
        </Part>

        <Part title="Books">
          <p>
            Open a book once in KOReader so it has a fingerprint, then link it to a book in your library. Books sent
            from NaviHUB will link by themselves.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Progress comes from KOReader&apos;s percentage and the library&apos;s page count, and only moves forward.</li>
            <li>
              A book becomes completed only when KOReader marks it finished (Book status, Finished), not at 99%.
              KOReader&apos;s On hold is offered unticked.
            </li>
            <li>Every highlight becomes a quote, with the chapter and your KOReader note. A quote you delete never comes back.</li>
            <li>
              Reading time shows on the book&apos;s page. A day with 5 minutes or more ticks the checklist&apos;s
              Read a book item once.
            </li>
          </ul>
        </Part>

        <Part title="Manga">
          <p>
            Each folder of comic files under the Kindle&apos;s <code>documents</code> folder is a series. Link the
            series to a manga in your library; suggestions also match your manga&apos;s local folder names.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              A chapter counts as read when KOReader marked it finished or you reached its last page. A chapter in
              several parts counts when every part is read.
            </li>
            <li>Progress is the highest chapter read, and only moves forward.</li>
            <li>
              When chapter numbers start again in each volume (Vol 02 Ch 001), chapters are counted in order and
              offered unticked, because a missing chapter would shift the count. Check the number before ticking.
            </li>
            <li>Whole-volume files are listed but never turned into chapters; set those on the manga page.</li>
            <li>Reading time shows on the manga page. It does not tick the checklist, whose manga item adds chapters itself.</li>
          </ul>
        </Part>

        <Part title="Looked-up words">
          <p>
            Words you look up in KOReader are offered in Import from Kindle, each with the sentence you read it in
            and the book. English words go to the English deck; Japanese words go to the Japanese mining inbox.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Meanings come from the offline dictionaries. For English, install the English dictionary in Settings,
              Learning; a word with no entry can still be added by typing its meaning.
            </li>
            <li>A word is offered once: not again after it is imported, and not when it is already in a deck.</li>
            <li>A word made only of kanji is offered for Japanese only if the Japanese dictionary has that exact word.</li>
            <li>Undo removes a word only if you have not reviewed or edited it since.</li>
          </ul>
        </Part>

        <Part title="Making books for the Kindle">
          <p>
            Make a book builds an EPUB of your quotes or of a Japanese reading level on this computer. Send to
            Kindle copies it to a connected Kindle; Show in folder opens it if you would rather copy it yourself.
          </p>
        </Part>

        <Part title="Sending books to the Kindle">
          <p>
            Send to Kindle is on a book&apos;s page (for books with a local EPUB) and beside each book you made. It
            works with the Kindle connected to this computer by USB; on Windows it is not available yet.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Books go into <code>documents/NaviHUB</code> on the Kindle. Nothing outside that folder is touched, and
              nothing already there is replaced: a second copy gets a new name, such as Dune (2).
            </li>
            <li>
              Each file is read back after copying and compared byte for byte. A copy that does not match is removed
              again.
            </li>
            <li>
              A send keeps at least 1 GB and a tenth of the Kindle free, because KOReader needs room for its own
              files.
            </li>
            <li>
              If NaviHUB quits mid-copy, the book appears under Unfinished sends; Check and clean up removes the
              partial file. NaviHUB never deletes a book from the Kindle otherwise; remove books on the Kindle
              itself.
            </li>
            <li>A book sent from its page links to that book by itself, so its progress imports with no linking.</li>
          </ul>
        </Part>
      </div>
    </section>
  )
}
