import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'napoleon-legacy',
  about: ['person:napoleon-bonaparte'],
  topic: 'legacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'restored-slavery',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The betrayal of Toussaint and Bonaparte\'s restoration of slavery in Martinique undermined the collaboration of leaders such as Dessalines, Christophe, and Pétion.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      id: 'ideas-carried-home',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Young officers who had pursued Napoleon into Western Europe came back to Russia with revolutionary ideas, including human rights, representative government, and mass democracy.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      id: 'lasting-reforms',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Despite Napoleon\'s defeat, some of the changes he had brought to Germany during the French occupation were retained. Public administration was improved, feudalism was weakened, the power of the trade guilds was reduced, and the Napoleonic Code replaced traditional legal codes in many areas.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    },
    {
      id: 'circumstance-not-ambition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John Holland Rose' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Emperor was brought by stress of circumstances, rather than by mere ambition, as we islanders usually assert,',
          lang: 'en',
          cite: {
            source: 'holland-rose-1905-true-significance-of-trafalgar',
            loc: { section: 'The true significance of Trafalgar', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/rose_trafalgar.asp'
          }
        }
      ]
    }
  ]
})
