import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'storming-of-ganja-1804',
  names: [
    { text: 'Storming of Ganja (1804)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1804-01' },
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
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 2,
  places: [
    { ref: 'place:ganja' }
  ],
  partOf: [
    { ref: 'event:russo-persian-war-1804-1813' }
  ],
  participants: [
    {
      ref: 'person:pavel-tsitsianov',
      role: 'commander',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '16'
          }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
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
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 1500, max: 3000 },
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
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'When Tsitsianov attacked Ganja in 1803, ʿAbbās Mirzā, the heir apparent to Fatḥ-ʿAli Shah and governor of Azarbaijan, marched to the khan’s aid, but he was too late. In mid-January 1804, Tsitisianov stormed the citadel, massacred between 1,500 and 3,000 inhabitants, made Ganja a district of Georgia and renamed it Elizavetpol in honor of the Emperor’s wife.',
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
          text: 'Referring to the place by its old name became a crime punishable by a fine, the main mosque was turned into a church, and Russian law replaced Islamic law',
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
          id: 'q3',
          text: 'Falling within the battle zone between imperial Russia and Persia, Ganja was stormed in 1804 by a Russian army led by the Georgian Prince Zizishvili, and was definitively ceded to Russia in 1813 under the terms of the Golestān Treaty (q.v.).',
          lang: 'en',
          cite: { source: 'iranica-bosworth-ganja', loc: { section: 'GANJA', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ganja/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/%D0%92%D0%B7%D1%8F%D1%82%D0%B8%D0%B8_%D1%88%D1%82%D1%83%D1%80%D0%BC%D0%BE%D0%BC_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D0%B8_%D0%93%D1%8F%D0%BD%D0%B4%D0%B6%D0%B8_3-%D0%B3%D0%BE_%D1%8F%D0%BD%D0%B2%D0%B0%D1%80%D1%8F_1804_%D0%B3%D0%BE%D0%B4%D0%B0.png',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%92%D0%B7%D1%8F%D1%82%D0%B8%D0%B8_%D1%88%D1%82%D1%83%D1%80%D0%BC%D0%BE%D0%BC_%D0%BA%D1%80%D0%B5%D0%BF%D0%BE%D1%81%D1%82%D0%B8_%D0%93%D1%8F%D0%BD%D0%B4%D0%B6%D0%B8_3-%D0%B3%D0%BE_%D1%8F%D0%BD%D0%B2%D0%B0%D1%80%D1%8F_1804_%D0%B3%D0%BE%D0%B4%D0%B0.png',
    credit: {
      institution: 'Istoriia 13-go Leib-Grenaderskogo Erivanskogo polka',
      creator: 'Adolf Charlemagne'
    },
    license: { id: 'public-domain' }
  }
})
