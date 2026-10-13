import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-paris-1783',
  names: [
    { text: 'Treaty of Paris', lang: 'en', role: 'primary' },
    { text: 'Treaty of Paris (1783)', lang: 'en', role: 'alternative' },
    {
      text: 'Peace of Paris',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1783-09-03' },
        cites: [
          {
            source: 'state-dept-milestones-treaty-of-paris-1783',
            loc: { section: 'Treaty of Paris, 1783', para: '3' }
          },
          {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '88' }
          },
          {
            source: 'britannica-1911-american-war-of-independence',
            loc: { section: 'American War of Independence', para: '18' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '3' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'america',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '1' }
        }
      ]
    },
    {
      key: 'britain',
      name: 'Great Britain',
      polity: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Benjamin Franklin',
      role: 'negotiator',
      side: 'america',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '88' }
        }
      ]
    },
    {
      name: 'John Adams',
      role: 'negotiator',
      side: 'america',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '88' }
        }
      ]
    },
    {
      name: 'John Jay',
      role: 'negotiator',
      side: 'america',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '88' }
        }
      ]
    },
    {
      name: 'Richard Oswald',
      role: 'negotiator',
      side: 'britain',
      cites: [
        {
          source: 'britannica-1911-united-states-history',
          loc: { section: 'United States, The: History', para: '88' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:american-revolutionary-war',
      rel: 'response-to',
      cites: [
        {
          source: 'state-dept-milestones-french-alliance',
          loc: {
            section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
            para: '9'
          }
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
          text: 'The United States, Spain, and France formally ended the war with Britain with the Treaty of Paris in 1783.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-alliance',
            loc: {
              section: 'French Alliance, French Assistance, and European Diplomacy during the American Revolution, 1778–1782',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/french-alliance'
          }
        },
        {
          id: 'q2',
          text: 'Two months of hard bargaining resulted in a preliminary articles of peace in which the British accepted American independence and boundaries, resolved the difficult issues of fishing rights on the Newfoundland banks and prewar debts owed British creditors, promised restitution of property lost during the war by Americans loyal to the British cause, and provided for the evacuation of British forces from the thirteen states.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1783',
            loc: { section: 'Treaty of Paris, 1783', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/treaty'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1782, Benjamin Franklin rejected informal peace overtures from Great Britain for a settlement that would provide the thirteen states with some measure of autonomy within the British Empire.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1783',
            loc: { section: 'Treaty of Paris, 1783', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/treaty'
          }
        },
        {
          id: 'q4',
          text: 'Richard Oswald was the leading British agent, while Franklin, Jay, John Adams and Henry Laurens were the American negotiators.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '88' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Under the terms of the treaty, which ended the War of the American Revolution, Great Britain officially acknowledged the United States as a sovereign and independent nation.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-declaration-of-independence',
            loc: { section: 'The Declaration of Independence, 1776', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1776-1783/declaration'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'In the name of the most holy and undivided Trinity.',
          lang: 'en',
          cite: {
            source: 'avalon-definitive-treaty-of-peace-1783',
            loc: { section: 'The Definitive Treaty of Peace 1783', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/paris.asp'
          }
        },
        {
          id: 'q7',
          text: 'His Brittanic Majesty acknowledges the said United States, viz., New Hampshire, Massachusetts Bay, Rhode Island and Providence Plantations, Connecticut, New York, New Jersey, Pennsylvania, Maryland, Virginia, North Carolina, South Carolina and Georgia, to be free sovereign and independent states, that he treats with them as such, and for himself, his heirs, and successors, relinquishes all claims to the government, propriety, and territorial rights of the same and every part thereof.',
          lang: 'en',
          cite: {
            source: 'avalon-definitive-treaty-of-peace-1783',
            loc: { section: 'The Definitive Treaty of Peace 1783', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/paris.asp'
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
            value: { d: '1782-09-27' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1783',
                loc: { section: 'Treaty of Paris, 1783', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Joined by peace commissioners John Adams and John Jay, Franklin engaged the British in formal negotiations beginning on September 27, 1782.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/treaty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1782-11-30' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1783',
                loc: { section: 'Treaty of Paris, 1783', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The preliminary articles signed in Paris on November 30, 1782, were only effective when Britain and France signed a similar treaty, which French Foreign Minister Vergennes quickly negotiated.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/treaty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1783-09-03' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1783',
                loc: { section: 'Treaty of Paris, 1783', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'France signed preliminary articles of peace with Great Britain on January 20, 1783, followed by a formal peace of Paris signed on September 3, 1783.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1783',
          loc: { section: 'Treaty of Paris, 1783', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1776-1783/treaty'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/SigningPreliminaryTreatyOfParis1782.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SigningPreliminaryTreatyOfParis1782.jpg',
    credit: { institution: 'Library of Congress (America’s Library)', creator: 'Carl Seiler' },
    license: { id: 'public-domain' }
  }
})
