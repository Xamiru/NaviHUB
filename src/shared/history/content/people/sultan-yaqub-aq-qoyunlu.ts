import { definePerson } from '../../schema'

export default definePerson({
  id: 'sultan-yaqub-aq-qoyunlu',
  names: [
    { text: 'Sultan Yaqub of the Aq Qoyunlu', lang: 'en', role: 'primary' },
    { text: 'سلطان یعقوب', lang: 'fa', role: 'native', translit: 'Solṭān Yaʿqūb' },
    {
      text: 'Yaʿqūb',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '19' }
        }
      ]
    },
    {
      text: 'Sultan Yaʿqub',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1461' },
        cites: [
          {
            source: 'loc-name-authority-yaqub-akkoyunlu',
            loc: { section: 'Uzun Hasan, Yakub, Sultan of Akkoyunlu, 1461-1490' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1490-12-24' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '20' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Sultan of the Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      start: {
        alts: [
          {
            value: { d: '1478' },
            cites: [
              {
                source: 'iranica-courts-and-courtiers-v',
                loc: {
                  section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
                  para: '13'
                }
              },
              {
                source: 'iranica-tabriz-x-monuments',
                loc: { section: 'TABRIZ x. MONUMENTS (1) The Blue Mosque', para: '3' }
              },
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '18' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1490-12-24' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '20' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '18' }
        },
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '20' }
        },
        {
          source: 'iranica-courts-and-courtiers-v',
          loc: {
            section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
            para: '13'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Sultan_Yaqub.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Sultan_Yaqub.JPG',
    credit: { creator: 'Shaykhi' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Yaʿqūb’s twelve-year reign was a spell of relative calm.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '19' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Yaʿqūb initially sent Shaikh Ḥaydar and his followers to fight a holy war against the Circassians but soon grew wary of their military might.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q3',
          text: 'Yaʿqūb also made enemies among the official religious dignitaries with a tax reform that significantly impaired their material position.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '20' }
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
      kind: 'works',
      quotes: [
        {
          id: 'q4',
          text: 'Painting and calligraphy also flourished at the court of the Turkman dynasties at Tabrīz, especially under Uzun Ḥasan and Yaʿqūb Āq Qoyunlū (883-96/1478-90).',
          lang: 'en',
          cite: {
            source: 'iranica-courts-and-courtiers-v',
            loc: {
              section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-v'
          }
        },
        {
          id: 'q5',
          text: 'Salāmān o Absāl was dedicated to another distant patron, Sultan Yaʿqub Āq Qoyunlu; the year of its composition is usually given as 1480, but Māyel-Heravi has argued for a date as late as 1484',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        }
      ]
    }
  ]
})
