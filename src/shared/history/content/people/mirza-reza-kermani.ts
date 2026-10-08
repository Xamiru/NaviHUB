import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-reza-kermani',
  names: [
    { text: 'Mirza Reza Kermani', lang: 'en', role: 'primary' },
    { text: 'میرزا رضا کرمانی', lang: 'fa', role: 'native' },
    {
      text: 'Mirzā Reżā of Kermān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  regions: ['iran'],
  roles: ['revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Meanwhile, an ex-servant and disciple of Afḡānī, Mīrzā Reżā, after being freed from jail in Iran, came to Istanbul and found Afḡānī.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'By reason of the stocks and chains which I suffered unjustly ; the stripes that I endured, so that I ripped open my belly [in order to escape torture by suicide] ; the agonies that I endured in the house of the Naibtis-Saltana at the Amiriyya Palace, at Qazwin, in the gaol, and once again in the gaol.',
          lang: 'en',
          cite: { source: 'browne-1910-persian-revolution', loc: { page: '65' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'Even now I am ready for such investigation.',
          lang: 'en',
          cite: { source: 'browne-1910-persian-revolution', loc: { page: '66' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Mīrzā Reżā returned and on 1 May 1896, as Nāṣer-al-dīn Shah was preparing for the 50th lunar anniversary of his accession, Mīrzā Reżā pretended to offer a petition but instead shot the shah dead. He was hanged and the Iranian government tried to extradite Afḡānī; but the sultan, probably fearful of the secrets of his court Afḡānī knew, insisted Afḡānī was an Afghan and not extraditable.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Mirza_Reza_Kermani_%282%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Reza_Kermani_(2).jpg',
    credit: { creator: 'A. Henry Savage Landor' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'nateq-1984-karnameh-va-zamaneh-ye-mirza-reza-kermani', perspective: 'iranian' }
  ]
})
