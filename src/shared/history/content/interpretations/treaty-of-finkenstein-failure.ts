import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'treaty-of-finkenstein-failure',
  about: ['event:treaty-of-finkenstein', 'event:gardane-mission'],
  topic: 'outcome',
  researched: '2026-10-06',
  positions: [
    {
      id: 'tilsit-and-british-diplomacy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Florence Hellot-Bellier' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'But Napoleon’s volte-face in signing a peace treaty with Russia at Tilsit (7 July l807) and the delay in conveying instructions to Gardane, who had arrived at Tehran in December 1807, combined with some adroit diplomacy by the British in Persia',
          lang: 'en',
          cite: {
            source: 'iranica-hellot-bellier-france-relations',
            loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/france-iii-relations-with-persia-1789-1918/'
          }
        }
      ]
    },
    {
      id: 'tilsit-and-many-factors',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Gardane’s mission, which was undercut by the Franco-Russian agreement at Tilsit, was also hampered by many other factors.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        },
        {
          id: 'q3',
          text: 'After the events in Spain, Persia had become of minimal importance for Napoleon.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        },
        {
          id: 'q4',
          text: 'Regarding his qualifications as a negotiator, he was apparently more of a soldier than a diplomat',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        }
      ]
    },
    {
      id: 'shah-blunder',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Caught up in the excitement of the Napoleonic adventure, the shah committed a serious blunder by placing his vulnerable domain between two potent enemies, Russia and Britain, unaware of the fact that his French ally had no reluctance to enter into alliance, almost immediately after Finkenstein, with Russia and sign with her the friendship treaty of Tilsit in July 1807',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q6',
          text: 'Despite the shah’s high hopes, the Gardane mission (q.v.; 1808-9) and its partial success in training and equipping the Persian army with modern weapons proved to be a poor substitute for French promises to guarantee Persian territorial integrity against foreign aggression.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      id: 'shah-letter-to-napoleon',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Fath-Ali Shah Qajar', ref: 'person:fath-ali-shah-qajar' }
      ],
      statements: [
        {
          id: 'q7',
          text: '“Although Persia is located in the East and France in the West, and a great distance is in between, the friendship and affection of inner heart that was achieved by divine favor and blessing was such that it become a source of astonishment for the people of the world and envy to the kings. And yet because of such negligence [i.e. Napoleon’s] today there is no sharper and more injurious a thorn [for us] than the admonition which is now directed toward both our states. Because of the friendship of that friend we have lost all other friends and set our eye of expectation on the path of friendship of that affectionate partner but finally because contrary [deeds] to [the original] objective were manifested [from you], we were engrossed in disappointment and remorse and became the subject of much rebuke and chastisement”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '18' }
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
