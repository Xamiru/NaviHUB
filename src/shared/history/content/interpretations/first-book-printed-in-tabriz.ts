import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-book-printed-in-tabriz',
  about: ['event:first-printing-press-in-tabriz'],
  topic: 'other',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'There is some disagreement about the earliest Persian work printed at Tabrīz.',
    lang: 'en',
    cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '9' } },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
    }
  },
  positions: [
    {
      id: 'jehadiya',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Tarbīat' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'According to one report, in 1233/1817-18 Jehādīya (Fighters against the infidels) by Mīrzā ʿĪsā Farāhānī Qāʾemmaqām was printed by Moḥammad-ʿAlī b. Ḥājj Moḥammad-Ḥosayn Āštīānī at Tabrīz; it was reprinted the next year by Zayn-al­-ʿĀbedīn (Tarbīat, apud Maḥbūbī, p. 212).',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    },
    {
      id: 'fath-nama',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'H. Schindler' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'According to H. Schindler, however, the first book printed at Tabrīz in 1233/1817 was Fatḥ-nāma (Book of conquest) by Mīrzā ʿĪsā’s son Mīrzā Abu’l-Qāsem Farāhānī, about a battle fought between Persians and Russians in 1227/1812 (Taqīzāda apud Maḥbūbī, I, pp. 211-12; Afšār, 1345, p. 28).',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    }
  ]
})
