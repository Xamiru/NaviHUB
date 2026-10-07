import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'construction-of-the-berlin-wall',
  names: [
    { text: 'Construction of the Berlin Wall', lang: 'en', role: 'primary' },
    {
      text: 'Berlin Wall',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-berlin-crises',
          loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1961-08-13' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Berlin Wall', para: '2' }
          },
          {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Berlin Wall', para: '2' }
        },
        {
          source: 'state-dept-milestones-berlin-crises',
          loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'period:cold-war',
      cites: [
        {
          source: 'state-dept-milestones-berlin-crises',
          loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Walter Ulbricht',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-berlin-crises',
          loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
        }
      ]
    },
    {
      ref: 'person:nikita-khrushchev',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-berlin-crises',
          loc: { section: 'The Berlin Crisis, 1958–1961', para: '5' }
        }
      ]
    },
    {
      ref: 'person:john-f-kennedy',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-berlin-crises',
          loc: { section: 'The Berlin Crisis, 1958–1961', para: '5' }
        }
      ]
    },
    {
      name: 'Willy Brandt',
      role: 'leader',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Berlin Wall', para: '2' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Bundesarchiv_Bild_183-85458-0002%2C_Berlin%2C_Mauerbau%2C_Kampfgruppen_am_Brandenburger_Tor.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-85458-0002,_Berlin,_Mauerbau,_Kampfgruppen_am_Brandenburger_Tor.jpg',
    credit: {
      institution: 'German Federal Archive (Bundesarchiv, Bild 183-85458-0002)',
      creator: 'Peter Heinz Junge'
    },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Alarmed by the continuous population drain, the East German Politburo ordered the erection of a wall along the border between West Berlin and East Berlin. On Sunday morning, August 13, 1961, workers began building a three-meter-high concrete wall along the border of the Soviet sector of the city. Within a few hours, public transportation lines were cut, and West Berlin was sealed off from East Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Berlin Wall', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/58.htm' }
        },
        {
          id: 'q2',
          text: 'The Berlin Wall would prevent the West from having further influence on the East, stop the flow of migrants out of the communist sector, and ultimately become the most iconic image of the Cold War in Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/berlin-crises'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Besides its increasing economic difficulties, by the end of the 1950s the GDR encountered another problem that began to threaten its existence: large numbers of people were leaving East Germany for the West.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Berlin Wall', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/58.htm' }
        },
        {
          id: 'q4',
          text: 'On November 10, 1958, Soviet Premier Nikita Khrushchev delivered a speech in which he demanded that the Western powers of the United States, Great Britain and France pull their forces out of West Berlin within six months. This ultimatum sparked a three year crisis over the future of the city of Berlin that culminated in 1961 with the building of the Berlin Wall.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/berlin-crises'
          }
        },
        {
          id: 'q5',
          text: 'In the summer of 1961, President John F. Kennedy met with Khrushchev in Vienna to address the ongoing issue of Berlin, in addition to the countries’ competing interests in Laos, and the question of disarmament. Although they agreed to further discussions on Laos, they found no solution to the Berlin problem. In the wake of the conference, Khrushchev once again gave the United States six months to withdraw from Berlin. Kennedy responded by activating 150,000 reservists and increasing defense expenditures, in preparation for a potential conflict over the future of the city. Unwilling to face a potential nuclear escalation over the city, Khrushchev prepared to take his own form of action.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/berlin-crises'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'On the morning of August 13, 1961, Berliners awoke to discover that on the orders of East German leader Walter Ulbricht , a barbed wire fence had gone up overnight separating West and East Berlin and preventing movement between the two sides. The barbed wire fence was soon expanded to include cement walls and guard towers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/berlin-crises'
          }
        },
        {
          id: 'q7',
          text: 'Shortly after the wall was erected, a standoff between U.S. and Soviet troops on either side of the diplomatic checkpoint led to one of the tensest moments of the Cold War in Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/berlin-crises'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Up to that date, nearly 3.5 million had left the GDR for West Germany. After the building of the wall, the stream of refugees decreased to a mere trickle.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Berlin Wall', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/58.htm' }
        },
        {
          id: 'q9',
          text: 'Despite the construction of the Berlin Wall, many East Germans still tried to escape. Several hundred of those attempting to leave the GDR were killed; others were captured, perhaps after being wounded by automatic guns or mines along the border, and sentenced to long prison terms.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Berlin Wall', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/58.htm' }
        },
        {
          id: 'q10',
          text: 'The Berlin Wall remained in place until November 9, 1989, when the border between East and West Berlin was reopened and the wall itself was finally dismantled.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-berlin-crises',
            loc: { section: 'The Berlin Crisis, 1958–1961', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/berlin-crises'
          }
        }
      ]
    }
  ],
  archive: [
    {
      id: 'a1',
      mediaKind: 'video',
      title: 'Berlin, 1961/08/31',
      date: { d: '1961-08-31' },
      url: 'https://archive.org/download/1961-08-31_Berlin/1961-08-31_Berlin.mp4',
      page: 'https://archive.org/details/1961-08-31_Berlin',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 10786730,
      durationSec: 113
    }
  ]
})
