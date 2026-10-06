import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-abraham-lincoln',
  names: [
    { text: 'Assassination of Abraham Lincoln', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1865-04-14' },
        cites: [
          {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '5' }
          },
          {
            source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
            loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:fords-theatre',
      cites: [
        {
          source: 'nps-foth-faq-the-assassination',
          loc: { section: 'Frequently Asked Questions: The Assassination', para: '5' }
        }
      ]
    },
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '144' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:american-civil-war', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:abraham-lincoln',
      role: 'victim',
      cites: [
        {
          source: 'nps-foth-faq-the-assassination',
          loc: { section: 'Frequently Asked Questions: The Assassination', para: '5' }
        }
      ]
    },
    {
      name: 'John Wilkes Booth',
      role: 'perpetrator',
      cites: [
        {
          source: 'nps-foth-faq-the-assassination',
          loc: { section: 'Frequently Asked Questions: The Assassination', para: '5' }
        }
      ]
    },
    {
      name: 'William H. Seward',
      role: 'victim',
      cites: [
        {
          source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
          loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
        }
      ]
    },
    {
      name: 'Robert King Stone',
      role: 'witness',
      cites: [
        {
          source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
          loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
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
          text: 'On April 14th, 1865, famous actor and Confederate sympathizer John Wilkes Booth assassinated President Abraham Lincoln at Ford\'s Theatre.',
          lang: 'en',
          cite: {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/foth/learn/historyculture/faq-the-assassination.htm'
          }
        },
        {
          id: 'q2',
          text: 'On April 14, 1865, at approximately 10:20 p.m., John Wilkes Booth, a prominent American actor, snuck up behind President Abraham Lincoln as he watched a play at Ford’s Theater, and shot him in the back of the head at point-blank range. The President was carried across the street to a private home where he died early the following morning. Booth, pursued by Union soldiers for twelve days through southern Maryland and Virginia, died of a gunshot wound on April 26 after refusing to surrender to Federal troops.',
          lang: 'en',
          cite: {
            source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
            loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/exhibits/eyewitness/html.php?section=13'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'John Wilkes Booth shot President Lincoln during Act 3, Scene 2 of the play, about 10:15 pm.',
          lang: 'en',
          cite: {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/foth/learn/historyculture/faq-the-assassination.htm'
          }
        },
        {
          id: 'q4',
          text: '“I proceeded then to examine him, and instantly found that the President had received a gun shot wound in the back part of the left side of his head, into which I carried immediately my finger. I at once informed those around that the case was a hopeless one; that the President would die; that there was no positive limit to the duration of his life, that his vital tenacity was very strong, and he would resist as long as any man could, but that death certainly would soon close the scene.”',
          lang: 'en',
          cite: {
            source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
            loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/exhibits/eyewitness/html.php?section=13'
          }
        },
        {
          id: 'q5',
          text: 'The murder of President Lincoln was part of a larger conspiracy that included a simultaneous attack on Secretary of State William H. Seward and the possible targeting of Vice President Andrew Johnson. Assuming the Presidency after Lincoln’s death, President Johnson considered the crime a military one, and he ordered that the eight accused conspirators be tried before a military commission.',
          lang: 'en',
          cite: {
            source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
            loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/exhibits/eyewitness/html.php?section=13'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The Secret Service was not assigned to protect the president until after the 1901 assassination of President William McKinley.',
          lang: 'en',
          cite: {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/foth/learn/historyculture/faq-the-assassination.htm'
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
            value: { d: '1865-04-15' },
            cites: [
              {
                source: 'nps-foth-faq-the-assassination',
                loc: { section: 'Frequently Asked Questions: The Assassination', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The President died the following morning at 7:22 a.m.',
        lang: 'en',
        cite: {
          source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
          loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/exhibits/eyewitness/html.php?section=13'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-04-15' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '145' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'April 15, 1865- Vice President Andrew Johnson is sworn in as 17th President of the United States.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '145' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/The_assassination_of_President_Lincoln-_at_Ford%27s_Theatre%2C_Washington%2C_D.C.%2C_April_14th%2C_1865_LCCN90708801.jpg/1280px-The_assassination_of_President_Lincoln-_at_Ford%27s_Theatre%2C_Washington%2C_D.C.%2C_April_14th%2C_1865_LCCN90708801.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_assassination_of_President_Lincoln-_at_Ford%27s_Theatre,_Washington,_D.C.,_April_14th,_1865_LCCN90708801.jpg',
    credit: { institution: 'Library of Congress', creator: 'Currier & Ives' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'pitman-trial-of-the-conspirators-1865',
      mediaKind: 'document',
      title: 'The assassination of President Lincoln and the trial of the conspirators',
      date: { d: '1865' },
      url: 'https://archive.org/download/assaspreslincoln00herorich/assaspreslincoln00herorich.pdf',
      page: 'https://archive.org/details/assaspreslincoln00herorich',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Benn Pitman'
      },
      license: { id: 'public-domain' },
      bytes: 52905588
    }
  ]
})
