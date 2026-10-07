import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sokoto-jihad',
  names: [
    { text: 'Sokoto jihad', lang: 'en', role: 'primary' },
    { text: 'Fulani jihad', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1804' },
        cites: [
          {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    { ref: 'place:sokoto' }
  ],
  participants: [
    {
      ref: 'person:usman-dan-fodio',
      role: 'leader',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
        }
      ]
    },
    {
      name: 'Abd as Salam',
      role: 'participant',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
        }
      ]
    },
    {
      name: 'Al Kanemi',
      role: 'leader',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:sokoto-caliphate',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
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
          text: 'By the late eighteenth century, many Muslim scholars and teachers had become disenchanted with the insecurity that characterized the Hausa states and Borno. Some clerics (mallams) continued to reside at the courts of the Hausa states and Borno, but others, who joined the Qadiriyah brotherhood, began to think about a revolution that would overthrow existing authorities. Prominent among these radical mallams was Usman dan Fodio, who with his brother and son, attracted a following among the clerical class. Many of his supporters were Fulani, and because of his ethnicity he was able to appeal to all Fulani, particularly the clan leaders and wealthy cattle owners whose clients and dependents provided most of the troops in the jihad that began in Gobir in 1804.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/9.htm' }
        },
        {
          id: 'q3',
          text: 'By 1808 the Hausa states had been conquered, although the ruling dynasties retreated to the frontiers and built walled cities that remained independent.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'An analogy has been drawn between Usman dan Fodio\'s jihad and the French Revolution in terms of its widespread impact. Just as the French Revolution affected the course of European history in the nineteenth century, the Sokoto jihad affected the course of history throughout the savanna from Senegal to the Red Sea.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/The_States_of_the_Nigerian_Region_in_the_19th_Century.png/1280px-The_States_of_the_Nigerian_Region_in_the_19th_Century.png',
    page: 'https://commons.wikimedia.org/wiki/File:The_States_of_the_Nigerian_Region_in_the_19th_Century.png',
    credit: { institution: 'United States government' },
    license: { id: 'public-domain' }
  }
})
