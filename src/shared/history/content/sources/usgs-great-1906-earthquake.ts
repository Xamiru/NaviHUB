import { defineSource } from '../../schema'

export default defineSource({
  id: 'usgs-great-1906-earthquake',
  type: 'web',
  title: 'The Great 1906 San Francisco Earthquake',
  lang: 'en',
  contributors: [
    { name: 'Ellsworth', role: 'author' }
  ],
  publisher: 'U.S. Geological Survey, Earthquake Hazards Program',
  date: '1990',
  url: 'https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/',
  accessed: '2026-10-06',
  license: { id: 'public-domain' }
})
