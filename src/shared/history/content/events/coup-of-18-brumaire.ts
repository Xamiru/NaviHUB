import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'coup-of-18-brumaire',
  names: [
    { text: 'Coup of 18 Brumaire', lang: 'en', role: 'primary' },
    {
      text: '18 Brumaire',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '97' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1799-11-09' },
        cites: [
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '97' }
          },
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '501' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '97' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:french-revolution' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '96' }
        }
      ]
    },
    {
      name: 'Emmanuel Joseph Sieyès',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '96' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:french-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '1' }
        }
      ]
    },
    {
      ref: 'period:french-consulate',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '97' }
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
          text: 'On the night of the 19th Brumaire a mere ghost of an Assembly abolished the constitution of the year III., ordained the provisionary Consulate, and legalized the coup d’état in favour of Bonaparte.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '448' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q2',
          text: 'On the morning of the 18th Brumaire (November 9) the Ancients, to whom that power belonged, decreed the transference of the councils to St Cloud.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '97' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'With the establishment of the Directory the Revolution might seem closed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '85' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q4',
          text: 'Means were to be taken for removing the councils from Paris to St Cloud, where pressure could more easily be applied.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '96' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Weary of revolution, men sought no more than to be wisely and firmly governed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '97' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q6',
          text: 'This night of Brumaire, however, seemed to be a victory for Sieyès rather than for Bonaparte.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '449' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
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
            value: { d: '1799-11-09' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '97' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '501' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Of the directors, Sieyès and his friend Ducos had arranged to resign; Barras was cajoled and bribed into resigning; Gohier and Moulins, who were intractable, found themselves imprisoned in the Luxemburg palace and helpless.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '97' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1799-11' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '97' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '501' }
              },
              {
                source: 'britannica-1911-france-history',
                loc: { section: 'FRANCE: History', para: '448' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Then the Ancients passed a decree which adjourned the Councils for three months, appointed Bonaparte, Sieyès and Ducos provisional consuls, and named the Legislative Commission.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '97' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Bouchot_-_Le_general_Bonaparte_au_Conseil_des_Cinq-Cents.jpg/1280px-Bouchot_-_Le_general_Bonaparte_au_Conseil_des_Cinq-Cents.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bouchot_-_Le_general_Bonaparte_au_Conseil_des_Cinq-Cents.jpg',
    credit: { institution: 'Histoire par l’image', creator: 'François Bouchot' },
    license: { id: 'public-domain' }
  }
})
