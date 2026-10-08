import { definePerson } from '../../schema'

export default definePerson({
  id: 'pol-pot',
  names: [
    { text: 'Pol Pot', lang: 'en', role: 'primary' },
    {
      text: 'Saloth Sar',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'loc-cambodia-country-study-1987',
          loc: { section: 'Introduction', para: '7' }
        }
      ]
    },
    { text: 'ប៉ុល ពត', lang: 'km', role: 'native', translit: 'Pol Pot' }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1928' },
        cites: [
          {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Khmer Rouge', para: '2' }
          }
        ]
      },
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Khmer Rouge', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'general secretary of the Communist Party of Kampuchea',
      start: {
        alts: [
          {
            value: { d: '1963-02' },
            cites: [
              {
                source: 'loc-cambodia-country-study-1987',
                loc: { section: 'The Khmer Rouge', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1981' },
            cites: [
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '214' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '214' } }
      ]
    },
    {
      title: 'prime minister of Democratic Kampuchea',
      start: {
        alts: [
          {
            value: { d: '1976-05' },
            cites: [
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '214' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-01' },
            cites: [
              { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '214' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '214' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Pol_Pot_in_1978.png',
    page: 'https://commons.wikimedia.org/wiki/File:Pol_Pot_in_1978.png',
    credit: { institution: 'Editura Politică' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Pol Pot (Saloth Sar), General Secretary of the Communist Party of Kampuchea from 1963 until 1981 and Prime Minister of Democratic Kampuchea from May 1976 until January 1979',
          lang: 'en',
          cite: { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '214' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v13/persons'
          }
        },
        {
          id: 'q2',
          text: 'During the early 1960s, however, a group of Paris-trained communist intellectuals, of whom the most important were Saloth Sar (known as Pol Pot after 1976), Khieu Samphan, and Ieng Sary, seized control of the party. They gradually purged or neutralized rivals whom they considered too subservient to Vietnam.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Introduction', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/3.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Pol Pot, who rose to the leadership of the communist movement in the 1960s, was born in 1928 (some sources say in 1925) in Kampong Thum Province, north of Phnom Penh.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Khmer Rouge', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/20.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In February 1963, at the WPK\'s second congress, Pol Pot was chosen to succeed Tou Samouth as the party\'s general secretary.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Khmer Rouge', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/21.htm' }
        },
        {
          id: 'q5',
          text: 'In July 1963, Pol Pot and most of the central committee left Phnom Penh to establish an insurgent base in Rotanokiri (Ratanakiri) Province in the northeast.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Khmer Rouge', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/21.htm' }
        },
        {
          id: 'q6',
          text: 'The Khmer Rouge was determined to turn the country into a nation of peasants in which the corruption and parasitism of city life would be completely uprooted.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Democratic Kampuchea', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Estimates of the number of people who perished under the Khmer Rouge vary tremendously. A figure of three million deaths between 1975 and 1979 was given by the Vietnamese-sponsored Phnom Penh regime, the PRK. Father Ponchaud suggested 2.3 million. Amnesty International estimated 1.4 million dead; the United States Department of State, 1.2 million. Khieu Samphan and Pol Pot, who could be expected to give underestimations, cited figures of 1 million and 800,000, respectively.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Democratic Kampuchea', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/28.htm' }
        }
      ]
    }
  ],
  died: {
    alts: [
      {
        value: { d: '1998-04-15' },
        cites: [
          { source: 'lc-names-n79148414', loc: { section: 'Pol, Pot' } }
        ]
      }
    ]
  }
})
