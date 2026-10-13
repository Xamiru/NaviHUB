import { definePerson } from '../../schema'

export default definePerson({
  id: 'martin-luther',
  names: [
    { text: 'Martin Luther', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1483-11-10' },
        cites: [
          {
            source: 'britannica-1911-luther-martin',
            loc: { section: 'Luther, Martin', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1546-02-18' },
        cites: [
          {
            source: 'britannica-1911-luther-martin',
            loc: { section: 'Luther, Martin', para: '50' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['cleric', 'scholar', 'writer'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg/1280px-Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lucas_Cranach_d.%C3%84._-_Martin_Luther,_1528_(Veste_Coburg).jpg',
    credit: { creator: 'Lucas Cranach the Elder' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On the eve of All Saints\' Day in 1517, Martin Luther, a professor of theology at Wittenberg University in Saxony, posted ninety-five theses on a church door.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        },
        {
          id: 'q2',
          text: 'Luther\'s primary concern was the sale of indulgences--papal grants of reduced punishment in the afterlife, including releases from purgatory.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'His father, Hans Luther (Lyder, Luder, Ludher), a peasant from the township of Möhra in Thuringia, after his marriage with Margarethe Ziegler, had settled in Mansfeld, attracted by the prospects of work in the mines there.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-luther-martin',
            loc: { section: 'Luther, Martin', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Luther,_Martin'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1521 Luther was summoned to appear before Emperor Charles V at the Diet of Worms.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        },
        {
          id: 'q5',
          text: 'Secreted away by the ruler of Saxony, Frederick the Wise, Luther retreated to the castle of Wartburg, where he worked on a translation of the New Testament and wrote numerous religious tracts.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        },
        {
          id: 'q6',
          text: 'He strove to make the Scriptures accessible to ordinary worshipers by translating them into vernacular German.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'He was very ill on the evening of the 17th; he died on the early morning of the 18th of February 1546 in his sixty-third year.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-luther-martin',
            loc: { section: 'Luther, Martin', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Luther,_Martin'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Luther\'s disagreements with the doctrines of the Roman Catholic Church set off a chain of events that within a few decades destroyed Germany\'s religious unity.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        },
        {
          id: 'q9',
          text: 'However, because of the power of his ideas and the enormous influence of his writings, it is he who is regarded as the initiator of the Protestant Reformation.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        }
      ]
    }
  ]
})
