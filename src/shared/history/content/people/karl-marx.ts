import { definePerson } from '../../schema'

export default definePerson({
  id: 'karl-marx',
  names: [
    { text: 'Karl Marx', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1818-05-05' },
        cites: [
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '2' }
          },
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1883-03-14' },
        cites: [
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '81' }
          },
          {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '80' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'lemo-biografie-karl-marx',
        loc: { section: 'Karl Marx 1818-1883', para: '81' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['scholar', 'journalist', 'revolutionary'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q8',
          text: 'He at first intended to settle as a lecturer at Bonn University, but his Radical views made a university career out of the question, and he accepted work on a Radical paper, the Rheinische Zeitung, which expounded the ideas of the most advanced section of the Rhenish Radical bourgeoisie.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-marx',
            loc: { section: 'MARX, HEINRICH KARL', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marx,_Heinrich_Karl'
          }
        },
        {
          id: 'q9',
          text: 'In October 1842 he became one of the editors of this paper, which, however, after an incessant struggle with press censors, was suppressed in the beginning of 1843.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-marx',
            loc: { section: 'MARX, HEINRICH KARL', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marx,_Heinrich_Karl'
          }
        },
        {
          id: 'q1',
          text: 'Fortan bilden Klassenverhältnisse und politische Ökonomie die zentralen Elemente in Marxʼ Theorie.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-karl-marx',
            loc: { section: 'Karl Marx 1818-1883', para: '30' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/karl-marx' }
        },
        {
          id: 'q5',
          text: 'After a short stay in France, Marx and Engels went to Cologne in May 1848, and there with some friends they founded the Neue rheinische Zeitung, with the sub-title “An Organ of Democracy,” a political daily paper on a large scale, of which Marx was the chief editor.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-marx',
            loc: { section: 'MARX, HEINRICH KARL', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marx,_Heinrich_Karl'
          }
        },
        {
          id: 'q6',
          text: 'He went to Paris, but was soon given the option of either leaving France or settling at a small provincial place. He preferred the former, and went to England. He settled in London, and remained there for the rest of his life.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-marx',
            loc: { section: 'MARX, HEINRICH KARL', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marx,_Heinrich_Karl'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'The dissolution of the International gave Marx an opportunity of returning to his scientific work. He did not, however, succeed in publishing further volumes of Das Kapital. In order to make it—and especially the part dealing with property in land—as complete as possible, he took up, as Engels tells us, a number of new studies, but repeated illness interrupted his researches, and on the 14th of March 1883 he passed quietly away.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-marx',
            loc: { section: 'MARX, HEINRICH KARL', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marx,_Heinrich_Karl'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/1280px-Karl_Marx_001.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Karl_Marx_001.jpg',
    credit: {
      institution: 'International Institute of Social History',
      creator: 'John Jabez Edwin Mayall'
    },
    license: { id: 'public-domain' }
  }
})
