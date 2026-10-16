import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'behzad-and-the-herat-school',
  names: [
    { text: 'Behzad and the Herat school of painting', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1488' },
        cites: [
          {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '1' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:behzad',
      role: 'participant',
      cites: [
        {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '1' }
        }
      ]
    },
    {
      name: 'Rūḥ-Allāh Mīrak Naqqāš',
      role: 'participant',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '13' }
        }
      ]
    },
    {
      name: 'Solṭān-ʿAlī Kāteb',
      role: 'participant',
      cites: [
        {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '9' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:herat-under-sultan-husayn-bayqara', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In Herat, where these art forms had already gained a reputation for excellence, they advanced to unprecedented heights under Sultan Ḥosayn Bāyqarā.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'A personal interest in the arts was not the only motivation for patronage.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q3',
          text: 'In both instances Behzād worked as a subordinate of Rūḥ-Allāh Mīrak Naqqāš, who directed the workshop first of Mīr ʿAlī-Šīr and then of Sultan Ḥosayn.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'The traits of precision in pattern, calligraphy, and design is an important legacy of Behzād’s style and is clearly evident in the work of Šayḵzāda, a painter active in Herat, Tabrīz, and Bukhara during the first half of the 10th/16th century.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        },
        {
          id: 'q5',
          text: 'Paintings signed by or attributed to Behzād were also an important source of inspiration for artists in Mughal India.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
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
            value: { d: '1488', notAfter: '1489' },
            cites: [
              {
                source: 'iranica-soucek-behzad-kamal-al-din',
                loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Two of the paintings are dated to 894/1488-89.',
        lang: 'en',
        cite: {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Behzad_beggar_at_a_mosque.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Behzad_beggar_at_a_mosque.jpg',
    credit: { creator: 'Kamāl ud-Dīn Behzād' },
    license: { id: 'public-domain' }
  }
})
