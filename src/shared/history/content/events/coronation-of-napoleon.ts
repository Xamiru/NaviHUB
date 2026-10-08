import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'coronation-of-napoleon',
  names: [
    { text: 'Coronation of Napoleon', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1804-12-02' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'britannica-1911-paris', loc: { section: 'PARIS', para: '357' } }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:first-french-empire' }
  ],
  polities: [
    { ref: 'polity:first-french-empire' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'head-of-state',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
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
          text: 'On 2 December 1804, Napoleon was crowned Emperor of the French. Over 12,000 people were present at the ceremony which lasted for more than four hours in the freezing Cathedral of Notre-Dame.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q2',
          text: 'However, in placing the crown upon his head himself and crowning his own wife Josephine, Napoleon succeeded in reducing the Pope to a simple blessing of the ceremony, thus reaffirming his power in face of the Catholic Church. Napoleon planned every detail of the ceremony which was intended to put him on an equal footing with other European monarchs.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After the foiling of a royalist plot in March 1804, Napoleon suspected that the duke was the instigator. After multiple attempts on his life, Napoleon wanted to put an end to these assassination plots as well as protect himself against any possible return of the Bourbon monarchy. The duke was arrested and, after a quick trial, executed on 21 March. His death gave rise to cries of protest in every royal court in Europe.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/1280px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg',
    credit: { creator: 'Jacques-Louis David' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'tulard-1986-napoleon-ou-le-mythe-du-sauveur', perspective: 'european' },
    { source: 'lentz-2002-nouvelle-histoire-du-premier-empire', perspective: 'european' }
  ]
})
