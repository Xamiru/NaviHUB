import { definePerson } from '../../schema'

export default definePerson({
  id: 'sobh-e-azal',
  names: [
    { text: 'Sobh-e Azal', lang: 'en', role: 'primary' },
    { text: 'صبح ازل', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā Yaḥyā Nūrī Ṣobḥ-e Azal',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1830', approx: true },
        cites: [
          {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1912-04-29' },
        cites: [
          {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '4' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:famagusta',
    cites: [
      { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['cleric', 'writer'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'AZALI BABISM, designation of a religious faction which takes its name from Mīrzā Yaḥyā Nūrī Ṣobḥ-e Azal (about 1246-1330/1830-1912), considered by his followers to have been the legitimate successor to the Bāb.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'A son of Mīrzā Bozorg Nūrī, a court official in the reign of Fatḥ-ʿAlī Shah, Yaḥyā was converted to Babism around 1260/1844, probably by his older half-brother, Mīrzā Ḥosayn-ʿAlī, the future Bahāʾallāh, founder of the Bahaʾi religion.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'After the Bāb’s death in 1266/1850, Ṣobḥ-e Azal came to be regarded as the central authority within the movement, to whom its followers looked for some form of continuing revelation.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        },
        {
          id: 'q4',
          text: 'Following the attempt by several Babis on the life of Nāṣer-al-dīn Shah in 1852 and an abortive uprising organized by Azal in the same year, he and other Babis chose to go into exile in Baghdad. Here he lived as generally-acknowledged head of the community until their removal to Istanbul in 1863.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'Ṣobḥ-e Azal, like his brother, was a prolific writer, his works consisting primarily of interpretations and elaborations of existing Babi doctrine, together with very large quantities of devotional pieces and poems.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Subh-i-Azal_Browne_Materials.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Subh-i-Azal_Browne_Materials.jpg',
    credit: { creator: 'Edward Granville Browne' },
    license: { id: 'public-domain' }
  }
})
