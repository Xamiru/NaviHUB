import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-fleet-and-the-colonisation-of-australia',
  names: [
    { text: 'First Fleet', lang: 'en', role: 'primary' },
    { text: 'Colonisation of New South Wales', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1787-05-17' },
        cites: [
          {
            source: 'britannica-1911-new-south-wales',
            loc: { section: 'New South Wales', para: '257' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1788-01-20' },
        cites: [
          {
            source: 'britannica-1911-new-south-wales',
            loc: { section: 'New South Wales', para: '257' }
          }
        ]
      }
    ]
  },
  regions: ['oceania'],
  prominence: 3,
  places: [
    {
      ref: 'place:sydney',
      cites: [
        {
          source: 'britannica-1911-new-south-wales',
          loc: { section: 'New South Wales', para: '258' }
        }
      ]
    },
    {
      ref: 'place:botany-bay',
      cites: [
        {
          source: 'britannica-1911-new-south-wales',
          loc: { section: 'New South Wales', para: '257' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'britannica-1911-new-south-wales',
          loc: { section: 'New South Wales', para: '257' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Arthur Phillip',
      role: 'commander',
      cites: [
        {
          source: 'britannica-1911-new-south-wales',
          loc: { section: 'New South Wales', para: '257' }
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
          text: 'The favourable reports made by Captain Cook of the country around Botany Bay induced the British government to found a penal settlement on the south-eastern part of what was then known as New Holland.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-south-wales',
            loc: { section: 'New South Wales', para: '257' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_South_Wales'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The name was given by Captain Cook, in his exploratory voyage in 1770, to the southern portion of the eastern coast of Australia, from some imagined resemblance of its coast-line to that of South Wales.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-south-wales',
            loc: { section: 'New South Wales', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_South_Wales'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The shores of Botany Bay were found to be unsuitable for residence or cultivation, and Captain Phillip transferred the people under his command to Port Jackson, half a dozen miles away, near the site of the present city of Sydney.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-south-wales',
            loc: { section: 'New South Wales', para: '258' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_South_Wales'
          }
        },
        {
          id: 'q5',
          text: 'By the end of the 18th century the inhabitants of Sydney and its neighbourhood numbered 5000.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-new-south-wales',
            loc: { section: 'New South Wales', para: '258' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_South_Wales'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1787-05-17' },
            cites: [
              {
                source: 'britannica-1911-new-south-wales',
                loc: { section: 'New South Wales', para: '257' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'An expedition, consisting of H.M.S. “Sirius” of 20 guns, the armed trader “Supply,” three store-ships and six transports, left England on 17th May 1787, and after touching at Tenerife, Rio de Janeiro, and the Cape of Good Hope, arrived at Botany Bay on the 20th of January 1788, under the command of Captain Arthur Phillip, R.N., with Captain John Hunter, R.N., as second.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-new-south-wales',
          loc: { section: 'New South Wales', para: '257' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/New_South_Wales'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/First_Fleet_entering_Sydney_1788_Bradley.jpg/1280px-First_Fleet_entering_Sydney_1788_Bradley.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:First_Fleet_entering_Sydney_1788_Bradley.jpg',
    credit: { institution: 'State Library of New South Wales', creator: 'William Bradley' },
    license: { id: 'public-domain' }
  }
})
