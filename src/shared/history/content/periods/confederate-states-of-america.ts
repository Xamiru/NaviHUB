import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'confederate-states-of-america',
  names: [
    { text: 'Confederate States of America', lang: 'en', role: 'primary' },
    { text: 'Confederacy', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'state-dept-milestones-civil-war-and-international-diplomacy',
            loc: { section: '1861–1865: The Civil War and International Diplomacy', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1865' },
        cites: [
          {
            source: 'nps-gett-civil-war-timeline',
            loc: { section: 'Civil War Timeline', para: '146' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Eleven of the fifteen slave-holding states announced their secession from the Union to form a new slave republic, the Confederate States of America, and civil war between the rebels and the federal government broke out.',
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
        },
        {
          id: 'q2',
          text: 'Jefferson Davis became the primary architect of Confederate military strategy.',
          lang: 'en',
          cite: {
            source: 'nps-reardon-the-military-experience',
            loc: { section: 'The Military Experience', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/the-military-experience.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'During the Civil War the Confederacy repeatedly sought international support for its cause, often calling upon foreign reliance on its cotton exports to obtain it.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-civil-war-and-international-diplomacy',
            loc: { section: '1861–1865: The Civil War and International Diplomacy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/foreword'
          }
        },
        {
          id: 'q4',
          text: 'Despite the Confederacy’s significant international commercial ties, the lack of definitive military victories for the South and the success of Union efforts to link the Confederacy with the institution of slavery ultimately prevented any of the European powers from officially recognizing or supporting the South.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-civil-war-and-international-diplomacy',
            loc: { section: '1861–1865: The Civil War and International Diplomacy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/foreword'
          }
        }
      ]
    }
  ]
})
