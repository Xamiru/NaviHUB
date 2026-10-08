import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-lausanne',
  names: [
    { text: 'Treaty of Lausanne', lang: 'en', role: 'primary' },
    { text: 'Lozan Antlaşması', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1923-07-24' },
        cites: [
          { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } },
          { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:lausanne',
      cites: [
        { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:kingdom-of-italy' },
    { ref: 'polity:kingdom-of-greece' },
    { ref: 'polity:republic-of-turkey' }
  ],
  participants: [
    {
      name: 'Ismet Pasha',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
        }
      ]
    },
    {
      ref: 'person:george-curzon',
      role: 'negotiator',
      cites: [
        { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } },
        {
          source: 'gov-uk-past-foreign-secretaries-george-curzon',
          loc: { section: 'George Nathaniel Curzon' }
        }
      ]
    },
    {
      name: 'Sir Horace Rumbold',
      role: 'negotiator',
      cites: [
        { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:turkish-war-of-independence',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
        }
      ]
    },
    {
      ref: 'event:proclamation-of-the-republic-of-turkey',
      rel: 'followed-by',
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
          text: 'Peace was finally sealed with the Treaty of Lausanne in 1923, the negotiation of which was arguably Curzon’s finest hour as Foreign Secretary. The Treaty set the borders of modern Turkey and secured the freedom of the Straits.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-foreign-secretaries-george-curzon',
            loc: { section: 'George Nathaniel Curzon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-foreign-secretaries/george-curzon'
          }
        },
        {
          id: 'q2',
          text: 'Turkey was the only power defeated in World War I to negotiate with the Allies as an equal and to influence the provisions of the resultant treaty.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the end of October 1922, the Allies invited the nationalist and Ottoman governments to a conference at Lausanne, Switzerland, but Atatürk was determined that the nationalist government should be Turkey\'s sole representative.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'From 20 November 1922 to 4 February 1923 and again from 19 April until 24 July 1923 there were negotiations at Lausanne between Kemal’s representatives and the Allies, for whom the British Foreign Secretary, George Curzon (1859-1925), and later the High Commissioner at Constantinople, Sir Horace Rumbold (1869-1941), armed with little else except the secret intelligence gleaned from decoded Turkish communications, played a weak hand well.',
          lang: 'en',
          cite: { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        },
        {
          id: 'q5',
          text: 'The National Pact of 1919 was the basis of the Turkish negotiating position, and its provisions were incorporated in the Treaty of Lausanne, concluded in July 1923.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The new treaty returned Eastern Thrace, Anatolia, Izmir and some of the Aegean islands to Turkey, all the financial and extraterritorial privileges previously enjoyed by the powers were scrapped and there was no mention of Armenia, whose independence Turkey had effectively destroyed in December 1920.',
          lang: 'en',
          cite: { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        },
        {
          id: 'q7',
          text: 'The capitulations and foreign administration of the Ottoman public debt, which infringed on the sovereignty of Turkey, were abolished.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q8',
          text: 'Turkey and Greece arranged a mandatory exchange of their respective ethnic Greek and Turkish minorities, with the exception of some Greeks in Istanbul and Turks in western Thrace and the Dodecanese Islands.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'The Treaty of Lausanne proved to be the longest-lasting of the post-war settlements, testimony to the virtues of negotiation between participants willing to work within the same parameters and accept the need for compromise.',
          lang: 'en',
          cite: { source: 'eo1418-sharp-paris-peace-conference', loc: { section: 'Introduction' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ]
    }
  ]
})
