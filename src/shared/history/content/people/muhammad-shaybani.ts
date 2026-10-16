import { definePerson } from '../../schema'

export default definePerson({
  id: 'muhammad-shaybani',
  names: [
    { text: 'Muhammad Shaybani', lang: 'en', role: 'primary' },
    { text: 'محمد شیبانی', lang: 'fa', role: 'native' },
    {
      text: 'Šïbāni Khan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        }
      ]
    },
    {
      text: 'Moḥammad Šaybāni Khan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    },
    {
      text: 'Šibak Khan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
        }
      ]
    },
    {
      text: 'Moḥammad Šāh-Baḵt',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1451' },
        cites: [
          {
            source: 'loc-name-authority-muhammad-shaybani',
            loc: { section: 'Muḥammad Shaybānī, Khan of the Uzbeks, 1451-1510' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1510-12-02' },
        cites: [
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '10' }
          },
          {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          },
          {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '8' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:marv',
    cites: [
      { source: 'iranica-bregel-abul-khayrids', loc: { section: 'ABU’L-KHAYRIDS', para: '4' } }
    ]
  },
  regions: ['russia-central-asia'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Khan of the Özbeks',
      polity: 'polity:khanate-of-bukhara',
      start: {
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
            ],
            heldBy: [
              { kind: 'scholar', name: 'Yuri Bregel', discipline: 'historian' }
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
              },
              {
                source: 'iranica-bregel-abul-khayrids',
                loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Yuri Bregel', discipline: 'historian' },
              { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1512' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        },
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '9' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Muhammad_Shaybani.jpg/1280px-Muhammad_Shaybani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Muhammad_Shaybani.jpg',
    credit: { creator: 'Kamāl ud-Dīn Behzād', institution: 'Academy of Arts of Uzbekistan' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The conquests of Šïbāni Khan and the establishment of the Abu’l-Khayrid dynasty (as well as its Arabshahid rivals in Khwarazm) brought about important ethnic, political, and cultural changes in the life of Central Asia.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'After Šïbāni Khan’s conquest of Herat in 913/1507, he had his name read in the Friday sermon (ḵoṭba) with the title Emām-al-zamān wa ḵalifat-al-raḥmān (the Leader of the Age and the Vicegerent of the Merciful), which was a claim to both spiritual and temporal supreme authority in the Muslim world',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q3',
          text: 'In 1510, Esmāʿil defeated Moḥammad Šaybāni Khan and took Marv and Herat, thus extending his realm from the ancient Mongol capital to that of the successors of the Timurids.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'By the time of Šïbāni Khan’s death in the battle with the Persians at Merv in 916/1510, the territories that he had conquered included Transoxania, Farḡāna, Khwarazm, and a part of Khorasan.',
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
  ]
})
