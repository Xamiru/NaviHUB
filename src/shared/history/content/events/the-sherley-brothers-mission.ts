import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'the-sherley-brothers-mission',
  names: [
    { text: 'The Sherley brothers’ mission', lang: 'en', role: 'primary' },
    {
      text: 'Sherley embassy',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1598' },
        cites: [
          {
            source: 'iranica-ferrier-anglo-iranian-relations-i',
            loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
        }
      ]
    },
    {
      name: 'Sir Anthony Sherley',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
        }
      ]
    },
    {
      name: 'Sir Robert Sherley',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
        }
      ]
    },
    {
      name: 'Ḥosayn-ʿAli Beg Bayāt',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-cutillas-ferrer-spain-relations-persia',
          loc: {
            section: 'SPAIN i. Relations with Persia in the 16th and 17th Centuries',
            para: '31'
          }
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
          text: 'During Shah ʿAbbās I’s reign, Persia’s diplomacy became very active in Europe, and five of his embassies went to or passed through Portugal/Spain: Ḥosayn-ʿAli Beg with Sir Anthony Shirley in 1599-1603, Bastāmqoli Beg in 1604-05, Pākiza Emāmqoli Beg in 1607-10, Sir Robert Shirley in 1608-15, and Čenḡiz Beg in 1610-13.',
          lang: 'en',
          cite: {
            source: 'iranica-teles-e-cunha-portugal-i',
            loc: {
              section: 'PORTUGAL i. RELATIONS WITH PERSIA IN THE EARLY MODERN AGE (1500-1750)',
              para: '29'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/portugal-i'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Mixing commercial with strategic concerns, Shah ʿAbbās opened Persia to the wider world in unprecedented ways.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q4',
          text: 'Threatened at once on all borders, the new Shah defeated his enemies, defended his territories, stabilized the administration, revived the economy and endowed his successors with a legacy of good government which lasted for about half a century.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-i',
            loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Whilst his brother vainly frequented the royal courts of Europe, Robert languished in Persia as a hostage providing tuition in cannon construction.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-i',
            loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
          }
        },
        {
          id: 'q7',
          text: 'Shah ʿAbbās appointed Robert Sherley as ambassador and Friar Redempto de la Cruz as his companion.',
          lang: 'en',
          cite: {
            source: 'iranica-cutillas-ferrer-spain-relations-persia',
            loc: {
              section: 'SPAIN i. Relations with Persia in the 16th and 17th Centuries',
              para: '36'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/spain-relations-with-persia-in-the-16th-and-17th-centuries'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Sherley’s querulous disposition and the animosity which existed between him and his companions, including a morose Persian companion, Ḥasan Khan, doomed his embassy to failure, though its reception in Europe found echoes even in the plays of Shakespeare',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-i',
            loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
          }
        },
        {
          id: 'q10',
          text: 'Unfortunately, propositions for trade or military assistance were unappealing to merchants or courtiers.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-i',
            loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
          }
        },
        {
          id: 'q11',
          text: 'However, this embassy aroused great uncertainty, because, in Madrid, there were many doubts about Sherley’s true intentions.',
          lang: 'en',
          cite: {
            source: 'iranica-cutillas-ferrer-spain-relations-persia',
            loc: {
              section: 'SPAIN i. Relations with Persia in the 16th and 17th Centuries',
              para: '36'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/spain-relations-with-persia-in-the-16th-and-17th-centuries'
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
            value: { d: '1598' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-i',
                loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In the early part of his reign arrived in Qazvīn in autumn 1598 the adventurous English courtier Sir Anthony Sherley and his brother Robert, in search of fame and fortune.',
        lang: 'en',
        cite: {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1599', notAfter: '1603' },
            cites: [
              {
                source: 'iranica-teles-e-cunha-portugal-i',
                loc: {
                  section: 'PORTUGAL i. RELATIONS WITH PERSIA IN THE EARLY MODERN AGE (1500-1750)',
                  para: '29'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'This led to Shah ʿAbbās’s initiative to send a first embassy to the Christian princes, led by a Persian nobleman, Ḥosayn-ʿAli Beg Bayāt and Anthony Sherley, while his brother Robert was held hostage in Persia',
        lang: 'en',
        cite: {
          source: 'iranica-cutillas-ferrer-spain-relations-persia',
          loc: {
            section: 'SPAIN i. Relations with Persia in the 16th and 17th Centuries',
            para: '31'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/spain-relations-with-persia-in-the-16th-and-17th-centuries'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1608' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-i',
                loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'He dispatched Robert Sherley in 1608 on a similar mission',
        lang: 'en',
        cite: {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1611' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-i',
                loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Robert was well received on his visit to England in 1611 by James I, who had earlier befriended the Sherley family.He stayed for two years.',
        lang: 'en',
        cite: {
          source: 'iranica-ferrier-anglo-iranian-relations-i',
          loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1615' },
            cites: [
              {
                source: 'iranica-cutillas-ferrer-spain-relations-persia',
                loc: {
                  section: 'SPAIN i. Relations with Persia in the 16th and 17th Centuries',
                  para: '36'
                }
              },
              {
                source: 'iranica-ferrier-anglo-iranian-relations-i',
                loc: { section: 'ANGLO-IRANIAN RELATIONS i. Safavid to Zand Periods', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'One of the Sherley brothers, Robert Sherley, arrived in Isfahan in 1615.',
        lang: 'en',
        cite: {
          source: 'iranica-cutillas-ferrer-spain-relations-persia',
          loc: {
            section: 'SPAIN i. Relations with Persia in the 16th and 17th Centuries',
            para: '36'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/spain-relations-with-persia-in-the-16th-and-17th-centuries'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Lady_Elizabeth_Sherley_%28Teresia%2C_Lady_Shirley%29_-_Wenceslaus_Hollar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lady_Elizabeth_Sherley_(Teresia,_Lady_Shirley)_-_Wenceslaus_Hollar.jpg',
    credit: { creator: 'Wenceslaus Hollar', institution: 'Royal Collection Trust' },
    license: { id: 'public-domain' }
  }
})
