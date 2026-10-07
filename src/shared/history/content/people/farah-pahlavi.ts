import { definePerson } from '../../schema'

export default definePerson({
  id: 'farah-pahlavi',
  names: [
    { text: 'Farah Pahlavi', lang: 'en', role: 'primary' },
    {
      text: 'Farah Diba Pahlavi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '11' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  regions: ['iran'],
  roles: ['monarch'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/FPMHPmariage.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:FPMHPmariage.jpg',
    credit: {
      institution: 'Reproduced in Catherine and Jacques Legrand, Shah-i Iran (Creative Publishing International, Minnetonka MN, 1999 Farsi ed.), p.87'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The shah had remarried in 1959, and the new queen, Farah Diba Pahlavi, had given birth to a male heir, Reza, in 1960.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    }
  ]
})
