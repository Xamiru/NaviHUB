import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-plassey',
  names: [
    { text: 'Battle of Plassey', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Palashi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Coming of the Europeans', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1757-06-23' },
        cites: [
          { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:plassey',
      cites: [
        { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
      ]
    },
    {
      ref: 'place:bengal',
      cites: [
        { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'company',
      name: 'East India Company',
      cites: [
        { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
      ]
    },
    {
      key: 'nawab',
      name: 'Nawab of Bengal',
      cites: [
        { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Robert Clive',
      role: 'commander',
      side: 'company',
      cites: [
        { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
      ]
    },
    {
      name: 'Siraj-ud-daula',
      role: 'commander',
      side: 'nawab',
      cites: [
        { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'company',
      value: {
        alts: [
          {
            value: { min: 23 },
            cites: [
              { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'company',
      value: {
        alts: [
          {
            value: { min: 49 },
            cites: [
              { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'nawab',
      value: {
        alts: [
          {
            value: { min: 50000 },
            cites: [
              { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:seven-years-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Coming of the Europeans', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The French and the British also backed different factions in the succession struggle for Mughal viceroyalty in Bengal, but Clive intervened successfully and defeated Nawab Siraj-ud-daula in the Battle of Plassey (Palashi, about 150 kilometers north of Calcutta) in 1757.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Coming of the Europeans', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/15.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The British company employed sepoys--European-trained and European-led Indian soldiers--to protect its trade, but local rulers sought their services to settle scores in regional power struggles.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Coming of the Europeans', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/15.htm' }
        },
        {
          id: 'q3',
          text: 'In 1717 the Mughal emperor, Farrukh-siyar (r. 1713-19), gave the British--who by then had already established themselves in the south and the west--a grant of thirty-eight villages near Calcutta, acknowledging their importance to the continuity of international trade in the Bengal economy.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Coming of the Europeans', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/15.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'At a cost of 23 killed and 49 wounded this day’s work decided the fate of Bengal.',
          lang: 'en',
          cite: { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Plassey'
          }
        },
        {
          id: 'q5',
          text: 'Later, Clive defeated the Mughal forces at Buxar (Baksar, west of Patna in Bihar) in 1765, and the Mughal emperor (Shah Alam, r. 1759-1806) conferred on the company administrative rights over Bengal, Bihar, and Orissa, a region of roughly 25 million people with an annual revenue of 40 million rupees (for current value of the rupee--see Glossary).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Coming of the Europeans', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/15.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1757-06-23' },
            cites: [
              { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Clive, with 1100 European and 2100 native soldiers, and 10 field-pieces, took the field against the nawab, who had 50,000 men, 53 heavy guns, and some French artillery under M. de St Frais.',
        lang: 'en',
        cite: { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Plassey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1757-06-23' },
            cites: [
              { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'For a time Clive was hard pressed, but his cool generalship held its own against the undisciplined valour of the enemy, and, noticing Mir Jagar’s division in his rear made no move against him, he led his troops straight against the works.',
        lang: 'en',
        cite: { source: 'britannica-1911-plassey', loc: { section: 'Plassey', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Plassey'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg/1280px-Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg',
    credit: { institution: 'National Portrait Gallery, London', creator: 'Francis Hayman' },
    license: { id: 'public-domain' }
  }
})
