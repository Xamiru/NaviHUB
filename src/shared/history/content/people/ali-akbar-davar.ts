import { definePerson } from '../../schema'

export default definePerson({
  id: 'ali-akbar-davar',
  names: [
    { text: 'Ali-Akbar Davar', lang: 'en', role: 'primary' },
    { text: 'علی‌اکبر داور', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1885' },
        cites: [
          { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1937-02-10' },
        cites: [
          { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '1' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '1' } }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '1' } }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'journalist'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'journalist, politician, statesman, and founder of the modern Persian judicial system, as well as of several state enterprises in the time of Reżā Shah',
          lang: 'en',
          cite: { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/davar-ali-akbar/'
          }
        },
        {
          id: 'q2',
          text: 'The energetic and dedicated ʿAli-Akbar Dāvar (q.v.), who was put in charge of the juridical reform, presented to the Majles a number of successive bills embodying new civil and penal codes modeled mostly on the French system, but also systematizing and harmonizing the šariʿa in matters of personal law.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Reza Shah jailed and then quietly executed Abdul-Hosain Teimurtash, his minister of court and close confidant; Davar committed suicide.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Davar_49.jpg/1280px-Davar_49.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Davar_49.jpg',
    credit: { institution: 'Bagher Agheli, Davar va Adliyeh (Tehran, 1990)' },
    license: { id: 'public-domain' }
  }
})
