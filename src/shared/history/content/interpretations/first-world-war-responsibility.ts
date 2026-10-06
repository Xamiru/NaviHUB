import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-world-war-responsibility',
  about: ['event:first-world-war'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'Historians have argued over the origins of the First World War for over a hundred years, and the July Crisis is a particularly controversial aspect of this long debate. The fact that in 1919 the victorious allies took the unusual step to attribute “war guilt” to Germany and its allies has resulted in a debate about the origins of the war that was from the start based on arguments over truth and lies.',
    lang: 'en',
    cite: { source: 'eo1418-mombauer-july-crisis-1914', loc: { section: 'Conclusion', para: '1' } },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
    }
  },
  researched: '2026-10-06',
  positions: [
    {
      id: 'war-guilt-clause',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Allied and Associated Powers' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The treaty also included the "war guilt clause," ascribing responsibility for World War I to Germany and Austria-Hungary.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War I', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/34.htm' }
        }
      ]
    },
    {
      id: 'central-powers-chiefly-responsible',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Annika Mombauer' },
        { kind: 'scholar', name: 'Richard Hamilton' },
        { kind: 'scholar', name: 'Holger Herwig' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In 2003, Richard Hamilton and Holger Herwig contended: “Lloyd George’s notion of the innocent or unintended ‘slide’ stands sharply opposed to the evidence now available”.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        },
        {
          id: 'q4',
          text: 'If all leaders are considered responsible, then arguably they were not equally so. In the governments of the Central Powers, a deliberate decision was taken to use the “golden opportunity” of the Sarajevo crime as a trigger for a war that they had long wanted to fight, and that they considered unavoidable in the long run.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    },
    {
      id: 'shared-responsibility',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Christopher Clark' }
      ],
      statements: [
        {
          id: 'q5',
          text: '“There is no smoking gun in this story; or, rather, there is one in the hands of every major character,” argues Christopher Clark in a revisionist account that largely exonerates Germany where once it had stood almost solely accused and focuses our attention on the decisions and actions of some of the other Great Powers instead.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Eschewing to place any blame or responsibility harks back to David Lloyd George (1863-1945), whereas most accounts of the origins of the war since the 1960s have sought to advance arguments which foreground the culpability of some governments over those of others whilst weighing up evidence for all.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    },
    {
      id: 'russian-mobilisation',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Historians who attribute responsibility to Russia' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Much has been made of this early decision by historians who attribute responsibility for the war to Russia.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'The Ultimatum and Mediation Attempts', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    }
  ]
})
