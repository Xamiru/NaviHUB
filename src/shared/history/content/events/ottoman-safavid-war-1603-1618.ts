import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-safavid-war-1603-1618',
  names: [
    { text: 'Ottoman-Safavid war of 1603-1618', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1603' },
        cites: [
          {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Vazken S. Ghougassian', discipline: 'historian' },
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1605', notAfter: '1606' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1618' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1612' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1613' },
        cites: [
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      ref: 'place:yerevan',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      ref: 'person:allahverdi-khan',
      role: 'commander',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
        }
      ]
    },
    {
      name: 'Sultan Aḥmad I',
      role: 'head-of-state',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-istanbul-1590',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    },
    {
      ref: 'event:deportations-from-armenia-and-the-founding-of-new-julfa',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
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
          text: 'ʿAbbās then turned to the western front and, having secured the support of the rulers of Georgia through alliances, resumed war with the Ottomans, who were vulnerable because they had been engaged in war with the Austrian Habsburgs since 1593, and were wracked by internal rebellion.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'It was not until 1014/1605-06 that Shah ʿAbbās felt strong enough to try conclusions with the Ottomans, but then success was rapid.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The shah gained breathing space to confront and defeat the Uzbeks by signing a largely disadvantageous treaty with the Ottomans.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The shah captured Erevan in June 1604 and advanced towards Kars.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q6',
          text: 'At the battle of Ṣūfīān, Shah ʿAbbās revealed himself to be a general of consummate ability, carefully husbanding his forces, which were inferior to those of the Ottomans in numbers and firepower, and throwing in his reserves at the critical moment.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'After 1603, he systematically engaged in depopulating regions and resettling tribes to far-off regions with the aim of strengthening frontiers and breaking up existing loyalties.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q16',
          text: 'Thousands of Afšārs were thus relocated, while a great many Qajars as well as Kurds were moved to Khorasan and Māzandarān.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '32' }
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
            value: { d: '1601', notAfter: '1603' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1601-03, ʿAbbās took advantage of instability in Hormuz to extend his control to the Persian Gulf littoral by defeating the local ruler of Lār and by occupying Bahrain.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '31' }
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
            value: { d: '1603', notAfter: '1604' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1603-04, Shah ʿAbbās recaptured Azarbaijan, Naḵjavān, and Yerevan',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1606' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Thus, having concluded the Treaty of Sitva Torok with the Austrians in 1606, the Ottomans fought back, and in 1610 embarked on a campaign that once again briefly put them in control of Tabriz.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '31' }
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
            value: { d: '1607' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In 1607 he took Širvān as well as parts of Georgia.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '31' }
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
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Portrait_of_Shah_Abbas_I_and_a_page._Attributed_to_Mu%E2%80%99in_Musavvir%2C_Safavid_Isfahan%2C_1632-1633.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Shah_Abbas_I_and_a_page._Attributed_to_Mu%E2%80%99in_Musavvir,_Safavid_Isfahan,_1632-1633.jpg',
    credit: { creator: 'Muin Musavvir', institution: 'Harvard Art Museums' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
