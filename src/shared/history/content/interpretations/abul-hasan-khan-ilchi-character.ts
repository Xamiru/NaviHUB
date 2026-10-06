import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'abul-hasan-khan-ilchi-character',
  about: ['person:abul-hasan-khan-ilchi'],
  topic: 'character',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Receiving gifts was not uncommon among the courtiers of Fatḥ-ʿAlī Shah, but a regular annuity from a foreign government was unusual.',
    lang: 'en',
    cite: {
      source: 'iranica-javadi-abul-hasan-khan-ilci',
      loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '5' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
    }
  },
  positions: [
    {
      id: 'scott',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Walter Scott' }
      ],
      statements: [
        {
          id: 'q2',
          text: '“There was in the manners of Mīrzā,” Sir Walter Scott wrote, “all the address and dexterity of a courtier with some points which seemed to indicate a deeper degree of reflection than we are accustomed to connect with the idea of a Mussalman”',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    },
    {
      id: 'fraser',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'James Baillie Fraser' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'James Fraser is harshly critical: “He is so mean and dishonest, in all his dealings, that none who can avoid it will have anything to do with him; and so proverbially false, that none believes a word he says”',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    },
    {
      id: 'iranian-historians',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'E. Rāʾīn' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Some Iranian historians have criticized him for joining Freemasonry and also for receiving gifts and an annuity from the British (E. Rāʾīn, Ḥoqūthat-begīrān-e Engelīs dar Īrān, Tehran, 1348 Š./1969, pp. 20-43).',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q5',
          text: 'Iranian scholars also give a generally unfavorable estimate of his character.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    },
    {
      id: 'staunch-supporter',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hassan Javadi' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Despite Fraser’s statement, most of the sources confirm that Mīrzā Abu’l-Ḥasan was a staunch supporter of the British, and for his good services he was paid an annuity of 1,000 rupees from 1810 to 1845, the year of his death.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    }
  ]
})
