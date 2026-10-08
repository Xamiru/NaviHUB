import { definePerson } from '../../schema'

export default definePerson({
  id: 'mehdi-bazargan',
  names: [
    { text: 'Mehdi Bazargan', lang: 'en', role: 'primary' },
    { text: 'مهدی بازرگان', lang: 'fa', role: 'native', translit: 'Mahdi Bāzargān' },
    {
      text: 'Mehdi Bāzargān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1907' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1995' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1995' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1995' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'scholar'],
  offices: [
    {
      title: 'prime minister of the provisional government',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1979-02-05' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979-11-06' },
            cites: [
              { source: 'frus-1977-80-v11p1-persons', loc: { section: 'Persons', para: '21' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Mehdi_Bazargan_Portrait.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mehdi_Bazargan_Portrait.jpg',
    credit: { institution: 'National Library and Archives of Iran' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'Mehdi Bazargan became the first prime minister of the revolutionary regime in February 1979.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q1',
          text: 'Mehdi Bāzargān (b. 1907), professor of engineering at the University of Tehran, a devout Muslim, the first prime minister appointed by Ayatollah Khomeini, and the leader of the Freedom Movement (Nahżat-e āzādi), dies.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1995' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q8',
          text: 'Following a relatively dormant phase after the 1953 coup d’état (q.v.), the period of 1960s-70s saw the revitalization and expansion of all brands of political Islam, inspired by the rise of Ayatollah Khomeini as the charismatic political source of emulation (with access to religious networks and financial resources).',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '19'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        },
        {
          id: 'q2',
          text: 'Also reemerging in this period was Bazargan’s pro-democracy nationalist movement that began in the 1940s adhering to the idea of the compatibility of Islam with democracy. It became a political party in 1961 as the Liberation Movement of Iran (Nahżat-e āzādi-e Irān).',
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
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        },
        {
          id: 'q3',
          text: 'Bazargan, however, headed a government that controlled neither the country nor even its own bureaucratic apparatus.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ISLAMIC REPUBLIC', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q4',
          text: 'Moreover, multiple centers of authority emerged within the government. As the supreme leader, Khomeini did not consider himself bound by the government. He made policy pronouncements, named personal representatives to key government organizations, established new institutions, and announced decisions without consulting his prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ISLAMIC REPUBLIC', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q5',
          text: 'In October 1979, when it had become clear that the draft constitution would institutionalize clerical domination of the state, Bazargan and a number of his cabinet colleagues had attempted to persuade Khomeini to dissolve the Assembly of Experts, but Khomeini refused.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q6',
          text: 'As a French educated engineer in the 1930s who was familiar with the modern sciences and political philosophy, Bazargan developed a pristine approach in a number of influential books, expounding the compatibility of Islam with Western science and technology, freedom and democracy.',
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
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'bazargan-1984-enqelab-e-iran-dar-do-harekat', perspective: 'iranian' }
  ]
})
