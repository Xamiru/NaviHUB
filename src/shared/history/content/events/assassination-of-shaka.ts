import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-shaka',
  names: [
    { text: 'Assassination of Shaka', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1828' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 3,
  related: [
    { ref: 'event:rise-of-the-zulu-kingdom', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:shaka',
      role: 'victim',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
        }
      ]
    },
    {
      name: 'Dingane',
      role: 'perpetrator',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'By the mid-1820s, Shaka ruled a kingdom of more than 100,000 people with a standing army of 40,000 men.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        },
        {
          id: 'q2',
          text: 'He centralized power in the person of the king and his court, collected tribute from regional chiefs, and placed regiments throughout his state to ensure compliance with his orders.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        },
        {
          id: 'q3',
          text: 'During most of the 1820s, Shaka consolidated his power through a series of wars against neighboring peoples.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Shaka was assassinated at the height of his powers in 1828 and was succeeded by Dingane, his half-brother and one of the assassins.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Dingane was a much less accomplished ruler than the founder of the Zulu state.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        },
        {
          id: 'q6',
          text: 'His weak claim to the throne and his constant fear of assassination made him a despotic ruler.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Isaacs_-_Sjaka%2C_Koning_van_die_Zulu_%281836%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Isaacs_-_Sjaka,_Koning_van_die_Zulu_(1836).png',
    credit: { institution: 'Nathaniel Isaacs, Travels and Adventures in Eastern Africa (1836)' },
    license: { id: 'public-domain' }
  }
})
