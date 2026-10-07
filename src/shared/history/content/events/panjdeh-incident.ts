import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'panjdeh-incident',
  names: [
    { text: 'Panjdeh incident', lang: 'en', role: 'primary' },
    {
      text: 'Panǰdeh incident',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
          loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '33' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1885-03-30' },
        cites: [
          {
            source: 'iranica-balland-boundaries-afghanistan',
            loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'south-asia', 'iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:panjdeh',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:russian-conquest-of-central-asia', rel: 'related' },
    { ref: 'event:treaty-of-tehran-1881', rel: 'related' }
  ],
  sides: [
    {
      key: 'russia',
      name: 'Russian',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        }
      ]
    },
    {
      key: 'afghanistan',
      name: 'Afghans',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Major General Sir Peter S. Lumsden',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        }
      ]
    },
    {
      name: 'Lieutenant Colonel J. W. Ridgeway',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '10' }
        }
      ]
    },
    {
      name: 'Colonel P. Kul’berg',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '10' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
          loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '33' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'This task was to be long and slow: It kept the Russian and British chancelleries busy from February, 1882, to January, 1888.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-boundaries-afghanistan',
            loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-iii'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'After the Panǰdeh incident in which a Russian detachment killed hundreds of Afghan soldiers in full view of English observers, and war between Britain and Russia became probable, the British minister in Tehran asked what course Iran would pursue in case of such a war. The Shah replied that Iran could not rely on British friendship, was helpless before Russia, and would not even attempt to resist her any longer',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q2',
          text: 'While the diplomats pursued negotiations on this point, the Russian army hastened to reinforce its local positions under the astonished eyes of the British commissioners, occupying Pol-e Ḵātūn and the Ḏu’l-Feqār pass (445 m), two indispensable crossing points on the steep right bank of the Harīrūd, and capturing the small Panjdeh oasis (now Taḵt-e Bāzār) at the confluence of the Morḡāb and Koškrūd, which the Afghans had held since June, 1884 (30 March 1885).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-boundaries-afghanistan',
            loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-iii'
          }
        },
        {
          id: 'q3',
          text: 'The Russians thus found themselves in a strong position to dictate a frontier considerably farther south than any that had previously been sug­gested.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-boundaries-afghanistan',
            loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-iii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The stabilization in Central Asia after 1885 once again permitted Britain to ignore Iran, leaving the Shah to the predominant influence of Russia.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q6',
          text: 'According to the British members of the commission, the boundary was “only an arbitrary line based on the circumstances of the moment rather than on any permanent and natural basis” and thus could not “be expected to be permanent” (Yate, 1888, pp. 178f.).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-boundaries-afghanistan',
            loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/boundaries-iii'
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
            value: { d: '1884-11' },
            cites: [
              {
                source: 'iranica-balland-boundaries-afghanistan',
                loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In November, 1884, the British half of the commission, under the direction of Major General Sir Peter S. Lumsden, set up headquarters at Kohsān, west of Herat, and began work. But its Russian counterpart did not join it there.',
        lang: 'en',
        cite: {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/boundaries-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-09-10' },
            cites: [
              {
                source: 'iranica-balland-boundaries-afghanistan',
                loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'This was the subject of a protocol signed in London on 10 September 1885.',
        lang: 'en',
        cite: {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/boundaries-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-11-12' },
            cites: [
              {
                source: 'iranica-balland-boundaries-afghanistan',
                loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The first boundary post was set up on 12 November 1885 north of the Ḏu’l-Feqār pass,',
        lang: 'en',
        cite: {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/boundaries-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1887-07-22' },
            cites: [
              {
                source: 'iranica-balland-boundaries-afghanistan',
                loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A new phase of negotiations was opened at St. Petersburg on 23 April 1887, and a compromise agreement was signed the following 22 July: Russia agreed to an Anglo-Afghan proposal that the boundary be fixed on the Amu Darya below Ḵamīāb in exchange for equivalent territory in Bādḡīs (2,136 km2, uninhabited but containing a well).',
        lang: 'en',
        cite: {
          source: 'iranica-balland-boundaries-afghanistan',
          loc: { section: 'BOUNDARIES iii. Boundaries of Afghanistan', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/boundaries-iii'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/William_Barnes_Wollen_-_Russian_encounter_with_the_Afghans_at_Pul-i-Khist%2C_1885.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:William_Barnes_Wollen_-_Russian_encounter_with_the_Afghans_at_Pul-i-Khist,_1885.jpg',
    credit: { creator: 'William Barnes Wollen' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'curzon-russia-in-central-asia-1889',
      mediaKind: 'document',
      title: 'Russia in central Asia in 1889 & the Anglo-Russian question',
      date: { d: '1889' },
      url: 'https://archive.org/download/cu31924027822422/cu31924027822422.pdf',
      page: 'https://archive.org/details/cu31924027822422',
      credit: {
        institution: 'Cornell University Library (Internet Archive)',
        creator: 'George Nathaniel Curzon'
      },
      license: { id: 'public-domain' },
      bytes: 21317718
    }
  ]
})
