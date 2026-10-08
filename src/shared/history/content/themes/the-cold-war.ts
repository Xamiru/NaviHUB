import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'the-cold-war',
  names: [
    { text: 'The Cold War', lang: 'en', role: 'primary' }
  ],
  regions: ['global', 'europe', 'north-america', 'russia-central-asia', 'iran', 'east-asia'],
  thread: [
    {
      ref: 'event:iran-crisis-of-1946',
      quote: {
        id: 'q4',
        text: 'In 1946, four setbacks, in particular, had served to effectively torpedo any chance of achieving a durable post-war rapprochement with the Soviet Union: the Soviets’ failure to withdraw their troops from northern Iran in early 1946 (as per the terms of the Tehran Declaration of 1943)',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-truman-doctrine',
          loc: { section: 'The Truman Doctrine, 1947', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
        }
      }
    },
    {
      ref: 'event:truman-doctrine',
      quote: {
        id: 'q5',
        text: 'In response to what it viewed as Soviet threats, the Truman administration constructed foreign policies to contain the Soviet Union\'s political power and counter its military strength.',
        lang: 'en',
        cite: {
          source: 'millercenter-hamby-truman-life-in-brief',
          loc: { section: 'Truman and Post-War America', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://millercenter.org/president/truman/life-in-brief'
        }
      }
    },
    { ref: 'period:cold-war' },
    {
      ref: 'event:marshall-plan',
      quote: {
        id: 'q6',
        text: 'In the interest of avoiding another global war, for the first time the United States began to use economic assistance as a strategic element of its foreign policy and offered significant assistance to countries in Europe and Asia struggling to rebuild their shattered economies.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-1945-1952-foreword',
          loc: { section: '1945–1952: The Early Cold War', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/foreword'
        }
      }
    },
    { ref: 'event:berlin-blockade' },
    {
      ref: 'event:founding-of-nato',
      quote: {
        id: 'q7',
        text: 'As the Soviets demonstrated a keen interest in dominating Eastern Europe, the United States took the lead in forming a Western alliance to counterbalance the communist superpower to contain the spread of communism.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-1945-1952-foreword',
          loc: { section: '1945–1952: The Early Cold War', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/foreword'
        }
      }
    },
    { ref: 'event:founding-of-the-peoples-republic-of-china' },
    {
      ref: 'event:korean-war',
      quote: {
        id: 'q8',
        text: 'The Korean War globalized the Cold War and spurred a massive American military build-up that began the nuclear arms race in earnest.',
        lang: 'en',
        cite: {
          source: 'millercenter-hamby-truman-life-in-brief',
          loc: { section: 'A Troubled Second Term', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://millercenter.org/president/truman/life-in-brief'
        }
      }
    },
    {
      ref: 'event:1953-iranian-coup',
      quote: {
        id: 'q9',
        text: 'This Foreign Relations retrospective volume focuses on the use of covert operations by the Truman and Eisenhower administrations as an adjunct to their respective policies toward Iran, culminating in the overthrow of the Mosadeq government in August 1953. Moreover, the volume documents the involvement of the U.S. intelligence community in the policy formulation process and places it within the broader Cold War context.',
        lang: 'en',
        cite: { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Preface', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/historicaldocuments/frus1951-54Iran/preface'
        }
      }
    },
    { ref: 'event:1954-guatemalan-coup' },
    { ref: 'event:baghdad-pact' },
    { ref: 'event:khrushchevs-secret-speech' },
    {
      ref: 'event:suez-crisis',
      quote: {
        id: 'q10',
        text: 'Another result of the 1956 events was the increased Soviet influence in Egypt stemming from the Soviet financing of the Aswan High Dam construction and Soviet arms sales to Egypt. Thus, Egypt became the cornerstone of the Soviet Union\'s Middle East policy.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '38'
          }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
      }
    },
    { ref: 'event:hungarian-revolution-of-1956' },
    {
      ref: 'event:launch-of-sputnik-1',
      quote: {
        id: 'q11',
        text: 'The success of Sputnik had a major impact on the Cold War and the United States.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-sputnik',
          loc: { section: 'Sputnik, 1957', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1953-1960/sputnik'
        }
      }
    },
    { ref: 'event:vietnam-war' },
    { ref: 'event:congo-crisis' },
    { ref: 'event:sino-soviet-split' },
    {
      ref: 'event:bay-of-pigs-invasion',
      quote: {
        id: 'q12',
        text: 'The spectacular failure of this Cold War confrontation was a setback for Kennedy, and one he became determined to overcome.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-1961-1968-foreword',
          loc: {
            section: '1961–1968: The Presidencies of John F. Kennedy and Lyndon B. Johnson',
            para: '5'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1961-1968/foreword'
        }
      }
    },
    { ref: 'event:construction-of-the-berlin-wall' },
    { ref: 'event:cuban-missile-crisis' },
    { ref: 'event:prague-spring' },
    { ref: 'event:nixons-visit-to-china' },
    { ref: 'event:yom-kippur-war' },
    { ref: 'event:helsinki-accords' },
    { ref: 'event:saur-revolution' },
    { ref: 'event:iran-hostage-crisis' },
    { ref: 'event:soviet-invasion-of-afghanistan' },
    { ref: 'event:solidarity' },
    { ref: 'event:iran-iraq-war' },
    { ref: 'event:perestroika-and-glasnost' },
    { ref: 'event:iran-contra-affair' },
    { ref: 'event:chernobyl-disaster' },
    { ref: 'event:inf-treaty' },
    { ref: 'event:soviet-withdrawal-from-afghanistan' },
    { ref: 'event:tiananmen-square-protests-of-1989' },
    { ref: 'event:revolutions-of-1989' },
    { ref: 'event:fall-of-the-berlin-wall' }
  ],
  related: [
    { ref: 'theme:decolonization' },
    { ref: 'theme:the-two-world-wars' },
    { ref: 'theme:oil-in-iran' },
    { ref: 'theme:iran-and-russia' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Kennedy_and_Khrushchev_at_Vienna_Meeting_-_NARA_-_193203.jpg/1280px-Kennedy_and_Khrushchev_at_Vienna_Meeting_-_NARA_-_193203.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kennedy_and_Khrushchev_at_Vienna_Meeting_-_NARA_-_193203.jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'Stanley Tretick'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'By 1949, Soviet and American policies had divided Europe into a Soviet-controlled bloc in the east and an American-supported grouping in the west. That same year, a communist government sympathetic to the Soviet Union came to power in China, the world\'s most populous nation. The Cold War between the United States and the Soviet Union, which would last for over forty years, had begun.',
          lang: 'en',
          cite: {
            source: 'millercenter-hamby-truman-life-in-brief',
            loc: { section: 'Truman and Post-War America', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://millercenter.org/president/truman/life-in-brief'
          }
        },
        {
          id: 'q2',
          text: 'George F. Kennan, a career Foreign Service Officer, formulated the policy of “containment,” the basic United States strategy for fighting the cold war (1947–1989) with the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kennan-and-containment',
            loc: { section: 'Kennan and Containment, 1947', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/kennan'
          }
        },
        {
          id: 'q3',
          text: 'The process of decolonization coincided with the new Cold War between the Soviet Union and the United States, and with the early development of the new United Nations. Decolonization was often affected by superpower competition, and had a definite impact on the evolution of that competition.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-decolonization-of-asia-and-africa',
            loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  furtherReading: [
    {
      source: 'gaiduk-egorova-chubaryan-1998-stalin-i-kholodnaya-voina',
      perspective: 'russian-soviet'
    },
    { source: 'zubok-2007-a-failed-empire', perspective: 'russian-soviet' },
    { source: 'chen-2000-maos-china-and-the-cold-war', perspective: 'chinese' },
    { source: 'westad-2007-the-global-cold-war', perspective: 'european' }
  ]
})
