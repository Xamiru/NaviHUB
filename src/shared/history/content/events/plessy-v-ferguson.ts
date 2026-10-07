import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'plessy-v-ferguson',
  names: [
    { text: 'Plessy v. Ferguson', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1896-05-18' },
        cites: [
          {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '-2' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  participants: [
    {
      name: 'Homer Plessy',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-plessy-v-ferguson',
          loc: { section: 'Plessy v. Ferguson (1896)', para: '5' }
        }
      ]
    },
    {
      name: 'Albion W. Tourgée',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-plessy-v-ferguson',
          loc: { section: 'Plessy v. Ferguson (1896)', para: '5' }
        }
      ]
    },
    {
      name: 'Henry Brown',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-plessy-v-ferguson',
          loc: { section: 'Plessy v. Ferguson (1896)', para: '6' }
        }
      ]
    },
    {
      name: 'John Marshall Harlan',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-plessy-v-ferguson',
          loc: { section: 'Plessy v. Ferguson (1896)', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:end-of-reconstruction', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In 1896, the Supreme Court issued its decision in Plessy v. Ferguson. Justice Henry Brown of Michigan delivered the majority opinion, which sustained the constitutionality of Louisiana’s Jim Crow law.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        },
        {
          id: 'q1',
          text: 'The ruling in this Supreme Court case upheld a Louisiana state law that allowed for "equal but separate accommodations for the white and colored races."',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1883, the Supreme Court struck down the 1875 act, ruling that the 14th Amendment did not give Congress authority to prevent discrimination by private individuals.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        },
        {
          id: 'q4',
          text: 'When such a bill was proposed before the Louisiana legislature in 1890, the Black community of New Orleans protested vigorously.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'It was not until the Supreme Court’s decision in Brown v. Board of Education and congressional civil rights acts of the 1950s and 1960s that systematic segregation under state law was ended.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        },
        {
          id: 'q6',
          text: 'For Homer Plessy, the remedies came too late.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-plessy-v-ferguson',
            loc: { section: 'Plessy v. Ferguson (1896)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1892-06-07' },
            cites: [
              {
                source: 'nara-milestone-plessy-v-ferguson',
                loc: { section: 'Plessy v. Ferguson (1896)', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'With the cooperation of the East Louisiana Railroad, on June 7, 1892, Homer Plessy, a mulatto (7/8 white), seated himself in a white compartment, was challenged by the conductor, and was arrested and charged with violating the state law.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-plessy-v-ferguson',
          loc: { section: 'Plessy v. Ferguson (1896)', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/plessy-v-ferguson'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Judgment_in_Plessy_v._Ferguson.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Judgment_in_Plessy_v._Ferguson.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
