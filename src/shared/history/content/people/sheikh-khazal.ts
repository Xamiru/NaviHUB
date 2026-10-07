import { definePerson } from '../../schema'

export default definePerson({
  id: 'sheikh-khazal',
  names: [
    { text: 'Sheikh Khazal', lang: 'en', role: 'primary' },
    { text: 'شیخ خزعل', lang: 'fa', role: 'native' },
    {
      text: 'Moʿez-al-Salṭana',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '1' }
          }
        ]
      },
      {
        value: { d: '1860' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1936-05-27' },
        cites: [
          {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '1' }
          },
          {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '38' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:khorramshahr',
    cites: [
      { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '1' } },
      { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '2' } }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '1' } }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['other'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ḴAZʿAL KHAN (Shaikh Ḵazʿal, also known as Moʿez-al-Salṭana, Sardār Aqdas), chieftain of the Banu Kaʿb tribe of Khuzestan (b. Moḥammara, 1861; d. Tehran, 27 May 1936).',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        },
        {
          id: 'q2',
          text: 'As the subsequent developments demonstrated, Britain found in Ḵazʿal a most trustworthy servant in the entire region and the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        },
        {
          id: 'q3',
          text: 'At the time of his coup, Ḵazʿal was at the zenith of his power and was considered the ruler of an independent entity called Arabestan (Khuzestan).',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Ḵazʿal was never allowed to leave Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        },
        {
          id: 'q5',
          text: 'He died on 27 May 1936, and his body was taken to Najaf to be buried next to the holy Shiʿite shrine there.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sheikh_Khazal.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sheikh_Khazal.jpg',
    credit: { institution: 'Tarikh-e Mashruteh (book)' },
    license: { id: 'public-domain' }
  }
})
