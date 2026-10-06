import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'egyptian-revolution-of-1919-nature',
  about: ['event:egyptian-revolution-of-1919'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'national-union',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Kingdom of Egypt (the monarchy of Fuad I)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In the popular imagination, what has become known as the Egyptian Revolution of 1919 united disparate parts of Egyptian society; rich and poor, Muslim and Christian, men and women, the new working class, the labor syndicates, and peasant farmers alike took to the streets, arm in arm, for the purpose of demanding Egypt’s right to self-determination and obstructing the British ability to rule the country.',
          lang: 'en',
          cite: {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'While there is a kernel of truth to this, this was also the version of events proposed by the Egyptian monarchy itself; Yoav Di-Capua has described how the national historiographical project launched by Sultan Fuad in 1920 was intended to respond to critics of the monarchy by creating “an alternative historical consciousness that would convincingly settle the apparent contradiction between the idea of the nation/people and that of the dynasty”, by recasting the role of the monarchy itself, which had been resistant to reform and tepid toward the nationalist movement prior to 1919.',
          lang: 'en',
          cite: {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
          }
        }
      ]
    },
    {
      id: 'rural-discontent',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Kyle Anderson' },
        { kind: 'scholar', name: 'Ellis Goldberg' },
        { kind: 'scholar', name: 'Reinhard Schülze' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Some historians (for example: Kyle Anderson, Ellis Goldberg, and Reinhard Schülze) have questioned the degree to which Egyptian nationalism, which had heretofore been an elite, intellectual urban-based movement largely driven by the Europeanized upper classes, was able to gain traction among a mostly illiterate, rural population who would have been more likely to see the landholding classes as associates of the British rather than as natural allies.',
          lang: 'en',
          cite: {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
          }
        }
      ]
    },
    {
      id: 'wartime-hardship',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Specifically, these included Britain\'s purchase of cotton and requisitioning of fodder at below market prices, Britain\'s forcible recruitment of about 500,000 peasants into the Labor and Camel Transport Corps in the Egyptian Expeditionary Force, and its use of the country as a base and a garrison populated by British, Australian, and other troops.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        }
      ]
    },
    {
      id: 'savage-outbreak',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Alfred, 1st Viscount Milner' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'He acknowledged there were “unfortunate incidences” during the period of the war which “shook for a time” Egyptians’ “confidence in our justice and good will, and were pre-disposing causes of the savage outbreak of anti-British feeling in the spring of 1919”.',
          lang: 'en',
          cite: {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
          }
        }
      ]
    }
  ]
})
