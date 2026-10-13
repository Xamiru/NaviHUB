import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'qajar-dynasty-beginning',
  about: [
    'event:coronation-of-agha-mohammad-khan-qajar',
    'event:agha-mohammad-khans-rise',
    'polity:qajar-iran'
  ],
  topic: 'other',
  positions: [
    {
      id: 'enthroned-1788',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Here in 1203/1788-89 he was enthroned (though not yet crowned); and soon afterwards he designated his nephew Bābā Khan (the future Fatḥ-ʿAlī Shah) as heir apparent',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q2',
          text: 'It therefore seems appropriate to take this point as the effective start of his reign and of the Qajar dynasty',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      id: 'founded-1779',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'ZAND DYNASTY (1164-1209/1751-94), a dynasty that ruled in Persia (excluding Khorasan) from Shiraz, from the time when Nāder Shah’s (r. 1736-47) successors, the Afsharids, failed to recover western Persia until the founding of the Qajar dynasty by Āḡā Moḥammad Khan Qājār (r. 1779-97).',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      id: 'victory-1794',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'This time Agha Mohammad Qajar defeated the last Zand ruler outside Kerman in 1794 and made himself master of the country, beginning the Qajar dynasty that was to last until 1925.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      id: 'crowned-1796',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'By the time of the founding of the Qajar dynasty in Persia in 1796, Indo-Persian diplomatic relations was increasingly passing into the control of the EIC and the British government.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
