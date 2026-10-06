import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mexican-american-war-causes',
  about: ['event:mexican-american-war'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'annexation-and-texan-claim',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Further aggravating the dispute was the fact that the Texans had issued a dubious territorial claim that expanded the republic\'s southern and western boundary from the previously accepted Nueces River to the Río Bravo del Norte.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        },
        {
          id: 'q2',
          text: 'The Mexican president, José Joaquín Herrera, had been willing to recognize an independent Texas but was under intense domestic pressure to reject United States annexation and Texas\'s expanded territorial claim.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        }
      ]
    },
    {
      id: 'polk-expansionism',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In July, 1845, Polk, who had been elected on a platform of expansionism, ordered the commander of the U.S. Army in Texas, Zachary Taylor, to move his forces into the disputed lands that lay between the Nueces and Rio Grande rivers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q4',
          text: 'Following the failure of Slidell’s mission in May 1846, Polk used news of skirmishes inside disputed territory between Mexican troops and Taylor’s army to gain Congressional support for a declaration of war against Mexico.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        }
      ]
    }
  ]
})
