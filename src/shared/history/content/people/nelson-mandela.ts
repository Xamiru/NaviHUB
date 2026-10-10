import { definePerson } from '../../schema'

export default definePerson({
  id: 'nelson-mandela',
  names: [
    { text: 'Nelson Mandela', lang: 'en', role: 'primary' },
    {
      text: 'Nelson Rolihlahla Mandela',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'saho-nelson-rolihlahla-mandela',
          loc: { section: 'Nelson Rolihlahla Mandela', para: '4' }
        }
      ]
    },
    {
      text: 'Madiba',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'saho-nelson-rolihlahla-mandela',
          loc: { section: 'Nelson Rolihlahla Mandela', para: '4' }
        }
      ]
    },
    {
      text: 'Rolihlahla Mandela',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
          loc: { section: 'Biography of Nelson Mandela', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1918-07-18' },
        cites: [
          {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '2' }
          },
          {
            source: 'lc-names-mandela-nelson-n85153068',
            loc: { section: 'Mandela, Nelson, 1918-2013' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2013-12-05' },
        cites: [
          {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '43' }
          },
          {
            source: 'lc-names-mandela-nelson-n85153068',
            loc: { section: 'Mandela, Nelson, 1918-2013' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:johannesburg',
    cites: [
      {
        source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
        loc: { section: 'Biography of Nelson Mandela', para: '43' }
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['head-of-state', 'activist', 'politician'],
  offices: [
    {
      title: 'President of the African National Congress',
      start: {
        alts: [
          {
            value: { d: '1991' },
            cites: [
              {
                source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
                loc: { section: 'Biography of Nelson Mandela', para: '37' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
          loc: { section: 'Biography of Nelson Mandela', para: '37' }
        }
      ]
    },
    {
      title: 'President of South Africa',
      start: {
        alts: [
          {
            value: { d: '1994-05-10' },
            cites: [
              {
                source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
                loc: { section: 'Biography of Nelson Mandela', para: '39' }
              },
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'The Election of Nelson Mandela', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1999' },
            cites: [
              {
                source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
                loc: { section: 'Biography of Nelson Mandela', para: '40' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
          loc: { section: 'Biography of Nelson Mandela', para: '39' }
        },
        {
          source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
          loc: { section: 'Biography of Nelson Mandela', para: '40' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/1280px-Nelson_Mandela_1994.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nelson_Mandela_1994.jpg',
    credit: { creator: 'Kingkongphoto and www.celebrity-photos.com' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Lawyer, anti-apartheid activist, banned person, ANC member, SACP member, MK Commander in Chief, 1956 Treason Trialist, Robben Island prisoner, Nobel Peace Prize winner and first elected President of a democratic South Africa.',
          lang: 'en',
          cite: {
            source: 'saho-nelson-rolihlahla-mandela',
            loc: { section: 'Nelson Rolihlahla Mandela', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.sahistory.org.za/people/nelson-rolihlahla-mandela'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Rolihlahla Mandela was born into the Madiba clan in the village of Mvezo, in the Eastern Cape, on 18 July 1918.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q3',
          text: 'He attended primary school in Qunu where his teacher, Miss Mdingane, gave him the name Nelson, in accordance with the custom of giving all schoolchildren “Christian” names.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q4',
          text: 'He completed his BA through the University of South Africa and went back to Fort Hare for his graduation in 1943.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Mandela, while increasingly politically involved from 1942, only joined the African National Congress in 1944 when he helped to form the ANC Youth League (ANCYL).',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q6',
          text: 'A two-year diploma in law on top of his BA allowed Mandela to practise law, and in August 1952 he and Oliver Tambo established South Africa’s first black-owned law firm in the 1950s, Mandela & Tambo',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q7',
          text: 'Mandela was arrested in a countrywide police swoop on 5 December 1956, which led to the 1956 Treason Trial.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q8',
          text: 'In June 1961 he was asked to lead the armed struggle and helped to establish Umkhonto weSizwe (Spear of the Nation), which launched on 16 December 1961 with a series of explosions.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q9',
          text: 'On 11 June 1964 Mandela and seven other accused, Walter Sisulu, Ahmed Kathrada, Govan Mbeki, Raymond Mhlaba, Denis Goldberg, Elias Motsoaledi and Andrew Mlangeni, were convicted and the next day were sentenced to life imprisonment.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '31' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q10',
          text: 'On 31 March 1982 Mandela was transferred to Pollsmoor Prison in Cape Town with Sisulu, Mhlaba and Mlangeni.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '33' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q11',
          text: 'On 12 August 1988 he was taken to hospital where he was diagnosed with tuberculosis. After more than three months in two hospitals he was transferred on 7 December 1988 to a house at Victor Verster Prison near Paarl where he spent his last 14 months of imprisonment. He was released from its gates on Sunday 11 February 1990, nine days after the unbanning of the ANC and the PAC',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '36' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q12',
          text: 'Mandela immersed himself in official talks to end white minority rule and in 1991 was elected ANC President to replace his ailing friend, Oliver Tambo.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '37' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        },
        {
          id: 'q13',
          text: 'On 10 May 1994 he was inaugurated as South Africa’s first democratically elected President.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '39' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q14',
          text: 'True to his promise, Mandela stepped down in 1999 after one term as President.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '40' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q15',
          text: 'He died at his home in Johannesburg on 5 December 2013.',
          lang: 'en',
          cite: {
            source: 'nelson-mandela-foundation-biography-of-nelson-mandela',
            loc: { section: 'Biography of Nelson Mandela', para: '43' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nelsonmandela.org/biography' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q16',
          text: 'We have waited too long for our freedom.',
          lang: 'en',
          cite: {
            source: 'fordham-sourcebook-mandela-1990-speech-on-release-from-prison',
            loc: { section: 'Speech on Release from Prison, 1990', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sourcebooks.web.fordham.edu/mod/1990MANDELA.asp'
          }
        },
        {
          id: 'q17',
          text: 'Our march toward freedom is irreversible. We must not allow fear to stand in our way.',
          lang: 'en',
          cite: {
            source: 'fordham-sourcebook-mandela-1990-speech-on-release-from-prison',
            loc: { section: 'Speech on Release from Prison, 1990', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://sourcebooks.web.fordham.edu/mod/1990MANDELA.asp'
          }
        },
        {
          id: 'q18',
          text: 'The time for the healing of the wounds has come.',
          lang: 'en',
          cite: {
            source: 'gov-za-1994-05-10-mandela-inauguration-address',
            loc: { section: 'Inauguration address', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.gov.za/news/speeches/president-nelson-mandela-1994-presidential-inauguration-10-may-1994'
          }
        },
        {
          id: 'q19',
          text: 'Never, never and never again shall it be that this beautiful land will again experience the oppression of one by another and suffer the indignity of being the skunk of the world.',
          lang: 'en',
          cite: {
            source: 'gov-za-1994-05-10-mandela-inauguration-address',
            loc: { section: 'Inauguration address', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.gov.za/news/speeches/president-nelson-mandela-1994-presidential-inauguration-10-may-1994'
          }
        }
      ]
    }
  ]
})
