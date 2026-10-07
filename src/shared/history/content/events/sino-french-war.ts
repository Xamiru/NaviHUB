import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sino-french-war',
  names: [
    { text: 'Sino-French War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1884' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '5' }
          },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1885-06-09' },
        cites: [
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '27' } },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'east-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tianjin',
      cites: [
        { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
      ]
    }
  ],
  sides: [
    {
      key: 'china',
      name: 'China',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Self-Strengthening Movement', para: '5' }
        }
      ]
    },
    {
      key: 'france',
      name: 'France',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Self-Strengthening Movement', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q11',
          text: 'During 1884 the French made themselves masters of the lower delta. Throughout the campaign Chinese regulars fought against the French, who thus found themselves involved in war with China.',
          lang: 'en',
          cite: { source: 'britannica-1911-tongking', loc: { section: 'TONGKING', para: '31' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tongking'
          }
        },
        {
          id: 'q1',
          text: 'Following a victorious war against China in 1884-85, France also took Annam.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/17.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In April 1882, a French force again stormed the citadel of Hanoi, under the leadership of naval officer Henri Riviere.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q3',
          text: 'A Treaty of Protectorate, signed at the August 1883 Harmand Convention, established a French protectorate over North and Central Vietnam and formally ended Vietnam\'s independence.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q4',
          text: 'At this time the foreign powers also took over the peripheral states that had acknowledged Chinese suzerainty and given tribute to the emperor.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/17.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Als die schnell vorrückenden französischen Truppen auf die noch nicht abgezogenen chinesischen Truppen treffen, kommt es erneut zum Krieg, der erst im Juni 1885 mit dem zweiten Frieden von Tientsin beendet wird.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1884.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'China verzichtete nun endgültig zugunsten Frankreichs auf alle Rechte an den seit 1883 unter französischer Schutzherrschaft stehenden Annam (Südvietnam) und Tonking (Nordvietnam).',
          lang: 'de',
          cite: { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1885.html'
          }
        },
        {
          id: 'q7',
          text: 'A rebellion known as the Can Vuong (Loyalty to the King) movement formed in 1885 around the deposed Emperor Ham Nghi and attracted support from both scholars and peasants. The rebellion was essentially subdued with the capture and exile of Ham Nghi in 1888. Scholar and patriot Phan Dinh Phung continued to lead the resistance until his death in 1895. Although unsuccessful in driving out the French, the Can Vuong movement, with its heroes and patriots, laid important groundwork for future Vietnamese independence movements.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/vietnam/15.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1883-08-25' },
            cites: [
              { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '33' } },
              { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '34' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Der König von Annam, dem heutigen Vietnam, erkennt die französische Schutzherrschaft vertraglich an.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '34' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1883.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1884-05-11' },
            cites: [
              { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '19' } },
              { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '20' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Im chinesisch-französischen Vertrag von Tientsin verzichtet China auf alle Rechte in Tonking (Nordvietnam) und Annam (Südvietnam).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '20' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1884.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-06-09' },
            cites: [
              { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '27' } },
              { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Der Friedensvertrag von Tientsin beendet den seit 1884 andauernden Krieg zwischen China und Frankreich.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1885.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/The_Graphic%2C_Aug._30%2C_1884%2C_P239.jpg/1280px-The_Graphic%2C_Aug._30%2C_1884%2C_P239.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Graphic,_Aug._30,_1884,_P239.jpg',
    credit: { creator: 'Charles William Wyllie' },
    license: { id: 'public-domain' }
  }
})
