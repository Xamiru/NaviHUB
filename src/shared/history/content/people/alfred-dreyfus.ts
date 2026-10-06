import { definePerson } from '../../schema'

export default definePerson({
  id: 'alfred-dreyfus',
  names: [
    { text: 'Alfred Dreyfus', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['europe'],
  roles: ['military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Der französische Hauptmann Alfred Dreyfus wird von einem Kriegsgericht wegen angeblicher Spionage für Deutschland zu lebenslanger Verbannung auf die Teufelsinsel verurteilt.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '62' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1894.html'
          }
        },
        {
          id: 'q2',
          text: 'Erst 1906 wird Dreyfus vollständig rehabilitiert.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '62' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1894.html'
          }
        }
      ]
    }
  ]
})
