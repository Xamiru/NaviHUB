import { definePerson } from '../../schema'

export default definePerson({
  id: 'akbar-hashemi-rafsanjani',
  names: [
    { text: 'Akbar Hashemi Rafsanjani', lang: 'en', role: 'primary' },
    { text: 'اکبر هاشمی رفسنجانی', lang: 'fa', role: 'native' },
    {
      text: 'Ali Akbar Hashemi-Rafsanjani',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'The Majlis', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1934-08-25' },
        cites: [
          {
            source: 'lc-names-hashimi-rafsanjani-ali-akbar-n84041639',
            loc: { section: 'Hāshimī Rafsanjānī, ʻAlī Akbar' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2017-01-08' },
        cites: [
          {
            source: 'lc-names-hashimi-rafsanjani-ali-akbar-n84041639',
            loc: { section: 'Hāshimī Rafsanjānī, ʻAlī Akbar' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'politician', 'head-of-state'],
  offices: [
    {
      title: 'Speaker of the Majlis',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1980-06' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Bani Sadr Presidency', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1989' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Bani Sadr Presidency', para: '3' }
        },
        { source: 'loc-iran-country-study-1987', loc: { section: 'The Majlis', para: '2' } }
      ]
    },
    {
      title: 'President of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1989' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1997' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Akbar_Hashemi_Rafsanjani_Portrait_%284%29%28cropped%29.jpg/1280px-Akbar_Hashemi_Rafsanjani_Portrait_%284%29%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Akbar_Hashemi_Rafsanjani_Portrait_(4)(cropped).jpg',
    credit: { institution: 'National Library and Archives of Iran' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The cleric ʿAli-Akbar Hāšemi Rafsanjāni, a wealthy pistachio grower from Kerman, author of a book on Amir Kabir, active in the Islamic Revolution, a close confidant of Ayatollah Khomeini and former speaker of the Majles, is elected president. He is reelected in 1993.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Rafsanjani was elected as speaker of the first Majlis; he was reelected six times through the beginning of 1987.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'The Majlis', para: '2' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/85.htm' }
        },
        {
          id: 'q3',
          text: 'Hojjatoleslam Ali Akbar Hashemi-Rafsanjani, who as of late 1987 had been the speaker of the Majlis since its formation in 1980, also supported Montazeri\'s succession.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'The Faqih', para: '3' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/82.htm' }
        },
        {
          id: 'q4',
          text: 'On the Iranian side, then-Speaker of the Parliament ʿAli-Akbar Hāšemi Rafsanjāni reportedly brought senior leaders into the arms-for-hostages initiative out of a simple desire to share responsibility for it.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        }
      ]
    }
  ]
})
