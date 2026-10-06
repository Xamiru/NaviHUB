import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'proclamation-of-the-republic-of-turkey',
  names: [
    { text: 'Proclamation of the Republic of Turkey', lang: 'en', role: 'primary' },
    { text: 'Cumhuriyetin ilanı', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1923-10-29' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
          },
          { source: 'lemo-chronik-1923', loc: { section: 'Chronik 1923', para: '231' } }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:ankara',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mustafa-kemal-ataturk',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
        }
      ]
    },
    {
      name: 'Ismet Pasha',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
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
          text: 'On October 29, 1923, the Grand National Assembly proclaimed the Republic of Turkey. Atatürk was named its president and Ankara its capital, and the modern state of Turkey was born.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q2',
          text: 'On assuming office, Atatürk initiated a series of radical reforms of the country\'s political, social, and economic life that were aimed at rapidly transforming Turkey into a modern state',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Turkey was the only power defeated in World War I to negotiate with the Allies as an equal and to influence the provisions of the resultant treaty.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q4',
          text: 'With this treaty, the Allies recognized the present-day territory of Turkey and denied Turkey\'s claim to the Mosul area in the east (in present-day Iraq) and Hatay, which included the Mediterranean port of Alexandretta (Iskenderun).',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q5',
          text: 'Turkey and Greece arranged a mandatory exchange of their respective ethnic Greek and Turkish minorities, with the exception of some Greeks in Istanbul and Turks in western Thrace and the Dodecanese Islands.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Of all the Kemalist reforms, the exclusion of Islam from an official role in the life of the nation shocked Atatürk\'s contemporaries most profoundly.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q7',
          text: 'Throughout his presidency, repeatedly extended by the assembly, Atatürk governed Turkey essentially by personal rule in a one-party state.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q8',
          text: 'These developments made a deep impression on the Iranian ʿolamāʾ , who feared that the proclamation of a republic in Iran would have similar consequences for the role of Islam and the religious establishment in their country',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
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
      quote: {
        id: 'q9',
        text: 'In November 1922, the Grand National Assembly separated the offices of sultan and caliph and abolished the former.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1923-07-24' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Table A. Chronology of Major Kemalist Reforms, 1923' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The National Pact of 1919 was the basis of the Turkish negotiating position, and its provisions were incorporated in the Treaty of Lausanne, concluded in July 1923.',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '18' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1924-03-03' },
            cites: [
              {
                source: 'iranica-sheikh-ol-islami-ahmad-shah',
                loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
              },
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Table A. Chronology of Major Kemalist Reforms, 1924' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'However, the Turkish Grand National Assembly had on March 3 passed three laws abolishing the caliphate, suppressing the ministry of religious affairs and the system of awqāf (religious endowments) and placing all religious schools and seminaries under the national ministry of education.',
        lang: 'en',
        cite: {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1924' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Atatürk and the Turkish Nation', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1924 the Grand National Assembly adopted a new constitution to replace the 1876 document',
        lang: 'en',
        cite: {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '26' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/13.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/1923_11_03_Resimli_Gazete_Cumhuriyetin_Ilani.jpg/1280px-1923_11_03_Resimli_Gazete_Cumhuriyetin_Ilani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1923_11_03_Resimli_Gazete_Cumhuriyetin_Ilani.jpg',
    credit: { institution: 'İBB Atatürk Kitaplığı', creator: 'Resimli Gazete' },
    license: { id: 'public-domain' }
  }
})
