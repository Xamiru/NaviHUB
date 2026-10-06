import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-telegraph-message',
  names: [
    { text: 'First telegraph message (“What hath God wrought”)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1844-05-24' },
        cites: [
          {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '14' }
          },
          {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 3,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '3' }
        },
        {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '14' }
        }
      ]
    },
    {
      ref: 'place:baltimore',
      cites: [
        {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '14' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Samuel Morse',
      role: 'participant',
      cites: [
        {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '14' }
        }
      ]
    },
    {
      name: 'Alfred Vail',
      role: 'participant',
      cites: [
        {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '14' }
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
          text: 'Surrounded by an audience of Congressmen, Samuel Morse sent the first official telegraph from the Supreme Court Chamber, then located in the Capitol, to his partner, Alfred Vail, in Baltimore. He tapped the message, "What hath God wrought!"',
          lang: 'en',
          cite: {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Inventor Samuel Morse developed the telegraph system.',
          lang: 'en',
          cite: {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
          }
        },
        {
          id: 'q3',
          text: 'The inventor submitted a patent for his device, which he called “The American Recording Electro-Magnetic Telegraph” in 1837.',
          lang: 'en',
          cite: {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Once Morse\'s system was installed in the Capitol, Congress found the telegraph an indispensable tool.',
          lang: 'en',
          cite: {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
          }
        },
        {
          id: 'q5',
          text: 'At first the telegraph connected only Washington, D.C. and Baltimore, MD; gradually lines were extended to other large east coast cities.',
          lang: 'en',
          cite: {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
          }
        },
        {
          id: 'q6',
          text: 'The telegraph revolutionized the way Congress corresponded with the nation.',
          lang: 'en',
          cite: {
            source: 'house-history-what-hath-god-wrought-telegraph',
            loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
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
            value: { d: '1843-03-03' },
            cites: [
              {
                source: 'house-history-what-hath-god-wrought-telegraph',
                loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '10' }
              },
              {
                source: 'house-history-what-hath-god-wrought-telegraph',
                loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Congress appropriated $30,000 to test the feasibility of creating a telegraph system.',
        lang: 'en',
        cite: {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1844-05-01' },
            cites: [
              {
                source: 'house-history-what-hath-god-wrought-telegraph',
                loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '12' }
              },
              {
                source: 'house-history-what-hath-god-wrought-telegraph',
                loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The first official telegraph signal—announcing that Henry Clay was nominated by the Whig Party Convention (in Baltimore) as its candidate for President—was sent along the incomplete Washington-Baltimore line from Annapolis Junction to the Capitol Building in Washington, D.C.',
        lang: 'en',
        cite: {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1844-05-25' },
            cites: [
              {
                source: 'house-history-what-hath-god-wrought-telegraph',
                loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '16' }
              },
              {
                source: 'house-history-what-hath-god-wrought-telegraph',
                loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The first news dispatch telegram was sent from the Capitol to Baltimore\'s Patriot newspaper announcing that the House had just voted against going into the Committee of the Whole to discuss the Oregon Territory.',
        lang: 'en',
        cite: {
          source: 'house-history-what-hath-god-wrought-telegraph',
          loc: { section: '“What Hath God Wrought” The House and the Telegraph', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.house.gov/Exhibitions-and-Publications/Electronic-Technology/Telegraph/'
        }
      }
    }
  ],
  archive: [
    {
      id: 'morse-letters-1914',
      mediaKind: 'document',
      title: 'Samuel F.B. Morse : his letters and journals',
      date: { d: '1914' },
      url: 'https://archive.org/download/samuelfbmorsehis02mors_1/samuelfbmorsehis02mors_1.pdf',
      page: 'https://archive.org/details/samuelfbmorsehis02mors_1',
      credit: {
        institution: 'Boston Public Library (Internet Archive)',
        creator: 'Samuel Finley Breese Morse'
      },
      license: { id: 'public-domain' },
      bytes: 42228276
    }
  ]
})
