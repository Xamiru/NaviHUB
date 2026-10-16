import { definePolity } from '../../schema'

export default definePolity({
  id: 'mamluk-sultanate',
  names: [
    { text: 'Mamluk Sultanate', lang: 'en', role: 'primary' },
    {
      text: 'Mamluks',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Historical Setting', para: '5' }
        }
      ]
    },
    {
      text: 'Mamelukes',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-mameluke', loc: { section: 'Mameluke', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'sultanate',
  start: {
    alts: [
      {
        value: { d: '1250' },
        cites: [
          { source: 'britannica-1911-mameluke', loc: { section: 'Mameluke', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1517' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Historical Setting', para: '6' }
          },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1356' } }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:cairo',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Historical Setting', para: '5' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 282428 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Qutuz\'s successor, Baybars I, inaugurated the reign of the Mamluks, a dynasty of slave-soldiers of Turkish and Circassian origin that lasted for almost three centuries.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Historical Setting', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/egypt/4.htm' }
        },
        {
          id: 'q2',
          text: 'By the fourteenth century, after repelling repeated invasions by Mongols from the north, the Mamluk sultans of Egypt, successors to the Ayyubids, ruled from the Nile to the Euphrates.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Succeeding Caliphates and Kingdoms', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/syria/6.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'MAMELUKE (anglicized through the French, from the Arabic mamlūk, a slave), the name given to a series of Egyptian sultans, originating (1250) in the usurpation of supreme power by the bodyguard of Turkish slaves first formed in Egypt under the successors of Saladin.',
          lang: 'en',
          cite: { source: 'britannica-1911-mameluke', loc: { section: 'Mameluke', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mameluke'
          }
        },
        {
          id: 'q4',
          text: 'In 1260, the Egyptian ruler, Qutuz, and his forces stopped the Mongol advance across the Arab world at the battle of Ayn Jalut in Palestine.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Historical Setting', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/egypt/4.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'In 1516 the Ottoman sultan in Turkey defeated the Mamluks at Aleppo and made Syria a province of a new Muslim empire.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'Succeeding Caliphates and Kingdoms', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/syria/6.htm' }
        },
        {
          id: 'q6',
          text: 'In 1517 Egypt was conquered by Sultan Selim I and absorbed into the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Historical Setting', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/egypt/4.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mamluk_Sultanate_in_the_Catalan_Atlas_%281375%29%2C_ruler_and_flags.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mamluk_Sultanate_in_the_Catalan_Atlas_(1375),_ruler_and_flags.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Cresques Abraham' },
    license: { id: 'public-domain' }
  }
})
