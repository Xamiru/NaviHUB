import { definePerson } from '../../schema'

export default definePerson({
  id: 'alfred-dreyfus',
  names: [
    { text: 'Alfred Dreyfus', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  regions: ['europe'],
  roles: ['military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'DREYFUS, ALFRED (1859– ), French soldier, of Jewish parentage, the scandal of whose condemnation for treason and subsequent rehabilitation convulsed French political life between 1894 and 1899, and only ended in 1906, was born in Mülhausen, Upper Alsace, removing to Paris in 1874.',
          lang: 'en',
          cite: { source: 'britannica-1911-dreyfus', loc: { section: 'DREYFUS, ALFRED', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dreyfus,_Alfred'
          }
        },
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
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Alfred_Dreyfus_%281859-1935%29_Restauration.jpg/1280px-Alfred_Dreyfus_%281859-1935%29_Restauration.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alfred_Dreyfus_(1859-1935)_Restauration.jpg',
    credit: { institution: 'Bibliothèque municipale de Reims', creator: 'Aron Gerschel' },
    license: { id: 'public-domain' }
  }
})
