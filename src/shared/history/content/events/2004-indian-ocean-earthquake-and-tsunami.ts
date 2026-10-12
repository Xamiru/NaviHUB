import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2004-indian-ocean-earthquake-and-tsunami',
  names: [
    { text: '2004 Indian Ocean earthquake and tsunami', lang: 'en', role: 'primary' },
    {
      text: 'Boxing Day tsunami',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'usgs-indian-ocean-tsunami-remembered',
          loc: { section: 'Indian Ocean Tsunami Remembered', para: '6' }
        }
      ]
    },
    {
      text: 'Christmas tsunami',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'usgs-indian-ocean-tsunami-remembered',
          loc: { section: 'Indian Ocean Tsunami Remembered', para: '6' }
        }
      ]
    },
    {
      text: 'Sumatra-Andaman earthquake',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'usgs-indian-ocean-tsunami-remembered',
          loc: { section: 'Indian Ocean Tsunami Remembered', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '2004-12-26' },
        cites: [
          {
            source: 'usgs-indian-ocean-tsunami-remembered',
            loc: { section: 'Indian Ocean Tsunami Remembered', para: '1' }
          },
          {
            source: 'noaa-sos-tsunami-wave-heights-indian-ocean-december-26-2004',
            loc: { section: 'Tsunami Wave Heights: Indian Ocean - December 26, 2004', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:indonesia',
      cites: [
        {
          source: 'noaa-sos-tsunami-wave-heights-indian-ocean-december-26-2004',
          loc: { section: 'Tsunami Wave Heights: Indian Ocean - December 26, 2004', para: '3' }
        }
      ]
    },
    {
      ref: 'place:thailand',
      cites: [
        {
          source: 'noaa-sos-tsunami-wave-heights-indian-ocean-december-26-2004',
          loc: { section: 'Tsunami Wave Heights: Indian Ocean - December 26, 2004', para: '3' }
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
          text: 'In the early hours of Dec. 26, 2004, one of the world’s most powerful earthquakes triggered one of the largest tsunamis in 40 years.',
          lang: 'en',
          cite: {
            source: 'usgs-indian-ocean-tsunami-remembered',
            loc: { section: 'Indian Ocean Tsunami Remembered', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.usgs.gov/news/featured-story/indian-ocean-tsunami-remembered-scientists-reflect-2004-indian-ocean-killed'
          }
        },
        {
          id: 'q2',
          text: 'The December 26, 2004 magnitude 9.1 Northern Sumatra, Indonesia earthquake (3.316 N, 95.854 E, depth 30 km) generated a tsunami that was observed worldwide and caused tremendous devastation and deaths throughout the Indian Ocean region.',
          lang: 'en',
          cite: {
            source: 'noaa-sos-tsunami-wave-heights-indian-ocean-december-26-2004',
            loc: { section: 'Tsunami Wave Heights: Indian Ocean - December 26, 2004', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://sos.noaa.gov/Datasets/dataset.php?id=598'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'According to USGS scientists, the sea floor near the earthquake was uplifted several meters.',
          lang: 'en',
          cite: {
            source: 'usgs-indian-ocean-tsunami-remembered',
            loc: { section: 'Indian Ocean Tsunami Remembered', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.usgs.gov/news/featured-story/indian-ocean-tsunami-remembered-scientists-reflect-2004-indian-ocean-killed'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'The worst hit country was Indonesia with 167,540 listed as dead or missing and damages of $4,451.6 million.',
          lang: 'en',
          cite: {
            source: 'noaa-sos-tsunami-wave-heights-indian-ocean-december-26-2004',
            loc: { section: 'Tsunami Wave Heights: Indian Ocean - December 26, 2004', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://sos.noaa.gov/Datasets/dataset.php?id=598'
          }
        },
        {
          id: 'q5',
          text: 'In Aceh and Sumatera Utara Provinces, Indonesia, at least 108,100 people were killed, 127,700 are missing and presumed dead and 426,800 were displaced by the earthquake and tsunami.',
          lang: 'en',
          cite: {
            source: 'usgs-indian-ocean-tsunami-remembered',
            loc: { section: 'Indian Ocean Tsunami Remembered', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.usgs.gov/news/featured-story/indian-ocean-tsunami-remembered-scientists-reflect-2004-indian-ocean-killed'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The tsunami claimed more lives in a few hours than any other natural disaster of the 21st century.',
          lang: 'en',
          cite: {
            source: 'usgs-2024-the-night-the-earth-shook',
            loc: { section: 'The Night the Earth Shook', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.usgs.gov/news/featured-story/night-earth-shook'
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
            value: { d: '2004-12-26' },
            cites: [
              {
                source: 'usgs-2024-the-night-the-earth-shook',
                loc: { section: 'The Night the Earth Shook', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'A massive magnitude 9.1 earthquake that had just struck off the coast of Sumatra at 7:58 a.m. local time sent vibrations racing through the Earth\'s crust at several kilometers per second, eventually reaching the sensors that track global seismicity at the USGS National Earthquake Information Center.',
        lang: 'en',
        cite: {
          source: 'usgs-2024-the-night-the-earth-shook',
          loc: { section: 'The Night the Earth Shook', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.usgs.gov/news/featured-story/night-earth-shook'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-12-26' },
            cites: [
              {
                source: 'usgs-indian-ocean-tsunami-remembered',
                loc: { section: 'Indian Ocean Tsunami Remembered', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The tsunami arrived in northern Sumatra approximately 30 minutes after the earthquake, in Thailand approximately an hour and a half to two hours after the earthquake, and in Sri Lanka approximately two to three hours after the earthquake.',
        lang: 'en',
        cite: {
          source: 'usgs-indian-ocean-tsunami-remembered',
          loc: { section: 'Indian Ocean Tsunami Remembered', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://www.usgs.gov/news/featured-story/indian-ocean-tsunami-remembered-scientists-reflect-2004-indian-ocean-killed'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/US_Navy_050119-N-2560Y-298_Aerial_view_of_Banda_Aceh%2C_Sumatra%2C_three_weeks_after_a_Tsunami_devastated_the_coastal_region.jpg/1280px-US_Navy_050119-N-2560Y-298_Aerial_view_of_Banda_Aceh%2C_Sumatra%2C_three_weeks_after_a_Tsunami_devastated_the_coastal_region.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:US_Navy_050119-N-2560Y-298_Aerial_view_of_Banda_Aceh,_Sumatra,_three_weeks_after_a_Tsunami_devastated_the_coastal_region.jpg',
    credit: {
      institution: 'United States Navy',
      creator: 'Photographer\'s Mate 1st Class John D. Yoder'
    },
    license: { id: 'public-domain' }
  }
})
