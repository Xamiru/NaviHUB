import { definePolity } from '../../schema'

export default definePolity({
  id: 'tokugawa-shogunate',
  names: [
    { text: 'Tokugawa shogunate', lang: 'en', role: 'primary' },
    {
      text: 'Edo period',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'confederation',
  start: {
    alts: [
      {
        value: { d: '1603' },
        cites: [
          { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1867' },
        cites: [
          { source: 'britannica-1911-tokugawa', loc: { section: 'Tokugawa', para: '1' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:edo',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Tokugawa Period', para: '2' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 205662, to: 1700 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Japanese_-_Kozuka_with_a_Hollyhock_Creast_-_Walters_5111884.jpg/1280px-Japanese_-_Kozuka_with_a_Hollyhock_Creast_-_Walters_5111884.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Japanese_-_Kozuka_with_a_Hollyhock_Creast_-_Walters_5111884.jpg',
    credit: { institution: 'Walters Art Museum', creator: 'Anonymous (Japan)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Tokugawa (or Edo) period brought 200 years of stability to Japan.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q2',
          text: 'In the bakuhan, the shogun had national authority and the daimyo had regional authority, a new unity in the feudal structure, which had an increasingly large bureaucracy to administer the mixture of centralized and decentralized authorities.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Three major figures dominated the period in succession: Oda Nobunaga (1534-82), Toyotomi Hideyoshi (1536-98), and Tokugawa Ieyasu (1542-1616), each of whom emerged as a major overlord with large military forces under his command.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Reunification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/18.htm' }
        },
        {
          id: 'q4',
          text: 'Ieyasu\'s victory over the western daimyo at the Battle of Sekigahara (1600) gave him virtual control of all Japan.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The Tokugawa became more powerful during their first century of rule: land redistribution gave them nearly 7 million koku, control of the most important cities, and a land assessment system reaping great revenues.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q6',
          text: 'The feudal hierarchy was completed by the various classes of daimyo.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Tokugawa Period', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/19.htm' }
        },
        {
          id: 'q7',
          text: 'Finally, in 1635 an edict prohibited any Japanese from traveling outside Japan or, if someone left, from ever returning.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Seclusion and Social Control', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/20.htm' }
        },
        {
          id: 'q8',
          text: 'The Shimabara Rebellion of 1637-38, in which discontented Christian samurai and peasants rebelled against the bakufu-- and Edo called in Dutch ships to bombard the rebel stronghold-- marked the end of the Christian movement.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Seclusion and Social Control', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/20.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Besides small trade of some outer daimyo with Korea and the Ryukyu Islands, to the southwest of Japan\'s main islands, by 1641 foreign contacts were limited to Nagasaki.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Seclusion and Social Control', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/japan/20.htm' }
        }
      ]
    }
  ]
})
