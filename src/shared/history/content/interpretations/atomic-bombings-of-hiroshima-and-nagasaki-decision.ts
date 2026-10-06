import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'atomic-bombings-of-hiroshima-and-nagasaki-decision',
  about: ['event:atomic-bombings-of-hiroshima-and-nagasaki', 'person:harry-s-truman'],
  topic: 'motives',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Scholars debate the extent to which Truman’s mention of the bomb at Potsdam and his use of the weapon in Japan represent atomic diplomacy.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-atomic-diplomacy',
      loc: { section: 'Atomic Diplomacy', para: '6' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://history.state.gov/milestones/1945-1952/atomic'
    }
  },
  positions: [
    {
      id: 'us-government-1945',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Japanese began the war from the air at Pearl Harbor. They have been repaid many fold.',
          lang: 'en',
          cite: {
            source: 'truman-1945-08-06-statement-announcing-use-of-a-bomb',
            loc: {
              section: 'Statement by the President Announcing the Use of the A-Bomb at Hiroshima',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.trumanlibrary.gov/library/public-papers/93/statement-president-announcing-use-bomb-hiroshima'
          }
        },
        {
          id: 'q3',
          text: 'It was to spare the Japanese people from utter destruction that the ultimatum of July 26 was issued at Potsdam. Their leaders promptly rejected that ultimatum.',
          lang: 'en',
          cite: {
            source: 'truman-1945-08-06-statement-announcing-use-of-a-bomb',
            loc: {
              section: 'Statement by the President Announcing the Use of the A-Bomb at Hiroshima',
              para: '10'
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
      id: 'faster-end-fewer-casualties',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'U.S. officials did not debate at length whether to use the atomic bomb against Japan, but argued that it was a means to a faster end to the Pacific conflict that would ensure fewer conventional war casualties. They did, however, consider the role that the bomb’s impressive power could play in postwar U.S. relations with the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-atomic-diplomacy',
            loc: { section: 'Atomic Diplomacy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/atomic'
          }
        }
      ]
    },
    {
      id: 'atomic-diplomacy',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Gar Alperovitz', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In 1965, historian Gar Alperovitz published a book which argued that the use of nuclear weapons on the Japanese cities of Hiroshima and Nagasaki was intended to gain a stronger position for postwar diplomatic bargaining with the Soviet Union, as the weapons themselves were not needed to force the Japanese surrender.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-atomic-diplomacy',
            loc: { section: 'Atomic Diplomacy', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/atomic'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Other scholars disagree, and suggest that Truman thought the bomb necessary to achieve the unconditional surrender of recalcitrant Japanese military leaders determined to fight to the death.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-atomic-diplomacy',
            loc: { section: 'Atomic Diplomacy', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/atomic'
          }
        }
      ]
    },
    {
      id: 'many-causes-of-surrender',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'United States Strategic Bombing Survey' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'There is little point in attempting precisely to impute Japan\'s unconditional surrender to any one of the numerous causes which jointly and cumulatively were responsible for Japan\'s disaster.',
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
          text: 'Military defeats in the air, at sea and on the land, destruction of shipping by submarines and by air, and direct air attack with conventional as well as atomic bombs, all contributed to this accomplishment.',
          lang: 'en',
          cite: { source: 'ussbs-1946-summary-report-pacific-war', loc: { page: '106' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/unitedstatesstra00cent/unitedstatesstra00cent_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'city-of-hiroshima',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'City of Hiroshima' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'The US wanted to force a quick surrender by the Japanese to reduce the number of American lives lost. In addition, it was secretly decided at the Yalta Summit in February 1945 that the Soviet Union would enter the war against Japan. Using the atomic bomb before that entry was intended to assure U.S. supremacy in the post-war world order. The U.S. also wanted to test the world\'s first atomic bomb in actual combat to ascertain its effectiveness.',
          lang: 'en',
          cite: {
            source: 'city-of-hiroshima-faq-why-was-the-bomb-dropped',
            loc: { section: 'Q. Why was the atomic bomb dropped on Hiroshima?', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.city.hiroshima.lg.jp/english/peace/1029875/1010073.html'
          }
        }
      ]
    }
  ]
})
