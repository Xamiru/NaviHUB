import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-persian-war-1826-1828',
  names: [
    { text: 'Russo-Persian War of 1826–1828', lang: 'en', role: 'primary' },
    { text: 'جنگ دوم ایران و روس', lang: 'fa', role: 'native' },
    {
      text: 'Second Russo-Persian War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bournoutian-griboedov',
          loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1826-07' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '22'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1828-02-21' },
        cites: [
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '18' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:ganja',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
        }
      ]
    },
    {
      ref: 'place:yerevan',
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
      ref: 'place:tabriz',
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
    {
      ref: 'event:treaty-of-golestan',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
        }
      ]
    },
    {
      ref: 'event:treaty-of-turkmenchay',
      rel: 'led-to',
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
            para: '22'
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
            para: '22'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
      side: 'iran',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
        }
      ]
    },
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
      name: 'Allāh-Yār Khan Āṣaf-al-Dawla',
      role: 'leader',
      side: 'iran',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
        }
      ]
    },
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '22'
          }
        }
      ]
    },
    {
      name: 'Alexis Ermolov',
      role: 'commander',
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
      ref: 'person:ivan-paskevich',
      role: 'commander',
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
      role: 'participant',
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
          id: 'q11',
          text: '1826 Second war with Russia; Persian forces are defeated.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        },
        {
          id: 'q1',
          text: 'However a second war with Russia in 1826 ended in another disastrous defeat, with the Russians actually entering Tabriz in November 1827, and was concluded with the Treaty of Turkmanchay (21 February 1828; cf. Williamson).',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The relations between the two countries were rapidly deteriorating.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '21'
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
          text: 'In the same year, Nicholas I sent Prince Menshikov to Iran to inform the Iranian sovereign about his ascendance, peacefully negotiate the borders, and return some territories in Ṭāleš. Simultaneously with the Menshikov mission, Nicholas sent Lieutenant Noskov with a famous crystal bed as a gift to Fatḥ-ʿAli Shah. The magnificent bed was placed in the Golestān Palace, but Menshikov’s mission failed; Iran was preparing for a war',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '22'
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
          text: 'The war council held in the presence of the shah in Solṭānīya later in spring of 1826 could not find an effective solution to the Persian setbacks in the battlefield because of the animosity between the shah’s sons, the absence of an effective military command, and most of all because of the shah’s “extreme unwillingness to part with money” in order to re-equip the Azarbaijan army or to raise, as the shah wished, a new irregular cavalry in Tabrīz under his own command.',
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
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Fatḥ-ʿAli Shah tried to use the situation to his advantage in the negotiations, but the Russians resumed military actions, captured Urmia, Ardabil, and Miāna and advanced towards Tehran.',
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
            value: { d: '1826-06-23' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On 23 June 1826, the ulama issued a call for holy war (jehād) against Russia',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '22'
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
            value: { d: '1826-07' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In July, ʿAbbās Mirzā attacked the Russians in Ṭāleš, Qarābāḡ, and Armenia, captured Ganja, Lenkarān, Shirvan, and some other areas and laid siege to Baku.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '22'
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
            value: { d: '1826-09' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In September, 1826, ʿAbbās Mīrzā advanced toward Ganǰa via Šošā; but he suffered such a severe defeat that the outcome of the war was never thereafter in doubt.',
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
      }
    },
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
        id: 'q9',
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
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1827-10-24' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Heribert Busse' }
            ]
          },
          {
            value: { d: '1827-11' },
            cites: [
              {
                source: 'iranica-cronin-army-qajar',
                loc: { section: 'ARMY v. Qajar Period', para: '18' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Stephanie Cronin' }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'ʿAbbās Mīrzā scored minor victories at Üč Kilise (Echmiadzin) and Nakhchevan (Fasāʾī, IX, p. 273, tr. Busse, p. 181), but the Russians penetrated into Azarbaijan and captured Tabrīz on 3 Rabīʿ II 1243/24 October 1827.',
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
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/%D0%A1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE%D0%B4_%D0%95%D0%BB%D0%B8%D1%81%D0%B0%D0%B2%D0%B5%D1%82%D0%BF%D0%BE%D0%BB%D0%B5%D0%BC.jpeg/1280px-%D0%A1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE%D0%B4_%D0%95%D0%BB%D0%B8%D1%81%D0%B0%D0%B2%D0%B5%D1%82%D0%BF%D0%BE%D0%BB%D0%B5%D0%BC.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%A1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D0%BE%D0%B4_%D0%95%D0%BB%D0%B8%D1%81%D0%B0%D0%B2%D0%B5%D1%82%D0%BF%D0%BE%D0%BB%D0%B5%D0%BC.jpeg',
    credit: { institution: 'National Museum of History of Azerbaijan', creator: 'Franz Roubaud' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'potto-1885-kavkazskaia-voina', perspective: 'russian-soviet' },
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' },
    {
      source: 'kuznetsova-1983-iran-v-pervoi-polovine-xix-veka',
      perspective: 'russian-soviet'
    }
  ]
})
