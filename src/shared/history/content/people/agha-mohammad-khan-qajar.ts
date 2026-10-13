import { definePerson } from '../../schema'

export default definePerson({
  id: 'agha-mohammad-khan-qajar',
  names: [
    { text: 'Agha Mohammad Khan Qajar', lang: 'en', role: 'primary' },
    {
      text: 'آقامحمدخان قاجار',
      lang: 'fa',
      role: 'native',
      translit: 'Āḡā Moḥammad Khan Qājār'
    },
    {
      text: 'Aqa Muhammad Khan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lc-names-n85046640',
          loc: { section: 'Āqā Muḥammad, Shah of Iran, 1742 or 1743-1797' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1742', approx: true },
        cites: [
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1743', approx: true },
        cites: [
          {
            source: 'lc-names-n85046640',
            loc: { section: 'Āqā Muḥammad, Shah of Iran, 1742 or 1743-1797' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1797-06-17' },
        cites: [
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1796-03' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1797-06-17' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        },
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/A_portrait_of_Agha_Muhammad_Khan%2C_Persia%2C_Qajar%2C_dated_1795.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_portrait_of_Agha_Muhammad_Khan,_Persia,_Qajar,_dated_1795.jpg',
    credit: { institution: 'Sotheby\'s' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Āḡā Moḥammad Khan, the founder of the Qajar dynasty, was at that time consolidating his power and wanted his domain to include both the Caucasian borderlands and the Caspian shore.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'Āḡā Moḥammad’s salient characteristics were those which caused his death: avarice and cruelty.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Moḥammad-Ḥasan was a fugitive on the Turkman steppe during Nāder’s reign.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q4',
          text: 'By all accounts, Āḡā Moḥammad was treated more as an honored guest than a prisoner throughout his sixteen years at Karīm Khan’s court.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Aga Mahommed, son of Mahommed Ḥasan, the Kajar chief of Astarabad, a prisoner at large in Shiraz, was in the environs of that city awaiting intelligence of the old king’s decease, and, hearing it, instantly escaped to Mazandaran, there to gather his tribesmen together and compete for the crown of Persia.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1112' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q6',
          text: 'In 1206/1791 he was faced with renewed attacks on Gīlān by Mortażā-qolī Khan and an advance on Isfahan by Loṭf-ʿAlī Khan, the courageous and popular young Zand prince who had again rallied support in Fārs.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q7',
          text: 'Erekli’s army, heavily outnumbered, was defeated, and Tiflis savagely sacked; the old and infirm and the priests were massacred, and at least 15,000 able-bodied men and women taken into slavery.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q8',
          text: 'Here in Ramażān, 1210/ March, 1796, he was officially crowned shah of Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q9',
          text: 'Ebrāhīm Ḵalīl Khan was ousted from the fortress of Shusha by a coup d’état, and Āḡā Moḥammad was invited to take control.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q10',
          text: 'Like his predecessors, Nāder Shah and Karīm Khan, he kept executive power tightly in his own control, using his ministers as little more than informants and secretaries; however, he appreciated able men such as Ḥāǰǰī Ebrāhīm and knew how far to trust them.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q11',
          text: 'Obsessively acquisitive of money and jewels, he nevertheless shunned pomp and ostentation, lived as austerely as his soldiers, and ensured that these were regularly paid.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q12',
          text: 'The recently crowned shah of Iran, Āḡā Moḥammad Khan, triumphantly returned to the Caucasus but was murdered on 17 June 1797',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q13',
          text: 'According to most accounts, two servants, Ṣādeq Khan the Georgian and Ḵodādād Eṣfahānī, began quarrelling so loudly that the shah ordered both to be executed.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q14',
          text: 'The assassination of Āḡā Moḥammad in 1797 spared Kartli-Kakheti more devastation.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        }
      ]
    }
  ]
})
