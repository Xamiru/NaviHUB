import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'trial-and-execution-of-saddam-hussein-fairness',
  about: ['event:iraq-war'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'bush-a-fair-trial',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'George W. Bush', ref: 'person:george-w-bush' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Today, Saddam Hussein was executed after receiving a fair trial -- the kind of justice he denied the victims of his brutal regime.',
          lang: 'en',
          cite: {
            source: 'white-house-2006-12-29-statement-on-execution-of-saddam-hussein',
            loc: { section: 'President Bush\'s Statement on Execution of Saddam Hussein' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://georgewbush-whitehouse.archives.gov/news/releases/2006/12/20061229-15.html'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'In a report issued in November 2006 Human Rights Watch concluded that the trial had not respected basic fair trial guarantees.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-iraq',
            loc: { section: 'World Report 2007: Iraq', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-6'
          }
        }
      ]
    },
    {
      id: 'hrw-the-trials-were-marred',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Serious concerns remained about the capacity of the IHT to fairly and effectively try these massive crimes in accordance with international criminal law and fair trial standards.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-iraq',
            loc: { section: 'World Report 2007: Iraq', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-6'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
