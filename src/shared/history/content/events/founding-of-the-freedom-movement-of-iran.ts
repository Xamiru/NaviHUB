import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-freedom-movement-of-iran',
  names: [
    { text: 'Founding of the Freedom Movement of Iran', lang: 'en', role: 'primary' },
    { text: 'تأسیس نهضت آزادی ایران', lang: 'fa', role: 'native' },
    {
      text: 'Liberation Movement of Iran',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-ashraf-islamic-political-movements',
          loc: {
            section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
            para: '20'
          }
        }
      ]
    },
    { text: 'Nahżat-e āzādi-e Irān', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1961' },
        cites: [
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '48' }
          },
          {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '20'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:mehdi-bazargan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '48' }
        }
      ]
    },
    {
      name: 'Yād-Allāh Saḥābi',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '48' }
        }
      ]
    },
    {
      name: 'Maḥmud Ṭālaqāni',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '48' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-national-front-of-iran',
      rel: 'related',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '48' }
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
          text: 'Active throughout the 1960’s and 1970’s was the Freedom Movement (Nahżat-e āzādi), founded in 1961 by Mehdi Bāzargān, Yād-Allāh Saḥābi (d. 2002), and Ayatollāh Maḥmud Ṭālaqāni (1911-79). Nominally affiliated to the National Front (Jabha-ye melli), by this time a moribund and ineffective organization, the Freedom Movement was essentially a reformist group that attempted to harmonize Islamic and liberal-nationalist sentiment; the only prominent religious scholar to figure in its leadership was Ayatollah Maḥmud Ṭālaqāni. It nonetheless came to play an important role in the transition to the Islamic Republic in 1979.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The ideas of the compatibility of Islam with democracy in the Constitutional Revolution also gained a new generation of adherents among the religious intelligentsia, mostly rallied around Mehdi Bazargan (Bāzargān), Yad-Allāh Ṣaḥābi, and Ayatollah Sayyed Maḥmud Ṭāleqāni.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In its 1961 platform, the Liberation Movement advocated national sovereignty, freedom of political activity and expression, social justice under Islam, respect for Iran’s constitution, the Universal Declaration of Human Rights, and the Charter of the United Nations.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '20'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        },
        {
          id: 'q4',
          text: 'When tried the following year for political offenses, Bāzargān was accused of using the Islamic associations as a cover for the activities of the Nahżat-e Āzādī-e Īrān (Freedom Movement of Iran). The charge was baseless insofar as there was a complete organizational separation between the two, but there was considerable overlapping of membership',
          lang: 'en',
          cite: {
            source: 'iranica-hanaway-algar-bayat-anjoman-organization',
            loc: { section: 'ANJOMAN (Organization)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/anjoman-gathering-association-society-general-designation-of-many-private-and-public-associations/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'One result of the occupation of the embassy was a surge in popular enthusiasm, contributing to the 98.2 percent approval vote in the referendum on the constitution that took place in December.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '68' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q5',
          text: 'This final alienation of the Freedom Movement was perhaps inevitable for other, more fundamental reasons.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '68' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q6',
          text: 'Significantly and fatally erroneous was his belief, together with the rest of the Freedom Movement, that Khomeini himself no longer espoused welāyat-e faqih, and that the leadership he was to provide after the triumph of the revolution would be of a general and spiritual nature',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '69' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q7',
          text: 'Bazargan maintained that the common element in both religion and democracy is the principle of “Man’s nobility,” from which the ideas of human freedom and human rights, responsibilities, and political participation are derived. In his view, Islam along with the monotheistic religions bestows great respect on human rights and considers mankind as free, responsible and autonomous agency. He makes a sharp distinction between the essence and precepts of religion, which belongs to God, and the administration of the polity, which belongs to the people.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '66'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
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
            value: { d: '1977' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1977' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: '1977 The National Front (Jebha-ye melli) and Freedom Movement (Neżhat-e āzādi) resume their political activities having been dormant for more than a decade.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1977' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-02-05' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '59' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'February 5: Mehdi Bāzargān, a liberal devout Muslim, professor of engineering at the University of Tehran, a former member of the National Front and the leader of the Freedom Movement (Nahżat-e āzādi), is appointed prime minister of the provisional government by Ayatollah Khomeini.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-11-06' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '68' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Now, on 6 November, his resignation was unhesitatingly accepted.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '68' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    }
  ]
})
