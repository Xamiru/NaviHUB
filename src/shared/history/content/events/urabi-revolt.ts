import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'urabi-revolt',
  names: [
    { text: 'Urabi revolt', lang: 'en', role: 'primary' },
    {
      text: 'Arabi Revolt',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nam-garnet-wolseley', loc: { section: 'Garnet Wolseley', para: '29' } }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1881-02-01' },
        cites: [
          { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1882-09-13' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
          },
          { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:alexandria',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '16' }
        }
      ]
    },
    {
      ref: 'place:tel-el-kebir',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
        }
      ]
    },
    {
      ref: 'place:cairo',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '17' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:siege-of-khartoum', rel: 'related' }
  ],
  sides: [
    {
      key: 'urabists',
      name: 'Urabi forces',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
        }
      ]
    },
    {
      key: 'britain',
      name: 'British',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ahmed-urabi',
      role: 'leader',
      side: 'urabists',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '12' }
        }
      ]
    },
    {
      name: 'Khedive Tawfiq',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '17' }
        }
      ]
    },
    {
      name: 'Sir Garnet Wolseley',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
        }
      ]
    },
    {
      ref: 'person:abdul-hamid-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '16' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 20000 },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
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
          text: 'The direct interference of Europeans in Egypt\'s affairs and the deposition of Khedive Ismail forged a nationalist movement composed of Egyptian landowners and merchants, especially former members of the assembly, Egyptian army officers, and the intelligentsia, including the ulama and Muslim reformers. A secret society of Egyptian army officers had also come into existence in 1876, comparable to the secret society of Egyptian notables. The army society included Colonel Ahmad Urabi, who would become the leader of the nationalist movement, and colonels Ali Fahmi and Abd al Al Hilmi.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/25.htm' }
        },
        {
          id: 'q1',
          text: 'The Urabi forces were routed and the capital captured. The nominal authority of the khedive was restored, and the British occupation of Egypt, which was to last for seventy-two years, had begun.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Britain was especially concerned about protecting the Suez Canal and the British lifeline to India.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In January 1882, Britain and France sent a joint note declaring their support for the khedive.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        },
        {
          id: 'q5',
          text: 'As a result, violent anti-European riots broke out in Alexandria with considerable loss of life on both sides.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        },
        {
          id: 'q6',
          text: 'Bei antieuropäischen Ausschreitungen in der ägyptischen Stadt Alexandria werden 200 Menschen getötet.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '37' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1882.html'
          }
        },
        {
          id: 'q7',
          text: 'Thus, as the British army was about to land in August, Egypt had two leaders: the khedive, whose authority was confined to British-controlled Alexandria, and Urabi, who was in full control of Cairo and the provinces.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Urabi was captured, and he and his associates were put on trial. An Egyptian court sentenced Urabi to death, but through British intervention the sentence was commuted to banishment to Ceylon.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        },
        {
          id: 'q9',
          text: 'Mit der Landung britischer Truppen in Port Said beginnt die britische Besetzung Ägyptens.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '43' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1882.html'
          }
        },
        {
          id: 'q10',
          text: 'With the occupation of 1882, Egypt became a part of the British Empire but never officially a colony.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'FROM OCCUPATION TO NOMINAL INDEPENDENCE: 1882-1923', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/26.htm' }
        },
        {
          id: 'q11',
          text: 'British forces occupied Egypt in 1882 to safeguard the Suez Canal and Britain\'s financial interests.',
          lang: 'en',
          cite: { source: 'nam-garnet-wolseley', loc: { section: 'Garnet Wolseley', para: '48' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nam.ac.uk/explore/garnet-wolseley'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'Britain\'s military intervention in 1882 and its extended, if attenuated, occupation of the country left a legacy of bitterness among the Egyptians that would not be expunged until 1956 when British troops were finally removed from the country.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1881-02-01' },
            cites: [
              {
                source: 'britannica-1911-arabi-pasha',
                loc: { section: 'ARABI PASHA', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On the 1st of February 1881 Arabi and two other Egyptian colonels, summoned before a court-martial for acts of disobedience, were rescued by their soldiers, and the khedive was forced to dismiss his then minister of war in favour of Mahmud Sami.',
        lang: 'en',
        cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1881-09-08' },
            cites: [
              {
                source: 'britannica-1911-arabi-pasha',
                loc: { section: 'ARABI PASHA', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'A military demonstration on the 8th of September 1881, led by Arabi, forced the khedive to increase the numbers and pay of the army, to substitute Sherif Pasha for Riaz Pasha as prime minister, and to convene an assembly of notables.',
        lang: 'en',
        cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1882-06-11' },
            cites: [
              {
                source: 'britannica-1911-arabi-pasha',
                loc: { section: 'ARABI PASHA', para: '1' }
              },
              { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '36' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'British and French warships went to Alexandria at the beginning of June; on the 11th of that month rioting in that city led to the sacrifice of many European lives.',
        lang: 'en',
        cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1882-07-11' },
            cites: [
              {
                source: 'britannica-1911-arabi-pasha',
                loc: { section: 'ARABI PASHA', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On the refusal of France to co-operate, the British fleet bombarded the forts (11th July),',
        lang: 'en',
        cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1882-08-29' },
            cites: [
              { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '42' } },
              { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '43' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Das formal zum Osmanischen Reich gehörende Ägypten steht in den kommenden Jahrzehnten faktisch unter britischem Protektorat.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1882', loc: { section: 'Chronik 1882', para: '43' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1882.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1882-09-13' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'The decisive battle was fought at Tall al Kabir on September 13, 1882.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'From Intervention to Occupation, 1876-82', para: '18' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Bombardment_of_Alexandria_11_July_1882_%281883%29_NMM_NMMG_BHC0642.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bombardment_of_Alexandria_11_July_1882_(1883)_NMM_NMMG_BHC0642.jpg',
    credit: {
      institution: 'National Maritime Museum, Greenwich',
      creator: 'Antonio de Simone the Elder'
    },
    license: { id: 'public-domain' }
  }
})
