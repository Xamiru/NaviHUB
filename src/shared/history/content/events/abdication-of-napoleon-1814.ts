import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'abdication-of-napoleon-1814',
  names: [
    { text: 'First abdication of Napoleon', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1814-04-06' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:elba',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
        }
      ]
    }
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
          loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'On 6 April, Napoleon was forced to sign an abdication without being able to impose his conditions. He realized that he had lost the support of his marshals and of a portion of the population, exhausted as they were by years of war and conscription.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-napodoc-french-campaign',
            loc: { section: 'The Abdication', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/the-french-campaign/'
          }
        },
        {
          id: 'q1',
          text: 'He was exiled to the island of Elba and Louis XVIII was restored to the Bourbon throne.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
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
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1814-03-31' },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'Despite French victories at Brienne (29 January), Champaubert (10 February) and Montmirail (11 February) in the face of much larger enemy forces, Napoleon could not prevent the invading coalition from entering Paris on 31 March 1814. When he learned of the capitulation of the capital, he made a U-turn and headed for the Chateau de Fontainebleau, the nearest Imperial residence.',
        lang: 'en',
        cite: {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1814-04-02' },
            cites: [
              {
                source: 'fondation-napoleon-timeline-consulate-first-empire',
                loc: {
                  section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'On 2 April, the Senate voted in favour of deposing the Emperor, and at Fontainebleau Napoleon abdicated, in favour of his son, Napoleon II. But by 6 April, the abdication was unconditional.',
        lang: 'en',
        cite: {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Adieux_de_Fontainebleau_-_estampe_-_btv1b69540860.jpg/1280px-Adieux_de_Fontainebleau_-_estampe_-_btv1b69540860.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Adieux_de_Fontainebleau_-_estampe_-_btv1b69540860.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Jean-Pierre-Marie Jazet' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'lentz-2002-nouvelle-histoire-du-premier-empire', perspective: 'european' },
    { source: 'tulard-1986-napoleon-ou-le-mythe-du-sauveur', perspective: 'european' }
  ]
})
