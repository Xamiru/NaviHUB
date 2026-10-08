import { definePerson } from '../../schema'

export default definePerson({
  id: 'menachem-begin',
  names: [
    { text: 'Menachem Begin', lang: 'en', role: 'primary' },
    { text: 'מנחם בגין', lang: 'he', role: 'native', translit: 'Menaḥem Begin' }
  ],
  researched: '2026-10-09',
  regions: ['mena'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister of Israel',
      polity: 'polity:state-of-israel',
      start: {
        alts: [
          {
            value: { d: '1977-06-21' },
            cites: [
              { source: 'frus-1977-80-v08-persons', loc: { section: 'Persons', para: '19' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1983-10' },
            cites: [
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '18' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1977-80-v08-persons', loc: { section: 'Persons', para: '19' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Menachem_Begin_-_Zvi_Rosenblatt_1973.jpg/1280px-Menachem_Begin_-_Zvi_Rosenblatt_1973.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Menachem_Begin_-_Zvi_Rosenblatt_1973.jpg',
    credit: { institution: 'National Photo Collection (Israel)', creator: 'Herman Chanania' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Begin\'s vision of Israel and its role in the region was deeply rooted in the Revisionist platform with which he had been associated since the days of Jabotinsky.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'THE BEGIN ERA', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/30.htm' }
        },
        {
          id: 'q2',
          text: 'Begin, Menachem, Israeli Prime Minister from June 21, 1977',
          lang: 'en',
          cite: { source: 'frus-1977-80-v08-persons', loc: { section: 'Persons', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v08/persons'
          }
        },
        {
          id: 'q3',
          text: 'In the May 1977 elections, the Labor Party\'s dominance of Israeli politics ended. The Likud Bloc--an alliance of Begin\'s Herut Party, the Liberal Party, and other smaller parties formed in the aftermath of the October 1973 War--formed a ruling coalition government for the first time in Israel\'s history.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'THE BEGIN ERA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/30.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q4',
          text: 'In the aftermath of the loss of the Struma in April 1942, young Menachem Begin, then a soldier in the Polish army-in-exile, first came to Palestine. Begin was a disciple of Jabotinsky, but he rejected Jabotinsky\'s pro-British sympathies.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Palestine in the 1930s and 1940s', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/18.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q9',
          text: 'Begin appealed to many because he was viewed as incorruptible and untarnished by scandal.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'THE BEGIN ERA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/30.htm' }
        },
        {
          id: 'q5',
          text: 'He strongly advocated Israeli sovereignty over all of Eretz Yisrael, which in his view included Jerusalem and the West Bank, but not Sinai.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'THE BEGIN ERA', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/30.htm' }
        },
        {
          id: 'q6',
          text: 'Following nearly a year of stalled negotiations, Begin, Sadat, and Carter met at Camp David near Washington, D.C., for two weeks in September 1978. The crux of the problem at Camp David was that Begin, the old-time Revisionist who had opposed territorial concessions to the Arabs for so many years, was reluctant to dismantle existing Sinai settlements. Finally, on September 17 he consented, and the Camp David Accords were signed. On the following day, Begin obtained Knesset approval of the accords.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Peace Process', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/31.htm' }
        },
        {
          id: 'q7',
          text: 'Begin\'s limited view of Palestinian autonomy in the West Bank became apparent almost immediately after the agreement known as the Treaty of Peace Between Egypt and Israel was signed in March 1979. The following month his government approved two new settlements between Ram Allah and Nabulus. The military government established civilian regional councils for the Jewish settlements. Finally, and most provocative, autonomy plans were prepared in which Israel would keep exclusive control over the West Bank\'s water, communications, roads, public order, and immigration.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Peace Process', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/31.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q8',
          text: 'Likud was reconfirmed in power by the 1981 elections, but it suffered an almost irreparable blow with Begin\'s resignation in September 1983',
          lang: 'en',
          cite: { source: 'loc-israel-country-study-1988', loc: { section: 'Parties', para: '3' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/77.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'begin-1972-the-revolt', perspective: 'israeli' }
  ],
  born: {
    alts: [
      {
        value: { d: '1913' },
        cites: [
          { source: 'lc-names-n79085130', loc: { section: 'Begin, Menachem, 1913-1992' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1992' },
        cites: [
          { source: 'lc-names-n79085130', loc: { section: 'Begin, Menachem, 1913-1992' } }
        ]
      }
    ]
  }
})
