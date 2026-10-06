import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'san-francisco-earthquake-1906',
  names: [
    { text: '1906 San Francisco earthquake', lang: 'en', role: 'primary' },
    {
      text: 'California earthquake of April 18, 1906',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'usgs-great-1906-earthquake',
          loc: { section: 'The Great 1906 San Francisco Earthquake', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1906-04-18' },
        cites: [
          {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '0' }
          },
          {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    { ref: 'place:san-francisco' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The California earthquake of April 18, 1906 ranks as one of the most significant earthquakes of all time. Today, its importance comes more from the wealth of scientific knowledge derived from it than from its sheer size.',
          lang: 'en',
          cite: {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/'
          }
        },
        {
          id: 'q2',
          text: 'At almost precisely 5:12 a.m., local time, a foreshock occurred with sufficient force to be felt widely throughout the San Francisco Bay area. The great earthquake broke loose some 20 to 25 seconds later, with an epicenter near San Francisco. Violent shocks punctuated the strong shaking which lasted some 45 to 60 seconds.',
          lang: 'en',
          cite: {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/'
          }
        },
        {
          id: 'q3',
          text: 'In the public\'s mind, this earthquake is perhaps remembered most for the fire it spawned in San Francisco, giving it the somewhat misleading appellation of the "San Francisco earthquake". Shaking damage, however, was equally severe in many other places along the fault rupture.',
          lang: 'en',
          cite: {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'The frequently quoted value of 700 deaths caused by the earthquake and fire is now believed to underestimate the total loss of life by a factor of 3 or 4. Most of the fatalities occurred in San Francisco, and 189 were reported elsewhere.',
          lang: 'en',
          cite: {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Analysis of the 1906 displacements and strain in the surrounding crust led Reid (1910) to formulate his elastic-rebound theory of the earthquake source, which remains today the principal model of the earthquake cycle.',
          lang: 'en',
          cite: {
            source: 'usgs-great-1906-earthquake',
            loc: { section: 'The Great 1906 San Francisco Earthquake', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/San_Francisco_Fire_Sacramento_Street_1906-04-18.jpg/1280px-San_Francisco_Fire_Sacramento_Street_1906-04-18.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:San_Francisco_Fire_Sacramento_Street_1906-04-18.jpg',
    title: 'San Francisco earthquake and fire of 1906. Looking Down Sacramento Street, April 18, 1906.',
    credit: { institution: 'Library of Congress', creator: 'Arnold Genthe' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'trip-down-market-street',
      mediaKind: 'video',
      title: 'A Trip Down Market Street Before the Fire',
      date: { d: '1906-04' },
      url: 'https://archive.org/download/sanfran_hd_h264/sanfran_1080p_stabilized.mp4',
      page: 'https://archive.org/details/sanfran_hd_h264',
      credit: { institution: 'Internet Archive', creator: 'Miles Brothers' },
      license: { id: 'public-domain' },
      bytes: 54429796,
      durationSec: 625
    }
  ]
})
