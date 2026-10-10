import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'united-states-invasion-of-grenada-legitimacy',
  about: ['event:united-states-invasion-of-grenada'],
  topic: 'naming',
  framing: {
    id: 'q1',
    text: 'In the late 1980s, it appeared that the United States-Grenadian relationship would continue to be shaped and defined by the events of October 1983.',
    lang: 'en',
    cite: {
      source: 'loc-caribbean-islands-country-study-1987',
      loc: { section: 'Grenada: Relations with the United States', para: '5' }
    },
    provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/caribbean-islands/82.htm' }
  },
  positions: [
    {
      id: 'united-states-reagan-address',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Ronald Reagan', ref: 'person:ronald-reagan' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Last weekend, I was awakened in the early morning hours and told that six members of the Organization of Eastern Caribbean States, joined by Jamaica and Barbados, had sent an urgent request that we join them in a military operation to restore order and democracy to Grenada.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1983-10-27-address-to-the-nation-on-events-in-lebanon-and-grenada',
            loc: { section: 'Address to the Nation on Events in Lebanon and Grenada', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-events-lebanon-and-grenada'
          }
        },
        {
          id: 'q3',
          text: 'It was a Soviet-Cuban colony, being readied as a major military bastion to export terror and undermine democracy.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1983-10-27-address-to-the-nation-on-events-in-lebanon-and-grenada',
            loc: { section: 'Address to the Nation on Events in Lebanon and Grenada', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-events-lebanon-and-grenada'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'An academic judgement in the world outside Grenada has condemned the military intervention by U.S. forces and the Caribbean Peacekeeping Force as a violation of the island\'s sovereignty.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Relations with the United States', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/82.htm'
          }
        }
      ]
    },
    {
      id: 'grenadian-majority-rescue-mission',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Most Grenadians' },
        { kind: 'participant', name: 'Alister Hughes', discipline: 'journalist' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The overwhelming majority see the intervention as a "rescue mission" which saved them from the anarchy which had been created and from the possible killing of thousands.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Relations with the United States', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/82.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
