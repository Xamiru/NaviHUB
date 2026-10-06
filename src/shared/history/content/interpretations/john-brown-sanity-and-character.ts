import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'john-brown-sanity-and-character',
  about: ['event:john-browns-raid', 'person:john-brown'],
  topic: 'character',
  researched: '2026-10-06',
  positions: [
    {
      id: 'insane-effort',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'The Liberator' },
        { kind: 'media', name: 'Northern newspapers' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Even the Liberator called it "a misguided, wild, and apparently insane--effort."',
          lang: 'en',
          cite: {
            source: 'thoreau-1859-plea-for-captain-john-brown',
            loc: { section: 'A Plea for Captain John Brown', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/thoreau_001.asp'
          }
        }
      ]
    },
    {
      id: 'saner-sanity',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Henry David Thoreau' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'I have no respect for the penetration of any man who can read the report of that conversation, and still call the principal in it insane.',
          lang: 'en',
          cite: {
            source: 'thoreau-1859-plea-for-captain-john-brown',
            loc: { section: 'A Plea for Captain John Brown', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/thoreau_001.asp'
          }
        },
        {
          id: 'q3',
          text: 'It has the ring of a saner sanity than an ordinary discipline and habits of life, than an ordinary organization, secure.',
          lang: 'en',
          cite: {
            source: 'thoreau-1859-plea-for-captain-john-brown',
            loc: { section: 'A Plea for Captain John Brown', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/thoreau_001.asp'
          }
        }
      ]
    },
    {
      id: 'brown-in-court',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Brown', ref: 'person:john-brown' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In the first place, I deny everything but what I have all along admitted, of a design on my part to free slaves.',
          lang: 'en',
          cite: {
            source: 'avalon-life-trial-execution-of-john-brown',
            loc: { section: 'Life, Trial and Execution of Captain John Brown', para: '1033' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/john_brown.asp'
          }
        },
        {
          id: 'q5',
          text: 'I never did intend murder or treason, or the destruction of property, or to excite or incite the slaves to rebellion, or to make insurrection.',
          lang: 'en',
          cite: {
            source: 'avalon-life-trial-execution-of-john-brown',
            loc: { section: 'Life, Trial and Execution of Captain John Brown', para: '1033' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/john_brown.asp'
          }
        }
      ]
    },
    {
      id: 'cause-of-disunion',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'A contemporary newspaper' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'A contemporary newspaper account foretold a grim future. "The Harpers Ferry invasion has advanced the cause of disunion more than any other event that has happened since the formation of the Government."',
          lang: 'en',
          cite: { source: 'nps-john-browns-raid', loc: { section: 'John Brown\'s Raid' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/john-browns-raid.htm'
          }
        }
      ]
    }
  ]
})
