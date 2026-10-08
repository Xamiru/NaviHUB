import { definePerson } from '../../schema'

export default definePerson({
  id: 'woodrow-wilson',
  names: [
    { text: 'Woodrow Wilson', lang: 'en', role: 'primary' },
    {
      text: 'Thomas Woodrow Wilson',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1856-12-28' },
        cites: [
          { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1924-02-03' },
        cites: [
          { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:washington-dc',
    cites: [
      { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
    ]
  },
  regions: ['north-america', 'global'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'twenty-eighth president of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1913' },
            cites: [
              { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1921' },
            cites: [
              { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Thomas Woodrow Wilson was the twenty-eighth president of the United States (1913-1921). Wilson unsuccessfully attempted to bring the belligerents to the negotiating table, but in 1917 reluctantly concluded that the U.S. should join the war as an “Associated Power.” His attempts to create a lasting peace created the League of Nations, but failed to prevent another world war.',
          lang: 'en',
          cite: { source: 'eo1418-benbow-wilson', loc: { section: 'Wilson, Woodrow' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilson-woodrow/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On 2 April 1917 Wilson reluctantly asked a special joint session of congress to declare war on Germany. Wilson famously called for the war “to make the world safe for democracy.”',
          lang: 'en',
          cite: {
            source: 'eo1418-benbow-wilson',
            loc: { section: 'U.S. Entry and the Home front', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilson-woodrow/'
          }
        },
        {
          id: 'q3',
          text: 'The treaty was met by a hostile U.S. Senate. A majority supported it, but it needed a two-thirds vote to pass. While the “Irreconcilables” refused to vote for the treaty, the “Reservationists” were willing to support the treaty with some addendums. Wilson’s stubborn streak resurfaced, and he refused to make any changes. With the treaty stalled he went on a public speaking tour across the U.S. The strain of giving long speeches, however, took its toll, and Wilson neared collapse. Returning home Wilson suffered a major stroke. There was no clear mechanism for removing an ill president, and his administration was left adrift. Wilson continued to refuse to accept any reservations, and the Senate rejected the treaty.',
          lang: 'en',
          cite: {
            source: 'eo1418-benbow-wilson',
            loc: { section: 'Fourteen Points and Peace', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilson-woodrow/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'One of the most controversial aspects of Wilson’s administration was race. He was a white supremacist and supported segregation, ostensibly for the benefit of “both races.”',
          lang: 'en',
          cite: { source: 'eo1418-benbow-wilson', loc: { section: 'Race and Legacy', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilson-woodrow/'
          }
        },
        {
          id: 'q5',
          text: 'Wilson’s legacy is a chaotic mixture of realism and idealism. He entered the war in part to create an international organization. The League was founded, and Wilson even received the Nobel Prize for its creation. However, Wilson’s own stubbornness prevented the U.S. from becoming a member and the League was unable to prevent future wars. He declared that the war was fought to protect democracy, but his administration’s repressive policies at home stifled dissent and increased segregation. Wilson’s idealism and the hopes it engendered also made him the central figure in how the Versailles Conference is remembered, even though he was but one of the major leaders responsible for the treaty. His legacy is thus of being one of a group of all-too fallible leaders who were overwhelmed by the task before them; that of reconstructing a new world that would not repeat the mistakes of the past. His ideals nonetheless continued to animate American foreign policy throughout the 20th and 21st century.',
          lang: 'en',
          cite: { source: 'eo1418-benbow-wilson', loc: { section: 'Race and Legacy', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilson-woodrow/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/President_Woodrow_Wilson%2C_portrait_photograph.tif/lossy-page1-1280px-President_Woodrow_Wilson%2C_portrait_photograph.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:President_Woodrow_Wilson,_portrait_photograph.tif',
    credit: { institution: 'Library of Congress', creator: 'Arnold Genthe' },
    license: { id: 'public-domain' }
  }
})
