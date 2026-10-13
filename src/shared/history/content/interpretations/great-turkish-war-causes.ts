import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'great-turkish-war-causes',
  about: ['event:great-turkish-war'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'The success of Tököli rekindled the martial ardour of the Turks, and a war party, under the grand vizier Kara Mustafa, determined to wrest from Leopold his twelve remaining Hungarian counties, gained the ascendancy at Constantinople in the course of 1682.',
    lang: 'en',
    cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
    }
  },
  positions: [
    {
      id: 'turkish-historians',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Turkish historians', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The war is blamed by Turkish historians as unjustifiable and untimely, the country needing reform.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      id: 'kara-mustafas-ambition',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Encyclopædia Britannica, 11th edition (article on Turkey)'
        }
      ],
      statements: [
        {
          id: 'q3',
          text: 'A revolt of the Hungarian Protestants, in consequence of the persecuting policy of the house of Habsburg, now led to a renewal of the war between Turkey and Austria, due in part to the overweening ambition of Kuprili\'s successor, Kara Mustafa, who desired to immortalize his tenure of office by some great exploit, and who cherished dreams of founding for himself a western Moslem Empire.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      id: 'habsburg-persecution-of-protestants',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Encyclopædia Britannica, 11th edition (article on Hungary)'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In royal Hungary also the Jesuits were the chief persecutors.',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '507' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        },
        {
          id: 'q5',
          text: 'The method generally adopted was to deprive the preachers in the towns of their churches by force, Italian mercenaries being preferably employed for the purpose.',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '507' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
