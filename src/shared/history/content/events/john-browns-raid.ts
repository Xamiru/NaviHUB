import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'john-browns-raid',
  names: [
    { text: 'John Brown\'s raid on Harpers Ferry', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1859-10-16' },
        cites: [
          { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1859-10-18' },
        cites: [
          { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:harpers-ferry',
      cites: [
        { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
      ]
    }
  ],
  sides: [
    {
      key: 'raiders',
      name: 'Brown\'s Army',
      cites: [
        { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } }
      ]
    },
    {
      key: 'us',
      name: 'U.S. Marines',
      cites: [
        { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:john-brown',
      role: 'leader',
      side: 'raiders',
      cites: [
        { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
      ]
    },
    {
      name: 'Robert E. Lee',
      role: 'commander',
      side: 'us',
      cites: [
        { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'raiders',
      value: {
        alts: [
          {
            value: { min: 21 },
            cites: [
              { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 16 },
            cites: [
              { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:kansas-nebraska-act',
      rel: 'caused-by',
      cites: [
        { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On the night of October 16, 1859, John Brown and 21 followers captured the U.S. Armory, Arsenal and Rifle Factory at Harpers Ferry. He called it a “trumpet blast” that would lead to an extended mountain campaign in the slave states and make “property in slaves insecure.”',
          lang: 'en',
          cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
        },
        {
          id: 'q2',
          text: 'Brown’s so-called raid only lasted 36 hours.',
          lang: 'en',
          cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
        },
        {
          id: 'q3',
          text: 'Sixteen people were killed in the raid, including ten of Brown\'s men.',
          lang: 'en',
          cite: { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/john-browns-raid.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Faced with charges of murder, conspiring with enslaved people to rebel and treason against the state of Virginia, John Brown\'s trial began October 27 and lasted just five days. Jurors took only 45 minuts to reach a decision — guilty of all charges. On November 2 Brown was sentenced to hang on the gallows. All six of Brown\'s captured men were tried and hanged. Five escaped.',
          lang: 'en',
          cite: { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/john-browns-raid.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Hope of compromise between the North and South slipped.',
          lang: 'en',
          cite: { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/john-browns-raid.htm'
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
            value: { d: '1859-10-18' },
            cites: [
              { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Brown was captured on October 18, 1859, by a detachment of U.S. Marines under the command of Army Colonel Robert E. Lee.',
        lang: 'en',
        cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1859-12-02' },
            cites: [
              { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Brown was executed December 2, 1859.',
        lang: 'en',
        cite: { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/articles/john-browns-raid.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/John_brown_interior_engine_house.jpg/1280px-John_brown_interior_engine_house.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:John_brown_interior_engine_house.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'dewitt-1859',
      mediaKind: 'document',
      title: 'The life, trial, and execution of Captain John Brown, known as "Old Brown of Ossawatomie" : with a full account of the attempted insurrection at Harper\'s Ferry : compiled from official and authentic sources, including Cooke\'s confession, and all the incidents of the execution',
      date: { d: '1859' },
      url: 'https://archive.org/download/lifetrialexecuti00dewi/lifetrialexecuti00dewi.pdf',
      page: 'https://archive.org/details/lifetrialexecuti00dewi',
      credit: {
        institution: 'Lincoln Financial Foundation Collection (Internet Archive)',
        creator: 'R. M. De Witt'
      },
      license: { id: 'public-domain' },
      bytes: 11656576
    }
  ]
})
