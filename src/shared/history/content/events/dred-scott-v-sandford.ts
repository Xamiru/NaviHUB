import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dred-scott-v-sandford',
  names: [
    { text: 'Dred Scott v. Sandford', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1857-03-06' },
        cites: [
          {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Dred Scott',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-dred-scott-v-sandford',
          loc: { section: 'Dred Scott v. Sandford (1857)', para: '2' }
        }
      ]
    },
    {
      name: 'Harriet Scott',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-dred-scott-v-sandford',
          loc: { section: 'Dred Scott v. Sandford (1857)', para: '2' }
        }
      ]
    },
    {
      name: 'Roger B. Taney',
      role: 'participant',
      cites: [
        {
          source: 'nara-milestone-dred-scott-v-sandford',
          loc: { section: 'Dred Scott v. Sandford (1857)', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:kansas-nebraska-act', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1846, an enslaved Black man named Dred Scott and his wife, Harriet, sued for their freedom in St. Louis Circuit Court.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/dred-scott-v-sandford'
          }
        },
        {
          id: 'q2',
          text: 'However, what appeared to be a straightforward lawsuit between two private parties became an 11-year legal struggle that culminated in one of the most notorious decisions ever issued by the United States Supreme Court.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/dred-scott-v-sandford'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On March 6, 1857, Chief Justice Roger B. Taney read the majority opinion of the Court, which stated that enslaved people were not citizens of the United States and, therefore, could not expect any protection from the federal government or the courts.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/dred-scott-v-sandford'
          }
        },
        {
          id: 'q4',
          text: 'The opinion also stated that Congress had no authority to ban slavery from a federal territory.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/dred-scott-v-sandford'
          }
        },
        {
          id: 'q5',
          text: 'This decision moved the nation a step closer to the Civil War.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/dred-scott-v-sandford'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'The decision of Scott v. Sandford, considered by many legal scholars to be the worst ever rendered by the Supreme Court, was overturned by the 13th and 14th amendments to the Constitution, which abolished slavery and declared all persons born in the United States to be citizens of the United States.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-dred-scott-v-sandford',
            loc: { section: 'Dred Scott v. Sandford (1857)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/dred-scott-v-sandford'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Oil_on_Canvas_Portrait_of_Dred_Scott_%28cropped%29.jpg/1280px-Oil_on_Canvas_Portrait_of_Dred_Scott_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Oil_on_Canvas_Portrait_of_Dred_Scott_(cropped).jpg',
    credit: { institution: 'Missouri History Museum', creator: 'Louis Schultze' },
    license: { id: 'public-domain' }
  }
})
