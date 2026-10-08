import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'badasht-conference',
  names: [
    { text: 'Conference of Badasht', lang: 'en', role: 'primary' },
    { text: 'اجتماع بدشت', lang: 'fa', role: 'native' },
    { text: 'Badašt', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1848-06', notAfter: '1848-07' },
        cites: [
          { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:badasht',
      cites: [
        { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' },
    { ref: 'period:babi-movement' }
  ],
  related: [
    {
      ref: 'event:shaykh-tabarsi-uprising',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '11' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tahereh-qorrat-al-ayn',
      role: 'leader',
      cites: [
        { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } },
        {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '10' }
        }
      ]
    },
    {
      ref: 'person:qoddus',
      role: 'leader',
      cites: [
        { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } },
        { source: 'iranica-mohammad-hosseini-qoddus', loc: { section: 'QODDUS', para: '6' } }
      ]
    },
    {
      ref: 'person:bahaullah',
      role: 'organizer',
      cites: [
        { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 80, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-maceoin-babism-ii',
                loc: { section: 'BABISM ii. Babi executions and uprisings', para: '1' }
              },
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '11' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In July, 1848, a gathering of some eighty Babi activists, including Qorrat-al-ʿAyn and Mollā Moḥammad-ʿAlī Bārforūšī, formally proclaimed the advent of the qīāma.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q1',
          text: 'BADAŠT, small village of about 1,000 inhabitants, 7 km east of the city of Šāhrūd, in the Qajar-period province of Khorasan (now in Semnān Province); it was the site of a Babi conference in late Rajab-early Šaʿbān, 1264/late June-early July, 1848, convened on the instructions of the Bāb.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q3',
          text: 'The conference marks a critical turning point in the development of the Babi movement.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'The situation changed radically when, in the early months of 1848, the Bāb wrote a letter in which he proclaimed himself the promised imam in person and declared the abrogation of the laws of Islam.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q5',
          text: 'The primary purpose of the resulting conference was to announce the abrogation of the Islamic Šarīʿa and the inauguration of a new Babi Šarīʿa.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q6',
          text: 'A subsidiary purpose of the conference was to discuss ways of releasing the Bāb from his imprisonment at Mākū.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Physical arrangements were undertaken by Mīrzā Ḥosayn-ʿAlī Nūrī, who during the conference took on the title of Bahāʾ and in later years became better known as Bahāʾ-Allah.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q8',
          text: 'Also during the conference the title Qoddūs was given to Mollā Moḥammad-ʿAlī Bārforūšī and Ṭāhera to Qorrat-al-ʿAyn, who were both members of the earliest group of the Bāb’s disciples, the ḥorūf-e ḥayy (Letters of the Living; q.v.).',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q9',
          text: 'But, despite this, there was a great deal of consternation among those attending, particularly when Ṭāhera underlined this break by appearing in public unveiled.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Some left the Babi movement after the conference.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q11',
          text: 'After the conference, the majority of the participants set off towards Māzandarān but were attacked by the villagers of Nīālā and dispersed.',
          lang: 'en',
          cite: { source: 'iranica-momen-badasht', loc: { section: 'BADAŠT', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/badast'
          }
        },
        {
          id: 'q12',
          text: 'The Badašt gathering seems to have acted as a signal, in concert with the Bāb’s own announcement of his more developed claims, for the successive Babi-led risings in Māzandarān, Neyrīz (Nīrīz) and Zanjān, between 1848 and 1850 (see babism).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '11' }
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
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' }
  ]
})
