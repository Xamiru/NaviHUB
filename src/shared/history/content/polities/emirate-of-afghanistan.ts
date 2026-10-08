import { definePolity } from '../../schema'

export default definePolity({
  id: 'emirate-of-afghanistan',
  names: [
    { text: 'Emirate of Afghanistan', lang: 'en', role: 'primary' },
    { text: 'امارت افغانستان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'emirate',
  start: {
    alts: [
      {
        value: { d: '1826' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Rise of Dost Mohammad', para: '2' }
          }
        ]
      },
      {
        value: { d: '1836' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Third Anglo-Afghan War and Independence', para: '5' }
          }
        ]
      },
      {
        value: { d: '1926-06' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '24' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'russia-central-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Rise of Dost Mohammad', para: '2' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 700, from: 1828 },
    { set: 'world', code: 700, to: 1926.45 }
  ],
  figures: [
    {
      key: 'population',
      value: {
        alts: [
          {
            value: { min: 5000000, qualifier: 'about' },
            cites: [
              {
                source: 'britannica-1911-afghanistan',
                loc: { section: 'AFGHANISTAN', para: '1' }
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Dost_Mohammad_Khan_of_Kabul.png/1280px-Dost_Mohammad_Khan_of_Kabul.png',
    page: 'https://commons.wikimedia.org/wiki/File:Dost_Mohammad_Khan_of_Kabul.png',
    credit: { institution: 'Victoria and Albert Museum', creator: 'Godfrey Vigne' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'AFGHANISTAN, a country of Central Asia.',
          lang: 'en',
          cite: { source: 'britannica-1911-afghanistan', loc: { section: 'AFGHANISTAN', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Afghanistan'
          }
        },
        {
          id: 'q2',
          text: 'The chief importance of Afghanistan in modern days is due to its position as a “buffer state” intervening between the two great empires of Asiatic Russia and British India.',
          lang: 'en',
          cite: { source: 'britannica-1911-afghanistan', loc: { section: 'AFGHANISTAN', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Afghanistan'
          }
        },
        {
          id: 'q3',
          text: 'It was not until 1826 that the energetic Dost Mohammad was able to exert sufficient control over his brothers to take over the throne in Kabul, where he proclaimed himself amir.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Rise of Dost Mohammad', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/12.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In 1252/1836 Dōst Moḥammad officially took the title amīr al-moʾmenīn (commander of the believers), though his predecessors employed the title shah (which was not used again until 1926).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        },
        {
          id: 'q5',
          text: 'Abdur Rahman turned his considerable energies to what evolved into the creation of the modern state of Afghanistan.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Consolidation of the Modern State', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/15.htm' }
        },
        {
          id: 'q6',
          text: 'Hence they were led to sign an armistice and later the Treaty of Rawalpindi (11 Ḏu’l-qaʿda 1337/8 August 1919), which ended their forty year protectorate in Afghanistan.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'In June, 1926, Amānallāh symbolically completed this process by abandoning the less important title of amir for the more prestigious one of shah.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    }
  ]
})
