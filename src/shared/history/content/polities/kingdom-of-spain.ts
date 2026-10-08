import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-spain',
  names: [
    { text: 'Kingdom of Spain', lang: 'en', role: 'primary' },
    { text: 'Reino de España', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1479' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1931' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE CONSTITUTIONAL MONARCHY', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:madrid',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'Spain (code 230), capital Madrid' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 29 },
    { set: 'europe', code: 230, to: 1873.11 },
    { set: 'europe', code: 230, from: 1874.99, to: 1886 },
    { set: 'world', code: 230, to: 1931.28 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Alfonso_XII%2C_rey_de_Espa%C3%B1a_%28Museo_del_Prado%29.jpg/1280px-Alfonso_XII%2C_rey_de_Espa%C3%B1a_%28Museo_del_Prado%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alfonso_XII,_rey_de_Espa%C3%B1a_(Museo_del_Prado).jpg',
    credit: { institution: 'Museo del Prado', creator: 'Alejandro Ferrant y Fischermans' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'SPAIN (España), a kingdom in the extreme south-west of Europe, comprising about eleven-thirteenths of the Iberian Peninsula, in addition to the Balearic Islands, the Canary Islands, and the fortified station of Ceuta, on the Moroccan coast opposite to Gibraltar.',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Treaty of Alcaçovas ended the war in September 1479, and as Ferdinand had succeeded his father in Aragon earlier in the same year, it was possible to link Castile with Aragon.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/spain/7.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The constitution of the First Republic (1873-74) provided for internally self-governing provinces that were bound to the federal government by voluntary agreement.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Liberal Rule', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/spain/16.htm' }
        },
        {
          id: 'q4',
          text: 'A brigadier\'s pronunciamiento that called Isabella\'s son, the able British-educated Alfonso XII (r. 1875-85), to the throne was sufficient to restore the Bourbon monarchy.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE CONSTITUTIONAL MONARCHY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/spain/17.htm' }
        },
        {
          id: 'q5',
          text: 'Alfonso XIII (r. 1886-1931) was the posthumous son of Alfonso XII. The mother of Alfonso XIII, another Maria Cristina, acted as regent until her son came of age officially in 1902. Alfonso XIII abdicated in 1931.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE CONSTITUTIONAL MONARCHY', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/spain/17.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Antimonarchist parties won a substantial vote in the 1931 municipal elections. Alfonso XIII interpreted the outcome of the elections and the riots that followed as an indication of imminent civil war. He left the country with his family and appealed to the army for support in upholding the monarchy. When General Jose Sanjurjo, army chief of staff, replied that the armed forces would not support the king against the will of the people, Alfonso abdicated.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'REPUBLICAN SPAIN', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/spain/20.htm' }
        },
        {
          id: 'q7',
          text: 'A multiparty coalition in which regional parties held the balance met at a constitutional convention at San Sebastian, the summer capital, to proclaim the Second Republic.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'REPUBLICAN SPAIN', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/spain/20.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'tunon-de-lara-1975-la-espana-del-siglo-xix', perspective: 'european' },
    { source: 'fontana-1971-la-quiebra-de-la-monarquia-absoluta', perspective: 'european' },
    { source: 'artola-1973-la-burguesia-revolucionaria', perspective: 'european' }
  ]
})
