import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'indian-removal-act-justification',
  about: ['event:indian-removal-act'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'benevolent-policy',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States government' },
        { kind: 'participant', name: 'Andrew Jackson', ref: 'person:andrew-jackson' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It gives me pleasure to announce to Congress that the benevolent policy of the Government, steadily pursued for nearly thirty years, in relation to the removal of the Indians beyond the white settlements is approaching to a happy consummation.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: { section: 'Transcript: Andrew Jackson\'s Annual Message', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        },
        {
          id: 'q2',
          text: 'Rightly considered, the policy of the General Government toward the red man is not only liberal, but generous.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: { section: 'Transcript: Andrew Jackson\'s Annual Message', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'U.S. Army troops, along with various state militia, moved into the tribe’s homelands and forcibly evicted more than 16,000 Cherokee Indian people from their homelands in Tennessee, Alabama, North Carolina, and Georgia.',
          lang: 'en',
          cite: {
            source: 'nps-trail-of-tears-brief-history',
            loc: { section: 'History & Culture: A Brief History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.nps.gov/trte/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q9',
          text: 'The treaty was opposed by many members of the Cherokee Nation; and when they refused to leave, Maj. Gen. Winfield Scott was ordered to push them out.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        }
      ]
    },
    {
      id: 'coercion',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'With the Act in place, Jackson and his followers were free to persuade, bribe, and threaten tribes into signing removal treaties and leaving the Southeast.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q4',
          text: 'Through a combination of coerced treaties and the contravention of treaties and judicial determination, the United States Government succeeded in paving the way for the westward expansion and the incorporation of new territories as part of the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        }
      ]
    },
    {
      id: 'land-and-slavery',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'It opened up 25 million acres of eastern land to white settlement and, since the bulk of the land was in the American south, to the expansion of slavery.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: {
              section: 'President Andrew Jackson\'s Message to Congress \'On Indian Removal\' (1830)',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        }
      ]
    },
    {
      id: 'appeasement-and-resistance',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Under this kind of pressure, Native American tribes—specifically the Creek, Cherokee, Chickasaw, and Choctaw—realized that they could not defeat the Americans in war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q7',
          text: 'They hoped that if they gave up a good deal of their land, they could keep at least some a part of it.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        }
      ]
    }
  ]
})
