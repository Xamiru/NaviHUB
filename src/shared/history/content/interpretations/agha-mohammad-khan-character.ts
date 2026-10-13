import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'agha-mohammad-khan-character',
  about: ['person:agha-mohammad-khan-qajar'],
  topic: 'character',
  positions: [
    {
      id: 'calculated',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In contrast to near-contemporaries such as Zakī Khan Zand or even Nāder Shah, with whom he might easily be compared in cruelty, rapacity, and military zeal, he was able to harness—and where necessary subordinate—his passions to long-term dynastic interests.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '10' }
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
      id: 'despot',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Aga Mahommed was undoubtedly one of the most cruel and vindictive despots that ever disgraced a throne.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1121' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
