import { definePerson } from '../../schema'

export default definePerson({
  id: 'khalil-sultan',
  names: [
    { text: 'Khalil Sultan', lang: 'en', role: 'primary' },
    {
      text: 'Khalil Shah',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1409' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Ruler in Samarkand (Transoxania)',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1405' },
            cites: [
              {
                source: 'iranica-courts-and-courtiers-v',
                loc: {
                  section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1409' },
            cites: [
              {
                source: 'iranica-courts-and-courtiers-v',
                loc: {
                  section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
                  para: '6'
                }
              }
            ]
          },
          {
            value: { d: '1408' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-courts-and-courtiers-v',
          loc: {
            section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
            para: '6'
          }
        },
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Khalil_Sultan_enthroned%2C_in_Timurid_genealogy_1405-1409_%28Topkapi_Sarayi_M%C3%BCzesi%2C_H2152%29_f.32a.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Khalil_Sultan_enthroned,_in_Timurid_genealogy_1405-1409_(Topkapi_Sarayi_M%C3%BCzesi,_H2152)_f.32a.jpg',
    credit: { institution: 'Topkapı Palace Museum', creator: '1405–1409 artist' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The third son of Timur, Miran Shah, had ruled over part of Persia in his father’s lifetime; but he was said to be insane, and his incapacity for government had caused the loss of Bagdad and revolt in other provinces. His claim to succession had been put aside by Timur in favour of Pir Mahommed, the son of a deceased son, but Khalil Shah, a son of the discarded prince, won the day. His waste of time and treasure upon fascinating mistress named Shadu ʽl-Mulk, the “delight of the kingdom,” soon brought about his deposition, and in 1408 he gave way to Shah Rukh, who, with the exception of Miran Shah, was the only surviving son of Timur.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q2',
          text: 'In 1409 Khalil Shah died; and the story goes that Shadu ’l-Mulk stabbed herself and was buried with her royal lover at Rai, one of the towns which his grandfather had partly destroyed.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1045' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
