import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anglo-persian-agreement-of-1919-nature',
  about: ['event:anglo-persian-agreement-of-1919'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'virtual-protectorate',
      category: 'scholarly',
      standing: {
        label: 'majority',
        quote: {
          id: 'q1',
          text: 'The Anglo-Persian Agreement of 1919 was widely viewed as establishing a British protectorate over Iran.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'World War I', para: '2' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/14.htm' }
        }
      },
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' },
        { kind: 'scholar', name: 'Mohammad Javad Sheikh-ol-Islami' },
        { kind: 'scholar', name: 'Nina M. Mamedova' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Agreement, which evoked immediate condemnation from Persian nationalists and took the rest of the world by surprise, was tantamount to the establishment of a virtual British protectorate over Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '58' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q3',
          text: 'If implemented, the treaty would have put an end to Iran’s political independence and for all practical purposes made England Iran’s guardian and protector.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      id: 'respect-for-independence',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom' },
        { kind: 'state', name: 'Persia' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'reiterates, in the most categorical manner, the understanding which they have repeatedly given in the past to respect absolutely the independence and integrity of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'As foreign secretary, Curzon shifted to the protectorate alternative, as evident in the 1919 Anglo-Persian agreement.',
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
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'defence-against-bolshevism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'but Woṯuq-al-Dawla defends the Agreement as an effective measure against Soviet penetration.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1919' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      id: 'curzons-chain-of-buffer-states',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nasrollah S. Fatemi' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The British Foreign Office feared that if the Bolsheviks invaded Persia it would be a menace to Mesopotamia and India (Nicholson, Curzon, pp. 139-40).',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        },
        {
          id: 'q7',
          text: 'Curzon hoped “to create a chain of vassal states stretching from the Mediterranean to the Pamirs and protecting not the Indian frontiers merely, but our (i.e., the British) communications with our further Empire” (Skrine, World War, p. 56).',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        }
      ]
    },
    {
      id: 'treason-in-public-opinion',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Persian public opinion' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'It is seen by the public as a protectorate act signed between Great Britain and a small group of Persian statesmen who have committed treason and sold their country to foreigners,',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1919' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
