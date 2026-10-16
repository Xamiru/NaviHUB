import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'western-schism',
  names: [
    { text: 'Western Schism', lang: 'en', role: 'primary' },
    {
      text: 'Great Western Schism',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-subject-great-western-schism',
          loc: { section: 'MARC field 450: variant headings' }
        }
      ]
    },
    {
      text: 'Great Schism of the West',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-schism', loc: { section: 'Schism', para: '1' } }
      ]
    },
    {
      text: 'Papal Schism',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-subject-great-western-schism',
          loc: { section: 'MARC field 450: variant headings' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1378' },
        cites: [
          { source: 'britannica-1911-schism', loc: { section: 'Schism', para: '1' } },
          {
            source: 'loc-subject-great-western-schism',
            loc: { section: 'MARC field 150: heading' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1417' },
        cites: [
          { source: 'britannica-1911-schism', loc: { section: 'Schism', para: '1' } },
          {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '5' }
          },
          {
            source: 'loc-subject-great-western-schism',
            loc: { section: 'MARC field 150: heading' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:constance',
      cites: [
        {
          source: 'britannica-1911-constance-council-of',
          loc: { section: 'Constance, Council of', para: '1' }
        }
      ]
    },
    {
      ref: 'place:avignon',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '4' }
        }
      ]
    },
    {
      ref: 'place:rome',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'rome',
      name: 'Roman line of popes',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '9' }
        }
      ]
    },
    {
      key: 'avignon',
      name: 'Popes of Avignon',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Urban VI',
      role: 'leader',
      side: 'rome',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '2' }
        }
      ]
    },
    {
      name: 'Clement VII',
      role: 'leader',
      side: 'avignon',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '3' }
        }
      ]
    },
    {
      name: 'Martin V',
      role: 'leader',
      cites: [
        {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '5' }
        }
      ]
    },
    {
      name: 'Sigismund',
      role: 'organizer',
      cites: [
        {
          source: 'britannica-1911-constance-council-of',
          loc: { section: 'Constance, Council of', para: '4' }
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
          text: 'The Western Schism was only a temporary misunderstanding, even though it compelled the Church for forty years to seek its true head; it was fed by politics and passions, and was terminated by the assembling of the councils of Pisa and Constance.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        },
        {
          id: 'q2',
          text: 'By the election of Martin V as Pope (11 Nov 1417), the Council of Constance ended the Great Schism but it did not have time to reform.',
          lang: 'en',
          cite: {
            source: 'fordham-council-of-constance-sacrosancta-1415',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/constance1.asp'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Pope Gregory XI had left Avignon to return to Italy and had re-established the pontifical see in the Eternal City, where he died on 27 March, 1378.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        },
        {
          id: 'q4',
          text: 'During the following days all the members of the Sacred College offered their respectful homage to the new pope, who had taken the name of Urban VI, and asked of him countless favours.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        },
        {
          id: 'q5',
          text: 'Unfortunately Pope Urban did not realize the hopes to which his election had given rise.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        },
        {
          id: 'q6',
          text: 'Clement VII was related to or allied with the principal royal families of Europe; he was influential, intellectual, and skilful in politics.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'After many conferences, projects, discussions (oftentimes violent), interventions of the civil powers, catastrophes of all kinds, the Council of Constance (1414) deposed the suspicious John XXIII, received the abdication of the gentle and timid Gregory XII, and finally dismissed the obstinate Benedict XIII.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        },
        {
          id: 'q8',
          text: 'Pope Gregory XII. was next required to renounce his rights, and this he did, with as much independence as dignity, through a legate, who previously convoked the council in the name of his master, and thus in some sort gave it the necessary confirmed authority.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-constance-council-of',
            loc: { section: 'Constance, Council of', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constance%2C_Council_of'
          }
        },
        {
          id: 'q9',
          text: 'All that remained was to obtain the abdication of Benedict XIII., the successor of the Avignon pope Clement VII., but the combined efforts of the council and the emperor were powerless to overcome the obstinacy of the Aragonese pope.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-constance-council-of',
            loc: { section: 'Constance, Council of', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constance%2C_Council_of'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The general reform on which the council had failed to come to an understanding had to be adjourned, and the council contented itself with promulgating, on the 9th of October 1417, the only reforming decrees on which an agreement could be reached.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-constance-council-of',
            loc: { section: 'Constance, Council of', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constance%2C_Council_of'
          }
        },
        {
          id: 'q11',
          text: 'To conform to the decrees of the council, the new pope drew up a project of reform with the concurrence of the fathers still remaining at Constance, and subsequently made various reforming treaties or concordats with the nations of the council, which finally broke up after the 45th session, held on the 22nd of April 1418.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-constance-council-of',
            loc: { section: 'Constance, Council of', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constance%2C_Council_of'
          }
        },
        {
          id: 'q12',
          text: 'The theologians, canonists, princes, and faithful of the fourteenth century felt so intensely and maintained so vigorously that this character of unity was essential to the true Church of Jesus Christ, that at Constance solicitude for unity took precedence of that for reform.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-western-schism',
            loc: { section: 'Western Schism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q13',
          text: 'In the name of the Holy and indivisible Trinity; of the Father, Son, and Holy Ghost. Amen. This holy synod of Constance, forming a general council for the extirpation of the present schism and the union and reformation, in head and members, of the Church of God, legitimately assembled in the Holy Ghost, to the praise of Omnipotent God, in order that it may the more easily, safely, effectively and freely bring about the union and reformation of the church of God, hereby determines, decrees, ordains and declares what follows',
          lang: 'en',
          cite: {
            source: 'council-of-constance-1415-decree-sacrosancta',
            loc: { section: 'Decree Sacrosancta' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/constance1.asp'
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
            value: { d: '1378-09-20' },
            cites: [
              {
                source: 'catholic-encyclopedia-western-schism',
                loc: { section: 'Western Schism', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 20 September thirteen members of the Sacred College precipitated matters by going into conclave at Fondi and choosing as pope Robert of Geneva, who took the name of Clement VII.',
        lang: 'en',
        cite: {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1409' },
            cites: [
              {
                source: 'catholic-encyclopedia-western-schism',
                loc: { section: 'Western Schism', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The council which assembled a Pisa added a third claimant to the papal throne instead of two (1409).',
        lang: 'en',
        cite: {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1417-07-26' },
            cites: [
              {
                source: 'britannica-1911-constance-council-of',
                loc: { section: 'Constance, Council of', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'At the council proceedings were instituted against him, which ended at last on the 26th of July 1417 in his deposition.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-constance-council-of',
          loc: { section: 'Constance, Council of', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constance%2C_Council_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1417-11-11' },
            cites: [
              {
                source: 'catholic-encyclopedia-western-schism',
                loc: { section: 'Western Schism', para: '5' }
              },
              {
                source: 'britannica-1911-constance-council-of',
                loc: { section: 'Constance, Council of', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On 11 November, 1417, the assembly elected Odo Colonna, who took the name of Martin V.',
        lang: 'en',
        cite: {
          source: 'catholic-encyclopedia-western-schism',
          loc: { section: 'Western Schism', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.newadvent.org/cathen/13539a.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Papstwahl_Konstanzer_Konzil_1417.jpeg/1280px-Papstwahl_Konstanzer_Konzil_1417.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Papstwahl_Konstanzer_Konzil_1417.jpeg',
    credit: { creator: 'Ulrich Richental' },
    license: { id: 'public-domain' }
  }
})
