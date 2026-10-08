import { definePerson } from '../../schema'

export default definePerson({
  id: 'hossein-ali-montazeri',
  names: [
    { text: 'Hossein-Ali Montazeri', lang: 'en', role: 'primary' },
    { text: 'حسینعلی منتظری', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          { source: 'loc-iran-country-study-1987', loc: { section: 'The Faqih', para: '3' } }
        ]
      },
      {
        value: { d: '1922' },
        cites: [
          { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } },
          {
            source: 'lc-names-muntazeri-husayn-ali-n81006569',
            loc: { section: 'Muntaẓirī, Ḥusayn ʻAlī' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2009-12-20' },
        cites: [
          {
            source: 'lc-names-muntazeri-husayn-ali-n81006569',
            loc: { section: 'Muntaẓirī, Ḥusayn ʻAlī' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric'],
  offices: [
    {
      title: 'Deputy Leader (qaem maqam) of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1985' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'Consolidation of the Revolution', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1989-03-27' },
            cites: [
              {
                source: 'iranica-arjomand-constitution-of-the-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Consolidation of the Revolution', para: '2' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/HussainAliMontazeri.jpg/1280px-HussainAliMontazeri.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:HussainAliMontazeri.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies (gallery)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1985 the Assembly of Experts agreed, reportedly on a split vote, to name Montazeri as Khomeini\'s "deputy" (qaem maqam), rather than "successor" (ja-neshin), thus placing Montazeri in line for the succession without actually naming him as the heir apparent.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/27.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Even before the first meeting of the Assembly of Experts in the spring of 1983, some influential members of the clergy had been trying to promote Ayatollah Hosain Ali Montazeri (born 1923), a former student of Khomeini, as successor to the office of faqih. As early as the fall of 1981, Khomeini himself had indicated in a speech that he considered Montazeri the best qualified to be faqih.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'The Faqih', para: '3' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/82.htm' }
        },
        {
          id: 'q3',
          text: 'In the absence of any official acknowledgement of the 1988 prison massacre, the most credible account of these events comes from the memoirs of Ayatollah Hussein Ali Montazeri, who was at the time one of the highest ranking government officials in Iran and the designated successor of Ayatollah Khomeini, then the Supreme Leader.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        },
        {
          id: 'q4',
          text: 'Furthermore, the resignation of Khomeini’s designated successor, Montaẓerī, on 7 Farvardīn 1368 Š./27 March 1989, added urgency to the need for constitutional resolution of the problem of the succession.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
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
