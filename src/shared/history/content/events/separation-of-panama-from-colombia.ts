import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'separation-of-panama-from-colombia',
  names: [
    { text: 'Separation of Panama from Colombia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1903-10', notAfter: '1903-11' },
        cites: [
          {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1903-11-13' },
        cites: [
          {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 1,
  places: [
    { ref: 'place:panama-city' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      ref: 'person:theodore-roosevelt',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
        }
      ]
    },
    {
      name: 'José Augustin Arango',
      role: 'leader',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '2' }
        }
      ]
    },
    {
      name: 'Manuel Amador Guerrero',
      role: 'leader',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '2' }
        }
      ]
    },
    {
      name: 'Philippe Bunau-Varilla',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
        }
      ]
    },
    {
      name: 'John Hay',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:construction-of-the-panama-canal',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Naval operations during the Spanish-American War (1898-1901) served to convince President Theodore Roosevelt that the United States needed to control a canal somewhere in the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'In October and November 1903, the revolutionary junta, with the protection of United States naval forces, carried out a successful uprising against the Colombian government. Acting, paradoxically, under the Bidlack-Mallarino Treaty of 1846 between the United States and Colombia--which provided that United States forces could intervene in the event of disorder on the isthmus to guarantee Colombian sovereignty and open transit across the isthmus --the United States prevented a Colombian force from moving across the isthmus to Panama City to suppress the insurrection.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        },
        {
          id: 'q2',
          text: 'This treaty, however, was not ratified in Bogotá, and the United States, determined to construct a canal across the isthmus, intensively encouraged the Panamanian separatist movement.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        },
        {
          id: 'q4',
          text: 'Bunau-Varilla had not lived in Panama for seventeen years before the incident, and he never returned. Nevertheless, while residing in the Waldorf-Astoria Hotel in New York City, he wrote the Panamanian declaration of independence and constitution and designed the Panamanian flag.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The rights granted to the United States in the so-called HayBunau -Varilla Treaty were extensive. They included a grant "in perpetuity of the use, occupation, and control" of a sixteenkilometer -wide strip of territory and extensions of three nautical miles into the sea from each terminal "for the construction, maintenance, operation, sanitation, and protection" of an isthmian canal.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        },
        {
          id: 'q6',
          text: 'The Republic of Panama became a de facto protectorate of the larger country through two provisions whereby the United States guaranteed the independence of Panama and received in return the right to intervene in Panama\'s domestic affairs.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        },
        {
          id: 'q7',
          text: 'Colombia was the harshest critic of United States policy at the time. A reconciliatory treaty with the United States providing an indemnity of US$25 million was finally concluded between these two countries in 1921.',
          lang: 'en',
          cite: {
            source: 'loc-panama-country-study-1987',
            loc: { section: 'The 1903 Treaty and Qualified Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1903-01-22' },
            cites: [
              {
                source: 'loc-panama-country-study-1987',
                loc: { section: 'The 1903 Treaty and Qualified Independence', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'This interest culminated in the Spooner Bill of June 29, 1902, providing for a canal through the isthmus of Panama, and the Hay-Herrán Treaty of January 22, 1903, under which Colombia gave consent to such a project in the form of a 100-year lease on an area 10 kilometers wide.',
        lang: 'en',
        cite: {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1903-11-06' },
            cites: [
              {
                source: 'loc-panama-country-study-1987',
                loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'President Roosevelt recognized the new Panamanian junta as the de facto government on November 6, 1903; de jure recognition came on November 13.',
        lang: 'en',
        cite: {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1903-12-02' },
            cites: [
              {
                source: 'loc-panama-country-study-1987',
                loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Nonetheless, the Panamanians, having no apparent alternative, ratified the treaty on December 2, and approval by the United States Senate came on February 23, 1904.',
        lang: 'en',
        cite: {
          source: 'loc-panama-country-study-1987',
          loc: { section: 'The 1903 Treaty and Qualified Independence', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/panama/8.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Junta_Provisional_de_Gobierno_de_Panam%C3%A1_de_1903.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Junta_Provisional_de_Gobierno_de_Panam%C3%A1_de_1903.jpg',
    credit: { institution: 'Biblioteca Nacional de Panamá (Estudios sobre el Panamá republicano)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'lemaitre-1972-panama-y-su-separacion-de-colombia',
      perspective: 'latin-american'
    },
    { source: 'arauz-pizzurno-1993-el-panama-colombiano', perspective: 'latin-american' }
  ]
})
