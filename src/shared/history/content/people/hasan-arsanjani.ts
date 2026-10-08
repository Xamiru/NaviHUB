import { definePerson } from '../../schema'

export default definePerson({
  id: 'hasan-arsanjani',
  names: [
    { text: 'Hasan Arsanjani', lang: 'en', role: 'primary' },
    { text: 'حسن ارسنجانی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  regions: ['iran'],
  roles: ['politician', 'journalist'],
  offices: [
    {
      title: 'minister of agriculture',
      polity: 'polity:pahlavi-iran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1961-62' }
        },
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mpaminiarsanjani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mpaminiarsanjani.jpg',
    credit: {
      institution: 'Reproduced in Catherine and Jacques Legrand, Shah-i Iran (Creative Publishing International, Minnetonka MN, 1999 Farsi ed.), p.90'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ḥasan Arsanjāni, former journalist, radical, and minister of agriculture in ʿAli Amini’s Cabinet begins a program of land reform to distribute agricutural lands among the cultivating peasantry; the program exceeds the moderate land reforms envisioned by the Shah and the Kennedy administration.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1961-62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ]
})
