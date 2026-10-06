import { definePerson } from '../../schema'

export default definePerson({
  id: 'miguel-hidalgo',
  names: [
    { text: 'Miguel Hidalgo', lang: 'en', role: 'primary' },
    { text: 'Miguel Hidalgo y Costilla', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1811-07-31' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['cleric', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'It was in this context that a radical criollo parish priest, Miguel Hidalgo y Costilla, was able to lead the first truly widespread insurrection for Mexican independence.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Wars of Independence, 1810-21', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/11.htm' }
        },
        {
          id: 'q2',
          text: 'At the same time, during his seven years at Dolores, Hidalgo promoted discussion groups at his house, where Indians, mestizos, criollos, and peninsulares were welcomed.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Hidalgo was tried as a priest by the Holy Office of the Inquisition and found guilty of heresy and treason. He was later condemned to death. On July 31, 1811, Hidalgo was executed by firing squad. His body was mutilated, and his head was displayed in Guanajuato as a warning to other would- be insurgents.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/General%C3%ADsimo_Miguel_Hidalgo_y_Costilla.png/1280px-General%C3%ADsimo_Miguel_Hidalgo_y_Costilla.png',
    page: 'https://commons.wikimedia.org/wiki/File:General%C3%ADsimo_Miguel_Hidalgo_y_Costilla.png',
    credit: {
      institution: 'Instituto Nacional de Antropología e Historia',
      creator: 'Joaquín Ramírez'
    },
    license: { id: 'public-domain' }
  }
})
