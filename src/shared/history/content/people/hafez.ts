import { definePerson } from '../../schema'

export default definePerson({
  id: 'hafez',
  names: [
    { text: 'Hafez', lang: 'en', role: 'primary' },
    { text: 'Hafiz', lang: 'en', role: 'alternative' },
    {
      text: 'Šams-al-Din Moḥammad Širāzi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-khorramshahi-hafez-ii',
          loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '4' }
        }
      ]
    },
    { text: 'حافظ', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1315', approx: true },
        cites: [
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '3' }
          },
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Moḥammad Moʿin', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1317', approx: true },
        cites: [
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Qāsem Ḡani', discipline: 'historian' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1390', approx: true },
        cites: [
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '3' }
          },
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Moḥammad Qazvini', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1389', approx: true },
        cites: [
          {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Moḥammad-Naṣīr Forṣat Širāzi', discipline: 'historian' }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:shiraz',
    cites: [
      {
        source: 'iranica-khorramshahi-hafez-ii',
        loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '7' }
      }
    ]
  },
  diedIn: {
    ref: 'place:shiraz',
    cites: [
      {
        source: 'iranica-khorramshahi-hafez-ii',
        loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '7' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['writer'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ḵᵛāja Šams-al-Din Moḥammad Širāzi (b. Shiraz ca. 715/1315; d. Shiraz ca. 792/1390) is one of the greatest poets of Persia with perhaps a more profound effect on Persian life and culture in general than any other, not excepting such great figures as Ferdowsi, Saʿdi, and Rumi.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        },
        {
          id: 'q2',
          text: 'But in spite of this enormous popularity and influence on Persian culture, details of his life are extremely sketchy, and the brief references in taḏkeras (anthologies with biographical sketches of the poets cited) are often unreliable or even purely fictitious',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Hafez was born in Shiraz and died there.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        },
        {
          id: 'q4',
          text: 'Opinions differ on his date of birth and details of his immediate family and predecessors.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        },
        {
          id: 'q5',
          text: 'The sources are, however, unanimous on his name, Šams-al-Din Moḥammad, and his pen-name, “Hafez,” is generally taken to refer to his knowing the Qurʾān by heart, an intimate familiarity reflected in the frequent echoes and reverberations of Koranic phrases and allusions in his poems.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'Hafez lived in the turbulent intermezzo between Chingiz Khan and Tamerlane.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        },
        {
          id: 'q7',
          text: 'The panegyric lines in the Divān reflect the political instability of the time and chart the ascendancy and decline of such local dynasties as the Inju (Enju; 703-58/1304-57) in Fārs, the Muzaffarids (713-95/1314-93) in Fārs, Kerman and Yazd, and the Jalayerids (736-835/1336-1432) in Iraq, Kurdistan, and Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        },
        {
          id: 'q8',
          text: 'As Ḡani points out, most of Hafez’s life as a poet was spent in the era of Shah Šojāʿ and, according to his calculations, thirty-nine out of a total of seventy allusions to contemporary rulers in Hafez are about this particular ruler',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        },
        {
          id: 'q9',
          text: 'Sol-ṭan Aḥmad was a musician and painter, but his efforts to lure into his service the poet Ḥāfeẓ from Shiraz were unsuccessful.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q10',
          text: 'Among other titles given to him later, the most frequent is lesān-al-ḡayb (the Tongue of the Unseen), although in some early references, this epithet is used to describe the divān rather than the poet himself.',
          lang: 'en',
          cite: {
            source: 'iranica-khorramshahi-hafez-ii',
            loc: { section: 'HAFEZ ii. HAFEZ’S LIFE AND TIMES', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hafez-ii'
          }
        }
      ]
    }
  ]
})
