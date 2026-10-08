import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-ahmad-kasravi',
  names: [
    { text: 'Assassination of Ahmad Kasravi', lang: 'en', role: 'primary' },
    { text: 'ترور احمد کسروی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1946-03-11' },
        cites: [
          {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
          },
          {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
          },
          { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } },
          {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '48' }
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
        { source: 'iranica-kasravi-ahmad', loc: { section: 'KASRAVI, AḤMAD', para: '1' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:ahmad-kasravi',
      role: 'victim',
      cites: [
        {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
        }
      ]
    },
    {
      name: 'Sayyed Moḥammad-Taqi Ḥaddādpur',
      role: 'victim',
      cites: [
        {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
        }
      ]
    },
    {
      name: 'Sayyed Ḥosayn Emāmi',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
        }
      ]
    },
    {
      name: 'Sayyed ʿAli Emāmi',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
        }
      ]
    },
    {
      name: 'Nawwāb Ṣafawi',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '8' }
        }
      ]
    },
    {
      ref: 'person:ahmad-qavam',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '10' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-fedaian-e-islam',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
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
          text: 'Kasravi was assassinated during a court proceeding inside the Palace of Justice (Kāḵ-e dādgostari).',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        },
        {
          id: 'q2',
          text: 'As soon as Kasravi’s book of Šiʿigari appeared, it aroused a severe reaction on the part of the mullahs and fudamentalist Muslims and led to his assassination by a band of Devotees of Islam (Fedāʾiān-e eslām; q.v.) on 11 March 1946',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'During the period of late 1941 to mid-1945 Kasravi wrote some of his sharpest critique of the clergy and tenets of Shiʿism, Bahaism and Sufism. He became the embodiment of intellectual revision of official religious and cultural thought and the self-appointed, outspoken adversary of the resurgent Islamic movement.',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        },
        {
          id: 'q4',
          text: 'The defiance he would hurl at Shiʿism was unforgivable, not only for the clergy and religious fanatics, but also for the high officials of the country. With the publication of his book Šiʿigari [Shiʿism] in late 1943, he signed his own death warrant.',
          lang: 'en',
          cite: {
            source: 'iranica-manafzadeh-kasravi-life-and-work',
            loc: { section: 'KASRAVI, AḤMAD i. Life and Work', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-i/'
          }
        },
        {
          id: 'q5',
          text: 'A few weeks after the failed assassination attempt, Sayyed Ruḥ-Allāh Musawi al-Ḥosayni (later Ayatollah and Imam Khomeini) demanded that young martyrs for Islam respond to “this illiterate Tabrizi,” a reference to Kasravi’s birthplace',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        },
        {
          id: 'q6',
          text: 'As legal action against Kasravi was proceeding, the rhetoric by the clergy and their supporters against “blasphemous” Kasravi escalated. In one such event, some four hundred mullahs and seminary students gathered in a mosque in Ḵāniābād neighborhood on 22 December 1945 and demanded that Kasravi be killed and his house ransacked',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'In the early hours of 11 March 1946, a group of Fedāʾiān led by the Emāmi brothers (Sayyed Ḥosayn and Sayyed ʿAli) entered the courthouse and brutally murdered Kasravi and his long-time assistant, Sayyed Moḥammad- Taqi Ḥaddādpur, using knives and guns',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'With the exception of a few articles in left-leaning newspapers, Kasravi’s murder was treated with silence by secular intellectuals and the press. But the response of religious groups and ulama was euphoric (Šarif Rāzi, I, 1954, pp. 200-201). Nawwāb and his Fedāʾiān group were treated as heroes of Islam and the šariʿa',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        },
        {
          id: 'q8',
          text: 'They were all released by the Qavām government under pressure from ulama and religious leaders and influential merchants, after a short trial',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        },
        {
          id: 'q10',
          text: 'The Sufi custodians of the cemetery refused to give permission for the burial on the ground of Kasravi’s anti-Sufi ideas and practices. Then the bodies were taken and buried at a spot in the foothills of Emāmzāda Ṣāleḥ, called Ābak',
          lang: 'en',
          cite: {
            source: 'iranica-amini-kasravi-assassination',
            loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'Undaunted by his initial failure, Nawwāb arranged successfully for two of his followers, the brothers Sayyed Ḥosayn and Sayyed ʿAlī-Moḥammad Emāmī, to murder Kasrawī and his secretary on 11 March 1946 at the Ministry of Justice (Davānī, pp. 2, 195-98; Šarīf Rāzī, pp. 8, 278-84; ʿErāqī, pp. 19-28; Amīnī, pp. 129-30). This episode marks an important turning point for the Fedāʾīān. The publicity surrounding the event was fueled by fiery speeches, broadsheets, and newspaper accounts announcing the existence of the Fedāʾīān and their activities to “purify” Persia from anti-Islamic practices. The tacit approval of the leading cleric of Najaf, Ayatollah Ḥājj Āqā Ḥosayn Qomī, of the assassination of Kasrawī and his demand for the acquittal of the Emāmī brothers helped to legitimize the Fedāʾīān and gave the organization ample opportunity to recruit new members and broaden the scope of its activities',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
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
        id: 'q12',
        text: 'On 18 April 1945, Nawwāb and his associate Ḵoršidi attacked Kasravi at Hešmat-al- Dawla Square in Tehran',
        lang: 'en',
        cite: {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1945-12-22' },
            cites: [
              {
                source: 'iranica-amini-kasravi-assassination',
                loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In one such event, some four hundred mullahs and seminary students gathered in a mosque in Ḵāniābād neighborhood on 22 December 1945 and demanded that Kasravi be killed and his house ransacked, only to be dissuaded by Ayatollah Moḥammad Behbahāni, a leading mojtahed in Tehran',
        lang: 'en',
        cite: {
          source: 'iranica-amini-kasravi-assassination',
          loc: { section: 'KASRAVI, AḤMAD ii. Assassination of Kasravi', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/kasravi-ahmad-ii/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Kasravi_peyman_1312.png',
    page: 'https://commons.wikimedia.org/wiki/File:Kasravi_peyman_1312.png',
    credit: { institution: 'Peyman', creator: 'Ahmad Kasravi' },
    license: { id: 'public-domain' }
  }
})
