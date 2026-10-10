import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tabriz-uprising-1978',
  names: [
    { text: 'Tabriz uprising of February 1978', lang: 'en', role: 'primary' },
    { text: 'قیام تبریز', lang: 'fa', role: 'native' },
    { text: 'قیام ۲۹ بهمن', lang: 'fa', role: 'alternative' }
  ],
  researched: '2026-10-10',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1978-02-18' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1978-02-19' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:pahlavi-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '7' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:qom-uprising-1978',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'event:iranian-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '8' }
        }
      ]
    },
    {
      ref: 'event:black-friday-1978',
      rel: 'followed-by',
      cites: [
        { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Anti-government demonstrations in Tabriz commemorate the 40th day of mourning for those martyred in Qom and signal the beginning of cyclical riots every 40 days in other cities that continue until the fall of the regime.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The protest movement took a new turn in January 1978, when a government-inspired article in Ettelaat, one of the country\'s leading newspapers, cast doubt on Khomeini\'s piety and suggested that he was a British agent.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q3',
          text: 'Seminary students took to the streets in Qom and clashed with police, and several demonstrators were killed.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'On February 18, mosque services and demonstrations were held in several cities to honor those killed in the Qom demonstrations.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q5',
          text: 'In Tabriz these demonstrations turned violent, and it was two days before order could be restored.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q6',
          text: 'On 18 February, the fortieth day after this atrocity, mass demonstrations took place in Tabriz, leading to even more bloodshed.',
          lang: 'en',
          cite: { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The cycle of protests that began in Qom and Tabriz differed in nature, composition, and intent from the protests of the preceding year.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q8',
          text: 'By the summer, riots and antigovernment demonstrations had swept dozens of towns and cities.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Tabriz-map-National-Imagery-and-Mapping-Agency-1998.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tabriz-map-National-Imagery-and-Mapping-Agency-1998.jpg',
    credit: { institution: 'U.S. National Imagery and Mapping Agency' },
    license: { id: 'public-domain' }
  }
})
