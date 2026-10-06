import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fall-of-qaem-maqam-farahani-responsibility',
  about: ['event:fall-of-qaem-maqam-farahani'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'rivals-and-haughtiness',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Soon after his appointment, he was attacked by rivals, notably Moḥammad Shah’s maternal uncle, Allāhyār Khan Āṣaf-al-Dawla Davallu (a former Fatḥ-ʿAli Shah’s grand vizier), and a coalition led by Ḥājj Mirzā Āqāsi.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q2',
          text: 'His haughty conduct discontented altogether the court, the bureaucracy, and the foreign envoys.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      id: 'aqasi-coalition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'However, less than a year later, Moḥammad Shah, lured by the anti-Qāʾem-maqām coalition led by Āqāsī, felt confident enough to eliminate the highly independent vizier (Ṣafar, 1251/June, 1835)',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      id: 'personal-ambition',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'James Baillie Fraser' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'He also pressed upon the Shah for Moḥammad Mirzā’s designation, to foster his own ambition according to James Fraser.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    }
  ]
})
