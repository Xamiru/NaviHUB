import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'paris-peace-conference',
  names: [
    { text: 'Paris Peace Conference', lang: 'en', role: 'primary' },
    { text: 'Conférence de la paix de Paris', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1919-01-18' },
        cites: [
          {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'Introduction', para: '3' }
          },
          {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1920-01-21' },
        cites: [
          {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'Introduction', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'The Paris Peace Conference', para: '1' }
        }
      ]
    },
    {
      ref: 'place:versailles',
      cites: [
        {
          source: 'state-dept-milestones-paris-peace-conference',
          loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:woodrow-wilson',
      role: 'negotiator',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        },
        {
          source: 'state-dept-milestones-paris-peace-conference',
          loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '1' }
        }
      ]
    },
    {
      ref: 'person:georges-clemenceau',
      role: 'negotiator',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    },
    {
      ref: 'person:david-lloyd-george',
      role: 'negotiator',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    },
    {
      name: 'Vittorio Orlando',
      role: 'negotiator',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    },
    {
      ref: 'person:arthur-balfour',
      role: 'diplomat',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    },
    {
      name: 'Baron Makino Nobuaki',
      role: 'diplomat',
      cites: [
        {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    },
    {
      ref: 'person:t-e-lawrence',
      role: 'participant',
      cites: [
        {
          source: 'eo1418-tell-lawrence',
          loc: { section: 'War’s Aftermath: Sharifian Solution and Obscurity', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'preceded-by' },
    {
      ref: 'event:may-fourth-movement',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '2' }
        }
      ]
    },
    { ref: 'event:egyptian-revolution-of-1919', rel: 'related' },
    { ref: 'event:anglo-persian-agreement-of-1919', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Paris Peace Conference convened in January 1919 at Versailles just outside Paris. The conference was called to establish the terms of the peace after World War I. Though nearly thirty nations participated, the representatives of the United Kingdom, France, the United States, and Italy became known as the “Big Four.” The “Big Four” dominated the proceedings that led to the formulation of the Treaty of Versailles, a treaty that ended World War I.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/paris-peace'
          }
        },
        {
          id: 'q2',
          text: 'After March 1919 this group divided. The Council of Four – Prime Ministers Lloyd George of Britain, Georges Clemenceau (1841-1929) of France, Vittorio Orlando (1860-1952) of Italy and American President Woodrow Wilson (1856-1924) – became the main decision-making body until the German treaty was signed.',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'Introduction', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Germany’s losses amounted to over 6.5 million people and 27,000 square miles of land, (10 percent and 13 percent, respectively, of its pre-war resources).',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        },
        {
          id: 'q4',
          text: 'Under the terms of Article 231 of the Treaty, the Germans accepted responsibility for the war and the liability to pay financial reparations to the Allies.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/paris-peace'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Self-determination had implications far beyond Europe. “What effect,” asked Lansing, “will it have on the Irish, the Indians, the Egyptians and the nationalists among the Boers? Will it not breed discontent, disorder and rebellion?”',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'National Self-Determination', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        },
        {
          id: 'q6',
          text: 'In a final vote on March 19, 1920, the Treaty of Versailles fell short of ratification by seven votes.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference and the Treaty of Versailles', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/paris-peace'
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
            value: { d: '1919-01-18' },
            cites: [
              {
                source: 'eo1418-sharp-paris-peace-conference',
                loc: { section: 'The Paris Peace Conference', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On Saturday, 18 January 1919, Poincaré opened the conference, frustrated that this formal role marked the limit of his involvement. The date marked the anniversary of the German Empire’s proclamation in 1871 in the Hall of Mirrors at Versailles, which Clemenceau reserved for the treaty’s signature.',
        lang: 'en',
        cite: {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'The Paris Peace Conference', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-06-28' },
            cites: [
              {
                source: 'eo1418-sharp-paris-peace-conference',
                loc: { section: 'Introduction', para: '3' }
              },
              {
                source: 'eo1418-ennker-lenin',
                loc: { section: 'Lenin and the Peace Treaties', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On 28 June 1919 Germany signed the Treaty of Versailles, the first and most significant of the five Parisian treaties.',
        lang: 'en',
        cite: {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-09-10' },
            cites: [
              {
                source: 'eo1418-sharp-paris-peace-conference',
                loc: { section: 'Introduction', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'They oversaw the signature of the Treaties of Saint-Germain with Austria on 10 September 1919, and Neuilly with Bulgaria on 27 November 1919.',
        lang: 'en',
        cite: {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-01' },
            cites: [
              {
                source: 'eo1418-sharp-paris-peace-conference',
                loc: { section: 'Introduction', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In January 1920, prompted by Lloyd George’s concern that Clemenceau was exercising too much power, the Paris Conference closed.',
        lang: 'en',
        cite: {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Introduction', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Big-Four-Paris_1919.jpg/1280px-Big-Four-Paris_1919.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Big-Four-Paris_1919.jpg',
    credit: { institution: 'U.S. Army Signal Corps', creator: 'Edward N. Jackson' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'treaty-of-versailles-maps-1919',
      mediaKind: 'image',
      title: 'Treaty of Versailles Maps',
      date: { d: '1919-07-10' },
      url: 'https://archive.org/download/treaty-versailles-maps/Map-No-2-Saar-Basin.jpg',
      page: 'https://archive.org/details/treaty-versailles-maps',
      credit: {
        institution: 'Abilene Christian University Library (Internet Archive)',
        creator: 'United States. Congress. Senate. Committee on Foreign Relations.'
      },
      license: { id: 'public-domain' },
      bytes: 146577930
    }
  ]
})
