import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-treaties-of-1801',
  names: [
    { text: 'Anglo-Persian treaties of 1801', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1801-01-04' },
        cites: [
          {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Firuz Kazemzadeh' }
        ]
      },
      {
        value: { d: '1801-01-28' },
        cites: [
          {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '11' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mansour Bonakdarian' },
          { kind: 'scholar', name: 'Manoutchehr M. Eskandari-Qajar' }
        ]
      },
      {
        value: { d: '1800' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  participants: [
    {
      ref: 'person:john-malcolm',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
          loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '7' }
        }
      ]
    },
    {
      name: 'Ḥāǰǰī Ebrāhīm Kalāntar Šīrāzī',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
          loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '6' }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '14' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The Afghan menace was made even more formidable in British eyes by Napoleon’s professed interest in driving the English out of India. The French revolutionary general’s Egyptian and Italian campaigns so impressed his contemporaries that even an utterly unrealistic scheme of a French invasion of India was taken seriously.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q2',
          text: 'Malcolm eventually reached Tehran in November 1800, where the Persian court assigned the grand vizier, Ḥāji Mirzā Ebrāhim Kalāntar Širāzi (Eʿtemād-al-Dawla), as Malcolm’s host and negotiator.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        },
        {
          id: 'q3',
          text: 'Malcolm’s proposal for an alliance against the ruler of Kabul, Zamān Shah Dorranī, was welcomed by the shah, who at the time was afraid of Zamān harboring the unruly khans of Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '14' }
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
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The treaty concluded by Captain Malcolm and Ḥāǰǰī Ebrāhīm Šīrāzī (4 January 1801) stipulated that Iran would attack Afghanistan if the Amir invaded India. Moreover, the Shah promised not to admit the French to Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q5',
          text: 'Separate commercial and political treaties were signed on 28 January 1801. The commercial treaty guaranteed the mutual protection of merchants (and their property) from the other party’s territory.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        },
        {
          id: 'q6',
          text: 'Sir John Malcolm, a representative of the East India Company, concludes a commercial and political treaty with Persia according to which Persia is not to make peace with the Afghans unless they renounce all designs on India.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'The vagueness of this clause would become a point of contention between Calcutta and Tehran when, in 1804, Russia and Persia went to war over Georgia, with Britain at the time being on friendly terms with Russia.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        },
        {
          id: 'q8',
          text: 'This view of Anglo-Persian alliance was soon put to a severe test when in 1804, upon the shah’s request for military and financial assistance, the British refused to extend the terms of the 1801 treaty to defense of Persia in the war against Russia',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ]
})
