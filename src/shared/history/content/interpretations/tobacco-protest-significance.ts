import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'tobacco-protest-significance',
  about: ['event:tobacco-protest'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'prelude-to-constitutional-revolution',
      category: 'scholarly',
      standing: {
        label: 'mainstream',
        quote: {
          id: 'q1',
          text: 'The successful campaign against the tobacco monopoly is generally viewed as the first instance of mass politics in Persia, and therefore as the precursor of the Constitutional Revolution of 1323-29/1905-11 (q.v.), a movement which was marked by the issuance of numerous fatwās by both its supporters and opponents among the religious scholars.',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '12' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/fatwa' }
        }
      },
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' },
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'This movement is often regarded as a prelude to the Constitutional Revolution as well as the first instance in the modern period when the ulema managed to successfully rally the urban populace against the government (Lambton, pp. 223-76).',
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
        },
        {
          id: 'q3',
          text: 'The protest over the Tobacco Régie (q.v.) in 1309-10/1891-92 should thus be seen as the first sign of popular revolt against the prevailing order.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      id: 'turning-point-for-british-strategy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Regie episode was a turning point in the shaping of the British strategy toward Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q5',
          text: 'Furthermore the Regie tarnished Britain’s prestige as the supreme power, an image upon which British diplomacy had rested for nearly a century.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'start-of-the-reigns-misfortunes',
      category: 'contemporary',
      holders: [
        { kind: 'scholar', name: 'Edward Granville Browne' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The misfortunes of Persia which overshadowed the last six years of Nasiru\'d-Din Shah\'s reign, and ultimately led to his destruction, may be said to date from the granting of the Tobacco Concession to an English company on March 8, 1890.',
          lang: 'en',
          cite: { source: 'browne-1910-persian-revolution', loc: { page: '31' } },
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
