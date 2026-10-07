import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'darcy-oil-concession',
  names: [
    { text: 'D’Arcy Concession', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1901-05-28' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  participants: [
    {
      ref: 'person:william-knox-darcy',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '2' }
        }
      ]
    },
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:oil-strike-masjed-soleyman',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The granting of an oil concession to William Knox D’Arcy, a British citizen, for a period of 60 years.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1901' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q1',
          text: 'At the same time, the prodigal Moẓaffar-al-Din Shah and his government were in dire need of ready cash and therefore, on 28 May 1901, he granted D’Arcy an oil concession valid for sixty years, with exclusive rights to oil exploration in the entire country apart from the five northern provinces of Azarbaijan, Gilān, Mazandarān, Astarābād, and Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'These provinces were excluded to avoid offending Russia which regarded the north part of Persia as its own sphere of influence, in the same way that Britain saw southern Persia as falling in its own orbit.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q3',
          text: 'In return D’Arcy agreed to pay the Persian government twenty thousand pounds in cash, with another twenty thousand pounds worth of shares, as well as an annual royalty which was defined somewhat vaguely as equal to 16 percent of “annual net profits”',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Persia%2C_Afghanistan_%26_Baluchistan._LOC_2006626010.tif/lossy-page1-1280px-Persia%2C_Afghanistan_%26_Baluchistan._LOC_2006626010.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Persia,_Afghanistan_%26_Baluchistan._LOC_2006626010.tif',
    credit: { institution: 'Library of Congress', creator: 'Scribner & Co.' },
    license: { id: 'public-domain' }
  }
})
