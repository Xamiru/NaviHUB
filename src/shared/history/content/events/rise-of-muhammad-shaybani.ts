import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'rise-of-muhammad-shaybani',
  names: [
    { text: 'Rise of Muhammad Shaybani', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1500' },
        cites: [
          {
            source: 'iranica-central-asia-v',
            loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '18' }
          },
          {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Bertold Spuler', discipline: 'historian' },
          { kind: 'scholar', name: 'Yuri Bregel', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1501' },
        cites: [
          { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '4' } },
          {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Maria Szuppe', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1510-12-02' },
        cites: [
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-central-asia-v',
          loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '18' }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '3' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:khanate-of-bukhara',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-central-asia-v',
          loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '18' }
        }
      ]
    },
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '3' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'uzbeks',
      name: 'Uzbeks',
      polity: 'polity:khanate-of-bukhara',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        }
      ]
    },
    {
      key: 'timurids',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-central-asia-v',
          loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '18' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:muhammad-shaybani',
      role: 'leader',
      side: 'uzbeks',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        }
      ]
    },
    {
      ref: 'person:babur',
      role: 'combatant',
      side: 'timurids',
      cites: [
        {
          source: 'iranica-lehmann-babor',
          loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '2' }
        }
      ]
    },
    {
      ref: 'person:sultan-husayn-bayqara',
      role: 'combatant',
      side: 'timurids',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:babur-loses-samarkand', rel: 'related' },
    { ref: 'event:battle-of-marv', rel: 'followed-by' },
    { ref: 'event:herat-under-sultan-husayn-bayqara', rel: 'preceded-by' },
    { ref: 'event:founding-of-the-safavid-state', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1501 the Uzbeks began a wholesale invasion of Mawarannahr.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '4' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In 1429 a grandson of Ebrāhim-Oḡlān named Abu’l-Ḵayr was elected in Siberia as the supreme ruler of the Özbek ulus, and he united under his authority the majority of the Özbeks.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q3',
          text: 'The lack of a succession law and the presence of many Timurid males perpetuated an atmosphere of constant intrigue, often erupting into open warfare, between the descendants who vied for mastery in Khorasan and Central Asia, but they finally lost their patrimony when they proved incapable of cooperating to defend it against a common enemy.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        },
        {
          id: 'q4',
          text: 'The chronic internal fighting of the Timurids attracted the attention of the Uzbek nomadic tribes living to the north of the Aral Sea.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '4' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'After the death of Šïbāni Khan the sultans (members of the Abu’l-Khayrid clan), convened an assembly (qoreltāy), at which a new khan was elected.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q6',
          text: 'The territory remaining in the hands of the Özbeks was divided between the appanages of princes (sultans), members of the four branches of the Abu’l-Khayrid clan, the descendants of the four sons of Abu’l-Ḵayr Khan: Šāh Budāq (led by ʿObayd-Allāh Solṭān), who received Bukhara; Ḵᵛāja Moḥammad (led by Jāni-beg), who received Miānkāl (the region between Bukhara and Samarqand), to which they later added Balkh, captured from the Timurids in 932/1526; Kučkonji Moḥammad, who received Samarqand (at first jointly with the son of Šïbāni Khan, Moḥammad Timur, who died in 920/1514); and Soyunjuk (or Sevinj Moḥammad), who received Tashkent',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
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
            value: { d: '1500' },
            cites: [
              {
                source: 'iranica-bregel-abul-khayrids',
                loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
              },
              {
                source: 'iranica-central-asia-v',
                loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Abu’l-Ḵayr’s ulus disintegrated after his death in 1468, and it was his grandson, Moḥammad Šāh-Baḵt (r. 906-16/1500-10), who became famous as Šïbāni Khan from the pen-name Šïbāni, which he used in his poetry; very often erroneously transcribed as Šaybāni), who reunited a part of the Özbeks and led them to the conquest of the Timurid territories.',
        lang: 'en',
        cite: {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Battle_of_Merv_%281510%29%2C_between_Ismail_I_and_Shaybani_Khan_%28duel_scene%29._Chehel_Sotoun%2C_Isfahan%2C_painted_circa_1647.jpg/1280px-Battle_of_Merv_%281510%29%2C_between_Ismail_I_and_Shaybani_Khan_%28duel_scene%29._Chehel_Sotoun%2C_Isfahan%2C_painted_circa_1647.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Merv_(1510),_between_Ismail_I_and_Shaybani_Khan_(duel_scene)._Chehel_Sotoun,_Isfahan,_painted_circa_1647.jpg',
    credit: { institution: 'Chehel Sotoun Palace, Isfahan' },
    license: { id: 'public-domain' }
  }
})
