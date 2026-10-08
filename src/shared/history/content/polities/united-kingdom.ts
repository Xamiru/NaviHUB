import { definePolity } from '../../schema'

export default definePolity({
  id: 'united-kingdom',
  names: [
    { text: 'United Kingdom', lang: 'en', role: 'primary' },
    {
      text: 'United Kingdom of Great Britain and Ireland',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'legislation-gov-uk-union-with-ireland-act-1800',
          loc: { section: 'Article First' }
        }
      ]
    },
    {
      text: 'United Kingdom of Great Britain and Northern Ireland',
      lang: 'en',
      role: 'official',
      cites: [
        { source: 'avalon-charter-of-the-united-nations', loc: { section: 'Preamble' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1801-01-01' },
        cites: [
          {
            source: 'legislation-gov-uk-union-with-ireland-act-1800',
            loc: { section: 'Article First' }
          },
          {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:london',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'United Kingdom (code 200), capital London' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 23666, from: 1801 },
    { set: 'europe', code: 200, to: 1886 },
    { set: 'world', code: 200 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/George_Hayter_%281792-1871%29_-_The_First_Reformed_House_of_Commons%2C_1833_%28sketch%29_-_WOA_363_-_Parliamentary_Art_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:George_Hayter_(1792-1871)_-_The_First_Reformed_House_of_Commons,_1833_(sketch)_-_WOA_363_-_Parliamentary_Art_Collection.jpg',
    credit: { institution: 'Parliamentary Art Collection', creator: 'George Hayter' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND,[1] the official title, since the 1st of January 1801, of the political unity composed of England and Wales, Scotland and Ireland.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_Kingdom'
          }
        },
        {
          id: 'q2',
          text: 'That it be the Third Article of Union',
          lang: 'en',
          cite: {
            source: 'legislation-gov-uk-union-with-ireland-act-1800',
            loc: { section: 'Article Third' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.legislation.gov.uk/apgb/Geo3/39-40/67/body?timeline=false'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: '“Great Britain” was employed as a formal designation from the time of the union of the kingdoms of England and Scotland in 1707.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_Kingdom'
          }
        },
        {
          id: 'q4',
          text: 'That it be the First Article of the Union of the kingdoms of Great Britain and Ireland, that the said kingdoms of Great Britain and Ireland shall, upon the first day of January which shall be in the year of our Lord one thousand eight hundred and one, and for ever after, be united into one kingdom, by the name of the United Kingdom of Great Britain and Ireland',
          lang: 'en',
          cite: {
            source: 'legislation-gov-uk-union-with-ireland-act-1800',
            loc: { section: 'Article First' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.legislation.gov.uk/apgb/Geo3/39-40/67/body?timeline=false'
          }
        }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'halevy-1913-histoire-du-peuple-anglais-au-xixe-siecle',
      perspective: 'european'
    },
    { source: 'bedarida-1990-la-societe-anglaise', perspective: 'european' }
  ]
})
