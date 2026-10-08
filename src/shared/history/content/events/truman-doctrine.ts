import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'truman-doctrine',
  names: [
    { text: 'Truman Doctrine', lang: 'en', role: 'primary' },
    {
      text: 'Truman-Doktrin',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1947', loc: { section: 'Jahreschronik 1947', para: '39' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1947-03-12' },
        cites: [
          {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '3' }
          },
          { source: 'lemo-chronik-1947', loc: { section: 'Jahreschronik 1947', para: '38' } },
          {
            source: 'avalon-truman-doctrine-address-1947',
            loc: {
              section: 'PRESIDENT HARRY S. TRUMAN\'S ADDRESS BEFORE A JOINT SESSION OF CONGRESS, MARCH 12, 1947'
            }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe', 'global'],
  prominence: 2,
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-truman-doctrine',
          loc: { section: 'The Truman Doctrine, 1947', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-crisis-of-1946',
      rel: 'response-to',
      cites: [
        {
          source: 'state-dept-milestones-truman-doctrine',
          loc: { section: 'The Truman Doctrine, 1947', para: '4' }
        }
      ]
    },
    {
      ref: 'event:marshall-plan',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-berlin-airlift',
          loc: { section: 'The Berlin Airlift, 1948–1949', para: '4' }
        }
      ]
    },
    {
      ref: 'event:founding-of-nato',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '4' }
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
          text: 'With the Truman Doctrine, President Harry S. Truman established that the United States would provide political, military and economic assistance to all democratic nations under threat from external or internal authoritarian forces.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
          }
        },
        {
          id: 'q8',
          text: 'The Truman Doctrine arose from a speech delivered by President Truman before a joint session of Congress on March 12, 1947.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The immediate cause for the speech was a recent announcement by the British Government that, as of March 31, it would no longer provide military and economic assistance to the Greek Government in its civil war against the Greek Communist Party.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
          }
        },
        {
          id: 'q4',
          text: 'In 1946, four setbacks, in particular, had served to effectively torpedo any chance of achieving a durable post-war rapprochement with the Soviet Union: the Soviets’ failure to withdraw their troops from northern Iran in early 1946 (as per the terms of the Tehran Declaration of 1943); Soviet attempts to pressure the Iranian Government into granting them oil concessions while supposedly fomenting irredentism by Azerbaijani separatists in northern Iran;',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'At the present moment in world history nearly every nation must choose between alternative ways of life. The choice is too often not a free one.',
          lang: 'en',
          cite: {
            source: 'avalon-truman-doctrine-address-1947',
            loc: { section: 'Truman Doctrine' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/trudoc.asp'
          }
        },
        {
          id: 'q6',
          text: 'The seeds of totalitarian regimes are nurtured by misery and want. They spread and grow in the evil soil of poverty and strife. They reach their full growth when the hope of a people for a better life has died. We must keep that hope alive.',
          lang: 'en',
          cite: {
            source: 'avalon-truman-doctrine-address-1947',
            loc: { section: 'Truman Doctrine' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/trudoc.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Rather, in a sharp break with its traditional avoidance of extensive foreign commitments beyond the Western Hemisphere during peacetime, the Truman Doctrine committed the United States to actively offering assistance to preserve the political integrity of democratic nations when such an offer was deemed to be in the best interest of the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Special_Message_to_Congress_on_Greece_and_Turkey_The_Truman_Doctrine.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Special_Message_to_Congress_on_Greece_and_Turkey_The_Truman_Doctrine.jpg',
    credit: { institution: 'Harry S. Truman Library & Museum' },
    license: { id: 'public-domain' }
  }
})
