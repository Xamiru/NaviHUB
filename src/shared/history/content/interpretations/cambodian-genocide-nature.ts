import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'cambodian-genocide-nature',
  about: ['event:cambodian-genocide'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'The revolution was easily, in proportion to the size of the country\'s population, the bloodiest in modern Asian history.',
    lang: 'en',
    cite: {
      source: 'loc-cambodia-country-study-1987',
      loc: { section: 'Revolutionary Terror', para: '1' }
    },
    provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/28.htm' }
  },
  positions: [
    {
      id: 'democratic-kampuchea-self-description',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Democratic Kampuchea' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Any reactionary religion harming Democratic Kampuchea and her people is strictly prohibited.',
          lang: 'en',
          cite: {
            source: 'dk-1976-constitution',
            loc: { section: 'Constitution of Democratic Kampuchea' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Constitution_of_Democratic_Kampuchea'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'Article 20 of the 1976 Constitution of Democratic Kampuchea guaranteed religious freedom, but it also declared that "all reactionary religions that are detrimental to Democratic Kampuchea and the Kampuchean People are strictly forbidden."',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Society under the Angkar', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/29.htm' }
        }
      ]
    },
    {
      id: 'loc-nation-of-peasants',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Khmer Rouge was determined to turn the country into a nation of peasants in which the corruption and parasitism of city life would be completely uprooted. In addition, Pol Pot wanted to break up the "enemy spy organizations" that allegedly were based in the urban areas.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'DEMOCRATIC KAMPUCHEA, 1975-78', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/27.htm' }
        },
        {
          id: 'q5',
          text: 'According to Pol Pot, five classes existed in prerevolutionary Cambodia -- peasants, workers, bourgeoisie, capitalists, and feudalists.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'Society under the Angkar', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/29.htm' }
        }
      ]
    },
    {
      id: 'eccc-genocide-finding',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Extraordinary Chambers in the Courts of Cambodia' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'KHIEU Samphan (Born 1931) served as President of the State Presidium of Democratic Kampuchea. He was sentenced to life imprisonment for genocide, crimes against humanity and grave breaches of the Geneva Conventions.',
          lang: 'en',
          cite: { source: 'eccc-profile-khieu-samphan', loc: { section: 'Khieu Samphan' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.eccc.gov.kh/en/cases/charged-profile/khieu-samphan'
          }
        },
        {
          id: 'q7',
          text: 'NUON Chea born LAO Kim Lorn (1926-2019), was the Deputy Secretary of the CPK, Chairman of the People’s Representative Assembly, and temporarily served as acting Prime Minister of Democratic Kampuchea. He was sentenced to life imprisonment for genocide, crimes against humanity and grave breaches of the Geneva Conventions.',
          lang: 'en',
          cite: { source: 'eccc-profile-nuon-chea', loc: { section: 'Nuon Chea' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.eccc.gov.kh/en/cases/charged-profile/nuon-chea'
          }
        }
      ]
    },
    {
      id: 'genocide-charge-of-1979',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Moscow also accused Pol Pot\'s Khmer Rouge regime of genocide and implied that China had imposed the regime on Cambodia.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'MAJOR POLITICAL DEVELOPMENTS, 1977-81', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/71.htm' }
        },
        {
          id: 'q9',
          text: 'In August 1979, a Phnom Penh "people\'s revolutionary tribunal" tried Pol Pot and his closest confidant, Foreign Minister Ieng Sary, in absentia, on charges of genocidal crimes and then sentenced them to death.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'MAJOR POLITICAL DEVELOPMENTS, 1977-81', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/71.htm' }
        }
      ]
    },
    {
      id: 'minorities-singled-out',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'The Cham were singled out for particularly brutal repression under the Khmer Rouge regime, and large numbers were killed.',
          lang: 'en',
          cite: {
            source: 'loc-cambodia-country-study-1987',
            loc: { section: 'The Cham', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/cambodia/43.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
