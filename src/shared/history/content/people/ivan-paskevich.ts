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
  researched: '2026-10-06',
  regions: ['russia-central-asia', 'iran'],
  roles: ['military'],
  sections: [
    {
      kind: 'career',
      quotes: [
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
        },
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
  }
})
