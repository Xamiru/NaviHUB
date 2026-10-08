import { definePerson } from '../../schema'

export default definePerson({
  id: 'emilio-aguinaldo',
  names: [
    { text: 'Emilio Aguinaldo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['southeast-asia'],
  roles: ['revolutionary', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After the Spanish-American War, while the American public and politicians debated the annexation question, Filipino revolutionaries under Aguinaldo seized control of most of the Philippines’ main island of Luzon and proclaimed the establishment of the independent Philippine Republic.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Aguinaldo and his government escaped, however, establishing a new capital at San Isidro in Nueva Ecija Province.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/philippines/15.htm' }
        },
        {
          id: 'q2',
          text: 'With his best commander dead and his troops suffering continued defeats as American forces pushed into northern Luzon, Aguinaldo dissolved the regular army in November 1899 and ordered the establishment of decentralized guerrilla commands in each of several military zones.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
        },
        {
          id: 'q3',
          text: 'Aguinaldo was captured at Palanan on March 23, 1901, by a force of Philippine Scouts loyal to the United States and was brought back to Manila. Convinced of the futility of further resistance, he swore allegiance to the United States and issued a proclamation calling on his compatriots to lay down their arms.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'War of Resistance', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/15.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/AguinaldoMP.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AguinaldoMP.jpg',
    credit: { institution: 'Malacañang Palace' },
    license: { id: 'public-domain' }
  }
})
