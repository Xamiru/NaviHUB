import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-university-of-tehran',
  names: [
    { text: 'Founding of the University of Tehran', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1934' },
        cites: [
          {
            source: 'iranica-faculties-of-the-university-of-tehran',
            loc: { section: 'FACULTIES OF THE UNIVERSITY OF TEHRAN', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-menashri-higher-education',
          loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  participants: [
    {
      name: 'ʿAli-Aṣḡar Ḥekmat',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-menashri-higher-education',
          loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '6' }
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
          text: 'The University of Tehran was founded in 1313 Š./1934 from four pre-existing schools (madrasas) which were renamed as faculties (dāneškada): the Faculty of Medicine (Dāneškada-ye pezeškī), the Faculty of Law and Political Science (Dāneškada-ye ḥoqūq o ʿolūm-e sīāsī), the Faculty of Letters (Dāneškada-ye adabīyāt), and the Faculty of Sciences (Dāneškada-ye ʿolūm).',
          lang: 'en',
          cite: {
            source: 'iranica-faculties-of-the-university-of-tehran',
            loc: { section: 'FACULTIES OF THE UNIVERSITY OF TEHRAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/faculties-index/'
          }
        },
        {
          id: 'q2',
          text: 'Two new faculties were also created, the Faculty of of Engineering (Dāneškada-ye fannī) and the Faculty of Islamic Studies (Dāneškada-ye maʿqūl o manqūl, later Elāhīyāt).',
          lang: 'en',
          cite: {
            source: 'iranica-faculties-of-the-university-of-tehran',
            loc: { section: 'FACULTIES OF THE UNIVERSITY OF TEHRAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/faculties-index/'
          }
        },
        {
          id: 'q3',
          text: 'The term chosen for the new institution was dānešgāh (lit., “place of knowledge”).',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-higher-education',
            loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xvii-higher-education/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The mid-1930s saw also the opening of higher education to women and enrollment of over seventy female students in 1936-37 at the University of Tehran',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q5',
          text: 'Initially a French model was adopted: The university consisted of independent faculties with predetermined curricula for each academic year, leaving no room for course selection by students',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-higher-education',
            loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xvii-higher-education/'
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
            value: { d: '1934-03-13' },
            cites: [
              {
                source: 'iranica-menashri-higher-education',
                loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On 13 March 1934 Ḥekmat introduced in the parliament (Majles) a law establishing “an independent legal entity,” that is, a university, in Tehran; the university was to be administratively and financially independent, though under the direct supervision of the Ministry of Education (Wezārat-e maʿāref; art. 7).',
        lang: 'en',
        cite: {
          source: 'iranica-menashri-higher-education',
          loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/education-xvii-higher-education/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935-02-04' },
            cites: [
              {
                source: 'iranica-menashri-higher-education',
                loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Tehran University was inaugurated on 4 February 1935.',
        lang: 'en',
        cite: {
          source: 'iranica-menashri-higher-education',
          loc: { section: 'EDUCATION xvii. HIGHER EDUCATION', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/education-xvii-higher-education/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1935' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Inauguration of the University of Tehran, incorporating six faculties: theology, letters and humanities, law, medicine, sciences, and technology, as well as a teacher’s training college.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1935' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
        }
      }
    }
  ]
})
