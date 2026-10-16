import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'printing-press-of-gutenberg',
  names: [
    { text: 'Gutenberg’s printing press', lang: 'en', role: 'primary' },
    {
      text: 'Gutenberg Bible',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-bible-collection-gutenberg-bible',
          loc: { section: 'The Gutenberg Bible', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1450', approx: true },
        cites: [
          {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1455', approx: true },
        cites: [
          {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:mainz',
      cites: [
        {
          source: 'britannica-1911-gutenberg-johann',
          loc: { section: 'Gutenberg, Johann', para: '1' }
        },
        {
          source: 'loc-bible-collection-gutenberg-bible',
          loc: { section: 'The Gutenberg Bible', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:johannes-gutenberg',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-gutenberg-johann',
          loc: { section: 'Gutenberg, Johann', para: '1' }
        }
      ]
    },
    {
      name: 'Johann Fust',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-gutenberg-johann',
          loc: { section: 'Gutenberg, Johann', para: '1' }
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
          text: 'The Gutenberg Bible is the first great book printed in Western Europe from movable metal type.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-the-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html'
          }
        },
        {
          id: 'q2',
          text: 'Printing with moveable type revolutionized not only the book but the very nature of communication in Western Europe.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html'
          }
        },
        {
          id: 'q3',
          text: 'It is important not to call this Bible the first printed book.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In 1438 another partnership was arranged between Gutenberg, Andreas Dritzehn, and Andreas and Anton Heilmann, and that this had in view the art of printing has been inferred from the word “drucken” used by one of the witnesses in the law proceedings which soon after followed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'We do not know the end of these proceedings, but if Gutenberg had prepared any printing materials it would seem that he was compelled to yield up the whole of them to Fust; that the latter removed them to his own house at Mainz, and there, with the assistance of Peter Schöffer, issued various books until the sack of the city in 1462 by Adolphus II. caused a suspension of printing for three years, to be resumed again in 1465.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gutenberg-johann',
            loc: { section: 'Gutenberg, Johann', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
          }
        },
        {
          id: 'q6',
          text: 'The printing of the Bible was probably completed late in 1455 at Mainz, Germany.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-the-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Texts once scarce and complicated to produce now flooded all corners of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html'
          }
        },
        {
          id: 'q8',
          text: 'Out of this explosion of text emerged the Renaissance, the Reformation, and the Scientific Revolution.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html'
          }
        },
        {
          id: 'q9',
          text: 'Gutenberg’s invention of the mechanical printing press made it possible for the accumulated knowledge of the human race to become the common property of every person who knew how to read—an immense forward step in the emancipation of the human mind.',
          lang: 'en',
          cite: {
            source: 'loc-bible-collection-the-gutenberg-bible',
            loc: { section: 'The Gutenberg Bible', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html'
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
            value: { d: '1452' },
            cites: [
              {
                source: 'britannica-1911-gutenberg-johann',
                loc: { section: 'Gutenberg, Johann', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Gutenberg’s work, whatever it may have been, was not a commercial success, and in 1452 Fust had to come forward with another 800 guilders to prevent a collapse.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-gutenberg-johann',
          loc: { section: 'Gutenberg, Johann', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1455', approx: true },
            cites: [
              {
                source: 'loc-bible-collection-gutenberg-bible',
                loc: { section: 'The Gutenberg Bible', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Approximately 180 copies of the Gutenberg Bible were printed and first made available in about 1455.',
        lang: 'en',
        cite: {
          source: 'loc-bible-collection-gutenberg-bible',
          loc: { section: 'The Gutenberg Bible', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.loc.gov/exhibits/bibles/interactives/gutenberg/index.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/An_illuminated_page_of_the...Gutenberg_Bible..._LCCN2006680004.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:An_illuminated_page_of_the...Gutenberg_Bible..._LCCN2006680004.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
