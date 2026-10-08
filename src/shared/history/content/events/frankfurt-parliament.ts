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
  researched: '2026-10-08',
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
  polities: [
    { ref: 'polity:austrian-empire' },
    { ref: 'polity:kingdom-of-prussia' }
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
          id: 'q3',
          text: 'German nationalists and liberals convened an assembly in Frankfurt in May 1848 that suspended the diet of the German Confederation and took tentative steps toward German unification.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        },
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
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q16',
          text: 'Great hindrances were put in the way of the elections, but, as the Prussian and Austrian governments were too much occupied with their immediate difficulties to resist to the uttermost, the parliament was at last chosen, and met at Frankfort on the 18th May.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-germany-history',
            loc: { section: 'GERMANY: History', para: '225' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
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
        id: 'q17',
        text: 'About 500 representatives accepted the invitation. They constituted themselves a preliminary parliament (Vorparlament), and at once began to provide for the election of a national assembly.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '225' }
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
            value: { d: '1848-06-28' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '72' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '71' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'At last, after a vast amount of tedious and useless discussion, it was agreed that the parliament should appoint an imperial vicar (Reichsverweser) who should carry on the government by means of a ministry selected by himself; and on the motion of Heinrich von Gagern the archduke John of Austria was chosen by a large majority for the office.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '225' }
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
            value: { d: '1848-12-20', notAfter: '1848-12-21' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '133' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '132' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'About the time that the Prussian parliament was thus created, and that the emperor Ferdinand resigned, the Frankfort parliament succeeded in formulating the fundamental laws, which were duly proclaimed to be those of Germany […] as it was now to be constituted.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '230' }
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
            value: { d: '1849-03-28' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '15' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '14' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Nothing came of this suggestion, and in due time the parliament proceeded to the second reading of the constitution. It was revised in a democratic sense, but the imperial title was maintained, and a narrow majority decided that it should be hereditary. Frederick William IV. of Prussia was then chosen emperor.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '231' }
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
            value: { d: '1849-04-28' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '27' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '26' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Frederick William, however, whose instincts were far from democratic, refused “to pick up a crown out of the gutter”; and the deputation which waited upon him was dismissed with the answer that he could not assume the imperial title without the full sanction of the princes and the free cities.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '232' }
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
            value: { d: '1849-05-30' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '44' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '43' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Prussia, which, following the example of Austria, had recalled her representatives from Frankfort, sent her troops to put down these risings, and on the 21st of May 1849 the larger number of the deputies to the parliament voluntarily resigned their seats. A few republican members held on by it, and transferred the sittings to Stuttgart.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '233' }
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
            value: { d: '1849-06-18' },
            cites: [
              {
                source: 'britannica-1911-germany-history',
                loc: { section: 'GERMANY: History', para: '233' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Here they even elected an imperial government, but they had no longer any real influence, and on the 18th of June they were forcibly dispersed by order of the Württemberg ministry.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '233' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/1848_Delius_Abgeordnete_Paulskirche_anagoria.JPG/1280px-1848_Delius_Abgeordnete_Paulskirche_anagoria.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:1848_Delius_Abgeordnete_Paulskirche_anagoria.JPG',
    credit: { institution: 'Deutsches Historisches Museum', creator: 'Gerhard Delius' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'siemann-1985-die-deutsche-revolution-von-1848-49', perspective: 'european' }
  ]
})
