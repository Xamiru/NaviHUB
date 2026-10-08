import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'spanish-american-war-causes',
  about: ['event:spanish-american-war'],
  topic: 'causes',
  researched: '2026-10-09',
  positions: [
    {
      id: 'yellow-press-climate-not-sole-cause',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The rise of yellow journalism helped to create a climate conducive to the outbreak of international conflict and the expansion of U.S. influence overseas, but it did not by itself cause the war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        },
        {
          id: 'q2',
          text: 'Moreover, influential figures such as Theodore Roosevelt led a drive for U.S. overseas expansion that had been gaining strength since the 1880s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        }
      ]
    },
    {
      id: 'anti-colonial-interest-and-outrage',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The long-held U.S. interest in ridding the Western Hemisphere of European colonial powers and American public outrage over brutal Spanish tactics created much sympathy for the Cuban revolutionaries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      id: 'business-interests-and-public-opinion',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'American business interests were anxious for a resolution--with or without Spain--of the insurrection that had broken out in Cuba in February 1895.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'Outbreak of War, 1898', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
        },
        {
          id: 'q5',
          text: 'Moreover, public opinion in the United States had been aroused by newspaper accounts of the brutalities of Spanish rule.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'Outbreak of War, 1898', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
        }
      ]
    },
    {
      id: 'humanity-and-menace',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'William McKinley' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'First. In the cause of humanity and to put an end to the barbarities, bloodshed, starvation, and horrible miseries now existing there, and which the parties to the conflict are either unable or unwilling to stop or mitigate. It is no answer to say this is all in another country, belonging to another nation, and is therefore none of our business. It is specially our duty, for it is right at our door.',
          lang: 'en',
          cite: {
            source: 'mckinley-1898-04-11-message-regarding-cuban-civil-war',
            loc: { section: 'April 11, 1898: Message Regarding Cuban Civil War', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-11-1898-message-regarding-cuban-civil-war'
          }
        },
        {
          id: 'q7',
          text: 'Fourth, and which is of the utmost importance. The present condition of affairs in Cuba is a constant menace to our peace, and entails upon this Government and enormous expense.',
          lang: 'en',
          cite: {
            source: 'mckinley-1898-04-11-message-regarding-cuban-civil-war',
            loc: { section: 'April 11, 1898: Message Regarding Cuban Civil War', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-11-1898-message-regarding-cuban-civil-war'
          }
        },
        {
          id: 'q8',
          text: 'In the name of humanity, in the name of civilization, in behalf of endangered American interests which gives us the right and the duty to speak and to act, the war in Cuba must stop.',
          lang: 'en',
          cite: {
            source: 'mckinley-1898-04-11-message-regarding-cuban-civil-war',
            loc: { section: 'April 11, 1898: Message Regarding Cuban Civil War', para: '73' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/april-11-1898-message-regarding-cuban-civil-war'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'Thus, the war enabled the United States to establish its predominance in the Caribbean region and to pursue its strategic and economic interests in Asia.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      id: 'denial-of-spanish-sovereignty',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Kingdom of Spain' },
        { kind: 'participant', name: 'Pío Gullón' },
        { kind: 'participant', name: 'Luis Polo de Bernabé' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'In compliance with a painful duty, I have the honor to inform your excellency that, the President having approved a resolution of both Chambers of the United States which, in denying the legitimate sovereignty of Spain and in threatening armed intervention in Cuba, is equivalent to an evident declaration of war, the Government of His Majesty has ordered its minister in Washington to withdraw without loss of time from the North American territory with all the personnel of the legation.',
          lang: 'en',
          cite: {
            source: 'frus-1898-d632-spanish-note-breaking-relations',
            loc: { section: 'Mr. Woodford to Mr. Sherman, Madrid, April 21, 1898' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1898/d632'
          }
        },
        {
          id: 'q10',
          text: 'It is to be borne in mind that the sad situation of these people',
          lang: 'en',
          cite: {
            source: 'frus-1898-d561-polo-de-bernabe-to-day',
            loc: { section: 'Señor Polo de Bernabé to Mr. Day, Washington, March 26, 1898' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1898/d561'
          }
        }
      ],
      reception: [
        {
          id: 'q14',
          text: 'The Spanish government rejected the U.S. ultimatum and immediately severed diplomatic relations with the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      id: 'cuban-independence-against-annexation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'José Martí' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'ya estoy todos los días en peligro de dar mi vida por mi país, y por mi deber- puesto que lo entiendo y tengo ánimos con que realizarlo-de impedir a tiempo con la independencia de Cuba que se extiendan por las Antillas los Estados Unidos y caigan, con esa fuerza más, sobre nuestras tierras de América.',
          lang: 'es',
          cite: {
            source: 'marti-1895-carta-a-manuel-mercado',
            loc: { section: 'Carta a Manuel Mercado, Campamento de Dos Ríos, 18 de mayo de 1895' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://es.wikisource.org/wiki/Carta_a_Manuel_Mercado'
          }
        },
        {
          id: 'q12',
          text: 'Viví en el monstruo, y le conozco las entrañas;-y mi honda es la de David.',
          lang: 'es',
          cite: {
            source: 'marti-1895-carta-a-manuel-mercado',
            loc: { section: 'Carta a Manuel Mercado, Campamento de Dos Ríos, 18 de mayo de 1895' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://es.wikisource.org/wiki/Carta_a_Manuel_Mercado'
          }
        }
      ]
    }
  ]
})
