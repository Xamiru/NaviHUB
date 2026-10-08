import { definePerson } from '../../schema'

export default definePerson({
  id: 'douglas-macarthur',
  names: [
    { text: 'Douglas MacArthur', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1880-01-26' },
        cites: [
          {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1964-04-05' },
        cites: [
          {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:little-rock',
    cites: [
      {
        source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
        loc: { section: 'Douglas MacArthur' }
      }
    ]
  },
  diedIn: {
    ref: 'place:washington-dc',
    cites: [
      {
        source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
        loc: { section: 'Douglas MacArthur' }
      }
    ]
  },
  regions: ['north-america', 'east-asia', 'southeast-asia'],
  roles: ['military'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/DouglasMacArthur.jpg/1280px-DouglasMacArthur.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:DouglasMacArthur.jpg',
    credit: { institution: 'National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'led American forces in Pacific campaigns as Supreme Allied Commander, 19411945; was promoted to temporary General of the Army December 1944; received the Medal of Honor for Philippine defense preparations and operations; was appointed Supreme Allied Commander, Japan, 1945',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Douglas MacArthur was born in Little Rock, Arkansas, on 26 January 1880; graduated from the United States Military Academy, 1903',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'upon the North Korean invasion of South Korea, was designated commander, United Nations Command in the Far East, July 1950',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'was relieved of his command by President Truman, April 1951; died in Washington, D.C., on 5 April 1964.',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        }
      ]
    }
  ]
})
