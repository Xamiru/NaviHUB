import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'abu-ghraib-detainee-abuse-responsibility',
  about: ['event:iraq-war'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'Since late April 2004, when the first photographs appeared of U.S. military personnel humiliating, torturing, and otherwise mistreating detainees at Abu Ghraib prison in Iraq, the United States government has repeatedly sought to portray the abuse as an isolated incident, the work of a few “bad apples” acting without orders.',
    lang: 'en',
    cite: {
      source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
      loc: { section: 'The Road to Abu Ghraib: Introduction' }
    },
    provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/reports/2004/usa0604/1.htm' }
  },
  positions: [
    {
      id: 'us-defense-secretary-isolated-acts-by-a-few',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Donald Rumsfeld' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'On May 4, U.S. Secretary of Defense Donald H. Rumsfeld, in a formulation that would be used over and over again by U.S. officials, described the abuses at Abu Ghraib as “an exceptional, isolated” case.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
            loc: { section: 'The Road to Abu Ghraib: Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/reports/2004/usa0604/1.htm'
          }
        },
        {
          id: 'q3',
          text: 'In a nationally televised address on May 24, President George W. Bush spoke of “disgraceful conduct by a few American troops who dishonored our country and disregarded our values.”',
          lang: 'en',
          cite: {
            source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
            loc: { section: 'The Road to Abu Ghraib: Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/reports/2004/usa0604/1.htm'
          }
        },
        {
          id: 'q4',
          text: 'The Bush administration has denied having a policy to torture or abuse detainees.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
            loc: { section: 'The Road to Abu Ghraib: Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/reports/2004/usa0604/1.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Detainees in U.S. custody in Afghanistan have testified that they experienced treatment similar to what happened in Abu Ghraib -- from beatings to prolonged sleep and sensory deprivation to being held naked -- as early as 2002.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
            loc: { section: 'The Road to Abu Ghraib: Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/reports/2004/usa0604/1.htm'
          }
        },
        {
          id: 'q6',
          text: 'Third, until the publication of the Abu Ghraib photographs forced action, Bush administration officials took at best a “see no evil, hear no evil” approach to all reports of detainee mistreatment.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
            loc: { section: 'The Road to Abu Ghraib: Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/reports/2004/usa0604/1.htm'
          }
        }
      ]
    },
    {
      id: 'hrw-decisions-made-by-the-administration',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The disturbing information coming to light points to an official policy of torture and cruel, inhuman or degrading treatment.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-06-the-road-to-abu-ghraib-introduction',
            loc: { section: 'The Road to Abu Ghraib: Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/reports/2004/usa0604/1.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
