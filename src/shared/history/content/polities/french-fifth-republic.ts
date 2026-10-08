import { definePolity } from '../../schema'

export default definePolity({
  id: 'french-fifth-republic',
  names: [
    { text: 'French Fifth Republic', lang: 'en', role: 'primary' },
    { text: 'Cinquième République', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1958-10-04' },
        cites: [
          { source: 'elysee-rene-coty', loc: { section: 'René Coty: 4 octobre 1958' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'France (code 220), capital Paris' } }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:french-fourth-republic' }
  ],
  cshapes: [
    { set: 'world', code: 220, from: 1958.76 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Generaal_De_Gaulle%2C_Bestanddeelnr_909-5671.jpg/1280px-Generaal_De_Gaulle%2C_Bestanddeelnr_909-5671.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Generaal_De_Gaulle,_Bestanddeelnr_909-5671.jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Constitution of 1958 is the one that governs our modern-day political system.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-4-october-1958',
            loc: { section: 'Constitution of 4 October 1958', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/constitution-of-4-october-1958'
          }
        },
        {
          id: 'q2',
          text: 'While it is based on the Constitution of 1946, the 1958 Constitution is different, as its purpose was to strengthen executive power and stabilize the government, making it more difficult for the Assembly to overthrow.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-4-october-1958',
            loc: { section: 'Constitution of 4 October 1958', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/constitution-of-4-october-1958'
          }
        },
        {
          id: 'q3',
          text: 'France shall be an indivisible, secular, democratic and social Republic.',
          lang: 'en',
          cite: { source: 'elysee-constitution-of-4-october-1958', loc: { section: 'Article 1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/constitution-of-4-october-1958'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Confronted with the resulting instable government, it was necessary to give the Republic a more solid basis than that of 1946. An informal committee, set up by General de Gaulle, started working on it beginning on 4 June 1958, and its preparatory work was then used by a constitutional consultative committee which started work on 15 July 1958.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-4-october-1958',
            loc: { section: 'Constitution of 4 October 1958', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/constitution-of-4-october-1958'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The key role of the President of the Republic, while partly codified by the constitution, is also the result of the history of the Fifth Republic. Its institutional importance was increased firstly by how Charles de Gaulle embodied the role, bringing his political and historic aura to it, and secondly by the establishment of the election of President of the Republic through direct universal suffrage starting in 1962.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-4-october-1958',
            loc: { section: 'Constitution of 4 October 1958', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/constitution-of-4-october-1958'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'berstein-1989-la-france-de-lexpansion', perspective: 'european' }
  ]
})
