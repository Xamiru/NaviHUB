import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'siege-of-isfahan-1722-causes',
  about: ['event:siege-of-isfahan-1722'],
  topic: 'causes',
  positions: [
    {
      id: 'personal',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'All observers draw attention to the shah’s meekness.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q2',
          text: 'Many of his subjects appear to have seen his gentle nature as a sign of weakness.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q3',
          text: 'Numerically inferior and mostly equipped with swords, the Afghans should have lost any open confrontation, but the fact that they did not was mostly due to the disarray and discord in the ranks of the Safavid establishment.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      id: 'economy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Iran had suffered from a swift rise in the popularity of Indian silk in Europe during the last few decades of Safavid rule, a shift that dramatically reduced Iran’s foreign income and indirectly contributed to the draining of bullion away from Persian state treasuries',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      id: 'institutions',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The decline resulted from weak rulers, interference by the women of the harem in politics, the reemergence of qizilbash rivalries, maladministration of state lands, excessive taxation, the decline of trade, and the weakening of Safavid military organization.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      id: 'effete',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The fact is that, two centuries after Shah Ismaʽil’s accession to the throne, the Safawid race of kings was effete; and it became necessary to make room for a more vigorous if not a more lasting rule.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1089' } },
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
