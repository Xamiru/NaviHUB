import { definePerson } from '../../schema'

export default definePerson({
  id: 'abdollah-behbahani',
  names: [
    { text: 'Abdollah Behbahani', lang: 'en', role: 'primary' },
    { text: 'عبدالله بهبهانی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1840' },
        cites: [
          {
            source: 'iranica-algar-behbahani',
            loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1910' },
        cites: [
          {
            source: 'iranica-algar-behbahani',
            loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '1' }
          }
        ]
      },
      {
        value: { d: '1909' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:najaf',
    cites: [
      {
        source: 'iranica-algar-behbahani',
        loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '1' }
      }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ʿABDALLĀH BEHBAHĀNĪ (1256-1328/1840-1910), theologian (moǰtahed) and a prominent leader of the constitutional movement.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-behbahani',
            loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abdallah-behbahani/'
          }
        },
        {
          id: 'q2',
          text: 'Sayyed ʿAbd-Allāh Behbahānī was an influential mojtahed whose call for political reforms was motivated by expediency, as well as genuine liberal conviction.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q3',
          text: 'Behbahānī entered on a period of even greater influence than before.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-behbahani',
            loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abdallah-behbahani/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Fatal shooting of Sayyed ʿAbd-Allāh Behbahāni, perhaps the strongest pillar of the Constitutionalist Movement.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/AyatFazlollahNouriAndAyatBehbahani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AyatFazlollahNouriAndAyatBehbahani.jpg',
    credit: { institution: 'Internet Archive, Digital Library of India' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'safai-1963-rahbaran-e-mashruteh', perspective: 'iranian' },
    { source: 'malekzadeh-1949-tarikh-e-enqelab-e-mashrutiyat', perspective: 'iranian' }
  ]
})
