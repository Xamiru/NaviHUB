import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'war-of-1812',
  names: [
    { text: 'War of 1812', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1812-06-18' },
        cites: [
          {
            source: 'nara-1812-declaration-of-war',
            loc: {
              section: '1812: Congress\'s First Declaration of War Under the Constitution, Documents'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1814-12-24' },
        cites: [
          {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '5' }
          },
          {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'nara-milestone-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent (1814)', para: '3' }
        }
      ]
    },
    {
      ref: 'place:baltimore',
      cites: [
        {
          source: 'state-dept-milestones-war-of-1812',
          loc: { section: 'War of 1812–1815', para: '4' }
        }
      ]
    },
    {
      ref: 'place:new-orleans',
      cites: [
        {
          source: 'nara-milestone-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent (1814)', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-war-of-1812',
          loc: { section: 'War of 1812–1815', para: '4' }
        }
      ]
    },
    {
      key: 'uk',
      name: 'Great Britain',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'state-dept-milestones-war-of-1812',
          loc: { section: 'War of 1812–1815', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'James Madison',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-war-of-1812',
          loc: { section: 'War of 1812–1815', para: '3' }
        }
      ]
    },
    {
      ref: 'person:andrew-jackson',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'nara-milestone-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent (1814)', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:treaty-of-ghent', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q11',
          text: 'This "Treaty of Peace and Amity Between the United States and Great Britain" was signed on December 24, 1814. It ended the War of 1812, fought between Great Britain and the United States.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        },
        {
          id: 'q1',
          text: 'As an important neutral trading nation, the United States became ensnarled in the European conflict that pitted Napoleonic France against Great Britain and her continental allies.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        },
        {
          id: 'q2',
          text: 'Shortly afterward, Congress, despite the opposition of every Federalist, approved the declaration.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The War of 1812 produced a string of American military disasters.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
          }
        },
        {
          id: 'q4',
          text: 'After Napoleon’s disastrous Russian campaign of 1812, the British concentrated on the American continent, enacting a crippling blockading of the east coast, attacking Washington and burning the White House and other Government buildings, and acquiring territory in Maine and the Great Lakes region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        },
        {
          id: 'q5',
          text: 'American forces, however, won important naval and military victories at sea, on Lake Champlain, and at Baltimore and Detroit. Canadians defeated an American invasion of Lower Canada.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        },
        {
          id: 'q6',
          text: 'By 1814 neither side could claim a clear victory and both war weary combatants looked to a peaceful settlement.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-war-of-1812',
            loc: { section: 'War of 1812–1815', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'News of the treaty spread slowly, and word of peace did not reach the American and British armies for some time.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-treaty-of-ghent',
            loc: { section: 'Treaty of Ghent (1814)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
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
            value: { d: '1812-06-01' },
            cites: [
              {
                source: 'state-dept-milestones-war-of-1812',
                loc: { section: 'War of 1812–1815', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Madison made the issue of impressment from ships under the American flag a matter of national sovereignty—even after the British agreed to end the practice—and asked Congress for a declaration of War on Great Britain on June 1, 1812.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-war-of-1812',
          loc: { section: 'War of 1812–1815', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1801-1829/war-of-1812'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1814-08-24', notAfter: '1814-08-25' },
            cites: [
              {
                source: 'nara-milestone-treaty-of-ghent',
                loc: { section: 'Treaty of Ghent (1814)', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The most shocking of these was the British Army’s burning of the Capitol, the President’s house, and other public buildings in Washington on August 24 and 25, 1814.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent (1814)', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-01-08' },
            cites: [
              {
                source: 'nara-milestone-treaty-of-ghent',
                loc: { section: 'Treaty of Ghent (1814)', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'American forces, led by Andrew Jackson, won the Battle of New Orleans on January 8, 1815, ending the hostilities after the official peace.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-treaty-of-ghent',
          loc: { section: 'Treaty of Ghent (1814)', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/treaty-of-ghent'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Capture_and_burning_of_Washington_by_the_British%2C_in_1814_LCCN96519729.jpg/1280px-Capture_and_burning_of_Washington_by_the_British%2C_in_1814_LCCN96519729.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Capture_and_burning_of_Washington_by_the_British,_in_1814_LCCN96519729.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
