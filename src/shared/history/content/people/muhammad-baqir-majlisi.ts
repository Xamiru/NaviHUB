import { definePerson } from '../../schema'

export default definePerson({
  id: 'muhammad-baqir-majlisi',
  names: [
    { text: 'Muhammad Baqir Majlisi', lang: 'en', role: 'primary' },
    { text: 'محمدباقر مجلسی', lang: 'fa', role: 'native', translit: 'Moḥammad-Bāqer Majlesi' },
    {
      text: 'Majlesi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-brunner-majlesi-mohammad-baqer',
          loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '1' }
        }
      ]
    },
    {
      text: 'Majlesi II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-brunner-majlesi-mohammad-baqer',
          loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1627' },
        cites: [
          {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1699-03-29' },
        cites: [
          {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '4' }
          }
        ]
      },
      {
        value: { d: '1700-03-18' },
        cites: [
          {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'scholar'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Portrait_of_Allamah_Majlisi.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Allamah_Majlisi.jpg',
    credit: { institution: 'Freer Gallery of Art and Arthur M. Sackler Gallery' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Majlesi’s reputation among the ulema (ʿālem, pl.ʿolamāʾ “religious scholar”) rests primarily upon his monumental hadith encyclopedia Beḥār al-anwār in which he rearranged the entire corpus of Twelver Shiʿite traditions.',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        },
        {
          id: 'q2',
          text: 'Majlesi exerted unprecedented political influence',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Majlesi first studied with his father and other eminent scholars.',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        },
        {
          id: 'q4',
          text: 'Majlesi fought against both Sunnite Islam and Sufism, but his opposition to Sufism was a delicate issue.',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'Majlesi’s most important book is the Beḥār al-anwār, one of the most extensive collections of Imamite hadith; it comprises 111 volumes in the printed edition.',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'The exact dates of Majlesi’s birth and death are disputed.',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        },
        {
          id: 'q7',
          text: 'For his date of death, the day is always 27 Ramażān, but one finds the year 1110 (29 March 1699), as well as the year 1111 (18 March 1700).',
          lang: 'en',
          cite: {
            source: 'iranica-brunner-majlesi-mohammad-baqer',
            loc: { section: 'MAJLESI, Moḥammad-Bāqer', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/majlesi-mohammad-baqer'
          }
        }
      ]
    }
  ]
})
