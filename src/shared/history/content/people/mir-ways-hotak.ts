import { definePerson } from '../../schema'

export default definePerson({
  id: 'mir-ways-hotak',
  names: [
    { text: 'Mir Ways Hotak', lang: 'en', role: 'primary' },
    {
      text: 'Mir Wais',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
        }
      ]
    },
    {
      text: 'Mir Waʽiẓ',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1715' },
        cites: [
          { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'M. Jamil Hanifi', discipline: 'historian' },
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1717' },
        cites: [
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  roles: ['military', 'other'],
  offices: [
    {
      title: 'Ruler of Qandahar',
      polity: 'polity:hotaki-dynasty',
      start: {
        alts: [
          {
            value: { d: '1709' },
            cites: [
              { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1715' },
            cites: [
              { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-hanifi-gilzi', loc: { section: 'ḠILZĪ', para: '6' } },
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Mausoleum_of_Mirwais_Hotak%2C_Kandhar.jpg/1280px-Mausoleum_of_Mirwais_Hotak%2C_Kandhar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mausoleum_of_Mirwais_Hotak,_Kandhar.jpg',
    credit: { creator: 'Muhammad Hassan' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The governor appears to have given great offence by the harshness of his proceedings, and a Ghilzai chief named Mir Waʽiẓ, who had complained of his tyranny, was sent a prisoner to Isfahan.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q2',
          text: 'Early in the eighteenth century, one of the Pashtun tribes, the Hotaki, seized Qandahar from the Safavids, and a group of Ghilzai Pashtuns subsequently made greater inroads into Safavid territory.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/10.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Mir Wais’s decision to revolt against the Safavids was a direct outgrowth of the cancellation of his post as supervisor of the eastern caravan trade, ostensibly for his lack of service and dereliction of duty in collecting tolls and taxes.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q4',
          text: 'At Kandahar he planned a conspiracy against the government, slew Gurji Khan and his retinue, seized the city, defeated two Persian armies sent against him, and died a natural death in 1715.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1081' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'The Safavids thought they might use accommodation to soothe the Afghans after Mir Wais’s death in 1129/1717; but they miscalculated, for his son and successor, the firebrand Mahmud, vowed to exact revenge upon the Persians and ignited his fatal rebellion.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1687', approx: true },
        cites: [
          {
            source: 'loc-name-authority-mir-ways-hotak',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  }
})
