import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-agreement-of-1919',
  names: [
    { text: 'Anglo-Persian Agreement of 1919', lang: 'en', role: 'primary' },
    { text: 'قرارداد ۱۹۱۹', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1919-08-09' },
        cites: [
          {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '5' }
          },
          {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '58' }
          },
          {
            source: 'iranica-safiri-south-persia-rifles',
            loc: { section: 'SOUTH PERSIA RIFLES', para: '31' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1921' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '9' }
          },
          {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '59' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-mamedova-russia-ii',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-ahmad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:vosuq-al-dowleh',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-fatemi-anglo-persian-agreement-1919',
          loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '16' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1919' }
        }
      ]
    },
    {
      name: 'Lord Curzon',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1919' }
        },
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '58' }
        }
      ]
    },
    {
      name: 'Sir Percy Cox',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-fatemi-anglo-persian-agreement-1919',
          loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '13' }
        }
      ]
    },
    {
      name: 'Fīrūz Mīrzā Noṣrat-al-dawla',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-fatemi-anglo-persian-agreement-1919',
          loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '16' }
        }
      ]
    },
    {
      name: 'Akbar Mīrzā Ṣārem-al-dawla',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-fatemi-anglo-persian-agreement-1919',
          loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '16' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iran-in-the-first-world-war', rel: 'preceded-by' },
    { ref: 'event:anglo-russian-convention-of-1907', rel: 'related' },
    { ref: 'event:paris-peace-conference', rel: 'related' },
    {
      ref: 'event:jangali-movement',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '63' }
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
          text: 'ANGLO-PERSIAN AGREEMENT OF 1919, provisional agreement made between the British and the Persian governments which, if ratified, would have granted the British a paramount position of control over the financial and military affairs of Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        },
        {
          id: 'q2',
          text: '1919 Ḥasan Woṯuq-al-Dawla signs an agreement with Lord Curzon, known as the Anglo-Persian Agreement, which provides for the reorganization of the Persian army and finances under the British; it is widely opposed in Persia by the nationalists, with the Majles refusing to convene to ratify it.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1919' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Bolshevik government of Lenin went even farther in disclaiming any design upon Persia and in February, 1918, Trotsky stated officially that so far as revolutionary Russia was concerned, all treaties and concessions imposed upon Persia were null and void',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        },
        {
          id: 'q4',
          text: 'With the termination of the war in November 1918, Tehran looked to the US for assurances that Persian sovereignty would be honored during the peace talks in Paris, from which London excluded Persian delegates.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q5',
          text: '1919 The Persian government sends a delegation to the Paris Peace Conference demanding the repeal of the 1907 Agreement between Britain and Russia that led to Persia’s division into spheres of influence. The British successfully prevent the recognition of the Persian delegation at the Conference.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1919' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'It took six months of secret negotiations for the preparation of the Agreement which was announced on 9 August 1919.',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        },
        {
          id: 'q7',
          text: 'According to the Iranian Constitution (article XIV), no agreement was binding, and operative unless confirmed by the Parliament, but both the British and the Persian governments immediately proceeded as if the agreement had been in fact approved by the Parliament and were operative.',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        },
        {
          id: 'q8',
          text: 'Three days after the agreement was signed, the shah left for an official visit to England.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'Finally what destroyed the agreement was the allegation that Prime Minister Woṯūq-al-dawla, the Minister of Finance Akbar Mīrzā Ṣārem-al-dawla, and the Minister of Foreign Affairs Fīrūz Mīrzā Noṣrat-al-dawla, collectively referred to in the British sources as “The Triumvirate,” had received a sum of β131,000 to secure the ratification of the Agreement by the Majlis.',
          lang: 'en',
          cite: {
            source: 'iranica-fatemi-anglo-persian-agreement-1919',
            loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-agreement-1919'
          }
        },
        {
          id: 'q10',
          text: 'In 1921, the fourth Majles would firmly refuse to sanction the Agreement, thwarting absolute British imperial rule in Persia (Katouzian, passim; Fatemi, pp. 10-120; Ghani, pp. 46-80; Bennett, pp. 123-28).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '59' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q11',
          text: 'in late August 1919 the Soviet government announced in its appeal “To the Workers and Peasants of Persia” that it did not recognize the Agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-ii',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Conf%C3%A9rence_de_San_Remo_-_Lord_Curzon_-_btv1b9033690j.jpg/1280px-Conf%C3%A9rence_de_San_Remo_-_Lord_Curzon_-_btv1b9033690j.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Conf%C3%A9rence_de_San_Remo_-_Lord_Curzon_-_btv1b9033690j.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Agence de presse Meurisse' },
    license: { id: 'public-domain' }
  }
})
