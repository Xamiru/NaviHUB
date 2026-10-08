import { definePlace } from '../../schema'

export default definePlace({
  id: 'persepolis',
  names: [
    { text: 'Persepolis', lang: 'en', role: 'primary' },
    { text: 'تخت جمشید', lang: 'fa', role: 'native', translit: 'Taḵt-e Jamšid' }
  ],
  researched: '2026-10-09',
  placeType: 'site',
  regions: ['iran'],
  modernCountry: 'IR',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'PERSEPOLIS (called Taḵt-e Jamšid “Jamšid’s Throne” in Persian), the ruined monuments of the acropolis of the city of Pārsa, the dynastic center of the Achaemenid Persian kings, located in the plain of Marvdašt, some 57 km northeast of Shiraz.',
          lang: 'en',
          cite: { source: 'iranica-shahbazi-persepolis', loc: { section: 'PERSEPOLIS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/persepolis/'
          }
        }
      ]
    }
  ]
})
