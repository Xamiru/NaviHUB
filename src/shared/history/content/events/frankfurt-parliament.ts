import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'frankfurt-parliament',
  names: [
    { text: 'Frankfurt Parliament', lang: 'en', role: 'primary' },
    { text: 'Frankfurter Nationalversammlung', lang: 'de', role: 'native' },
    {
      text: 'National Assembly',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1848-05-18' },
        cites: [
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '54' } },
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '53' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1849-03' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1849-04' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1849-06-18' },
        cites: [
          { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '50' } },
          { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '49' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:frankfurt',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:revolutions-of-1848' }
  ],
  participants: [
    {
      name: 'Frederick William IV',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Revolutionary Rise and Fall', para: '7' }
        },
        { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '15' } }
      ]
    },
    {
      name: 'Erzherzog Johann',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '72' } }
      ]
    },
    {
      name: 'Heinrich von Gagern',
      role: 'leader',
      cites: [
        { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '67' } }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 800, qualifier: 'about' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'The Revolutions of 1848', para: '2' }
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
          text: 'Liberals called for a national convention to draft a constitution for all of Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q2',
          text: 'The National Assembly, consisting of about 800 delegates from throughout Germany, met in a church in Frankfurt, the Paulskirche, from May 1848 to March 1849 for this purpose.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q3',
          text: 'German nationalists and liberals convened an assembly in Frankfurt in May 1848 that suspended the diet of the German Confederation and took tentative steps toward German unification.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Die erste deutsche Nationalversammlung tritt in Frankfurt am Main zusammen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
          }
        },
        {
          id: 'q5',
          text: 'This contradicted an earlier decision of the assembly, so the assembly turned from the grossdeutsch (large German) model of a united Germany that included Austria to the kleindeutsch (small German) model that excluded Austria.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        },
        {
          id: 'q6',
          text: 'The assembly offered a hereditary crown of a united Germany to the Prussian king.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Combined with the withdrawal of the Austrian representatives, his rejection effectively ended the Frankfurt assembly.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        },
        {
          id: 'q8',
          text: 'Thus, the Frankfurt Parliament soon abandoned the republican plan and instead turned to the Prussian king, Frederick-William IV, offering him the crown in order to “guarantee” German independence.',
          lang: 'en',
          cite: {
            source: 'ehne-fogacci-national-construction-and-european-issues',
            loc: { section: 'National Construction and European Issues', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/national-construction-and-european-issues'
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
            value: { d: '1848-03-31', notAfter: '1848-04-03' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '38' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '37' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In Frankfurter Paulskirche tagt das „Vorparlament“.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '38' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-06-28' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '72' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '71' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Die Nationalversammlung wählt mit erheblicher Mehrheit den österreichischen Erzherzog Johann (1782-1859) zum Reichsverweser.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '72' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-12-20', notAfter: '1848-12-21' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '133' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '132' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Die Frankfurter Nationalversammlung verabschiedet das Gesetz über die „Grundrechte des deutschen Volkes“.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '133' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-03-28' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '15' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '14' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Die Frankfurter Nationalversammlung verkündet die Reichsverfassung und wählt den preußischen König Friedrich Wilhelm IV. mit 290 Stimmen - bei 248 Enthaltungen und 20 Gegenstimmen - zum deutschen Kaiser.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '15' } },
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
            value: { d: '1849-04-28' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '27' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '26' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Der preußische König Friedrich Wilhelm IV. erklärt die endgültige Ablehnung der Kaiserwürde.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '27' } },
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
            value: { d: '1849-05-30' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '44' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '43' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Die nach der Abberufung der österreichischen und preußischen Vertreter noch verbliebenen Abgeordneten der Frankfurter Nationalversammlung verlegen ihre Sitzungen nach Stuttgart.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '44' } },
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
            value: { d: '1849-06-18' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '50' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '49' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Die württembergische Regierung unter Ministerpräsident Friedrich von Römer (1794-1864) lässt das in Stuttgart tagende "Rumpfparlament" gewaltsam auflösen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '50' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1849.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/1848_Delius_Abgeordnete_Paulskirche_anagoria.JPG/1280px-1848_Delius_Abgeordnete_Paulskirche_anagoria.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:1848_Delius_Abgeordnete_Paulskirche_anagoria.JPG',
    credit: { institution: 'Deutsches Historisches Museum', creator: 'Gerhard Delius' },
    license: { id: 'public-domain' }
  }
})
