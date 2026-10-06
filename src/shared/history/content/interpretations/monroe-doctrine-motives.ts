import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'monroe-doctrine-motives',
  about: ['event:monroe-doctrine'],
  topic: 'motives',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'The three main concepts of the doctrine—separate spheres of influence for the Americas and Europe, non-colonization, and non-intervention—were designed to signify a clear break between the New World and the autocratic realm of Europe.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-monroe-doctrine',
      loc: { section: 'Monroe Doctrine, 1823', para: '3' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://history.state.gov/milestones/1801-1829/monroe'
    }
  },
  positions: [
    {
      id: 'monroe-message',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'James Monroe', ref: 'person:james-monroe' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The late events in Spain and Portugal shew that Europe is still unsettled.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/monroe-doctrine'
          }
        },
        {
          id: 'q3',
          text: 'It is impossible that the allied powers should extend their political system to any portion of either continent without endangering our peace and happiness; nor can anyone believe that our southern brethren, if left to themselves, would adopt it of their own accord.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-monroe-doctrine',
            loc: { section: 'Monroe Doctrine (1823)', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/monroe-doctrine'
          }
        }
      ]
    },
    {
      id: 'adams-unilateralism',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Quincy Adams' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Secretary of State John Quincy Adams, however, vigorously opposed cooperation with Great Britain, contending that a statement of bilateral nature could limit United States expansion in the future.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q5',
          text: 'He also argued that the British were not committed to recognizing the Latin American republics and must have had imperial motivations themselves.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        }
      ]
    },
    {
      id: 'canning-joint-declaration',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'George Canning' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Earlier in 1823 British Foreign Minister George Canning suggested to Americans that two nations issue a joint declaration to deter any other power from intervening in Central and South America.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        }
      ]
    },
    {
      id: 'trade-and-security',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'While Americans generally objected to European colonies in the New World, they also desired to increase United States influence and trading ties throughout the region to their south.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q8',
          text: 'In particular, Americans feared that Spain and France might reassert colonialism over the Latin American peoples who had just overthrown European rule.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        },
        {
          id: 'q9',
          text: 'Signs that Russia was expanding its presence southward from Alaska toward the Oregon Territory were also disconcerting.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-monroe-doctrine',
            loc: { section: 'Monroe Doctrine, 1823', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/monroe'
          }
        }
      ]
    }
  ]
})
