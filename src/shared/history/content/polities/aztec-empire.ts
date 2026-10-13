import { definePolity } from '../../schema'

export default definePolity({
  id: 'aztec-empire',
  names: [
    { text: 'Aztec Empire', lang: 'en', role: 'primary' },
    {
      text: 'Triple Alliance',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1430', approx: true },
        cites: [
          { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1521-08' },
        cites: [
          {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:tenochtitlan',
      cites: [
        { source: 'loc-mexico-country-study-1996', loc: { section: 'The Aztec', para: '2' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 2608489, to: 1521 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Codex_Mendoza_folio_2r.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Codex_Mendoza_folio_2r.jpg',
    credit: { creator: 'Unknown (Codex Mendoza)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'About 1430 took place the triple alliance of the Acolhua, Aztec and Tepanec kings, whose capitals were Tezcuco, Mexico and Tlacopan, the latter standing much below the other two.',
          lang: 'en',
          cite: { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mexico'
          }
        },
        {
          id: 'q2',
          text: 'By the early sixteenth century, Aztec domination reached into most of central and southern Mexico (with the exception of the Mayan areas in the southeast).',
          lang: 'en',
          cite: { source: 'loc-mexico-country-study-1996', loc: { section: 'The Aztec', para: '2' } },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/5.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Aztec established a monarchy in 1376, naming Acamapichtli as their first king.',
          lang: 'en',
          cite: { source: 'loc-mexico-country-study-1996', loc: { section: 'The Aztec', para: '2' } },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/5.htm' }
        },
        {
          id: 'q4',
          text: 'When the first Moteuczoma was crowned king of the Aztecs, the Mexican sway extended far beyond the valley plateau of its origin, and the gods of conquered nations around had their shrines set up in Tenochtitlan in manifest inferiority to the temple of Huitzilopochtli, the war-god of the Aztec conquerors.',
          lang: 'en',
          cite: { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '298' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mexico'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Aztec chieftains staged a revolt, however, and the Spanish were forced to retreat to the east.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        },
        {
          id: 'q6',
          text: 'Once released from the central political control of Tenochtitlán, most towns surrendered to Cortés\'s men.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        }
      ]
    }
  ]
})
