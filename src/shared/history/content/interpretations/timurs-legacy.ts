import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'timurs-legacy',
  about: ['person:timur', 'polity:timurid-empire'],
  topic: 'legacy',
  positions: [
    {
      id: 'tyrant-and-conqueror',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Timur was a ruthless and an avaricious tyrant, who, feigning Islamic piety, sometimes paid a visit to Muslim shaikhs and mystics of repute after his massacres.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q2',
          text: 'When he ordered the massacre of the people of Isfahan, who had rebelled against the abuses of his agents, he ordered his army to deliver to him 70,000 heads of the Isfahanis, and this they did, enabling him to have a column built with their skulls.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q3',
          text: 'After sacking Baghdad, he ordered each of his 20,000 men to bring him one severed head, and this order too was carried out.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q4',
          text: 'His wanton rapacity and cruelty led him in many cases to sack a city and massacre its people even when they had already submitted, as was the case with Damascus.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      id: 'regime-and-patronage',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Tamerlane\'s regime was characterized by its inclusion of Iranians in administrative roles and its promotion of architecture and poetry.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Invasions of the Mongols and Tamerlane', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/iran/10.htm' }
        },
        {
          id: 'q6',
          text: 'He did not have the huge forces of earlier Mongol leaders, so his conquests were slower and less savage than those of Genghis Khan or Hulagu Khan.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Invasions of the Mongols and Tamerlane', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/iran/10.htm' }
        },
        {
          id: 'q7',
          text: 'By supporting such people, Timur imbued his empire with a very rich culture.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        },
        {
          id: 'q8',
          text: 'Timur also patronized scientists and artists; his grandson Ulugh Beg was one of the world\'s first great astronomers.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        }
      ]
    },
    {
      id: 'scale-of-the-massacres',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Peter Jackson', discipline: 'historian' },
        { kind: 'scholar', name: 'Abbas Zaryab', discipline: 'historian' },
        { kind: 'scholar', name: 'Ursula Nashashibi', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'After a short siege, Timur sacked Baghdad, put many of the populace to the sword, and demolished houses, city walls, and most of the monuments, including some from the ʿAbbasid period; only mosques, schools and Sufi convents were spared.',
          lang: 'en',
          cite: {
            source: 'iranica-iraq-ii-iii-mongols-to-safavids',
            loc: { section: 'IRAQ ii – iii. FROM THE MONGOLS TO THE SAFAVIDS', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iraq-iii-mongols-to-safavids/'
          }
        },
        {
          id: 'q10',
          text: 'The entire population was massacred, with the exception of sayyids, ulama and dervishes, and pyramids were formed of their skulls as a grisly memento.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        },
        {
          id: 'q11',
          text: 'In 789/1387 Tīmūr exacted revenge for the rebellion of the city of Isfahan by slaughtering 70,000 of its inhabitants',
          lang: 'en',
          cite: {
            source: 'iranica-ajaeb-al-maqdur',
            loc: { section: 'ʿAJĀʾEB AL-MAQDŪR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/ajaeb-al-maqdur'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
