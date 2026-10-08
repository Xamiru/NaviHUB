import { definePolity } from '../../schema'

export default definePolity({
  id: 'state-of-israel',
  names: [
    { text: 'Israel', lang: 'en', role: 'primary' },
    { text: 'מדינת ישראל', lang: 'he', role: 'native' },
    {
      text: 'State of Israel',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'avalon-israeli-declaration-of-independence',
          loc: { section: 'Declaration of Israel\'s Independence 1948' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1948-05-14' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  cshapes: [
    { set: 'world', code: 666, from: 1948.37 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Declaration_of_State_of_Israel_1948.jpg/1280px-Declaration_of_State_of_Israel_1948.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Declaration_of_State_of_Israel_1948.jpg',
    credit: {
      institution: 'National Photo Collection of Israel, Government Press Office',
      creator: 'Rudi Weissenstein'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On May 14, 1948, Ben-Gurion and his associates proclaimed the establishment of the State of Israel.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/20.htm' }
        },
        {
          id: 'q2',
          text: 'In May 1949, the UN General Assembly, on recommendation of the Security Council, admitted Israel to the UN.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/20.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Faced with such intractable problems, Ben-Gurion sought to ensure a fluid transition from existing prestate institutions to the new state apparatus.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'PROBLEMS OF THE NEW STATE, 1948-67', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/21.htm' }
        },
        {
          id: 'q4',
          text: 'In June 1950, the Knesset passed a compromise resolution, known as the "Harari decision" (named after Knesset member Izhar Harari), approving a constitution in principle but postponing its enactment until a future date.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'THE CONSTITUTION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/78.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'THE STATE OF ISRAEL will be open for Jewish immigration and for the Ingathering of the Exiles; it will foster the development of the country for the benefit of all its inhabitants; it will be based on freedom, justice and peace as envisaged by the prophets of Israel; it will ensure complete equality of social and political rights to all its inhabitants irrespective of religion, race or sex; it will guarantee freedom of religion, conscience, language, education and culture; it will safeguard the Holy Places of all religions; and it will be faithful to the principles of the Charter of the United Nations.',
          lang: 'en',
          cite: {
            source: 'avalon-israeli-declaration-of-independence',
            loc: { section: 'Declaration of Israel\'s Independence 1948' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/20th_century/israel.asp'
          }
        }
      ]
    }
  ]
})
