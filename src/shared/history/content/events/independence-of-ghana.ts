import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'independence-of-ghana',
  names: [
    { text: 'Independence of Ghana', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1957-03-06' },
        cites: [
          {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'INDEPENDENT GHANA', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  participants: [
    {
      ref: 'person:kwame-nkrumah',
      role: 'leader',
      cites: [
        {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'INDEPENDENT GHANA', para: '1' }
        },
        {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'The Politics of the Independence Movements', para: '11' }
        }
      ]
    },
    {
      name: 'Sir Charles Arden-Clarke',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-ghana-country-study-1994',
          loc: { section: 'INDEPENDENT GHANA', para: '1' }
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
          text: 'On March 6, 1957, the 113th anniversary of the Bond of 1844, the former British colony of the Gold Coast became the independent state of Ghana, and the nation\'s Legislative Assembly became the National Assembly.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'INDEPENDENT GHANA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/14.htm' }
        },
        {
          id: 'q2',
          text: 'Thereafter, unfettered by constitutional restrictions and with an obedient party majority in the assembly, Nkrumah began his administration of the first independent African country south of the Sahara.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'INDEPENDENT GHANA', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/14.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Although political organizations had existed in the British colony, the United Gold Coast Convention (UGCC) was the first nationalist movement with the aim of self-government "in the shortest possible time."',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        },
        {
          id: 'q4',
          text: 'Unlike the UGCC call for self- government "in the shortest possible time," Nkrumah and the CPP asked for "self-government now."',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        },
        {
          id: 'q5',
          text: 'This opposition, however, proved ineffective in the face of continuing and growing popular support for a single overriding concept--independence at an early date.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'New elections were held in July 1956. In keenly contested elections, the CPP won 57 percent of the votes cast, but the fragmentation of the opposition gave the CPP every seat in the south as well as enough seats in Asante, the Northern Territories, and the Trans-Volta Region to hold a two-thirds majority of the 104 seats.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'The Politics of the Independence Movements', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/13.htm' }
        },
        {
          id: 'q7',
          text: 'On August 3, 1956, the new assembly passed a motion authorizing the government to request independence within the British Commonwealth.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'INDEPENDENT GHANA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/14.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'This special relationship between the British Crown and Ghana would continue until 1960, when the position of governor general was abolished under terms of a new constitution that declared the nation a republic.',
          lang: 'en',
          cite: {
            source: 'loc-ghana-country-study-1994',
            loc: { section: 'INDEPENDENT GHANA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/ghana/14.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Bespreking_Nhrumah-Nasser_over_Vietnam_te_Cairo%2C_Bestanddeelnr_918-8345.jpg/1280px-Bespreking_Nhrumah-Nasser_over_Vietnam_te_Cairo%2C_Bestanddeelnr_918-8345.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bespreking_Nhrumah-Nasser_over_Vietnam_te_Cairo,_Bestanddeelnr_918-8345.jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en' }
  }
})
