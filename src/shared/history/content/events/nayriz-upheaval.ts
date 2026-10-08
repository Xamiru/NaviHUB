import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nayriz-upheaval',
  names: [
    { text: 'Nayriz upheaval of 1850', lang: 'en', role: 'primary' },
    { text: 'قیام بابیان نیریز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1850-05-27' },
        cites: [
          {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1850-06-21' },
        cites: [
          {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:neyriz',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:zanjan-upheaval',
      rel: 'related',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
        }
      ]
    },
    {
      ref: 'event:execution-of-the-bab',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '8' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      name: 'Sayyed Yaḥyā Darābi (“Waḥid”)',
      role: 'leader',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '7' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Nayriz conflict was similar to the Zanjān one, the arrival of a locally-influential religious leader Sayyed Yaḥyā Darābi, known as “Waḥid,” leading to the conversion of many of the townspeople and exacerbating existing urban tensions.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
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
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After the Ṭabarsi conflict, mere adherence to the Bāb could be sufficient to lead to a death sentence, as most famously in the case of the “Seven Martyrs of Tehran,” a group of seven prominent Babis who were executed in public by beheading in February 1850. Comprising three merchants (including a maternal uncle of the Bāb), two clerics, a leading dervish and a government official, the seven were all men of high social rank who could easily have saved their lives by seeming to deny their faith, but chose not to do so',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Again, the local governor tried to settle matters by force, leading to an armed struggle between the Babis and regional troops.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        },
        {
          id: 'q5',
          text: 'As in Zanjān, the Babis’ religious fervour gave them an initial advantage over the forces sent against them and the besiegers’ final victory was achieved by deceit, and was marked by the torture and killing of the Babi survivors.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Eventually, resistance was overcome, about a hundred men being straightaway beheaded, others were imprisoned or eventually executed, whilst the women were given over to the soldiers, many eventually becoming beggars in Shiraz',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Following the outbreak of these conflicts, Amir Kabir (1807-52), Nāṣer-al-Din Shah’s (r. 1848-96) chief minister, determined to have the Bāb himself executed.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1853-03-26' },
            cites: [
              {
                source: 'iranica-smith-momen-martyrs-babi',
                loc: { section: 'MARTYRS, BABI', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'There was also a further upheaval in the town of Nayriz following the assassination of the town’s governor by some Babis (March 26, 1853), the new governor using the incident as a pretext to pillage and plunder the town extensively, in response to which many people fled to the mountains, attacking the soldiery sent to subdue them.',
        lang: 'en',
        cite: {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' }
  ]
})
