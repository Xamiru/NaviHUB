import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'annexation-of-hawaii-motives',
  about: ['event:annexation-of-hawaii'],
  topic: 'motives',
  researched: '2026-10-08',
  positions: [
    {
      id: 'strategic-value',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' },
        { kind: 'organization', name: 'Deutsches Historisches Museum' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The ensuing Spanish-American War, part of which was fought in the Philippine Islands, established the argument that the Hawaiian islands would be strategically valuable as a mid-Pacific fueling station and naval installation.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        },
        {
          id: 'q2',
          text: 'Wegen der großen strategischen Bedeutung annektieren die Vereinigten Staaten während des spanisch-amerikanischen Krieges die Inselgruppe Hawaii.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '37' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1898.html'
          }
        }
      ]
    },
    {
      id: 'sugar-interests',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Led by Sanford Dole, they had monetary reasons for doing so – they feared that the United States would establish a tariff on sugar imports, endangering their profits, and wanted to protect Hawaii\'s free-trade status.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    },
    {
      id: 'annexationists-arguments',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Supporters of annexation argued that Hawaii was vital to the U.S. economy, that it would serve as a strategic base that could help protect U.S. interests in Asia, and that other nations were intent on taking over the islands if the United States did not.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    }
  ]
})
