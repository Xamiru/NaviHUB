import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'patria-vieja',
  names: [
    { text: 'Patria Vieja', lang: 'en', role: 'primary' },
    {
      text: 'Old Fatherland',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1810' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1814' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Chile\'s first experiment with self-government, the Old Fatherland (Patria Vieja, 1810-14), was led by José Miguel Carrera Verdugo (president, 1812-13), an aristocrat in his mid-twenties.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        },
        {
          id: 'q2',
          text: 'Among those favoring independence, conservatives fought with liberals over the degree to which French revolutionary ideas would be incorporated into the movement.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'WARS OF INDEPENDENCE, 1810-18', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/8.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Chile%2C_1810_-_Primera_Junta_de_Gobierno.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Chile,_1810_-_Primera_Junta_de_Gobierno.jpg',
    credit: { institution: 'Universidad Diego Portales, Fondo Sady Zañartu' },
    license: { id: 'public-domain' }
  }
})
