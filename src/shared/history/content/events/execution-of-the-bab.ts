import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'execution-of-the-bab',
  names: [
    { text: 'Execution of the Bab', lang: 'en', role: 'primary' },
    { text: 'اعدام باب', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1850-07-08' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          }
        ]
      },
      {
        value: { d: '1850-07-09' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Bahai community' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:babi-movement' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:the-bab',
      role: 'victim',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
        }
      ]
    },
    {
      ref: 'person:amir-kabir',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
        }
      ]
    },
    {
      name: 'Mīrzā Moḥammad-ʿAlī Zonūzī',
      role: 'victim',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
        }
      ]
    },
    {
      name: 'Justin Sheil',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The struggle between a group of Babis and state forces in Māzandarān (September, 1848-May, 1849) caused considerable anxiety in the early months of Nāṣer-al-Dīn Shah’s reign, but its eventual suppression and the fact that it had been restricted to a rural area lessened the fear of the government.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q2',
          text: 'Further outbreaks of mass violence followed after an interval in Neyrīz (Rajab-Šaʿbān, 1266/May-June, 1850) and Zanjān (Rajab, 1266-Rabīʿ I, 1267/May, 1850-January, 1851), although these differed from Shaikh Ṭabarsī in their distinctly urban character and in the relative absence (as far as our sources indicate) of messianic motifs.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Wishing to prevent further outbreaks of Bābī insurrectionary fervor by doing away with the founder of Babism, Amīr Kabīr gave orders for the execution of Sayyed ʿAlī-Moḥammad Bāb, which took place in Tabrīz on 27 Šaʿbān 1266/8 July 1850.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q4',
          text: 'He was, accordingly, brought to Tabrīz at the end of June, 1850, and executed by firing squad in the barracks square there at noon on either July 8 or 9.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q5',
          text: 'The Bāb survived the first volley, when the bullets cut ropes suspending him and Mīrzā Moḥammad-ʿAlī Zonūzī, a disciple, condemned to death with him; a second regiment had to be brought in to complete the task.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
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
          id: 'q7',
          text: 'That the “Mahdī” had been executed and his followers everywhere defeated seemed to most people clear evidence of the falsehood of the Bāb’s claims, and the potential following which would certainly have accrued to the movement had even a measure of success attended its struggle with the state was drastically diminished.',
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
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q8',
          text: 'Bahai accounts, however, state that the remains were at one point removed from the Emāmzāda on the instructions of Mīrzā Ḥosayn-ʿAlī Bahāʾ-Allāh and transferred from hiding-place to hiding-place for almost fifty years before being brought to Palestine in 1899. A shrine to house the remains was begun on Mt. Carmel by ʿAbbās Effendī ʿAbd-al-Bahāʾ, who interred them there in 1908 (Balyuzi, The Báb, pp. 189-92).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q9',
          text: 'During the nineteenth century, something of a myth of the Bāb was perpetuated in some intellectual and literary circles in Europe, largely owing to the widespread influence of the Comte de Gobineau’s Religions et philosophies dans l’Asie centrale (Paris, 1865), which presented an extended and somewhat inaccurate picture of the Bāb not unlike that of Moḥammad popular during the French Enlightenment.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Where_Bab_executed.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Where_Bab_executed.jpg',
    credit: { institution: 'The Dawn-Breakers (bahai-library.com)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' },
    {
      source: 'vahman-2010-yeksad-o-shast-sal-mobarezeh-ba-diyanat-e-bahai',
      perspective: 'iranian'
    }
  ]
})
