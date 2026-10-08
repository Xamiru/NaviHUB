import { definePerson } from '../../schema'

export default definePerson({
  id: 'mir-hossein-mousavi',
  names: [
    { text: 'Mir-Hossein Mousavi', lang: 'en', role: 'primary' },
    { text: 'میرحسین موسوی', lang: 'fa', role: 'native' },
    { text: 'Mir-Hosain Musavi', lang: 'en', role: 'alternative' },
    { text: 'Mir-Ḥosayn Mūsawī', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1941', notAfter: '1942' },
        cites: [
          {
            source: 'lc-names-n2001915160',
            loc: { section: '670: Shish guftār, 2004 or 2005 (Iranian CIP data: b. 1320 [1941 or 1942])' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime minister of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1981-10-28' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1989' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1981' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1981' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Mousavi_Cropped_1360s.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mousavi_Cropped_1360s.jpg',
    credit: { institution: 'Wikimedia Commons (file page names upload source)', creator: 'Kazemi123' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On October 28, the Majlis elected Mir-Hosain Musavi, a protégé of the late Mohammad Beheshti, as prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The second Majlis convened in May 1984 and, with some prodding from Khomeini, gave Mir-Hosain Musavi a renewed vote of confidence as prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'CONSOLIDATION OF THE REVOLUTION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/27.htm' }
        },
        {
          id: 'q4',
          text: 'Meanwhile, friction between Ḵāmenaʾī and the clerical radicals in government, led by Prime Minister Mīr-Ḥosayn Mūsawī, over strategies for reconstruction greatly intensified after the cease-fire with Iraq in July 1988. This conflict led to open expressions of dissatisfaction with the constitutional division of executive power between the president and the prime minister.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q5',
          text: 'The post of prime minister was abolished and all his functions transferred to the president',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'mugui-2017-akharin-nokhost-vazir', perspective: 'iranian' },
    { source: 'mousavi-2004-shish-goftar', perspective: 'iranian' }
  ]
})
