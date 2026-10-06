import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'balfour-declaration-motives',
  about: ['event:balfour-declaration'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'strategic-and-propaganda',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Maryanne A. Rhett' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In the new British strategic thinking, the Zionists appeared as a potential ally capable of safeguarding British imperial interests in the region.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/14.htm' }
        },
        {
          id: 'q2',
          text: 'The propaganda qualities Zionism appeared to offer garnered support among officials who might not have been swayed by purely ideological considerations.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Political Zionism', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        }
      ]
    },
    {
      id: 'christian-zionism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Maryanne A. Rhett' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Christian Zionism can be easily overstated as a rationale for the Declaration’s issuance, however, and is only one of the factors that led politicians to consider a pro-Zionist statement.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'The Politics of Christian Zionism', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        },
        {
          id: 'q4',
          text: 'Finally, both Lloyd George and Balfour were devout churchgoers who attached great religious significance to the proposed reinstatement of the Jews in their ancient homeland.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/14.htm' }
        }
      ]
    },
    {
      id: 'zionist-diplomacy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Maryanne A. Rhett' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The Declaration, however much desired or detested by British officials, was not ultimately their idea.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Political Zionism', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        }
      ]
    },
    {
      id: 'hypocrisy-anti-zionist',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Edwin Montagu' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'For him, for the government to espouse political Zionism as an admirable and defensible nationalist sentiment, was inherently hypocritical when at the same time that same government jailed Irish and Indian nationalists for championing a similar ideology.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Drafting the Declaration', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        }
      ]
    },
    {
      id: 'national-home-means-state',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Curzon' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Continuing, Curzon stated, “I feel tolerably sure therefore that Weizmann may say one thing to you or while you may mean one thing by a National Home, he is out for something quite different. He contemplates a Jewish State.”',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Drafting the Declaration', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        }
      ]
    }
  ]
})
