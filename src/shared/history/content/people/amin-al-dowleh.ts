import { definePerson } from '../../schema'

export default definePerson({
  id: 'amin-al-dowleh',
  names: [
    { text: 'Amin al-Dowleh', lang: 'en', role: 'primary' },
    { text: 'میرزا علی‌خان امین‌الدوله', lang: 'fa', role: 'native' },
    {
      text: 'Mirzā ʿAli Khan Amin-al-Dawla',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1897' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1844' },
        cites: [
          {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1904' },
        cites: [
          {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'wazīr-e aʿẓam or prime minister',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1897-03' },
            cites: [
              {
                source: 'iranica-farmayan-amin-al-dawla',
                loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '4' }
              },
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '14' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1898-06' },
            cites: [
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-farmayan-amin-al-dawla',
          loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '4' }
        },
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '14' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN (1260-1322/1844-1904), high ranking official in the service of the Qajar king Nāṣer-al-dīn Shah (r. 1264-1313/1848-96) and grand vizier under Moẓaffar-al-dīn Shah (r. 1313-24/1896-1907).',
          lang: 'en',
          cite: {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-mirza-ali-khan'
          }
        },
        {
          id: 'q2',
          text: 'He was known as one of the few europeanized Iranians of his day, a reputation which was based more on his outward behavior and his westernized style of life than on his writings or political ideas.',
          lang: 'en',
          cite: {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-mirza-ali-khan'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Intrigues gradually blossomed, and Amīn-al-dawla, who had resigned from his post in Azarbaijan and was already in Tehran, was made wazīr-e aʿẓam or prime minister in Šawwāl, 1314/March, 1897; yet he was not able to function as such as long as Farmānfarmā, who wielded great influence, remained in office. Farmānfarmā’s exercise of authority had caused the resignation of the respectable minister of interior ʿAlī-qolī Khan Moḵber-al-dawla, and it was generally expected that Amīn-al-dawla would immediately seek the dismissal of Farmānfarmā. But he chose not to do so until Rabīʿ I, 1315/September, 1897 when he persuaded the shah to dismiss him and eventually to send him away to Fārs (Afżal-al-molk, Afżal al-tawārīḵ, pp. 142-46; F. Kazemzadeh, Russia and Britain, pp. 302-06). From a political viewpoint, Amīn-al-dawla now stood without challenger. He had the shah’s full confidence and was in a position to bring the entire machinery of the government under his own control. But he confesses that he “. . . moved about with reluctance, as if he was not responsible for the affairs of government . . .” (Ḵāṭerāt-e sīāsī, p. 234; cf. Afżal-al-molk, Afżal al-tawārīḵ, p. 145; Curzon, Persia I, p. 428). He had asserted that Iran’s most necessary reform was reorganization of the financial systems and the introduction of modern education, and Moẓaffar-al-dīn Shah supported his projects.',
          lang: 'en',
          cite: {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-mirza-ali-khan'
          }
        },
        {
          id: 'q4',
          text: 'He undertook a range of reforms (finances, revenue system, customs, currency, public education), set up a gendarmerie and consultative committees on reforms.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q5',
          text: 'His failure to obtain a foreign loan, even from his British supporters, was decisive in his dismissal (Moḥarram, 1316/mid-June, 1898; see Bakhash, pp. 19ff.; Algar, Religion and State, p. 225; Amīrī, pp. 345ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'A man of letters, Amin-al-dawla knew the French language and, unlike many of his contemporaries, was acquainted with the state of affairs outside Iran. He has been praised for his honesty and unpretentious, polished manners, while his inertia, irresoluteness, and relative lack of effectiveness in carrying out his administrative plans have been criticized.',
          lang: 'en',
          cite: {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-mirza-ali-khan'
          }
        },
        {
          id: 'q7',
          text: 'But his most lasting reformist effort was his patronage of modern education (Maḥbūbī, Tārīḵ-e moʾassasāt I, pp. 369f., 375f.).',
          lang: 'en',
          cite: {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amin-al-dawla-mirza-ali-khan'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/19_phot._de_Perse_par_E._Pirou%2C_principalement_des_portraits_-_Mirza_Ali_Khan_Amin_od-Dowleh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:19_phot._de_Perse_par_E._Pirou,_principalement_des_portraits_-_Mirza_Ali_Khan_Amin_od-Dowleh.jpg',
    credit: { creator: 'Eugène Pirou' },
    license: { id: 'public-domain' }
  }
})
