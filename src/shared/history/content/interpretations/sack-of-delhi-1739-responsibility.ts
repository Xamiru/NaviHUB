import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'sack-of-delhi-1739-responsibility',
  about: ['event:sack-of-delhi-1739'],
  topic: 'responsibility',
  positions: [
    {
      id: 'ordered',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The following morning, Nāder ordered the indiscriminate massacre of residents in those sections of the city where his soldiers had been slain.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        }
      ]
    },
    {
      id: 'retaliation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In retaliation, Nāder gave his soldiers permission to plunder Delhi and massacre its inhabitants.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      id: 'reluctant',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Nadir Shah, after vainly attempting to stay the tumult, at last gave orders for a general massacre of the inhabitants.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
