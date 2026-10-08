import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'emancipation-proclamation',
  names: [
    { text: 'Emancipation Proclamation', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1863-01-01' },
        cites: [
          {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '1' }
          },
          {
            source: 'nps-gett-civil-war-timeline',
            loc: { section: 'Civil War Timeline', para: '55' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'nara-milestone-emancipation-proclamation',
          loc: { section: 'Emancipation Proclamation (1863)', para: '24' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  related: [
    { ref: 'event:american-civil-war', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:abraham-lincoln',
      role: 'signatory',
      cites: [
        {
          source: 'nara-milestone-emancipation-proclamation',
          loc: { section: 'Emancipation Proclamation (1863)', para: '1' }
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
          text: 'President Abraham Lincoln issued the Emancipation Proclamation on January 1, 1863, announcing, "that all persons held as slaves" within the rebellious areas "are, and henceforward shall be free."',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        },
        {
          id: 'q2',
          text: 'And by virtue of the power, and for the purpose aforesaid, I do order and declare that all persons held as slaves within said designated States, and parts of States, are, and henceforward shall be free; and that the Executive government of the United States, including the military and naval authorities thereof, will recognize and maintain the freedom of said persons.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Initially, the Civil War between North and South was fought by the North to prevent the secession of the Southern states and preserve the Union. Even though sectional conflicts over slavery had been a major cause of the war, ending slavery was not a goal of the war.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        },
        {
          id: 'q4',
          text: 'That left Lincoln only one alternative, and it was the most risky of all - a proclamation of emancipation, freeing the slaves; and issued, not in his civilian authority as president, but in his military capacity as commander-in-chief, using the presidential war powers.',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Although the Emancipation Proclamation did not end slavery in the nation, it did fundamentally transform the character of the war. After January 1, 1863, every advance of federal troops expanded the domain of freedom. Moreover, the Proclamation announced the acceptance of Black men into the Union Army and Navy, enabling the liberated to become liberators.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        },
        {
          id: 'q6',
          text: 'By the end of the war, almost 200,000 Black soldiers and sailors had fought for the Union and freedom.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        },
        {
          id: 'q7',
          text: 'Passed by Congress on January 31, 1865, and ratified on December 6, 1865, the 13th Amendment abolished slavery in the United States.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-13th-amendment',
            loc: {
              section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/13th-amendment'
          }
        },
        {
          id: 'q8',
          text: 'Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-13th-amendment',
            loc: {
              section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/13th-amendment'
          }
        },
        {
          id: 'q9',
          text: 'With the adoption of the 13th Amendment, the United States found a final constitutional solution to the issue of slavery.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-13th-amendment',
            loc: {
              section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/13th-amendment'
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
            value: { d: '1862-09-22' },
            cites: [
              {
                source: 'nps-gett-civil-war-timeline',
                loc: { section: 'Civil War Timeline', para: '47' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'September 22, 1862- Following the US victory at Antietam, President Lincoln introduces the Preliminary Emancipation Proclamation, which announced Lincoln\'s intention to declare all enslaved people free on January 1, 1863 if those places remained in rebellion at that time.',
        lang: 'en',
        cite: {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '47' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863-01-01' },
            cites: [
              {
                source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
                loc: { section: 'Emancipation and the Quest for Freedom', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The first of January, 1863, came without any sign of rebel repentance, and that afternoon, Lincoln signed the state copy of the Proclamation, slowly and (as he so rarely did) with his full name, and added, "I never in my life felt more certain that I was doing right than I do in signing this paper."',
        lang: 'en',
        cite: {
          source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
          loc: { section: 'Emancipation and the Quest for Freedom', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-01-31' },
            cites: [
              {
                source: 'nara-milestone-13th-amendment',
                loc: {
                  section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
                  para: '1'
                }
              },
              {
                source: 'nara-milestone-13th-amendment',
                loc: {
                  section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
                  para: '3'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'His efforts met with success when the House passed the bill in January 1865 with a vote of 119–56.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-13th-amendment',
          loc: {
            section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
            para: '3'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/13th-amendment'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-12-06' },
            cites: [
              {
                source: 'nara-milestone-13th-amendment',
                loc: {
                  section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The necessary number of states (three-fourths) ratified it by December 6, 1865.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-13th-amendment',
          loc: {
            section: '13th Amendment to the U.S. Constitution: Abolition of Slavery (1865)',
            para: '4'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/13th-amendment'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Emancipation_Proclamation%2C_01-01-1863_%28Page_1_of_5%29_%283695343876%29.jpg/1280px-Emancipation_Proclamation%2C_01-01-1863_%28Page_1_of_5%29_%283695343876%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Emancipation_Proclamation,_01-01-1863_(Page_1_of_5)_(3695343876).jpg',
    credit: { institution: 'U.S. National Archives' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ivanov-1964-avraam-linkoln', perspective: 'russian-soviet' }
  ]
})
