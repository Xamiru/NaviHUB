import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'gawhar-shad-mosque',
  names: [
    { text: 'Gawhar Shad Mosque', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1418' },
        cites: [
          {
            source: 'iranica-golombek-gowhar-sad-mosque',
            loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '2' }
          },
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-golombek-gowhar-sad-mosque',
          loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-golombek-gowhar-sad-mosque',
          loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:gawhar-shad',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-golombek-gowhar-sad-mosque',
          loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '2' }
        }
      ]
    },
    {
      ref: 'person:baysunghur',
      role: 'participant',
      cites: [
        {
          source: 'iranica-golombek-gowhar-sad-mosque',
          loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '2' }
        }
      ]
    },
    {
      name: 'Qewām-al-Din b. Zayn-al-Din Širāzi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-golombek-gowhar-sad-mosque',
          loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:reign-of-shahrukh-and-herat-as-capital', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Since its construction in the early 15th century, the Gowhar-šād Mosque has served as the Friday mosque for pilgrims to the tomb of Imam ʿAli al-Reżā',
          lang: 'en',
          cite: {
            source: 'iranica-golombek-gowhar-sad-mosque',
            loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-mosque/'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q6',
          text: 'Beneath the qebla ayvān inscription is a panel of mosaic faience naming the architect Qewām-al-Din b. Zayn-al-Din Širāzi al-Ṭayyān, “the plasterer.”',
          lang: 'en',
          cite: {
            source: 'iranica-golombek-gowhar-sad-mosque',
            loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-mosque/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Over the centuries many new buildings were added to the shrine complex, but the Timurid mosque remained the dominant monument and the only place for congregational prayer (PLATE I).',
          lang: 'en',
          cite: {
            source: 'iranica-golombek-gowhar-sad-mosque',
            loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-mosque/'
          }
        },
        {
          id: 'q8',
          text: 'As almost nothing remains of the Herat buildings, the preservation of the Mašhad mosque is critical as an example of Qewām-al-Din’s commissions for the royal family.',
          lang: 'en',
          cite: {
            source: 'iranica-golombek-gowhar-sad-mosque',
            loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-mosque/'
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
            value: { d: '1418' },
            cites: [
              {
                source: 'iranica-golombek-gowhar-sad-mosque',
                loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The lengthy inscription which records the building of the masjed-e jāmeʿ “from her own funds” was written by her calligrapher son Ḡiāṯ-al-Din Bāysonḡor',
        lang: 'en',
        cite: {
          source: 'iranica-golombek-gowhar-sad-mosque',
          loc: { section: 'GOWHAR-ŠĀD MOSQUE', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/gowhar-sad-mosque/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/-Court_of_the_mosque_Gawhar_Shad%2C_MESHED%2C_1418_%28%3F%29-_MET_DP202969.jpg/1280px--Court_of_the_mosque_Gawhar_Shad%2C_MESHED%2C_1418_%28%3F%29-_MET_DP202969.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:-Court_of_the_mosque_Gawhar_Shad,_MESHED,_1418_(%3F)-_MET_DP202969.jpg',
    credit: { institution: 'The Metropolitan Museum of Art', creator: 'Luigi Pesce' },
    license: { id: 'cc0' }
  }
})
