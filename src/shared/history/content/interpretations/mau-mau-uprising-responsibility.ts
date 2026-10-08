import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mau-mau-uprising-responsibility',
  researched: '2026-10-08',
  about: ['event:mau-mau-uprising'],
  topic: 'responsibility',
  positions: [
    {
      id: 'british-government-2013',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom (Foreign Secretary William Hague)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'During the Emergency Period widespread violence was committed by both sides, and most of the victims were Kenyan. Many thousands of Mau Mau members were killed, while the Mau Mau themselves were responsible for the deaths of over 2,000 people including 200 casualties among the British regiments and police.',
          lang: 'en',
          cite: {
            source: 'gov-uk-2013-06-06-hague-statement-on-settlement-of-mau-mau-claims',
            loc: { section: 'Statement to Parliament on settlement of Mau Mau claims' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/news/statement-to-parliament-on-settlement-of-mau-mau-claims'
          }
        },
        {
          id: 'q2',
          text: 'The British Government recognises that Kenyans were subject to torture and other forms of ill treatment at the hands of the colonial administration. The British government sincerely regrets that these abuses took place, and that they marred Kenya’s progress towards independence.',
          lang: 'en',
          cite: {
            source: 'gov-uk-2013-06-06-hague-statement-on-settlement-of-mau-mau-claims',
            loc: { section: 'Statement to Parliament on settlement of Mau Mau claims' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/news/statement-to-parliament-on-settlement-of-mau-mau-claims'
          }
        },
        {
          id: 'q3',
          text: 'We continue to deny liability on behalf of the Government and British taxpayers today for the actions of the colonial administration in respect of the claims',
          lang: 'en',
          cite: {
            source: 'gov-uk-2013-06-06-hague-statement-on-settlement-of-mau-mau-claims',
            loc: { section: 'Statement to Parliament on settlement of Mau Mau claims' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/news/statement-to-parliament-on-settlement-of-mau-mau-claims'
          }
        }
      ]
    },
    {
      id: 'nam',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Army Museum' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Unfortunately, many members of the Home Guard used violence as a means of controlling the population.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        },
        {
          id: 'q5',
          text: 'These were designated \'Prohibited Areas\', where the security forces operated a shoot-on-sight policy.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        }
      ]
    }
  ]
})
