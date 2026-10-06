import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'imprisonment-of-the-bab-motives',
  about: ['event:imprisonment-of-the-bab', 'person:haji-mirza-aqasi'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'aqasi-feared-rival',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mollā Moḥammad Nabīl Zarandī' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It has been suggested that the prime minister, Ḥājī Mīrzā Āqāsī, prevented the Bāb’s arrival in Tehran out of fear that he might supplant him as an influence on Moḥammad Shah (Zarandī, Dawn-Breakers, pp. 231-32).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      id: 'shah-sympathy-alarmed-aqasi',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The shah’s sympathetic attention towards the new prophet alarmed Āqāsi, who had the Bāb sent to Māku in Azarbaijan, where he was kept under confinement and later transferred to the fortress of Čahriq near Urmia.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      id: 'governor-plans',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Moʿtamed-al-Dawla’s plans, which included the introduction of the Bāb to Moḥammad Shah (possibly with a view to his ultimately replacing Ḥājī Mīrzā Āqāsī as the king’s advisor), collapsed on his death in February, 1847.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      id: 'russian-pressure',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Moojan Momen' },
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'At this point, the Russian Minister in Tehran, Dolgorukov, began to exert pressure on the Prime Minister to have the Bāb removed from Mākū, which was located dangerously close to the Russian border; a recent messianic movement in the Caucasus had caused serious problems for the Russians and their fears of renewed chiliastic agitation in the region seem to have been behind their request for the Bāb’s removal (see Momen, Bābī and Bahāʾī Religions, p. 72).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    }
  ]
})
