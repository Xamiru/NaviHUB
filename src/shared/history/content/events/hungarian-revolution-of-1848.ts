import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hungarian-revolution-of-1848',
  names: [
    { text: 'Hungarian Revolution of 1848', lang: 'en', role: 'primary' },
    {
      text: 'Revolution of March 1848',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1848-03-15' },
        cites: [
          {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1849-08-13' },
        cites: [
          {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '3' }
          },
          { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '66' } },
          { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '65' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:budapest',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:revolutions-of-1848' }
  ],
  sides: [
    {
      key: 'hungary',
      name: 'the Hungarian government',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '2' }
        }
      ]
    },
    {
      key: 'habsburg',
      name: 'the Vienna government',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:lajos-kossuth',
      role: 'leader',
      side: 'hungary',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        }
      ]
    },
    {
      name: 'Count Louis Batthyany',
      role: 'head-of-government',
      side: 'hungary',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        }
      ]
    },
    {
      name: 'Josip Jelacic',
      role: 'commander',
      side: 'habsburg',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '2' }
        }
      ]
    },
    {
      name: 'Franz Joseph',
      role: 'head-of-state',
      side: 'habsburg',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '2' }
        }
      ]
    },
    {
      name: 'Artur Görgey',
      role: 'commander',
      side: 'hungary',
      cites: [
        { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '66' } }
      ]
    },
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      side: 'habsburg',
      cites: [
        { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '40' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In March 1848, revolution erupted in Vienna, forcing Austria\'s Chancellor Klemens von Metternich to flee the capital.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        },
        {
          id: 'q2',
          text: 'Unrest broke out in Hungary on March 15, when radicals and students stormed the Buda fortress to release political prisoners.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        },
        {
          id: 'q3',
          text: 'These so-called April Laws created independent Hungarian ministries of defense and finance, and the new government claimed the right to issue currency through its own central bank.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'The non-Magyar ethnic groups in Hungary feared the nationalism of the new Hungarian government, and Transylvanian Germans and Romanians opposed the incorporation of Transylvania into Hungary.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In December Ferdinand abdicated in favor of Franz Joseph (1848-1916), who claimed more freedom of action because, unlike Ferdinand, he had given no pledge to respect the April Laws.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        },
        {
          id: 'q6',
          text: 'The Hungarian diet deposed the Habsburg Dynasty and declared Hungarian independence.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        },
        {
          id: 'q7',
          text: 'Although Austria could have eventually restored order on its own, the need to deal simultaneously with events in Germany prompted Emperor Franz Joseph to ask for and get Russian military assistance, thus accomplishing his second objective.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'A period of harsh repression followed.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        },
        {
          id: 'q9',
          text: 'Batthyany and about 100 others were shot, several society women were publicly whipped, and the government outlawed public gatherings, theater performances, display of the national colors, and wearing of national costumes and Kossuth-style beards.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        },
        {
          id: 'q10',
          text: 'After the revolution, the emperor revoked Hungary\'s constitution and assumed absolute control.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Aftermath of the Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/22.htm' }
        },
        {
          id: 'q11',
          text: 'A Croat reportedly told a Hungarian: "We received as a reward what the Magyars got as a punishment."',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Aftermath of the Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/22.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1848-03-22' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'The Revolution of March 1848', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'A day later, the Diet\'s liberal-dominated lower house demanded establishment of a national government responsible to an elected parliament, and on March 22 a new national cabinet took power with Count Louis Batthyany as chairman, Kossuth as minister of finance, and Szechenyi as minister of public works.',
        lang: 'en',
        cite: {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-09' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'The Revolution of March 1848', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In September Jelacic led an army into Hungary.',
        lang: 'en',
        cite: {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-04-14' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '23' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '21' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Der ungarische Reichstag erklärt unter Führung des Freiheitskämpfers Lajos Kossuth (1802-1894) die Unabhängigkeit des Königreichs Ungarn von Österreich.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '23' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1849.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-08-13' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'The Revolution of March 1848', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The Hungarian army surrendered on August 13, and Kossuth escaped to the Ottoman Empire.',
        lang: 'en',
        cite: {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-10-06' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '74' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '73' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Hinrichtung von 13 ungarischen Generälen und Offizieren der ungarischen Revolution.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '74' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1849.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Transport_of_the_wounded_honv%C3%A9ds%2C_1848_-_August_von_Pettenkofen.png/1280px-Transport_of_the_wounded_honv%C3%A9ds%2C_1848_-_August_von_Pettenkofen.png',
    page: 'https://commons.wikimedia.org/wiki/File:Transport_of_the_wounded_honv%C3%A9ds,_1848_-_August_von_Pettenkofen.png',
    credit: { institution: 'Hungarian National Museum', creator: 'August von Pettenkofen' },
    license: { id: 'public-domain' }
  }
})
