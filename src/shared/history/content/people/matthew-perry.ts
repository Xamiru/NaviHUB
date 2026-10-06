import { definePerson } from '../../schema'

export default definePerson({
  id: 'matthew-perry',
  names: [
    { text: 'Matthew C. Perry', lang: 'en', role: 'primary' },
    {
      text: 'Matthew Calbraith Perry',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'avalon-treaty-of-kanagawa',
          loc: { section: 'Treaty of Kanagawa; March 31, 1854', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['north-america', 'east-asia'],
  roles: ['military', 'diplomat'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'A lifetime naval officer, Perry had distinguished himself in the Mexican-American War and was instrumental in promoting the United States Navy’s conversion to steam power.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        },
        {
          id: 'q2',
          text: 'Although he is often credited with opening Japan to the western world, Perry was not the first westerner to visit the islands.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Commodore_Matthew_Calbraith_Perry.jpg/1280px-Commodore_Matthew_Calbraith_Perry.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Commodore_Matthew_Calbraith_Perry.jpg',
    credit: { institution: 'The Metropolitan Museum of Art', creator: 'Mathew Brady' },
    license: { id: 'public-domain' }
  }
})
