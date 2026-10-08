import { definePerson } from '../../schema'

export default definePerson({
  id: 'franz-joseph-i',
  names: [
    { text: 'Franz Joseph I', lang: 'en', role: 'primary' },
    { text: 'Franz Joseph I.', lang: 'de', role: 'native' },
    {
      text: 'Francis Joseph I.',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-francis-joseph-i',
          loc: { section: 'FRANCIS JOSEPH I.', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1830-08-18' },
        cites: [
          {
            source: 'britannica-1911-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1916-11-21' },
        cites: [
          {
            source: 'britannica-1922-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Austria',
      polity: 'polity:austrian-empire',
      start: {
        alts: [
          {
            value: { d: '1848-12-02' },
            cites: [
              {
                source: 'britannica-1911-francis-joseph-i',
                loc: { section: 'FRANCIS JOSEPH I.', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1867' },
            cites: [
              {
                source: 'loc-austria-country-study-1994',
                loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-francis-joseph-i',
          loc: { section: 'FRANCIS JOSEPH I.', para: '1' }
        }
      ]
    },
    {
      title: 'Emperor of Austria',
      polity: 'polity:austria-hungary',
      start: {
        alts: [
          {
            value: { d: '1867' },
            cites: [
              {
                source: 'loc-austria-country-study-1994',
                loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1916-11-21' },
            cites: [
              {
                source: 'britannica-1922-francis-joseph-i',
                loc: { section: 'FRANCIS JOSEPH I.', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '3' }
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
          text: 'FRANCIS JOSEPH I. (1830–), emperor of Austria, king of Bohemia, and apostolic king of Hungary, was the eldest son of the archduke Francis Charles, second son of the reigning emperor Francis I., being born on the 18th of August 1830.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Francis_Joseph_I.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'During the disturbances of 1848, Francis Joseph spent some time in Italy, where, under Radetzky, at the battle of St Lucia, he had his first experience of warfare. At the end of that year, after the rising of Vienna and capture of the city by Windischgrätz, it was clearly desirable that there should be a more vigorous ruler at the head of the empire, and Ferdinand, now that the young archduke was of age, was able to carry out the abdication which he and his wife had long desired. All the preparations were made with the utmost secrecy; on the 2nd of December 1848, in the archiepiscopal palace at Olmütz, whither the court had fled from Vienna, the emperor abdicated. His brother resigned his rights of succession to his son, and Francis Joseph was proclaimed emperor.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Francis_Joseph_I.'
          }
        },
        {
          id: 'q3',
          text: 'The first task was to reduce Hungary to obedience, for the Magyars refused to acknowledge the validity of the abdication in so far as it concerned Hungary, on the ground that such an act would only be valid with the consent of the Hungarian parliament.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Francis_Joseph_I.'
          }
        },
        {
          id: 'q4',
          text: 'In 1853 a Hungarian named Lebenyi attempted to assassinate the emperor, and succeeded in inflicting a serious wound with a knife.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Francis_Joseph_I.'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'All the preparations for Francis Ferdinand\'s accession were made. But the old Emperor recovered; and his physical as well as his mental energy improved from year to year, so that he was able in the first two years of the World War to transact fully all the business of government. It was only in the year 1916 that his faculties began to fail.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/Francis_Joseph_I.'
          }
        },
        {
          id: 'q6',
          text: 'He died peacefully of a fresh attack of his old malady on Nov. 21 1916.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-francis-joseph-i',
            loc: { section: 'FRANCIS JOSEPH I.', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/Francis_Joseph_I.'
          }
        }
      ]
    }
  ]
})
