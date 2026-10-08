import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-turkmenchay',
  names: [
    { text: 'Treaty of Turkmenchay', lang: 'en', role: 'primary' },
    { text: 'عهدنامه ترکمانچای', lang: 'fa', role: 'native' },
    {
      text: 'Treaty of Torkamānčāy',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1828-02-21' },
        cites: [
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '18' }
          }
        ]
      },
      {
        value: { d: '1826-02-22' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:turkmenchay',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    { ref: 'event:murder-of-alexander-griboedov', rel: 'related' }
  ],
  sides: [
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '24'
          }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '24'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'participant',
      side: 'iran',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
        }
      ]
    },
    {
      ref: 'person:khosrow-mirza-qajar',
      role: 'participant',
      side: 'iran',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '2' }
        }
      ]
    },
    {
      ref: 'person:ivan-paskevich',
      role: 'negotiator',
      side: 'russia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '23'
          }
        }
      ]
    },
    {
      ref: 'person:alexander-griboedov',
      role: 'negotiator',
      side: 'russia',
      cites: [
        {
          source: 'iranica-bournoutian-griboedov',
          loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
        }
      ]
    },
    {
      name: 'John McDonald',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
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
          text: 'By the terms of the peace of Torkmāṇčāy (q.v.), a town southeast of Tabrīz, all land north of the Aras was ceded to Russia; the frontier thus determined still remains in effect.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q2',
          text: 'In addition to the lands yielded under the treaty of Golestān, Iran had to cede to Russia the khanates of Erevan and Naḵjavān',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q3',
          text: 'While only Russia was allowed to have a navy on the Caspian, both countries were to use the Caspian for trade.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'Russia recognized ʿAbbās Mirzā as heir to the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q5',
          text: 'An additional commercial treaty allowed Russia to establish consulates in any location in Iran and granted Russian citizens the right to extraterritoriality.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q6',
          text: 'To make Iran’s humiliation worse, Iran was forced to pay an enormous sum of 20 million rubles in reparations.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'It was only because of British persuasion that the parsimonious shah, faced with the bankruptcy of the state treasury, reluctantly parted with a large portion of his own royal treasures.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q8',
          text: 'ʿAbbās Mirzā emptied his treasury and parted with most of his valuables to pay the reparations',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q9',
          text: 'Extraordinary taxes and dues levied on Iranians further inflamed anti-Russian sentiment in Iran',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q10',
          text: 'The Iranians stayed seventy-nine days in the Russian capital, during which time Ḵosrow Mirzā not only charmed the tsar, the royal family, and the nobility, but also managed to reduce Iran’s war indemnity payment to Russia.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Treaty_of_Turkmenchay_by_Moshkov.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Treaty_of_Turkmenchay_by_Moshkov.jpg',
    credit: { creator: 'Vladimir Moshkov' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1827' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '23'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In the fall 1827, the Russian troops advanced and captured Erevan, Naḵjavān and ʿAbbāsābād; the road to Tabriz was open and peace negotiations started soon after.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '23'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1827-11' },
            cites: [
              {
                source: 'iranica-cronin-army-qajar',
                loc: { section: 'ARMY v. Qajar Period', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'However a second war with Russia in 1826 ended in another disastrous defeat, with the Russians actually entering Tabriz in November 1827',
        lang: 'en',
        cite: {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '18' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/army-v/' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1827-12' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '23'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'During the negotiations, in December of 1827, a war between Russia and the Ottoman empire broke out. The Ottomans offered Iran military help against Russia. Fatḥ-ʿAli Shah tried to use the situation to his advantage in the negotiations, but the Russians resumed military actions, captured Urmia, Ardabil, and Miāna and advanced towards Tehran. Iran had to accept all conditions put forward by Pashkevich',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '23'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' },
    { source: 'potto-1885-kavkazskaia-voina', perspective: 'russian-soviet' },
    {
      source: 'kuznetsova-1983-iran-v-pervoi-polovine-xix-veka',
      perspective: 'russian-soviet'
    }
  ]
})
