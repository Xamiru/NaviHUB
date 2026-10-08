import { definePerson } from '../../schema'

export default definePerson({
  id: 'cecil-rhodes',
  names: [
    { text: 'Cecil Rhodes', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1853' },
        cites: [
          { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '39' } },
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '20' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1902' },
        cites: [
          { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '39' } },
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '20' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  roles: ['businessperson', 'politician'],
  offices: [
    {
      title: 'Premierminister der britischen Kapkolonie',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1890-07-17' },
            cites: [
              { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '38' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'lemo-chronik-1890', loc: { section: 'Chronik 1890', para: '39' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1890, not many months after the granting of the charter, Mr Rhodes accepted the position of prime minister of the Cape.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rhodes-cecil-john',
            loc: { section: 'RHODES, CECIL JOHN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rhodes,_Cecil_John'
          }
        },
        {
          id: 'q2',
          text: 'Das von der British South Africa Company verwaltet e Matablele und Maschonaland in Südafrika erhält den Namen Rhodesien.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1895.html'
          }
        },
        {
          id: 'q3',
          text: 'Rhodes resigned the premiership of the Cape Colony in disgrace.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/No-nb_bldsa_1c031_-_Rhodes%2C_Cecil_%28John%29_%281853-1902%29.jpg/1280px-No-nb_bldsa_1c031_-_Rhodes%2C_Cecil_%28John%29_%281853-1902%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:No-nb_bldsa_1c031_-_Rhodes,_Cecil_(John)_(1853-1902).jpg',
    credit: { institution: 'National Library of Norway', creator: 'Alexander Bassano' },
    license: { id: 'public-domain' }
  }
})
