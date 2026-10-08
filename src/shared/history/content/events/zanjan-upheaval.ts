import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'zanjan-upheaval',
  names: [
    { text: 'Zanjān upheaval', lang: 'en', role: 'primary' },
    { text: 'قیام بابیان زنجان', lang: 'fa', role: 'native' },
    {
      text: 'Babi uprising of Zanjān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1850-05-13', approx: true },
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
        value: { d: '1851-01-02', approx: true },
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
      ref: 'place:zanjan',
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
      ref: 'event:shaykh-tabarsi-uprising',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '4' }
        },
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
    },
    {
      ref: 'event:nayriz-upheaval',
      rel: 'related',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      name: 'Mollā Moḥammad-ʿAli Ḥojjat',
      role: 'leader',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
        }
      ]
    },
    {
      ref: 'person:amir-kabir',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '3' }
        },
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '8' }
        }
      ]
    },
    {
      name: 'ʿAzīz Khan Mokrī',
      role: 'commander',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '3' }
        }
      ]
    },
    {
      name: 'Moḥammad Khan Amīr Tūmān',
      role: 'commander',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '3' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Walled_enclosure_Zengan_by_Eug%C3%A8ne_Flandin.jpg/1280px-Walled_enclosure_Zengan_by_Eug%C3%A8ne_Flandin.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Walled_enclosure_Zengan_by_Eug%C3%A8ne_Flandin.jpg',
    credit: {
      institution: 'Eugène Flandin and Pascal Coste, Voyage en Perse (Gide et Baudry, 1851)',
      creator: 'Eugène Flandin'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'There then followed two major conflicts between the Babis and their opponents in the towns of Zanjān (ca. May 13, 1850-ca. January 2, 1851) and Nayriz (May 27- June 21, 1850) respectively in the north and south of Persia, as well as a more limited confrontation in Yazd (January-February 1850).',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        },
        {
          id: 'q2',
          text: 'At Zanjān, one of the leading clerics, Mollā Moḥammad-ʿAli Ḥojjat, had become a Babi, bringing several thousand of his followers into the new religion.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '6' }
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
        },
        {
          id: 'q4',
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
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'On the occasion of the Babi uprising of Zanjān led by Mollā Moḥammad-ʿAlī Zanjānī (begun in Rajab, 1266/April, 1850), Amīr Kabīr dispatched ʿAzīz Khan to Zanjān to quell the revolt and, at the same time, to act as ambassador to Yerevan, where Prince Alexander Pavlovitch was putting down a local rebellion.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-aziz-khan-mokri',
            loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/aziz-khan-mokri-sardar-e-koll/'
          }
        },
        {
          id: 'q6',
          text: 'After trying first to negotiate with the Babis and then to attack them, both in vain, ʿAzīz Khan left it to Moḥammad Khan Amīr Tūmān, head of the troops in Zanjān, to suppress them and went himself to Yerevan',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-aziz-khan-mokri',
            loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/aziz-khan-mokri-sardar-e-koll/'
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
        },
        {
          id: 'q8',
          text: 'The character of these struggles in particular has suggested to some commentators that they were more of an expression of social and political discontent than of religious fervor, and there is undoubtedly a measure of truth in this, particularly in the case of Zanjān.',
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
        },
        {
          id: 'q9',
          text: 'Our emphasis must at present remain on the outwardly religious character of Babism, while recognizing the value of religious motifs as a means of socio-political expression in a society such as Qajar Iran.',
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
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1850-05-13', approx: true },
            cites: [
              {
                source: 'iranica-smith-momen-martyrs-babi',
                loc: { section: 'MARTYRS, BABI', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'An inter-communal conflict developed, which led to the city governor ordering the physical division of the town into Babi and non-Babi sections.',
        lang: 'en',
        cite: {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1850-05-13', approx: true },
            cites: [
              {
                source: 'iranica-smith-momen-martyrs-babi',
                loc: { section: 'MARTYRS, BABI', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Fighting ensued, followed by the employment of troops and an almost nine month siege of the Babi quarter, during which the poorly armed defenders held off the besiegers, killing many.',
        lang: 'en',
        cite: {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1851-01-02', approx: true },
            cites: [
              {
                source: 'iranica-smith-momen-martyrs-babi',
                loc: { section: 'MARTYRS, BABI', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Many of the Babis were killed during the struggle and most of the survivors who fought to the end were massacred.',
        lang: 'en',
        cite: {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '6' }
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
