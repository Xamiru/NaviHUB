import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-nato',
  names: [
    { text: 'Founding of NATO', lang: 'en', role: 'primary' },
    {
      text: 'North Atlantic Treaty Organization',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '0' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1949-04-04' },
        cites: [
          {
            source: 'avalon-north-atlantic-treaty',
            loc: { section: 'Washington DC, 4th April 1949' }
          },
          { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '27' } }
        ]
      }
    ]
  },
  regions: ['europe', 'north-america', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'avalon-north-atlantic-treaty',
          loc: { section: 'Washington DC, 4th April 1949' }
        },
        { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '28' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-fourth-republic' }
  ],
  participants: [
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '9' }
        }
      ]
    },
    {
      name: 'Arthur H. Vandenburg',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:berlin-blockade',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-nato',
          loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '4' }
        }
      ]
    },
    {
      ref: 'event:truman-doctrine',
      rel: 'caused-by',
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
          text: 'The North Atlantic Treaty Organization was created in 1949 by the United States, Canada, and several Western European nations to provide collective security against the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nato',
            loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nato'
          }
        },
        {
          id: 'q2',
          text: 'NATO was the first peacetime military alliance the United States entered into outside of the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nato',
            loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nato'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q3',
          text: 'The Parties agree that an armed attack against one or more of them in Europe or North America shall be considered an attack against them all,',
          lang: 'en',
          cite: { source: 'avalon-north-atlantic-treaty', loc: { section: 'Article 5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/nato.asp'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Great Britain, France, Belgium, the Netherlands and Luxembourg signed the Brussels Treaty in March, 1948. Their treaty provided collective defense; if any one of these nations was attacked, the others were bound to help defend it.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nato',
            loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nato'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'West German entry led the Soviet Union to retaliate with its own regional alliance, which took the form of the Warsaw Treaty Organization and included the Soviet satellite states of Eastern Europe as members.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nato',
            loc: { section: 'North Atlantic Treaty Organization (NATO), 1949', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nato'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Photograph_of_President_Truman_signing_the_document_implementing_the_North_Atlantic_Treaty_at_his_desk_in_the_Oval..._-_NARA_-_200163.jpg/1280px-Photograph_of_President_Truman_signing_the_document_implementing_the_North_Atlantic_Treaty_at_his_desk_in_the_Oval..._-_NARA_-_200163.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_President_Truman_signing_the_document_implementing_the_North_Atlantic_Treaty_at_his_desk_in_the_Oval..._-_NARA_-_200163.jpg',
    credit: { institution: 'US National Archives and Records Administration', creator: 'Abbie Rowe' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'big-picture-decade-of-nato',
      mediaKind: 'video',
      title: 'Big Picture: Decade of North Atlantic Treaty Organization (NATO)',
      url: 'https://archive.org/download/gov.archives.arc.2569740/gov.archives.arc.2569740_512kb.mp4',
      page: 'https://archive.org/details/gov.archives.arc.2569740',
      credit: { institution: 'U.S. National Archives and Records Administration (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 122808125,
      durationSec: 1700
    }
  ]
})
