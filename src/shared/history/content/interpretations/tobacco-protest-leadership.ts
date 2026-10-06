import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'tobacco-protest-leadership',
  about: ['event:tobacco-protest'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'led-by-the-ulama',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' },
        { kind: 'scholar', name: 'Firuz Kazemzadeh' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Successful public protests against the concession, instigated by the ulama, demonstrated the deep antipathy toward the Qajars rule and its gradual demise as a dependable buffer state.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q2',
          text: 'The fact that this fatwā was observed by all sections of the society, displayed the ulama’s remarkable popular influence.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'merchants-central',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Gad G. Gilbar' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Outwardly, the ulama led the protest movement of 1891-92, but it was the big merchants who, in fact, played the central role in it.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        },
        {
          id: 'q4',
          text: 'In most places the ulama joined the protest on their own initiative and supported the demand for the cancellation of the concession, although there were cases throughout the summer of 1891 in which big merchants had to convince ulama to assume an active role in the struggle.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        }
      ]
    },
    {
      id: 'coalition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' },
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'It was almost a rehearsal for the Constitutional Revolution, creating a tacit anti-imperialist and antimonarchist coalition of clerics, mercantile interests, and dissident intellectuals.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q6',
          text: 'The anti-concession movement gathered a large following among merchants, ʿolamāʾ, and various officials.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      id: 'afghani-influence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nikki R. Keddie' },
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Though months and many events intervened between Afḡānī’s letter and Šīrāzī’s effective call for Iranians to boycott tobacco in December, 1891, Afḡānī had some influence on the cancellation of the concession and the victory of the movement against the concession.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        },
        {
          id: 'q8',
          text: 'The letter he sent from Baṣra to the marǰaʿ-e taqlīd Mīrzā Ḥasan Šīrāzī at Samarra probably influenced the latter’s intervention over the tobacco monopoly (see main references in Bakhash, Iran, p. 242 n. 105).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    }
  ]
})
