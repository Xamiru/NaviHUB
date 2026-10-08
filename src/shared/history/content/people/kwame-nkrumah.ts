import { definePerson } from '../../schema'

export default definePerson({
  id: 'kwame-nkrumah',
  names: [
    { text: 'Kwame Nkrumah', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1909' },
        cites: [
          {
            source: 'fordham-internet-african-history-sourcebook',
            loc: { section: 'Internet African History Sourcebook' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1972' },
        cites: [
          {
            source: 'fordham-internet-african-history-sourcebook',
            loc: { section: 'Internet African History Sourcebook' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'prime minister',
      start: {
        alts: [
          {
            value: { d: '1952' },
            cites: [
              {
                source: 'loc-ghana-country-study-1994',
                loc: { section: 'The Politics of the Independence Movements', para: '11' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'The Politics of the Independence Movements', para: '11' }
        },
        {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'INDEPENDENT GHANA', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Bespreking_Nhrumah-Nasser_over_Vietnam_te_Cairo%2C_Bestanddeelnr_918-8345.jpg/1280px-Bespreking_Nhrumah-Nasser_over_Vietnam_te_Cairo%2C_Bestanddeelnr_918-8345.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bespreking_Nhrumah-Nasser_over_Vietnam_te_Cairo,_Bestanddeelnr_918-8345.jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Nkrumah\'s style and the promises he made appealed directly to the majority of workers, farmers, and youths who heard him; he seemed to be the national leader on whom they could focus their hopes.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Nkrumah was born at Nkroful in the Nzema area and educated in Catholic schools at Half Assin and Achimota. He received further training in the United States at Lincoln University and at the University of Pennsylvania.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In 1947 when the UGCC was created in the Gold Coast to oppose colonial rule, Nkrumah was invited from London to become the movement\'s general secretary.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        },
        {
          id: 'q4',
          text: 'The gentlemanly manner in which politics were then conducted was to change after Kwame Nkrumah created his Convention People\'s Party (CPP) in June 1949.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        },
        {
          id: 'q5',
          text: 'In 1952 the position of prime minister was created and the Executive Council became the cabinet. The prime minister was made responsible to the assembly, which duly elected Nkrumah prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        }
      ]
    }
  ]
})
