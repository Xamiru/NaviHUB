import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-waterloo',
  names: [
    { text: 'Battle of Waterloo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1815-06-18' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:waterloo',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:hundred-days',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    },
    {
      name: 'Gebhard von Blücher',
      role: 'commander',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The French Revolution and Germany', para: '3' }
        }
      ]
    },
    {
      name: 'Wellington',
      role: 'commander',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Prussian forces under General Gebhard von Blücher were essential to the final victory over Napoleon at the Battle of Waterloo in 1815.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        },
        {
          id: 'q1',
          text: 'After defeating Blücher’s Prussian troops at Ligny on 16 June, he prepared for the decisive battle at Waterloo, south of Brussels. However, a combination of Ney and de Soult’s blunders, Grouchy’s failure to contain Blücher and prevent him from rejoining Wellington, and staunch English and Prussian resistance resulted in Napoleon’s defeat on 18 June.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Refusing to prolong a resistance campaign, as he was advised by a number of his close associates, Napoleon capitulated on 22 June.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Battle_of_Waterloo_1815.PNG/1280px-Battle_of_Waterloo_1815.PNG',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Waterloo_1815.PNG',
    credit: { creator: 'William Sadler' },
    license: { id: 'public-domain' }
  }
})
