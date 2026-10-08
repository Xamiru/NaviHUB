import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'indo-pakistani-war-of-1965',
  names: [
    { text: 'Indo-Pakistani War of 1965', lang: 'en', role: 'primary' },
    {
      text: 'India-Pakistan War of 1965',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-india-pakistan-war-1965',
          loc: { section: 'The India-Pakistan War of 1965', para: '1' }
        }
      ]
    },
    {
      text: 'Second India-Pakistan War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-india-pakistan-war-1965',
          loc: { section: 'The India-Pakistan War of 1965', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1965-08' },
        cites: [
          {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1965-09-22' },
        cites: [
          {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '7' }
          },
          {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:kashmir',
      cites: [
        {
          source: 'state-dept-milestones-india-pakistan-war-1965',
          loc: { section: 'The India-Pakistan War of 1965', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'india',
      name: 'India',
      polity: 'polity:india',
      cites: [
        {
          source: 'state-dept-milestones-india-pakistan-war-1965',
          loc: { section: 'The India-Pakistan War of 1965', para: '1' }
        }
      ]
    },
    {
      key: 'pakistan',
      name: 'Pakistan',
      polity: 'polity:pakistan',
      cites: [
        {
          source: 'state-dept-milestones-india-pakistan-war-1965',
          loc: { section: 'The India-Pakistan War of 1965', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Indo-Pakistani_War_of_1965.jpg/1280px-Indo-Pakistani_War_of_1965.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Indo-Pakistani_War_of_1965.jpg',
    credit: { institution: 'Pakistan Army (official war-image gallery, pakistanarmy.gov.pk)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The 1965 war between India and Pakistan was the second conflict between the two countries over the status of the state of Jammu and Kashmir. The clash did not resolve this dispute, but it did engage the United States and the Soviet Union in ways that would have important implications for subsequent superpower involvement in the region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/india-pakistan-war'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The dispute over this region originated in the process of decolonization in South Asia. When the British colony of India gained its independence in 1947, it was partitioned into two separate entities: the secular nation of India and the predominantly Muslim nation of Pakistan. Pakistan was composed of two noncontiguous regions, East Pakistan and West Pakistan, separated by Indian territory. The state of Jammu and Kashmir, which had a predominantly Muslim population but a Hindu leader, shared borders with both India and West Pakistan. The argument over which nation would incorporate the state led to the first India-Pakistan War in 1947–48 and ended with UN mediation. Jammu and Kashmir, also known as “Indian Kashmir” or just “Kashmir,” joined the Republic of India, but the Pakistani Government continued to believe that the majority Muslim state rightfully belonged to Pakistan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/india-pakistan-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Conflict resumed again in early 1965, when Pakistani and Indian forces clashed over disputed territory along the border between the two nations. Hostilities intensified that August when the Pakistani Army attempted to take Kashmir by force. The attempt to seize the state was unsuccessful, and the second India-Pakistan War reached a stalemate.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/india-pakistan-war'
          }
        },
        {
          id: 'q4',
          text: 'After Pakistani troops invaded Kashmir, India moved quickly to internationalize the regional dispute. It asked the United Nations to reprise its role in the First India-Pakistan War and end the current conflict. The Security Council passed Resolution 211 on September 20 calling for an end to the fighting and negotiations on the settlement of the Kashmir problem, and the United States and the United Kingdom supported the UN decision by cutting off arms supplies to both belligerents. This ban affected both belligerents, but Pakistan felt the effects more keenly since it had a much weaker military in comparison to India. The UN resolution and the halting of arms sales had an immediate impact. India accepted the ceasefire on September 21 and Pakistan on September 22.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-india-pakistan-war-1965',
            loc: { section: 'The India-Pakistan War of 1965', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/india-pakistan-war'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'gauhar-1996-ayub-khan', perspective: 'south-asian' }
  ]
})
