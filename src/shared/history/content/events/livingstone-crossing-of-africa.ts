import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'livingstone-crossing-of-africa',
  names: [
    { text: 'Livingstone\'s crossing of Africa', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1852' },
        cites: [
          {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1856-05' },
        cites: [
          {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '37' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 3,
  places: [
    {
      ref: 'place:linyanti',
      cites: [
        {
          source: 'livingstone-online-life-and-expeditions',
          loc: { section: 'Livingstone’s Life & Expeditions', para: '37' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:david-livingstone',
      role: 'leader',
      cites: [
        {
          source: 'livingstone-online-life-and-expeditions',
          loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
        }
      ]
    },
    {
      name: 'Sekeletu',
      role: 'leader',
      cites: [
        {
          source: 'livingstone-online-life-and-expeditions',
          loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
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
          text: 'Livingstone was increasingly entertaining the hope of opening the continent to the outside world, by finding a possible “highway” to the coast (Schapera 1961:131-138). Learning about a major river to the North, the Zambezi, he hoped it might provide a “key to the Interior” (Schapera 1961:139-140; Roberts 2004).',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'It was at this point that Livingstone’s travels started in earnest.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        },
        {
          id: 'q3',
          text: 'This expedition was undertaken in collaboration with the new chief of the Makololo, Sekeletu, the son of Sebituane. He agreed to supply Livingstone with goods in order to pioneer a trade route to Loanda, in Angola, on the west coast.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        },
        {
          id: 'q4',
          text: 'Shortly after embarking, his guides led him to the waterfall known locally in the Lozi language as “Mosi-oa-Tunya,” or “the smoke that thunders,” which he renamed Victoria Falls.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The book was expected to be a sensation and it certainly was: the first impression of 12,000 copies sold out prior to publication in November 1857 and a second impression of 30,000 soon followed.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
          }
        },
        {
          id: 'q6',
          text: 'In March 1858, after fifteen months in Britain, Livingstone again set sail for Africa.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-life-and-expeditions',
            loc: { section: 'Livingstone’s Life & Expeditions', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
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
            value: { d: '1852' },
            cites: [
              {
                source: 'livingstone-online-life-and-expeditions',
                loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1852, he sent his family back to Britain so that he could embark on a serious exploration of the Zambezi.',
        lang: 'en',
        cite: {
          source: 'livingstone-online-life-and-expeditions',
          loc: { section: 'Livingstone’s Life & Expeditions', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-05' },
            cites: [
              {
                source: 'livingstone-online-life-and-expeditions',
                loc: { section: 'Livingstone’s Life & Expeditions', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'With his company of Kololo companions, Livingstone reached Loanda in May 1854 following a difficult journey that cost him all his trade goods.',
        lang: 'en',
        cite: {
          source: 'livingstone-online-life-and-expeditions',
          loc: { section: 'Livingstone’s Life & Expeditions', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1856-03' },
            cites: [
              {
                source: 'livingstone-online-life-and-expeditions',
                loc: { section: 'Livingstone’s Life & Expeditions', para: '37' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In March 1856, he arrived in Tete and proceeded to Quelimane on the Mozambique coast in May.',
        lang: 'en',
        cite: {
          source: 'livingstone-online-life-and-expeditions',
          loc: { section: 'Livingstone’s Life & Expeditions', para: '37' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://livingstoneonline.org/life-and-times/livingstone-s-life-expeditions'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/David_Livingstone_by_Thomas_Annan.jpg/1280px-David_Livingstone_by_Thomas_Annan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:David_Livingstone_by_Thomas_Annan.jpg',
    credit: { institution: 'National Galleries of Scotland', creator: 'Thomas Annan' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'livingstone-1857',
      mediaKind: 'document',
      title: 'Missionary travels and researches in South Africa : including a sketch of sixteen years\' residence in the interior of Africa, and a journey from the Cape of Good Hope to Loanda, on the west coast, thence across the continent, down the river Zambesi, to the eastern ocean',
      date: { d: '1857' },
      url: 'https://archive.org/download/missionarytravel04livi/missionarytravel04livi.pdf',
      page: 'https://archive.org/details/missionarytravel04livi',
      credit: { institution: 'Smithsonian Libraries (Internet Archive)', creator: 'David Livingstone' },
      license: { id: 'public-domain' },
      bytes: 57004973
    }
  ]
})
