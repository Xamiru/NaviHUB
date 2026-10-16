import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'voyages-of-zheng-he',
  names: [
    { text: 'Voyages of Zheng He', lang: 'en', role: 'primary' },
    {
      text: 'Ming treasure voyages',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '26' }
        }
      ]
    },
    {
      text: 'Ming voyages',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '1' }
        }
      ]
    },
    {
      text: 'Ming maritime expeditions',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1405' },
        cites: [
          {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '1' }
          },
          {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '14' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1433' },
        cites: [
          {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '1' }
          },
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'southeast-asia', 'south-asia', 'mena', 'subsaharan-africa'],
  prominence: 1,
  places: [
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '14' }
        }
      ]
    },
    {
      ref: 'place:calicut',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '14' }
        }
      ]
    },
    {
      ref: 'place:hormuz',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '17' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ming-dynasty',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:zheng-he',
      role: 'commander',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '1' }
        }
      ]
    },
    {
      ref: 'person:yongle-emperor',
      role: 'organizer',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '3' }
        }
      ]
    },
    {
      name: 'Ma Huan',
      role: 'witness',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '17' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 28000, qualifier: 'nearly' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '14' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:yongle-emperor-and-the-move-to-beijing',
      rel: 'related',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '22' }
        }
      ]
    },
    {
      ref: 'event:voyages-of-vasco-da-gama-and-the-portuguese-in-the-indian-ocean',
      rel: 'related',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '20' }
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
          text: 'From 1405 until 1433, the Chinese imperial eunuch Zheng He led seven ocean expeditions for the Ming emperor that are unmatched in world history.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q2',
          text: 'These missions were astonishing as much for their distance as for their size: during the first ones, Zheng He traveled all the way from China to Southeast Asia and then on to India, all the way to major trading sites on India\'s southwest coast.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'To demonstrate Ming power, the first emperors initiated campaigns to decisively defeat any domestic or foreign threat.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q4',
          text: 'China had been extending its power out to sea for 300 years.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q5',
          text: 'By the beginning of the Ming Dynasty, China had reached a peak of naval technology unsurpassed in the world.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'On his return, Zheng He put down a pirate uprising in Sumatra, bringing the pirate chief, an overseas Chinese, back to Nanjing for punishment.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q7',
          text: 'When fighting broke out there between his forces and those of a small kingdom, Zheng put down the fighting, captured the king and brought him back to China where he was released by the emperor and returned home duly impressed.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q8',
          text: 'On the way, Zheng He stopped in Sumatra to fight on the side of a deposed sultan, bringing the usurper back to Nanjing for execution.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q9',
          text: 'On this trip Zheng He ventured even further, first to Aden at the mouth of the Red Sea, and then on to the east coast of Africa, stopping at the city states of Mogadishu and Brawa (in today\'s Somalia), and Malindi (in present day Kenya).',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q10',
          text: 'One auxiliary voyage traveled up the Red Sea to Jidda, only a few hundred miles from the holy cities of Mecca and Medina.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The Ming maritime expeditions stopped rather suddenly after 1433, the date of the last voyage.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q12',
          text: 'When another seafaring voyage was suggested to the court in 1477, the vice president of the Ministry of War confiscated all of Zheng He\'s records in the archives, damning them as "deceitful exaggerations of bizarre things far removed from the testimony of people\'s eyes and ears."',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q13',
          text: 'Linked to eunuch politics and wasteful policies, the voyages were over.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q14',
          text: 'By the century\'s end, ships could not be built with more than two masts, and in 1525 the government ordered the destruction of all oceangoing ships.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
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
            value: { d: '1405' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The first expedition of this mighty armada (1405-07) was composed of 317 ships, including perhaps as many as sixty huge Treasure Ships, and nearly 28,000 men.',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1407' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The second expedition (1407-1409) took 68 ships to the court of Calicut to attend the inauguration of a new king.',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1409' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Zheng He did command the third voyage (1409-1411) with 48 large ships and 30,000 troops, visiting many of the same places as on the first voyage but also traveling to Malacca on the Malay peninsula and Ceylon (Sri Lanka).',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1413' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The fourth voyage (1413-15) extended the scope of the expeditions even further.',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1417' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The fifth voyage (1417-1419) was primarily a return trip for seventeen heads of state from South Asia.',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1421' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The sixth expedition (1421-1422) of 41 ships sailed to many of the previously visited Southeast Asian and Indian courts and stops in the Persian Gulf, the Red Sea, and the coast of Africa, principally in order to return nineteen ambassadors to their homelands.',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1431' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The seventh and final voyage (1431-33) was sent out by the Yongle emperor\'s successor, his grandson the Xuande emperor.',
        lang: 'en',
        cite: {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/IMMH_Chinese_treasure_ship_model.jpg/1280px-IMMH_Chinese_treasure_ship_model.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:IMMH_Chinese_treasure_ship_model.jpg',
    credit: {
      institution: 'Internationales Maritimes Museum Hamburg',
      creator: 'Damián Morán Dauchez'
    },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
