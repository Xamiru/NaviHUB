import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'war-of-1812-causes',
  about: ['event:war-of-1812'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'blockade-and-impressment',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Their relationship deteriorated sharply with the outbreak of war in Europe in 1803.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        },
        {
          id: 'q2',
          text: 'Britain imposed a blockade on neutral countries such as the United States. In addition, the British took American sailors from their ships and "impressed" them into the British Navy.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        }
      ]
    },
    {
      id: 'expansion-and-territory',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'As the Ghent negotiations suggested, the real causes of the war of 1812, were not merely commerce and neutral rights, but also western expansion, relations with American Indians, and territorial control of North America.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        },
        {
          id: 'q4',
          text: 'Many who supported the call to arms saw British and Spanish territory in North America as potential prizes to be won by battle or negotiations after a successful war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        }
      ]
    },
    {
      id: 'jefferson',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Thomas Jefferson' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The leading Republican, Thomas Jefferson responded, that “the English being equally tyrannical at sea as he [Napoleon] is on land, and that tyranny bearing on us in every point of either honor or interest, I say ‘down with England.’”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        }
      ]
    },
    {
      id: 'war-hawks',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Henry Clay' },
        { kind: 'participant', name: 'John C. Calhoun' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'In Congress, southern and western Democratic-Republican "War Hawks," such as the new Speaker of the House, Henry Clay of Kentucky, and Representative John C. Calhoun of South Carolina, led the sentiment for war, calling for a defense of American interests and honor.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        }
      ]
    },
    {
      id: 'federalist-opposition',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Federalists' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Pro-British Federalists in Washington were outraged by what they considered Republican favoritism toward France.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        }
      ]
    }
  ]
})
