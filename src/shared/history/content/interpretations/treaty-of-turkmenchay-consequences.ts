import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'treaty-of-turkmenchay-consequences',
  about: ['event:treaty-of-turkmenchay'],
  topic: 'consequences',
  researched: '2026-10-06',
  positions: [
    {
      id: 'lasting-border-and-inequality',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It clearly defined on the ground the Russo-Iranian border, which remained unchanged until 1991.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      id: 'british-disengagement',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Firuz Kazemzadeh', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'After the conclusion of the treaty of Torkamāṇčāy (q.v.) Britain lost much of its interest in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q3',
          text: 'From then on no Iranian ruler would risk another all out confrontation with the colossus to the north.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q4',
          text: 'The very magnitude of the defeat made the Iranians feel bitter toward Britain which, in their view, had violated its promises of support.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '18' }
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
      id: 'british-pressure-and-capitulations',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The cost-conscious Foreign Office, and the EIC, preferred mediation for peace both for the Golestān (q.v.) and later the Torkmānčāy treaties, and in both instances the English envoys pressured Persia to comply with the harsh terms imposed by Russia, Britain’s ally in 1813 against Napoleon and by 1819 an awesome contender.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q6',
          text: 'Relations deteriorated further when in 1828 Russia reasserted its status as the Most Favored Nation, encouraging the British envoy to resort to pressure to extract similar capitulatory privileges from Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
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
      id: 'royal-authority-discredited',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The loss to Russia of the rest of the Caucasus (and temporarily the province of Azarbaijan) not only was a rude shock to the shah and an irreparable drain on his already dwindling treasury but a major discredit to his authority as he began to encounter immediately after the Russian war a series of debilitating tribal and urban revolts in Isfahan, Yazd, Kermān, and Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q8',
          text: 'Most significantly, Ḥosayn-ʿAlī Mīrzā, the Farmānfarmā of Fārs, viewed the nomination not only as a personal affront to his own rightful position but a sign of the shah’s surrender to a pro-Russian interpretation of Article 13 of the Treaty of Torkamānčāy, which guaranteed ʿAbbās Mīrzā’s succession',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ]
})
