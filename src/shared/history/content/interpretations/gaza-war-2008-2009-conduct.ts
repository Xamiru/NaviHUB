import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'gaza-war-2008-2009-conduct',
  about: ['event:gaza-war-2008-2009'],
  topic: 'responsibility',
  positions: [
    {
      id: 'israel-hamas-used-civilians-as-human-shields',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' },
        { kind: 'organization', name: 'Israel Defense Forces' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In order to explain the high number of civilian casualties from the fighting in Gaza, Israeli government and IDF officials have repeatedly blamed Hamas for using civilians as "human shields" and for fighting from civilian objects.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
            loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
          }
        },
        {
          id: 'q2',
          text: 'The IDF at first denied using white phosphorus in Gaza, and then said it was using all weapons in compliance with international law.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
            loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'In the cases documented in this report, Human Rights Watch found no evidence of Hamas using human shields in the vicinity at the time of the attacks.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
            loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
          }
        },
        {
          id: 'q4',
          text: 'When it wanted an obscurant for its forces, the IDF had a readily available and non-lethal alternative to white phosphorus-smoke shells produced by an Israeli company.',
          lang: 'en',
          cite: {
            source: 'hrw-2009-03-25-rain-of-fire-israels-unlawful-use-of-white-phosphorus-in-gaza',
            loc: { section: 'Rain of Fire: Israel\'s Unlawful Use of White Phosphorus in Gaza' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza'
          }
        }
      ]
    },
    {
      id: 'hamas-the-rockets-were-reprisals-and-resistance',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Hamas and other Palestinian armed groups' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Hamas and other groups stated the attacks were intended as reprisals for unlawful Israeli attacks or as a means of resistance to occupation.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Deliberate or indiscriminate attacks on civilians are a serious violation of international humanitarian law regardless of their rationale.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/israel/palestine'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
