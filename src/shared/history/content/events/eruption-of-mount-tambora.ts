import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'eruption-of-mount-tambora',
  names: [
    { text: 'Eruption of Mount Tambora', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1815-04-10' },
        cites: [
          {
            source: 'nasa-earth-observatory-stefanov-tambora',
            loc: { section: 'Mount Tambora Volcano, Sumbawa Island, Indonesia', para: '1' }
          },
          {
            source: 'noaa-nesdis-tambora-1815',
            loc: {
              section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
              para: '2'
            }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:mount-tambora',
      cites: [
        {
          source: 'noaa-nesdis-tambora-1815',
          loc: {
            section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
            para: '1'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 11000 },
            cites: [
              {
                source: 'noaa-nesdis-tambora-1815',
                loc: {
                  section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
                  para: '3'
                }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:year-without-a-summer',
      rel: 'led-to',
      cites: [
        {
          source: 'nasa-earth-observatory-stefanov-tambora',
          loc: { section: 'Mount Tambora Volcano, Sumbawa Island, Indonesia', para: '1' }
        },
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
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On April 10, 1815, the Tambora Volcano produced the largest eruption in recorded history.',
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
        },
        {
          id: 'q2',
          text: 'An estimated 150 cubic kilometers (36 cubic miles) of tephra—exploded rock and ash—resulted, with ash from the eruption recognized at least 1,300 kilometers (808 miles) away to the northwest.',
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
        },
        {
          id: 'q3',
          text: 'Mount Tambora, located on the island of Sumbawa in present-day Indonesia, is an active stratovolcano that was one of the tallest mountains in all of Indonesia before its eruption. After the event, its height decreased from 14,100 feet to just under 10,000.',
          lang: 'en',
          cite: {
            source: 'noaa-nesdis-tambora-1815',
            loc: {
              section: 'This Day In History: Mount Tambora Explosively Erupts in 1815',
              para: '1'
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
          text: 'While the actual eruption occurred between April 5 to its climax on April 10, smoke and ash from the event circumnavigated the Northern Hemisphere.',
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
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q5',
          text: 'According to historical climatological sources , the death toll of the 1815 event was 11,000 from pyroclastic flows and more than 100,000 from the resulting food shortages over the following decade.',
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
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'In 2004, scientists discovered the remains of a village, and two adults buried under approximately 3 meters (nearly 10 feet) of ash in a gully on Tambora’s flank—remnants of the former Kingdom of Tambora preserved by the 1815 eruption that destroyed it.',
          lang: 'en',
          cite: {
            source: 'nasa-earth-observatory-stefanov-tambora',
            loc: { section: 'Mount Tambora Volcano, Sumbawa Island, Indonesia', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthobservatory.nasa.gov/images/39412/mount-tambora-volcano-sumbawa-island-indonesia'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/ISS020-E-6563_-_View_of_Indonesia.jpg/1280px-ISS020-E-6563_-_View_of_Indonesia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:ISS020-E-6563_-_View_of_Indonesia.jpg',
    credit: { institution: 'NASA Johnson Space Center' },
    license: { id: 'public-domain' }
  }
})
