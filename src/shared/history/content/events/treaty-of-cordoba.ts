import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-cordoba',
  names: [
    { text: 'Treaty of Córdoba', lang: 'en', role: 'primary' },
    { text: 'Tratado de Córdoba', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1821-09-27' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  related: [
    { ref: 'event:mexican-war-of-independence', rel: 'preceded-by' }
  ],
  participants: [
    {
      ref: 'person:agustin-de-iturbide',
      role: 'signatory',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Iturbide and the Plan of Iguala', para: '4' }
        }
      ]
    },
    {
      name: 'Vicente Guerrero',
      role: 'participant',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Iturbide and the Plan of Iguala', para: '3' }
        }
      ]
    },
    {
      name: 'Juan Ruiz de Apodaca',
      role: 'participant',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Iturbide and the Plan of Iguala', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Iturbide\'s assignment to the Oaxaca expedition coincided with a successful military coup in Spain against the new monarchy of Ferdinand VII. The coup leaders, who had been assembled as an expeditionary force to suppress the American independence movements, compelled a reluctant Ferdinand to sign the liberal Spanish constitution of 1812.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        },
        {
          id: 'q2',
          text: 'Ironically, independence was finally achieved when conservative forces in the colonies chose to rise up against a temporarily liberal regime in the mother country.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On September 27, 1821, representatives of the Spanish crown and Iturbide signed the Treaty of Córdoba, which recognized Mexican independence under the terms of the Plan of Iguala.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        },
        {
          id: 'q4',
          text: 'Iturbide, a former royalist who had become the paladin for Mexican independence, included a special clause in the treaty that left open the possibility for a criollo monarch to be appointed by a Mexican congress if no suitable member of the European royalty would accept the Mexican crown.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        },
        {
          id: 'q5',
          text: 'The plan was so broadly based that it pleased both patriots and loyalists.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1821-02-24' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Iturbide and the Plan of Iguala', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'While stationed in the town of Iguala, Iturbide proclaimed three principles, or "guarantees," for Mexican independence from Spain: Mexico would be an independent monarchy governed by a transplanted King Ferdinand or some other conservative European prince, criollos and peninsulares would henceforth enjoy equal rights and privileges, and the Roman Catholic Church would retain its privileges and religious monopoly.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Iturbide and the Plan of Iguala', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Tratados_de_C%C3%B3rdoba.JPG/1280px-Tratados_de_C%C3%B3rdoba.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Tratados_de_C%C3%B3rdoba.JPG',
    credit: {
      institution: 'Archivo General de la Nación (Mexico)',
      creator: 'Jaontiveros (photograph)'
    },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
