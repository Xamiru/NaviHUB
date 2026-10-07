import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'babi-movement',
  names: [
    { text: 'Babi movement', lang: 'en', role: 'primary' },
    {
      text: 'Babism',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  periodType: 'movement',
  start: {
    alts: [
      {
        value: { d: '1844' },
        cites: [
          {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1853' },
        cites: [
          {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Babism was a 13/19th-century messianic movement in Iran and Iraq under the overall charismatic leadership of Sayyed ʿAlī-Moḥammad Šīrāzī, the Bāb (1235/1819-1266/1850).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q2',
          text: 'Babism was the only significant millenarian movement in Shiʿite Islam during the 13th/19th century and is of particular interest in that, unlike other Islamic messianic movements of approximately the same period, it involved, in its later stages, a wholesale break with Islam and an attempt to establish a new religious system.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q3',
          text: 'For our purposes, Babism may be divided into two main periods: 1) from 1250/1844 to 1264/1848, when the Bāb claimed to be the gate preparing the way for the return of the Hidden Imam and the movement around him was characterized by intense Islamic piety and observance of the Šarīʿa or Islamic law; and 2) from 1264/1848 to 1269/1853, beginning with the Bāb’s claim to be the Imam in person and the abrogation of the Islamic Šarīʿa, through his assumption of the role of an independent theophany and his promulgation of a new religious law, to his execution in Tabrīz, the collapse of the leadership of the movement, the proliferation of authority claims, and the dispersal of a hard core of the sect to Baghdad. This second period also witnessed the outbreak of clashes between Babis and state in several parts of Iran and the physical defeat of the movement as a challenge to the religio-political system.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Coupled with the debacles of Māzandarān, Neyrīz, and Zanjān, in the course of which some 2,000 to 3,000 Babis, including most of the provincial leadership, perished (on these figures see MacEoin, “From Babism to Baha’ism,” p. 236), the Bāb’s death spelt the end of the movement as a vital political force in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q5',
          text: 'Although the Babi movement as such was rapidly crushed and rendered politically and religiously insignificant, the impetus towards the proclamation of a post-Islamic revelation was continued in Bahaism which began as a Babi sect in competition with that of the Azalī Babism during the 1860s.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Writings-bab-handwriting-mulla-husayn.jpg/1280px-Writings-bab-handwriting-mulla-husayn.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Writings-bab-handwriting-mulla-husayn.jpg',
    credit: {
      institution: 'Ruhu\'llah Mehrabkhani, Mulla Husayn: Disciple at Dawn (Kalimát Press, 1987)',
      creator: 'Mullá Husayn Bushru\'i'
    },
    license: { id: 'public-domain' }
  }
})
