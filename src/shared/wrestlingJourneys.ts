import type { WrestlingJourneyTemplate, WrestlingJourneyStepInput } from './types'
// Frozen template keys. Dates identify these selected broadcasts/matches, not a complete career.
const taker =
  'https://www.wwe.com/shows/wwe-super-show-down/article/every-match-in-the-undertaker-triple-h-rivalry-timeline'
const bret = 'https://www.wwe.com/wwe-network-november-2017-collections'
const beat = (
  title: string,
  stepDate: string,
  notes: string,
  sourceUrl: string,
  kind: 'match' | 'segment' = 'match'
): WrestlingJourneyStepInput => ({ title, stepDate, notes, sourceUrl, kind, linkedId: null })
export const WRESTLING_JOURNEYS: WrestlingJourneyTemplate[] = [
  {
    key: 'undertaker-triple-h-essential',
    title: 'The Undertaker and Triple H',
    description:
      'Seven selected meetings and a challenge, from early encounters to WrestleMania XXVIII. Link each step to your imported card or local copy. This is a focused journey, not every match in their rivalry.',
    entries: [
      beat(
        'Kuwait Cup semifinal: Undertaker vs Triple H',
        '1996-05-12',
        'An early singles encounter, years before their WrestleMania series.',
        taker
      ),
      beat(
        'Shotgun Saturday Night: Penn Station',
        '1997-02-08',
        'Their televised confrontation carries the action into an unusual station setting.',
        taker
      ),
      beat(
        'WrestleMania X-Seven: Undertaker vs Triple H',
        '2001-04-01',
        'Their first WrestleMania meeting turns into a fight around the arena.',
        'https://www.wwe.com/shows/wrestlemania/17/results'
      ),
      beat(
        'King of the Ring 2002: Undertaker vs Triple H',
        '2002-06-23',
        'The rivalry moves to an Undisputed Championship match.',
        'https://www.wwe.com/article/undertaker-triple-h-storied-rivalry-chronicled-in-new-wwe-network-collection'
      ),
      beat(
        'SmackDown: Undertaker vs Triple H',
        '2008-10-24',
        'A later television meeting bridges their earlier rivalry and the WrestleMania rematches.',
        taker
      ),
      beat(
        'WrestleMania XXVII: Undertaker vs Triple H',
        '2011-04-03',
        'Triple H challenges the Streak in a punishing No Holds Barred match.',
        'https://www.wwe.com/shows/wrestlemania/27/undertaker-tripleh'
      ),
      beat(
        'Raw: Triple H accepts the challenge',
        '2012-02-20',
        'The conversation about Shawn Michaels helps turn a proposed rematch into Hell in a Cell.',
        'https://www.wwe.com/shows/raw/2012-02-20/results',
        'segment'
      ),
      beat(
        'WrestleMania XXVIII: End of an Era',
        '2012-04-01',
        'Shawn Michaels referees the Hell in a Cell rematch, linking all three men’s recent WrestleMania stories.',
        'https://www.wwe.com/shows/wrestlemania/28/undertaker-triple-h-hell-in-a-cell'
      )
    ]
  },
  {
    key: 'bret-shawn-essential',
    title: 'Bret Hart and Shawn Michaels',
    description:
      'A focused seven-step path through early title contests, the WrestleMania Iron Man match, Montreal and reconciliation. TV segments and unimported matches can be linked manually.',
    entries: [
      beat(
        'Ottawa: Intercontinental Championship match',
        '1992-06-03',
        'An early title meeting establishes the pair before their world-title rivalry.',
        bret
      ),
      beat(
        'Bret Hart vs Shawn Michaels: Ladder Match',
        '1992-07-21',
        'The Intercontinental Championship supplies the stakes for their early ladder encounter.',
        bret
      ),
      beat(
        'Survivor Series 1992: Bret Hart vs Shawn Michaels',
        '1992-11-25',
        'Their rivalry reaches the world-title main event.',
        bret
      ),
      beat(
        'Survivor Series 1993: Hart family vs Shawn and the Knights',
        '1993-11-24',
        'The rivalry expands into an elimination team match with Bret’s family.',
        bret
      ),
      beat(
        'WrestleMania XII: Iron Man Match',
        '1996-03-31',
        'The sixty-minute championship match continues into sudden-death overtime.',
        'https://www.wwe.com/shows/wrestlemania/12/mainevent'
      ),
      beat(
        'Survivor Series 1997: Montreal',
        '1997-11-09',
        'The disputed finish becomes the defining rupture in their rivalry.',
        'https://www.wwe.com/shows/survivorseries/history/1997/mainevent'
      ),
      beat(
        'Raw: Bret and Shawn reconcile',
        '2010-01-04',
        'Their face-to-face discussion closes this journey with a handshake and embrace.',
        'https://www.wwe.com/shows/raw/archive/01042010/mainarticle',
        'segment'
      )
    ]
  }
]
