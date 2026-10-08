import { definePerson } from '../../schema'

export default definePerson({
  id: 'kazem-shariatmadari',
  names: [
    { text: 'Kazem Shariatmadari', lang: 'en', role: 'primary' },
    {
      text: 'کاظم شریعتمداری',
      lang: 'fa',
      role: 'native',
      translit: 'Moḥammad-Kāẓem Šariʿatmadāri'
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1904' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1985' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1985' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1985' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Mohammad_Kazem_Shariatmadari_-_1960s.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mohammad_Kazem_Shariatmadari_-_1960s.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies (iichs.ir)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'From within the ranks of the ʿolamāʾ, the principal opponent of the emerging Islamic Republic was Ayatollah Moḥammad Kāẓem Šariʿatmadāri, a marjʿa-e taqlid resident in Qom with a following concentrated in Azarbaijan. His support for the revolution had been sporadic and lukewarm at best. A party enjoying his patronage, the Muslim People’s Republican Party (Ḥezb-e jomhuri-e ḵalq-e mosalmān), was established in March 1979, and, later in the same year, clashes took place in Tabriz between its adherents and the partisans of Khomeini. Šariʿatmadari criticized crucial elements of the constitution including welāyat-e faqih and called for a boycott of the referendum held on 3 December.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '81' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q1',
          text: '1985 Ayatollah Moḥammad-Kāẓem Šariʿatmadāri (b. 1904), noted mojtahed who had been silenced for years on account of some unfavorable remarks made by him regarding the political theories of Ayatollah Khomeini, dies.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1985' }
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
          id: 'q2',
          text: 'Senior clerics, including Ayatollah Kazem Shariatmadari, denounced the article.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q4',
          text: 'Following the approval of the Constitution, Shariatmadari\'s followers in Tabriz organized demonstrations and seized control of the radio station. A potentially serious challenge to the dominant clerical hierarchy fizzled out, however, when Shariatmadari wavered in his support for the protesters, and the pro-Khomeini forces organized massive counterdemonstrations in the city in 1979. In fear of condemnation by Khomeini and of IRP reprisals, the IPRP in December 1979 announced the dissolution of the party.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        }
      ]
    }
  ]
})
