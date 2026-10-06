import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'ferdowsi-millenary-dating',
  about: ['event:ferdowsi-millenary'],
  topic: 'other',
  researched: '2026-10-06',
  positions: [
    {
      id: 'birth-934',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Theodor Nöldeke' },
        { kind: 'scholar', name: 'Sayyed Ḥasan Taqīzāda' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Nöldeke had calculated Ferdowsī’s birthdate to be 934-35 (in Grundriss, p. 151) and Taqīzāda strongly favored this date (pp. 7-12), which meant the dating of the millenary to be 1934-35.',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        }
      ]
    },
    {
      id: 'birth-940',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jules Mohl' },
        { kind: 'scholar', name: 'Moḥammad-Taqī Bahār' },
        { kind: 'scholar', name: 'Alireza Shapur Shahbazi' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Jules Mohl (pp. XXII ff.) and Bahār (pp. 760 ff.), however, had demonstrated that the birthdate was 939-40 (for the exact date, 3 January 940, see Shahbazi, pp. 27-30), which favored the holding of the millenary in 1939/40.',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        }
      ]
    },
    {
      id: 'foroughi-1934',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Moḥammad-ʿAlī Forūḡī' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Forūḡī settled in favor of 1934: “The hazāra of Ferdowsī in any rate coincides with these current years. A few years earlier or later makes no difference” (1933, p. 757).',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        }
      ]
    }
  ]
})
