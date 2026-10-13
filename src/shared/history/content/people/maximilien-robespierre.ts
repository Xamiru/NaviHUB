import { definePerson } from '../../schema'

export default definePerson({
  id: 'maximilien-robespierre',
  names: [
    { text: 'Maximilien Robespierre', lang: 'en', role: 'primary' },
    { text: 'Maximilien de Robespierre', lang: 'fr', role: 'native' },
    {
      text: 'The Incorruptible',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
          loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1758-05-06' },
        cites: [
          {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1794-07-28' },
        cites: [
          {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '10' }
          },
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '501' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:arras',
    cites: [
      {
        source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
        loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '1' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['revolutionary', 'politician'],
  offices: [
    {
      title: 'member of the Committee of Public Safety',
      start: {
        alts: [
          {
            value: { d: '1793-07-27' },
            cites: [
              {
                source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
                loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1794-07-28' },
            cites: [
              {
                source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
                loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '10' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '501' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
          loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '7' }
        },
        {
          source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
          loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '10' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Robespierre.jpg/1280px-Robespierre.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Robespierre.jpg',
    credit: { institution: 'Musée Carnavalet (Paris Musées)' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ROBESPIERRE, MAXIMILIEN FRANÇOIS MARIE ISIDORE DE (1758–1794), French revolutionist, was born at Arras on the 6th of May 1758.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '1' }
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
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'The children were taken charge of by their maternal grandfather and aunts, and Maximilien was sent to the college of Arras, whence he was nominated in 1770 through the bishop of his native town to a bursarship at the college of Louis-le-Grand at Paris.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        },
        {
          id: 'q3',
          text: 'His reputation had already preceded him, and the bishop of Arras, M. de Conzié, appointed him criminal judge in the diocese of Arras in March 1782.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '2' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1788 he took part in the discussion as to the way in which the states-general should be elected, showing clearly and forcibly in his Adresse à la nation artésienne that, if the former mode of election by the members of the provincial estates were again adopted, the new states-general would not represent the people of France.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        },
        {
          id: 'q5',
          text: 'While the Constituent Assembly occupied itself in drawing up a constitution, Robespierre turned from the assembly of provincial lawyers and wealthy bourgeois to the people of Paris.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        },
        {
          id: 'q6',
          text: 'The flight of the king on the 20th of June and his arrest at Varennes made Robespierre declare himself at the Jacobin Club to be ni monarchiste ni républicain.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        },
        {
          id: 'q7',
          text: 'The defence of Lyons exasperated the men who were working for France, and the armies who were fighting for her, and on the 27th of July 1793, when the struggle was practically decided, the Convention elected Robespierre to the new Committee of Public Safety.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        },
        {
          id: 'q8',
          text: 'After this explanation it may be said at once that Robespierre was not the sole author of the overthrow of the Dantonists and the Hébertists, though he thoroughly agreed with the majority and had no desire to save them, the principles of both parties being obnoxious to him.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '9' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'On the morning of the 9th Thermidor St Just was beginning to speak in the Convention when Tallien cut him short.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q10',
          text: 'Finally the Convention decreed the arrest of Robespierre, of his brother Augustin, of Couthon and of St Just.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q11',
          text: 'On the next morning he was beheaded along with his brother, Couthon, St Just, Hanriot and seventeen more of his adherents.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q12',
          text: 'The result of this law was that between the 12th of June and the 28th of July, the day of Robespierre’s death, no less than 1285 victims perished by the guillotine in Paris.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-robespierre-maximilien-francois-marie-isidore-de',
            loc: { section: 'Robespierre, Maximilien François Marie Isidore de', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Robespierre,_Maximilien_Fran%C3%A7ois_Marie_Isidore_de'
          }
        }
      ]
    }
  ]
})
