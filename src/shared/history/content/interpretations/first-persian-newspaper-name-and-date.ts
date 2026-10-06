import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-persian-newspaper-name-and-date',
  about: ['event:first-persian-newspaper-1837'],
  topic: 'naming',
  researched: '2026-10-06',
  positions: [
    {
      id: 'akhbar-may-1837',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Negin Nabavi' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Other than the short-lived Aḵbār (also known as Kāḡaḏ-e aḵbār) that had begun as a private venture under the supervision of Mirzā Ṣāleḥ Širāzi in May 1837, the first official newspaper appeared on 7 February 1851 on the orders of the first prime minister under Nāṣer-al-Din Shah’s rule, Mirzā Taqi Khan Amir Kabir (Mirzā Ṣāleḥ Širāzi, p. 21).',
          lang: 'en',
          cite: {
            source: 'iranica-nabavi-journalism-qajar',
            loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/journalism-i-qajar-period/'
          }
        }
      ]
    },
    {
      id: 'pilot-issue-and-regular-paper',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Willem M. Floor' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Mīrzā Ṣāleḥ was the first to attempt such a newspaper in Iran; the sole issue of Ṭalīʿa-ye kāḡaḏ-e aḵbār (Newspaper) appeared in Tehran in Ramażān 1252/January 1837',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    },
    {
      id: 'kaghaz-e-akhbar-1837',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Earlier, under Āqāsī’s auspices, Mīrzā Ṣāleḥ Šīrāzī, also educated in Europe, published the first Persian newspaper, Kāḡaz-e aḵbār, in 1253/1837.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    }
  ]
})
