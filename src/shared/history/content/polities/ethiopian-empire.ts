import { definePolity } from '../../schema'

export default definePolity({
  id: 'ethiopian-empire',
  names: [
    { text: 'Ethiopian Empire', lang: 'en', role: 'primary' },
    { text: 'የኢትዮጵያ ንጉሠ ነገሥት መንግሥት', lang: 'am', role: 'native' },
    {
      text: 'Ethiopia',
      lang: 'en',
      role: 'official',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '1' } }
      ]
    },
    {
      text: 'Abyssinia',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1855-02' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reestablishment of the Ethiopian Monarchy', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1974-09-12' },
        cites: [
          {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Establishment of the Derg', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:addis-ababa',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Reign of Menelik II, 1889-1913', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 207521 },
    { set: 'world', code: 530, to: 1974.7 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Menelik_II_in_coronation_garb%2C_Emperor_of_Ethiopia.jpg/1280px-Menelik_II_in_coronation_garb%2C_Emperor_of_Ethiopia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Menelik_II_in_coronation_garb,_Emperor_of_Ethiopia.jpg',
    credit: { institution: 'Richard Pankhurst, Ethiopia Photographed' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ABYSSINIA (officially Ethiopia), an inland country and empire of N.E. Africa lying, chiefly, between 5° and 15° N. and 35° and 42° E.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        },
        {
          id: 'q2',
          text: 'In 1854 he assumed the title negus (king), and in February 1855 the head of the church crowned him Tewodros II.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reestablishment of the Ethiopian Monarchy', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'By 1900 Menelik had succeeded in establishing control over much of present-day Ethiopia and had, in part at least, gained recognition from the European colonial powers of the boundaries of his empire.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q4',
          text: 'His decision in the late 1880s to locate the royal encampment at Addis Ababa ("New Flower") in southern Shewa led to the gradual rise of a genuine urban center and a permanent capital in the 1890s, a development that facilitated the introduction of new ideas and technology.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q5',
          text: 'As emperor, Haile Selassie continued to push reforms aimed at modernizing the country and breaking the nobility\'s authority.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Haile Selassie: The Prewar Period, 1930-36', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/17.htm' }
        },
        {
          id: 'q6',
          text: 'Determined to provoke a casus belli, the Mussolini regime began deliberately exploiting the minor provocations that arose in its relations with Ethiopia.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Mussolini\'s Invasion and the Italian Occupation', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/19.htm' }
        },
        {
          id: 'q7',
          text: 'Whatever his intentions as a reformer, Haile Selassie was a political realist and recognized that, lacking a strong military, he had to compromise with the Amhara and Tigray nobility and with the church.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'Administrative Change and the 1955 Constitution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/22.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'After street demonstrations took place urging the emperor\'s arrest, the Derg formally deposed Haile Selassie on September 12 and imprisoned him.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Establishment of the Derg', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/28.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'bahru-zewde-1991-a-history-of-modern-ethiopia', perspective: 'african' }
  ]
})
