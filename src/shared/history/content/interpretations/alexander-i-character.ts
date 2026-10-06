import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'alexander-i-character',
  about: ['person:alexander-i-of-russia'],
  topic: 'character',
  researched: '2026-10-06',
  positions: [
    {
      id: 'chateaubriand-dissimulator',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Chateaubriand' }
      ],
      statements: [
        {
          id: 'q1',
          text: '“Alexander was sincere when it came to his own humanity, but he was a dissimulator […] in all things related to politics.”',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-ley-alexander-i',
            loc: { section: 'Alexander I', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/alexander-i/'
          }
        }
      ]
    },
    {
      id: 'intellectual-liberalism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Francis Ley' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'But his liberalism was essentially an intellectual idea which, faced with the political reality, was not determining enough to make him abandon any of his absolute power.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-ley-alexander-i',
            loc: { section: 'Alexander I', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/alexander-i/'
          }
        }
      ]
    },
    {
      id: 'romantic-mystic',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Groomed for the throne by Catherine II and raised in the spirit of enlightenment, Alexander also had an inclination toward romanticism and religious mysticism, particularly in the latter period of his reign.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q4',
          text: 'The brilliant statesman Mikhail Speranskiy, who was the tsar\'s chief adviser early in his reign, proposed an extensive constitutional reform of the government, but Alexander dismissed him in 1812 and lost interest in reform.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ]
})
