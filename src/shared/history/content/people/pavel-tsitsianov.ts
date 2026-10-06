import { definePerson } from '../../schema'

export default definePerson({
  id: 'pavel-tsitsianov',
  names: [
    { text: 'Pavel Tsitsianov', lang: 'en', role: 'primary' },
    {
      text: 'Ešpoḵtor',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '16'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['russia-central-asia', 'iran'],
  roles: ['military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1803, Alexander put Prince Pavel Dmitrievich Tsitsianov (in Pers. Ešpoḵtor/Ešpoḵdor, Sisiānof) in charge of Caucasian affairs, an appointment leading to the outbreak of the first war with Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'He never seemed to be willing to moderate his intolerably harsh demands on the local rulers and always opposed attempts at any peaceful settlement with Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '16'
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
  ]
})
