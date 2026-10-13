import { definePerson } from '../../schema'

export default definePerson({
  id: 'tokugawa-ieyasu',
  names: [
    { text: 'Tokugawa Ieyasu', lang: 'en', role: 'primary' },
    { text: '徳川家康', lang: 'ja', role: 'native' },
    {
      text: 'Iyéyasu Tokugawa',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1542' },
        cites: [
          { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1616' },
        cites: [
          { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'Shogun',
      polity: 'polity:tokugawa-shogunate',
      start: {
        alts: [
          {
            value: { d: '1603' },
            cites: [
              { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1605' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Tokugawa Period', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } },
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Tokugawa_Ieyasu.jpg/1280px-Tokugawa_Ieyasu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tokugawa_Ieyasu.jpg',
    credit: { creator: 'Kanō Tan\'yū (attributed)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Instrumental in the rise of the new bakufu was Tokugawa Ieyasu, the main beneficiary of the achievements of Nobunaga and Hideyoshi.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q2',
          text: 'The founder of this dynasty was Iyéyasu Tokugawa (1542–1616), a great general and consummate politician, who was connected by descent with the Minamoto clan.',
          lang: 'en',
          cite: { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tokugawa'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Already powerful, Ieyasu profited by his transfer to the rich Kanto area.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q4',
          text: 'Ieyasu\'s victory over the western daimyo at the Battle of Sekigahara (1600) gave him virtual control of all Japan.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q5',
          text: 'After further strengthening his power base, Ieyasu was confident enough to install his son Hidetada (1579-1632) as shogun and himself as retired shogun in 1605.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q6',
          text: 'Like Hideyoshi, Ieyasu encouraged foreign trade but also was suspicious of outsiders.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Seclusion and Social Control', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/20.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The Tokugawa (or Edo) period brought 200 years of stability to Japan.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        }
      ]
    }
  ]
})
