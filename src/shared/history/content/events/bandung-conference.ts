import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bandung-conference',
  names: [
    { text: 'Bandung Conference', lang: 'en', role: 'primary' },
    {
      text: 'Asian-African Conference',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-bandung-conference',
          loc: { section: 'Bandung Conference (Asian-African Conference), 1955' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1955-04' },
        cites: [
          {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'south-asia', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:bandung',
      cites: [
        {
          source: 'state-dept-milestones-bandung-conference',
          loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      name: 'Zhou Enlai',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-bandung-conference',
          loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '7' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In April, 1955, representatives from twenty-nine governments of Asian and African nations gathered in Bandung, Indonesia to discuss peace and the role of the Third World in the Cold War, economic development, and decolonization.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The core principles of the Bandung Conference were political self-determination, mutual respect for sovereignty, non-aggression, non-interference in internal affairs, and equality. These issues were of central importance to all participants in the conference, most of which had recently emerged from colonial rule.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        },
        {
          id: 'q3',
          text: 'The governments of Burma, India, Indonesia, Pakistan and Sri Lanka co-sponsored the Bandung Conference, and they brought together an additional twenty-four nations from Asia, Africa and the Middle East.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'At the close of the Bandung Conference attendees signed a communique that included a range of concrete objectives. These goals included the promotion of economic and cultural cooperation, protection of human rights and the principle of self-determination, a call for an end to racial discrimination wherever it occurred, and a reiteration of the importance of peaceful coexistence.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        },
        {
          id: 'q5',
          text: 'In the end, however, the Bandung Conference did not lead to a general denunciation of the West as U.S. observers had feared. Instead, the participants displayed a wide range of ideologies and loyalties. U.S. allies in Asia were able to represent their shared interests with the United States in the conference meetings, and Chinese Premier Zhou Enlai took a moderate line in his speeches to the delegates.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Bandung Conference and its final resolution laid the foundation for the nonaligned movement during the Cold War. Leaders of developing countries banded together to avoid being forced to take sides in the Cold War contest.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        },
        {
          id: 'q7',
          text: 'The United States Government initially viewed the Bandung Conference, and the nonaligned movement that emerged from it, with caution.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        },
        {
          id: 'q8',
          text: 'Nevertheless, Bandung gave a voice to emerging nations and demonstrated that they could be a force in future world politics, inside or outside the Cold War framework.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-bandung-conference',
            loc: { section: 'Bandung Conference (Asian-African Conference), 1955', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/bandung-conf'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Delegations_held_a_Plenary_Meeting_of_the_Economic_Section_during_the_A-A_Conference_in_Merdeka_Building%2C_Bandung%2C_on_April_20th_1955.jpg/1280px-Delegations_held_a_Plenary_Meeting_of_the_Economic_Section_during_the_A-A_Conference_in_Merdeka_Building%2C_Bandung%2C_on_April_20th_1955.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Delegations_held_a_Plenary_Meeting_of_the_Economic_Section_during_the_A-A_Conference_in_Merdeka_Building,_Bandung,_on_April_20th_1955.jpg',
    credit: { institution: 'Government of Indonesia' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'abdulgani-1981-the-bandung-connection', perspective: 'southeast-asian' }
  ]
})
