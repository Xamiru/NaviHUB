import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'voyages-of-zheng-he-purpose',
  about: ['event:voyages-of-zheng-he', 'person:zheng-he'],
  topic: 'motives',
  positions: [
    {
      id: 'display-of-ming-power',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Sue Gronewald', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Because the Yongle emperor wanted to impress Ming power upon the world and show off China\'s resources and importance, he gave orders to build even larger ships than were necessary for the voyages.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q2',
          text: 'He also wanted those in other countries to be aware of China\'s power, and to perceive it as the strong country he believed it had been in earlier Chinese dynasties, such as the Han and the Song; he thus revived the traditional tribute system.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      id: 'tribute-system-and-trade',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Sue Gronewald', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In the traditional tributary arrangement, countries on China\'s borders agreed to recognize China as their superior and its emperor as lord of "all under Heaven." These countries regularly gave gifts of tribute in exchange for certain benefits, like military posts and trade treaties.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q4',
          text: 'To satisfy growing Chinese demand for special spices, medicinal herbs, and raw materials, Chinese merchants cooperated with Moslem and Indian traders to develop a rich network of trade that reached beyond island southeast Asia to the fringes of the Indian Ocean.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      id: 'diplomacy-and-envoys',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Sue Gronewald', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Over 90 envoys from overseas countries are brought to Nanjing by the expeditions and then returned to their countries the following year',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages-teaching-guide',
            loc: { section: 'Teaching Guide' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://video.afe.easia.columbia.edu/teaching-guides/the-ming-maritime-expedititons-zheng-he-teaching-guide'
          }
        }
      ]
    },
    {
      id: 'legitimacy-of-the-new-reign',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Asia for Educators, Columbia University' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Zhu Di has to establish his legitimacy; if the elites in the Confucian bureaucracy reject him then he has to gain wider support',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages-teaching-guide',
            loc: { section: 'Teaching Guide' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://video.afe.easia.columbia.edu/teaching-guides/the-ming-maritime-expedititons-zheng-he-teaching-guide'
          }
        },
        {
          id: 'q7',
          text: 'The Voyages can now be seen as part of Yongle’s effort to legitimize his reign',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages-teaching-guide',
            loc: { section: 'Teaching Guide' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://video.afe.easia.columbia.edu/teaching-guides/the-ming-maritime-expedititons-zheng-he-teaching-guide'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
