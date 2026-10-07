import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'independence-of-brazil',
  names: [
    { text: 'Independence of Brazil', lang: 'en', role: 'primary' },
    { text: 'Independência do Brasil', lang: 'pt', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1822-09-07' },
        cites: [
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    { ref: 'place:rio-de-janeiro' }
  ],
  sides: [
    {
      key: 'brazil',
      name: 'Brazilians',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '7' }
        }
      ]
    },
    {
      key: 'portugal',
      name: 'Portuguese',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:pedro-i-of-brazil',
      role: 'leader',
      side: 'brazil',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '6' }
        }
      ]
    },
    {
      name: 'José Bonifácio de Andrada e Silva',
      role: 'participant',
      side: 'brazil',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '2' }
        }
      ]
    },
    {
      name: 'Thomas Alexander Cochrane',
      role: 'commander',
      side: 'brazil',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '7' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'portugal',
      value: {
        alts: [
          {
            value: { min: 10000, max: 20000 },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '7' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'brazil',
      value: {
        alts: [
          {
            value: { min: 12000, max: 14000 },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '7' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Then, in January 1821, Portuguese officers and troops, as well as Brazilian liberals, took over provincial governments in Bahia and Belém, and in late February, troops in Rio de Janeiro threw in with the movement and forced the king to take an oath to accept any constitution the Côrtes might write.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Kingdom of Portugal and Brazil, 1815-21', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/10.htm' }
        },
        {
          id: 'q2',
          text: 'In effect, Brazil was again being ruled from Portugal.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Kingdom of Portugal and Brazil, 1815-21', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/10.htm' }
        },
        {
          id: 'q3',
          text: 'In September 1821, the Côrtes, with only a portion of the Brazilian delegates present, voted to abolish the Kingdom of Brazil and the royal agencies in Rio de Janeiro and to make all the provinces subordinate directly to Lisbon.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Returning from an excursion to Santos, Pedro received messages from his wife and from Andrada e Silva that the Côrtes considered his government traitorous and was dispatching more troops. In a famous scene at Ipiranga on September 7, 1822, he had to choose between returning to Portugal in disgrace or opting for independence.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/brazil/11.htm' }
        },
        {
          id: 'q5',
          text: 'He tore the Portuguese blue and white insignia from his uniform, drew his sword, and swore: "By my blood, by my honor, and by God: I will make Brazil free."',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        },
        {
          id: 'q6',
          text: 'Their motto, he said, would be "Independence or Death!"',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        },
        {
          id: 'q7',
          text: 'By mid-1823 the contending forces numbered between 10,000 and 20,000 Portuguese, some of whom were veterans of the Napoleonic Wars, versus 12,000 to 14,000 Brazilians, mostly in militia units from the Northeast.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Secret codicils of the treaty with Portugal required that Brazil assume payment of 1.4 million pounds sterling owed to Britain and indemnify Dom João VI and other Portuguese for losses totaling 600,000 pounds sterling.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Empire, 1822-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1821-04-25' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Kingdom of Portugal and Brazil, 1815-21', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On April 25, 1821, twelve ships carrying the king and queen, 4,000 officials, diplomats, and families, as well as purloined funds and jewels from the Bank of Brazil, set course for Lisbon.',
        lang: 'en',
        cite: {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Kingdom of Portugal and Brazil, 1815-21', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1822-01' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In January 1822, tension between Portuguese troops and the Luso-Brazilians (Brazilians born in Portugal) turned violent when Pedro accepted petitions from Brazilian towns begging him to refuse the Côrtes\'s order to return to Lisbon. Responding to their pressure and to the argument that his departure and the dismantling of the central government would trigger separatist movements, he vowed to stay.',
        lang: 'en',
        cite: {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1822-08' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'More confident, in early August he called on the Brazilian deputies in Lisbon to return, decreed that Portuguese forces in Brazil should be treated as enemies, and issued a manifesto to "friendly nations."',
        lang: 'en',
        cite: {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1825-08-29' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Empire, 1822-89', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Britain and Portugal recognized Brazilian independence by signing a treaty on August 29, 1825.',
        lang: 'en',
        cite: {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Empire, 1822-89', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Pedro_Am%C3%A9rico_-_Independ%C3%AAncia_ou_Morte_-_Google_Art_Project.jpg/1280px-Pedro_Am%C3%A9rico_-_Independ%C3%AAncia_ou_Morte_-_Google_Art_Project.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pedro_Am%C3%A9rico_-_Independ%C3%AAncia_ou_Morte_-_Google_Art_Project.jpg',
    credit: { institution: 'Museu Paulista', creator: 'Pedro Américo' },
    license: { id: 'public-domain' }
  }
})
