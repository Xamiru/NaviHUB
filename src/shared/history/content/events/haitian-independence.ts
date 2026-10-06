import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'haitian-independence',
  names: [
    { text: 'Haitian independence', lang: 'en', role: 'primary' },
    { text: 'Declaration of Haitian independence', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'independence',
  start: {
    alts: [
      {
        value: { d: '1804-01-01' },
        cites: [
          {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 1,
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  participants: [
    {
      ref: 'person:jean-jacques-dessalines',
      role: 'leader',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'INDEPENDENT HAITI', para: '2' }
        }
      ]
    },
    {
      ref: 'person:toussaint-louverture',
      role: 'leader',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        }
      ]
    },
    {
      ref: 'person:napoleon-bonaparte',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        }
      ]
    },
    {
      name: 'Charles Victor Emmanuel Leclerc',
      role: 'commander',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:louisiana-purchase',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-napoleonic-wars',
          loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '3' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Toussaint never severed the formal bond with France, but his de facto independence and autonomy rankled the leaders of the mother country and concerned the governments of slave-holding nations, such as Britain and the United States.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        },
        {
          id: 'q2',
          text: 'Taking advantage of a temporary halt in the wars in Europe, Bonaparte dispatched to Saint-Domingue forces led by his brother-in-law, General Charles Victor Emmanuel Leclerc. These forces, numbering between 16,000 and 20,000--about the same size as Toussaint\'s army--landed at several points on the north coast in January 1802.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On January 1, 1804, Haiti proclaimed its independence. Through this action, it became the second independent state in the Western Hemisphere and the first free black republic in the world.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        },
        {
          id: 'q4',
          text: 'The Haitian Revolution created the second independent country in the Americas after the United States became independent in 1783.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The land he governed had been devastated by years of warfare. The agricultural base was all but destroyed, and the population was uneducated and largely unskilled. Commerce was virtually nonexistent.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        },
        {
          id: 'q6',
          text: 'Jefferson refused to recognize Haitian independence, a policy to which U.S. Federalists also acquiesced. Although France recognized Haitian independence in 1825, Haitians would have to wait until 1862 for the United States to recognize Haiti’s status as a sovereign, independent nation.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1802-01' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'With the help of white colonists and mulatto forces commanded by Pétion and others, the French outmatched, outmaneuvered, and wore down the black army.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1802-11' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Leclerc himself died of yellow fever in November 1802, about two months after he had requested reinforcements to quash the renewed resistance.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '13' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1803-11' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The general fled to Jamaica in November 1803, where he surrendered to British authorities rather than face the retribution of the rebel leadership. The era of French colonial rule in Haiti had ended.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '14' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Deklarasyon_Endepandans_Ayiti.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Deklarasyon_Endepandans_Ayiti.jpg',
    credit: { institution: 'The National Archives (UK)' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'rainsford-1805-hayti',
      mediaKind: 'document',
      title: 'An historical account of the black empire of Hayti: : comprehending a view of the principal transactions in the revolution of Saint Domingo; with its antient and modern state.',
      date: { d: '1805' },
      url: 'https://archive.org/download/historicalaccoun00rain/historicalaccoun00rain.pdf',
      page: 'https://archive.org/details/historicalaccoun00rain',
      credit: {
        institution: 'John Carter Brown Library (Internet Archive)',
        creator: 'Marcus Rainsford'
      },
      license: { id: 'public-domain' },
      bytes: 47660064
    }
  ]
})
