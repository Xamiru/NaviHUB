import { definePerson } from '../../schema'

export default definePerson({
  id: 'gawhar-shad',
  names: [
    { text: 'Gawhar Shad', lang: 'en', role: 'primary' },
    {
      text: 'Gowhar-šād Āḡā',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
        }
      ]
    },
    { text: 'گوهرشاد', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1457-07-31' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '5' }
          }
        ]
      },
      {
        value: { d: '1457-07-19' },
        cites: [
          {
            source: 'loc-name-authority-gawharshad',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress Name Authority File' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['other'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/-Court_of_the_mosque_Gawhar_Shad%2C_MESHED%2C_1418_%28%3F%29-_MET_DP202968.jpg/1280px--Court_of_the_mosque_Gawhar_Shad%2C_MESHED%2C_1418_%28%3F%29-_MET_DP202968.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:-Court_of_the_mosque_Gawhar_Shad,_MESHED,_1418_(%3F)-_MET_DP202968.jpg',
    credit: { institution: 'The Metropolitan Museum of Art', creator: 'Luigi Pesce' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'GOWHAR-ŠĀD ĀḠĀ, wife of Sultan Šāhroḵ b. Timur (r. 811-50/1409-47) and daughter of Ḡiāṯ-al-Din Tarḵān, a ranking amir under Timur.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        },
        {
          id: 'q2',
          text: 'Gowhar-šād ranked below Šāhroḵ’s Chinggisid wife, Malekat Āḡā, but was closer to Šāhroḵ and more active politically.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'As a major patron of architecture, she commissioned the building of the shrine mosque in Mašhad (Masjed-e Jameʿ-e Gowhar-šād, comp. 821/1418), supported by a pious foundation (waqf) she established in 829/1426',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        },
        {
          id: 'q4',
          text: 'She also had a madrasa and mosque complex built in Herat from 820/1417 to 841/1437-38; the madrasa became the mausoleum for the line of Šāhroḵ.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        },
        {
          id: 'q6',
          text: 'Although Gowhar-šād was exceptionally powerful, her activities were within Timurid norms.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Except for Dawlatšāh Samarqandi, Timurid historians mention Gowhar-šād with respect and condemn her execution.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        }
      ]
    }
  ]
})
