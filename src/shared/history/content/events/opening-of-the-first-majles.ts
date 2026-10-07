import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'opening-of-the-first-majles',
  names: [
    { text: 'Opening of the first Majles', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1906-10-07' },
        cites: [
          {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '9'
            }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1906' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'event:persian-constitutional-revolution' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The first Majles opens on October 7 and ratifies the Constitutional Charter on October 17.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1906' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q1',
          text: 'The regulations provided for 156 deputies (Tārīḵ-e bīdārī, ed. Saʿīdī Sīrjānī, I, pp. 601-08); sixty of them were allotted to Tehran, reportedly in order to permit swift establishment of the Majles.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q2',
          text: 'Of the Tehran deputies thirty-two represented the guilds, ten the merchants, ten the landowners, four the ʿolamāʾ, and four the Qajar family.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q3',
          text: 'Observers commented that the majority of the deputies had little understanding of constitutionalism and either pursued their personal interests or came under the influence of an ambitious few',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Representatives_of_the_First_Iranian_Parliament_WDL11288.png',
    page: 'https://commons.wikimedia.org/wiki/File:Representatives_of_the_First_Iranian_Parliament_WDL11288.png',
    title: 'Representatives of the First Iranian Parliament',
    credit: { institution: 'World Digital Library, Library of Congress' },
    license: { id: 'public-domain' }
  }
})
