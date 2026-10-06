import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tehran-conference',
  names: [
    { text: 'Tehran Conference', lang: 'en', role: 'primary' },
    { text: 'کنفرانس تهران', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1943-11-28' },
        cites: [
          {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '1' }
          },
          {
            source: 'avalon-tehran-conference-1943',
            loc: { section: 'THE TEHRAN CONFERENCE, NOVEMBER 28-DECEMBER 1, 1943' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1943-12-01' },
        cites: [
          {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '1' }
          },
          {
            source: 'avalon-tehran-conference-1943',
            loc: { section: 'THE TEHRAN CONFERENCE, NOVEMBER 28-DECEMBER 1, 1943' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:second-world-war' },
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:franklin-d-roosevelt',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '1' }
        }
      ]
    },
    {
      ref: 'person:winston-churchill',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '1' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-crisis-of-1946',
      rel: 'related',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-united-nations',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '5' }
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
          text: 'The Tehran Conference was a meeting between U.S. President Franklin Delano Roosevelt, British Prime Minister Winston Churchill, and Soviet Premier Joseph Stalin in Tehran, Iran, between November 28 and December 1, 1943.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/tehran-conf'
          }
        },
        {
          id: 'q2',
          text: 'Tehran Conference with Churchill, Roosevelt, and Stalin takes place, chiefly to discuss the opening of a “second front” in Western Europe. They declare and guarantee Iranian independence and territorial integrity, and agree to provide economic assistance to Iran after the war.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1943' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Roosevelt, Churchill, and Stalin engaged in discussions concerning the terms under which the British and Americans finally committed to launching Operation Overlord, an invasion of northern France, to be executed by May of 1944.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/tehran-conf'
          }
        },
        {
          id: 'q4',
          text: '(4) Took note that Operation OVERLORD would be launched during May 1944, in conjunction with an operation against Southern France.',
          lang: 'en',
          cite: {
            source: 'avalon-tehran-conference-1943',
            loc: { section: '(c) Military Conclusions of the Tehran Conference' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/wwii/tehran.asp' }
        },
        {
          id: 'q5',
          text: 'Stalin pressed for a revision of Poland’s eastern border with the Soviet Union to match the line set by British Foreign Secretary Lord Curzon in 1920. In order to compensate Poland for the resulting loss of territory, the three leaders agreed to move the German-Polish border to the Oder and Neisse rivers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/tehran-conf'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'We the President of the United States, the Prime Minister of Great Britain, and the Premier of the Soviet Union, have met these four days past, in this, the Capital of our Ally, Iran, and have shaped and confirmed our common policy.',
          lang: 'en',
          cite: {
            source: 'avalon-tehran-conference-1943',
            loc: { section: '(a) Declaration of the Three Powers, December 1, 1943' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/wwii/tehran.asp' }
        },
        {
          id: 'q7',
          text: 'The Governments of the United States, the U. S. S. R., and the United Kingdom recognize the assistance which Iran has given in the prosecution of the war against the common enemy, particularly by facilitating the transportation of supplies from overseas to the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'avalon-tehran-conference-1943',
            loc: { section: '(b) Declaration of the Three Powers Regarding Iran, December 1, 1943' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/wwii/tehran.asp' }
        },
        {
          id: 'q8',
          text: 'The Governments of the United States, the U. S. S. R., and the United Kingdom are at one with the Government of Iran in their desire for the maintenance of the independence, sovereignty and territorial integrity of Iran',
          lang: 'en',
          cite: {
            source: 'avalon-tehran-conference-1943',
            loc: { section: '(b) Declaration of the Three Powers Regarding Iran, December 1, 1943' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/wwii/tehran.asp' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Roosevelt secured many of his objectives during the Conference. The Soviet Union had committed to joining the war against Japan and expressed support for Roosevelt’s plans for the United Nations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/tehran-conf'
          }
        },
        {
          id: 'q10',
          text: 'However, Stalin also gained tentative concessions on Eastern Europe that would be confirmed during the later wartime conferences.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-tehran-conference',
            loc: { section: 'The Tehran Conference, 1943', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/tehran-conf'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Stalin_Roosevelt_Churchill_at_Tehran_cph.3c35324.jpg/1280px-Stalin_Roosevelt_Churchill_at_Tehran_cph.3c35324.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Stalin_Roosevelt_Churchill_at_Tehran_cph.3c35324.jpg',
    credit: { institution: 'Library of Congress', creator: '12th Army Air Force Signal Corps' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'cairo-teheran-conference-1943',
      mediaKind: 'video',
      title: 'Cairo and Teheran Conference',
      url: 'https://archive.org/download/gov.fdr.231/gov.fdr.231_512kb.mp4',
      page: 'https://archive.org/details/gov.fdr.231',
      credit: {
        institution: 'Franklin D. Roosevelt Presidential Library and Museum (Internet Archive)'
      },
      license: { id: 'public-domain' },
      bytes: 69312312,
      date: { d: '1943' },
      durationSec: 967
    }
  ]
})
