import { definePerson } from '../../schema'

export default definePerson({
  id: 'mir-damad',
  names: [
    { text: 'Mir Damad', lang: 'en', role: 'primary' },
    { text: 'میرداماد', lang: 'fa', role: 'native', translit: 'Mīr Dāmād' },
    {
      text: 'Mīr Dāmād',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-newman-damad-mir',
          loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  died: {
    alts: [
      {
        value: { d: '1631' },
        cites: [
          {
            source: 'iranica-newman-damad-mir',
            loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'scholar'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Head_Statue_of_Mir_Damad%E2%80%93%D8%B3%D8%B1%D8%AF%DB%8C%D8%B3_%D9%85%DB%8C%D8%B1%D8%AF%D8%A7%D9%85%D8%A7%D8%AF.png',
    page: 'https://commons.wikimedia.org/wiki/File:Head_Statue_of_Mir_Damad%E2%80%93%D8%B3%D8%B1%D8%AF%DB%8C%D8%B3_%D9%85%DB%8C%D8%B1%D8%AF%D8%A7%D9%85%D8%A7%D8%AF.png',
    credit: { creator: 'Mhsheikholeslami' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Mīr Dāmād’s own students included Ṣadr-al-Dīn Šīrāzī, known as Mollā Ṣadrā (d. 1050/1640); Sayyed Ḥosayn b. Ḥaydar Karakī ʿĀmelī (fl. ca. 1029/1620); Sayyed Aḥmad ʿAlawī ʿĀmelī, who married his daughter; Ḵalīl b. Ḡāzī Qazvīnī (d. 1088/1677); Mollā Šamsā Šams-al-Dīn Moḥammad Gīlānī (d. 1098/1687); Qoṭb-al-Dīn Aškevarī; and the poet Moḥammad-Ḥasan Zolālī Ḵᵛānsārī (d. 1024/1615).',
          lang: 'en',
          cite: {
            source: 'iranica-newman-damad-mir',
            loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/damad-mir-e-sayyed-mohammad-baqer-b'
          }
        },
        {
          id: 'q2',
          text: 'He inherited the title Dāmād (son-in-law) from his father, who had married the daughter of the famous Shiʿite theologian Shaikh ʿAlī b. Ḥosayn Karakī, known as Moḥaqqeq-e Ṯānī (d. 940/1534).',
          lang: 'en',
          cite: {
            source: 'iranica-newman-damad-mir',
            loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/damad-mir-e-sayyed-mohammad-baqer-b'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In 983/1575 he received an ejāza (license, diploma) from Shaikh Ḥosayn b. ʿAbd-al-Ṣamad ʿĀmelī (d. 984/1576), the father of Shaikh Bahāʾ-al-Dīn Moḥammad ʿĀmelī',
          lang: 'en',
          cite: {
            source: 'iranica-newman-damad-mir',
            loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/damad-mir-e-sayyed-mohammad-baqer-b'
          }
        },
        {
          id: 'q4',
          text: 'Mīr Dāmād led the Friday prayer service in Isfahan after the enthronement of Shah Ṣafī',
          lang: 'en',
          cite: {
            source: 'iranica-newman-damad-mir',
            loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/damad-mir-e-sayyed-mohammad-baqer-b'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q5',
          text: 'Like another member of the “school of Isfahan,” Shaikh Bahāʾī, Mīr Dāmād favored the rationalist jurisprudence of the Oṣūlīs, who upheld the authority of the faqīh as the deputy in practical matters for the Imam during the occultation.',
          lang: 'en',
          cite: {
            source: 'iranica-newman-damad-mir',
            loc: { section: 'DĀMĀD, MĪR(-E), SAYYED MOḤAMMAD BĀQER', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/damad-mir-e-sayyed-mohammad-baqer-b'
          }
        }
      ]
    }
  ]
})
