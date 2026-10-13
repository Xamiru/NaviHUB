import { definePlace } from '../../schema'

export default definePlace({
  id: 'new-julfa',
  names: [
    { text: 'New Julfa', lang: 'en', role: 'primary' },
    { text: 'جلفا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In early summer of 1605, the Julfa deportees were given temporary shelter in Isfahan, and they began with the building of New Julfa on ḵāṣṣa land, on the right bank of the Zāyandarud',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        }
      ]
    }
  ],
  coords: {
    lat: 38.9379,
    lon: 45.6333,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Julfa (geonameid 130081)' } }
    ]
  }
})
