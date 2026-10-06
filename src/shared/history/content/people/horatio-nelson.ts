import { definePerson } from '../../schema'

export default definePerson({
  id: 'horatio-nelson',
  names: [
    { text: 'Horatio Nelson', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1758-09-29' },
        cites: [
          {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1805-10-21' },
        cites: [
          {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['military'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Nelson was born on 29 September, 1758, in Burnham Thorpe, Norfolk, England, the sixth of eleven children.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/nelson-horatio/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1798 Nelson was alone responsible for the great victory at the Battle of the Nile, Aboukir Bay, Egypt.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/nelson-horatio/'
          }
        },
        {
          id: 'q3',
          text: 'On January 1, 1801, he was promoted to Vice Admiral of the Blue (the sixth highest rank) and a few months later he was involved in the Battle of Copenhagen (April 2, 1801).',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/nelson-horatio/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'On October 21, 1805, Nelson fought the Battle of Trafalgar, at which he was shot by a sniper. He lived long enough however to learn that victory had been won. \'Thank God I have done my duty\' were his last words.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/nelson-horatio/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Lemuel_Francis_Abbott_-_Horatio_Nelson%2C_Viscount_Nelson%2C_1758_-_1805._Admiral%2C_victor_of_Trafalgar_-_PG_965_-_National_Galleries_of_Scotland.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lemuel_Francis_Abbott_-_Horatio_Nelson,_Viscount_Nelson,_1758_-_1805._Admiral,_victor_of_Trafalgar_-_PG_965_-_National_Galleries_of_Scotland.jpg',
    credit: { institution: 'National Galleries of Scotland', creator: 'Lemuel Francis Abbott' },
    license: { id: 'public-domain' }
  }
})
