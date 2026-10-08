import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-zionist-congress',
  names: [
    { text: 'First Zionist Congress', lang: 'en', role: 'primary' },
    { text: 'Erster Zionistenkongress', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1897' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '10' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1897-08-31' },
        cites: [
          { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '39' } }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:basel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '10' }
        },
        { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '40' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:theodor-herzl',
      role: 'organizer',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '10' }
        },
        { source: 'lemo-chronik-1897', loc: { section: 'Chronik 1897', para: '40' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The first Jew to articulate a political Zionist platform was not a West European but a Russian physician residing in Odessa.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In 1897 Herzl convened the First Zionist Congress in Basel, Switzerland.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q3',
          text: 'The first congress adopted the goal: "To create for the Jewish people a home in Palestine secured by Public Law."',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The World Zionist Organization (WZO) was founded to work toward this goal, and arrangements were made for future congresses.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q6',
          text: 'The First Zionist Congress was vital to the future development of Zionism, not only because it established an institutional framework for Zionism but also because it came to symbolize for many Jews a new national identity, the first such identity since the destruction of the Second Temple in A.D. 70.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/THEODOR_HERZL_AT_THE_FIRST_ZIONIST_CONGRESS_IN_BASEL_ON_25.8.1897._%D7%AA%D7%90%D7%95%D7%93%D7%95%D7%A8_%D7%94%D7%A8%D7%A6%D7%9C_%D7%91%D7%A7%D7%95%D7%A0%D7%92%D7%A8%D7%A1_%D7%94%D7%A6%D7%99%D7%95%D7%A0%D7%99_%D7%94%D7%A8%D7%90%D7%A9%D7%95%D7%9F_-_1897.8.25.jpg/1280px-THEODOR_HERZL_AT_THE_FIRST_ZIONIST_CONGRESS_IN_BASEL_ON_25.8.1897._%D7%AA%D7%90%D7%95%D7%93%D7%95%D7%A8_%D7%94%D7%A8%D7%A6%D7%9C_%D7%91%D7%A7%D7%95%D7%A0%D7%92%D7%A8%D7%A1_%D7%94%D7%A6%D7%99%D7%95%D7%A0%D7%99_%D7%94%D7%A8%D7%90%D7%A9%D7%95%D7%9F_-_1897.8.25.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:THEODOR_HERZL_AT_THE_FIRST_ZIONIST_CONGRESS_IN_BASEL_ON_25.8.1897._%D7%AA%D7%90%D7%95%D7%93%D7%95%D7%A8_%D7%94%D7%A8%D7%A6%D7%9C_%D7%91%D7%A7%D7%95%D7%A0%D7%92%D7%A8%D7%A1_%D7%94%D7%A6%D7%99%D7%95%D7%A0%D7%99_%D7%94%D7%A8%D7%90%D7%A9%D7%95%D7%9F_-_1897.8.25.jpg',
    credit: { institution: 'National Photo Collection of Israel, Government Press Office' },
    license: { id: 'public-domain' }
  }
})
