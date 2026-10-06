import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'edisons-incandescent-lamp',
  names: [
    { text: 'Edison’s incandescent lamp', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1879-12' },
        cites: [
          {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 3,
  places: [
    {
      ref: 'place:menlo-park',
      cites: [
        {
          source: 'nps-edis-edison-biography',
          loc: { section: 'Edison Biography', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:thomas-edison',
      role: 'organizer',
      cites: [
        {
          source: 'nps-edis-edison-biography',
          loc: { section: 'Edison Biography', para: '9' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1876 Edison sold all his Newark manufacturing concerns and moved his family and staff of assistants to the small village of Menlo Park, twenty-five miles southwest of New York City.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
          }
        },
        {
          id: 'q2',
          text: 'In 1878, the creation of a practical long-burning electric light had eluded scientists for decades.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-edison-light-bulb-patent',
            loc: {
              section: 'Thomas Edison\'s Patent Application for the Light Bulb (1880)',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/thomas-edisons-patent-application-for-the-light-bulb'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Edison\'s eventual achievement was inventing not just an incandescent electric light, but also an electric lighting system that contained all the elements necessary to make the incandescent light practical, safe, and economical.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
          }
        },
        {
          id: 'q4',
          text: 'After one and a half years of work, success was achieved when an incandescent lamp with a filament of carbonized sewing thread burned for thirteen and a half hours.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
          }
        },
        {
          id: 'q5',
          text: 'Edison\'s patent was an improvement on electric lamps, not the invention of them; but because of Edison’s design changes and the materials he used—such as a carbon filament—his patent allowed for an electric lamp that was reliable, safe, and practical.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-edison-light-bulb-patent',
            loc: {
              section: 'Thomas Edison\'s Patent Application for the Light Bulb (1880)',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/thomas-edisons-patent-application-for-the-light-bulb'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The success of his electric light brought Edison to new heights of fame and wealth, as electricity spread around the world.',
          lang: 'en',
          cite: {
            source: 'nps-edis-edison-biography',
            loc: { section: 'Edison Biography', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
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
            value: { d: '1879-12' },
            cites: [
              {
                source: 'nps-edis-edison-biography',
                loc: { section: 'Edison Biography', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The first public demonstration of the Edison\'s incandescent lighting system was in December 1879, when the Menlo Park laboratory complex was electrically lighted.',
        lang: 'en',
        cite: {
          source: 'nps-edis-edison-biography',
          loc: { section: 'Edison Biography', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/edis/learn/historyculture/edison-biography.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1880-01-27' },
            cites: [
              {
                source: 'nara-milestone-edison-light-bulb-patent',
                loc: {
                  section: 'Thomas Edison\'s Patent Application for the Light Bulb (1880)',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The patent number for his electric lamp is 223,898.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-edison-light-bulb-patent',
          loc: {
            section: 'Thomas Edison\'s Patent Application for the Light Bulb (1880)',
            para: '6'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/thomas-edisons-patent-application-for-the-light-bulb'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Drawing_for_an_Electric_Lamp_-_NARA_-_595450.jpg/1280px-Drawing_for_an_Electric_Lamp_-_NARA_-_595450.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Drawing_for_an_Electric_Lamp_-_NARA_-_595450.jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'Thomas A. Edison'
    },
    license: { id: 'public-domain' }
  }
})
