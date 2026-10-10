import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'gulf-war-conduct-of-the-air-campaign',
  about: ['event:gulf-war'],
  topic: 'nature',
  positions: [
    {
      id: 'cheney-the-most-successful-air-campaign',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Richard Cheney' },
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q1',
          text: '"the most successful air-campaign in the history of the world."',
          lang: 'en',
          cite: {
            source: 'hrw-1991-needless-deaths-in-the-gulf-war-introduction',
            loc: { section: 'Introduction and Summary of Conclusions', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1991/gulfwar/INTRO.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'Despite this exceptional opportunity to conduct the allied bombing campaign in strict compliance with the legal duty to take all feasible precautions to avoid civilian harm, we find that the actual conduct of the war fell short of this obligation in several significant respects.',
          lang: 'en',
          cite: {
            source: 'hrw-1991-needless-deaths-in-the-gulf-war-introduction',
            loc: { section: 'Introduction and Summary of Conclusions', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1991/gulfwar/INTRO.htm'
          }
        }
      ]
    },
    {
      id: 'hrw-in-some-instances-the-laws-of-war-were-violated',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In noting these discrepancies between duty and conduct, we do not suggest that the allies in general violated the requirements of the laws of war.',
          lang: 'en',
          cite: {
            source: 'hrw-1991-needless-deaths-in-the-gulf-war-introduction',
            loc: { section: 'Introduction and Summary of Conclusions', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1991/gulfwar/INTRO.htm'
          }
        },
        {
          id: 'q4',
          text: 'The United States also has been disturbingly silent about the steps taken to determine that the Ameriyya shelter was an appropriate target for attack.',
          lang: 'en',
          cite: {
            source: 'hrw-1991-needless-deaths-in-the-gulf-war-introduction',
            loc: { section: 'Introduction and Summary of Conclusions', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1991/gulfwar/INTRO.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
