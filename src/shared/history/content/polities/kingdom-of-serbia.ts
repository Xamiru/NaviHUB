import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-serbia',
  names: [
    { text: 'Kingdom of Serbia', lang: 'en', role: 'primary' },
    { text: 'Краљевина Србија', lang: 'sr', role: 'native' },
    {
      text: 'Servia',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1882-03-06' },
        cites: [
          {
            source: 'royal-family-of-serbia-history-1868-1903',
            loc: { section: 'History of Serbia (from 1868 to 1903)' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918-12' },
        cites: [
          {
            source: 'state-dept-countries-kingdom-of-yugoslavia',
            loc: { section: 'Kingdom of Serbia/Yugoslavia: Summary', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:belgrade',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '79' } }
      ]
    }
  ],
  cshapes: [
    { set: 'europe', code: 340, from: 1882.18, to: 1886 },
    { set: 'world', code: 340, to: 1918.92 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/King_Milan_and_Queen_Natalie_of_Serbia_with_their_son%2C_Prince_Alexander297525-1340965335.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:King_Milan_and_Queen_Natalie_of_Serbia_with_their_son,_Prince_Alexander297525-1340965335.jpg',
    credit: { institution: 'Royal Collection Trust' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1903, after the murder of King Alexander Obrenovich, and the accession of Peter Karageorgevich, the constitution of 1889 was revived. By this instrument the government of Servia is an independent constitutional monarchy, hereditary in the male line, and in the order of primogeniture.',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '84' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The treaty of Berlin (13th of July 1878) disappointed Servian patriots, although the complete independence of the country was established by it (art. 34). This was proclaimed at Belgrade by Prince (afterwards King) Milan on the 22nd of August.',
          lang: 'en',
          cite: { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '103' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Servia'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'With the disintegration of the Habsburg Empire at the end of the Great War in 1918, many of the empire’s southern Slav minorities sought the protection of the Serbian throne, and entered into union with Serbia as the Kingdom of Serbs, Croats, and Slovenes in December 1918. The United States recognized the kingdom in February 1919. As Serbia was the dominant partner in this state, the U.S. Government has considered the Kingdom of Serbs, Croats, and Slovenes and then later, Yugoslavia, as the successor government to the original Government of Serbia.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-kingdom-of-yugoslavia',
            loc: { section: 'Kingdom of Serbia/Yugoslavia: Summary', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/kingdom-of-yugoslavia'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'jovanovic-1926-vlada-milana-obrenovica', perspective: 'european' }
  ]
})
