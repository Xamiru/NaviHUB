import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-france',
  names: [
    { text: 'Kingdom of France', lang: 'en', role: 'primary' },
    {
      text: 'France',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-capet', loc: { section: 'Capet', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '0987' },
        cites: [
          { source: 'britannica-1911-capet', loc: { section: 'Capet', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1792-09-21' },
        cites: [
          {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 207162, to: 1792 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pavillon_royal_de_France.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Pavillon_royal_de_France.svg',
    credit: { creator: 'Zippanova' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After a hundred and fifty years of foreign war and civil discord, at a period when order and unity were ardently desired, an absolute monarchy had appeared the only power capable of realizing such aspirations.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '200' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q2',
          text: 'The original significance of the name remains in dispute, but the first of the family to whom it was applied was Hugh, who was elected king of the Franks in 987.',
          lang: 'en',
          cite: { source: 'britannica-1911-capet', loc: { section: 'Capet', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Capet'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The king, however, at once announced his intention of being his own first minister; and from this resolution he never swerved.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q4',
          text: 'He built up a thoroughly personal system of government, and presided constantly over the council and many of its committees.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        },
        {
          id: 'q5',
          text: 'The king died on the 1st of September 1715, after the longest recorded reign in European history.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xiv-of-france',
            loc: { section: 'Louis XIV. of France', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XIV._of_France'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Having fought the oligarchy of privilege, the monarchy next tried to rally it to its side, and all the springs of the old régime were strained to the breaking-point.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '374' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q7',
          text: 'But Louis XVI.’s reign (1774–1792) was only to be a temporary halting-place, an artifice of history for passing through the transition period whilst elaborating the transformation which was to revolutionize, together with France, the whole world.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '365' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q8',
          text: 'On the 21st of September 1792 the Convention declared royalty abolished, and in January it tried the king for his treason against the nation, and condemned him to death.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-louis-xvi-of-france',
            loc: { section: 'Louis XVI. of France', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
          }
        }
      ]
    }
  ]
})
