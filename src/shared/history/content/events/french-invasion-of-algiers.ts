import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-invasion-of-algiers',
  names: [
    { text: 'French invasion of Algiers', lang: 'en', role: 'primary' },
    {
      text: 'Invasion of Algiers',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1830-06-12' },
        cites: [
          {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:algiers',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'france',
      name: 'French soldiers',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
        }
      ]
    },
    {
      key: 'algiers',
      name: 'the dey',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Hussein Dey',
      role: 'head-of-state',
      side: 'algiers',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
        }
      ]
    },
    {
      name: 'Charles X',
      role: 'head-of-state',
      side: 'france',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
        }
      ]
    },
    {
      name: 'Bertrand Clauzel',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'The Land and Colonizers', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 34000 },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:july-revolution', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Most of France\'s actions in Algeria, not least the invasion of Algiers, were propelled by contradictory impulses.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        },
        {
          id: 'q2',
          text: 'The French monarch sought to reverse his domestic unpopularity.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        },
        {
          id: 'q3',
          text: 'As a result of what the French considered an insult to the French consul in Algiers by the dey in 1827, France blockaded Algiers for three years. France used the failure of the blockade as a reason for a military expedition against Algiers in 1830.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Using Napoleon\'s 1808 contingency plan for the invasion of Algeria, 34,000 French soldiers landed twenty-seven kilometers west of Algiers, at Sidi Ferruch, on June 12, 1830.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        },
        {
          id: 'q5',
          text: 'Algiers was captured after a three-week campaign, and Hussein Dey fled into exile.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        },
        {
          id: 'q6',
          text: 'French troops raped, looted (taking 50 million francs from the treasury in the Casbah), desecrated mosques, and destroyed cemeteries. It was an inauspicious beginning to France\'s self-described "civilizing mission," whose character on the whole was cynical, arrogant, and cruel.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The new government, composed of liberal opponents of the Algiers expedition, was reluctant to pursue the conquest ordered by the old regime, but withdrawing from Algeria proved more difficult than conquering it.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        },
        {
          id: 'q8',
          text: 'In 1834 France annexed the occupied areas, which had an estimated Muslim population of about 3 million, as a colony.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'FRANCE IN ALGERIA, 1830-1962', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/18.htm' }
        },
        {
          id: 'q9',
          text: 'In a bargain-hunting frenzy to take over or buy at low prices all manner of property--homes, shops, farms and factories--Europeans poured into Algiers after it fell.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'The Land and Colonizers', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/algeria/19.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/PRISE_DE_LA_CASBAR_D%27ALGER._%28Juillet_1830.%29%2C_Paris_Mus%C3%A9es_20230520120910.jpg/1280px-PRISE_DE_LA_CASBAR_D%27ALGER._%28Juillet_1830.%29%2C_Paris_Mus%C3%A9es_20230520120910.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:PRISE_DE_LA_CASBAR_D%27ALGER._(Juillet_1830.),_Paris_Mus%C3%A9es_20230520120910.jpg',
    credit: { institution: 'Musée Carnavalet, Paris Musées', creator: 'Louis-François Couché' },
    license: { id: 'cc0' }
  }
})
