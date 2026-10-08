import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaties-of-tilsit',
  names: [
    { text: 'Treaties of Tilsit', lang: 'en', role: 'primary' },
    { text: 'Peace of Tilsit', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1807-07-07' },
        cites: [
          {
            source: 'fondation-napoleon-close-up-tilsit',
            loc: { section: 'A close-up on: Tilsit (July 1807)' }
          },
          {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '5' }
          },
          {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '18' }
          }
        ]
      },
      {
        value: { d: '1807-07-08' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1805 – VICTORY AT AUSTERLITZ' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1807-07-09' },
        cites: [
          {
            source: 'fondation-napoleon-close-up-tilsit',
            loc: { section: 'A close-up on: Tilsit (July 1807)' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia', 'iran'],
  prominence: 2,
  places: [
    { ref: 'place:tilsit' }
  ],
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  polities: [
    { ref: 'polity:first-french-empire' },
    { ref: 'polity:kingdom-of-prussia' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'signatory',
      cites: [
        {
          source: 'fondation-napoleon-close-up-tilsit',
          loc: { section: 'A close-up on: Tilsit (July 1807)' }
        }
      ]
    },
    {
      ref: 'person:alexander-i-of-russia',
      role: 'signatory',
      cites: [
        {
          source: 'fondation-napoleon-close-up-tilsit',
          loc: { section: 'A close-up on: Tilsit (July 1807)' }
        }
      ]
    },
    {
      name: 'Frederick William III',
      role: 'signatory',
      cites: [
        {
          source: 'fondation-napoleon-close-up-tilsit',
          loc: { section: 'A close-up on: Tilsit (July 1807)' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-finkenstein',
      rel: 'related',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '12' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Grande Armée’s perfect victory over the Russian Army at Friedland had brought the Polish Campaign to an end. After an armistice signed on 20 June, the Czar Alexander I and the Emperor Napoleon I signed a peace treaty on 7 July, 1807, in the small town of Tilsit. Two days later a second treaty was signed with the Prussian king, Frederick William III.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-close-up-tilsit',
            loc: { section: 'A close-up on: Tilsit (July 1807)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-tilsit-july-1807/'
          }
        },
        {
          id: 'q2',
          text: 'Alexander was forced to sue for peace, and by the Treaty of Tilsit, signed in 1807, he became Napoleon\'s ally.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Prussia was abandoned by its ally Russia and lost territory as a result of the Treaty of Tilsit in 1807. These national humiliations motivated the Prussians to undertake a serious program of social and military reform.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        },
        {
          id: 'q4',
          text: 'An armistice (23 June) was followed by the Treaty of Tilsit (7 July), where Persia’s fate was totally ignored',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/The_Imperial_Embrace_on_the_raft_%28NAPOLEON_141%29.jpeg/1280px-The_Imperial_Embrace_on_the_raft_%28NAPOLEON_141%29.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Imperial_Embrace_on_the_raft_(NAPOLEON_141).jpeg',
    credit: { creator: 'Charles Williams' },
    license: { id: 'public-domain' }
  }
})
