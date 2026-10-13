import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'declaration-of-the-rights-of-man',
  names: [
    {
      text: 'Declaration of the Rights of Man and of the Citizen',
      lang: 'en',
      role: 'primary'
    },
    {
      text: 'Declaration of the Rights of Man',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'avalon-declaration-of-the-rights-of-man-1789',
          loc: { section: 'Declaration of the Rights of Man - 1789', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1789-08-26' },
        cites: [
          {
            source: 'avalon-declaration-of-the-rights-of-man-1789',
            loc: { section: 'Declaration of the Rights of Man - 1789', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:versailles',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '19' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:french-revolution' }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
          loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:french-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
          loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
        }
      ]
    },
    {
      ref: 'event:united-states-declaration-of-independence',
      rel: 'related',
      cites: [
        {
          source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
          loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The declaration overturned the political and social principles upon which the existent régime stood.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
            loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
          }
        },
        {
          id: 'q2',
          text: 'It stated the fundamental principles which inspired the revolution.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
            loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
          }
        },
        {
          id: 'q3',
          text: 'RIGHTS OF MAN AND OF THE CITIZEN, DECLARATION OF, a sort of manifesto issued in 1789 by the Constituent Assembly in the French Revolution, to be inscribed at the head of the constitution when it should be completed.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
            loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Disorder in the provinces led directly to the proceedings on the famous night of the 4th of August.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q5',
          text: 'Historians have traced a connexion with the declarations of rights which preceded the constitution of some of the states of the American Union, especially of Virginia, but the situation in France at the time, and the influence of the writings of the philosophes made the proposal for such a statement very natural.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
            loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Similar declarations were attached to the constitution of 1793 and to that of the year III.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
            loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
          }
        },
        {
          id: 'q7',
          text: 'It has served as a base for modern civil legislation and is still a force in European history.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
            loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'The representatives of the French people, organized as a National Assembly, believing that the ignorance, neglect, or contempt of the rights of man are the sole cause of public calamities and of the corruption of governments, have determined to set forth in a solemn declaration the natural, unalienable, and sacred rights of man, in order that this declaration, being constantly before all the members of the Social body, shall remind them continually of their rights and duties; in order that the acts of the legislative power, as well as those of the executive power, may be compared at any moment with the objects and purposes of all political institutions and may thus be more respected, and, lastly, in order that the grievances of the citizens, based hereafter upon simple and incontestable principles, shall tend to the maintenance of the constitution and redound to the happiness of all.',
          lang: 'en',
          cite: {
            source: 'avalon-declaration-of-the-rights-of-man-1789',
            loc: { section: 'Declaration of the Rights of Man - 1789', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/rightsof.asp'
          }
        },
        {
          id: 'q9',
          text: '1. Men are born and remain free and equal in rights. Social distinctions may be founded only upon the general good.',
          lang: 'en',
          cite: {
            source: 'avalon-declaration-of-the-rights-of-man-1789',
            loc: { section: 'Declaration of the Rights of Man - 1789', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/rightsof.asp'
          }
        },
        {
          id: 'q10',
          text: '3. The principle of all sovereignty resides essentially in the nation. No body nor individual may exercise any authority which does not proceed directly from the nation.',
          lang: 'en',
          cite: {
            source: 'avalon-declaration-of-the-rights-of-man-1789',
            loc: { section: 'Declaration of the Rights of Man - 1789', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/rightsof.asp'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1789-07-14' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '17' }
              },
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The first Constitutional Committee, elected on the 14th of July, had Mounier for its reporter. It was instructed to begin with drafting a Declaration of the Rights of Man. Six weeks were spent by the Assembly in discussing this document.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1789-10-05' },
            cites: [
              {
                source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
                loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The final text voted by the Assembly was accepted by the king on the 5th of October 1789, at first conditionally, then with modifications.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-rights-of-man-and-of-the-citizen-declaration-of',
          loc: { section: 'Rights of Man and of the Citizen, Declaration of', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rights_of_Man_and_of_the_Citizen,_Declaration_of'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Jean-Jacques-Fran%C3%A7ois_%28dit_l%27A%C3%AEn%C3%A9%29_Le_Barbier_-_D%C3%A9claration_des_droits_de_l%27homme_et_du_citoyen_-_P809_-_Mus%C3%A9e_Carnavalet.jpg/1280px-Jean-Jacques-Fran%C3%A7ois_%28dit_l%27A%C3%AEn%C3%A9%29_Le_Barbier_-_D%C3%A9claration_des_droits_de_l%27homme_et_du_citoyen_-_P809_-_Mus%C3%A9e_Carnavalet.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jean-Jacques-Fran%C3%A7ois_(dit_l%27A%C3%AEn%C3%A9)_Le_Barbier_-_D%C3%A9claration_des_droits_de_l%27homme_et_du_citoyen_-_P809_-_Mus%C3%A9e_Carnavalet.jpg',
    credit: {
      institution: 'Musée Carnavalet (Paris Musées)',
      creator: 'Jean-Jacques-François Le Barbier'
    },
    license: { id: 'public-domain' }
  }
})
