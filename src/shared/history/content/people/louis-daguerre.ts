import { definePerson } from '../../schema'

export default definePerson({
  id: 'louis-daguerre',
  names: [
    { text: 'Louis Daguerre', lang: 'en', role: 'primary' },
    {
      text: 'Jacques Daguerre',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-adle-daguerreotype', loc: { section: 'DAGUERREOTYPE', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1787' },
        cites: [
          {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1851' },
        cites: [
          {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['artist', 'scientist'],
  sections: [
    {
      kind: 'works',
      quotes: [
        {
          id: 'q1',
          text: 'DAGUERREOTYPE, the first practical photo­graphic process, introduced into Persia in the early 1840s, shortly after its official presentation to the French Académie de Science in Paris in 1839. It was developed by the French painter Jacques Daguerre (1787-1851) and involved exposing, through the lens of a camera, a silver-coated copper plate sensitized by iodine, then developing the image with vapor of mer­cury (for details of the process and its sources, see Daguerre).',
          lang: 'en',
          cite: {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/daguerreotype'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Jean-Babtiste_Sabarier-Blot_L.J.M.Daguerre.1844.JPG/1280px-Jean-Babtiste_Sabarier-Blot_L.J.M.Daguerre.1844.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Jean-Babtiste_Sabarier-Blot_L.J.M.Daguerre.1844.JPG',
    credit: { institution: 'George Eastman Museum', creator: 'Jean-Baptiste Sabatier-Blot' },
    license: { id: 'public-domain' }
  }
})
