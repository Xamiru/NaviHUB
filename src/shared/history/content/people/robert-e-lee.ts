import { definePerson } from '../../schema'

export default definePerson({
  id: 'robert-e-lee',
  names: [
    { text: 'Robert E. Lee', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1807-01-19' },
        cites: [
          {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1870-10-12' },
        cites: [
          {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:lexington-virginia',
    cites: [
      {
        source: 'britannica-1911-lee-robert-edward',
        loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['military'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Portrait_of_General_Robert_E._Lee%2C_Officer_of_the_Confederate_Army_%281864%29.jpg/1280px-Portrait_of_General_Robert_E._Lee%2C_Officer_of_the_Confederate_Army_%281864%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_General_Robert_E._Lee,_Officer_of_the_Confederate_Army_(1864).jpg',
    credit: { institution: 'Library of Congress', creator: 'Julian Vannerson' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'LEE, ROBERT EDWARD (1807–1870), American soldier, general in the Confederate States army, was the youngest son of major-general Henry Lee, called “Light Horse Harry.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'He was born at Stratford, Westmoreland county, Virginia, on the 19th of January 1807, and entered West Point in 1825.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'General Johnston was wounded at the battle of Fair Oaks (Seven Pines) on the 31st of May 1862, and General Robert E. Lee was assigned to the command of the famous Army of Northern Virginia which for the next three years “carried the rebellion on its bayonets.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        },
        {
          id: 'q4',
          text: 'But the steady pressure of his unrelenting opponent slowly wore down his strength.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        },
        {
          id: 'q5',
          text: 'At Appomattox Court House, on the 9th of April, the career of the Army of Northern Virginia came to an end.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'For a few months Lee lived quietly in Powhatan county, making his formal submission to the Federal authorities and urging on his own people acceptance of the new conditions.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'In August he was offered, and accepted, the presidency of Washington College, Lexington (now Washington and Lee University), a post which he occupied until his death on the 12th of October 1870',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lee-robert-edward',
            loc: { section: 'LEE, ROBERT EDWARD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lee,_Robert_Edward'
          }
        }
      ]
    }
  ]
})
