import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'louisiana-purchase',
  names: [
    { text: 'Louisiana Purchase', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1803-04-30' },
        cites: [
          {
            source: 'louisiana-purchase-treaty-1803',
            loc: { section: 'Louisiana Purchase Treaty, closing' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'louisiana-purchase-treaty-1803',
          loc: { section: 'Louisiana Purchase Treaty, closing' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:thomas-jefferson',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-louisiana-purchase',
          loc: { section: 'Louisiana Purchase, 1803', para: '6' }
        }
      ]
    },
    {
      ref: 'person:napoleon-bonaparte',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-louisiana-purchase',
          loc: { section: 'Louisiana Purchase, 1803', para: '6' }
        }
      ]
    },
    {
      ref: 'person:james-monroe',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-louisiana-purchase',
          loc: { section: 'Louisiana Purchase, 1803', para: '6' }
        }
      ]
    },
    {
      name: 'Robert Livingston',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-louisiana-purchase',
          loc: { section: 'Louisiana Purchase, 1803', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:lewis-and-clark-expedition',
      rel: 'related',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '2' }
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
          text: 'The Louisiana Purchase encompassed 530,000,000 acres of territory in North America that the United States purchased from France in 1803 for $15 million.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-louisiana-purchase',
            loc: { section: 'Louisiana Purchase, 1803', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/louisiana-purchase'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'He planned to recapture the valuable sugar colony of St. Domingue from a slave rebellion, and then use Louisiana as the granary for his empire. France acquired Louisiana from Spain in 1800 and took possession in 1802, sending a large French army to St. Domingue and preparing to send another to New Orleans. Westerners became very apprehensive about having the more-powerful French in control of New Orleans: President Thomas Jefferson noted, “There is on the globe one single spot, the possessor of which is our natural and habitual enemy. It is New Orleans.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-louisiana-purchase',
            loc: { section: 'Louisiana Purchase, 1803', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/louisiana-purchase'
          }
        },
        {
          id: 'q4',
          text: 'Meanwhile, the French Army in St. Domingue was being decimated by yellow fever, and war between France and England still threatened. Napoleon decided to give up his plans for Louisiana, and offered a surprised Monroe and Livingston the entire territory of Louisiana for $15 million. Although this far exceeded their instructions from President Jefferson, they agreed.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-louisiana-purchase',
            loc: { section: 'Louisiana Purchase, 1803', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/louisiana-purchase'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'However, the loss of Haiti made Louisiana strategically undesirable, and with war again on the horizon with Great Britain, Napoleon was willing to agree to the Louisiana Purchase in 1803.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/napoleonic-wars'
          }
        },
        {
          id: 'q6',
          text: 'In April of that year, Bonaparte signed a treaty that allowed the purchase of Louisiana by the United States and ended French ambitions in the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Toussaint Louverture', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/10.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'When news of the sale reached the United States, the West was elated. President Jefferson, however, was in a quandary. He had always advocated strict adherence to the letter of the Constitution, yet there was no provision empowering him to purchase territory. Given the public support for the purchase and the obvious value of Louisiana to the future growth of the United States, however, Jefferson decided to ignore the legalistic interpretation of the Constitution and forgo the passage of a Constitutional amendment to validate the purchase. This decision contributed to the principle of implied powers of the federal government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-louisiana-purchase',
            loc: { section: 'Louisiana Purchase, 1803', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/louisiana-purchase'
          }
        },
        {
          id: 'q8',
          text: 'The inhabitants of the ceded territory shall be incorporated in the Union of the United States and admitted as soon as possible according to the principles of the federal Constitution',
          lang: 'en',
          cite: {
            source: 'louisiana-purchase-treaty-1803',
            loc: { section: 'Louisiana Purchase Treaty, Art. III' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/louis1.asp'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Louisiana_Purchase_Treaty%2C_Page_1_%285553723360%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Louisiana_Purchase_Treaty,_Page_1_(5553723360).jpg',
    title: 'Louisiana Purchase Treaty',
    credit: { institution: 'U.S. National Archives' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1803-04-30' },
            cites: [
              {
                source: 'louisiana-purchase-treaty-1803',
                loc: { section: 'Louisiana Purchase Treaty, closing' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Done at Paris the tenth day of Floreal in the eleventh year of the French Republic; and the 30th of April 1803.',
        lang: 'en',
        cite: {
          source: 'louisiana-purchase-treaty-1803',
          loc: { section: 'Louisiana Purchase Treaty, closing' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://avalon.law.yale.edu/19th_century/louis1.asp'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'havard-vidal-2003-histoire-de-lamerique-francaise', perspective: 'european' }
  ]
})
