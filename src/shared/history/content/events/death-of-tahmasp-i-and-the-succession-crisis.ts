import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-tahmasp-i-and-the-succession-crisis',
  names: [
    { text: 'Death of Tahmasp I and the succession crisis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1576-05-14' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '23' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '24' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tahmasp-i',
      role: 'head-of-state',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } }
      ]
    },
    {
      name: 'Esmāʿil II',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '24' }
        }
      ]
    },
    {
      name: 'Ḥaydar Mirzā',
      role: 'participant',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '24' }
        }
      ]
    },
    {
      name: 'Pari Ḵān Ḵānom',
      role: 'participant',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '24' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:accession-of-abbas-i',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '29' }
        }
      ]
    },
    {
      ref: 'event:ottoman-safavid-war-1578-1590',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
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
          text: 'Shah Ṭahmāsb’s death in 984/1576 opened a power vacuum in Persia that proved too tempting to resist for the Ottomans.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q2',
          text: 'Shah Ṭahmāsp was succeeded by his son, Esmāʿil II, who had established his reputation by defeating the Ottomans in 1549.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Early on, Esmāʿil’s energy and ambition had raised Ṭahmāsp’s suspicions.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q5',
          text: 'While later rulers, in particular ʿAbbās the Great, dealt with these questions of corporate sovereignty by simply eliminating any possible counterclaims from within the family, Ṭahmāsp looked for a long-term solution that would avoid having to harm or physically immobilize male family members (with the exception of one son, Esmāʿil Mirzā).',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q17',
          text: 'Esmāʿil also enjoyed overwhelming support from the Qezelbāš, who were ready to revolt for lack of pay, while Ḥaydar was favored by the Tajiks.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q18',
          text: 'Esmāʿil owed his release from the prison fortress of Qahqaha to the succession struggle that ensued after his father’s death and, more particularly, to Pari Ḵān Ḵānom, the shah’s second daughter, who played an important role in tilting the balance in favor of Esmāʿil and against Ḥaydar Mirzā, his half-brother and main rival.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q19',
          text: 'The struggle was won by the Qezelbāš, ending with Ḥaydar’s murder and Esmāʿil’s elevation to the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'Esmāʿil II has been compared to Ivan the Terrible (the Russian Tsar Ivan IV, r. 1533-84) for his cruelty and for his frequent irrational fits of temper which scholars have attributed to his long years of solitary confinement.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q9',
          text: 'It remains unclear whether he died from natural causes or was poisoned by the Qezelbāš, many of whose leaders he had executed.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Following Esmāʿil’s death, the Qezelbāš elders selected Moḥammad Ḵodā-banda, a man of refined tastes but weak character, and suffering from poor eyesight, as his successor.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q11',
          text: 'Persia’s neighbors, meanwhile, again took advantage of the turmoil in the Safavid realm.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q12',
          text: 'By the time Shah Ṭahmāsp died in 1576, the Safavids had proven their staying power in the face of the powerful Qezelbāš, the persistent Ottoman threat, and a weakening ideology.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
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
            value: { d: '1557' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '24' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Fearing that his son might conspire against him, Ṭahmāsp had him incarcerated in 1557.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '24' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1576' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '23' }
              },
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'When Shah Ṭahmāsp died in 1576, the empire he had inherited from his father had not only been maintained but also expanded during the reign of the most successful and expansionary sultan known to the Ottoman Empire.',
        lang: 'en',
        cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/tahmasp-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1577-11-24' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The latter had actually ordered the murder of ʿAbbās, who was at Herat, when Esmāʿīl himself was assassinated by a group of Qezelbāš amirs on 13 Ramażān 985/24 November 1577',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1579' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Resentful of her and her policies, the Qezelbāš conspired against Mahd-e ʿOlyā, and received the shah’s approval for her assassination, which took place in 1579.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '27' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Shah_Ismail_II_on_the_throne.jpg/1280px-Shah_Ismail_II_on_the_throne.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Ismail_II_on_the_throne.jpg',
    credit: { creator: 'Qadi Ahmad Qummi', institution: 'Staatsbibliothek zu Berlin' },
    license: { id: 'public-domain' }
  }
})
