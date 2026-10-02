import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { FX_ART } from '../../lib/themeFxArt'
import {
  clearCompletionFx,
  clearProgressFx,
  getCompletionFx,
  getProgressFx,
  subscribeProgressFx
} from '../../lib/themeFx'
import { mediaUrl } from '@shared/mediaUrl'
import { usePlayerControls } from '../../lib/player'
import { useAppTheme } from '../../lib/useAppTheme'
import { prefersReducedMotion, TypedText } from './ThemeText'

// Theme effects that are not tied to one component: Lain's page-change glitch,
// Miku's progress judgement and beat pulse, the Twin Peaks idle curtains,
// Seinfeld's completion dance and idle gang, Berserk's Dragonslayer strike and
// idle Eclipse, One Piece's rubber stretch, bounty poster and island cutaways,
// JoJo's Stand cry and To Be Continued freeze, and the round-2 moments for the
// older themes (progress tallies, completion cards and idle screens). Everything here is decorative, pointer-transparent, hidden
// from assistive technology, and never delays the route (the new page is
// already rendered underneath). The one exception is the completion notice: the
// card and bounty poster announce the finished title as a status, since nothing
// else does.
export default function ThemeFx() {
  const { theme, variant } = useAppTheme()
  return (
    <>
      {theme === 'lain' && <RouteTransition />}
      {theme === 'lain' && <ProgressTally className="lain-nodes" lead={FX_ART.lainProtocol7} caption={(n) => `NODE ${String(n).padStart(2, '0')}`} />}
      {theme === 'lain' && (
        <CompletionCard className="lain-done" art={FX_ART.lainBear}>
          {() => <b className="lain-done-line"><TypedText text="Close the world, open the nExt." speed={28} /></b>}
        </CompletionCard>
      )}
      {theme === 'lain' && <IdleArt className="idle-art-lain" src={FX_ART.lainWiresDusk} />}
      {theme === 'metal-gear' && <WeaponWindow />}
      {theme === 'metal-gear' && (
        <CompletionCard className="mgs-done" art={FX_ART.mgsFoxhound}>
          {() => <b className="mgs-done-line">MISSION COMPLETE</b>}
        </CompletionCard>
      )}
      {theme === 'metal-gear' && <IdleArt className="idle-art-mgs" src={FX_ART.mgsTitle} />}
      {theme === 'miku' && (
        <CompletionCard
          className="miku-clear"
          footer={
            <span className="miku-clear-singers" aria-hidden="true">
              {(['miku', 'rin', 'len', 'luka', 'kaito', 'meiko'] as const).map((n) => <img key={n} src={FX_ART.mikuSingers[n]} alt="" />)}
            </span>
          }
        >
          {() => <b className="miku-clear-line">CLEAR!</b>}
        </CompletionCard>
      )}
      {theme === 'miku' && <IdleArt className="idle-art-miku" src={FX_ART.mikuConcert} />}
      {theme === 'twin-peaks' && <ProgressTally className="peaks-pie" icon={FX_ART.peaksPie} caption={() => 'Damn fine.'} />}
      {theme === 'twin-peaks' && (
        <CompletionCard className="peaks-done" art={FX_ART.peaksThumbsUp}>
          {() => <b className="peaks-done-line">Damn fine work.</b>}
        </CompletionCard>
      )}
      {theme === 'seinfeld' && (
        <ProgressTally className="seinfeld-mints" lead={FX_ART.sfJuniorMints} icon={FX_ART.sfMint} caption={(n) => (n === 1 ? "Who's gonna turn down a Junior Mint?" : '')} />
      )}
      {theme === 'miku' && <ProgressJudgement />}
      {theme === 'miku' && <BeatPulse />}
      {theme === 'twin-peaks' && <IdleCurtains />}
      {theme === 'seinfeld' && <CompletionDance />}
      {theme === 'seinfeld' && <IdleGang />}
      {theme === 'berserk' && <DragonslayerStrike />}
      {theme === 'berserk' && <IdleEclipse />}
      {theme === 'one-piece' && <RubberStretch />}
      {theme === 'one-piece' && <BountyPoster />}
      {theme === 'one-piece' && <IdleIslands />}
      {theme === 'jojo' && <StandCry cry={variant === 'diamond-is-unbreakable' ? 'DORA' : variant === 'golden-wind' ? 'MUDA' : 'ORA'} />}
      {theme === 'jojo' && <IdleTbc />}
    </>
  )
}

function RouteTransition() {
  const { pathname } = useLocation()
  const previous = useRef(pathname)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    if (!prefersReducedMotion()) setRun((n) => n + 1)
  }, [pathname])
  if (run === 0) return null
  return (
    <div key={run} className="route-fx route-fx-lain" aria-hidden="true" onAnimationEnd={() => setRun(0)} />
  )
}

function ProgressJudgement() {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearProgressFx(fx.id), 1000)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  return (
    <div
      key={fx.id}
      className="miku-judgement"
      style={{ left: fx.x, top: fx.y }}
      aria-hidden="true"
    >
      <img src={FX_ART.mikuNote} alt="" className="miku-judgement-note" />
      <img src={FX_ART.mikuCool} alt="" className="miku-judgement-cool" />
      {fx.combo > 1 && <span className="miku-judgement-combo">{fx.combo} COMBO</span>}
    </div>
  )
}

// A steady penlight pulse while music plays. The app cannot read the track's
// tempo: audio is served over navimg:// without CORS, and analysing it through
// Web Audio would silence playback.
function BeatPulse() {
  const { isPlaying } = usePlayerControls()
  useEffect(() => {
    const root = document.documentElement
    if (!isPlaying || prefersReducedMotion()) return
    let off = 0
    const id = window.setInterval(() => {
      root.dataset.beat = ''
      off = window.setTimeout(() => delete root.dataset.beat, 140)
    }, 500)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(off)
      delete root.dataset.beat
    }
  }, [isPlaying])
  return null
}

export const IDLE_CURTAIN_MS = 10 * 60_000
const ACTIVITY_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'] as const

// After ten minutes without input an idle cover closes over the app (Twin
// Peaks curtains, the Seinfeld gang, the Berserk Eclipse); any input lifts it
// again. The input that wakes it is swallowed so it cannot also press whatever
// sits under the pointer. A hidden window never closes it, and the readers
// (outside the shell) never mount this. `wakes` counts reopenings for a
// wake-up animation.
function useIdleCover(): { closed: boolean; wakes: number } {
  const [closed, setClosed] = useState(false)
  const [wakes, setWakes] = useState(0)
  const closedRef = useRef(false)
  closedRef.current = closed

  useEffect(() => {
    let timer = 0
    const arm = (): void => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (document.hidden) arm()
        else setClosed(true)
      }, IDLE_CURTAIN_MS)
    }
    const onActivity = (event: Event): void => {
      if (closedRef.current) {
        if (event.type !== 'pointermove') {
          event.preventDefault()
          event.stopPropagation()
        }
        closedRef.current = false
        setClosed(false)
        setWakes((n) => n + 1)
      }
      arm()
    }
    for (const type of ACTIVITY_EVENTS) window.addEventListener(type, onActivity, { capture: true })
    arm()
    return () => {
      window.clearTimeout(timer)
      for (const type of ACTIVITY_EVENTS) window.removeEventListener(type, onActivity, { capture: true })
    }
  }, [])
  return { closed, wakes }
}

export function IdleCurtains() {
  const { closed } = useIdleCover()
  return (
    <div className={`idle-curtains ${closed ? 'idle-curtains-closed' : ''}`} aria-hidden="true" data-testid="idle-curtains">
      <i className="peaks-curtain peaks-curtain-left" style={{ backgroundImage: `url(${FX_ART.peaksCurtain})` }} />
      <i className="peaks-curtain peaks-curtain-right" style={{ backgroundImage: `url(${FX_ART.peaksCurtain})` }} />
    </div>
  )
}

// Seinfeld: the gang bursting into the apartment fills the idle screen, and on
// the way back Kramer's entrance slides across once.
export function IdleGang() {
  const { closed, wakes } = useIdleCover()
  return (
    <>
      <div className={`idle-gang ${closed ? 'idle-gang-closed' : ''}`} aria-hidden="true" data-testid="idle-gang">
        <img className="idle-gang-still" src={FX_ART.sfGang} alt="" />
      </div>
      {wakes > 0 && !prefersReducedMotion() && (
        <img key={wakes} className="idle-gang-kramer" src={FX_ART.sfKramerEntrance} alt="" aria-hidden="true" />
      )}
    </>
  )
}

// Berserk: Miura's Eclipse page slowly darkens the idle screen.
export function IdleEclipse() {
  const { closed } = useIdleCover()
  return <div className={`idle-eclipse ${closed ? 'idle-eclipse-closed' : ''}`} aria-hidden="true" data-testid="idle-eclipse" />
}

// Berserk: logging progress cuts one Dragonslayer slash across the pressed
// control and adds a tally mark (one per log in the combo window, grouped in
// fives). The slash is skipped with reduced motion; the tally still shows.
function DragonslayerStrike() {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearProgressFx(fx.id), 900)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  const marks = '|'.repeat(fx.combo % 5 || 5)
  const fives = Math.floor((fx.combo - 1) / 5) * 5
  return (
    <div key={fx.id} aria-hidden="true">
      {!prefersReducedMotion() && <span className="berserk-strike" style={{ left: fx.x, top: fx.y + 12 }} />}
      <span className="berserk-tally" style={{ left: fx.x, top: fx.y }}>
        {fives > 0 ? `${fives} ${marks}` : marks}
      </span>
    </div>
  )
}

// One Piece: the pressed control stretches like Luffy's arm and snaps back, and
// a piece of meat on the bone joins a tally, one per log in fives. With reduced
// motion only the tally shows.
function RubberStretch() {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    if (fx.el && !prefersReducedMotion()) {
      fx.el.animate(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.7)', offset: 0.35 }, { transform: 'scaleX(1)' }],
        { duration: 450, easing: 'cubic-bezier(.3,1.8,.5,1)' }
      )
    }
    const id = window.setTimeout(() => clearProgressFx(fx.id), 900)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  return (
    <div key={fx.id} className="op-meat" style={{ left: fx.x, top: fx.y }} aria-hidden="true">
      {Array.from({ length: fx.combo % 5 || 5 }, (_, i) => <img key={i} src={FX_ART.opMeat} alt="" />)}
    </div>
  )
}

// One Piece: finishing a title prints its Wanted poster in the corner.
function BountyPoster() {
  const fx = useSyncExternalStore(subscribeProgressFx, getCompletionFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearCompletionFx(fx.id), 5000)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  return (
    <div key={fx.id} className="op-bounty" role="status">
      <b aria-hidden="true">WANTED</b>
      <div className="op-bounty-photo" aria-hidden="true">
        {fx.coverPath && <img src={mediaUrl(fx.coverPath) ?? undefined} alt="" />}
      </div>
      <i aria-hidden="true">DEAD OR ALIVE</i>
      <u>{fx.title}</u>
      <span className="block text-xs">{fx.total}</span>
      <span className="op-bounty-stamp">COMPLETE</span>
    </div>
  )
}

const ISLANDS = [
  ['Water 7', FX_ART.opIslandWater7],
  ['Enies Lobby', FX_ART.opIslandEniesLobby],
  ['Thriller Bark', FX_ART.opIslandThrillerBark],
  ['Amazon Lily', FX_ART.opIslandAmazonLily],
  ['Impel Down', FX_ART.opIslandImpelDown],
  ['Marineford', FX_ART.opIslandMarineford]
] as const

// One Piece: when idle, the show's island cutaways cross-fade, each held a few
// seconds with its name. With reduced motion the first island stays still.
export function IdleIslands() {
  const { closed } = useIdleCover()
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!closed || prefersReducedMotion()) return
    const id = window.setInterval(() => setShown((n) => (n + 1) % ISLANDS.length), 6000)
    return () => window.clearInterval(id)
  }, [closed])
  return (
    <div className={`idle-islands ${closed ? 'idle-islands-closed' : ''}`} aria-hidden="true" data-testid="idle-islands">
      {closed &&
        ISLANDS.map(([name, art], i) => (
          <figure key={name} className={i === shown ? 'idle-island-on' : ''}>
            <img src={art} alt="" />
            <figcaption>{name}</figcaption>
          </figure>
        ))}
    </div>
  )
}

// JoJo: logging progress throws the part's Stand cry beside the pressed
// control, stacking into a rush on quick repeats.
function StandCry({ cry }: { cry: string }) {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearProgressFx(fx.id), 800)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  const rush = Array.from({ length: Math.min(fx.combo, 6) }, () => cry).join(' ')
  return (
    <span key={fx.id} className="jojo-cry" style={{ left: fx.x, top: fx.y }} aria-hidden="true">
      {fx.combo > 1 ? `${rush}!` : rush}
    </span>
  )
}

// JoJo: when idle, the episode ends. The screen drains into the part's
// freeze-frame tint and the To Be Continued arrow slides in.
export function IdleTbc() {
  const { closed } = useIdleCover()
  return (
    <div className={`idle-tbc ${closed ? 'idle-tbc-closed' : ''}`} aria-hidden="true" data-testid="idle-tbc">
      <img src={FX_ART.jjTbcArrow} alt="" />
    </div>
  )
}

// A tally beside the pressed control: one icon per log in the combo window,
// grouped in fives (or dots when there is no icon), with an optional lead image
// and caption. Shared by Lain, Twin Peaks and Seinfeld.
function ProgressTally({ className, icon, lead, caption }: { className: string; icon?: string; lead?: string; caption?: (combo: number) => string }) {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearProgressFx(fx.id), 1100)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  const marks = fx.combo % 5 || 5
  const text = caption?.(fx.combo)
  return (
    <div key={fx.id} className={`progress-tally ${className}`} style={{ left: fx.x, top: fx.y }} aria-hidden="true">
      {lead && <img className="progress-tally-lead" src={lead} alt="" />}
      {Array.from({ length: marks }, (_, i) => (icon ? <img key={i} src={icon} alt="" /> : <i key={i} />))}
      {text && <span>{text}</span>}
    </div>
  )
}

// Metal Gear: the HUD weapon window flashes the new count over its segment bar.
function WeaponWindow() {
  const fx = useSyncExternalStore(subscribeProgressFx, getProgressFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearProgressFx(fx.id), 1200)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  const lit = fx.count != null && fx.total ? Math.round((Math.min(fx.count, fx.total) / fx.total) * 12) : Math.min(12, fx.combo)
  return (
    <div key={fx.id} className="mgs-weapon" style={{ left: fx.x, top: fx.y }} aria-hidden="true">
      <img src={FX_ART.mgsItems.ration} alt="" />
      <div>
        <b>{fx.count != null ? (fx.total ? `${fx.count}/${fx.total}` : String(fx.count)) : `x${fx.combo}`}</b>
        <span className="mgs-weapon-bar">
          {Array.from({ length: 12 }, (_, i) => <i key={i} className={i < lit ? 'on' : ''} />)}
        </span>
      </div>
    </div>
  )
}

// A completion card in the corner for a few seconds: the theme's art, its line
// and the title. Lain, Metal Gear, Miku and Twin Peaks.
function CompletionCard({ className, art, footer, children }: { className: string; art?: string; footer?: ReactNode; children: () => ReactNode }) {
  const fx = useSyncExternalStore(subscribeProgressFx, getCompletionFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearCompletionFx(fx.id), 5000)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  return (
    <div key={fx.id} className={`completion-card ${className}`} role="status">
      {art && <img src={art} alt="" />}
      <span className="min-w-0">
        {children()}
        <span className="block text-sm text-ink">{fx.title} completed.</span>
        {footer}
      </span>
    </div>
  )
}

// A still from the source as the idle cover (Lain's power lines, the MGS1
// title screen, a Miku concert).
export function IdleArt({ className, src }: { className: string; src: string }) {
  const { closed } = useIdleCover()
  return (
    <div
      className={`idle-art ${className} ${closed ? 'idle-art-closed' : ''}`}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden="true"
      data-testid="idle-art"
    />
  )
}

function CompletionDance() {
  const fx = useSyncExternalStore(subscribeProgressFx, getCompletionFx)
  useEffect(() => {
    if (!fx) return
    const id = window.setTimeout(() => clearCompletionFx(fx.id), 5000)
    return () => window.clearTimeout(id)
  }, [fx])
  if (!fx) return null
  return (
    <div key={fx.id} className="seinfeld-dance" role="status">
      <img src={prefersReducedMotion() ? FX_ART.sfElaineStill : FX_ART.sfElaineDance} alt="" />
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Little kicks!</span>
        <span className="block text-sm text-ink">{fx.title} completed.</span>
      </span>
    </div>
  )
}
