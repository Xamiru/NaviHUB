import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'seneca-falls-convention',
  names: [
    { text: 'Seneca Falls Convention', lang: 'en', role: 'primary' },
    {
      text: 'First Women\'s Rights Convention',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nps-wori-first-womens-rights-convention',
          loc: { section: 'The First Women\'s Rights Convention', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1848-07-19' },
        cites: [
          {
            source: 'nps-wori-first-womens-rights-convention',
            loc: { section: 'The First Women\'s Rights Convention', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1848-07-20' },
        cites: [
          {
            source: 'nps-wori-first-womens-rights-convention',
            loc: { section: 'The First Women\'s Rights Convention', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:seneca-falls',
      cites: [
        {
          source: 'nps-wori-first-womens-rights-convention',
          loc: { section: 'The First Women\'s Rights Convention', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Elizabeth Cady Stanton',
      role: 'organizer',
      cites: [
        {
          source: 'nps-wori-first-womens-rights-convention',
          loc: { section: 'The First Women\'s Rights Convention', para: '3' }
        }
      ]
    },
    {
      name: 'Lucretia Mott',
      role: 'participant',
      cites: [
        {
          source: 'nps-wori-first-womens-rights-convention',
          loc: { section: 'The First Women\'s Rights Convention', para: '2' }
        }
      ]
    },
    {
      name: 'Frederick Douglass',
      role: 'participant',
      cites: [
        {
          source: 'nps-wori-first-womens-rights-convention',
          loc: { section: 'The First Women\'s Rights Convention', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 300, qualifier: 'about' },
            cites: [
              {
                source: 'nps-wori-first-womens-rights-convention',
                loc: { section: 'The First Women\'s Rights Convention', para: '2' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The park commemorates women\'s struggle for equal rights, and the First Women\'s Rights Convention, held at the Wesleyan Chapel in Seneca Falls, NY on July 19 and 20, 1848.',
          lang: 'en',
          cite: {
            source: 'nps-wori-first-womens-rights-convention',
            loc: { section: 'The First Women\'s Rights Convention', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/the-first-womens-rights-convention.htm'
          }
        },
        {
          id: 'q2',
          text: 'An estimated three hundred women and men attended the Convention, including Lucretia Mott and Frederick Douglass.',
          lang: 'en',
          cite: {
            source: 'nps-wori-first-womens-rights-convention',
            loc: { section: 'The First Women\'s Rights Convention', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/the-first-womens-rights-convention.htm'
          }
        },
        {
          id: 'q3',
          text: 'At the conclusion, 68 women and 32 men signed the Declaration of Sentiments drafted by Elizabeth Cady Stanton and the M\'Clintock family.',
          lang: 'en',
          cite: {
            source: 'nps-wori-first-womens-rights-convention',
            loc: { section: 'The First Women\'s Rights Convention', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/the-first-womens-rights-convention.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'We hold these truths to be self-evident; that all men and women are created equal; that they are endowed by their Creator with certain inalienable rights; that among these are life, liberty, and the pursuit of happiness;',
          lang: 'en',
          cite: {
            source: 'nps-wori-declaration-of-sentiments',
            loc: { section: 'Declaration of Sentiments', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm'
          }
        },
        {
          id: 'q5',
          text: 'The history of mankind is a history of repeated injuries and usurpations on the part of man toward woman, having in direct object the establishment of an absolute tyranny over her.',
          lang: 'en',
          cite: {
            source: 'nps-wori-declaration-of-sentiments',
            loc: { section: 'Declaration of Sentiments', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm'
          }
        },
        {
          id: 'q6',
          text: 'He has never permitted her to exercise her inalienable right to the elective franchise.',
          lang: 'en',
          cite: {
            source: 'nps-wori-declaration-of-sentiments',
            loc: { section: 'Declaration of Sentiments', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm'
          }
        },
        {
          id: 'q7',
          text: 'Now, in view of this entire disfranchisement of one-half the people of this country, their social and religious degradation, - in view of the unjust laws above mentioned, and because women do feel themselves aggrieved, oppressed, and fraudulently deprived of their most sacred rights, we insist that they have immediate admission to all the rights and privileges which belong to them as citizens of these United States.',
          lang: 'en',
          cite: {
            source: 'nps-wori-declaration-of-sentiments',
            loc: { section: 'Declaration of Sentiments', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/ElizabethCadyStanton-1848-Daniel-Henry.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:ElizabethCadyStanton-1848-Daniel-Henry.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
