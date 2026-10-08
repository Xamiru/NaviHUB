import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'departure-of-the-shah-1979',
  names: [
    { text: 'Departure of the Shah', lang: 'en', role: 'primary' },
    { text: 'خروج شاه از ایران', lang: 'fa', role: 'native', translit: 'Xoruj-e Šāh az Irān' },
    {
      text: 'Flight of the Shah',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '55' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1979-01-16' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '55' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '13' }
          },
          {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:iranian-revolution' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        }
      ]
    },
    {
      ref: 'person:farah-pahlavi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        }
      ]
    },
    {
      ref: 'person:shapour-bakhtiar',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '55' }
        }
      ]
    },
    {
      ref: 'event:return-of-ruhollah-khomeini',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '57' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Shah_and_Shahbanu_leaving_Iran_-_16_January_1979.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_and_Shahbanu_leaving_Iran_-_16_January_1979.jpg',
    credit: { institution: 'Islamic Revolution Document Center (irdc.ir)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The shah, announcing he was going abroad for a short holiday, left the country on January 16, 1979. As his aircraft took off, celebrations broke out across the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'On 3 January 1979, Šāpur Baḵtiār of the National Front was appointed prime minister to replace General Azhāri, and nine days later a nine-member regency council was formed to represent the shah in his absence abroad, now seen as inevitable.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q3',
          text: 'In December 1978, the shah finally began exploratory talks with members of the moderate opposition. Discussions with Karim Sanjabi proved unfruitful: the National Front leader was bound by his agreement with Khomeini. At the end of December another National Front leader, Shapour Bakhtiar, agreed to form a government on condition the shah leave the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'What now remained was to remove Baḵtiār and prevent a military coup enabling the shah to return. The first of these aims came closer to realization when Jalāl-al-Din Ṭehrāni came to Paris in order to seek a compromise with Khomeini. Khomeini refused to see him until he resigned from the regency council and pronounced it illegal. As for the military, the gap between senior generals, unconditionally loyal to the shah, and the growing number of officers and recruits sympathetic to the revolution, was constantly growing.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'I cannot nor am I willing to express fully the sentiments which I felt on January 16, 1979, when I took the road to the airport with the Empress and my children. I had in mea sinister foreboding for I knew all too well what could happen.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q9',
          text: 'The last image which I carried of this land over which I had reigned for thirty-seven years and to which I had offered a little of my blood was that of the frightful distress on the tearful faces of those who had come to bid us farewell.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'salavati-2017-soqut-e-shah-va-piruzi-ye-enqelab-e-eslami',
      perspective: 'iranian'
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1979-01-13' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'January 13: The formation of nine-member Regency Council sets the stage for the Shah’s departure.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-01-16' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'January 16: The Shah, together with Queen Farah and their children, leave Iran, ostensibly for an extended vacation in Egypt, handing power to prime minister Šāpur Baḵtiār.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    }
  ]
})
