import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'war-in-afghanistan-2001-outcome',
  about: ['event:war-in-afghanistan-2001'],
  topic: 'outcome',
  framing: {
    id: 'q1',
    text: 'As Barack Obama’s vice president, Biden had argued vociferously for U.S. withdrawal from Afghanistan after the May 2011 raid that killed Osama bin Laden, the al Qaeda leader who had planned the 9/11 terrorist attacks on America in 2001.',
    lang: 'en',
    cite: {
      source: 'millercenter-perry-biden-foreign-affairs',
      loc: { section: 'Joe Biden: Foreign Affairs', para: '12' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://millercenter.org/president/biden/foreign-affairs'
    }
  },
  positions: [
    {
      id: 'united-states-withdrawal-was-right',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Joe Biden' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Our mission in Afghanistan was never supposed to have been nation building.',
          lang: 'en',
          cite: {
            source: 'biden-2021-08-16-remarks-on-afghanistan',
            loc: { section: 'Remarks by President Biden on Afghanistan', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://bidenwhitehouse.archives.gov/briefing-room/speeches-remarks/2021/08/16/remarks-by-president-biden-on-afghanistan/'
          }
        },
        {
          id: 'q3',
          text: 'Afghanistan political leaders gave up and fled the country. The Afghan military collapsed, sometimes without trying to fight.',
          lang: 'en',
          cite: {
            source: 'biden-2021-08-16-remarks-on-afghanistan',
            loc: { section: 'Remarks by President Biden on Afghanistan', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://bidenwhitehouse.archives.gov/briefing-room/speeches-remarks/2021/08/16/remarks-by-president-biden-on-afghanistan/'
          }
        },
        {
          id: 'q4',
          text: 'We gave them every chance to determine their own future. What we could not provide them was the will to fight for that future.',
          lang: 'en',
          cite: {
            source: 'biden-2021-08-16-remarks-on-afghanistan',
            loc: { section: 'Remarks by President Biden on Afghanistan', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://bidenwhitehouse.archives.gov/briefing-room/speeches-remarks/2021/08/16/remarks-by-president-biden-on-afghanistan/'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'For the Biden administration, which had contrasted itself against Trump’s presidency by proclaiming its discipline and expertise, the disastrous withdrawal from Afghanistan represented a stunning blunder and public relations nightmare.',
          lang: 'en',
          cite: {
            source: 'millercenter-perry-biden-foreign-affairs',
            loc: { section: 'Joe Biden: Foreign Affairs', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/biden/foreign-affairs'
          }
        },
        {
          id: 'q6',
          text: 'In many cities, the Taliban searched for, threatened, and sometimes detained or executed former members of the Afghan National Security Forces (ANSF), officials of the former government, or their family members.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-world-report-afghanistan',
            loc: { section: 'World Report 2022: Afghanistan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20220113064739/https://www.hrw.org/world-report/2022/country-chapters/afghanistan'
          }
        }
      ]
    },
    {
      id: 'miller-center-campaign-not-won',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Michael Nelson', discipline: 'political-scientist' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The number of American troops in Afghanistan, which peaked at 97,000 in 2011, declined steadily to about 12,000 in 2015 before leveling off at that figure as the president reluctantly acknowledged that the campaign to defeat the Taliban was not yet won.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-foreign-affairs',
            loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/foreign-affairs'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
