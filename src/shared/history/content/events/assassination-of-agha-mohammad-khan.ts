import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-agha-mohammad-khan',
  names: [
    { text: 'Assassination of Agha Mohammad Khan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1797-06-17' },
        cites: [
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '11'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' },
          { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1797-05' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:shusha',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:agha-mohammad-khan-qajar',
      role: 'victim',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'Ṣādeq Khan the Georgian',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'Ḵodādād Eṣfahānī',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:coronation-of-agha-mohammad-khan-qajar',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
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
          id: 'q2',
          text: 'The assassination of Āḡā Moḥammad in 1797 spared Kartli-Kakheti more devastation.',
          lang: 'en',
          cite: { source: 'iranica-hitchins-erekle-ii', loc: { section: 'EREKLE II', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/erekle-ii'
          }
        },
        {
          id: 'q3',
          text: 'Aga Mahommed had now arrived at the close of his career.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1128' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q4',
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
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
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
        },
        {
          id: 'q6',
          text: 'Aga Mahommed had now fairly established his capital at Teherān.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1128' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Upon receiving the news of Āqā Moḥammad Khan’s assassination in Ḏu’l-qaʿda 1211/May 1797 at Šīša in the Caucasus, Bābā Khan declared himself heir to the Qajar throne',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q8',
          text: 'Aga Mahommed had made up his mind that he should be succeeded by his nephew Fath ʽAli Shah, son of his full brother, Hosain Kuli Khan, governor of Fars.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1130' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
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
            value: { d: '1797-03', notAfter: '1797-05' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Āḡā Moḥammad, having returned to Tehran, launched a second campaign across the Aras the following spring.',
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
    },
    {
      date: {
        alts: [
          {
            value: { d: '1797-06-17' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1797-05' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'One of his commanders, Ṣādeq Khan Šaqāqī, interceded in vain; but Āḡā Moḥammad consented to postpone the execution until after the imminent Friday holiday.',
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
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Agha_Mohammad_Khan_Qajar%2C_painting%2C_ca._1840.jpg/1280px-Agha_Mohammad_Khan_Qajar%2C_painting%2C_ca._1840.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Agha_Mohammad_Khan_Qajar,_painting,_ca._1840.jpg',
    credit: { institution: 'Victoria and Albert Museum' },
    license: { id: 'public-domain' }
  }
})
