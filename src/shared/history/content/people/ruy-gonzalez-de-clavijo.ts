import { definePerson } from '../../schema'

export default definePerson({
  id: 'ruy-gonzalez-de-clavijo',
  names: [
    { text: 'Ruy González de Clavijo', lang: 'en', role: 'primary' },
    {
      text: 'Clavijo',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1412-04-02' },
        cites: [
          {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
          },
          {
            source: 'loc-name-authority-gonzalez-de-clavijo',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  roles: ['diplomat', 'writer'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Clavijo came from a prominent family, but his birth date is unknown and his life poorly documented.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q7',
          text: 'Clavijo’s work was based on his daily journal; it contains a full itinerary, with dates of arrival and departure, and detailed descriptions of most of the places he saw.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        },
        {
          id: 'q9',
          text: 'Although in Renaissance Europe there was considerable interest in Tīmūr, the travel reports of Clavijo and others were little used in the popular historical and dramatic accounts of Tīmūr’s life',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q10',
          text: 'Some time after Henry’s death in December of that year Clavijo retired and built for himself and his descendants an elaborate sepulcher in the convent of San Francisco in Madrid, where he was eventually buried.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q11',
          text: 'He buried all who had come out to him, alive, and ordered the city to be pillaged, pulled down, and destroyed.',
          lang: 'en',
          cite: {
            source: 'clavijo-1859-narrative-of-the-embassy',
            loc: { page: '75', section: 'Narrative of the Embassy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://archive.org/stream/narrativeembass00markgoog/narrativeembass00markgoog_djvu.txt'
          }
        },
        {
          id: 'q12',
          text: 'Timour Beg had made this movement, to throw his enemy into disorder ; and they fought, and the Turk was taken prisoner.',
          lang: 'en',
          cite: {
            source: 'clavijo-1859-narrative-of-the-embassy',
            loc: { page: '77', section: 'Narrative of the Embassy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://archive.org/stream/narrativeembass00markgoog/narrativeembass00markgoog_djvu.txt'
          }
        }
      ]
    }
  ]
})
