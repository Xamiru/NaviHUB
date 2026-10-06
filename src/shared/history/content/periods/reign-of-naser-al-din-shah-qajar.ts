import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-naser-al-din-shah-qajar',
  names: [
    { text: 'Reign of Naser al-Din Shah Qajar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1848' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '14' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1896' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:qajar-dynasty',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'When Naser ad Din acceded to the throne in 1848, his prime minister, Mirza Taqi Khan Amir Kabir, attempted to strengthen the administration by reforming the tax system, asserting central control over the bureaucracy and the provincial governors, encouraging trade and industry, and reducing the influence of the Islamic clergy and foreign powers.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q2',
          text: 'With the accession of Nāṣer-al-Din Shah in 1264/1848, his prime minister, Mirzā Taqi Khan Amir Kabir (q.v.), faced two immediate problems in Khorasan: the revolt of Ḥasan Khan Sālār and the disobedience of the governors of Herat (Noelle-Karimi, pp. 228-30).',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'The last years of Naser ad Din Shah\'s reign were characterized by growing royal and bureaucratic corruption, oppression of the rural population, and indifference on the shah\'s part.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/The_Young_Nasir_Al-Din_Shah_Qajar.jpg/1280px-The_Young_Nasir_Al-Din_Shah_Qajar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Young_Nasir_Al-Din_Shah_Qajar.jpg',
    credit: { creator: 'Mirza Abolhassan Khan Ghaffari' },
    license: { id: 'public-domain' }
  }
})
