import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reform-act-1832',
  names: [
    { text: 'Reform Act 1832', lang: 'en', role: 'primary' },
    { text: 'Great Reform Act', lang: 'en', role: 'alternative' },
    {
      text: 'Representation of the People Act 1832',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'tna-1866-womens-suffrage-petition',
          loc: { section: 'The making of a movement' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1832-06-07' },
        cites: [
          {
            source: 'hansard-lords-1832-06-07-minutes',
            loc: { section: 'HL Deb 07 June 1832 vol 13 c497' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:london' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Women had in practice long been excluded from formal parliamentary participation, but the Representation of the People Act 1832, also known as the Reform Act, legally prevented women from voting. It extended voting rights to more men but also defined voters as male.',
          lang: 'en',
          cite: {
            source: 'tna-1866-womens-suffrage-petition',
            loc: { section: 'The making of a movement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-1866-mass-womens-suffrage-petition/'
          }
        },
        {
          id: 'q1',
          text: 'Bills. Received the Royal Assent:—Reform of Parliament (England.)',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1832-06-07-minutes',
            loc: { section: 'HL Deb 07 June 1832 vol 13 c497' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1832/jun/07/minutes'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Suffrage organisations later referenced this time – and women’s exclusion in the Reform Act – as the start of their movement.',
          lang: 'en',
          cite: {
            source: 'tna-1866-womens-suffrage-petition',
            loc: { section: 'The making of a movement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-1866-mass-womens-suffrage-petition/'
          }
        },
        {
          id: 'q5',
          text: 'The Act became a turning point, driving a campaign for change.',
          lang: 'en',
          cite: {
            source: 'tna-1866-womens-suffrage-petition',
            loc: { section: 'The making of a movement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-1866-mass-womens-suffrage-petition/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/George_Hayter_%281792-1871%29_-_The_First_Reformed_House_of_Commons%2C_1833_%28sketch%29_-_WOA_363_-_Parliamentary_Art_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:George_Hayter_(1792-1871)_-_The_First_Reformed_House_of_Commons,_1833_(sketch)_-_WOA_363_-_Parliamentary_Art_Collection.jpg',
    credit: { institution: 'Parliamentary Art Collection', creator: 'George Hayter' },
    license: { id: 'public-domain' }
  }
})
