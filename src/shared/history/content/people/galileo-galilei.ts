import { definePerson } from '../../schema'

export default definePerson({
  id: 'galileo-galilei',
  names: [
    { text: 'Galileo Galilei', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1564-02-15' },
        cites: [
          {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1642-01-08' },
        cites: [
          {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['scientist'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg/1280px-Justus_Sustermans_-_Portrait_of_Galileo_Galilei%2C_1636.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Justus_Sustermans_-_Portrait_of_Galileo_Galilei,_1636.jpg',
    credit: { creator: 'Justus Sustermans' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Sidereus Nuncius, published at Venice early in 1610, contained the first-fruits of the new mode of investigation, which were sufficient to excite learned amazement on both sides of the Alps.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        },
        {
          id: 'q2',
          text: 'His discovery of the “Medicean Stars” was acknowledged by his nomination (July 12, 1610) as philosopher and mathematician extraordinary to the grand-duke of Tuscany.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'His father, Vincenzio, was an impoverished descendant of a noble Florentine house, which had exchanged the surname of Bonajuti for that of Galilei, on the election, in 1343, of one of its members, Tommaso de’ Bonajuti, to the college of the twelve Buonuomini.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'A rumour of the new invention, which reached Venice in June 1609, sufficed to set Galileo on the track; and after one night’s profound meditation on the principles of refraction, he succeeded in producing a telescope of threefold magnifying power.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        },
        {
          id: 'q5',
          text: 'In September 1610 Galileo finally abandoned Padua for Florence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        },
        {
          id: 'q6',
          text: 'On the 22nd of June, in the church of Santa Maria sopra Minerva, Galileo read his recantation, and received his sentence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q7',
          text: 'Three interlocutors, named respectively Salviati, Sagredo, and Simplicio, take part in the four dialogues of which the work is composed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'On the 8th of January 1642 he closed his long life of triumph and humiliation, which just spanned the interval between the death of Michelangelo and the birth of Isaac Newton.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-galileo-galilei',
            loc: { section: 'Galileo Galilei', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Galileo_Galilei'
          }
        }
      ]
    }
  ]
})
