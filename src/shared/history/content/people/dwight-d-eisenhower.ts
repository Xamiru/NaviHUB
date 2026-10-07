import { definePerson } from '../../schema'

export default definePerson({
  id: 'dwight-d-eisenhower',
  names: [
    { text: 'Dwight D. Eisenhower', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  died: {
    alts: [
      {
        value: { d: '1969-03-28' },
        cites: [
          {
            source: 'eisenhower-library-post-presidential-years',
            loc: { section: 'Post-Presidential Years', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'military'],
  offices: [
    {
      title: 'President of the United States',
      end: {
        alts: [
          {
            value: { d: '1961-01-20' },
            cites: [
              {
                source: 'eisenhower-library-post-presidential-years',
                loc: { section: 'Post-Presidential Years', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '5' } },
        {
          source: 'eisenhower-library-post-presidential-years',
          loc: { section: 'Post-Presidential Years', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg/1280px-Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Dwight_D._Eisenhower,_official_photo_portrait,_May_29,_1959.jpg',
    credit: { institution: 'Dwight D. Eisenhower Presidential Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After 40 years of military service, Eisenhower devoted his presidency to waging peace. He strengthened the nation through alliances, promoting prosperity, and demonstrating moral leadership.',
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
        },
        {
          id: 'q2',
          text: 'Concerns about the international spread of communism and the growing power of the Soviet Union dominated most foreign policy decisions during the administration of President Dwight D. Eisenhower.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1953-1960-foreword',
            loc: { section: '1953–1960: Entrenchment of a Bi-Polar Foreign Policy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/foreword'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In order to counterbalance the Soviet threat, President Eisenhower supported a doctrine of massive retaliation, which called for the development of technology necessary to match and even surpass Soviet nuclear capability.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1953-1960-foreword',
            loc: { section: '1953–1960: Entrenchment of a Bi-Polar Foreign Policy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/foreword'
          }
        },
        {
          id: 'q4',
          text: 'President Dwight D. Eisenhower announced the Eisenhower Doctrine in January 1957, and Congress approved it in March of the same year.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-eisenhower-doctrine',
            loc: { section: 'The Eisenhower Doctrine, 1957', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/eisenhower-doctrine'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'On January 20, 1961 President Eisenhower retired to his small farm adjacent to the battlefield outside Gettysburg, Pennsylvania.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-post-presidential-years',
            loc: { section: 'Post-Presidential Years', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/eisenhowers/post-presidential-years'
          }
        },
        {
          id: 'q6',
          text: 'In August 1965, Eisenhower suffered a serious heart attack that ended his participation in public affairs. He was frequently hospitalized over the next three years. He suffered another heart attack in the summer of 1968 and he spent his last few months in Walter Reed Army Hospital, where he died on March 28, 1969.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-post-presidential-years',
            loc: { section: 'Post-Presidential Years', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/eisenhowers/post-presidential-years'
          }
        }
      ]
    }
  ]
})
