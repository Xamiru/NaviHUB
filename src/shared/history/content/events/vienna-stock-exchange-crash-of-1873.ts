import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'vienna-stock-exchange-crash-of-1873',
  names: [
    { text: 'Vienna stock exchange crash of 1873', lang: 'en', role: 'primary' },
    { text: 'Wiener Börsenkrach', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1873-05-09' },
        cites: [
          { source: 'lemo-chronik-1873', loc: { section: 'Chronik 1873', para: '18' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 3,
  places: [
    {
      ref: 'place:vienna',
      cites: [
        { source: 'lemo-chronik-1873', loc: { section: 'Chronik 1873', para: '19' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:austria-hungary' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'For some years there had been active speculations on the Stock Exchange; a great number of companies, chiefly banks and building societies, had been founded on a very insecure basis. The inevitable crisis began in 1872; it was postponed for a short time, and there was some hope that the Exhibition, fixed for 1873, would bring fresh prosperity; the hope was not, however, fulfilled, and the final crash, which occurred in May, brought with it the collapse of hundreds of undertakings.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-austria-hungary',
            loc: { section: 'AUSTRIA-HUNGARY', para: '427' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Austria-Hungary'
          }
        },
        {
          id: 'q2',
          text: 'Er löst die "Große Depression" aus, eine bis in die 1890er Jahre andauernde Weltwirtschaftskrise.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1873', loc: { section: 'Chronik 1873', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1873.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'A speculative boom resulted, characterized by large-scale formation of joint-stock companies and unscrupulous investment practices. This period of intense financial speculation and construction, called by Germans the Gründerzeit (founders\' time), ended with the stock market crash of 1873.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Economy and Population Growth', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/30.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Die Massenauswanderung aus Europa vor allem mit dem Ziel Amerika erreicht in den beiden nachfolgenden Jahrzehnten ihren Höhepunkt.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1873', loc: { section: 'Chronik 1873', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1873.html'
          }
        },
        {
          id: 'q5',
          text: 'The crash of 1873 and the subsequent depression began the gradual dissolution of Bismarck\'s alliance with the National Liberals that had begun after his triumphs of 1866.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Tariff Agreement of 1879', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/31.htm' }
        },
        {
          id: 'q6',
          text: 'Despite the crash and several subsequent periods of economic depression, Germany\'s economy grew rapidly.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Economy and Population Growth', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/30.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Schwarzer_Freitag_Wien_1873.jpg/1280px-Schwarzer_Freitag_Wien_1873.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Schwarzer_Freitag_Wien_1873.jpg',
    credit: { institution: 'Die Presse Edition, Das Imperiale Zeitalter 1871-1914' },
    license: { id: 'public-domain' }
  }
})
