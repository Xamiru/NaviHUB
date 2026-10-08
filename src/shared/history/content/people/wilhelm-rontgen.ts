import { definePerson } from '../../schema'

export default definePerson({
  id: 'wilhelm-rontgen',
  names: [
    { text: 'Wilhelm Conrad Röntgen', lang: 'en', role: 'primary' },
    { text: 'Wilhelm Conrad Röntgen', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1845-03-27' },
        cites: [
          {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1923-02-10' },
        cites: [
          {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '49' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['scientist'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: '1. Oktober: Berufung auf das Ordinariat in Würzburg.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q2',
          text: '10. Dezember: Verleihung des Nobelpreises für Physik an Röntgen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        },
        {
          id: 'q3',
          text: 'Die Einladung zu einem Nobelvortrag lehnt der öffentlichkeitsscheue Wissenschaftler ebenso ab wie die Patentierung seiner Entdeckung.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: '10. Februar: Wilhelm Conrad Röntgen stirbt in München.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-wilhelm-conrad-roentgen',
            loc: { section: 'Wilhelm Conrad Röntgen 1845-1923', para: '49' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/wilhelm-conrad-roentgen'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/R%C3%B6ntgen%2C_Wilhelm_Conrad_%281845-1923%29.jpg/1280px-R%C3%B6ntgen%2C_Wilhelm_Conrad_%281845-1923%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:R%C3%B6ntgen,_Wilhelm_Conrad_(1845-1923).jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
