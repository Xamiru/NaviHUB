import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-timur',
  names: [
    { text: 'Death of Timur', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1405-02-17' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:otrar',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
      ]
    },
    {
      ref: 'place:samarkand',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'participant',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
      ]
    }
  ],
  related: [
    { ref: 'event:timurid-succession-war', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Death of Timur. Accession of his son Šāhroḵ, a peace-loving prince, to the reduced Timurid Empire.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        },
        {
          id: 'q2',
          text: 'He was planning the conquest of China, and to that purpose he moved with 200,000 men towards the Jaxartes (Syr Daryā), but he fell ill and died in 1405.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Markham, in his introduction to the narrative of Clavijo’s embassy, states that his body “was embalmed with musk and rose water, wrapped in linen, laid in an ebony coffin and sent to Samarkand, where it was buried.”',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
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
            value: { d: '1405-02-17' },
            cites: [
              { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Another was projected against China, but the old warrior was attacked by fever and ague when encamped on the farther side of the Sihon (Syr-Daria) and died at Atrār (Otrar) on the 17th of February 1405.',
        lang: 'en',
        cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Gur-e_Amir_01.jpg/1280px-Gur-e_Amir_01.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gur-e_Amir_01.jpg',
    credit: { creator: 'Bgag' },
    license: { id: 'cc0' }
  }
})
