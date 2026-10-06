import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'imprisonment-of-the-bab',
  names: [
    { text: 'Imprisonment of the Báb', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1845-06' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1850' },
        cites: [
          {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '9' }
          },
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
        }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
        }
      ]
    },
    {
      ref: 'place:maku',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
        }
      ]
    },
    {
      ref: 'place:chehriq',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '9' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '10' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' },
    { ref: 'period:babi-movement' }
  ],
  participants: [
    {
      ref: 'person:the-bab',
      role: 'victim',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
        }
      ]
    },
    {
      ref: 'person:haji-mirza-aqasi',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
        }
      ]
    },
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-maceoin-babism-i',
          loc: { section: 'BABISM i. The Babi movement', para: '9' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'participant',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '10' }
        },
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '1' }
        }
      ]
    },
    {
      name: 'Manūčehr Khan Moʿtamed-al-Dawla',
      role: 'participant',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
        }
      ]
    },
    {
      name: 'Dolgorukov',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '9' }
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
          text: 'Successive imprisonments between 1261/1845 and 1267/1850 prevented him from active participation in the affairs of the sect, but his writings were copied and widely disseminated and large numbers of pilgrims succeeded in obtaining personal interviews with him, in spite of official disapproval.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q2',
          text: 'The Bāb was summoned by Moḥammad Shah to Tehran but en route diverted to Mākū in Azarbaijan, where he remained in confinement until his transfer in May, 1848 to the fortress of Čahrīq, his place of imprisonment until shortly before his execution in 1266/1850.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '9' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In Mākū the Bāb was placed under what was originally close confinement in the castle overlooking the town, but before long conditions were sufficiently relaxed to permit the arrival of visitors and the resumption of communications between him and his followers.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q4',
          text: 'At this hearing, the Bāb made public his claim to be the return of the Hidden Imam and was unofficially sentenced to death by several of the ʿolamāʾ present.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q5',
          text: 'The charge of insanity was introduced in order to prevent his execution at this juncture.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q6',
          text: 'In an account of the Bāb’s interrogation possibly written by Amīr Aṣlān Khan Majd-al-Dawla, it is stated that, following his bastinado, the Bāb recanted his claims and gave a “sealed undertaking” that he would not repeat his errors.',
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
        },
        {
          id: 'q7',
          text: 'Conflicting accounts of this examination exist, but all are agreed that the Bāb insisted on his claim to be the Hidden Imam returned—a claim whose political implications would not have been missed.',
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
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Facing internal dissent and worrying about the shah’s illness, Āqāsi avoided adopting any drastic measures against the Babis.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q9',
          text: 'Final confrontation of the Babi movement with the ulema and the Qajar state and its bloody repression was left to Mirzā Taqi Khan Amir Kabir in the next reign (Amanat, 1989, pp. 372 ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
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
            value: { d: '1845-06' },
            cites: [
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'An incident there involving some Babis (including Bārforūšī, who had gone ahead from Būšehr) about mid-June led the governor, Mīrzā Ḥosayn Khan Moqaddam Marāḡaʾī Ājūdānbāšī, to seek the Bāb’s arrest; the latter was, accordingly, taken into custody while en route from Būšehr at the end of June.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1846-09' },
            cites: [
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'During an outbreak of cholera in Shiraz in September, 1846, the Bāb succeeded in escaping to Isfahan, where he had already sent a number of disciples to await his arrival, and where he was favorably received in the home of the emām-e jomʿa.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1847-07', approx: true },
            cites: [
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'At Kolayn near the capital, however, instructions came that the Bāb was to be taken to the town of Mākū in Azarbaijan, where he arrived, after a stay of forty days in Tabrīz, about July, 1847.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-05' },
            cites: [
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'He arrived there in early May, 1848, and was placed under strict confinement.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-07' },
            cites: [
              {
                source: 'iranica-maceoin-babism-ii',
                loc: { section: 'BABISM ii. Babi executions and uprisings', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Towards the end of the same month, the Bāb himself was brought from Čahrīq to Tabrīz, where he was interrogated by a council of ʿolamāʾ and state officials presided over by Nāṣer-al-Dīn Mīrzā (shortly to be made king).',
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
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-08' },
            cites: [
              {
                source: 'iranica-maceoin-bab',
                loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Following his return to Čahrīq in August, 1848, however, the Bāb devoted himself to the elaboration of a yet more radical development of his position.',
        lang: 'en',
        cite: {
          source: 'iranica-maceoin-bab',
          loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Panorama_upon_Maku.jpg/1280px-Panorama_upon_Maku.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Panorama_upon_Maku.jpg',
    credit: { creator: 'Fabien Dany' },
    license: { id: 'cc-by-sa', version: '2.0' }
  }
})
