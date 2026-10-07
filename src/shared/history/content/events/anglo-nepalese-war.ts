import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-nepalese-war',
  names: [
    { text: 'Anglo-Nepalese War', lang: 'en', role: 'primary' },
    { text: 'Gurkha War', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1814-04-22' },
        cites: [
          {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1816' },
        cites: [
          {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:kathmandu',
      cites: [
        {
          source: 'loc-nepal-country-study-1991',
          loc: { section: 'The Enclosing of Nepal', para: '7' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'nepal',
      name: 'Nepal',
      cites: [
        {
          source: 'loc-nepal-country-study-1991',
          loc: { section: 'The Enclosing of Nepal', para: '4' }
        }
      ]
    },
    {
      key: 'company',
      name: 'British East India Company',
      cites: [
        {
          source: 'loc-nepal-country-study-1991',
          loc: { section: 'The Enclosing of Nepal', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Amar Singh Thapa',
      role: 'commander',
      side: 'nepal',
      cites: [
        {
          source: 'loc-nepal-country-study-1991',
          loc: { section: 'The Enclosing of Nepal', para: '6' }
        }
      ]
    },
    {
      name: 'David Ochterlony',
      role: 'commander',
      side: 'company',
      cites: [
        {
          source: 'loc-nepal-country-study-1991',
          loc: { section: 'The Enclosing of Nepal', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The Anglo-Nepalese War (1814-16) was a total disaster for Nepal. According to the Treaty of Sagauli, signed in 1816, Nepal lost Sikkim, the territories west of the Kali River (Kumaon and Garhwal), and most of its lands in the Tarai.',
          lang: 'en',
          cite: {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Just as Nepal had been expanding toward the west throughout the late eighteenth century, so the company had steadily added to its annexed or dependent territories all the way to the Punjab.',
          lang: 'en',
          cite: {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
        },
        {
          id: 'q2',
          text: 'After retreating before a reoccupation by company troops, Nepalese forces counterattacked against police outposts in Butawal, killing eighteen police officers on April 22, 1814. The fragile state of Nepal was at war with the British Empire.',
          lang: 'en',
          cite: {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The initial British campaign was an attack on two fronts.',
          lang: 'en',
          cite: {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
        },
        {
          id: 'q4',
          text: 'Major battles before Makwanpur in late February 1816 resulted in the final defeat of Nepalese forces by early March.',
          lang: 'en',
          cite: {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Nevertheless, the glory days of conquest were over, and Nepal had been squeezed into the boundaries it still had in the early 1990s.',
          lang: 'en',
          cite: {
            source: 'loc-nepal-country-study-1991',
            loc: { section: 'The Enclosing of Nepal', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1815-05-09' },
            cites: [
              {
                source: 'loc-nepal-country-study-1991',
                loc: { section: 'The Enclosing of Nepal', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'One of the western columns failed miserably, but the main force under Ochterlony outmaneuvered the Nepalese army and defeated General Thapa on May 9, 1815, leading to the complete loss of Kumaon by Nepal.',
        lang: 'en',
        cite: {
          source: 'loc-nepal-country-study-1991',
          loc: { section: 'The Enclosing of Nepal', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nepal/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Death_of_Rollo_Gillespie_%28Cassell%27s_illustrated_history_of_India%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Death_of_Rollo_Gillespie_(Cassell%27s_illustrated_history_of_India).png',
    credit: {
      institution: 'Cassell\'s Illustrated History of India, Indian Culture portal',
      creator: 'George Henry Thompson'
    },
    license: { id: 'public-domain' }
  }
})
