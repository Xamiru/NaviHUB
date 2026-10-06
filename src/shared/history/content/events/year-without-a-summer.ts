import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'year-without-a-summer',
  names: [
    { text: 'Year Without a Summer', lang: 'en', role: 'primary' },
    {
      text: 'The Year Without A Summer',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'noaa-nesdis-tambora-1815',
          loc: {
            section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
            para: '2'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1816' },
        cites: [
          {
            source: 'nasa-earth-observatory-stefanov-tambora',
            loc: { section: 'Mount Tambora Volcano, Sumbawa Island, Indonesia', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'europe', 'north-america'],
  prominence: 2,
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Enough ash was put into the atmosphere from the April 10 eruption to reduce incident sunlight on the Earth’s surface, causing global cooling, which resulted in the 1816 “year without a summer.”',
          lang: 'en',
          cite: {
            source: 'nasa-earth-observatory-stefanov-tambora',
            loc: { section: 'Mount Tambora Volcano, Sumbawa Island, Indonesia', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthobservatory.nasa.gov/images/39412/mount-tambora-volcano-sumbawa-island-indonesia'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The year following the eruption was known as The Year Without A Summer , where average temperatures in the Northern Hemisphere dropped a full degree Fahrenheit due to the resulting dust that was spewed high into the atmosphere.',
          lang: 'en',
          cite: {
            source: 'noaa-nesdis-tambora-1815',
            loc: {
              section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nesdis.noaa.gov/news/day-history-mount-tambora-explosively-erupts-1815'
          }
        },
        {
          id: 'q3',
          text: 'The volcanic winter also caused crop failures , food shortages, and flooding for most of North America, Western Europe, and parts of Asia.',
          lang: 'en',
          cite: {
            source: 'noaa-nesdis-tambora-1815',
            loc: {
              section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nesdis.noaa.gov/news/day-history-mount-tambora-explosively-erupts-1815'
          }
        },
        {
          id: 'q4',
          text: 'According to NOAA’S Earth Systems Research Laboratory (ESRL)’s homeschool-friendly 6-12 grade worksheet on volcanic eruptions, “[in] New England, snow fell in July of 1816, and temperatures reached the 30’s.”',
          lang: 'en',
          cite: {
            source: 'noaa-nesdis-tambora-1815',
            loc: {
              section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nesdis.noaa.gov/news/day-history-mount-tambora-explosively-erupts-1815'
          }
        }
      ]
    }
  ]
})
