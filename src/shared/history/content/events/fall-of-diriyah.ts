import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-diriyah',
  names: [
    { text: 'Fall of Diriyah', lang: 'en', role: 'primary' },
    { text: 'سقوط الدرعية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1818' },
        cites: [
          {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:diriyah',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Saud Family and Wahhabi Islam', para: '15' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'leader',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Saud Family and Wahhabi Islam', para: '13' }
        }
      ]
    },
    {
      name: 'Ibrahim',
      role: 'commander',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Saud Family and Wahhabi Islam', para: '15' }
        }
      ]
    },
    {
      name: 'Abd Allah ibn Saud ibn Abd al Aziz',
      role: 'leader',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Saud Family and Wahhabi Islam', para: '14' }
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
          text: 'Accordingly, the Ottomans delegated the recapture of the Hijaz to their most ambitious client, Muhammad Ali, the semi-independent commander of their garrison in Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        },
        {
          id: 'q2',
          text: 'Muhammad Ali, in turn, handed the job to his son Tursun, who led a force to the Hijaz in 1816; Muhammad Ali later joined his son to command the force in person.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The Wahhabis made their stand at the traditional Al Saud capital of Ad Diriyah, where they managed to hold out for two years against superior Egyptian forces and weaponry. In the end, however, the Wahhabis proved no match for a modern army, and Ad Diriyah--and Abd Allah with it--fell in 1818.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        },
        {
          id: 'q3',
          text: 'Tursun\'s forces took Mecca and Medina almost immediately.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Saud Family and Wahhabi Islam', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/7.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Following orders from the Ottoman sultan, he sent Abd Allah to Istanbul--where he was publicly beheaded--and forced other members of the family to leave the country.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'Nineteenth-Century Arabia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/8.htm' }
        },
        {
          id: 'q6',
          text: 'They razed its walls and buildings and destroyed its palm groves so that the area could not support any agricultural settlement for some time.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'Nineteenth-Century Arabia', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/8.htm' }
        },
        {
          id: 'q7',
          text: 'The challenge to the sultan had helped end the first Al Saud empire in 1818, so later rulers chose to accommodate the Ottomans as much as they could.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'Nineteenth-Century Arabia', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/8.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Diriyah_Ruins_Near_Riyadh_10_by_Tom_And_Linda_Anderson_3840959304.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Diriyah_Ruins_Near_Riyadh_10_by_Tom_And_Linda_Anderson_3840959304.jpg',
    credit: { institution: 'Saudi Aramco', creator: 'Tom and Linda Anderson' },
    license: { id: 'public-domain' }
  }
})
