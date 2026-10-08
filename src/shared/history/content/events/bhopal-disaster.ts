import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bhopal-disaster',
  names: [
    { text: 'Bhopal disaster', lang: 'en', role: 'primary' },
    { text: 'भोपाल गैस त्रासदी', lang: 'hi', role: 'native' },
    {
      text: 'Bhopal Gas Leak tragedy',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
          loc: { section: 'Order of 4 May 1989', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1984-12-02' },
        cites: [
          {
            source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
            loc: { section: 'Order of 4 May 1989', para: '1' }
          }
        ]
      },
      {
        value: { d: '1984-12-03' },
        cites: [
          {
            source: 'union-carbide-overview-of-bhopal-tragedy',
            loc: { section: 'Overview of Bhopal Tragedy', para: '1' }
          },
          {
            source: 'icjb-what-triggered-the-disaster',
            loc: { section: 'What Triggered the Disaster?', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:bhopal',
      cites: [
        {
          source: 'union-carbide-overview-of-bhopal-tragedy',
          loc: { section: 'Overview of Bhopal Tragedy', para: '1' }
        },
        {
          source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
          loc: { section: 'Order of 4 May 1989', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:india' },
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'ucc',
      name: 'Union Carbide Corporation',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'union-carbide-overview-of-bhopal-tragedy',
          loc: { section: 'Overview of Bhopal Tragedy', para: '2' }
        }
      ]
    },
    {
      key: 'goi',
      name: 'Government of India',
      polity: 'polity:india',
      cites: [
        {
          source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
          loc: { section: 'Order of 4 May 1989', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Warren Anderson',
      role: 'participant',
      side: 'ucc',
      cites: [
        {
          source: 'union-carbide-overview-of-bhopal-tragedy',
          loc: { section: 'Overview of Bhopal Tragedy', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 5200, qualifier: 'about' },
            cites: [
              {
                source: 'union-carbide-overview-of-bhopal-tragedy',
                loc: { section: 'Overview of Bhopal Tragedy', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Government of India' }
            ]
          },
          {
            value: { min: 20000, qualifier: 'over' },
            cites: [
              {
                source: 'icjb-the-bhopal-gas-tragedy-just-an-accident',
                loc: { section: 'The Bhopal Gas Tragedy - just an accident?', para: '61' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'International Campaign for Justice in Bhopal' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Bhopal Gas Leak tragedy that occurred at midnight on 2nd December, 1984, by the escape of deadly chemical fumes from the appellant\'s pesticide-factory was a horrendous industrial mass disaster, unparalleled in its magnitude and devastation',
          lang: 'en',
          cite: {
            source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
            loc: { section: 'Order of 4 May 1989', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20221226025151/https://indiankanoon.org/doc/1344892/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Situated in the central Indian state of Madhya Pradesh, the Bhopal plant was built in 1969 and a production facility was added in 1979.',
          lang: 'en',
          cite: {
            source: 'union-carbide-overview-of-bhopal-tragedy',
            loc: { section: 'Overview of Bhopal Tragedy', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In the early hours of December 3, 1984, methylisocyanate (MIC) gas leaked from a production plant owned, managed and operated by Union Carbide India Limited (UCIL) in the central India city of Bhopal.',
          lang: 'en',
          cite: {
            source: 'union-carbide-overview-of-bhopal-tragedy',
            loc: { section: 'Overview of Bhopal Tragedy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
          }
        },
        {
          id: 'q9',
          text: 'The tragedy took an immediate toll of 2,660 innocent human lives and left tens of thousands of innocent citizens of Bhopal physically impaired or affected in various degrees.',
          lang: 'en',
          cite: {
            source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
            loc: { section: 'Order of 4 May 1989', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20221226025151/https://indiankanoon.org/doc/1344892/'
          }
        },
        {
          id: 'q10',
          text: 'What added grim poignance to the tragedy was that the industrial-enterprise was using Methyl Iso-cyanate, a lethal toxic poison',
          lang: 'en',
          cite: {
            source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
            loc: { section: 'Order of 4 May 1989', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20221226025151/https://indiankanoon.org/doc/1344892/'
          }
        },
        {
          id: 'q4',
          text: 'UCC’s initial investigation showed that a large volume of water had been introduced into the MIC tank and caused a chemical reaction that forced the pressure release valve to open and allowed the gas to leak. A committee of experts, working on behalf of the Indian government, conducted its own investigation and reached the same conclusion.',
          lang: 'en',
          cite: {
            source: 'union-carbide-overview-of-bhopal-tragedy',
            loc: { section: 'Overview of Bhopal Tragedy', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The settlement proposals were considered on the premise that Government had the exclusive statutory authority to represent and act on behalf of the victims and neither counsel had any reservation as to this.',
          lang: 'en',
          cite: {
            source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
            loc: { section: 'Order of 4 May 1989', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20221226025151/https://indiankanoon.org/doc/1344892/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The basic consideration motivating the conclusion of the settlement was the compelling need for urgent relief. The suffering of the victims has been intense and unrelieved.',
          lang: 'en',
          cite: {
            source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
            loc: { section: 'Order of 4 May 1989', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20221226025151/https://indiankanoon.org/doc/1344892/'
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
            value: { d: '1984-12-03' },
            cites: [
              {
                source: 'union-carbide-overview-of-bhopal-tragedy',
                loc: { section: 'Overview of Bhopal Tragedy', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'According to government figures, approximately 5,200 people died and several thousand others suffered permanent or partial disabilities.',
        lang: 'en',
        cite: {
          source: 'union-carbide-overview-of-bhopal-tragedy',
          loc: { section: 'Overview of Bhopal Tragedy', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20251226023756/https://www.bhopal.com/en-us/overview-of-bhopal-tragedy.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-02-14' },
            cites: [
              {
                source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
                loc: { section: 'Order of 4 May 1989', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'This Court by its order dated 14 February, 1989 made in those appeals directed that there be an overall settlement of the claims in the suit, for 470 million US dollars and termination of all civil and criminal proceedings.',
        lang: 'en',
        cite: {
          source: 'supreme-court-of-india-1989-union-carbide-v-union-of-india-reasons',
          loc: { section: 'Order of 4 May 1989', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20221226025151/https://indiankanoon.org/doc/1344892/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Union_Carbide_pesticide_factory%2C_Bhopal%2C_India%2C_1985.jpg/1280px-Union_Carbide_pesticide_factory%2C_Bhopal%2C_India%2C_1985.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Union_Carbide_pesticide_factory,_Bhopal,_India,_1985.jpg',
    credit: { institution: 'Bhopal Medical Appeal', creator: 'Martin Stott' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
