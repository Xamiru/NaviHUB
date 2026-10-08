import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'southern-tribal-revolt-of-1946-instigators',
  researched: '2026-10-08',
  about: ['event:southern-tribal-revolt-of-1946'],
  topic: 'foreign-role',
  positions: [
    {
      id: 'qavam-encouraged',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Pierre Oberling', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In 1946, there was yet another major tribal uprising in Southern Persia. This time, it was actually encouraged by the central government.',
          lang: 'en',
          cite: {
            source: 'iranica-oberling-qashqai-history',
            loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/qasqai-tribal-confederacy-i/'
          }
        }
      ]
    },
    {
      id: 'british-fomented',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean-Pierre Digard', discipline: 'anthropologist' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'This was fomented by the English in order to organize the secession of the southern tribal provinces and led to the reorganization of the cabinet by Prime Minister Aḥmad Qawām (Qawām-al-Salṭana',
          lang: 'en',
          cite: {
            source: 'iranica-digard-bakhtiari-mortazaqoli-khan',
            loc: { section: 'BAḴTĪĀRĪ ix. Mortażāqolī Khan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/baktiari-nesba-of-a-number-of-baktiari-chiefs/ba%E1%B8%B5tiari-ix-mortazaqoli-khan/'
          }
        }
      ]
    }
  ]
})
