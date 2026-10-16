import { definePerson } from '../../schema'

export default definePerson({
  id: 'toqtamish',
  names: [
    { text: 'Toqtamish', lang: 'en', role: 'primary' },
    {
      text: 'Tokhtamysh',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-golden-horde', loc: { section: 'GOLDEN HORDE', para: '1' } }
      ]
    },
    {
      text: 'Toqtamïš',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
      ]
    }
  ],
  researched: '2026-10-16',
  regions: ['russia-central-asia', 'europe'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Khan of the Golden Horde',
      polity: 'polity:golden-horde',
      start: {
        alts: [
          {
            value: { d: '1378' },
            cites: [
              {
                source: 'britannica-1911-golden-horde',
                loc: { section: 'GOLDEN HORDE', para: '1' }
              }
            ]
          },
          {
            value: { d: '1377' },
            cites: [
              { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Peter B. Golden', discipline: 'historian' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1397' },
            cites: [
              { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
            ]
          },
          {
            value: { d: '1395' },
            cites: [
              {
                source: 'britannica-1911-golden-horde',
                loc: { section: 'GOLDEN HORDE', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-golden-horde', loc: { section: 'GOLDEN HORDE', para: '1' } },
        { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Battle_between_Timur_and_Toqtamish_Khan_in_1391._Zafarnama_of_1436_%28Toqtamish_detail%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_between_Timur_and_Toqtamish_Khan_in_1391._Zafarnama_of_1436_(Toqtamish_detail).jpg',
    credit: { creator: '1436 painter' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In about 1378 the khan Toqtamiš (Toqtameš), aided by Timur (Temür, Tamerlane), united the Golden Horde and the White Horde.',
          lang: 'en',
          cite: {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/golden-horde'
          }
        },
        {
          id: 'q2',
          text: 'One of the most formidable of his opponents was Toktamish, who after having been a refugee at the court of Timūr became ruler both of the eastern Kipchak and the Golden Horde, and quarrelled with Timūr over the possession of Khwarizm.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        },
        {
          id: 'q3',
          text: 'But in resentment at Timur’s annexation of Ḵᵛārazm he quarrelled with his benefactor and invaded Azarbaijan (1386).',
          lang: 'en',
          cite: {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/golden-horde'
          }
        }
      ]
    }
  ]
})
