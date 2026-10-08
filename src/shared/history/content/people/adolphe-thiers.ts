import { definePerson } from '../../schema'

export default definePerson({
  id: 'adolphe-thiers',
  names: [
    { text: 'Adolphe Thiers', lang: 'en', role: 'primary' },
    {
      text: 'Adolphe Marie Joseph Louis Thiers',
      lang: 'fr',
      role: 'alternative',
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1797-04-14' },
        cites: [
          { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1877-09-03' },
        cites: [
          { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'head-of-state', 'writer'],
  offices: [
    {
      title: 'chef du pouvoir exécutif',
      polity: 'polity:french-third-republic',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1871-02-17' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '15' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1871-08-31' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    },
    {
      title: 'Président de la République',
      polity: 'polity:french-third-republic',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1871-08-31' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '54' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1873-05' },
            cites: [
              { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q6',
          text: 'His mother belonged to the family of the Chéniers, and he was well educated, first at the lycée of Marseilles, and then in the faculty of law at Aix.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-thiers',
            loc: { section: 'THIERS, LOUIS ADOLPHE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thiers,_Louis_Adolphe'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q7',
          text: 'He succeeded in convincing the deputies that the peace was necessary, and it was (March 1, 1871) voted by more than five to one.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-thiers',
            loc: { section: 'THIERS, LOUIS ADOLPHE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thiers,_Louis_Adolphe'
          }
        },
        {
          id: 'q8',
          text: 'The armistice having been arranged, and the opportunity having been thus obtained of electing a National Assembly, Thiers was chosen deputy by more than twenty constituencies (of which he preferred Paris), and was at once elected by the Assembly itself practically president, nominally chef du pouvoir exécutif.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-thiers',
            loc: { section: 'THIERS, LOUIS ADOLPHE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thiers,_Louis_Adolphe'
          }
        },
        {
          id: 'q9',
          text: 'Thiers composed a ministry, and announced that the first duty of the government ​before examining constitutional questions, would be to reorganize the forces of the nation in order to provide for the enormous war indemnity which had to be paid to Germany before the territory could be liberated from the presence of the invader.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '539' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q10',
          text: 'The president declared that he should take this as a vote of want of confidence; and in the debates which followed a vote of this character (though on a different formal issue, and proposed by M. Ernoul) was carried by 16 votes in a house of 704. Thiers at once resigned (May 24th).',
          lang: 'en',
          cite: {
            source: 'britannica-1911-thiers',
            loc: { section: 'THIERS, LOUIS ADOLPHE', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thiers,_Louis_Adolphe'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Adolphe_Thiers_C.Dolard.jpg/1280px-Adolphe_Thiers_C.Dolard.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Adolphe_Thiers_C.Dolard.jpg',
    credit: { creator: 'Camille Dolard' },
    license: { id: 'cc0' }
  }
})
