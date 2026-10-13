import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'scientific-revolution',
  names: [
    { text: 'Scientific Revolution', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1543' },
        cites: [
          {
            source: 'britannica-1911-copernicus-nicolaus',
            loc: { section: 'Copernicus, Nicolaus', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1687' },
        cites: [
          {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '65' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  participants: [
    {
      name: 'Nicolaus Copernicus',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-copernicus-nicolaus',
          loc: { section: 'Copernicus, Nicolaus', para: '1' }
        }
      ]
    },
    {
      ref: 'person:galileo-galilei',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-galileo-galilei',
          loc: { section: 'Galileo Galilei', para: '1' }
        }
      ]
    },
    {
      ref: 'person:isaac-newton',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-newton-sir-isaac',
          loc: { section: 'Newton, Sir Isaac', para: '1' }
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
          text: 'The Sidereus Nuncius, published at Venice early in 1610, contained the first-fruits of the new mode of investigation, which were sufficient to excite learned amazement on both sides of the Alps.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        },
        {
          id: 'q2',
          text: 'The work, as might have been expected, caused a great deal of excitement throughout Europe, and the whole of the impression was very soon sold.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Johann Albrecht Widmanstadt lectured upon it in Rome; Clement VII. approved, and Cardinal Schönberg transmitted to the author a formal demand for full publication.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-copernicus-nicolaus',
            loc: { section: 'Copernicus, Nicolaus', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Copernicus,_Nicolaus'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'In 1691 a copy of the Principia was hardly to be procured.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        },
        {
          id: 'q5',
          text: 'This sentence was signed by seven cardinals, but did not receive the customary papal ratification.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        },
        {
          id: 'q6',
          text: 'On the 8th of January 1642 he closed his long life of triumph and humiliation, which just spanned the interval between the death of Michelangelo and the birth of Isaac Newton.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1543' },
            cites: [
              {
                source: 'britannica-1911-copernicus-nicolaus',
                loc: { section: 'Copernicus, Nicolaus', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Copernicus was seized with apoplexy and paralysis towards the close of 1542, and died on the 24th of May 1543, happily unconscious that the fine Epistle, in which he had dedicated his life’s work to Paul III., was marred of its effect by an anonymous preface, slipt in by Andreas Osiander (1498–1552), with a view to disarming prejudice by insisting upon the purely hypothetical character of the reasonings it introduced.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-copernicus-nicolaus',
          loc: { section: 'Copernicus, Nicolaus', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Copernicus,_Nicolaus'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1610-01-07' },
            cites: [
              {
                source: 'britannica-1911-galileo-galilei',
                loc: { section: 'Galileo Galilei', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'But the discovery which was at once perceived to be most important in itself, and most revolutionary in its effects, was that of Jupiter’s satellites, first seen by Galileo on the 7th of January 1610, and by him named Sidera Medicea, in honour of the grand-duke of Tuscany, Cosmo II., who had been his pupil, and was about to become his employer.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-galileo-galilei',
          loc: { section: 'Galileo Galilei', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1633-06-22' },
            cites: [
              {
                source: 'britannica-1911-galileo-galilei',
                loc: { section: 'Galileo Galilei', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the 22nd of June, in the church of Santa Maria sopra Minerva, Galileo read his recantation, and received his sentence.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-galileo-galilei',
          loc: { section: 'Galileo Galilei', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1687' },
            cites: [
              {
                source: 'britannica-1911-newton-sir-isaac',
                loc: { section: 'Newton, Sir Isaac', para: '65' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The third book was presented to the Society on the 6th of April 1687, and the whole work published about midsummer in that year.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-newton-sir-isaac',
          loc: { section: 'Newton, Sir Isaac', para: '65' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Newton%27s_Philosophiae_Naturalis_Principia_Mathematica_1687_%28presentation_copy_to_James_II%29.jpg/1280px-Newton%27s_Philosophiae_Naturalis_Principia_Mathematica_1687_%28presentation_copy_to_James_II%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Newton%27s_Philosophiae_Naturalis_Principia_Mathematica_1687_(presentation_copy_to_James_II).jpg',
    credit: { creator: 'Joseph Streater' },
    license: { id: 'public-domain' }
  }
})
