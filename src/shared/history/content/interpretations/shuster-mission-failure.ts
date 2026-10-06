import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'shuster-mission-failure',
  about: ['event:shuster-mission'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'russian-pressure-with-british-complicity',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In the ensuing disputes, however, Grey would align British interests in Persia with Russian policy in opposition to Shuster.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q2',
          text: 'Grey had personally recommended Shuster’s dismissal to the Russians in the hope of averting their occupation of Tehran, which could jeopardize Grey’s tenure as foreign secretary (PRO, Great Britain. Cabinet Papers. CAB. 37/108, no. 150).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q3',
          text: 'In the process, the British Foreign Office abetted Russia in undermining the Persian Constitutional Revolution in December 1911.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    },
    {
      id: 'shusters-own-approach',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Vanessa Martin' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Unfortunately, his careful indifference to foreign opinion antagonized the Russians, and his proposed reforms brought him into conflict with the old Qajar bureaucracy.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    },
    {
      id: 'bakhtiari-cabinet',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The Baḵtiāri leaders did not consider Shuster worthy of a military showdown with Russia, particularly the Baḵ-tiāri prime minsiter, ṢamsÂām-al-Salṭana, who resented Shuster’s collusion with the Majles in denying the cabinet full control over the country’s finances (Klein, 1980, pp. 66-67).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    },
    {
      id: 'shuster-as-pro-british',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'Russian Empire' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'he enjoys the support of the Social Democrats but is opposed by the Russians who view him as pro-British.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1911' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
