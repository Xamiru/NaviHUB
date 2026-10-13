import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-paris-1763',
  names: [
    { text: 'Treaty of Paris', lang: 'en', role: 'primary' },
    { text: 'Treaty of Paris (1763)', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1763-02-10' },
        cites: [
          {
            source: 'state-dept-milestones-treaty-of-paris-1763',
            loc: { section: 'Treaty of Paris, 1763', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'north-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'britain',
      name: 'Great Britain',
      polity: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
        }
      ]
    },
    {
      key: 'france',
      name: 'France',
      polity: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
        }
      ]
    },
    {
      key: 'spain',
      name: 'Spain',
      polity: 'polity:kingdom-of-spain',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Lord Bute',
      role: 'negotiator',
      side: 'britain',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '5' }
        }
      ]
    },
    {
      name: 'duc de Choiseul',
      role: 'negotiator',
      side: 'france',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:seven-years-war',
      rel: 'response-to',
      cites: [
        {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '1' }
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
          text: 'The Treaty of Paris of 1763 ended the French and Indian War/Seven Years’ War between Great Britain and France, as well as their respective allies.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1763',
            loc: { section: 'Treaty of Paris, 1763', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The British Government was also interested in ending the war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1763',
            loc: { section: 'Treaty of Paris, 1763', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
          }
        },
        {
          id: 'q3',
          text: 'Initial attempts at negotiating a peace settlement failed, and instead French and Spanish diplomats signed the Family Compact, a treaty that brought Spain into the war against Britain.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1763',
            loc: { section: 'Treaty of Paris, 1763', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'For Anglo-American colonists, the treaty was a theoretical success.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1763',
            loc: { section: 'Treaty of Paris, 1763', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
          }
        },
        {
          id: 'q5',
          text: 'Despite what seemed like a success, the Treaty of Paris ultimately encouraged dissension between Anglo-American colonists and the British Government because their interests in North America no longer coincided.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-treaty-of-paris-1763',
            loc: { section: 'Treaty of Paris, 1763', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
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
            value: { d: '1762-11-03' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1763',
                loc: { section: 'Treaty of Paris, 1763', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The diplomats completed their negotiations and signed the preliminary Treaty of Paris on November 3, 1762.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1763-02-10' },
            cites: [
              {
                source: 'state-dept-milestones-treaty-of-paris-1763',
                loc: { section: 'Treaty of Paris, 1763', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Although British King George III and his ministers were in favor of the treaty, it was unpopular with the British public. However, the treaty contained enough concessions to war hawks that the British Parliament ratified the Treaty of Paris by a majority of 319 to 64, and the treaty went into effect on February 10, 1763.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-treaty-of-paris-1763',
          loc: { section: 'Treaty of Paris, 1763', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://history.state.gov/milestones/1750-1775/treaty-of-paris'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/A_new_and_correct_map_of_North_America%3B_with_the_West_India_Islands._Divided_according_to_the_last_treaty_of_peace%2C_concluded_at_Paris._10th._Feby._1763._Wherein_are_particularly_distinguished%2C_the_LOC_75691628.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_new_and_correct_map_of_North_America;_with_the_West_India_Islands._Divided_according_to_the_last_treaty_of_peace,_concluded_at_Paris._10th._Feby._1763._Wherein_are_particularly_distinguished,_the_LOC_75691628.jpg',
    credit: {
      institution: 'Library of Congress',
      creator: 'Thomas Pownall, Robert Sayer and John Bennett'
    },
    license: { id: 'public-domain' }
  }
})
