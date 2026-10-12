import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dayton-agreement',
  names: [
    { text: 'Dayton Agreement', lang: 'en', role: 'primary' },
    {
      text: 'General Framework Agreement for Peace in Bosnia and Herzegovina',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
          loc: { section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina' }
        }
      ]
    },
    {
      text: 'Dayton Peace Accords',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-riley-clinton-foreign-affairs',
          loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1995-11-21' },
        cites: [
          {
            source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
            loc: { section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1995-12-14' },
        cites: [
          {
            source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
            loc: { section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:bosnia-and-herzegovina',
      cites: [
        {
          source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
          loc: { section: 'Summary of the General Framework Agreement', para: '2' }
        }
      ]
    },
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
          loc: { section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:bosnian-war',
      cites: [
        {
          source: 'millercenter-riley-clinton-foreign-affairs',
          loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'bosnia',
      name: 'Republic of Bosnia and Herzegovina',
      cites: [
        {
          source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
          loc: { section: 'Summary of the General Framework Agreement', para: '2' }
        }
      ]
    },
    {
      key: 'croatia',
      name: 'Republic of Croatia',
      cites: [
        {
          source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
          loc: { section: 'Summary of the General Framework Agreement', para: '2' }
        }
      ]
    },
    {
      key: 'fry',
      name: 'Federal Republic of Yugoslavia',
      cites: [
        {
          source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
          loc: { section: 'Summary of the General Framework Agreement', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Richard Holbrooke',
      role: 'negotiator',
      cites: [
        {
          source: 'millercenter-riley-clinton-foreign-affairs',
          loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
        }
      ]
    },
    {
      ref: 'person:bill-clinton',
      role: 'head-of-state',
      cites: [
        {
          source: 'millercenter-riley-clinton-foreign-affairs',
          loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:kosovo-war',
      rel: 'followed-by',
      cites: [
        {
          source: 'millercenter-riley-clinton-foreign-affairs',
          loc: { section: 'Bill Clinton: Foreign Affairs', para: '10' }
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
          text: 'After two years of keeping U.S. involvement in the conflict to a minimum, Clinton was eventually moved by Serbian atrocities against Bosnian civilians. The administration pushed NATO (North Atlantic Treaty Organization) to begin bombing Bosnian Serb positions. Eventually, that use of force, in tandem with diplomatic efforts led by Assistant Secretary of State for European Affairs Richard Holbrooke, brought the three warring parties—Croats, Serbs and Bosnian Muslims—to the bargaining table. The resulting Dayton Peace Accords ended the fighting.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Major international challenges also came from the numerous civil and ethnic conflicts in the Balkans.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Bosnia and Herzegovina will continue as a sovereign state within its present internationally-recognized borders.',
          lang: 'en',
          cite: {
            source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
            loc: { section: 'Summary of the General Framework Agreement', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://en.wikisource.org/wiki/Summary_of_the_General_Framework_Agreement'
          }
        },
        {
          id: 'q4',
          text: 'The agreement invites into Bosnia and Herzegovina a multinational military Implementation Force, the IFOR, under the command of NATO, with a grant of authority from the UN.',
          lang: 'en',
          cite: {
            source: 'state-dept-1995-11-30-summary-of-the-general-framework-agreement',
            loc: { section: 'Summary of the General Framework Agreement', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://en.wikisource.org/wiki/Summary_of_the_General_Framework_Agreement'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'American and NATO troops enforced an uneasy settlement that stabilized war-torn Bosnia with no American casualties.',
          lang: 'en',
          cite: {
            source: 'millercenter-riley-clinton-foreign-affairs',
            loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/clinton/foreign-affairs'
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
            value: { d: '1995-12-14' },
            cites: [
              {
                source: 'ohr-general-framework-agreement-for-peace-in-bosnia-and-herzegovina',
                loc: {
                  section: 'The General Framework Agreement for Peace in Bosnia and Herzegovina'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Clinton sent a peacekeeping force of 20,000 American troops (part of a larger NATO deployment) into the region to enforce a cease-fire that was to be followed by free elections in September 1996.',
        lang: 'en',
        cite: {
          source: 'millercenter-riley-clinton-foreign-affairs',
          loc: { section: 'Bill Clinton: Foreign Affairs', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/clinton/foreign-affairs'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/DaytonAgreement.jpg/1280px-DaytonAgreement.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:DaytonAgreement.jpg',
    credit: { institution: 'United States Air Force', creator: 'Staff Sgt. Brian Schlumbohm' },
    license: { id: 'public-domain' }
  }
})
