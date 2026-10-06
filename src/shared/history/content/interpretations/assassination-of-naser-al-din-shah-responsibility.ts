import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'assassination-of-naser-al-din-shah-responsibility',
  about: ['event:assassination-of-naser-al-din-shah'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'encouraged-by-afghani',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nikki R. Keddie' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The latter encouraged him to return to Iran and kill the shah (against whom Afḡānī retained a personal as well as a political grudge).',
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
        },
        {
          id: 'q2',
          text: 'In 1896, reputedly encouraged by Jamal ad Din al Afghani (called Asadabadi because he came from Asadabad), the well-known Islamic preacher and political activist, a young Iranian assassinated the shah.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      id: 'afghani-as-protagonist-for-disciples',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'For his disciples, Afḡānī remains the main protagonist in the cancellation of the Régie and the shah’s murder.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      id: 'reformist-ideas-and-abuses',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'On 1 May 1896 the shah was assassinated by Mirzā Reżā of Kermān, who had been inspired by the ideas of such reformists as Jamāl-al-Din Afḡāni (q.v.) and Shaikh Hādi Najmābādi and had suffered governmental abuses.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    },
    {
      id: 'assassins-own-account',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mirza Reza Kermani', ref: 'person:mirza-reza-kermani' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'I had no special instructions, but the Sayyid\'s attitude is known to all, and likewise his manner of speech.',
          lang: 'en',
          cite: { source: 'browne-1910-persian-revolution', loc: { page: '65' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        },
        {
          id: 'q6',
          text: 'For four years and four months I was in chains and in the stocks, though according to my own convictions I only sought to serve and benefit the State.',
          lang: 'en',
          cite: { source: 'browne-1910-persian-revolution', loc: { page: '65' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        }
      ]
    }
  ]
})
