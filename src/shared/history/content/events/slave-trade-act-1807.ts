import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'slave-trade-act-1807',
  names: [
    { text: 'Abolition of the Slave Trade Act 1807', lang: 'en', role: 'primary' },
    {
      text: 'Slave Trade Abolition bill',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hansard-lords-1807-03-25-minutes',
          loc: { section: 'HL Deb 25 March 1807 vol 9 c188' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1807-03-25' },
        cites: [
          {
            source: 'hansard-lords-1807-03-25-minutes',
            loc: { section: 'HL Deb 25 March 1807 vol 9 c188' }
          },
          {
            source: 'hansard-lords-1807-03-25-minutes',
            loc: { section: 'HL Deb 25 March 1807 vol 9 c188' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'subsaharan-africa', 'latin-america'],
  prominence: 2,
  participants: [
    {
      name: 'Lord Howick',
      role: 'leader',
      cites: [
        {
          source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
          loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
        }
      ]
    },
    {
      name: 'William Wilberforce',
      role: 'participant',
      cites: [
        {
          source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
          loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
        }
      ]
    },
    {
      name: 'Lord Grenville',
      role: 'leader',
      cites: [
        {
          source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
          loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
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
          text: 'The royal assent was given by commission to the Slave Trade Abolition bill, the Irish Licence bill, and the Thames Police bill, and two private bills.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1807-03-25-minutes',
            loc: { section: 'HL Deb 25 March 1807 vol 9 c188' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1807/mar/25/minutes'
          }
        },
        {
          id: 'q2',
          text: 'There was at this moment no disposition to question the principle of this measure.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
            loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1807-02-23' },
            cites: [
              {
                source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
                loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
              },
              {
                source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
                loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'The question was now loudly called for, and the house divided. Ayes 283, noes 16, majority 267.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
          loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Am_I_Not_a_Man_and_a_Brother_-_Wedgwood_jasperware_cameo_%28Boston_MFA_96.779%29.jpg/1280px-Am_I_Not_a_Man_and_a_Brother_-_Wedgwood_jasperware_cameo_%28Boston_MFA_96.779%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Am_I_Not_a_Man_and_a_Brother_-_Wedgwood_jasperware_cameo_(Boston_MFA_96.779).jpg',
    credit: { institution: 'Museum of Fine Arts, Boston', creator: 'Josiah Wedgwood' },
    license: { id: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' }
  },
  archive: [
    {
      id: 'wilberforce-1807-letter',
      mediaKind: 'document',
      title: 'A letter on the abolition of the slave trade : addressed to the freeholders and other inhabitants of Yorkshire / by W. Wilberforce, Esq.',
      date: { d: '1807' },
      url: 'https://archive.org/download/letteronabolitio00wilb/letteronabolitio00wilb.pdf',
      page: 'https://archive.org/details/letteronabolitio00wilb',
      credit: {
        institution: 'State Library of Pennsylvania (Internet Archive)',
        creator: 'William Wilberforce'
      },
      license: { id: 'public-domain' },
      bytes: 21020507
    }
  ]
})
