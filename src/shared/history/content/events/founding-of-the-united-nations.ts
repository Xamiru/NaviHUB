import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-united-nations',
  names: [
    { text: 'Founding of the United Nations', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1945-06-26' },
        cites: [
          { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '172' } },
          {
            source: 'avalon-charter-of-the-united-nations',
            loc: { section: 'Charter of the United Nations; June 26, 1945' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1945-10-24' },
        cites: [
          {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:san-francisco',
      cites: [
        {
          source: 'state-dept-milestones-formation-of-the-united-nations',
          loc: { section: 'The Formation of the United Nations, 1945', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:franklin-d-roosevelt',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-formation-of-the-united-nations',
          loc: { section: 'The Formation of the United Nations, 1945', para: '3' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-formation-of-the-united-nations',
          loc: { section: 'The Formation of the United Nations, 1945', para: '3' }
        }
      ]
    },
    {
      name: 'Cordell Hull',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-formation-of-the-united-nations',
          loc: { section: 'The Formation of the United Nations, 1945', para: '3' }
        }
      ]
    },
    {
      name: 'Anthony Eden',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-formation-of-the-united-nations',
          loc: { section: 'The Formation of the United Nations, 1945', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:second-world-war',
      rel: 'response-to',
      cites: [
        {
          source: 'avalon-charter-of-the-united-nations',
          loc: { section: 'Charter of the United Nations; June 26, 1945' }
        }
      ]
    },
    {
      ref: 'event:tehran-conference',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-formation-of-the-united-nations',
          loc: { section: 'The Formation of the United Nations, 1945', para: '3' }
        }
      ]
    },
    { ref: 'event:universal-declaration-of-human-rights', rel: 'related' },
    { ref: 'event:iran-crisis-of-1946', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Representatives of 50 nations met in San Francisco April-June 1945 to complete the Charter of the United Nations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/un'
          }
        },
        {
          id: 'q2',
          text: 'The United Nations came into existence on October 24, 1945, after 29 nations had ratified the Charter.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/un'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On January 1, 1942, representatives of 26 nations at war with the Axis powers met in Washington to sign the Declaration of the United Nations endorsing the Atlantic Charter, pledging to use their full resources against the Axis and agreeing not to make a separate peace.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/un'
          }
        },
        {
          id: 'q4',
          text: 'U.S., British, Soviet, and Chinese representatives met at Dumbarton Oaks in Washington in August and September 1944 to draft the charter of a postwar international organization based on the principle of collective security.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/un'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'WE THE PEOPLES OF THE UNITED NATIONS DETERMINED to save succeeding generations from the scourge of war, which twice in our lifetime has brought untold sorrow to mankind, and to reaffirm faith in fundamental human rights, in the dignity and worth of the human person,',
          lang: 'en',
          cite: { source: 'avalon-charter-of-the-united-nations', loc: { section: 'Preamble' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/unchart.asp'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Voting procedures and the veto power of permanent members of the Security Council were finalized at the Yalta Conference in 1945 when Roosevelt and Stalin agreed that the veto would not prevent discussions by the Security Council.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/un'
          }
        },
        {
          id: 'q7',
          text: 'The Senate approved the UN Charter on July 28, 1945, by a vote of 89 to 2.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-formation-of-the-united-nations',
            loc: { section: 'The Formation of the United Nations, 1945', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/un'
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
            value: { d: '1946-01-10' },
            cites: [
              {
                source: 'lemo-chronik-1946',
                loc: { section: 'Jahreschronik 1946', para: '4' }
              },
              {
                source: 'nps-elro-eleanor-roosevelt-and-the-udhr',
                loc: { section: 'Eleanor Roosevelt and the Universal Declaration of Human Rights' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'President Harry Truman had appointed Eleanor Roosevelt to the United States delegation to the United Nations in December 1945. Soon after her return the following February from London, where the General Assembly first convened, she received a call from UN Secretary-General Trygve Lie, telling her that he had appointed her to the nuclear commission charged with creating the formal human rights commission.',
        lang: 'en',
        cite: {
          source: 'nps-elro-eleanor-roosevelt-and-the-udhr',
          loc: { section: 'Eleanor Roosevelt and the Universal Declaration of Human Rights' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.nps.gov/elro/learn/historyculture/udhr.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/64/UN_San_Francisco_Delegates_1945.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:UN_San_Francisco_Delegates_1945.jpg',
    credit: { institution: 'UN Photo' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'san-francisco-parley-ends-1945',
      mediaKind: 'video',
      title: 'San Francisco Parley Ends, 1945/06/28',
      url: 'https://archive.org/download/1945-06-28_San_Francisco_Parley_Ends/1945-06-28_San_Francisco_Parley_Ends.mp4',
      page: 'https://archive.org/details/1945-06-28_San_Francisco_Parley_Ends',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 20347622,
      date: { d: '1945-06-28' },
      durationSec: 209
    }
  ]
})
