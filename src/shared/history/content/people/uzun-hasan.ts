import { definePerson } from '../../schema'

export default definePerson({
  id: 'uzun-hasan',
  names: [
    { text: 'Uzun Hasan', lang: 'en', role: 'primary' },
    { text: 'اوزون حسن', lang: 'fa', role: 'native' },
    {
      text: 'Uzun Ḥasan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    },
    {
      text: 'Long Ḥasan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    },
    {
      text: 'Tall Hasan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1420', approx: true },
        cites: [
          {
            source: 'loc-name-authority-uzun-hasan',
            loc: { section: 'Uzun Hasan, Ruler of the Akkoyunlu, approximately 1420-1478' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1478-01-05', notAfter: '1478-01-06' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Sultan of the Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      start: {
        alts: [
          {
            value: { d: '1452' },
            cites: [
              { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Kioumars Ghereghlou', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1453' },
            cites: [
              {
                source: 'iranica-courts-and-courtiers-v',
                loc: {
                  section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
                  para: '10'
                }
              },
              {
                source: 'iranica-roemer-hosayn-bayqara',
                loc: { section: 'ḤOSAYN BĀYQARĀ', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Monika Gronke', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1457' },
            cites: [
              { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } },
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
              },
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Kathryn Babayan', discipline: 'historian' },
              { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' },
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1478-01-05', notAfter: '1478-01-06' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '13' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        },
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        },
        {
          source: 'iranica-courts-and-courtiers-v',
          loc: {
            section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
            para: '10'
          }
        },
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
        },
        { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '2' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Uzun_Hasan_on_horse%2C_1460s%E2%80%931470s%2C_Aq_Qoyunlu_ruler_Uzun_Hasa_hunting_%28detail%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Uzun_Hasan_on_horse,_1460s%E2%80%931470s,_Aq_Qoyunlu_ruler_Uzun_Hasa_hunting_(detail).jpg',
    credit: { institution: 'National Library of Russia' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The greatest ruler among them was the impressive military commander and statesman Uzun Ḥasan, who was married to a Byzantine princess, defeated Jahānšāh Qara Qoyunlu, and extended his rule to the shores of the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
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
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'The peace treaty was concluded without the knowledge of Jahāngīr’s younger brother Ḥasan, known as Uzun Ḥasan (Long Ḥasan), who considered it a betrayal.',
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
        },
        {
          id: 'q3',
          text: 'Uzun Ḥasan successfully resumed the war with the Qara Qoyunlū and in the autumn of 856/1452 seized Āmed in a bloodless coup while Jahāngīr was away on a military expedition in Kurdistan',
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
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'During the subsequent interlude, Uzun Ḥasan was able to make big military gains on other fronts.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q5',
          text: 'Uzun Ḥasan also attempted to assert suzerainty over the Timurids of Khorasan, but without success; Prince Yādgār Moḥammad, whom he enthroned at Herat, could not hold out for long against the local notables, who supported another Timurid prince, Ḥosayn Bāyqarā (r. 875-912/1470-1506).',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
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
      kind: 'ideas',
      quotes: [
        {
          id: 'q6',
          text: 'Uzun Ḥasan appreciated the worth of the rural as well as the urban population, or at least showed awareness that there were limits to the productive capacity of the peasantry.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '16' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'The sultan himself, his already ailing health impaired by a successful campaign against the Georgians, died on the eve of Šawwāl, 882/5-6 January 1478.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    }
  ]
})
