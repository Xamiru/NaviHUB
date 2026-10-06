import { definePerson } from '../../schema'

export default definePerson({
  id: 'thomas-jefferson',
  names: [
    { text: 'Thomas Jefferson', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Thomas Jefferson was elected to the presidency in 1800.',
          lang: 'en',
          cite: {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Jefferson believed strongly in the French Revolution and the ideals it promoted, but as a Virginia slaveholder popular among other Virginia slaveholders, Jefferson also feared the specter of slave revolt.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q3',
          text: 'Still one thing more, fellow-citizens -- a wise and frugal Government, which shall restrain men from injuring one another, shall leave them otherwise free to regulate their own pursuits of industry and improvement, and shall not take from the mouth of labor the bread it has earned.',
          lang: 'en',
          cite: {
            source: 'jefferson-first-inaugural-address-1801',
            loc: { section: 'Thomas Jefferson First Inaugural Address', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/jefinau1.asp'
          }
        },
        {
          id: 'q4',
          text: 'peace, commerce, and honest friendship with all nations, entangling alliances with none;',
          lang: 'en',
          cite: {
            source: 'jefferson-first-inaugural-address-1801',
            loc: { section: 'Thomas Jefferson First Inaugural Address', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/jefinau1.asp'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg/1280px-Thomas_Jefferson_by_Rembrandt_Peale%2C_1800.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Thomas_Jefferson_by_Rembrandt_Peale,_1800.jpg',
    credit: { institution: 'White House Historical Association', creator: 'Rembrandt Peale' },
    license: { id: 'public-domain' }
  }
})
