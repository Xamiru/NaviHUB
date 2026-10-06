import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'abbas-mirza-military-reforms',
  names: [
    { text: 'Abbas Mirza’s military reforms', lang: 'en', role: 'primary' },
    {
      text: 'neẓām-e jadid',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '8' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1804' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    { ref: 'place:tabriz' }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'leader',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '10' }
        },
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-persian-war-1804-1813',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '10' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'The confrontation with the Russians, whose armies had modern equipment and were organized on modern principles, rendered urgent a reform of the Persian army.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q2',
          text: 'Russia’s military successes had forced ʿAbbās Mirzā to the conclusion that Iran could only defend its territory against a European enemy, recover possessions already lost and maintain greater internal security by imitating European military organization.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Even then he realized that the Persian army was no match for Russian tactics and weapons, and he began to train his troops along European lines (neẓām-e ǰadīd).',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q4',
          text: 'ʿAbbās Mirzā, consciously modelling himself on his contemporary, the reform-oriented Ottoman sultan Selim III (r. 1789-1809), began in Azarbaijan with the construction of his own version of the reformed Ottoman army (neẓām-e jadid).He imported first French, then British instructors, sent students abroad, tried to form disciplined infantry and artillery and introduced a regularized, though rudimentary, system of conscription (boniča-ye sarbāz), and established foundries to produce arms.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        },
        {
          id: 'q5',
          text: 'From 1807, French instructors were also engaged in Tabrīz; but, after the break with France, British officers formed the majority in the training program.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'ʿAbbās Mirzā’s initiative was the first of the attempts, which peppered 19th and early 20th century Iran, to set up a standing army on the European model with the help of missions of foreign officers',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    }
  ]
})
