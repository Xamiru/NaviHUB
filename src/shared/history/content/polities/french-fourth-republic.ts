import { definePolity } from '../../schema'

export default definePolity({
  id: 'french-fourth-republic',
  names: [
    { text: 'French Fourth Republic', lang: 'en', role: 'primary' },
    { text: 'Quatrième République', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1946-10-27' },
        cites: [
          {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1958-10-04' },
        cites: [
          { source: 'elysee-rene-coty', loc: { section: 'René Coty: 4 octobre 1958' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'France (code 220), capital Paris' } }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:french-third-republic' }
  ],
  cshapes: [
    { set: 'world', code: 220, from: 1946.82, to: 1958.76 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Vincent_Auriol%2C_portrait_janvier_1947.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Vincent_Auriol,_portrait_janvier_1947.jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 13 October 1946, after many lively and lengthy discussions, the French people approved by referendum the constitution of the Fourth Republic. Two constituent assemblies, two draft constitutions and three referendums were needed to equip France with new institutions following the Liberation.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/the-constitution-of-27-october-1946'
          }
        },
        {
          id: 'q2',
          text: 'The 106 articles in the text established an assembly regime.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/the-constitution-of-27-october-1946'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Promulgated on 27 October 1946, the Constitution of the Fourth Republic included a preamble followed by 106 articles, in the tradition of the revolutionary constitutions of 1791, 1793, 1795 and 1848.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/the-constitution-of-27-october-1946'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'It is customary to attribute the ministerial instability of the Fourth Republic to the Constitution of 1946. In reality, the causes were external.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/the-constitution-of-27-october-1946'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Reviewed in 1954 on minor points, the constitution was dismissed in 1958, in the context of the war in Algeria. On 1 June, the National Assembly inaugurated Charles de Gaulle as President of the Council and on 3 June, authorized him to draw up a draft constitution to be submitted directly to referendum: the Fourth Republic was dead, and the Fifth was born.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/the-constitution-of-27-october-1946'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Furthermore, while the Fourth Republic proved to be powerless in solving the Algerian crisis, it ensured the State\'s action continued to be implemented, thanks to the stability of the politicians and the monitoring of public policies by high-ranking civil servants. It laid the groundwork for the modernization of France, granted independence to Tunisia and Morocco and autonomy to the sub-Saharan African colonies in 1956, and started work on European integration by creating the ECSC in 1951 and signing the Treaty of Rome in 1957.',
          lang: 'en',
          cite: {
            source: 'elysee-constitution-of-27-october-1946',
            loc: { section: 'The Constitution of 27 October 1946', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.elysee.fr/en/french-presidency/the-constitution-of-27-october-1946'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'rioux-1980-la-france-de-la-ive-republique', perspective: 'european' },
    { source: 'elgey-1965-la-republique-des-illusions', perspective: 'european' }
  ]
})
