import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'british-wartime-pledges-in-the-middle-east',
  about: ['event:sykes-picot-agreement', 'event:balfour-declaration', 'event:arab-revolt'],
  topic: 'foreign-role',
  framing: {
    id: 'q1',
    text: 'The commitments made by McMahon were one of three mutually incompatible promises made by Britain regarding the post-war disposition of the territories of the Middle East. The other two were the Sykes-Picot Agreement on the division of the Fertile Crescent and the promise of a Jewish homeland in Palestine made in the Balfour Declaration of November 1917.',
    lang: 'en',
    cite: {
      source: 'eo1418-tell-husayn-mcmahon-correspondence',
      loc: { section: 'War’s Aftermath. The Anglo-Arab Labyrinth', para: '1' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://encyclopedia.1914-1918-online.net/article/husayn-mcmahon-correspondence/'
    }
  },
  researched: '2026-10-06',
  positions: [
    {
      id: 'british-perfidy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'George Antonius' },
        { kind: 'scholar', name: 'Tariq Tell' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'McMahon seems to have deliberately chosen a vague formulation and changed the punctuation of key phrases in order to give Husayn the impression that Britain was free to recognize Arab independence within proscribed limits.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-mcmahon-correspondence',
            loc: { section: 'Negotiating an Anglo-Arab Alliance during WWI', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-mcmahon-correspondence/'
          }
        },
        {
          id: 'q3',
          text: 'George Antonius (1891-1942)Arab Awakening remains to this day the only credible academic source in a European language in which the Hashemites’ own version of the negotiations – drawn from its author’s conversations with leading members of the dynasty – are given a sympathetic scholarly airing.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-mcmahon-correspondence',
            loc: { section: 'War’s Aftermath. The Anglo-Arab Labyrinth', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-mcmahon-correspondence/'
          }
        }
      ]
    },
    {
      id: 'hashemite-ambition',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Critics of Hashemite dynastic ambition' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Once the dream of an independent Arab State receded after the end of the war, the ambiguities of the Husayn-McMahon exchange fuelled accusations of British perfidy, while leaving the Hashemites open to the accusation that they had sacrificed Arab national interests on the altar of dynastic ambition.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-mcmahon-correspondence',
            loc: { section: 'Overview', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-mcmahon-correspondence/'
          }
        }
      ]
    },
    {
      id: 'arab-reading-palestine-pledged',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Arab spokesmen' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'As with the later Balfour Declaration, the exact meaning was not clear, although Arab spokesmen since then have usually maintained that Palestine was within the pledged area of independence.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/14.htm' }
        }
      ]
    },
    {
      id: 'contradictory-negotiations',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'British Middle East policy, however, espoused conflicting objectives, and as a result London became involved in three distinct and contradictory negotiations concerning the fate of the region.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/14.htm' }
        }
      ]
    }
  ]
})
