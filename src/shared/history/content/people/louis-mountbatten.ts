import { definePerson } from '../../schema'

export default definePerson({
  id: 'louis-mountbatten',
  names: [
    { text: 'Louis Mountbatten', lang: 'en', role: 'primary' },
    {
      text: 'Earl Mountbatten of Burma',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hansard-commons-1979-10-22-earl-mountbatten-of-burma',
          loc: { section: 'HC Deb 22 October 1979 vol 972 c1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1979-08-27' },
        cites: [
          {
            source: 'hansard-commons-1980-03-04-prevention-of-terrorism',
            loc: { section: 'HC Deb 04 March 1980 vol 980 cc405-37' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'south-asia'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'Viceroy of India',
      polity: 'polity:british-raj',
      start: {
        alts: [
          {
            value: { d: '1947' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Political Impasse and Independence', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1947' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Political Impasse and Independence', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        }
      ]
    },
    {
      title: 'Governor-General of India',
      polity: 'polity:india',
      start: {
        alts: [
          {
            value: { d: '1947' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Political Impasse and Independence', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1948' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Political Impasse and Independence', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Political Impasse and Independence', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Jawaharlal_Nehru_receiving_Louis_Mountbatten%2C_Viceroy-designate%2C_at_Palam_Airport%2C_22_March_1947.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jawaharlal_Nehru_receiving_Louis_Mountbatten,_Viceroy-designate,_at_Palam_Airport,_22_March_1947.jpg',
    credit: { institution: 'Nehru Memorial Museum and Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On June 3, 1947, Viscount Louis Mountbatten, the viceroy (1947) and governor-general (1947-48), announced plans for partition of the British Indian Empire into the nations of India and Pakistan, which itself was divided into east and west wings on either side of India (see fig. 4).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/21.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q2',
          text: 'Earl Mountbatten of Burma, together with members of his family and a family friend, were brutally murdered off the coast of Ireland on 27 August',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1980-03-04-prevention-of-terrorism',
            loc: { section: 'HC Deb 04 March 1980 vol 980 cc405-37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1980/mar/04/prevention-of-terrorism'
          }
        },
        {
          id: 'q3',
          text: 'I wish to inform the House that on the occasion of the death of Earl Mountbatten during the recess I sent a telegram of condolence to Her Majesty on behalf of the House, to which Her Majesty was graciously pleased to reply.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1979-10-22-earl-mountbatten-of-burma',
            loc: { section: 'HC Deb 22 October 1979 vol 972 c1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1979/oct/22/earl-mountbatten-of-burma'
          }
        }
      ]
    }
  ]
})
