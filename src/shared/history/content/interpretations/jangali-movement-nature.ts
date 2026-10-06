import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'jangali-movement-nature',
  about: ['event:jangali-movement', 'person:mirza-kuchik-khan'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'One of the shortcomings of historiography on the Jangali movement is the ignorance that concerns the activities of the Bolsheviks and the peasantry who both in fact continued to be present in Gilān. Although these have been studied in works on the Constitutional Revolution, their presence in the Jangali movement has been overlooked.',
    lang: 'en',
    cite: {
      source: 'iranica-dailami-jangali-movement',
      loc: { section: 'JANGALI MOVEMENT', para: '15' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/jangali-movement'
    }
  },
  researched: '2026-10-06',
  positions: [
    {
      id: 'anti-imperialist-agrarian-movement',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Pezhmann Dailami' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Indeed the Jangali movement had a prominent anti-landlord character.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        },
        {
          id: 'q3',
          text: 'What kept the movement together were the military occupation of the Iranian territory and the common anti-imperialist aspirations of the revolutionaries.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        },
        {
          id: 'q4',
          text: 'There is no sign that any faction of the Jangalis hoped to establish an Islamic theocracy in Gilān or in Iran (Dailami, forthcoming).',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        }
      ]
    },
    {
      id: 'religio-nationalist-movement',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Mirzā Kučak Khan assumes the leadership of a religio-nationalist movement in Gilan.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1915' }
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
      id: 'regional-reformist-not-separatist',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Touraj Atabaki' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'were not territorially separatist, but aimed to establish stable yet accountable political arrangements that would redress local grievances about an unfair distribution of power between central govern­ment and local authorities throughout Iran.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        }
      ]
    },
    {
      id: 'ally-of-soviet-revolution',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nina M. Mamedova' },
        { kind: 'scholar', name: 'Cosroe Chaqueri' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Aiming to weaken the British position in Persia and acting from ideological considerations (mainly having the idea of spreading the proletarian revolution to the East), the leadership of the Soviet Republics in Russia, Trans-Caucasus and Turkistan started to provide considerable help to the Jangali movement of Mirza Kuček Khan.',
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
        },
        {
          id: 'q8',
          text: 'In Persia the party directed its efforts at “revolutionizing” the country, particularly the Caspian coastal area, where the popular Jangalī movement had led resistance to czarist and British occupation during the war years.',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-communism-i',
            loc: { section: 'COMMUNISM i. In Persia to 1941', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-i'
          }
        }
      ]
    }
  ]
})
