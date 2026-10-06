import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-corridor',
  names: [
    { text: 'Persian Corridor', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1941-09' },
        cites: [
          { source: 'motter-1952-persian-corridor-and-aid-to-russia', loc: { page: '4' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1945' },
        cites: [
          {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
          },
          { source: 'motter-1952-persian-corridor-and-aid-to-russia', loc: { page: '6' } }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia', 'north-america'],
  prominence: 2,
  partOf: [
    { ref: 'event:second-world-war' },
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  related: [
    {
      ref: 'event:anglo-soviet-invasion-of-iran',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    },
    { ref: 'event:tehran-conference', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'It was lend-lease which, in September 1941 after the German attack on the Soviet Union, made the United States an auxiliary of Great Britain in the task of delivering supplies to the USSR through the Persian Corridor.',
          lang: 'en',
          cite: { source: 'motter-1952-persian-corridor-and-aid-to-russia', loc: { page: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/CMHPub8-1/CMHPub8-1_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'Here was Iran, forcibly occupied by Great Britain and the USSR, two long-standing rivals for its control, serving as a highway over which one of the rivals, calling upon the assistance of a fourth nation, the United States, delivered supplies to the other rival, now, by the fortunes of war, an ally.',
          lang: 'en',
          cite: { source: 'motter-1952-persian-corridor-and-aid-to-russia', loc: { page: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/CMHPub8-1/CMHPub8-1_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'The occupation of Iran proved of vital importance to the Allied cause and brought Iran closer to the Western powers. Britain, the Soviet Union, and the United States together managed to move over 5 million tons of munitions and other war matériel across Iran to the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'British and American forces take over operation of the Trans-Iranian railway to facilitate the sending of supplies to the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1942' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q5',
          text: 'The significance of the supply route is suggested by the fact that 7,900,000 long tons of imports crossed Iran into the Soviet Union in the years 1941-45, including 180,000 trucks and 4,874 airplanes.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q6',
          text: 'It has been estimated that American deliveries through the Persian Corridor to the USSR were sufficient, by U.S. Army standards, to maintain sixty combat divisions in the line.',
          lang: 'en',
          cite: { source: 'motter-1952-persian-corridor-and-aid-to-russia', loc: { page: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/CMHPub8-1/CMHPub8-1_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The effects of the war, however, were very disruptive for Iran. Food and other essential items were scarce. Severe inflation imposed great hardship on the lower and middle classes, while fortunes were made by individuals dealing in scarce items. The presence of foreign troops accelerated social change and also fed xenophobic and nationalist sentiments.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/A_United_States_Army_truck_convoy_carrying_supplies_for_Russia.jpg/1280px-A_United_States_Army_truck_convoy_carrying_supplies_for_Russia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_United_States_Army_truck_convoy_carrying_supplies_for_Russia.jpg',
    credit: { institution: 'Library of Congress', creator: 'Nick Parrino' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'pocket-guide-to-iran-1943',
      mediaKind: 'document',
      title: 'A Pocket Guide To Iran',
      url: 'https://archive.org/download/PocketGuideToIran1943/PocketGuideToIran1943.pdf',
      page: 'https://archive.org/details/PocketGuideToIran1943',
      credit: {
        institution: 'Central University Libraries, Southern Methodist University (Internet Archive)',
        creator: 'United States. Army Service Forces. Special Service Division'
      },
      license: { id: 'public-domain' },
      bytes: 5368358,
      date: { d: '1943' }
    },
    {
      id: 'persian-corridor-and-aid-to-russia',
      mediaKind: 'document',
      title: 'CMH Pub 8-1 The Persian Corridor And Aid To Russia',
      url: 'https://archive.org/download/CMHPub8-1/CMHPub8-1.pdf',
      page: 'https://archive.org/details/CMHPub8-1',
      credit: {
        institution: 'U.S. Army Center of Military History (Internet Archive)',
        creator: 'Motter, T. H. Vail'
      },
      license: { id: 'public-domain' },
      bytes: 27620662,
      date: { d: '1952' }
    }
  ]
})
