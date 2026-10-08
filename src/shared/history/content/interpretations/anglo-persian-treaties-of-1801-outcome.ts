import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anglo-persian-treaties-of-1801-outcome',
  about: ['event:anglo-persian-treaties-of-1801'],
  topic: 'outcome',
  researched: '2026-10-08',
  positions: [
    {
      id: 'british-success',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Firuz Kazemzadeh' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Thus from the British point of view Captain Malcolm’s mission was a complete success.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '7' }
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
      id: 'shah-tribute',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Although Malcolm insisted that his presents for the shah, which had cost the East India Company a small fortune, were “rarities” and “curiosities” from the governor-general of India, the shah preferred to receive them as “tributes” and “offerings” from an inferior neighboring power.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q3',
          text: 'The British offer for monetary assistance to Persia in the event of war with its neighbors further confirmed in the mind of the shah his superior status',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '14' }
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
      id: 'censure-and-repudiation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' },
        { kind: 'scholar', name: 'Ali Eskandari-Qajar' },
        { kind: 'organization', name: 'East India Company Board of Directors' },
        { kind: 'organization', name: 'Board of Control' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'To extricate itself from the wrangling circumstances after repeated Persian appeals for military assistance following the outbreak of the Russo-Persian War in 1804, Calcutta first repudiated the interpretation that the 1801 political treaty included actual British military assistance to Persia, rather than mere arbitration for resolving the conflict.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        },
        {
          id: 'q4',
          text: 'Proud of his achievement, he was censured by the EIC’s Board of Directors and the Board of Control in London for the extraordinary profligacy of his Persian mission and the inexpedience of the mission itself',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        }
      ]
    }
  ]
})
