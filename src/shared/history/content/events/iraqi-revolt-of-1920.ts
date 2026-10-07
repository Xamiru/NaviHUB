import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iraqi-revolt-of-1920',
  names: [
    { text: 'Iraqi revolt of 1920', lang: 'en', role: 'primary' },
    {
      text: 'Ath Thawra al Iraqiyya al Kubra',
      lang: 'ar-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '12' }
        }
      ]
    },
    {
      text: 'The Great Iraqi Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '12' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1920' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:karbala',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
        }
      ]
    },
    {
      ref: 'place:najaf',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Imam Shirazi',
      role: 'leader',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
        }
      ]
    },
    {
      name: 'Mirza Muhammad Riza',
      role: 'organizer',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-league-of-nations',
      rel: 'related',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'Ath Thawra al Iraqiyya al Kubra, or The Great Iraqi Revolution (as the 1920 rebellion is called), was a watershed event in contemporary Iraqi history.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'The most striking problem facing the British was the growing anger of the nationalists, who felt betrayed at being accorded mandate status. The nationalists soon came to view the mandate as a flimsy disguise for colonialism.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'Shirazi then issued a fatwa (religious ruling), pointing out that it was against Islamic law for Muslims to countenance being ruled by non-Muslims, and he called for a jihad against the British.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        },
        {
          id: 'q3',
          text: 'The country was in a state of anarchy for three months; the British restored order only with great difficulty and with the assistance of Royal Air Force bombers. British forces were obliged to send for reinforcements from India and from Iran.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The 1920 revolt had been very costly to the British in both manpower and money.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        },
        {
          id: 'q5',
          text: 'At the Cairo Conference of 1921, the British set the parameters for Iraqi political life that were to continue until the 1958 revolution; they chose Faisal as Iraq\'s first King; they established an indigenous Iraqi army; and they proposed a new treaty.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'For the first time, Sunnis and Shias, tribes and cities, were brought together in a common effort.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1920-05' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Upon the death of an important Shia mujtahid (religious scholar) in early May 1920, Sunni and Shia ulama temporarily put aside their differences as the memorial services metamorphosed into political rallies.',
        lang: 'en',
        cite: {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-07' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'By July 1920, Mosul was in rebellion against British rule, and the insurrection moved south down the Euphrates River valley.',
        lang: 'en',
        cite: {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'WORLD WAR I AND THE BRITISH MANDATE', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iraq/19.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Tal_Afar_1920.png',
    page: 'https://commons.wikimedia.org/wiki/File:Tal_Afar_1920.png',
    credit: { institution: 'Newcastle University, Gertrude Bell Archive' },
    license: { id: 'public-domain' }
  }
})
