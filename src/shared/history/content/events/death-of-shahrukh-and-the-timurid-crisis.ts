import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-shahrukh-and-the-timurid-crisis',
  names: [
    { text: 'Death of Shahrukh and the Timurid crisis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1447' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
          },
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
          },
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          }
        ]
      },
      {
        value: { d: '1446' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1457-07-31' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    },
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    },
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:gawhar-shad',
      role: 'participant',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
        }
      ]
    },
    {
      ref: 'person:abu-said-mirza',
      role: 'participant',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    },
    {
      ref: 'person:ulugh-beg',
      role: 'participant',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
        }
      ]
    },
    {
      ref: 'person:jahan-shah',
      role: 'participant',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:reign-of-shahrukh-and-herat-as-capital', rel: 'preceded-by' },
    { ref: 'event:abu-said-and-the-battle-of-qarabagh', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After a short period of succession struggle after Šāhroḵ’s death, Solṭān-Abu Saʿid (r. 1451-69), a descendent of Mirānšāh, succeeded in taking power in Herat with the help of Uzbek tribes.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q2',
          text: 'Succession disputes in Herat gave the Qara Qoyunlū chief, Jahānšāh b. Qara Yūsof, the chance to secede from the Timurid empire and proclaim himself sovereign.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In 861, Gowhar-šād, with several amirs including Tarḵāns, attempted mediation among the competing princes. This threatened the predominance of the amirs of Shah Maḥmud b. Abu’l-Qāsem Bābor, who ruled Herat. Thereupon, Shah Maḥmud’s chief amir, Šir Ḥāji, murdered most of the Tarḵān amirs. Shortly after this, news arrived that ʿAlāʾ-al-Dawla was moving against Herat, and Shah Maḥmud and his amirs left the city.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        },
        {
          id: 'q7',
          text: 'Babar—not the illustrious founder of the Mughal dynasty in India, but an elder member of the same house—next obtained possession of the sovereign power, and established himself in the government of Khorasan and the neighbouring countries.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The loss of Transoxiana, fragmented into smaller holdings under several Timurid princes, eventually paved the way to the future conquest of the region by the Uzbek Shaybanid (Abu’l-Khayrid) tribes, who were to take Herat in 1507',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
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
            value: { d: '1447' },
            cites: [
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On Šāhroḵ’s death in 850/1447, Gowhar-šād took the first steps to maintain order. She and her relatives, the Tarḵān emirs, were active in the succession struggle which followed, promoting the interests of ʿAlāʾ-al-Dawla and his son Ebrāhim. Shortly after Šāhroḵ’s death, ʿAbd-al-Laṭif b. Uluḡ Beg (q.v.) took Gowhar-šād and her relatives prisoner. On 13 Ṣafar 851/30 April 1447, ʿAlāʾ-al-Dowla rescued them and made ʿAbd-al-Laṭif publicly repent his action',
        lang: 'en',
        cite: {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1457-05-31' },
            cites: [
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Gowhar-šād put Qāżi Qoṭb-al-Din Aḥmad Emāmi in charge of the city’s defense, which submitted to Ebrāhim without resistance on 7 Rajab 861/31 May 1457',
        lang: 'en',
        cite: {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1457-07-19' },
            cites: [
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 26 Šaʿbān 861/19 July 1457, the Timurid ruler Sultan Abu Saʿid conquered Herat.',
        lang: 'en',
        cite: {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
        }
      }
    }
  ]
})
