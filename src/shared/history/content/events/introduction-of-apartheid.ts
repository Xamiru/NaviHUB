import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'introduction-of-apartheid',
  names: [
    { text: 'Introduction of apartheid', lang: 'en', role: 'primary' },
    { text: 'apartheid', lang: 'af', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1948' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The 1948 Election', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    { ref: 'place:pretoria' }
  ],
  participants: [
    {
      name: 'D. F. Malan',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'The 1948 Election', para: '3' }
        }
      ]
    },
    {
      name: 'Hendrik F. Verwoerd',
      role: 'ideologue',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Legislative Implementation of Apartheid', para: '13' }
        }
      ]
    },
    {
      ref: 'person:nelson-mandela',
      role: 'leader',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:sharpeville-massacre',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Running on this platform of apartheid, as it was termed for the first time, Malan and the HNP, benefiting from the weight given to rural electorates, defeated Smuts and the United Party. The HNP won a majority of the seats contested but only a minority of the votes cast. The HNP became the government and, renamed the National Party (NP), ruled South Africa until 1994.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The 1948 Election', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/24.htm' }
        },
        {
          id: 'q2',
          text: 'Malan and the National Party, fearing that they might lose office in the next election, immediately set about introducing laws to give apartheid a legislative reality that could not easily be overturned. Such laws aimed at separating whites and blacks, at instituting as a legal principle the theory that whites should be treated more favorably than blacks and that separate facilities need not be equal, and at providing the state with the powers deemed necessary to deal with any opposition.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Legislative Implementation of Apartheid', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The HNP\'s platform, based on a report by Paul Sauer, argued to the contrary, that only total separation of the races would prevent a move toward equality and the eventual overwhelming of white society by black.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The 1948 Election', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/24.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Population Registration Act (No. 30) of 1950 provided the basis for separating the population of South Africa into different races.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Legislative Implementation of Apartheid', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
        },
        {
          id: 'q5',
          text: 'The Group Areas Act (No. 41) of 1950 extended the provisions of the Natives Land Act (No. 27) of 1913, and later laws divided South Africa into separate areas for whites and blacks (including coloureds), and gave the government the power to forcibly remove people from areas not designated for their particular racial group.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Legislative Implementation of Apartheid', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
        },
        {
          id: 'q6',
          text: 'The Reservation of Separate Amenities Act (No. 49) of 1953 stated that all races should have separate amenities--such as toilets, parks, and beaches--and that these need not be of an equivalent quality. Under the provisions of this act, apartheid signs were erected throughout South Africa.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Legislative Implementation of Apartheid', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
        },
        {
          id: 'q7',
          text: 'The Bantu Education Act (No. 47) of 1953 decreed that blacks should be provided with separate educational facilities under the control of the Ministry of Native Affairs, rather than the Ministry of Education.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Legislative Implementation of Apartheid', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
        },
        {
          id: 'q8',
          text: 'During the 1950s, enforcement of these various laws resulted in approximately 500,000 pass-law arrests annually, in the listing of more than 600 inhabitants as communists, in the banning of nearly 350 inhabitants, and in the banishment of more than 150 other inhabitants.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Legislative Implementation of Apartheid', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The ANC\'s new leaders formed a Joint Planning Council with leaders of the South African Indian Congress (SAIC) (unlike Lembede, the Mandela, Sisulu, and Tambo team believed strongly in working with other groups) and in February 1952 called on the government to repeal all unjust laws or face a Defiance Campaign starting on April 6',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Black Resistance in the 1950s', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
        },
        {
          id: 'q10',
          text: 'The charter emphasized that South Africa should be a nonracial society with no particular group assumed to have special rights or privileges.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Black Resistance in the 1950s', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1949' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Legislative Implementation of Apartheid', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Prohibition of Mixed Marriages Act (No. 55) of 1949 made marriages between whites and members of other racial groups illegal.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Legislative Implementation of Apartheid', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/25.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1955-06-25' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Black Resistance in the 1950s', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'in 1955, approximately 3,000 delegates met on June 25 and June 26 near Soweto in a Congress of the People.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Black Resistance in the 1950s', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1956 the police arrested 156 leaders, including Luthuli, Mandela, Tambo, Sisulu, and others, and put them on trial for treason in a court case that dragged on for five years.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'giliomee-2003-the-afrikaners', perspective: 'african' }
  ]
})
