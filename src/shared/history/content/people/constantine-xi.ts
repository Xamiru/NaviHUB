import { definePerson } from '../../schema'

export default definePerson({
  id: 'constantine-xi',
  names: [
    { text: 'Constantine XI Palaiologos', lang: 'en', role: 'primary' },
    {
      text: 'Constantine XI Palaeologus',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-constantine-xi-palaeologus',
          loc: { section: 'MARC field 100 $d: heading dates' }
        }
      ]
    },
    {
      text: 'Constantine Palaeologus',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
      ]
    },
    { text: 'Κωνσταντῖνος ΙΑʹ Παλαιολόγος', lang: 'el', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1405' },
        cites: [
          {
            source: 'loc-name-authority-constantine-xi-palaeologus',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1453-05-29' },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
          {
            source: 'loc-name-authority-constantine-xi-palaeologus',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Emperor of the Byzantine Empire',
      polity: 'polity:byzantine-empire',
      end: {
        alts: [
          {
            value: { d: '1453-05-29' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
        {
          source: 'britannica-1911-constantinople',
          loc: { section: 'Constantinople', para: '14' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/162_-_Constantine_XI_Palaiologos_%28Mutinensis_-_color%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:162_-_Constantine_XI_Palaiologos_(Mutinensis_-_color).png',
    credit: { institution: 'Estense Digital Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Constantine Palaeologus, the last occupant of the imperial throne, took every measure that the courage of despair could devise for the defence of the doomed city',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q2',
          text: 'The great breach made in the ramparts crossing the valley of the Lycus, the scene of the severest fighting in the siege of 1453, where the Turks stormed the city, and the last Byzantine emperor met his heroic death.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-constantinople',
            loc: { section: 'Constantinople', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constantinople'
          }
        }
      ]
    }
  ]
})
