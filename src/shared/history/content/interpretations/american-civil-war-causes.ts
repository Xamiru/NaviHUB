import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'american-civil-war-causes',
  about: ['event:american-civil-war', 'period:confederate-states-of-america'],
  topic: 'causes',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'One of the most sensitive and controversial issues that any Civil War site interpreter will confront is the role of slavery in the South\'s decision to secede from and take up arms against the United States.',
    lang: 'en',
    cite: {
      source: 'nps-horton-confronting-slavery-and-the-lost-cause',
      loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '4' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
    }
  },
  positions: [
    {
      id: 'secessionists-named-slavery',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Alexander Hamilton Stephens' },
        { kind: 'state', name: 'South Carolina' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'On March 21, 1861 in Savannah, Stephens, the then Vice President of the Confederacy, drew applause when he proclaimed that "our new government" was founded on slavery, "its foundations are laid, its corner-stone rests upon the great truth, that the [N]egro is not equal to the white man; that slavery - submission to the superior race - is his natural and normal condition. This, our new government, is the first in the history of the world, based upon this great physical, philosophical, and moral truth."',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        },
        {
          id: 'q3',
          text: 'The reason for the drastic action, South Carolina delegates explained in their "Declaration of the Causes which Induced the Secession of South Carolina," was what they termed a broken compact between the federal government and "the slaveholding states."',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '6' }
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
      id: 'slavery-central',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'James Oliver Horton' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Yet, the best historical scholars over the last generation or more have argued convincingly for the centrality of slavery among the causes of the Civil War.',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        },
        {
          id: 'q5',
          text: 'This war was not about tariffs or differences in economic systems or even about state\'s rights, except for the right of southern states to protect slavery.',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        }
      ],
      standing: {
        label: 'mainstream',
        quote: {
          id: 'q6',
          text: 'Although an argument that slavery played an important role in the coming of the Civil War would raise few eyebrows among academic scholars, for public historians faced with a popular audience unfamiliar with the latest scholarship on the subject such an assertion can be very controversial.',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        }
      }
    },
    {
      id: 'union-not-abolition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'James Oliver Horton' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Although the defense of slavery was central to the Confederacy, the abolition of slavery was not initially the official goal of the United States or the primary concern of most of the American people.',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        },
        {
          id: 'q8',
          text: 'And while the U.S. government may not have gone to war to abolish slavery in the South, it did go to war to save the union from what it increasingly came to believe was a "slave power conspiracy" to restrict citizen liberties and finally to destroy the United States.',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '15' }
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
      id: 'lost-cause',
      category: 'revisionist',
      holders: [
        { kind: 'school', name: 'Lost Cause' },
        { kind: 'participant', name: 'Jefferson Davis' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'In the 1870s and beyond, former Confederates began to forge a Lost Cause Tradition, arguing that the South had never really fought for slavery, that they had only been defeated by superior numbers and resources, and that the their noble defense of home, hearth, and "way of life" was an heroic epic that all the nation should admire.',
          lang: 'en',
          cite: {
            source: 'nps-blight-civil-war-in-american-memory',
            loc: { section: 'The Civil War in American Memory', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-civil-war-in-american-memory.htm'
          }
        },
        {
          id: 'q10',
          text: 'In his 1881 memoir, former Confederate President Jefferson Davis argued that slavery "was in no wise the cause of the conflict" and that slaves had been "contented with their lot."',
          lang: 'en',
          cite: {
            source: 'nps-blight-civil-war-in-american-memory',
            loc: { section: 'The Civil War in American Memory', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-civil-war-in-american-memory.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'This genteel and decontaminated narrative of the Civil War justified both massive resistance to concepts of equality and the inferior social and economic position accorded African Americans.',
          lang: 'en',
          cite: {
            source: 'nps-cw150-legacy-of-the-civil-war',
            loc: { section: 'The Legacy of the Civil War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/features/waso/cw150th/reflections/legacy/page5.html'
          }
        },
        {
          id: 'q12',
          text: 'When such a wide variety of southerners - from private citizens, to top governmental officials, from low ranking enlisted men to Confederate military leaders at the highest levels, from local politicians to regional newspaper editors - all agree, what more evidence do we need?',
          lang: 'en',
          cite: {
            source: 'nps-horton-confronting-slavery-and-the-lost-cause',
            loc: { section: 'Confronting Slavery and Revealing the "Lost Cause"', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/confronting-slavery-and-revealing-the-lost-cause.htm'
          }
        },
        {
          id: 'q13',
          text: 'And one can hope that informed Americans will remember that the significance of any exercise of states\' rights is always in the cause to which it is employed.',
          lang: 'en',
          cite: {
            source: 'nps-blight-civil-war-in-american-memory',
            loc: { section: 'The Civil War in American Memory', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-civil-war-in-american-memory.htm'
          }
        }
      ]
    }
  ]
})
