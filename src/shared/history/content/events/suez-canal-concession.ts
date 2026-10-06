import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'suez-canal-concession',
  names: [
    { text: 'Suez Canal concession', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1854' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Abbas Hilmi I, 1848-54 and Said, 1854-63', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 3,
  participants: [
    {
      name: 'Said',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Abbas Hilmi I, 1848-54 and Said, 1854-63', para: '3' }
        }
      ]
    },
    {
      name: 'Ferdinand de Lesseps',
      role: 'organizer',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Abbas Hilmi I, 1848-54 and Said, 1854-63', para: '3' }
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
          text: 'Said was a friend of the French engineer Ferdinand de Lesseps, to whom he granted a concession in 1854 to construct a canal from the Red Sea to the Mediterranean.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Abbas Hilmi I, 1848-54 and Said, 1854-63', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/22.htm' }
        },
        {
          id: 'q2',
          text: 'The Suez Canal Company was organized to undertake the construction, and the concession to the company included two items that proved costly for Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Abbas Hilmi I, 1848-54 and Said, 1854-63', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/22.htm' }
        },
        {
          id: 'q3',
          text: 'Second, the viceroy undertook to supply labor for the canal\'s construction, in what amounted to a system of forced labor.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Abbas Hilmi I, 1848-54 and Said, 1854-63', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/22.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'In addition, the French, who, like other European powers, sought to shorten the trip between Europe and Asia, funded most of the construction.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        },
        {
          id: 'q5',
          text: 'Completion of the 160- kilometer long waterway, however, took ten years of excruciating and poorly compensated labor by Egyptian workers, who were drafted at the rate of 20,000 every ten months from the ranks of the peasantry.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        },
        {
          id: 'q6',
          text: 'The canal was opened to navigation in November 1869 under a concession to Britain and France scheduled to expire in 1968.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '2' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Civil_engineering%3B_work_on_the_Suez_canal._Wood_engraving_by_Wellcome_V0024392.jpg/1280px-Civil_engineering%3B_work_on_the_Suez_canal._Wood_engraving_by_Wellcome_V0024392.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Civil_engineering;_work_on_the_Suez_canal._Wood_engraving_by_Wellcome_V0024392.jpg',
    credit: { institution: 'Wellcome Collection' },
    license: { id: 'cc-by', version: '4.0' }
  },
  related: [
    { ref: 'event:opening-of-the-suez-canal', rel: 'followed-by' }
  ]
})
