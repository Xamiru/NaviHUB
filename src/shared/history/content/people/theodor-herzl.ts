import { definePerson } from '../../schema'

export default definePerson({
  id: 'theodor-herzl',
  names: [
    { text: 'Theodor Herzl', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1860-05-02' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '3' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:budapest',
    cites: [
      {
        source: 'loc-israel-country-study-1988',
        loc: { section: 'Political Zionism', para: '3' }
      }
    ]
  },
  regions: ['europe', 'mena'],
  roles: ['journalist', 'writer', 'activist'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'The impetus to the founding of a Zionist organization with specific goals was provided by Theodor Herzl.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q2',
          text: 'Born in Budapest on May 2, 1860, Herzl grew up in an environment of assimilation.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'Herzl put forth his solution to the Jewish problem in Der Judenstaat (The Jewish State) published in 1896.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q4',
          text: 'He called for the establishment of a Jewish state in any available territory to which the majority of European Jewry would immigrate.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Herzl\'s ideas were not original, his belief that the Great Powers would cooperate in the Zionist enterprise was naive, and his indifference to the final location of the Jewish state was far removed from the desires of the bulk of the Jewish people residing in the Pale of Settlement.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q6',
          text: 'What he accomplished, however, was to cultivate the first seeds of the Zionist movement and to bestow upon the movement a mantle of legitimacy.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Herzl_on_a_balcony_full.jpg/1280px-Herzl_on_a_balcony_full.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Herzl_on_a_balcony_full.jpg',
    credit: { institution: 'Center for Jewish History', creator: 'Ephraim Moses Lilien' },
    license: { id: 'public-domain' }
  }
})
