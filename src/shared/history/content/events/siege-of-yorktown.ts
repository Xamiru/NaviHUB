import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-yorktown',
  names: [
    { text: 'Siege of Yorktown', lang: 'en', role: 'primary' },
    {
      text: 'Surrender at Yorktown',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1781-09-28' },
        cites: [
          { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1781-10-19' },
        cites: [
          { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
          {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '87' }
          }
        ]
      },
      {
        value: { d: '1781-10-10' },
        cites: [
          {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '1' }
          }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica, 11th edition (article on the American War of Independence)'
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:yorktown',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'allies',
      name: 'American and French allies',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
      ]
    },
    {
      key: 'britain',
      name: 'Great Britain',
      polity: 'polity:kingdom-of-great-britain',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:george-washington',
      role: 'commander',
      side: 'allies',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '87' }
        }
      ]
    },
    {
      name: 'Lord Cornwallis',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
      ]
    }
  ],
  figures: [
    {
      key: 'prisoners',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 7073 },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 156, qualifier: 'about' },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 326, qualifier: 'about' },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'allies',
      value: {
        alts: [
          {
            value: { min: 85 },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'allies',
      value: {
        alts: [
          {
            value: { min: 199 },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:american-revolutionary-war',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In grave danger of an assault from the allies, Cornwallis offered to surrender on the 17th; two days later his whole army, consisting of 7073 officers and men, was surrendered, and American Independence was practically assured.',
          lang: 'en',
          cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Cornwallis seized Yorktown and Gloucester early in August and immediately began to fortify them.',
          lang: 'en',
          cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
          }
        },
        {
          id: 'q3',
          text: 'Leaving only about 4000 men to guard the forts on the Hudson, Washington set out for Virginia with the remainder of his army immediately after learning of De Grasse\'s plan, and the French land forces followed.',
          lang: 'en',
          cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'The British loss during the siege was about 156 killed and 326 wounded; the American and French losses were 85 killed and 199 wounded.',
          lang: 'en',
          cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
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
            value: { d: '1781-09-28' },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The French fleet transported the allied army from the head of the Chesapeake to the vicinity of Williamsburg, and on the 28th of September it marched to Yorktown.',
        lang: 'en',
        cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1781-10-05' },
            cites: [
              { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On the night of October 5th—6th the allies opened the first parallel about 600 yds. from the British works, and extending from a deep ravine on the N.W. to the river bank on the S.E., a distance of nearly 2 m.',
        lang: 'en',
        cite: { source: 'britannica-1911-yorktown', loc: { section: 'Yorktown', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Yorktown'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/John_Trumbull_-_The_Surrender_of_Lord_Cornwallis_at_Yorktown%2C_October_19%2C_1781_-_1832.4_-_Yale_University_Art_Gallery.jpg/1280px-John_Trumbull_-_The_Surrender_of_Lord_Cornwallis_at_Yorktown%2C_October_19%2C_1781_-_1832.4_-_Yale_University_Art_Gallery.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:John_Trumbull_-_The_Surrender_of_Lord_Cornwallis_at_Yorktown,_October_19,_1781_-_1832.4_-_Yale_University_Art_Gallery.jpg',
    credit: { institution: 'Yale University Art Gallery', creator: 'John Trumbull' },
    license: { id: 'public-domain' }
  }
})
