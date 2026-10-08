import { definePolity } from '../../schema'

export default definePolity({
  id: 'ottoman-empire',
  names: [
    { text: 'Ottoman Empire', lang: 'en', role: 'primary' },
    {
      text: 'دولت عليه عثمانيه',
      lang: 'ota',
      role: 'native',
      translit: 'Devlet-i ʿAliyye-yi ʿOsmâniyye'
    },
    {
      text: 'Turkish Empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1' } }
      ]
    },
    {
      text: 'Sublime Porte',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Ottoman Institutions', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1300', approx: true },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1336' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1922-11' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '17' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:istanbul',
      start: {
        alts: [
          {
            value: { d: '1453' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'The Ottoman Empire', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '5' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 640 },
    { set: 'europe', code: 640, from: 1816, to: 1886 },
    { set: 'world', code: 640, to: 1922.84 }
  ],
  figures: [
    {
      key: 'population',
      value: {
        alts: [
          {
            value: { min: 36323539 },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '7' } }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/1801_Cary_Map_of_Turkey%2C_Iraq%2C_Armenia_and_Sryia_-_Geographicus_-_TurkeyAsia-cary-1801.jpg/1280px-1801_Cary_Map_of_Turkey%2C_Iraq%2C_Armenia_and_Sryia_-_Geographicus_-_TurkeyAsia-cary-1801.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1801_Cary_Map_of_Turkey,_Iraq,_Armenia_and_Sryia_-_Geographicus_-_TurkeyAsia-cary-1801.jpg',
    credit: { institution: 'Geographicus Rare Antique Maps', creator: 'John Cary' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Turkish or Ottoman Empire comprises Turkey in Europe, Turkey in Asia, and the vilayets of Tripoli and Barca, or Bengazi, in North Africa; and in addition to those provinces under immediate Turkish rule, it embraces also certain tributary states and certain others under foreign administration.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q2',
          text: 'Leadership subsequently passed to Ertugrul\'s son, Osman I (r. ca. 1284-1324), founder of the Osmanli Dynasty--better known in the West as the Ottomans.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1300 the Seljukian Empire crumbled away, and many small states arose on its ruins. It was only after the death of his protector and benefactor Sultan Ala-ud-din II. that Osman declared his independence, and accordingly the Turkish historian dates the foundation of the Ottoman Empire from this event.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1336' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q4',
          text: 'He made Constantinople the imperial capital, as it had been under the Byzantine emperors, and set about rebuilding the city.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'At the apex of the hierarchical Ottoman system was the sultan, who acted in political, military, judicial, social, and religious capacities, under a variety of titles.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Ottoman Institutions', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/7.htm' }
        },
        {
          id: 'q6',
          text: 'The day-to-day conduct of government and the formulation of policy were in the hands of the divan, a relatively small council of ministers directed by the chief minister, the grand vizier.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Ottoman Institutions', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/7.htm' }
        },
        {
          id: 'q7',
          text: 'The Ottoman Empire had Turkish origins and Islamic foundations, but from the start it was a heterogeneous mixture of ethnic groups and religious creeds.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Ottoman Institutions', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/7.htm' }
        },
        {
          id: 'q8',
          text: 'In 1853 Tsar Nicholas I of Russia described the Ottoman Empire as "the sick man of Europe."',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q9',
          text: 'In December of that year, on the eve of the war with Russia, the new sultan promulgated a constitution, based on European models, that had been drafted by senior political, military, and religious officials under Midhat\'s direction. Embodying the substance of the Young Ottoman program, this document created a representative parliament, guaranteed religious liberty, and provided for enlarged freedom of expression.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q10',
          text: 'Egypt, though nominally under Turkish suzerainty, has formed a practically independent principality since 1841, and has been de facto under British protection since 1881.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'In November 1922, the Grand National Assembly separated the offices of sultan and caliph and abolished the former. The assembly further stated that the Ottoman regime had ceased to be the government of Turkey when the Allies seized the capital in 1920, in effect abolishing the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'uzuncarsili-1947-osmanli-tarihi', perspective: 'turkish' },
    { source: 'tanor-2020-osmanli-turk-anayasal-gelismeleri', perspective: 'turkish' },
    { source: 'kurat-1970-turkiye-ve-rusya', perspective: 'turkish' }
  ]
})
