import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soweto-uprising',
  names: [
    { text: 'Soweto uprising', lang: 'en', role: 'primary' },
    { text: 'Soweto-opstand', lang: 'af', role: 'alternative' },
    {
      text: 'Soweto, 1976',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '-1' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1976-06-16' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1977' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    {
      ref: 'place:soweto',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '2' }
        }
      ]
    },
    {
      ref: 'place:johannesburg',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'students',
      name: 'High-school students of Soweto',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '2' }
        }
      ]
    },
    {
      key: 'government',
      name: 'South African government',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '1' }
        },
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Michael C. Botha',
      role: 'leader',
      side: 'government',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '1' }
        }
      ]
    },
    {
      name: 'Andries Treurnicht',
      role: 'leader',
      side: 'government',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '1' }
        }
      ]
    },
    {
      name: 'Steve Biko',
      role: 'ideologue',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Steve Biko and SASO', para: '1' }
        },
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '3' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Student_signs_at_Soweto_uprising.jpg/1280px-Student_signs_at_Soweto_uprising.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Student_signs_at_Soweto_uprising.jpg',
    credit: { institution: 'Honolulu Star-Bulletin, 17 June 1976, p. 57' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On June 16, 1976, hundreds of high-school students in Soweto, the African township southwest of Johannesburg, marched in protest against having to use Afrikaans.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
        },
        {
          id: 'q2',
          text: 'The demonstrators, joined by angry crowds of Soweto residents, reacted by attacking and burning down government buildings, including administrative offices and beer halls. The government sent in more police and troops and quelled the violence within a few days but at the cost of several hundred African lives.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'A shortage of Afrikaans teachers and a lack of suitable textbooks had resulted in English and African languages being used as the languages of instruction. Because Afrikaans was identified by Africans, especially by the young and by those sympathetic to black consciousness, as the language of the oppressor, opposition to this new policy grew throughout 1975 and into 1976.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
        },
        {
          id: 'q4',
          text: 'Led by Steve Biko, an African medical student at the University of Natal, a group of black students established the South African Students\' Organisation (SASO) in 1969 with Biko as president. Biko, strongly influenced by the writings of Lembede and by the Black Power movement in the United States, argued that Africans had to run their own organizations; they could not rely on white liberals because such people would always ally in the last resort with other whites rather than with blacks.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Steve Biko and SASO', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/29.htm' }
        },
        {
          id: 'q5',
          text: 'Biko\'s message had an immediate appeal; SASO expanded enormously, and its members established black self-help projects, including workshops and medical clinics, in many parts of South Africa. In 1972 the Black Peoples\' Convention (BPC) was set up to act as a political umbrella organization for the adherents of black consciousness.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Steve Biko and SASO', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/29.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Similar outbreaks occurred elsewhere in South Africa, and violence continued throughout the rest of 1976 and into 1977.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'By February 1977, official figures counted 494 Africans, seventy-five coloureds, one Indian, and five whites killed.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'By that time, SASO and the BPC had been banned and open black resistance had been brought to a halt.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Soweto, 1976', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1974' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Soweto, 1976', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In 1974 the newly appointed minister of Bantu education, Michael C. Botha, and his deputy, Andries Treurnicht, decided to enforce a previously ignored provision of the Bantu Education Act that required Afrikaans to be used on an equal basis with English as a medium of instruction.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-06-16' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Soweto, 1976', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The police responded with tear gas and then with gunfire that left at least three dead and a dozen injured.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1977-08' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Soweto, 1976', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In August of that year, Steve Biko, who had been held in indefinite detention, died from massive head injuries sustained during police interrogation.',
        lang: 'en',
        cite: {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Soweto, 1976', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/south-africa/30.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'ndlovu-1998-the-soweto-uprisings', perspective: 'african' },
    { source: 'hirson-2016-year-of-fire-year-of-ash', perspective: 'african' }
  ]
})
