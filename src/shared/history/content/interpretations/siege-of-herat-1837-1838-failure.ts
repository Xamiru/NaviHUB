import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'siege-of-herat-1837-1838-failure',
  about: ['event:siege-of-herat-1837-1838'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'aqasi-incompetence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The latter’s incompetence to modernize, organize, and lead an army was then fully demonstrated.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      id: 'logistics-and-british-dictation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The premier’s scheme for a partial siege of the city to facilitate the inhabitants’ flight in order to decimate the enemy’s strength, was an unconventional tactic with doubtful merits.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q3',
          text: 'Poor logistics, low morale, long delays, and capacious demands made by the officials, however, furnished the British with the opportunity to dictate their pro-Afghan policy and force upon the Shah a humiliating retreat.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      id: 'british-arrogance',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'To this end their envoys’ capricious behavior, rivalries, and imperial arrogance more than their cannons and gunboats served to humble the embittered Shah and his minister.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q5',
          text: 'On such frivolous pretexts, on 7 June 1838 he declared a break in diplomatic relations with Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    }
  ]
})
