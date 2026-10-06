import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kansas-nebraska-act',
  names: [
    { text: 'Kansas-Nebraska Act', lang: 'en', role: 'primary' },
    {
      text: 'An Act to Organize the Territories of Nebraska and Kansas',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'nara-milestone-kansas-nebraska-act',
          loc: { section: 'Kansas-Nebraska Act (1854)', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1854-05-30' },
        cites: [
          {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  participants: [
    {
      name: 'Stephen Douglas',
      role: 'organizer',
      cites: [
        {
          source: 'nara-milestone-kansas-nebraska-act',
          loc: { section: 'Kansas-Nebraska Act (1854)', para: '2' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:john-browns-raid', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Officially titled "An Act to Organize the Territories of Nebraska and Kansas," this act repealed the Missouri Compromise, which had outlawed slavery above the 36º30\' latitude in the Louisiana territories, and reopened the national struggle over slavery in the western territories.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        },
        {
          id: 'q2',
          text: 'In January 1854, Senator Stephen Douglas of Illinois introduced a bill that divided the land immediately west of Missouri into two territories, Kansas and Nebraska. He argued in favor of popular sovereignty, or the idea that the settlers of the new territories should decide if slavery would be legal there.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        },
        {
          id: 'q3',
          text: 'After months of debate, the Kansas-Nebraska Act passed on May 30, 1854.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Anti-slavery supporters were outraged because, under the terms of the Missouri Compromise of 1820, slavery would have been outlawed in both territories since they were both north of the 36º30\' N dividing line between "slave" and "free" states.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Almost immediately, pro-slavery and anti-slavery settlers rushed to Kansas, each side hoping to determine the results of the first election held after the law went into effect. The conflict turned violent, earning the ominous nickname "Bleeding Kansas." The act aggravated the split between North and South on the issue of slavery until reconciliation seemed virtually impossible.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        },
        {
          id: 'q6',
          text: 'Opponents of the Kansas-Nebraska Act helped found the Republican Party, which opposed the spread of slavery into the territories.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        },
        {
          id: 'q7',
          text: 'As a result of the Kansas-Nebraska Act, the United States moved closer to civil war.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-kansas-nebraska-act',
            loc: { section: 'Kansas-Nebraska Act (1854)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/kansas-nebraska-act'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Reynolds%27s_Political_Map_of_the_United_States_1856.jpg/1280px-Reynolds%27s_Political_Map_of_the_United_States_1856.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reynolds%27s_Political_Map_of_the_United_States_1856.jpg',
    credit: { institution: 'Library of Congress', creator: 'Wm. C. Reynolds and J. C. Jones' },
    license: { id: 'public-domain' }
  }
})
