import { definePerson } from '../../schema'

export default definePerson({
  id: 'theodore-roosevelt',
  names: [
    { text: 'Theodore Roosevelt', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['north-america'],
  roles: ['politician'],
  sections: [
    {
      kind: 'career',
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
        },
        {
          id: 'q2',
          text: 'For the sake of maintaining the balance of power and equal economic opportunity in the region, Roosevelt preferred that the war end on terms that left both Russia and Japan a role to play in Northeast China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        },
        {
          id: 'q3',
          text: 'Although the actual importance of Roosevelt’s mediation and personal pressure on the leadership in Moscow and Tokyo to the final agreement is unclear, he won the Nobel Peace Prize for his efforts in moderating the talks and pushing toward peace.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-portsmouth',
            loc: {
              section: 'The Treaty of Portsmouth and the Russo-Japanese War, 1904–1905',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/portsmouth-treaty'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/President_Theodore_Roosevelt%2C_1904.jpg/1280px-President_Theodore_Roosevelt%2C_1904.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:President_Theodore_Roosevelt,_1904.jpg',
    title: 'President Theodore Roosevelt, 1904',
    credit: { institution: 'Library of Congress', creator: 'Pach Brothers' },
    license: { id: 'public-domain' }
  }
})
