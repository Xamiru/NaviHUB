import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1953-iranian-coup-role-of-the-clergy',
  about: ['event:1953-iranian-coup', 'person:abol-ghasem-kashani'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'Sources on Kāšāni can be broadly divided into two different periods: pre-Revolution and post-Revolution. Sources in the former period appear to be less exaggerated and more reliable, including the interview with him by Ḵosrowšāhi and writings on him in biographies of the ʿolamā and other documents, such as proceedings of the Majles or his own speeches. Certain studies published on Kāšāni during the post-Revolution period portray a laudatory and adulatory image of him and should be cautiously examined against reliable pre-Revolution sources and documents.',
    lang: 'en',
    cite: {
      source: 'iranica-rahnema-kashani',
      loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '74' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-07',
      url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
    }
  },
  positions: [
    {
      id: 'clerical-support-for-the-coup',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ali Rahnema' },
        { kind: 'scholar', name: 'Mark J. Gasiorowski' },
        { kind: 'scholar', name: 'Farhad Kazemi' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Kāšāni supports Zāhedi and the coup. From late April 1953, Kāšāni’s name was associated with attempts at destabilizing Moṣaddeq’s government.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '64' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q3',
          text: 'On the morning of 19 August a crowd wielding clubs, apparently hired by Kāšānī and Sayyed Moḥammad Behbahānī and paid by the C.I.A., began to gather at Meydān-e Amīn-al-Solṭān in southern Tehran (Najātī, pp. 404, 407, 410).',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q4',
          text: 'The clashes of Fedāʾīān with the National Front government, increasing animosity between Moṣaddeq and Kāšānī, and the ʿolamāʾ’s general support of the coup d’état of 1953 prompted the Fedāʾīān to remain inactive during the coup and toward the government of General Fażl-Allāh Zāhedī.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        }
      ]
    },
    {
      id: 'kashani-role-unproven',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mark J. Gasiorowski' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In the midst of organizing crowds following the failure of the first coup attempt on 16 August 1953, Asad-Allāh Rašidiān, a main MI6 operative, suggested that the CIA team “seek help from Ayatollah Kashani and said he could be contacted through their ally Ahmad Aramesh. In the early morning of August 19, two CIA officers therefore went to Aramesh’s home and gave him ten thousand dollars to give to Kashani to organize demonstrations. It is not clear whether Kashani [or his son Mostafa] received this money and, if so, whether he used it for this purpose” (Gasiorowski, p. 254).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '67' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q6',
          text: 'Moṣaddeq received detailed information about it from Moḥammad-Ḥosayn Āštīānī, from the Tudeh party, and, according to some reports, even from Kāšānī, though the latter report seems doubtful',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        }
      ]
    },
    {
      id: 'clergy-sidelined-by-the-coup',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'On August 19, 1953, a group of agitators and domestic agents of the enemy created chaos and caused a commotion in the country. As a result, the clergy was sidelined, the public was disheartened and the way was paved for the tyrannical dictatorship of Mohammad Reza [Pahlavi] and U.S. domination of this country.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-the-unforgettable-coup-detat',
            loc: { section: 'The unforgettable coup d’état', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/6978/The-unforgettable-coup-d-%C3%A9tat'
          }
        }
      ]
    },
    {
      id: 'clerics-among-the-shahs-coalition',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Ray Takeyh' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'The shah, meanwhile, retained the loyalty of many Iranian army officers, merchants, and mullahs who preferred an ineffectual monarch to a reckless prime minister.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'Some revisionist accounts of the coup seek to distance the U.S. from the coup and its aftermath as a way of whitewashing the U.S. foreign policy record, and others seek to “weaponize” the memory of Mossadegh against the current Iranian government by emphasizing the involvement of some clerics in the coup.',
          lang: 'en',
          cite: {
            source: 'responsible-statecraft-2021-larison-revisionists-1953-coup',
            loc: {
              section: 'Revisionists want to downplay U.S. role in 1953 Iran coup',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://responsiblestatecraft.org/2021/07/02/revisionists-want-to-downplay-u-s-role-in-1953-iran-coup-dont-listen/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
