import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'recapture-of-hormuz',
  names: [
    { text: 'Recapture of Hormuz', lang: 'en', role: 'primary' },
    {
      text: 'Capture of Hormuz by Shah Abbas',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-teles-e-cunha-portugal-i',
          loc: {
            section: 'PORTUGAL i. RELATIONS WITH PERSIA IN THE EARLY MODERN AGE (1500-1750)',
            para: '8'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1622' },
        cites: [
          {
            source: 'iranica-floor-hormuz-ii',
            loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
          },
          { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '6' } },
          {
            source: 'iranica-savory-emamqoli-khan',
            loc: { section: 'EMĀMQOLĪ KHAN', para: '3' }
          },
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '18' } },
          {
            source: 'iranica-teles-e-cunha-portugal-i',
            loc: {
              section: 'PORTUGAL i. RELATIONS WITH PERSIA IN THE EARLY MODERN AGE (1500-1750)',
              para: '33'
            }
          }
        ]
      },
      {
        value: { d: '1623' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  regions: ['iran', 'mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:hormuz',
      cites: [
        {
          source: 'iranica-floor-hormuz-ii',
          loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
        }
      ]
    },
    {
      ref: 'place:qeshm',
      cites: [
        { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } }
      ]
    },
    {
      ref: 'place:strait-of-hormuz',
      cites: [
        {
          source: 'iranica-floor-hormuz-ii',
          loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-floor-hormuz-ii',
          loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
        }
      ]
    },
    {
      ref: 'polity:portuguese-empire',
      cites: [
        {
          source: 'iranica-floor-hormuz-ii',
          loc: { section: 'HORMUZ ii. Islamic Period', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids and the English East India Company',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } }
      ]
    },
    {
      key: 'portuguese',
      name: 'Portuguese',
      polity: 'polity:portuguese-empire',
      cites: [
        { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Emām-qoli Khan',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } }
      ]
    },
    {
      ref: 'person:abbas-i',
      role: 'leader',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-floor-hormuz-ii',
          loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
        }
      ]
    },
    {
      name: 'Ruy Freire de Andrade',
      role: 'commander',
      side: 'portuguese',
      cites: [
        { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } }
      ]
    },
    {
      name: 'Edward Monnox',
      role: 'negotiator',
      side: 'safavid',
      cites: [
        { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:voyages-of-vasco-da-gama-and-the-portuguese-in-the-indian-ocean',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-teles-e-cunha-portugal-i',
          loc: {
            section: 'PORTUGAL i. RELATIONS WITH PERSIA IN THE EARLY MODERN AGE (1500-1750)',
            para: '8'
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
          text: 'With naval help from the English East India Company, Allāhverdi’s son, Emāmqoli Khan, was able to take Qešm and Hormuz in 1622 after a fierce battle.',
          lang: 'en',
          cite: {
            source: 'iranica-floor-hormuz-ii',
            loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/hormuz-ii'
          }
        },
        {
          id: 'q2',
          text: 'In the Persian Gulf, Shah ʿAbbās was able to use to his advantage the rivalry of the Portuguese, English, and Dutch for mastery of the lucrative East Indies trade; a notable example was his enlistment of English aid in 1031/1622 in expelling the Portuguese from the island of Hormoz',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '18' } },
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
          text: 'Albuquerque lost Hormuz in 1508, and only in 1515 did he take it back, placing the island under Portuguese “protectorate” until 1622, thus making it a bone of contention with Persia, whose sovereigns saw it as a vassal state.',
          lang: 'en',
          cite: {
            source: 'iranica-teles-e-cunha-portugal-i',
            loc: {
              section: 'PORTUGAL i. RELATIONS WITH PERSIA IN THE EARLY MODERN AGE (1500-1750)',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/portugal-i'
          }
        },
        {
          id: 'q4',
          text: 'In 1602, his general Allāhverdi Khan took Bahrain, which had been in Portuguese hands since 922/1516-17, and in 1614 Gamru (Gombron), the last foothold of the Portuguese on the Persian mainland.',
          lang: 'en',
          cite: {
            source: 'iranica-floor-hormuz-ii',
            loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/hormuz-ii'
          }
        },
        {
          id: 'q5',
          text: 'By detaining the company’s silk purchase in 1622, Shah ʿAbbās I forced it to assist him with its fleet in the taking of Hormoz and rewarded it with an agreement for a half share of the customs revenue, but this revenue was seldom properly paid',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-east-india-company-british-safavid-period',
            loc: { section: 'EAST INDIA COMPANY (BRITISH) i. THE SAFAVID PERIOD', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/east-india-company-british-i-the-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Beginning in the winter of 1621/22, however, Emām-qoli Khan of Shiraz for nine months blockaded the Portuguese garrison (but not their flotilla), under the command of Ruy Freire, in their recently constructed fort on Qeshm.',
          lang: 'en',
          cite: { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/qeshm-island'
          }
        },
        {
          id: 'q7',
          text: 'Turning their attention to Hormuz, the Persians offered the Portuguese commander there Qeshm in return for 500,000 patacas and the port of Jolfār on the Arabian coast; but the offer was rejected, and within a few months Hormuz itself was lost to the Persian and English forces',
          lang: 'en',
          cite: { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/qeshm-island'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'After the destruction of the fort in Hormuz, its ruins served to build houses in Bandar ʿAbbās, as Gamru was called henceforth, while they also served as ballast for the seagoing ships',
          lang: 'en',
          cite: {
            source: 'iranica-floor-hormuz-ii',
            loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/hormuz-ii'
          }
        },
        {
          id: 'q10',
          text: 'He granted the English half of Bandar ʿAbbās’s toll receipts in return for their assistance in ousting the Portuguese from Hormuz Island in 1622, while he offered the Dutch the right to engage in toll-free trade in exchange for a contractual obligation to take an annual volume of 600 bales of silk.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q11',
          text: 'The Persian position on Qeshm, however, was tenuous.',
          lang: 'en',
          cite: { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/qeshm-island'
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
            value: { d: '1621-05-07' },
            cites: [
              {
                source: 'iranica-potts-qeshm-island',
                loc: { section: 'QESHM ISLAND', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Two thousand Portuguese soldiers, supported by 1,000 Hormuzi troops, landed on 7 May 1621.',
        lang: 'en',
        cite: { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/qeshm-island'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1621-12-24' },
            cites: [
              {
                source: 'iranica-potts-qeshm-island',
                loc: { section: 'QESHM ISLAND', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The timely arrival at Jāsk on 24 December 1621 of an English East India Company squadron, due to collect silk for export, provided Emām-qoli Khan with willing partners to assist in the expulsion of the Portuguese, in return for sole English custody over the castle of Hormuz, among other things',
        lang: 'en',
        cite: { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/qeshm-island'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1622-02-02' },
            cites: [
              {
                source: 'iranica-potts-qeshm-island',
                loc: { section: 'QESHM ISLAND', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 2 February 1622 five English guns were landed; and after fruitless negotiations between Ruy Freire and Edward Monnox, the English bombarded the fort.',
        lang: 'en',
        cite: { source: 'iranica-potts-qeshm-island', loc: { section: 'QESHM ISLAND', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/qeshm-island'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1622' },
            cites: [
              {
                source: 'iranica-savory-emamqoli-khan',
                loc: { section: 'EMĀMQOLĪ KHAN', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The combined operations were successful; the Portuguese fort on the island of Qešm was captured after the qezelbāš forces had suffered heavy casualties; and in 1031/1622 the Portuguese garrison on the island of Hormuz surrendered after a two-month siege',
        lang: 'en',
        cite: {
          source: 'iranica-savory-emamqoli-khan',
          loc: { section: 'EMĀMQOLĪ KHAN', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/emamqoli-khan'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/The_taking_of_Hurmuz_%281623%29_by_Im%C4%81m_%E1%B8%B2ul%C4%AB_Kh%C4%81n_and_his_army_%28Latin_inscription_round_the_fortress%29._From_a_Jar%C5%ABnn%C4%81mah_by_Qadr%C4%AB._Isfahan_-_Safavid_style%2C_dated_1697.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_taking_of_Hurmuz_(1623)_by_Im%C4%81m_%E1%B8%B2ul%C4%AB_Kh%C4%81n_and_his_army_(Latin_inscription_round_the_fortress)._From_a_Jar%C5%ABnn%C4%81mah_by_Qadr%C4%AB._Isfahan_-_Safavid_style,_dated_1697.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  }
})
