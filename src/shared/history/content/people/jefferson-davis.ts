import { definePerson } from '../../schema'

export default definePerson({
  id: 'jefferson-davis',
  names: [
    { text: 'Jefferson Davis', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1808-06-03' },
        cites: [
          {
            source: 'britannica-1911-davis-jefferson',
            loc: { section: 'DAVIS, JEFFERSON', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1889-12-06' },
        cites: [
          {
            source: 'britannica-1911-davis-jefferson',
            loc: { section: 'DAVIS, JEFFERSON', para: '5' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:new-orleans',
    cites: [
      {
        source: 'britannica-1911-davis-jefferson',
        loc: { section: 'DAVIS, JEFFERSON', para: '5' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['politician', 'military'],
  offices: [
    {
      title: 'President of the Confederate States',
      polity: 'polity:confederate-states-of-america',
      start: {
        alts: [
          {
            value: { d: '1861-02-18' },
            cites: [
              { source: 'nps-people-jefferson-davis', loc: { section: 'Jefferson Davis' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'nps-people-jefferson-davis', loc: { section: 'Jefferson Davis' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Jefferson_Davis_by_Vannerson%2C_1859.jpg/1280px-Jefferson_Davis_by_Vannerson%2C_1859.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jefferson_Davis_by_Vannerson,_1859.jpg',
    credit: { institution: 'Library of Congress', creator: 'Julian Vannerson' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'DAVIS, JEFFERSON (1808–1889), American soldier and statesman, president of the Confederate states in the American Civil War, was born on the 3rd of June 1808 at what is now the village of Fairview, in that part of Christian county, Kentucky, which was later organized as Todd county.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-davis-jefferson',
            loc: { section: 'DAVIS, JEFFERSON', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Davis,_Jefferson'
          }
        },
        {
          id: 'q2',
          text: 'After graduating from the US Military Academy at West Point, Jefferson Davis served in the Black Hawk and Mexican-American Wars, served as President Franklin Pierce\'s Secretary of War, and was elected to the US Senate where he led the southern defense of slavery.',
          lang: 'en',
          cite: { source: 'nps-people-jefferson-davis', loc: { section: 'Jefferson Davis' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/jefferson-davis.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'He resigned from the Senate on January 21, 1861, upon the secession of Mississippi from the Union.',
          lang: 'en',
          cite: { source: 'nps-people-jefferson-davis', loc: { section: 'Jefferson Davis' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/jefferson-davis.htm'
          }
        },
        {
          id: 'q4',
          text: 'Despite his desire to serve as a general in the Confederate army, Davis accepted his election and was inaugurated on February 18, 1861 in Montgomery, Alabama.',
          lang: 'en',
          cite: { source: 'nps-people-jefferson-davis', loc: { section: 'Jefferson Davis' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/jefferson-davis.htm'
          }
        },
        {
          id: 'q5',
          text: 'During his presidency, Davis was unable to find a strategy to defeat the better organized and more industrially developed North.',
          lang: 'en',
          cite: { source: 'nps-people-jefferson-davis', loc: { section: 'Jefferson Davis' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/people/jefferson-davis.htm'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'He was taken prisoner on the 10th of May by Federal troops near Irwinville, Irwin county, Georgia, and was brought back to Old Point, Virginia, in order to be confined in prison at Fortress Monroe.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-davis-jefferson',
            loc: { section: 'DAVIS, JEFFERSON', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Davis,_Jefferson'
          }
        },
        {
          id: 'q7',
          text: 'Such treatment aroused the sympathy of the Southern people, who regarded him as a martyr to their cause, and in a great measure restored him to that place in their esteem which by the close of the war he had lost.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-davis-jefferson',
            loc: { section: 'DAVIS, JEFFERSON', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Davis,_Jefferson'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'He died on the 6th of December 1889, at New Orleans, leaving a widow and two daughters',
          lang: 'en',
          cite: {
            source: 'britannica-1911-davis-jefferson',
            loc: { section: 'DAVIS, JEFFERSON', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Davis,_Jefferson'
          }
        }
      ]
    }
  ]
})
