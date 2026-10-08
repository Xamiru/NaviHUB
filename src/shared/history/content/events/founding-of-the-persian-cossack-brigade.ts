import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-persian-cossack-brigade',
  names: [
    { text: 'Founding of the Persian Cossack Brigade', lang: 'en', role: 'primary' },
    { text: 'تأسیس بریگاد قزاق', lang: 'fa', role: 'native' },
    {
      text: 'Berīgād-e qazzāq',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1879' },
        cites: [
          {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '1' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '39'
            }
          },
          {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Muriel Atkin' },
          { kind: 'scholar', name: 'Elena Andreeva' },
          { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
        ]
      },
      {
        value: { d: '1878' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1878' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '3' }
        }
      ]
    },
    {
      name: 'A. I. Domantovich',
      role: 'commander',
      cites: [
        {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '4' }
        }
      ]
    },
    {
      name: 'Grand Duke Mikhail Nikolaevich',
      role: 'participant',
      cites: [
        {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '3' }
        }
      ]
    },
    {
      name: 'Adalbert von Schönowsky',
      role: 'participant',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      value: {
        alts: [
          {
            value: { min: 400 },
            cites: [
              {
                source: 'iranica-atkin-cossack-brigade',
                loc: { section: 'COSSACK BRIGADE', para: '5' }
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
          text: 'COSSACK BRIGADE (Berīgād-e qazzāq), a cavalry unit in the Persian army established in 1296/1879 on the model of Cossack units in the Russian army. It began as a regiment but within a few months was expanded to a brigade composed of two regiments; it was expanded still further during World War I and, as a consequence, in 1334/1916 was redesignated a division.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'On his second journey to Europe, in 1295/1878, Nāṣer-al-Dīn Shah (1264­-1313/1848-96) had been favorably impressed by the uniforms, equipment, and precision drills of the Russian Cossacks who had escorted him across Transcaucasia. He therefore asked the viceroy of the Caucasus, Grand Duke Mikhail Nikolaevich, to send Russian officers to train a Cossack-style cavalry in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        },
        {
          id: 'q3',
          text: 'During his second European journey in 1878 the shah asked the Habsburg emperor and the Russian tsar for the loan of instructors.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The man selected to organize the Persian Cossack unit was Lieutenant-Colonel A. I. Domantovich, a general staff officer who happened to be in Trans­caucasia, having just returned from service in the Russo-Ottoman war of 1878-79. He arrived in Persia knowing little more about the country than some sto­ries of its ancient past and the murder of Ambassador A. S. Griboyedov during the siege of the Russian embassy in 1244/1829.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        },
        {
          id: 'q5',
          text: 'Initially it consisted of 400 men.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        },
        {
          id: 'q6',
          text: 'All of the first group of Cossacks were drawn from a special unit of the traditional cavalry, comprised of mohājers (immigrants), i.e., descendants of Muslims who had immigrated from Transcaucasia during the Russian conquest.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1879-01' },
            cites: [
              {
                source: 'iranica-cronin-army-qajar',
                loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In January 1879 the second Austrian mission, headed by Adalbert von Schönowsky (1826-91), duly arrived in Tehran. The Habsburg Empire also supplied some Euchatius guns, several thousands of Werndl rifles and a great quantity of ammunition.Very soon after the arrival of the Austrians the first Russian mission came to Iran under A. I. Domantovich and began the organization of an Iranian Cossack Brigade.',
        lang: 'en',
        cite: {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/army-v/' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-04' },
            cites: [
              {
                source: 'iranica-atkin-cossack-brigade',
                loc: { section: 'COSSACK BRIGADE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Domantovich and a handful of other Russian commis­sioned and noncommissioned officers began to orga­nize and train the Cossack regiment in April 1879; the shah was so pleased with the results that in the summer he decided to expand the regiment to a brigade.',
        lang: 'en',
        cite: {
          source: 'iranica-atkin-cossack-brigade',
          loc: { section: 'COSSACK BRIGADE', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/cossack-brigade'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Brooklyn_Museum_-_Persian_Cossacks_One_of_274_Vintage_Photographs.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Persian_Cossacks_One_of_274_Vintage_Photographs.jpg',
    credit: { institution: 'Brooklyn Museum' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'sheikholeslami-1991-elal-e-afzayesh-e-nofuz', perspective: 'iranian' }
  ]
})
