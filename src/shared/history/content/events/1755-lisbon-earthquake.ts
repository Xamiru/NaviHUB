import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1755-lisbon-earthquake',
  names: [
    { text: '1755 Lisbon earthquake', lang: 'en', role: 'primary' },
    {
      text: 'great earthquake of Lisbon',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1755-11-01' },
        cites: [
          { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:lisbon',
      cites: [
        { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Marquess of Pombal',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '173' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 30000, max: 40000 },
            cites: [
              { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'For many centuries the city had suffered from earthquakes, and on the 1st of November 1755 the greater part of it was reduced almost in an instant to a heap of ruins.',
          lang: 'en',
          cite: { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lisbon'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'Lisbon is built in a geological basin of Tertiary formation, the upper portion of which is loose sand and gravel destitute of organic remains, while below these are the so-called Almada beds of yellow sand, calcareous sandstone and blue clay rich in organic remains.',
          lang: 'en',
          cite: { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lisbon'
          }
        },
        {
          id: 'q3',
          text: 'It was found that no building on the blue clay escaped destruction, none on any of the Tertiary deposits escaped serious injury, and all on the hippurite limestone and basalt were undamaged.',
          lang: 'en',
          cite: { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lisbon'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'A tidal wave at the same time broke over the quays and wrecked the shipping in the Tagus; fire broke out to complete the work of destruction; between 30,000 and 40,000 persons lost their lives; and the value of the property destroyed was about £20,000,000.',
          lang: 'en',
          cite: { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lisbon'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'A triumphal arch on the north side leads to Rua Augusta, originally intended to be the cloth-merchants’ street; for the plan upon which Lisbon was rebuilt after 1755 involved the restriction of each industry to a specified area.',
          lang: 'en',
          cite: { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lisbon'
          }
        },
        {
          id: 'q6',
          text: 'The unity of Portuguese history is hard to perceive in the years which witnessed the rise and fall of the Pombaline régime, the reign of the mad queen Maria, the Peninsular War and the subsequent chaos of revolutionary intrigue.',
          lang: 'en',
          cite: { source: 'britannica-1911-portugal', loc: { section: 'Portugal', para: '172' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Portugal'
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
            value: { d: '1755-11-01' },
            cites: [
              { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The shock was felt from Scotland to Asia Minor.',
        lang: 'en',
        cite: { source: 'britannica-1911-lisbon', loc: { section: 'Lisbon', para: '15' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lisbon'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/1755_S%C3%A9_de_Lisboa.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1755_S%C3%A9_de_Lisboa.jpg',
    credit: { institution: 'Biblioteca Nacional de Portugal (PURL.pt)', creator: 'João Pedroso' },
    license: { id: 'public-domain' }
  }
})
