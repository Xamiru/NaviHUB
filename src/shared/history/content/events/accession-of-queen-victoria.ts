import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'accession-of-queen-victoria',
  names: [
    { text: 'Accession of Queen Victoria', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1837-06-20' },
        cites: [
          {
            source: 'hansard-lords-1837-06-20-demise-of-william-iv',
            loc: { section: 'HL Deb 20 June 1837 vol 38 c1546' }
          },
          {
            source: 'hansard-commons-1837-06-20-proceedings-on-the-kings-death',
            loc: { section: 'HC Deb 20 June 1837 vol 38 c1546' }
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
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      ref: 'person:queen-victoria',
      role: 'head-of-state',
      cites: [
        {
          source: 'hansard-lords-1837-06-20-demise-of-william-iv',
          loc: { section: 'HL Deb 20 June 1837 vol 38 c1546' }
        }
      ]
    },
    {
      name: 'King William IV',
      role: 'head-of-state',
      cites: [
        {
          source: 'hansard-lords-1837-06-20-demise-of-william-iv',
          loc: { section: 'HL Deb 20 June 1837 vol 38 c1546' }
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
          text: 'Their Lordships met this morning at a quarter past ten o\'clock, in consequence of the DEATH of his MAJESTY, King William IV, which took place at Windsor, at twelve minutes past two o\'clock, on this day, their Lordships were immediately summoned in pursuance of the 7th and 8th, William III, c. 15. The Lord Chancellor, the Earl of Shaftesbury, the Marquess of Lansdowne, the Bishop of Salisbury, the Earl of Chichester, Viscount Strangford, and Lord Kenyon were present, and after prayers had been read by the Bishop of Salisbury, all took the oath of allegiance to her Majesty as Queen Victoria.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1837-06-20-demise-of-william-iv',
            loc: { section: 'HL Deb 20 June 1837 vol 38 c1546' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1837/jun/20/demise-of-his-majesty-king-william-the'
          }
        },
        {
          id: 'q2',
          text: 'Their Lordships adjourned till three o\'clock, and at that period a great number of Peers took the oath of allegiance.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1837-06-20-demise-of-william-iv',
            loc: { section: 'HL Deb 20 June 1837 vol 38 c1546' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1837/jun/20/demise-of-his-majesty-king-william-the'
          }
        },
        {
          id: 'q3',
          text: 'The Speaker proceeded to the Council at eleven o\'clock, and at a quarter to one entered the House. Standing before the chair, the right hon. Gentleman took the oaths of allegiance and supremacy to her Majesty Queen Victoria.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1837-06-20-proceedings-on-the-kings-death',
            loc: { section: 'HC Deb 20 June 1837 vol 38 c1546' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1837/jun/20/proceedings-on-the-kings-death'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Henry_Tanworth_Wells_%281828-1903%29_-_Queen_Victoria_receiving_the_news_of_her_Accession_-_RCIN_406996_-_Royal_Collection.jpg/1280px-Henry_Tanworth_Wells_%281828-1903%29_-_Queen_Victoria_receiving_the_news_of_her_Accession_-_RCIN_406996_-_Royal_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Henry_Tanworth_Wells_(1828-1903)_-_Queen_Victoria_receiving_the_news_of_her_Accession_-_RCIN_406996_-_Royal_Collection.jpg',
    credit: { institution: 'Royal Collection', creator: 'Henry Tanworth Wells' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'halevy-1913-histoire-du-peuple-anglais-au-xixe-siecle',
      perspective: 'european'
    }
  ]
})
