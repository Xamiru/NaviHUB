import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'premiership-of-mir-hossein-mousavi',
  names: [
    { text: 'Premiership of Mir-Hossein Mousavi', lang: 'en', role: 'primary' },
    { text: 'نخست‌وزیری میرحسین موسوی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1981-10-28' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '4' }
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
            loc: { section: 'Chronology of Iranian History Part 4' }
          },
          {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '35' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  parent: 'polity:islamic-republic-of-iran',
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Mir-Hossein_Mousavi_in_1981.jpg/1280px-Mir-Hossein_Mousavi_in_1981.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mir-Hossein_Mousavi_in_1981.jpg',
    credit: { institution: 'National Library and Archives of Iran' },
    license: { id: 'public-domain' }
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
            loc: { section: 'Terror and Repression', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'The second Majlis convened in May 1984 and, with some prodding from Khomeini, gave Mir-Hosain Musavi a renewed vote of confidence as prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Revolution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/27.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The post of prime minister was abolished and all his functions transferred to the president',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic'
          }
        }
      ]
    }
  ]
})
