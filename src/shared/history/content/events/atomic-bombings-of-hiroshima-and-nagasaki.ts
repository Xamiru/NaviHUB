import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'atomic-bombings-of-hiroshima-and-nagasaki',
  names: [
    { text: 'Atomic bombings of Hiroshima and Nagasaki', lang: 'en', role: 'primary' },
    { text: '広島・長崎への原子爆弾投下', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1945-08-06' },
        cites: [
          {
            source: 'truman-1945-08-06-statement-announcing-use-of-a-bomb',
            loc: {
              section: 'Statement by the President Announcing the Use of the A-Bomb at Hiroshima',
              para: '0'
            }
          },
          { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '96' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1945-08-09' },
        cites: [
          { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '96' } },
          { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '202' } }
        ]
      },
      {
        value: { d: '1945-08-08' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:hiroshima',
      cites: [
        {
          source: 'truman-1945-08-06-statement-announcing-use-of-a-bomb',
          loc: {
            section: 'Statement by the President Announcing the Use of the A-Bomb at Hiroshima',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'place:nagasaki',
      cites: [
        { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '96' } }
      ]
    }
  ],
  partOf: [
    { ref: 'event:second-world-war' }
  ],
  participants: [
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      cites: [
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '22' }
        },
        {
          source: 'truman-1945-08-06-statement-announcing-use-of-a-bomb',
          loc: {
            section: 'Statement by the President Announcing the Use of the A-Bomb at Hiroshima',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'person:hirohito',
      role: 'head-of-state',
      cites: [
        { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '106' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 100000 },
            cites: [
              { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '96' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'United States Strategic Bombing Survey' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:second-world-war', rel: 'related' },
    {
      ref: 'period:cold-war',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-atomic-diplomacy',
          loc: { section: 'Atomic Diplomacy', para: '4' }
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
          text: 'On 6 August and 9 August 1945, the first two atomic bombs to be used for military purposes were dropped on Hiroshima and Nagasaki respectively. One hundred thousand people were killed, 6 square miles or over 50 percent of the built-up areas of the two cities were destroyed.',
          lang: 'en',
          cite: { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '96' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/unitedstatesstra00cent/unitedstatesstra00cent_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'After the detonation of atomic bombs over Hiroshima and Nagasaki on August 6 and 8, 1945, respectively, the emperor asked that the Japanese people bring peace to Japan by "enduring the unendurable and suffering what is insufferable" by surrendering to the Allied powers.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/33.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q3',
          text: 'It is an atomic bomb. It is a harnessing of the basic power of the universe. The force from which the sun draws its power has been loosed against those who brought war to the Far East.',
          lang: 'en',
          cite: {
            source: 'truman-1945-08-06-statement-announcing-use-of-a-bomb',
            loc: {
              section: 'Statement by the President Announcing the Use of the A-Bomb at Hiroshima',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.trumanlibrary.gov/library/public-papers/93/statement-president-announcing-use-bomb-hiroshima'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'There has been great difficulty in estimating the total casualties in the Japanese cities as a result of the atomic bombing.',
          lang: 'en',
          cite: {
            source: 'avalon-manhattan-engineer-district-atomic-bombings-1946',
            loc: { section: 'Chapter 10 - Total Casualties', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/mp10.asp'
          }
        },
        {
          id: 'q5',
          text: 'The number of total casualties has been estimated at various times since the bombings with wide discrepancies.',
          lang: 'en',
          cite: {
            source: 'avalon-manhattan-engineer-district-atomic-bombings-1946',
            loc: { section: 'Chapter 10 - Total Casualties', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/mp10.asp'
          }
        },
        {
          id: 'q6',
          text: 'The exact number of deaths from the atomic bombing is still unknown. Estimates place the number of dead by the end of December 1945, when the acute effects of radiation poisoning had largely subsided, at roughly 140,000.',
          lang: 'en',
          cite: {
            source: 'city-of-hiroshima-faq-how-many-people-died',
            loc: { section: 'Q. How many people died because of the atomic bombing?', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.city.hiroshima.lg.jp/english/peace/1029875/1010074.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'By using the urgency brought about through fear of further atomic bombing attacks, the Prime Minister found it possible to bring the Emperor directly in to the discussions of the Potsdam terms. Hirohito, acting as arbiter, resolved the conflict in favor of unconditional surrender.',
          lang: 'en',
          cite: { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '106' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/unitedstatesstra00cent/unitedstatesstra00cent_djvu.txt'
          }
        },
        {
          id: 'q8',
          text: 'Though it inspired greater confidence in the immediate postwar years, the U.S. nuclear monopoly was not of long duration; the Soviet Union successfully exploded its first atomic bomb in 1949, the United Kingdom in 1952, France in 1960 and the People’s Republic of China in 1964.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-atomic-diplomacy',
            loc: { section: 'Atomic Diplomacy', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/atomic'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Nagasakibomb.jpg/1280px-Nagasakibomb.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nagasakibomb.jpg',
    credit: { institution: 'US National Archives and Records Administration', creator: 'Charles Levy' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'newsreel-hiroshima-footage-1946',
      mediaKind: 'video',
      title: 'Jap Films of Hiroshima,  1946/08/05',
      url: 'https://archive.org/download/1946-08-05_Jap_Films_of_Hiroshima/1946-08-05_Jap_Films_of_Hiroshima.mp4',
      page: 'https://archive.org/details/1946-08-05_Jap_Films_of_Hiroshima',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 41585724,
      date: { d: '1946-08-05' },
      durationSec: 433
    },
    {
      id: 'ussbs-hiroshima-blast-damage-1946',
      mediaKind: 'video',
      title: 'Atomic Bomb Physical Damage, General View, Hiroshima 03/21/1946 - 04/08/1946',
      url: 'https://archive.org/download/USAF-11075/USAF-11075.mp4',
      page: 'https://archive.org/details/USAF-11075',
      credit: {
        institution: 'wwIIarchive collection (Internet Archive)',
        creator: 'United States. Army Air Forces'
      },
      license: { id: 'public-domain' },
      bytes: 78037038,
      date: { d: '1946-03-21' },
      durationSec: 882
    }
  ]
})
