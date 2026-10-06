import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'invention-of-the-daguerreotype',
  names: [
    { text: 'Invention of the daguerreotype', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1839' },
        cites: [
          {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'iranica-adle-daguerreotype', loc: { section: 'DAGUERREOTYPE', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:louis-daguerre',
      role: 'participant',
      cites: [
        { source: 'iranica-adle-daguerreotype', loc: { section: 'DAGUERREOTYPE', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'DAGUERREOTYPE, the first practical photo­graphic process, introduced into Persia in the early 1840s, shortly after its official presentation to the French Académie de Science in Paris in 1839.',
          lang: 'en',
          cite: {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/daguerreotype'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q2',
          text: 'In Persia the introduction of the daguerreo­type paved the way for a floruit of photography in the second half of the 19th century.',
          lang: 'en',
          cite: {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/daguerreotype'
          }
        },
        {
          id: 'q3',
          text: 'Foreign diplomats were aware of the Persian passion for painting, espe­cially portraiture, and novelties, and in the early 1840s two daguerreotype cameras were presented to Moḥammad Shah (r. 1250-64/1834-48), one on behalf of Queen Victoria, the other on behalf of Tsar Nicolas I, reflecting the Anglo-Russian rivalry in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/daguerreotype'
          }
        },
        {
          id: 'q4',
          text: 'Moḥammad Shah’s successor, Nāṣer-al-Dīn Shah (r. 1265-1313/1848-96), became a dedicated photographer, perhaps because his drawings were wanting in technique.',
          lang: 'en',
          cite: {
            source: 'iranica-adle-daguerreotype',
            loc: { section: 'DAGUERREOTYPE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/daguerreotype'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Jean-Babtiste_Sabarier-Blot_L.J.M.Daguerre.1844.JPG/1280px-Jean-Babtiste_Sabarier-Blot_L.J.M.Daguerre.1844.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Jean-Babtiste_Sabarier-Blot_L.J.M.Daguerre.1844.JPG',
    credit: { institution: 'George Eastman Museum', creator: 'Jean-Baptiste Sabatier-Blot' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'daguerre-1839',
      mediaKind: 'document',
      title: 'A practical description of that process calle [sic] the Daguerreotype : this process consists in the spontaneous reproduction of the images of nature received in the camera obscura (1839) [BP17-1]',
      date: { d: '1839' },
      url: 'https://archive.org/download/1839Practical_description_daguerreotype-BP17-1/BP17-1-RPS.pdf',
      page: 'https://archive.org/details/1839Practical_description_daguerreotype-BP17-1',
      credit: {
        institution: 'National Art Library, RPS bound pamphlets (Internet Archive)',
        creator: 'Louis Jacques Mandé Daguerre'
      },
      license: { id: 'public-domain' },
      bytes: 33268042
    }
  ]
})
