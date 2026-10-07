import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-persian-famine',
  names: [
    { text: 'Great Persian famine', lang: 'en', role: 'primary' },
    {
      text: 'Great Famine',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '17' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'famine',
  start: {
    alts: [
      {
        value: { d: '1869' },
        cites: [
          { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '2' } },
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '17' }
          }
        ]
      },
      {
        value: { d: '1870' },
        cites: [
          { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '1' } },
          { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1872' },
        cites: [
          { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '1' } },
          { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } }
        ]
      },
      {
        value: { d: '1873' },
        cites: [
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '17' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:mashhad',
      cites: [
        { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '10' } }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '8' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'One of the worst developments for Khorasan during the last three decades of Nāṣer-al-Din Shah’s reign was the Great Famine that began 1285/1869 and lasted until 1288/1873. It was so severe that people were reduced to eating grass, animals, and religiously forbidden meats, or even digging up corpses for food (Eʿtemād-al-Salṭana, Matlaʿ, II, p. 377; Majd, 2018, pp. 53-68).',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        },
        {
          id: 'q1',
          text: 'The great famine of 1870-72, the best documented one (Smith, passim; Brittlebank, passim; St. John, pp. 94-98; Bellew, passim, Fasāʾī, pp. 327 sqq.; Eṣfahānī, pp. 281-82; Wazīrī, p. 214), was thus the result of a series of combined climatic catastrophes made worse by poor administration and the human factors previously cited.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'Since 1863-64, and except for 1865-66, rainfall had regularly been below average.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q4',
          text: 'The output of qanats and springs had fallen.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The winter of 1869-70 had once again had very little snow and rain, especially in the low plains of Fārs, where herds of nomads who where there during that season suffered greatly.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q6',
          text: 'During the winter of 1871-72, rains began earlier and were satisfactory. However the winter was rigorous and prolonged. Heavy snowfall broke down lines of communication. Famine killed thousands of people in the highlands.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'In 1871-72, during the nine months from fall to spring, 11,630 corpses were counted being taken out the gates of Zanjān (Bassett, p. 76). This represented without a doubt half of the city’s population.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q8',
          text: 'Mašhad had lost 24,000 people and the surrounding area 100,000 (Smith, p. 361).',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q9',
          text: 'Even if all those figures were exaggerated, the overall conclusion is beyond doubt, and the assertion that the provinces of Isfahan, Yazd, and Mašhad had lost a third of their inhabitants (St. John, p. 98) should be considered plausible.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'The main relief measures were due to Europe and the United States, especially through the intervention of missionaries.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q11',
          text: 'In the region of Isfahan in 1869-72, many fields had been abandoned by the peasants and were added to the crown lands.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        },
        {
          id: 'q12',
          text: 'They can undoubtedly be regarded as one of the principal factors in the population stagnation of Persia during the second half of the 19th century.',
          lang: 'en',
          cite: { source: 'iranica-de-planhol-famines', loc: { section: 'FAMINES', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/famines'
          }
        }
      ]
    }
  ],
  archive: [
    {
      id: 'bellew-indus-to-tigris-1874',
      mediaKind: 'document',
      title: 'From the Indus to the Tigris',
      date: { d: '1874' },
      url: 'https://archive.org/download/fromindustotigr00bellgoog/fromindustotigr00bellgoog.pdf',
      page: 'https://archive.org/details/fromindustotigr00bellgoog',
      credit: { institution: 'Oxford University (Internet Archive)', creator: 'Henry Walter Bellew' },
      license: { id: 'public-domain' },
      bytes: 15243120
    }
  ]
})
