import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mexican-american-war-causes',
  about: ['event:mexican-american-war'],
  topic: 'causes',
  researched: '2026-10-09',
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
      category: 'scholarly',
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
    },
    {
      id: 'invasion-of-american-soil',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'James K. Polk' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Upon the pretext that Texas, a nation as independent as herself, thought proper to unite its destinies with our own she has affected to believe that we have severed her rightful territory, and in official proclamations and manifestoes has repeatedly threatened to make war upon us for the purpose of reconquering Texas. In the meantime we have tried every effort at reconciliation. The cup of forbearance had been exhausted even before the recent information from the frontier of the Del Norte. But now, after reiterated menaces, Mexico has passed the boundary of the United States, has invaded our territory and shed American blood upon the American soil.',
          lang: 'en',
          cite: {
            source: 'polk-1846-05-11-war-message-to-congress',
            loc: { section: 'May 11, 1846: War Message to Congress', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/may-11-1846-war-message-congress'
          }
        },
        {
          id: 'q6',
          text: 'As war exists, and, notwithstanding all our efforts to avoid it, exists by the act of Mexico herself, we are called upon by every consideration of duty and patriotism to vindicate with decision the honor, the rights, and the interests of our country.',
          lang: 'en',
          cite: {
            source: 'polk-1846-05-11-war-message-to-congress',
            loc: { section: 'May 11, 1846: War Message to Congress', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/the-presidency/presidential-speeches/may-11-1846-war-message-congress'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'While Mexico did not follow through with its threat to declare war if the United States annexed Texas, relations between the two nations remained tense due to Mexico’s disputed border with Texas.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q12',
          text: 'Polk dispatched a special envoy, John Slidell, to Mexico City to settle the Texas boundary dispute and to arrange the purchase of California.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/mexico/18.htm' }
        }
      ]
    },
    {
      id: 'insatiable-ambition',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Ramón Alcaraz and the Mexican authors of the Apuntes (1848)'
        }
      ],
      statements: [
        {
          id: 'q7',
          text: 'La ambición de los norte-americanos no se conformaba con esto: quisieron desde un principio estender sus dominios de tal suerte, que quedasen de señores absolutos de casi todo este continente.',
          lang: 'es',
          cite: {
            source: 'alcaraz-1848-apuntes-para-la-historia-de-la-guerra',
            loc: { section: 'Capítulo I. Origen de la guerra' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/apuntesparalahis00alca/apuntesparalahis00alca_djvu.txt'
          },
          translation: {
            text: 'The ambition of the North Americans has not been in conformity with this. They desired from the beginning to extend their dominion in such manner as to become the absolute owners of almost all this continent.',
            lang: 'en',
            cite: {
              source: 'ramsey-1850-the-other-side',
              loc: { section: 'Chapter I. Origin of the War' }
            },
            provenance: {
              via: 'web',
              at: '2026-10-08',
              url: 'https://archive.org/download/the-other-side-or-notes-for-the-history-of-the-war-between-mexico-and-the-united/The%20other%20side%3B%20or%2C%20Notes%20for%20the%20history%20of%20the%20war%20between%20Mexico%20and%20the%20United%20States%20...%20Translated%20from%20the%20Spanish%20with%20notes_djvu.txt'
            }
          }
        },
        {
          id: 'q8',
          text: 'To explain then in a few words the true origin of the war, it is sufficient to say that the insatiable ambition of the United States, favored by our weakness, caused it.',
          lang: 'en',
          cite: {
            source: 'ramsey-1850-the-other-side',
            loc: { section: 'Chapter I. Origin of the War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/the-other-side-or-notes-for-the-history-of-the-war-between-mexico-and-the-united/The%20other%20side%3B%20or%2C%20Notes%20for%20the%20history%20of%20the%20war%20between%20Mexico%20and%20the%20United%20States%20...%20Translated%20from%20the%20Spanish%20with%20notes_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'unjust-war',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Abraham Lincoln', ref: 'person:abraham-lincoln' },
        { kind: 'participant', name: 'Ulysses S. Grant' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'And whereas, This House is desirous to obtain a full knowledge of all the facts which go to establish whether the particular spot on which the blood of our citizens was so shed was or was not at that time our own soil;',
          lang: 'en',
          cite: {
            source: 'lincoln-1847-spot-resolutions',
            loc: { section: '"Spot Resolutions" on Mexican War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/Spot_Resolutions'
          }
        },
        {
          id: 'q10',
          text: 'For myself, I was bitterly opposed to the measure, and to this day regard the war, which resulted, as one of the most unjust ever waged by a stronger against a weaker nation. It was an instance of a republic following the bad example of European monarchies, in not considering justice in their desire to acquire additional territory.',
          lang: 'en',
          cite: { source: 'grant-1885-personal-memoirs-vol-1', loc: { section: 'Chapter III' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gutenberg.org/cache/epub/4367/pg4367.txt'
          }
        }
      ]
    }
  ]
})
