import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'persian-coup-of-1921-british-role',
  about: ['event:persian-coup-of-1921'],
  topic: 'foreign-role',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'The role played by each individual in the planning phase of the coup remains uncertain.',
    lang: 'en',
    cite: {
      source: 'iranica-shambayati-coup-detat-of-1921',
      loc: { section: 'COUP D’ETAT OF 1299/1921', para: '7' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
    }
  },
  positions: [
    {
      id: 'widely-believed-british-plot',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'Contemporary observers in Persia' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The coup was widely believed to be a British attempt to enforce at least the spirit of the Anglo-Persian agreement',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q3',
          text: 'The Cossacks themselves boasted of having received money and support from the British',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q4',
          text: 'Reżā Khan came to power on 21 February 1921 through a coup, which was widely believed to have been engineered and assisted by the British.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kazal-khan/'
          }
        }
      ]
    },
    {
      id: 'british-deceived',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Sayyed Żīāʾ-al-Dīn Ṭabāṭabāʾī',
          ref: 'person:seyyed-zia-al-din-tabatabai'
        }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Contrary to Żīāʾ-al-Dīn’s assertion that the British had been deceived about the real purpose of the trans­fer of the Cossacks (Wilber, pp. 41-42; Sabahi, p. 120), British military personnel do appear to have been involved in the coup.',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Indeed, none of the accounts in which British involvement in the coup is denied can be substantiated',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        }
      ]
    },
    {
      id: 'british-military-not-foreign-office',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Niloofar Shambayati' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Ironside had probably encouraged the move, without having been involved in the details of the plan.',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q8',
          text: 'Judging from the comments of Foreign Office officials, however, British involvement was apparently not directed from the Foreign Office',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q9',
          text: 'It is likely, however, that the British government of India had encouraged the coup and the formation of a moderate nationalist government in Tehran, the more likely as it was in accord with the Indian government’s previously pronounced views',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        }
      ]
    },
    {
      id: 'personal-encouragement-only',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ronald W. Ferrier' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'The extent of British complicity in the coup d’état of Sayyed Żīāʾ-al-dīn Ṭabāṭabāʾī and of Reżā Khan is a moot issue.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        },
        {
          id: 'q11',
          text: 'Evidence now available, however, casts some doubts on any official British diplomatic, support but shows personal encouragement by some members of the British military mission, including its chief, Major-General Ironside, for the Iranian army to rally round Colonel Reżā Khan of the Cossack Brigade and for him to keep order in an unstable situation.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    },
    {
      id: 'british-consent-and-major-role',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' },
        { kind: 'scholar', name: 'Ahmad Ashraf' }
      ],
      statements: [
        {
          id: 'q12',
          text: 'Reżā Khan’s military coup in February 1921, with British diplomatic and military consent, was to inaugurate a new phase in Anglo-Persian relations, as well as finally subduing various insurgency movements throughout of the country.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '61' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain/great-britain-iii/'
          }
        },
        {
          id: 'q13',
          text: 'Although Reżā Khan had actually attempted a coup with German aid as early as 1335/1917 (Kaḥḥālzāda, pp. 299-308), the British did play a major role in the coup d’etat of 3 Esfand 1299 Š./22 February 1921, which brought him to power',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'everything-british-controlled',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Conspiracy theorists in Persia' }
      ],
      statements: [
        {
          id: 'q14',
          text: 'For example, General Edward Ironside, commanding the British forces against the Bolshevik army in northwestern Persia, presumably selected Reżā Khan to carry out the coup because he was an “illiterate, crude soldier”',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ],
      reception: [
        {
          id: 'q15',
          text: 'This undisputed fact lies at the center of a mythology in which every event and every action by Reżā Khan (later Reżā Shah) is believed to have been controlled by the British.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    }
  ]
})
