import { definePerson } from '../../schema'

export default definePerson({
  id: 'abraham-lincoln',
  names: [
    { text: 'Abraham Lincoln', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1809-02-12' },
        cites: [
          {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '21' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1865-04-15' },
        cites: [
          {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '21' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:washington-dc',
    cites: [
      {
        source: 'nps-gett-civil-war-timeline',
        loc: { section: 'Civil War Timeline', para: '144' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      end: {
        alts: [
          {
            value: { d: '1865-04-15' },
            cites: [
              {
                source: 'nps-foth-faq-the-assassination',
                loc: { section: 'Frequently Asked Questions: The Assassination', para: '21' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
          loc: { section: 'Emancipation and the Quest for Freedom', para: '9' }
        },
        {
          source: 'nps-gett-civil-war-timeline',
          loc: { section: 'Civil War Timeline', para: '135' }
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
          text: 'That November, Lincoln was elected as the first avowedly anti-slavery president of the United States, and Southerners convinced themselves that he intended, like Brown, to abolish slavery by force.',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '9' }
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
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Abraham Lincoln always insisted that he was an enemy of slavery.',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        },
        {
          id: 'q3',
          text: 'Blacks and whites alike possessed the natural rights of life, liberty, and the pursuit of happiness, but he did not embrace the notion that blacks were also entitled to equal civil rights - "making voters or jurors of negroes, nor of qualifying them to hold office, nor to intermarry with white people."',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        },
        {
          id: 'q4',
          text: 'President Lincoln understood his constituency very well and his statements on slavery were calculated to reassure white northerners as well as southern slaveholders that the U.S. government had, in his words, "no purpose, directly or indirectly, to interfere with slavery in the States where it exists."',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Lincoln made clear at the start that he aimed to preserve the Union.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q6',
          text: 'Buoyed by recent victories, Lincoln won reelection in early November, helped in part by the soldier vote.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        },
        {
          id: 'q7',
          text: 'March 4, 1865- President Abraham Lincoln is inaugurated for his second term as president in Washington, DC.',
          lang: 'en',
          cite: {
            source: 'nps-gett-civil-war-timeline',
            loc: { section: 'Civil War Timeline', para: '135' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Lincoln was born on February 12, 1809, and died on April 15, 1865.',
          lang: 'en',
          cite: {
            source: 'nps-foth-faq-the-assassination',
            loc: { section: 'Frequently Asked Questions: The Assassination', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/foth/learn/historyculture/faq-the-assassination.htm'
          }
        },
        {
          id: 'q9',
          text: 'Six men carried the President across the street to the back bedroom of a house owned by William Petersen.',
          lang: 'en',
          cite: {
            source: 'nara-eyewitness-lincoln-assassination-robert-king-stone',
            loc: { section: 'Robert King Stone - Assassination of President Abraham Lincoln, 1865' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/exhibits/eyewitness/html.php?section=13'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/1280px-Abraham_Lincoln_O-77_matte_collodion_print.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_O-77_matte_collodion_print.jpg',
    credit: { creator: 'Alexander Gardner' },
    license: { id: 'public-domain' }
  }
})
