import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'isfahan-as-the-safavid-capital-nature',
  about: ['event:transfer-of-the-capital-to-isfahan', 'event:building-of-naqsh-e-jahan'],
  topic: 'nature',
  positions: [
    {
      id: 'one-vision',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Sussan Babaie', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Safavid urban scheme of Isfahan is so methodically integrated in its spatial, architectural, functional and iconographic aspects that it discredits the oft-repeated scholarly assumption of its parts having emerged piecemeal because of different building dates.',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        },
        {
          id: 'q2',
          text: 'Construction of this massive urban project, unprecedented in the concurrence of its extraordinary scale and its integrated planning, took several decades.',
          lang: 'en',
          cite: {
            source: 'iranica-babaie-isfahan-x1-historical-survey',
            loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-x1-a-historical-survey'
          }
        }
      ]
    },
    {
      id: 'a-capital-where-the-ruler-was',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Masashi Haneda and Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'It is true that, from 1590 onward, Isfahan was often called dār al-salṭana in the sources, but we have to realize that it was not the capital in the modern sense of the word.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q4',
          text: 'As had always been the case among rulers of nomadic background and as would be true until the 19th century in Persia, the capital really was where the ruler happened to be.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
