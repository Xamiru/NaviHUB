import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-iii-of-russia',
  names: [
    { text: 'Alexander III of Russia', lang: 'en', role: 'primary' },
    { text: 'Александр III', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1845-03-10' },
        cites: [
          {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1894-11-01' },
        cites: [
          {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Russia',
      polity: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1881' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1894' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
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
          text: 'ALEXANDER III. (1845–1894), emperor of Russia, second son of Alexander II., was born on the 10th of March 1845.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'During the first twenty years of his life he had no prospect of succeeding to the throne, because he had an elder brother, Nicholas, who seemed of a fairly robust constitution.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Alexander III. determined to adopt the opposite policy. He at once cancelled the ukaz before it was published, and in the manifesto announcing his accession to the throne he let it be very clearly understood that he had no intention of limiting or weakening the autocratic power which he had inherited from his ancestors.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        },
        {
          id: 'q4',
          text: 'In foreign affairs he was emphatically a man of peace, but not at all a partisan of the doctrine of peace at any price, and he followed the principle that the best means of averting war is to be well prepared for it.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        },
        {
          id: 'q5',
          text: 'He strengthened the security police, reorganizing it into an agency known as the Okhrana, gave it extraordinary powers, and placed it under the Ministry of Internal Affairs.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'He died at Livadia on the 1st of November 1894,',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Alexander_III%2C_Emperor_of_Russia%2C_head-and-shoulders_portrait%2C_facing_right_LCCN99615681.jpg/1280px-Alexander_III%2C_Emperor_of_Russia%2C_head-and-shoulders_portrait%2C_facing_right_LCCN99615681.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alexander_III,_Emperor_of_Russia,_head-and-shoulders_portrait,_facing_right_LCCN99615681.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
