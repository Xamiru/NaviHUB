import { definePerson } from '../../schema'

export default definePerson({
  id: 'haile-selassie',
  names: [
    { text: 'Haile Selassie', lang: 'en', role: 'primary' },
    { text: 'ኃይለ ሥላሴ', lang: 'am', role: 'native' },
    {
      text: 'Negus Tafari',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1892' },
        cites: [
          { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '182' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1975-08' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Struggle for Power, 1974-77', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Ethiopia',
      polity: 'polity:ethiopian-empire',
      start: {
        alts: [
          {
            value: { d: '1930-11' },
            cites: [
              {
                source: 'loc-ethiopia-country-study-1991',
                loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '1' }
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
          text: 'Although Empress Zawditu died in April 1930, it was not until November that Negus Tafari was crowned Haile Selassie I, "Conquering Lion of the Tribe of Judah, Elect of God, and King of Kings of Ethiopia."',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/17.htm' }
        },
        {
          id: 'q2',
          text: 'As emperor, Haile Selassie continued to push reforms aimed at modernizing the country and breaking the nobility\'s authority.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/17.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In July 1931, the emperor granted a constitution that asserted his own status, reserved imperial succession to the line of Haile Selassie, and declared that "the person of the Emperor is sacred, his dignity inviolable, and his power indisputable."',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/17.htm' }
        },
        {
          id: 'q4',
          text: 'In exile in Britain, the emperor sought to gain the support of the Western democracies for his cause but had little success until Italy entered World War II on the side of Germany in June 1940.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/19.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'In August Haile Selassie died under questionable circumstances and was secretly buried.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Struggle for Power, 1974-77', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/29.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/H.S._%28i.e.%2C_Haile_Selassie%29_in_robe_LOC_matpc.10374.jpg/1280px-H.S._%28i.e.%2C_Haile_Selassie%29_in_robe_LOC_matpc.10374.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:H.S._(i.e.,_Haile_Selassie)_in_robe_LOC_matpc.10374.jpg',
    credit: { institution: 'Library of Congress, Matson Collection' },
    license: { id: 'public-domain' }
  }
})
