import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-great-britain',
  names: [
    { text: 'Kingdom of Great Britain', lang: 'en', role: 'primary' },
    {
      text: 'Great Britain',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-united-kingdom',
          loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
        }
      ]
    },
    { text: 'Britain', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1707' },
        cites: [
          {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1268' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1801-01-01' },
        cites: [
          {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 179876, from: 1707, to: 1709 },
    { set: 'early', code: 23666, from: 1709, to: 1801 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Great_Britain_%281707%2C_3-2%29.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Flag_of_Great_Britain_(1707,_3-2).svg',
    credit: { creator: 'Sangjinhwa' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: '“Great Britain” was employed as a formal designation from the time of the union of the kingdoms of England and Scotland in 1707.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_Kingdom'
          }
        },
        {
          id: 'q2',
          text: 'By the Act of Union in 1707 Scotland ceased to have a separate parliament, and its government was assimilated to that of England.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1268' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'On the 8th of March 1702 Anne became, by King William’s death, queen of Great Britain, being crowned on the 23rd of April.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-anne-queen-of-great-britain-and-ireland',
            loc: { section: 'Anne, Queen of Great Britain and Ireland', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anne,_Queen_of_Great_Britain_and_Ireland'
          }
        },
        {
          id: 'q4',
          text: 'The Union was at first rich in causes of friction, and in nothing else; even as late as 1745 it was most unpopular, but Scotland had no choice.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        },
        {
          id: 'q5',
          text: 'Repeal of the Union was actually mooted in 1712, and even Argyll was restive.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1467' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        },
        {
          id: 'q6',
          text: 'Prussia was joined by England, and between England and France, as usual, a maritime and colonial war broke out at the first pretext; this war laid the foundations of the British empire, for ere the seven campaigns had been fought in Europe, the French dominion in Canada and the French influence in India, in spite of Dupleix, Lally and Montcalm, had been entirely overthrown by the victories of Clive, Amherst and Wolfe.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-seven-years-war',
            loc: { section: 'Seven Years\' War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War'
          }
        },
        {
          id: 'q7',
          text: 'The reasons of Great Britain’s misfortunes and failure may be summarized as follows:—Misconception by the home government of the temper and reserve strength of her colonists, a population mainly of good English blood and instincts; disbelief at the outset in the probability of a protracted struggle covering the immense territory in America; consequent failure to despatch sufficient forces to the field; the safe and Fabian generalship of Washington; and finally, the French alliance and European combinations by which at the close of the conflict England was without a friend or ally on the continent.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/American_War_of_Independence'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'The Act of Union with Scotland constituted one of the strongest foundations of the future empire.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-anne-queen-of-great-britain-and-ireland',
            loc: { section: 'Anne, Queen of Great Britain and Ireland', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anne,_Queen_of_Great_Britain_and_Ireland'
          }
        }
      ]
    }
  ]
})
