import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-and-britain-hidden-hand',
  about: ['theme:iran-and-britain'],
  topic: 'foreign-role',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'Belief in the sīāsat-e Engelīs led many Persians also to believe that most political events were stage-managed by the British (kār-e Engelīsīhā) and that almost all politicians were British agents',
    lang: 'en',
    cite: {
      source: 'iranica-ashraf-conspiracy-theories',
      loc: { section: 'CONSPIRACY THEORIES', para: '6' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
    }
  },
  positions: [
    {
      id: 'siasat-e-engelis',
      category: 'fringe',
      holders: [
        { kind: 'participant', name: 'Khan-Malek Sāsānī' },
        {
          kind: 'participant',
          name: 'Mohammad Reza Shah Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q2',
          text: '“The descendants of the dirty dozen who collaborated with Colonel Sheil [the British minister in Tehran] in murdering Amīr Kabīr still, after a century, hold key positions.”',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        },
        {
          id: 'q3',
          text: '“Any family whose members have occupied key positions in the last hundred years with no interruption are all the servants of Great Britain”',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        },
        {
          id: 'q4',
          text: '“We always suspected he was a British agent, a suspicion his future posturing as an anti-British nationalist did not diminish. Certainly my father had long suspected his British connections and in 1940 jailed him on espionage charges”',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Although blaming others can help to assuage anxiety about failures, ready acceptance of conspiracy theories has also proved to be highly dysfunctional; in modern Persia it has contributed to political malaise that has sometimes precluded rational responses to internal and external crises',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        },
        {
          id: 'q6',
          text: 'Similarly Lambton, then a professor at London University, following her visit to Persia in the summer of 1956, found the extent of Persian belief in the “myth” of British influence “astonishing” and observed: “Britain is believed by all classes, down to the peasants, to support the shah and the government, and therefore, is held responsible for the ills of the country”',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      id: 'real-intervention-weak-state',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ahmad Ashraf' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The fact that the great powers have in fact intervened covertly in Persian affairs has led ordinary people, political leaders, even the rulers themselves to interpret their history in terms of elaborate and devious conspiracies.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        },
        {
          id: 'q8',
          text: 'The apparent absence of conspiracy theories in 19th-century Persia and their appearance and increasing popularity in the first quarter of this century suggest that they emerged largely as a result of the weakness of central authority and increasing foreign intervention in Persian affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'buffer-preserved-sovereignty-undermined',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'Both powers came to recognize the need for preserving the Qajar state in order to sustain a fragile equilibrium, yet at times they did not hesitate to undermine its sovereignty in domestic affairs, require subservience to their imperial, and sometimes whimsical wishes, and even to breach its territorial integrity.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q10',
          text: 'It would be a misconception however to regard Persia as a helpless pawn in the imperial game, or to adhere to the belief that it was spared from direct colonization only because of the mutual fear existing between the two powers or perhaps because of their apparent disinterest. There is ample evidence to argue that had it not been for the subtle resilience shown by the Persian government, even when it was at its lowest ebb, and its adaptability, the political integrity of the country would have been compromised far more than it actually was.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q11',
          text: 'Despite frequent ups and downs, Britain remained committed in essence to the preservation of the stability and integrity of Persia, but opposed to her territorial claims in eastern Khorasan and in the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'partner-of-russia-1907-1917',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' }
      ],
      statements: [
        {
          id: 'q12',
          text: 'From 1907 until the outbreak of the First World War, British policy in Persia consisted of extensive cooperation with Russia, to the point of legitimizing Russia’s repeated violations of Persian sovereignty and substantial military presence in northern Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q13',
          text: 'In the process, the British Foreign Office abetted Russia in undermining the Persian Constitutional Revolution in December 1911.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    }
  ]
})
