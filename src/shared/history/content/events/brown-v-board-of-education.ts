import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'brown-v-board-of-education',
  names: [
    { text: 'Brown v. Board of Education', lang: 'en', role: 'primary' },
    {
      text: 'Oliver L. Brown et. al. vs. The Board of Education of Topeka (KS)',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eisenhower-library-brown-v-board-of-education',
          loc: { section: 'Civil Rights: Brown vs. Board of Education', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1954-05-17' },
        cites: [
          {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          {
            source: 'eisenhower-library-brown-v-board-of-education',
            loc: { section: 'Civil Rights: Brown vs. Board of Education', para: '1' }
          },
          {
            source: 'eisenhower-library-presidential-years',
            loc: { section: 'Presidential Years' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:topeka',
      cites: [
        {
          source: 'eisenhower-library-brown-v-board-of-education',
          loc: { section: 'Civil Rights: Brown vs. Board of Education', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Earl Warren',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-brown-v-board-of-education',
          loc: { section: 'Brown v. Board of Education (1954)' }
        }
      ]
    },
    {
      name: 'National Association for the Advancement of Colored People',
      role: 'organizer',
      cites: [
        {
          source: 'eisenhower-library-brown-v-board-of-education',
          loc: { section: 'Civil Rights: Brown vs. Board of Education', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:plessy-v-ferguson',
      rel: 'related',
      cites: [
        {
          source: 'nara-milestone-brown-v-board-of-education',
          loc: { section: 'Brown v. Board of Education (1954)' }
        }
      ]
    },
    {
      ref: 'event:montgomery-bus-boycott',
      rel: 'contributed-to',
      cites: [
        {
          source: 'nps-montgomery-bus-boycott',
          loc: { section: 'The Montgomery Bus Boycott', para: '17' }
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
          text: 'On May 17, 1954, U.S. Supreme Court Justice Earl Warren delivered the unanimous ruling in the landmark civil rights case Brown v. Board of Education of Topeka, Kansas.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        },
        {
          id: 'q2',
          text: 'It signaled the end of legalized racial segregation in the schools of the United States, overruling the "separate but equal" principle set forth in the 1896 Plessy v. Ferguson case.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1950, members of the Topeka, Kansas, Chapter of the NAACP (National Association for the Advancement of Colored People) challenged the "separate but equal" doctrine governing public education through a class action suit when they were denied the opportunity to enroll their children in the white-only schools. When the Topeka case made its way to the United States Supreme Court it was combined with other NAACP cases from Delaware, Virginia, South Carolina and Washington, DC. The combined cases became known as Oliver L. Brown et. al. vs. The Board of Education of Topeka (KS).',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-brown-v-board-of-education',
            loc: { section: 'Civil Rights: Brown vs. Board of Education', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/civil-rights-brown-vs-board-education'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'We conclude that, in the field of public education, the doctrine of "separate but equal" has no place. Separate educational facilities are inherently unequal. Therefore, we hold that the plaintiffs and others similarly situated for whom the actions have been brought are, by reason of the segregation complained of, deprived of the equal protection of the laws guaranteed by the Fourteenth Amendment.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        },
        {
          id: 'q5',
          text: 'Segregation of white and Negro children in the public schools of a State solely on the basis of race, pursuant to state laws permitting or requiring such segregation, denies to Negro children the equal protection of the laws guaranteed by the Fourteenth Amendment -- even though the physical facilities and other "tangible" factors of white and Negro schools may be equal.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Arguments were to be heard during the next term to determine just how the ruling would be imposed. Just over one year later, on May 31, 1955, Warren read the Court\'s unanimous decision, now referred to as Brown II, instructing the states to begin desegregation plans "with all deliberate speed."',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        },
        {
          id: 'q7',
          text: 'Despite two unanimous decisions and careful, if vague, wording, there was considerable resistance to the Supreme Court\'s ruling in Brown v. Board of Education. In addition to the obvious disapproving segregationists were some constitutional scholars who felt that the decision went against legal tradition by relying heavily on data supplied by social scientists rather than precedent or established law. Supporters of judicial restraint believed the Court had overstepped its constitutional powers by essentially writing new law.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'State-sanctioned segregation of public schools was a violation of the 14th amendment and was therefore unconstitutional. This historic decision marked the end of the "separate but equal" precedent set by the Supreme Court nearly 60 years earlier in Plessy v. Ferguson and served as a catalyst for the expanding civil rights movement during the decade of the 1950s.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-brown-v-board-of-education',
            loc: { section: 'Brown v. Board of Education (1954)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/brown-v-board-of-education'
          }
        },
        {
          id: 'q9',
          text: 'Brown overturned the long held practice of the “separate but equal” doctrine established by Plessy. From then on, any legal challenge on segregation cited Brown as a precedent for desegregation.',
          lang: 'en',
          cite: {
            source: 'nps-montgomery-bus-boycott',
            loc: { section: 'The Montgomery Bus Boycott', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/articles/montgomery-bus-boycott.htm'
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
            value: { d: '1955-05-31' },
            cites: [
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'May 31, 1955: Supreme Court reaffirmed principle of school integration, ordering gradual compliance by local authorities.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Judgment%2C_Brown_v._Board_of_Education_-_NARA_-_301669.jpg/1280px-Judgment%2C_Brown_v._Board_of_Education_-_NARA_-_301669.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Judgment,_Brown_v._Board_of_Education_-_NARA_-_301669.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
