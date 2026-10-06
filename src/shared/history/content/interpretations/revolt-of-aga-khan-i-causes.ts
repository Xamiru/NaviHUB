import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'revolt-of-aga-khan-i-causes',
  about: ['event:revolt-of-aga-khan-i', 'person:aga-khan-i'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'sufi-rivalry',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'His dismissal was probably occasioned by Sufi rivalries that had become interwoven with political intrigue.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        },
        {
          id: 'q2',
          text: 'A supplementary reason may have been the Āqā Khan’s refusal to give his daughter in marriage to the son of lowborn protégé of Ḥāǰǰī Mīrzā Āqāšī, who had originally worked on the family lands at Maḥallāt (see Moḥammad b. Zayn-al-ʿābedīn Ḵorāsānī Fedāʾī, Tārīḵ-e Esmāʿīlīya, ed. A. A. Semyonov, Moscow, 1959, repr. Tehran, 1362 Š./1983, p. 151).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        }
      ]
    },
    {
      id: 'british-links',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Finally, it is possible that the links between the Āqā Khan and the British, which became so obvious at a later date, existed already at this time, and the Iranian government may have felt it desirable to remove him from Kermān, a province dangerously close to India.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        }
      ]
    },
    {
      id: 'messianic-dawa',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' },
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The revolt of the Ismaʿili leader Hosayn-ʿAli Shah Āqā Khan Maḥallāti (q.v.) was probably supported by messianic missionary activities (daʿwa) before turning to political claims (Amanat, 1988, pp. 83-84).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      id: 'independent-following',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'James M. Gustafson' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Most notably, the Ismaʿili Nezāri imam Āqā Khan Maḥallāti, appointed governor in 1836, was dismissed from his post in 1838 after building up an independent military following among the ʿAṭāʾ-Allāhi tribes, and popular support through ties to the Neʿmat-Allāhi Sufi order based in Mahān, which elicited suspicion from Moḥammad Shah Qājār (r. 1834-48).',
          lang: 'en',
          cite: {
            source: 'iranica-gustafson-kerman-qajar',
            loc: { section: 'KERMAN ix. History in the Qajar Period', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kerman-09-qajar-period'
          }
        }
      ]
    }
  ]
})
