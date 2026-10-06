import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-trafalgar',
  names: [
    { text: 'Battle of Trafalgar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1805-10-21' },
        cites: [
          {
            source: 'fondation-napoleon-close-up-trafalgar',
            loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
          },
          {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:cape-trafalgar' }
  ],
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  sides: [
    {
      key: 'britain',
      name: 'British fleet',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      key: 'france',
      name: 'French',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      key: 'spain',
      name: 'Spanish',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:horatio-nelson',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      name: 'Admiral Villeneuve',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      name: 'Admiral Gravina',
      role: 'commander',
      side: 'spain',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 449 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 1214 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 3499 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 1138 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 2200 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'spain',
      value: {
        alts: [
          {
            value: { min: 1050 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'spain',
      value: {
        alts: [
          {
            value: { min: 1390 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 21 October, 1805, the allied Franco-Spanish fleet under Admiral Villeneuve was ‘annihilated’ by the British fleet under Admiral Nelson.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-close-up-trafalgar',
            loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-trafalgar-21-october-1805/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q2',
          text: 'After four hours of particularly fierce fighting (indeed much fiercer than the British had expected) the French had had 15 ships captured (soon to be twenty), 3,499 killed or drowned, 1,138 wounded and 2,200 prisonniers, the Spanish had 1,050 killed (including the Admiral Gravina, commander of the Spanish Fleet) and 1,390 wounded. The British for their part had only 1,214 wounded and 449 killed, one of which was however Admiral Nelson, commander in chief of the British vessels.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-close-up-trafalgar',
            loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-trafalgar-21-october-1805/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/The_Battle_of_Trafalgar%2C_21_October_1805_RMG_L8148-001.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Battle_of_Trafalgar,_21_October_1805_RMG_L8148-001.jpg',
    title: 'The Battle of Trafalgar, 21 October 1805',
    credit: { institution: 'National Maritime Museum, Greenwich', creator: 'J. M. W. Turner' },
    license: { id: 'public-domain' }
  }
})
