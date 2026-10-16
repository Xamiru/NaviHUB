import { definePerson } from '../../schema'

export default definePerson({
  id: 'andrew-jackson',
  names: [
    { text: 'Andrew Jackson', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1767-03-15' },
        cites: [
          {
            source: 'britannica-1911-jackson-andrew',
            loc: { section: 'JACKSON, ANDREW', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1845-06-08' },
        cites: [
          {
            source: 'britannica-1911-jackson-andrew',
            loc: { section: 'JACKSON, ANDREW', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['politician', 'military'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1829' },
            cites: [
              {
                source: 'state-dept-milestones-indian-treaties',
                loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1837' },
            cites: [
              {
                source: 'state-dept-milestones-indian-treaties',
                loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'state-dept-milestones-indian-treaties',
          loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '7' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'JACKSON, ANDREW (1767–1845), seventh president of the United States, was born on the 15th of March 1767, at the Waxhaw or Warsaw settlement, in Union county, North Carolina, or in Lancaster county, South Carolina, whither his parents had immigrated from Carrickfergus, Ireland, in 1765.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-jackson-andrew',
            loc: { section: 'JACKSON, ANDREW', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Jackson,_Andrew'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In 1814, Major General Andrew Jackson led an expedition against the Creek Indians climaxing in the Battle of Horse Shoe Bend (in present day Alabama near the Georgia border), where Jackson’s force soundly defeated the Creeks and destroyed their military power.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q2',
          text: 'Over the next decade, Jackson led the way in the Indian removal campaign, helping to negotiate nine of the eleven major treaties to remove Indians.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        },
        {
          id: 'q3',
          text: 'When Andrew Jackson became president (1829–1837), he decided to build a systematic approach to Indian removal on the basis of these legal precedents.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-indian-treaties',
            loc: { section: 'Indian Treaties and the Removal Act of 1830', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/indian-treaties'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: 'What good man would prefer a country covered with forests and ranged by a few thousand savages to our extensive Republic, studded with cities, towns, and prosperous farms embellished with all the improvements which art can devise or industry execute, occupied by more than 12,000,000 happy people, and filled with all the blessings of liberty, civilization and religion?',
          lang: 'en',
          cite: {
            source: 'nara-milestone-jackson-message-indian-removal',
            loc: { section: 'Transcript: Andrew Jackson\'s Annual Message', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/jacksons-message-to-congress-on-indian-removal'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Ralph_Eleaser_Whiteside_Earl_-_Andrew_Jackson_-_Smithsonian.jpg/1280px-Ralph_Eleaser_Whiteside_Earl_-_Andrew_Jackson_-_Smithsonian.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ralph_Eleaser_Whiteside_Earl_-_Andrew_Jackson_-_Smithsonian.jpg',
    credit: { institution: 'Smithsonian American Art Museum', creator: 'Ralph Eleaser Whiteside Earl' },
    license: { id: 'public-domain' }
  }
})
