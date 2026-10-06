import { definePlace } from '../../schema'

export default definePlace({
  id: 'tabriz',
  names: [
    { text: 'Tabriz', lang: 'en', role: 'primary' },
    { text: 'تبریز', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Under ʿAbbās Mīrzā, thanks to its geographical position and the political situation, Tabrīz became the gateway for entry of modern influences.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    }
  ],
  coords: {
    lat: 38.0882,
    lon: 46.2993,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tabriz (ne_id 1159150135)' }
      }
    ]
  }
})
