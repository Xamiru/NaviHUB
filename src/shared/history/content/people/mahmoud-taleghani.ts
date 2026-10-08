import { definePerson } from '../../schema'

export default definePerson({
  id: 'mahmoud-taleghani',
  names: [
    { text: 'Mahmoud Taleghani', lang: 'en', role: 'primary' },
    { text: 'محمود طالقانی', lang: 'fa', role: 'native', translit: 'Maḥmud Ṭāleqāni' }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1911' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1979' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'activist'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Mahmoud_Taleghani_gives_a_Quran_as_gift_to_Gholamreza_Takhti_in_a_meeting%2C_Hedayat_Mosque%2C_Tehran_-_1957.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmoud_Taleghani_gives_a_Quran_as_gift_to_Gholamreza_Takhti_in_a_meeting,_Hedayat_Mosque,_Tehran_-_1957.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ayatollah Maḥmud Tāleqāni (b. 1911), a leading political cleric',
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
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The ideas of the compatibility of Islam with democracy in the Constitutional Revolution also gained a new generation of adherents among the religious intelligentsia, mostly rallied around Mehdi Bazargan (Bāzargān), Yad-Allāh Ṣaḥābi, and Ayatollah Sayyed Maḥmud Ṭāleqāni.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'taleghani-1982-society-and-economics-in-islam', perspective: 'iranian' }
  ]
})
