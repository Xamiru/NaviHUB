import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'austro-prussian-war',
  names: [
    { text: 'Austro-Prussian War', lang: 'en', role: 'primary' },
    {
      text: 'Seven Weeks\' War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    },
    {
      text: 'Deutscher Krieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1866-06-21' },
        cites: [
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '27' } },
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1866-08-23' },
        cites: [
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '50' } },
          { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '51' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:hradec-kralove',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'prussia',
      name: 'Prussia',
      polity: 'polity:kingdom-of-prussia',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    },
    {
      key: 'austria',
      name: 'Austria',
      polity: 'polity:austrian-empire',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    },
    {
      key: 'italy',
      name: 'Italy',
      polity: 'polity:kingdom-of-italy',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:otto-von-bismarck',
      role: 'head-of-government',
      side: 'prussia',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '3' }
        }
      ]
    },
    {
      name: 'Helmuth Graf von Moltke',
      role: 'commander',
      side: 'prussia',
      cites: [
        { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
      ]
    },
    {
      ref: 'person:franz-joseph-i',
      role: 'head-of-state',
      side: 'austria',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Loss of Leadership in Germany', para: '1' }
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
          text: 'Against expectations, Prussia quickly won the Seven Weeks\' War (also known as the Austro-Prussian War) against Austria and its south German allies.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'Although Austria tried to keep Italy out of the war through a last-minute offer to surrender Venetia to it, Italy joined the war with Prussia.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q3',
          text: 'Austria won key victories over Italy but lost the decisive Battle of Königgrätz (Hradec Králové in the presentday Czech Republic) to Prussia in July 1866.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q4',
          text: 'Luck had played a part in the decisive victory at the Battle of Königgrätz (Hradec Králóve in the present-day Czech Republic); otherwise, the war might have lasted much longer than it did.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Defeated, Austria agreed to the dissolution of the German Confederation and accepted the formation of a Prussian-dominated North German Confederation, which became the basis of the German Empire in 1871.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q6',
          text: 'The province of Venetia, Austria\'s last Italian possession, was transferred to Italy.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q7',
          text: 'But he dealt harshly with the other German states that had resisted Prussia and expanded Prussian territory by annexing Hanover, Schleswig-Holstein, some smaller states, and the city of Frankfurt.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q8',
          text: 'Austria was excluded from Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1866-06-20' },
            cites: [
              { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1574' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The outbreak of war was postponed by further diplomatic complications. On the 12th of June Napoleon, whose policy throughout had been obscure and contradictory, signed a secret treaty with Austria, under which Venice was to be handed over to him, to be given to Italy in the event of her making a separate peace. La Marmora, however, who believed himself bound in honour to Prussia, refused to enter into a separate arrangement. On the 16th the Prussians began hostilities, and on the 20th Italy declared war.',
        lang: 'en',
        cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1574' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-06-21' },
            cites: [
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '27' } },
              { source: 'lemo-chronik-1866', loc: { section: 'Chronik 1866', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The Prussian delegate at once withdrew from the diet, and on the following day (June 15) the Prussian troops advanced over the Saxon frontier.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '260' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-07-03' },
            cites: [
              {
                source: 'britannica-1911-germany-history',
                loc: { section: 'GERMANY: History', para: '261' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The war that followed, conveniently called the Seven Weeks\' War (q.v.), culminated before a month had passed, on the 3rd […] of July, in the crushing Prussian victory of Königgrätz.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '261' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-08-23' },
            cites: [
              {
                source: 'britannica-1911-germany-history',
                loc: { section: 'GERMANY: History', para: '261' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'by Article II. Austria consented to “a new organization of Germany without the participation of the empire of Austria,” […] These Articles, enmbodying the more important terms, were included with slight verbal alterations in the treaty of peace signed at Prague on the 23rd of August.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '261' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Georg_Bleibtreu_-_Die_Schlacht_von_K%C3%B6niggr%C3%A4tz_am_3._Juli_1866.jpg/1280px-Georg_Bleibtreu_-_Die_Schlacht_von_K%C3%B6niggr%C3%A4tz_am_3._Juli_1866.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Georg_Bleibtreu_-_Die_Schlacht_von_K%C3%B6niggr%C3%A4tz_am_3._Juli_1866.jpg',
    credit: { creator: 'Georg Bleibtreu' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'friedjung-1916-der-kampf-um-die-vorherrschaft', perspective: 'european' }
  ]
})
