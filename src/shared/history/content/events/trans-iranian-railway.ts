import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'trans-iranian-railway',
  names: [
    { text: 'Trans-Iranian Railway', lang: 'en', role: 'primary' },
    { text: 'راه‌آهن سراسری ایران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1927' },
        cites: [
          {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '2' }
          },
          {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1938' },
        cites: [
          {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '8' }
          },
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:bandar-e-torkaman',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '2' }
        }
      ]
    },
    {
      ref: 'place:bandar-e-emam-khomeyni',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '2' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:pahlavi-dynasty' },
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'The Trans-Iranian railway system, constructed entirely with Iranian capital and financed primarily by sugar and tea customs duties, is opened by the Shah; it runs from Khorramshahr to Tehran to Bandar-e Shah, connecting the Persian Gulf to the Caspian Sea.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q1',
          text: 'He embarked on a number of important transportation and communication projects, the most ambitious of which was the construction of the 1,394 km long Trans-Iranian Railway, linking Bandar-e Šāh (now Bandar-e Torkaman) on the Caspian Sea with Bandar-e Šāhpūr (now Bandar-e Emām Ḵomeynī) on the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        },
        {
          id: 'q2',
          text: 'The project started in 1927 and took eleven years to complete. It cost around $150 million and was financed mainly by additional excise taxes on imports of tea and sugar',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        },
        {
          id: 'q3',
          text: 'Sugar trade monopoly to support the construction of Trans-Iranian railroad system begins.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1925' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'A major example of the state’s role in the economy can be observed in the construction of the Trans-Iranian Railway (1927-38), a project which cost β30,000,000, a sum nearly equal to the oil revenues for a decade.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/administration-vii-pahlavi/'
          }
        },
        {
          id: 'q5',
          text: 'Financed domestically so as to avoid foreign debts, the railway not only inflated the size of the bureaucracy, but also immediately increased the extent of bureaucratic penetration into society, since the necessary funds were raised through taxes on tea and sugar.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/administration-vii-pahlavi/'
          }
        },
        {
          id: 'q6',
          text: 'Plant and equipment for Iranian industrial development and the supply of railway equipment depended more on German involvement and capital than British, though taxation on tea and sugar contributed much to financing the railway.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/B20_Panorama_of_the_Vresk_valley_-_USACE-p15141coll5-9280.jpeg/1280px-B20_Panorama_of_the_Vresk_valley_-_USACE-p15141coll5-9280.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:B20_Panorama_of_the_Vresk_valley_-_USACE-p15141coll5-9280.jpeg',
    credit: { institution: 'U.S. Army Corps of Engineers, Stanley Scott Collection' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'makki-1983-tarikh-e-bist-saleh-ye-iran', perspective: 'iranian' }
  ]
})
