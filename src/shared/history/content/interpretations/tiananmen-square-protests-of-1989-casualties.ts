import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'tiananmen-square-protests-of-1989-casualties',
  about: ['event:tiananmen-square-protests-of-1989'],
  topic: 'casualties',
  framing: {
    id: 'q1',
    text: 'Estimates of the numbers killed vary.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-tiananmen-square-1989',
      loc: { section: 'Tiananmen Square, 1989', para: '6' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
    }
  },
  positions: [
    {
      id: 'chinese-leadership-army-losses-and-rebellion',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Chinese Communist Party' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'First of all, I should like to express my deep grief over the officers and men of the People’s Liberation Army, the People’s Armed Police Force and the Public Security Police who have died heroically in this struggle. I also want to express my sincere solicitude for the thousands of PLA, PAPF and PSP officers and men who have been wounded. I extend my cordial greetings to all your officers and men who have taken part in the struggle.',
          lang: 'en',
          cite: {
            source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
            loc: {
              section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/deng-xiaoping/1989/5.htm'
          }
        },
        {
          id: 'q3',
          text: 'Why is it that in the course of putting down the rebellion so many of our comrades laid down their lives or were wounded or robbed of their arms? This too was also because good people and bad were mixed together, so that we could not take the resolute measures we should have taken.',
          lang: 'en',
          cite: {
            source: 'deng-1989-address-to-officers-enforcing-martial-law-in-beijing',
            loc: {
              section: 'Address to Officers at the Rank of General and Above in Command of the Troops Enforcing Martial Law in Beijing',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/deng-xiaoping/1989/5.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The Chinese Government has asserted that injuries exceeded 3,000 and that over 200 individuals, including 36 university students, were killed that night. Western sources, however, are skeptical of the official Chinese report and most frequently cite the toll as hundreds or even thousands killed.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tiananmen-square-1989',
            loc: { section: 'Tiananmen Square, 1989', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/tiananmen-square'
          }
        }
      ]
    },
    {
      id: 'us-government-estimates-june-1989',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'United States Department of State' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'deaths from the military assault on Tiananmen Square range from 180 to 500; thousands more have been injured.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb16-tiananmen-square-1989-the-declassified-history-documents',
            loc: {
              section: 'Tiananmen Square, 1989: The Declassified History: Documents',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB16/documents/index.html'
          }
        },
        {
          id: 'q6',
          text: 'casualty estimates vary from 500 to 2600 deaths, with injuries up to 10,000.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb16-tiananmen-square-1989-the-declassified-history-documents',
            loc: {
              section: 'Tiananmen Square, 1989: The Declassified History: Documents',
              para: '70'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB16/documents/index.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08'
})
