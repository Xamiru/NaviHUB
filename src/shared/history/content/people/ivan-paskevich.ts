import { definePerson } from '../../schema'

export default definePerson({
  id: 'ivan-paskevich',
  names: [
    { text: 'Ivan Paskevich', lang: 'en', role: 'primary' },
    { text: 'Иван Фёдорович Паскевич', lang: 'ru', role: 'native' },
    {
      text: 'Pashkevich',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '23'
          }
        }
      ]
    },
    {
      text: 'Paskievich',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  regions: ['russia-central-asia', 'iran'],
  roles: ['military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'PASKEVICH, IVAN FEDOROVICH (1782–1856), count of Erivan, prince of Warsaw, Russian field marshal, descended from an old and wealthy family, was born at Poltava on the 19th (8th) of May 1782.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-paskevich-ivan-fedorovich',
            loc: { section: 'PASKEVICH, IVAN FEDOROVICH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paskevich,_Ivan_Fedorovich'
          }
        },
        {
          id: 'q1',
          text: 'Ermolov was replaced by General Pashkevich.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Iran had to accept all conditions put forward by Pashkevich',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/%D0%98%D0%B2%D0%B0%D0%BD_%D0%A4%D0%B5%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87_%D0%9F%D0%B0%D1%81%D0%BA%D0%B5%D0%B2%D0%B8%D1%87.jpg/1280px-%D0%98%D0%B2%D0%B0%D0%BD_%D0%A4%D0%B5%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87_%D0%9F%D0%B0%D1%81%D0%BA%D0%B5%D0%B2%D0%B8%D1%87.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%98%D0%B2%D0%B0%D0%BD_%D0%A4%D0%B5%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87_%D0%9F%D0%B0%D1%81%D0%BA%D0%B5%D0%B2%D0%B8%D1%87.jpg',
    credit: { institution: 'State Hermitage Museum', creator: 'George Dawe' },
    license: { id: 'public-domain' }
  },
  born: {
    alts: [
      {
        value: { d: '1782-05-19' },
        cites: [
          {
            source: 'loc-name-authority-ivan-paskevich',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1856-02-13' },
        cites: [
          {
            source: 'loc-name-authority-ivan-paskevich',
            loc: { section: 'MARC field 046: death date' }
          }
        ]
      }
    ]
  }
})
