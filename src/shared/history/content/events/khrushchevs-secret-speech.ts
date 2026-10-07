import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'khrushchevs-secret-speech',
  names: [
    { text: 'Khrushchev’s secret speech', lang: 'en', role: 'primary' },
    { text: 'О культе личности и его последствиях', lang: 'ru', role: 'native' },
    {
      text: 'Stalin’s Second Funeral',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-khrushchev-20th-congress',
          loc: {
            section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
            para: '5'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1956-02-25' },
        cites: [
          {
            source: 'fordham-khrushchev-1956-secret-speech',
            loc: { section: 'Secret Speech' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'state-dept-milestones-khrushchev-20th-congress',
          loc: {
            section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
            para: '4'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:soviet-union' },
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      ref: 'person:nikita-khrushchev',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-khrushchev-20th-congress',
          loc: {
            section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
            para: '1'
          }
        },
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Khrushchev Era', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:hungarian-revolution-of-1956',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-khrushchev-20th-congress',
          loc: {
            section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
            para: '8'
          }
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
          text: 'In February, 1956, Soviet leader Nikita Khrushchev made a keynote address to international communist leaders at the Twentieth Congress of the Communist Party of the Soviet Union. He used his speech to make unexpected and unprecedented condemnations of the policies and excesses of his predecessor, Joseph Stalin, setting off a chain of reaction that led to calls for reform in Eastern Europe and a new policy in the Soviet Union for dealing with the West.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        },
        {
          id: 'q2',
          text: 'At the Twentieth Party Congress, held in February 1956, Khrushchev further advanced his position within the party by denouncing Stalin\'s crimes in a dramatic "secret speech." Khrushchev revealed that Stalin had arbitrarily liquidated thousands of party members and military leaders, thereby contributing to the initial Soviet defeats in World War II, and had established what Khrushchev characterized as a pernicious cult of personality.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/13.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After Stalin died in 1953, four men joined together to lead the country: Georgi Malenkov, Lavrenti Beria, Vyacheslav Molotov, and Nikita Khrushchev.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        },
        {
          id: 'q4',
          text: 'The Party Congress was an organization that included some 1,500 Communist leaders from fifty-six countries around the world, and its twentieth meeting opened in Moscow on February 14, 1956.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'When Khrushchev finally made his “secret speech,” he shocked the gathered representatives at the Party Congress. Over the course of his address, he condemned the brutality of the Stalinist regime, particularly the purges that led to the torture and execution of some wholly innocent party loyalists.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        },
        {
          id: 'q6',
          text: 'Stalin acted not through persuasion, explanation, and patient cooperation with people, but by imposing his concepts and demanding absolute submission to his opinion. Whoever opposed this concept or tried to prove his viewpoint, and the correctness of his position-was doomed to removal from the leading collective and to subsequent moral and physical annihilation.',
          lang: 'en',
          cite: {
            source: 'fordham-khrushchev-1956-secret-speech',
            loc: { section: 'Secret Speech' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://sourcebooks.fordham.edu/mod/1956khrushchev-secret1.html'
          }
        },
        {
          id: 'q7',
          text: 'In practice Stalin ignored the norms of party life and trampled on the Leninist principle of collective party leadership.',
          lang: 'en',
          cite: {
            source: 'fordham-khrushchev-1956-secret-speech',
            loc: { section: 'Secret Speech' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://sourcebooks.fordham.edu/mod/1956khrushchev-secret1.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Khrushchev’s speech was supposed to be private. It was intended only for internal Communist Party consideration, but word of the events unfolding at the Twentieth Party Congress quickly traveled across the Iron Curtain. In addition to the rumors of what had been said, Israeli intelligence officers obtained a copy of the complete speech and shared it with the Eisenhower Administration.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        },
        {
          id: 'q9',
          text: 'Eisenhower agreed, and it was sent to the New York Times.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'As a direct result of the "de-Stalinization" campaign launched by Khrushchev\'s speech, the release of political prisoners, which had begun in 1953, was stepped up, and some of Stalin\'s victims were posthumously rehabilitated.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/13.htm' }
        },
        {
          id: 'q11',
          text: 'The Eisenhower Administration watched, but did not interfere, as the speech became the impetus for a series of grassroots movements demanding democratic reforms in Eastern Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-khrushchev-20th-congress',
            loc: {
              section: 'Khrushchev and the Twentieth Congress of the Communist Party, 1956',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/khrushchev-20th-congress'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/The_Crimes_of_the_Stalin_Era_%28Khrushchev%2C_tr._Nicolaevsky%29.djvu/page1-1280px-The_Crimes_of_the_Stalin_Era_%28Khrushchev%2C_tr._Nicolaevsky%29.djvu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Crimes_of_the_Stalin_Era_(Khrushchev,_tr._Nicolaevsky).djvu',
    credit: { institution: 'Internet Archive' },
    license: { id: 'public-domain' }
  }
})
