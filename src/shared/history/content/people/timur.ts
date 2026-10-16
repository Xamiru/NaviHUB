import { definePerson } from '../../schema'

export default definePerson({
  id: 'timur',
  names: [
    { text: 'Timur', lang: 'en', role: 'primary' },
    {
      text: 'Tamerlane',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '2' } }
      ]
    },
    { text: 'تیمور', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1336' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '2' } },
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          },
          {
            source: 'loc-name-authority-timur',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1405-02-17' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:shahr-i-sabz',
    cites: [
      { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '2' } }
    ]
  },
  diedIn: {
    ref: 'place:otrar',
    cites: [
      { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Ruler of the Timurid state',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1370' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
              },
              {
                source: 'iranica-manz-dunaway-clavijo',
                loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
              },
              {
                source: 'iranica-perry-deportations-iii',
                loc: { section: 'DEPORTATIONS iii. In the Islamic period', para: '15' }
              }
            ]
          },
          {
            value: { d: '1371' },
            cites: [
              { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Peter B. Golden', discipline: 'historian' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1405' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
              },
              {
                source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        },
        { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Timur_%28earliest_known_portrait%29%2C_Timurid_genealogy%2C_1405-1409%2C_Samarkand_%28TSMK%2C_H2152%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Timur_(earliest_known_portrait),_Timurid_genealogy,_1405-1409,_Samarkand_(TSMK,_H2152).jpg',
    credit: { institution: 'Topkapı Palace Museum', creator: '1405–1409 artist' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'One tribal chieftain, Timur (Tamerlane), emerged from these struggles in the 1380s as the dominant force in Mawarannahr.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '2' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q4',
          text: 'TIMŪR (Timur i Leng, the lame Timūr), commonly known as Tamerlane, the renowned Oriental conqueror, was born in 1336 at Kesh, better known as Shahr-i-Sabz, “the green city,” situated some 50 m. south of Samarkand in Transoxiana.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        },
        {
          id: 'q5',
          text: 'His father Teragai was head of the tribe of Berlas.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        },
        {
          id: 'q6',
          text: 'About 1358, however, he came before the world as a leader of armies.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q10',
          text: 'Timūr not only consolidated his rule at home by the subjection of intestine foes, but sought extension of territory by encroachments upon the lands of foreign potentates.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        },
        {
          id: 'q11',
          text: 'He defeated and took prisoner the Ottoman sultan Bayezit, and, campaigning in the Ottoman Anatolian provinces, he reached Izmir and the Mediterranean.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q15',
          text: 'The territorial changes brought about by the formation of Tīmūr’s (Tamerlane’s) empire initiated long periods of stability, which, however, began with the devastation caused by the Balḵ campaign in 771/1369.',
          lang: 'en',
          cite: {
            source: 'iranica-fourniau-balk-iii',
            loc: { section: 'BALḴ iii. From the Mongols to Modern Times', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/bal%e1%b8%b5-iii-from-the-mongols-to-modern-times/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q16',
          text: 'Also Timour Beg is the proper name of that lord, and not Tamerlane, as we call him ; for Timour Beg is as much as to say, in his language, the same as the lord of iron;',
          lang: 'en',
          cite: {
            source: 'clavijo-1859-narrative-of-the-embassy',
            loc: { page: '77', section: 'Narrative of the Embassy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://archive.org/stream/narrativeembass00markgoog/narrativeembass00markgoog_djvu.txt'
          }
        },
        {
          id: 'q18',
          text: 'This was done that the lord might see them better ; for his eyesight was bad, being so old that the eyelids had fallen down entirely.',
          lang: 'en',
          cite: {
            source: 'clavijo-1859-narrative-of-the-embassy',
            loc: { page: '133', section: 'Narrative of the Embassy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://archive.org/stream/narrativeembass00markgoog/narrativeembass00markgoog_djvu.txt'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'manz-1989-the-rise-and-rule-of-tamerlane', perspective: 'american' },
    { source: 'woods-1990-the-timurid-dynasty', perspective: 'american' },
    { source: 'subtelny-2007-timurids-in-transition', perspective: 'other' },
    { source: 'yazdi-2008-zafarnama', perspective: 'iranian' }
  ]
})
