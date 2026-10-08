import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'proclamation-of-victoria-as-empress-of-india',
  names: [
    { text: 'Proclamation of Victoria as Empress of India', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1877-01-01' },
        cites: [
          { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '2' } }
        ]
      }
    ]
  },
  regions: ['south-asia', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:delhi',
      cites: [
        { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '3' } }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:british-raj' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:british-empire' },
    { ref: 'polity:british-raj' }
  ],
  participants: [
    {
      ref: 'person:queen-victoria',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'After the Sepoy Rebellion', para: '1' }
        }
      ]
    },
    {
      ref: 'person:benjamin-disraeli',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '3' } }
      ]
    },
    {
      name: 'Robert Bulwer Earl Lytton',
      role: 'leader',
      cites: [
        { source: 'lemo-chronik-1877', loc: { section: 'Chronik 1877', para: '3' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'In Delhi’s Coronation Park on January 1, 1877, the British monarch Queen Victoria (1837-1901) assumed a new title: Qaisar-i Hind, the Empress of India. Victoria’s proclamation was the central event of the jalsah-i qaisari, a massive imperial assemblage otherwise known in English as the Delhi Durbar.',
          lang: 'en',
          cite: {
            source: 'loc-blog-khatoon-2017-delhi-durbar',
            loc: { section: 'The Delhi Durbar and the Proclamation of Queen Victoria', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://blogs.loc.gov/international-collections/2017/11/the-delhi-durbar-and-the-proclamation-of-queen-victoria/'
          }
        },
        {
          id: 'q7',
          text: 'Although Queen Victoria did not attend the Delhi Durbar of 1877, her proclamation address as India’s new sovereign was read aloud in English and Urdu to this unprecedented gathering of British and Indian subjects. Lord Lytton then explained the gracious intentions of Her Majesty in assuming the new title of Qaisar-i-Hind and asserted its permanency.',
          lang: 'en',
          cite: {
            source: 'loc-blog-khatoon-2017-delhi-durbar',
            loc: { section: 'The Delhi Durbar and the Proclamation of Queen Victoria', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://blogs.loc.gov/international-collections/2017/11/the-delhi-durbar-and-the-proclamation-of-queen-victoria/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the time that the direct Government of my Indian Empire was transferred to the Crown, no formal addition was made to the style and titles of the Sovereign. I have deemed the present a fitting opportunity for supplying this omission, and a Bill upon the subject will be presented to you.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1876-02-08-queens-speech',
            loc: { section: 'HL Deb 08 February 1876 vol 227 cc1-6', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1876/feb/08/the-queens-speech'
          }
        },
        {
          id: 'q4',
          text: 'In proclaiming the new direct-rule policy to "the Princes, Chiefs, and Peoples of India," Queen Victoria (who was given the title Empress of India in 1877) promised equal treatment under British law, but Indian mistrust of British rule had become a legacy of the 1857 rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1876-02-17' },
            cites: [
              {
                source: 'hansard-commons-1876-02-17-royal-titles-bill',
                loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '0' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'I have to ask the House to-night to give me leave to bring in a Bill which will enable Her Majesty to exercise her high prerogative, and to 410 proclaim the addition to her style and title which she deems expedient and proper.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1876-02-17-royal-titles-bill',
          loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/17/leave'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/On_the_Way_to_the_Proclamation%2C_1877.jpg/1280px-On_the_Way_to_the_Proclamation%2C_1877.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:On_the_Way_to_the_Proclamation,_1877.jpg',
    credit: { institution: 'J. Paul Getty Museum', creator: 'Bourne & Shepherd' },
    license: { id: 'cc0' }
  }
})
