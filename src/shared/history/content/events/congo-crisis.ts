import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'congo-crisis',
  names: [
    { text: 'Congo Crisis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1960-06-30' },
        cites: [
          {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1965-11-25' },
        cites: [
          {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:kinshasa',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'period:cold-war',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:patrice-lumumba',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
        }
      ]
    },
    {
      name: 'Joseph Kasavubu',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
        }
      ]
    },
    {
      name: 'Joseph Mobutu',
      role: 'commander',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
        },
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '6' }
        }
      ]
    },
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Patrice_Lumumba_signs_the_document_granting_independence_to_the_Congo_next_to_Belgian_Prime_Minister_Gaston_Eyskens.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Patrice_Lumumba_signs_the_document_granting_independence_to_the_Congo_next_to_Belgian_Prime_Minister_Gaston_Eyskens.jpg',
    credit: { institution: 'Congopresse (Belgian Congo official press agency), 1960 photo' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The decolonization of Sub-Saharan Africa from the late 1950s to the mid-1970s resulted in several proxy Cold War confrontations between the United States and the Soviet Union over the dozens of newly independent, non-aligned nations. The first such confrontation occurred in the former Belgian Congo, which gained its independence on June 30, 1960.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'The Eisenhower administration had high hopes that the Republic of the Congo would form a stable, pro-Western, central government. Those hopes vanished in a matter of days as the newly independent nation descended into chaos. On July 5, Congolese soldiers in the Force Publique mutinied against their white Belgian commanders at the Thysville military base, seeking higher pay as well as greater opportunity and authority. The mutiny quickly spread to other bases and violence soon broke out across the nation. Thousands of Europeans (primarily Belgians) fled, and stories of atrocities against whites surfaced in newspapers around the globe. Unable to control the indigenous army (renamed the Congolese National Army), the Belgians brought in troops to restore order without seeking permission to do so from either Kasavubu or Lumumba. In response, the Congolese government appealed directly to the United Nations to provide troops and demanded the removal of Belgian troops.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        },
        {
          id: 'q3',
          text: 'Two days earlier, the wealthy Katanga province had declared its independence from the Republic of the Congo, followed in August by South Kasai province.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        },
        {
          id: 'q4',
          text: 'Reports from Lawrence Devlin, the CIA Chief of Station in Leopoldville (Kinshasa), described the situation in the Congo as a classic Communist takeover. The reports, coupled with the arrival of Soviet bloc technicians and matériel, convinced members of the national security team that Lumumba had to be removed. A flurry of U.S. diplomatic activity in support of unseating Lumumba ensued. Plans were also developed to assassinate Lumumba if necessary.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        },
        {
          id: 'q5',
          text: 'Mobutu’s early efforts to support a pro-Western government and his ties to the military placed him in good stead with Devlin, who informed Mobutu of a plot to assassinate him on September 18. Lumumba, who was blamed for the plot, was arrested and ultimately killed on January 17, 1961.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        },
        {
          id: 'q6',
          text: 'U.S. military assistance increased dramatically in response to the fall of Stanleyville (Kisangani) to rebel forces on August 4, 1964. Planes provided by the Department of Defense, flown by pilots supplied by the Central Intelligence Agency, augmented the CNA’s efforts against an increasingly robust rebel insurgency, which received support from neighboring African nations, the Soviet bloc and Chinese Communists. The United States also made diplomatic approaches to the Organization of African Unity (OAU) to secure support for the Republic of the Congo. By late October, the situation in Stanleyville was dire. On October 28, the rebel Army commander placed all Westerners in the area (including a number of Americans) under house arrest. Smaller but significant numbers of hostages were seized in other cities under rebel control. A joint U.S.-Belgian effort to rescue the hostages in late November, Operation Dragon Rouge, succeeded but severely damaged Prime Minister Tshombe, who was viewed as ineffectual by both Kasavubu and Mobutu. He was dismissed in October 1965 and once again, the nation teetered on the brink of civil war. Mobutu orchestrated another coup d’état on November 25, 1965, removed both the President and Prime Minister, and took control of the government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Despite periodic uprisings and unrest, Mobutu ruled the Congo (renamed Zaire in 1971) until the mid-1990s. Viewed as mercurial and occasionally irrational, Mobutu nonetheless proved to be a staunch ally against Communist encroachment in Africa. As such, he received extensive U.S. financial, matériel, and political support, which increased his stature in much of Sub-Saharan Africa where he often served the interests of administrations from Johnson through Reagan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
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
            value: { d: '1960-07-13' },
            cites: [
              {
                source: 'state-dept-milestones-congo-decolonization',
                loc: {
                  section: 'The Congo, Decolonization, and the Cold War, 1960–1965',
                  para: '3'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On July 13, the United Nations approved a resolution which authorized the creation of an intervention force, the Organisations des Nations Unies au Congo (ONUC), and called for the withdrawal of all Belgian troops.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1960-09-14' },
            cites: [
              {
                source: 'state-dept-milestones-congo-decolonization',
                loc: {
                  section: 'The Congo, Decolonization, and the Cold War, 1960–1965',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In an attempt to avoid civil war, Colonel Joseph Mobutu of the Congolese National Army (CNA) orchestrated a coup d’état on September 14, and ordered the Soviets out of the country.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
        }
      }
    }
  ],
  archive: [
    {
      id: 'a1',
      mediaKind: 'video',
      title: 'Whites Flee. Newly Independent Congo In Upheaval, 1960/07/11',
      date: { d: '1960-07-11' },
      url: 'https://archive.org/download/1960-07-11_whites_flee/1960-07-11_whites_flee_512kb.mp4',
      page: 'https://archive.org/details/1960-07-11_whites_flee',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 7309184,
      durationSec: 101
    },
    {
      id: 'a2',
      mediaKind: 'video',
      title: 'Lumumba Seized. Followers Threaten New Congo Upheaval,  1960/12/05',
      date: { d: '1960-12-05' },
      url: 'https://archive.org/download/1960-12-05_Lumumba_Seized/1960-12-05_Lumumba_Seized.mp4',
      page: 'https://archive.org/details/1960-12-05_Lumumba_Seized',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 9100545,
      durationSec: 94
    }
  ],
  furtherReading: [
    { source: 'ndaywel-1998-histoire-generale-du-congo', perspective: 'african' },
    {
      source: 'nzongola-ntalaja-2002-the-congo-from-leopold-to-kabila',
      perspective: 'african'
    },
    { source: 'de-witte-2001-de-moord-op-lumumba', perspective: 'european' }
  ]
})
