import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'soviet-invasion-of-afghanistan-justification',
  about: ['event:soviet-invasion-of-afghanistan'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'soviet-union-brezhnev',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Soviet Union' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Government of Afghanistan during the course of nearly two years has numerous times turned to us with this request. In point of fact one of these requests was sent to us on 26 December of this year.',
          lang: 'en',
          cite: { source: 'frus1977-80v12-doc-114', loc: { section: 'Document 114' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v12/d114'
          }
        },
        {
          id: 'q2',
          text: 'I want to once more stress that the purpose of the limited Soviet contingent in Afghanistan has only one goal—to provide assistance in repulsing the acts of external aggression, which have been taking place for a prolonged time and have now taken on even greater scale.',
          lang: 'en',
          cite: { source: 'frus1977-80v12-doc-114', loc: { section: 'Document 114' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v12/d114'
          }
        },
        {
          id: 'q3',
          text: 'Concerning your “advice”, we already informed you, and here I repeat again, that as soon as the reasons which prompted the Afghanistani request to the Soviet Union disappear, we fully intend to withdraw the Soviet military contingents from Afghanistani territory.',
          lang: 'en',
          cite: { source: 'frus1977-80v12-doc-114', loc: { section: 'Document 114' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v12/d114'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'By mid-1979 Moscow was searching to replace Taraki and Amin, and dispatched combat troops to Bagram Air Base outside of Kabul.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        }
      ]
    },
    {
      id: 'united-states-carter',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'I want to insure that you have fully weighed the ramifications of the Soviet actions in Afghanistan, which we regard as a clear threat to the peace.',
          lang: 'en',
          cite: { source: 'frus1977-80v12-doc-113', loc: { section: 'Document 113' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v12/d113'
          }
        },
        {
          id: 'q5',
          text: 'Large-scale movements of military units into a sovereign country are always a legitimate matter of concern to the international community. When such military forces are those of a superpower, and are then used to depose an existing government and impose another, there are obvious adverse implications both for the region and for the world at large.',
          lang: 'en',
          cite: { source: 'frus1977-80v12-doc-113', loc: { section: 'Document 113' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v12/d113'
          }
        },
        {
          id: 'q6',
          text: 'Neither superpower can arrogate to itself the right to displace or overturn a legally constituted government in another country by force of arms. Such a precedent is a dangerous one; it flouts all the accepted norms of international conduct.',
          lang: 'en',
          cite: { source: 'frus1977-80v12-doc-113', loc: { section: 'Document 113' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v12/d113'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'U.S. officials interpreted this mission as one last Soviet attempt to shore up the Taraki regime, and also an opportunity to devise a military takeover.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        }
      ]
    },
    {
      id: 'oh-invasion-or-intervention',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'While the massive, lightning-fast military maneuvers and brazenness of Soviet political objectives constituted an “invasion” of Afghanistan, the word “intervention” more accurately describes these events as the culmination of growing Soviet domination going back to 1973. Undoubtedly, leaders in the Kremlin had hoped that a rapid and complete military takeover would secure Afghanistan’s place as an exemplar of the Brezhnev Doctrine, which held that once a country became socialist Moscow would never permit it to return to the capitalist camp.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
