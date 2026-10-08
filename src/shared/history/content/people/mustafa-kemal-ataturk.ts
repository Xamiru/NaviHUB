import { definePerson } from '../../schema'

export default definePerson({
  id: 'mustafa-kemal-ataturk',
  names: [
    { text: 'Mustafa Kemal Atatürk', lang: 'en', role: 'primary' },
    {
      text: 'Mustafa Kemal Pasha',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-zurcher-kemal', loc: { section: 'Kemal, Mustafa (Atatürk)' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          { source: 'eo1418-zurcher-kemal', loc: { section: 'Kemal, Mustafa (Atatürk)' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1938-11-10' },
        cites: [
          { source: 'eo1418-zurcher-kemal', loc: { section: 'Kemal, Mustafa (Atatürk)' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:istanbul',
    cites: [
      { source: 'eo1418-zurcher-kemal', loc: { section: 'Kemal, Mustafa (Atatürk)' } }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['military', 'head-of-state', 'revolutionary'],
  offices: [
    {
      title: 'president of the Republic of Turkey',
      polity: 'polity:republic-of-turkey',
      start: {
        alts: [
          {
            value: { d: '1923-10-29' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1938-11-10' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Turkey after Atatürk', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
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
          text: 'Mustafa Kemal Pasha gained fame during World War I both as a successful commander on three Ottoman fronts and as a fierce critic of the Young Turk government and its German allies. After the war, his reputation enabled him to position himself as the leader of the Turkish independence movement. Out of this movement emerged the Republic of Turkey in 1923, with Kemal as its first president.',
          lang: 'en',
          cite: { source: 'eo1418-zurcher-kemal', loc: { section: 'Kemal, Mustafa (Atatürk)' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'When the Allies landed on 25 April, Mustafa Kemal countered them on his own initiative and managed to occupy the Arıburnu ridge, thus preventing an Allied breakthrough.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'World War I Years – Beyond the Gallipoli Narrative', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        },
        {
          id: 'q3',
          text: 'While gaining a reputation as a very able field commander, Mustafa Kemal also became known as a critic of the overall war policy and particularly of Enver’s close cooperation with the Germans.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'Conflict and Critique', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        },
        {
          id: 'q4',
          text: 'On 16 May 1919 Mustafa Kemal left for Anatolia, landing at Samsun three days later.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: {
              section: 'Transition from Military to Political Realm – Leader of the National Resistance Movement',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        },
        {
          id: 'q5',
          text: 'In the years that followed, he would emerge as the unquestioned leader of the national resistance movement and the Turkish War of Independence.',
          lang: 'en',
          cite: {
            source: 'eo1418-zurcher-kemal',
            loc: {
              section: 'Transition from Military to Political Realm – Leader of the National Resistance Movement',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/kemal-mustafa-ataturk/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Ghazi_Moustapha_Kemal_Pasha_LCCN2014716853_%28cropped%29.jpg/1280px-Ghazi_Moustapha_Kemal_Pasha_LCCN2014716853_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ghazi_Moustapha_Kemal_Pasha_LCCN2014716853_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  }
})
