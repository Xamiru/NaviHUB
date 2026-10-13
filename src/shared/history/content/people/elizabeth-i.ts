import { definePerson } from '../../schema'

export default definePerson({
  id: 'elizabeth-i',
  names: [
    { text: 'Elizabeth I', lang: 'en', role: 'primary' },
    {
      text: 'Elizabeth',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-elizabeth-of-england',
          loc: { section: 'Elizabeth of England', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1533-09-07' },
        cites: [
          {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1603' },
        cites: [
          {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Queen of England and Ireland',
      polity: 'polity:kingdom-of-england',
      start: {
        alts: [
          {
            value: { d: '1558-11-17' },
            cites: [
              {
                source: 'britannica-1911-elizabeth-of-england',
                loc: { section: 'Elizabeth of England', para: '5' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1603' },
            cites: [
              {
                source: 'britannica-1911-elizabeth-of-england',
                loc: { section: 'Elizabeth of England', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-elizabeth-of-england',
          loc: { section: 'Elizabeth of England', para: '1' }
        },
        {
          source: 'britannica-1911-elizabeth-of-england',
          loc: { section: 'Elizabeth of England', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Elizabeth_I_%28Armada_Portrait%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Elizabeth_I_(Armada_Portrait).jpg',
    credit: { creator: 'Formerly attributed to George Gower' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Protestant martyrs and Calais between them removed all the alternatives to an insular national English policy in church and in state; and no sovereign was better qualified to lead such a cause than the queen who ascended the throne amid universal, and the Spaniards thought indecent, rejoicings at Mary’s death on the 17th of November 1558.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        },
        {
          id: 'q2',
          text: 'With the defeat of the Spanish Armada Elizabeth’s work was done, and during the last fifteen years of her reign she got more out of touch with her people.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'With such a mother and with Cranmer as her godfather she represented from her birth the principle of revolt from Rome, but the opponents of that movement attached little importance to her advent into the world.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'She valued uniformity in religion, not as a safeguard against heresy, but as a guarantee of the unity of the state.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        },
        {
          id: 'q5',
          text: 'She alone could have given the Spanish Armada any real chance of success; and as the prospect of invasion loomed larger on the horizon, fiercer grew the popular determination to remove the only possible centre of a domestic rising, without which the external attack was bound to be a failure.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'The loneliness of a queen who had no husband or children and no relatives to mention must at all times have been oppressive; it grew desolating in old age after the deaths of Leicester, Walsingham, Burghley and Essex, and Elizabeth died, the last of her race, on the 24th of March 1603.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        }
      ]
    }
  ]
})
