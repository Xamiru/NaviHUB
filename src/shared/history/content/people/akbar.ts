import { definePerson } from '../../schema'

export default definePerson({
  id: 'akbar',
  names: [
    { text: 'Akbar', lang: 'en', role: 'primary' },
    { text: 'جلال‌الدین محمد اکبر', lang: 'fa', role: 'native' },
    {
      text: 'Jalal-ud-Din Akbar',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-india-country-study-1995', loc: { section: 'The Mughals', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1542-10-14' },
        cites: [
          {
            source: 'britannica-1911-akbar-jellaladin-mahommed',
            loc: { section: 'Akbar, Jellaladin Mahommed', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1605-10-15' },
        cites: [
          {
            source: 'britannica-1911-akbar-jellaladin-mahommed',
            loc: { section: 'Akbar, Jellaladin Mahommed', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Mughal emperor',
      polity: 'polity:mughal-empire',
      start: {
        alts: [
          {
            value: { d: '1556' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'The Mughals', para: '3' }
              }
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
                source: 'loc-india-country-study-1995',
                loc: { section: 'The Mughals', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'loc-india-country-study-1995', loc: { section: 'The Mughals', para: '3' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Akbar.jpg/1280px-Akbar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Akbar.jpg',
    credit: { creator: 'Unknown' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Humayun\'s untimely death in 1556 left the task of further imperial conquest and consolidation to his thirteen-year-old son, Jalal-ud-Din Akbar (r. 1556-1605).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q2',
          text: 'A "workaholic" who seldom slept more than three hours a night, he personally oversaw the implementation of his administrative policies, which were to form the backbone of the Mughal Empire for more than 200 years.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Akbar built a walled capital called Fatehpur Sikri (Fatehpur means Fortress of Victory) near Agra, starting in 1571.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q4',
          text: 'Akbar adopted two distinct but effective approaches in administering a large territory and incorporating various ethnic groups into the service of his realm.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q5',
          text: 'An astute ruler who genuinely appreciated the challenges of administering so vast an empire, Akbar introduced a policy of reconciliation and assimilation of Hindus (including Maryam al-Zamani, the Hindu Rajput mother of his son and heir, Jahangir), who represented the majority of the population.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q6',
          text: 'He recruited and rewarded Hindu chiefs with the highest ranks in government; encouraged intermarriages between Mughal and Rajput aristocracy; allowed new temples to be built; personally participated in celebrating Hindu festivals such as Dipavali, or Diwali, the festival of lights; and abolished the jizya (poll tax) imposed on non-Muslims.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'These calamities were keenly felt by Akbar, and may even have tended to hasten his death, which occurred at Agra on the 15th of October 1605.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-akbar-jellaladin-mahommed',
            loc: { section: 'Akbar, Jellaladin Mahommed', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Akbar,_Jellaladin_Mahommed'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'By the end of Akbar\'s reign, the Mughal Empire extended throughout most of India north of the Godavari River.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        }
      ]
    }
  ]
})
