import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'rise-of-the-zulu-kingdom',
  names: [
    { text: 'Rise of the Zulu kingdom', lang: 'en', role: 'primary' },
    {
      text: 'Rise of the Zulu State',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1816' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  participants: [
    {
      ref: 'person:shaka',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
        }
      ]
    },
    {
      name: 'Dingiswayo',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
        }
      ]
    },
    {
      name: 'Zwide',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Background to the Mfecane', para: '3' }
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
          text: 'Declining rainfall in the last decades of the eighteenth century, followed by a calamitous ten-year drought that began about 1800, caused massive disruption and suffering.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Background to the Mfecane', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/8.htm' }
        },
        {
          id: 'q2',
          text: 'Both kingdoms became more centralized and militarized, their young men banded together in age regiments that became the basis for standing armies, and their kings became more autocratic as they fought for survival.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Background to the Mfecane', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/8.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Shaka Zulu was born in 1787, the illegitimate son of Senzangakona, chief of the Zulu clan. An outcast as a child, Shaka was brought up among a number of neighboring groups, finally ending with the Mthethwa where he distinguished himself as a skilled warrior in Dingiswayo\'s army. Dingiswayo was so impressed by Shaka that in 1816 he helped him become chief of the Zulu upon the death of Senzangakona.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-africa/9.htm' }
        },
        {
          id: 'q4',
          text: 'Among the Zulu, Shaka consolidated a number of military innovations--some developed by Dingiswayo, some dating back to the eighteenth century--to produce a powerful military machine.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        },
        {
          id: 'q5',
          text: 'Shaka then incorporated the Mthethwa under his rule, and established the Zulu state as the dominant power among the northern Nguni.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'By the mid-1820s, Shaka ruled a kingdom of more than 100,000 people with a standing army of 40,000 men.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1818' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Background to the Mfecane', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The Ndwandwe appeared victorious in 1818 when Dingiswayo was killed and his forces scattered, but they were soon overcome by Shaka, founder of the Zulu state.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Background to the Mfecane', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/8.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/KingShaka.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:KingShaka.jpg',
    credit: { creator: 'James King' },
    license: { id: 'public-domain' }
  }
})
