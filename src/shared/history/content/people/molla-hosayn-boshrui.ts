import { definePerson } from '../../schema'

export default definePerson({
  id: 'molla-hosayn-boshrui',
  names: [
    { text: 'Mulla Husayn Boshrui', lang: 'en', role: 'primary' },
    { text: 'ملا حسین بشرویه‌ای', lang: 'fa', role: 'native' },
    { text: 'Mollā Moḥammad-Ḥosayn Bošrūʾī', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1814' },
        cites: [
          {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1849-02-02' },
        cites: [
          {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BOŠRŪʾĪ (Bošrūyaʾī), MOLLĀ MOḤAMMAD­-ḤOSAYN (1229-65/1814-49), Shaikhi ʿālem who became the first convert to Babism, provincial Babi leader in Khorasan, and organizer of Babi resistance in Māzandarān.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Born in Bošrūya, Khorasan, the son of a local merchant, he studied from an early age in Mašhad, where he appears to have become a Shaikhi.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Bošrūʾī accepted these claims, probably after several weeks, in virtue of which he was later named bāb al-bāb (gate of the gate), awwal man āmana (first to believe) and “return of Moḥammad.”',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        },
        {
          id: 'q4',
          text: 'When, in July, 1844, the first followers of the Bāb left Shiraz in several directions to spread word of the imam’s imminent appearance, Bošrūʾī headed for Tehran, where he delivered letters from the Bāb for Moḥammad Shah and Ḥājī Mīrzā Āqāsī.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        },
        {
          id: 'q5',
          text: 'His activities in Mašhad eventually led to trouble with the local authorities, and in July, 1848, he was ordered to leave the city.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'The struggle, which was led by Bošrūʾī until his death in the course of a sortie on 9 Rabīʿ I 1265/2 February 1849, ended with the surrender of the Babi survivors in May, 1849.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-boshrui',
            loc: { section: 'BOŠRŪʾĪ, MOLLĀ MOḤAMMAD-ḤOSAYN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bosrui-molla-mohammad-hosayn'
          }
        }
      ]
    }
  ]
})
