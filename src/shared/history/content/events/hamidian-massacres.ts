import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hamidian-massacres',
  names: [
    { text: 'Hamidian massacres', lang: 'en', role: 'primary' },
    {
      text: 'massacres of Armenians',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '8' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1894' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          },
          {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1896' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '11' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1897' },
        cites: [
          {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '8' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Boris Adjemian' }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '47' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abdul-hamid-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '8' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 300000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'External Threats and Internal Transformations', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The “Armenian question,” i.e. what would become of the Armenians in the Ottoman Empire, emerged on the international scene in the late 19th century, after the 1877-1878 Russo-Ottoman War and the Congress of Berlin (1878).',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        },
        {
          id: 'q2',
          text: 'The European powers – the United Kingdom and Russia in the lead – demanded reforms in favor of Christian Ottomans, particularly the Armenians.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'Armenian radicals, along with Young Turk and Macedonian revolutionaries, were seen as a serious threat to the sultan’s despotism, and in 1894-1896 massive violence led to the death of hundreds of thousands of Armenians in Anatolia.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'The Background of Ethnic and Religious Minorities', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q3',
          text: 'That was the context in which the first large-scale massacres of Armenians, the precise number of victims of which remains uncertain, took place.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The Sultan of Turkey has sanctioned the principal reforms in the government of the Armenian provinces, for which, in conjunction with the Emperor of Russia and the President of the French Republic, I have felt it my duty to press.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1896-02-11-queens-speech',
            loc: { section: 'HL Deb 11 February 1896 vol 37 cc3-6', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1896/feb/11/the-queens-speech'
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
            value: { d: '1896-08-26' },
            cites: [
              { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '46' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Armenische Revolutionäre überfallen die Ottomanische Bank in Konstantinopel. Die osmanische Regierung reagiert am 29. August mit einem drei Tage andauernden Massaker an der armenischen Bevölkerung Konstantinopels.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '47' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1896.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Armenian_house_after_the_October_30th_massacre%2C_Erzurum%2C_Turkey%2C_1895.jpg/1280px-Armenian_house_after_the_October_30th_massacre%2C_Erzurum%2C_Turkey%2C_1895.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Armenian_house_after_the_October_30th_massacre,_Erzurum,_Turkey,_1895.jpg',
    credit: { institution: 'UCLA Library', creator: 'William Sachtleben' },
    license: { id: 'public-domain' }
  }
})
