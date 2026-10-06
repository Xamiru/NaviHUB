import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'discovery-of-tutankhamuns-tomb',
  names: [
    { text: 'Discovery of Tutankhamun’s tomb', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1922-11-04' },
        cites: [
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '196' } }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:valley-of-the-kings',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '197' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Howard Carter',
      role: 'leader',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '197' } }
      ]
    },
    {
      name: 'Lord Carnarvon',
      role: 'participant',
      cites: [
        {
          source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
          loc: { section: 'The Finding of the Tomb' }
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
          text: 'Der britische Archäologe Howard Carter (1873-1939) entdeckt das Grab Tutanchamuns im Tal der Könige in Luxor (Ägypten).',
          lang: 'de',
          cite: { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '197' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1922.html'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'Hardly had I arrived on the work next morning (November 4th) than the unusual silence, due to the stoppage of the work, made me realize that something out of the ordinary had happened, and I was greeted by the announcement that a step cut in the rock had been discovered underneath the very first hut to be attacked.',
          lang: 'en',
          cite: {
            source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
            loc: { section: 'The Finding of the Tomb' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/in.ernet.dli.2015.77344/2015.77344.The-Tomb-Of-Tut-Ankh-Amen-Vjol-I_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'The manner of cutting was that of the sunken stairway entrance so common in The Valley, and I almost dared to hope that we had found our tomb at last.',
          lang: 'en',
          cite: {
            source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
            loc: { section: 'The Finding of the Tomb' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/in.ernet.dli.2015.77344/2015.77344.The-Tomb-Of-Tut-Ankh-Amen-Vjol-I_djvu.txt'
          }
        },
        {
          id: 'q4',
          text: 'The day following (November 26th) was the day of days, the most wonderful that I have ever lived through, and certainly one whose like I can never hope to see again.',
          lang: 'en',
          cite: {
            source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
            loc: { section: 'The Finding of the Tomb' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/in.ernet.dli.2015.77344/2015.77344.The-Tomb-Of-Tut-Ankh-Amen-Vjol-I_djvu.txt'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Burton_Tutankhamun_tomb_photographs_1_015.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Burton_Tutankhamun_tomb_photographs_1_015.jpg',
    credit: { creator: 'Harry Burton' },
    license: { id: 'public-domain' }
  }
})
