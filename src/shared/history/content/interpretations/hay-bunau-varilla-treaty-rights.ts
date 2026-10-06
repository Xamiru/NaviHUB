import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'hay-bunau-varilla-treaty-rights',
  about: ['event:separation-of-panama-from-colombia', 'event:construction-of-the-panama-canal'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Major disagreements arose concerning the rights granted to the United States by the treaty of 1903 and the Panamanian constitution of 1904.',
    lang: 'en',
    cite: {
      source: 'loc-panama-country-study-1987',
      loc: { section: 'The 1903 Treaty and Qualified Independence', para: '8' }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
  },
  positions: [
    {
      id: 'united-states',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The United States government subsequently interpreted these rights to mean that the United States could exercise complete sovereignty over all matters in the Canal Zone.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    },
    {
      id: 'panama',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Panama' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Panama, although admitting that the clauses were vague and obscure, later held that the original concession of authority related only to the construction, operation, and defense of the canal and that rights and privileges not necessary to these functions had never been relinquished.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    }
  ]
})
