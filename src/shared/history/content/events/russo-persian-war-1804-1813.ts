import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-persian-war-1804-1813',
  names: [
    { text: 'Russo-Persian War of 1804–1813', lang: 'en', role: 'primary' },
    { text: 'جنگ اول ایران و روس', lang: 'fa', role: 'native' },
    {
      text: 'First Russo-Iranian war',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '17'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1804-06' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '17'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1813' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '18'
            }
          },
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1813' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Elena Andreeva' },
          { kind: 'scholar', name: 'Heribert Busse' },
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      },
      {
        value: { d: '1812' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 1,
  places: [
    { ref: 'place:ganja' },
    { ref: 'place:yerevan' }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
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
            para: '17'
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
            para: '17'
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
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '18'
          }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
      side: 'iran',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '17'
          }
        },
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
        }
      ]
    },
    {
      ref: 'person:alexander-i-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '16'
          }
        }
      ]
    },
    {
      ref: 'person:pavel-tsitsianov',
      role: 'commander',
      side: 'russia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '17'
          }
        }
      ]
    },
    {
      name: 'Gudovich',
      role: 'commander',
      side: 'russia',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '10' }
        }
      ]
    },
    {
      name: 'General Kotliarevskiĭ',
      role: 'commander',
      side: 'russia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '18'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:treaty-of-finkenstein', rel: 'related' },
    { ref: 'event:anglo-persian-preliminary-treaty-of-1809', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The first Russo-Iranian war (1804-13) started in June 1804 when Tsitsianov appeared at Erevan with 3,000 troops, but he was beaten back by ʿAbbās Mirzā, who encountered him with a superior force of 18,000 troops.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'With the appearance of the Russians in the frontier area, Iran was drawn into the crosscurrents of European power politics.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q3',
          text: 'Between 1804 and 1810 he launched annual campaigns across the Aras, although the war was as good as over by 1806, for Russia had by then gained a firm hold on the land north of the Aras, with the exception of Erevan',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q4',
          text: 'Since Russia’s war with Iran was secondary to its wars in Europe, Russia never had sufficient troops and supplies in the Caucasus, and the quality of the Russian army, including its training and officers, was often inadequate.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '17'
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
          text: 'First war with Russia; ʿAbbās Mirzā leads Persian forces in the second phase of the war; Persian forces are defeated.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1813' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'For Iran, the war was of primary importance and marked their first exposure to active contacts with the European powers.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'In two disastrous wars with Russia, which ended with the Treaty of Gulistan (1812) and the Treaty of Turkmanchay (1828), Iran lost all its territories in the Caucasus north of the Aras River.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q8',
          text: 'According to the treaty, each party was to keep the lands they occupied at the moment of signing the agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '19'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
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
            value: { d: '1804-01' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '16'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'When the Russians overran Ganǰa in 1804, he left Tehran and marched to the relief of Erevan, which was under siege from Russian forces.',
        lang: 'en',
        cite: {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/abbas-mirza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1804-07' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '17'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In July of that year, the Russians laid siege to the city but had to withdraw again.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '17'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '17'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1805, the Russians undertook an unsuccessful attempt to take Anzali, Gilan, and Qazvin',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '17'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1808-10' },
            cites: [
              {
                source: 'iranica-calmard-gardane-mission',
                loc: { section: 'GARDANE MISSION', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Pressed upon by the Tsar and mistaken about the whole political situation (including Malcolm’s threats to invade Fārs), Gudovich decided to invade Erivan at an untimely season (October 1808). He withdrew with heavy losses under severe winter conditions and had to resign.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/gardane-mission'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1810' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1810 the Russians offered Iran a peace treaty which would have restored the occupied territory to her and left her a free hand in eastern Anatolia and Mesopotamia, but these terms were rejected',
        lang: 'en',
        cite: {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/abbas-mirza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1812' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '18'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'They suffered defeats with heavy losses at the battles of Aṣlānduz and Lankarān in 1812 and lost about 5,000 soldiers from their new army.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '18'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1813' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Finally, in 1813, as a result of Napoleon’s campaign in Russia and at British instigation, the peace of Golestān in Šīrvān was signed.',
        lang: 'en',
        cite: {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/abbas-mirza'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Abbas_Mirza_in_battle.jpg/1280px-Abbas_Mirza_in_battle.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abbas_Mirza_in_battle.jpg',
    credit: { institution: 'Brown University Library', creator: 'Hippolyte Bellangé' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'dubrovin-2019-istoriia-voiny-i-vladychestva-russkikh-na-kavkaze',
      perspective: 'russian-soviet'
    },
    { source: 'potto-1885-kavkazskaia-voina', perspective: 'russian-soviet' },
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' },
    {
      source: 'kuznetsova-1983-iran-v-pervoi-polovine-xix-veka',
      perspective: 'russian-soviet'
    }
  ]
})
