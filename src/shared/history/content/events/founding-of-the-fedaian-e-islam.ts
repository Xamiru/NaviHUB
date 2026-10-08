import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-fedaian-e-islam',
  names: [
    { text: 'Founding of the Fedaian-e Islam', lang: 'en', role: 'primary' },
    { text: 'تأسیس فدائیان اسلام', lang: 'fa', role: 'native' },
    { text: 'Fedāʾīān-e Eslām', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1945' },
        cites: [
          {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '1' }
          }
        ]
      },
      {
        value: { d: '1943' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1943' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      name: 'Nawwāb Ṣafawī',
      role: 'leader',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '1' }
        }
      ]
    },
    {
      name: 'Sayyed Ḥosayn Emāmī',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
        }
      ]
    },
    {
      name: 'Ḵalīl Ṭahmāsbī',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
        }
      ]
    },
    {
      ref: 'person:abol-ghasem-kashani',
      role: 'participant',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:assassination-of-ahmad-kasravi',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
        }
      ]
    },
    {
      ref: 'event:assassination-of-ali-razmara',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
        }
      ]
    },
    { ref: 'event:attempted-assassination-of-mohammad-reza-shah-1949', rel: 'related' },
    {
      ref: 'event:assassination-of-hassan-ali-mansur',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '14' }
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
          text: 'FEDĀʾĪĀN-E ESLĀM, a Shiʿite fundamentalist group with a strong activist political orientation. It was founded in 1945 by a charismatic figure, Sayyed Mojtabā Mīrlawḥī (b. 1923; d. 1955).',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q2',
          text: 'The Fedāʾīān’s importance in Persian politics was due to several related factors. First, they were exceptionally successful as a terrorist organization, evoking tremendous fear with their daring acts of assassination. Second, their espousal of oil nationalization and strong advocacy of Persia’s sovereignty had popular support.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The occupation of Iran by Allied forces (September 1941) and the forced abdication of Reza Shah Pahlavi (r. 1925-41) inadvertently encouraged limited social and political freedoms, which allowed publication of books and newspapers and formation of active social, political, and religious organizations previously prohibited. These formed all across Iran, and Islamic magazines and publications flourished.',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        },
        {
          id: 'q4',
          text: 'During his stay in Najaf, Nawwāb became fully aware of the anti-Shiʿite writings of the noted Persian historian and intellectual, Aḥmad Kasrawī (e.g., Šīʿagarī, Tehran, 1321 Š./1942). Nawwāb soon acquired the clerics’ deep disdain for Kasrawī and decided to return to Tehran in 1945 to take immediate action',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The Fedāʾīān’s public stature was enhanced when it formed an alliance (1946-51) with the well-known Ayatollah Sayyed Abu’l-Qāsem Kāšānī',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q6',
          text: 'The Fedāʾīān’s major ideological statement, Rāhnemā-ye ḥaqāʾeq (Guide to truth) was published in 1950 in Tehran and reissued after the 1978-79 revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q7',
          text: 'The overarching principles of the Fedāʾīān program call for a full application of Islamic law, complete administration of the Islamic judicial system, including qeṣāṣ (“law of retaliation”) and other forms of punishment.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Nawwāb became fully disillusioned with the Shah’s regime, however, when the Persian government decided to join the Baghdad Pact.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q9',
          text: 'However, the Coalition of Islamic Associations which grew from the former members and sympathizers of the Fedāʾīān, with their well established connections to Ayatollah Khomeini and his lieutenants since 1963 and their role as a major faction in the government of the Islamic Republic, must be considered as the main carriers of the Fedāʾīān’s legacy in post-revolutionary Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
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
            value: { d: '1945-05-14' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '2' }
              }
            ]
          },
          {
            value: { d: '1945-04-18' },
            cites: [
              {
                source: 'iranica-amini-kasravi-assassination',
                loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'With four hundred tomans borrowed from Ayatollah Ḥājj Shaikh Moḥammad-Ḥasan Ṭālaqānī, he purchased a gun and attempted unsuccessfully to assassinate Kasrawī on a Tehran street on 14 May 1945. Nawwāb, who was arrested on the same day, was released soon afterwards and announced through broadsheets the formation of the Fedāʾīān',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-03-11' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
              },
              {
                source: 'iranica-amini-kasravi-assassination',
                loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Undaunted by his initial failure, Nawwāb arranged successfully for two of his followers, the brothers Sayyed Ḥosayn and Sayyed ʿAlī-Moḥammad Emāmī, to murder Kasrawī and his secretary on 11 March 1946 at the Ministry of Justice',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1949-11-04' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The assassination of Hažīr on 4 November by the diehard Fedāʾīān member Ḥosayn Emāmī induced a strong element of panic in the regime which led to the suspension of the elections and a new vote in Tehran.',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1951-03-07' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Fedāʾīān’s most daring assassination occurred on 7 March 1951 when Prime Minister Ḥājj ʿAlī Razmārā was gunned down by Ḵalīl Ṭahmāsbī at the Šāh Mosque.',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1955-11-16' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The unsuccessful attempt to assassinate prime minister Ḥosayn ʿAlāʾ on 16 November 1955, on the eve of his departure to Baghdad to ratify Persia’s participation in the pact, was the death knell for the Fedāʾīān.',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-01-18' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Nawwāb and three of his close associates, including Razmārā’s assassin, were executed by a firing squad on 18 January 1956',
        lang: 'en',
        cite: {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Teymur_Bakhtiar_%28Left%29_arrests_Navvab_Safavi_%28Right%29_-_1955.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Teymur_Bakhtiar_(Left)_arrests_Navvab_Safavi_(Right)_-_1955.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  }
})
