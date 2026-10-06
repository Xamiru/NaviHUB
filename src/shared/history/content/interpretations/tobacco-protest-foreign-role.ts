import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'tobacco-protest-foreign-role',
  about: ['event:tobacco-protest', 'event:tobacco-regie-concession'],
  topic: 'foreign-role',
  researched: '2026-10-06',
  positions: [
    {
      id: 'forced-by-russia',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Firuz Kazemzadeh' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Whereas such episodes as the Reuter concession (q.v.), the issue of the navigation of the Kārūn, or even the turmoil that resulted from the Tobacco Régie (q.v.) loom large in Iranian history, Britain’s involvement in them was limited.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q2',
          text: 'Thus the cancellation of the Reuter and the tobacco concessions were both forced upon Iran against the Shah’s will by Russia which perceived these and other concessions granted to British subjects as political gains for England.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        }
      ]
    },
    {
      id: 'russian-instigation-in-places',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' },
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The anti-Regie protests instigated in some instances by Russia, especially in Tabriz, convinced the new British envoy, Sir Frank Lascelles, a diplomat with a Russophobic reputation, that further support for the concession might run the risk of destabilizing the Qajar rule in favor its northern neighbor.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Russian officials used all their influence, notably in Tabrīz and Tehran where the movement reached revolutionary proportions (Ṣafāʾī, op. cit., p. 63).',
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
      id: 'british-caution',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'By 1891 the British Foreign Secretary, Lord Salisbury, was more cautious however in backing the Regie.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ]
})
