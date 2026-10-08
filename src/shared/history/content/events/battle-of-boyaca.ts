import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-boyaca',
  names: [
    { text: 'Battle of Boyacá', lang: 'en', role: 'primary' },
    { text: 'Batalla de Boyacá', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1819-08' },
        cites: [
          {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'The Independence Movement', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:bogota',
      cites: [
        {
          source: 'loc-colombia-country-study-1988',
          loc: { section: 'The Independence Movement', para: '6' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:kingdom-of-spain' }
  ],
  participants: [
    {
      ref: 'person:simon-bolivar',
      role: 'commander',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Epic of Independence', para: '8' }
        }
      ]
    },
    {
      name: 'Francisco de Paula Santander',
      role: 'commander',
      cites: [
        {
          source: 'loc-colombia-country-study-1988',
          loc: { section: 'The Independence Movement', para: '6' }
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
          text: 'In early 1816, Morillo moved to reconquer New Granada and changed his tactics from pardons to terror; Bogotá fell within a few months.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'The Independence Movement', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/12.htm' }
        },
        {
          id: 'q2',
          text: 'Although Caracas remained in royalist hands, the 1819 Congress at Angostura (present-day Ciudad Bolívar) established the Third Republic and named Bolívar as its first president.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'After the decisive defeat of royalist forces at the Battle of Boyacá in August 1819, independence forces entered Bogotá without resistance.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'The Independence Movement', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/12.htm' }
        },
        {
          id: 'q3',
          text: 'Bolívar then quickly marched his troops across the llanos and into the Andes, where a surprise attack on the Spanish garrison at Boyacá, near Bogotá, routed the royalist forces and liberated New Granada.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The merchants and landowners who fought against Spain now held political, economic, and social control over the new country that encompompassed present-day Venezuelan, Colombia, and Panana.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'The Independence Movement', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/12.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Batalla_de_Boyaca_de_Martin_Tovar_y_Tovar.jpg/1280px-Batalla_de_Boyaca_de_Martin_Tovar_y_Tovar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Batalla_de_Boyaca_de_Martin_Tovar_y_Tovar.jpg',
    credit: { creator: 'Martín Tovar y Tovar' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'riano-1969-la-campana-libertadora-de-1819', perspective: 'latin-american' }
  ]
})
