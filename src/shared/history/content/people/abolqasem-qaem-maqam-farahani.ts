import { definePerson } from '../../schema'

export default definePerson({
  id: 'abolqasem-qaem-maqam-farahani',
  names: [
    { text: 'Mirza Abolqasem Qaem-Maqam Farahani', lang: 'en', role: 'primary' },
    { text: 'میرزا ابوالقاسم قائم‌مقام فراهانی', lang: 'fa', role: 'native' },
    {
      text: 'Qāʾem-maqām II',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '8'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1835-06-26' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'writer'],
  offices: [
    {
      title: 'premier of Mohammad Shah',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1834-11' },
            cites: [
              {
                source: 'iranica-amanat-aqasi',
                loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1835-06-26' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
        },
        { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '4' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'The last two decades of the shah’s reign witnessed the death of Mīrzā Safīʿ Māzandarānī, the influential grand vizier(d.1234/1818-19); Mīrzā Bozorg Farāhānī the Qāʾem-maqām, minister to ʿAbbās Mīrzā in Azarbaijan and perhaps the most capable statesman of the Fatḥ-ʿAlī Shah period (d. 1237/1821); Hājī Moḥammad-Ḥosayn Eṣfahānī Amīn-al-Dawla, the astute state accountant and, later, the grand vizier (d. 1239/1823), soon to be followed by the death of Mīrzā ʿAbd-al-Wahhāb Moʿtamad-al-Dawla Našāṭ in 1244/1828, depriving the shah of a close circle of trusted advisors. They were replaced by a younger generation of ministers, of whom Mīrzā Abu’l-Qāsem Qāʾem-maqām and Mīrzā ʿAbd-Allāh Amīn-al-Dawla Eṣfahānī (qq.v.) were the most prominent.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q2',
          text: 'During the siege of Herat (1832-33), Moḥammad Mirzā had been under the control of Abu’l-Qāsem Qāʾem-maqām, whose influence over the affairs of Khorasan were paramount.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q3',
          text: 'Upon Moḥammad Shah’s accession, Mirzā Abu’l-Qāsem Qāʾem-maqām assumed the premiership.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q4',
          text: 'He was the driving spirit behind eliminating claimants, consolidating the throne, and reorganizing the administration.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
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
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'The literary movement led by such figures as Fatḥ-ʿAlī Khan Ṣabā, ʿAbd-al-Wahhāb Moʿtamed-al-Dawla Našāṭ, ʿAbd-al-Razzāq Donbolī (Maftūn), Mīrzā Moḥammad Fāẓel Khan Garrūsī, Mīrzā Ṣādeq Waqāyeʿnegār Marvazī, Fażl-Allāh Ḵāvarī, and later Mīrzā Abu’l-Qāsem Qāʾem-maqām Farāhānī constituted the Royal Society (Anjoman-e Ḵāqān)',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Upon Moḥammad Shah’s accession in Rabīʿa I, 1250/November, 1834, which he regarded as the realization of his tutor’s prognostications, Qāʾem-maqām assumed premiership, and this in effect guaranteed the consolidation of the throne through a troubled period of transition and in the face of fierce competition. However, less than a year later, Moḥammad Shah, lured by the anti-Qāʾem-maqām coalition led by Āqāsī, felt confident enough to eliminate the highly independent vizier (Ṣafar, 1251/June, 1835) and shortly after appoint in his place his own confidant and spiritual guide.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Mirza_Abolghassem_Ghaem%2C_maghain_persan._by_Yahya_Daulatabadi%2C_Bruxelles_1934_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Abolghassem_Ghaem,_maghain_persan._by_Yahya_Daulatabadi,_Bruxelles_1934_(cropped).jpg',
    credit: { institution: 'Postcard published by Yahya Dowlatabadi, Brussels 1934' },
    license: { id: 'public-domain' }
  }
})
