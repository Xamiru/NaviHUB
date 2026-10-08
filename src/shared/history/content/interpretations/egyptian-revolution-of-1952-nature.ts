import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'egyptian-revolution-of-1952-nature',
  researched: '2026-10-09',
  about: ['event:egyptian-revolution-of-1952'],
  topic: 'nature',
  positions: [
    {
      id: 'egyptian-state',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Egypt (President Abdel-Fattah El-Sisi)' }
      ],
      statements: [
        {
          id: 'q1',
          text: '“The glorious 23 July was a culmination of a long struggle led by the Egyptian people in defense of their right in a homeland whose head is held high,”',
          lang: 'en',
          cite: {
            source: 'cairo-governorate-2022-07-23-sisi-marks-70th-anniversary-of-july-1952-revolution',
            loc: {
              section: 'Egypt’s president marks 70th anniversary of July 1952 Revolution',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.cairo.gov.eg/en/news/news-eng/2022/ed7d0236a3ac43f3be31886b5728acf2'
          }
        },
        {
          id: 'q2',
          text: 'The revolution had “inspiring contributions to the global movement of decolonization and consolidating the right of peoples to self-determination,”',
          lang: 'en',
          cite: {
            source: 'cairo-governorate-2022-07-23-sisi-marks-70th-anniversary-of-july-1952-revolution',
            loc: {
              section: 'Egypt’s president marks 70th anniversary of July 1952 Revolution',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.cairo.gov.eg/en/news/news-eng/2022/ed7d0236a3ac43f3be31886b5728acf2'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'It was extremely important for the Free Officers to ensure the loyalty of the army if the coup were to succeed.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    },
    {
      id: 'controlled-revolution',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The regime reacted quickly and ruthlessly because it had no intention of encouraging a popular revolution that it could not control.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '7'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    }
  ]
})
