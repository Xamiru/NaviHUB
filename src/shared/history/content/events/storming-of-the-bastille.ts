import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'storming-of-the-bastille',
  names: [
    { text: 'Storming of the Bastille', lang: 'en', role: 'primary' },
    {
      text: 'Fall of the Bastille',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1789-07-14' },
        cites: [
          { source: 'britannica-1911-bastille', loc: { section: 'Bastille', para: '5' } }
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
        { source: 'britannica-1911-bastille', loc: { section: 'Bastille', para: '5' } }
      ]
    }
  ],
  partOf: [
    { ref: 'event:french-revolution' }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Marquis de Lafayette',
      role: 'witness',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '14' }
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
          loc: { section: 'French Revolution, The', para: '13' }
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
          text: 'At the breaking out of the Revolution the Bastille was attacked by the Parisians; and, after a vigorous resistance, it was taken and razed to the ground on the 14th of July 1789.',
          lang: 'en',
          cite: { source: 'britannica-1911-bastille', loc: { section: 'Bastille', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bastille'
          }
        },
        {
          id: 'q2',
          text: 'The capture of the Bastille was hailed throughout Europe as symbolizing the fall of absolute monarchy, and the victory of the insurgents had momentous consequences.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '13' }
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
          text: 'Having failed in their first attempt on the Assembly, the Court party resolved to try what force could do.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q4',
          text: 'The king replied that the troops were not meant to act against the Assembly, but intimated his purpose of transferring the session to some provincial town. On the same day he dismissed Necker and ordered him to quit Versailles.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '8' }
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
          text: 'The insurrection of July really ended the ancien régime.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q6',
          text: 'On the 17th Louis himself visited Paris and gave his sanction to the new authorities.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
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
            value: { d: '1789-07-12' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '9' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On the 12th of July Camille Desmoulins announced the dismissal of Necker to the crowd in the Palais Royal.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '9' }
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
            value: { d: '1789-07-14' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'With the same object they assailed the Bastille. The garrison was small and disheartened, provisions were short, and after some hours’ fighting De Launay the governor surrendered on promise of quarter.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '12' }
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
            value: { d: '1789-07-15' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'As all Paris was in the hands of the insurgents, the king saw the necessity of submission. On the morning of the 15th he entered the hall of the Assembly to announce that the troops would be withdrawn.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '12' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Siege_of_the_Bastille_%28Claude_Cholat%29.jpg/1280px-Siege_of_the_Bastille_%28Claude_Cholat%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Siege_of_the_Bastille_(Claude_Cholat).jpg',
    credit: { institution: 'Musée Carnavalet', creator: 'Claude Cholat' },
    license: { id: 'public-domain' }
  }
})
