// A one-line readout for changes made from the keyboard (volume, speed,
// subtitle delay, track switches), which otherwise happen with nothing on
// screen. The live region stays mounted so a screen reader hears each change;
// the plate itself shows only while there is text. No animation, so reduced
// motion needs no special case.
export default function VideoOsd({ text }: { text: string | null }): JSX.Element {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[18%] z-20 -translate-x-1/2"
      role="status"
      aria-live="polite"
    >
      {text && (
        <p className="media-contrast rounded bg-base-900/90 px-4 py-2 text-sm tabular-nums text-gray-100">
          {text}
        </p>
      )}
    </div>
  )
}
