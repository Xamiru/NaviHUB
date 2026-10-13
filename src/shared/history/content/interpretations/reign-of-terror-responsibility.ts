import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'reign-of-terror-responsibility',
  about: ['period:reign-of-terror', 'person:maximilien-robespierre'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'That a revolution largely inspired by generous and humane feeling should have issued in such havoc and such crimes is a paradox which astounded spectators and still perplexes the historian.',
    lang: 'en',
    cite: {
      source: 'britannica-1911-french-revolution',
      loc: { section: 'French Revolution, The', para: '100' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
    }
  },
  positions: [
    {
      id: 'robespierre-dominant',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica, 11th edition' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Robespierre was an acrid fanatic, and unlike Danton, who only cared to secure the practical results of the Revolution, he had a moral and religious ideal which he intended to force on the nation.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '64' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q3',
          text: 'On the 4th of June he was elected president of the Convention, and from that time forward he appeared to be dictator of France.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '70' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      id: 'not-its-creator',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica, 11th edition' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'With the actual organization of the Terror Robespierre had little or nothing to do; its two great engines, the revolutionary tribunal and the almost absolute power in the provinces of the representatives on mission, were in existence before he joined the Committee of Public Safety, and the laws of the maximum and of the suspects were by no means of his creation. The reason why he is almost universally regarded as its creator and the dominant spirit in the Committee is not hard to discover.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        }
      ]
    },
    {
      id: 'war-and-emergency',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Under foreign invasion, the French Government declared a state of emergency, and many foreigners residing in France were arrested, including American revolutionary pamphleteer Thomas Paine, owing to his British birth.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/french-rev'
          }
        }
      ]
    },
    {
      id: 'dissolution-of-society',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica, 11th edition' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'More, however, was due to the total dissolution of society which followed the meeting of the states-general.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '100' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q7',
          text: 'The same conditions explain the triumph of the Jacobins.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '100' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
