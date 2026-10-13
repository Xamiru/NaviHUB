import { definePerson } from '../../schema'

export default definePerson({
  id: 'suleiman-the-magnificent',
  names: [
    { text: 'Suleiman the Magnificent', lang: 'en', role: 'primary' },
    {
      text: 'Süleymān I',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '11' }
        }
      ]
    },
    {
      text: 'Suleiman I',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1494' },
        cites: [
          { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1566-09-05' },
        cites: [
          { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '4' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Sultan of the Ottoman Empire',
      polity: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1520' },
            cites: [
              {
                source: 'britannica-1911-suleiman-i',
                loc: { section: 'SULEIMAN I.', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1566-09-05' },
            cites: [
              {
                source: 'britannica-1911-suleiman-i',
                loc: { section: 'SULEIMAN I.', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '1' } },
        { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '4' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Suleiman_the_Magnificent_of_the_Ottoman_Empire.jpg/1280px-Suleiman_the_Magnificent_of_the_Ottoman_Empire.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Suleiman_the_Magnificent_of_the_Ottoman_Empire.jpg',
    credit: { institution: 'Kunsthistorisches Museum Wien' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'When Süleyman died in 1566, the Ottoman Empire was a world power.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Selim I and Süleyman the Magnificent', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/turkey/8.htm' }
        },
        {
          id: 'q2',
          text: 'Suleiman\'s claims to renown as a legislator rest mainly on his organization of the Ulema, or clerical class, in its hierarchical order from the Sheikh-ul-Islam downwards.',
          lang: 'en',
          cite: { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Suleiman_I.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Belgrade fell to Süleyman in 1521, and in 1522 he compelled the Knights of Saint John to abandon Rhodes.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Selim I and Süleyman the Magnificent', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/turkey/8.htm' }
        },
        {
          id: 'q4',
          text: 'In 1534 Kurdistan and Mesopotamia were taken from Persia.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Selim I and Süleyman the Magnificent', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/turkey/8.htm' }
        },
        {
          id: 'q5',
          text: 'Between 1534 and 1554, Sulṭan Süleymān I, responding to Safavid harassment, conducted three campaigns against Persia, causing much devastation in Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'The peace offer was doubtless welcome to the Ottomans, since they were not able to gain a decisive victory and were also fighting against the Habsburgs at their Western border; it was accepted, and an armistice was agreed upon until the signing of the treaty.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Suleiman died on the 5th of September 1566, at the age of 72, while conducting the siege of Szigetvār.',
          lang: 'en',
          cite: { source: 'britannica-1911-suleiman-i', loc: { section: 'SULEIMAN I.', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Suleiman_I.'
          }
        }
      ]
    }
  ]
})
