import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-tabatabai',
  names: [
    { text: 'Mohammad Tabatabai', lang: 'en', role: 'primary' },
    { text: 'محمد طباطبایی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  died: {
    alts: [
      {
        value: { d: '1921' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1921' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Sayyed Moḥammad Ṭabāṭabāʾī was a well-known figure whose father had been in sympathy with Malkom and who had himself demonstrated liberal proclivities since the late period of Nāṣer-al-Dīn Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q2',
          text: 'Ṭabāṭabāʾī’s dedication, strong as it was, was only momentarily shared by other ʿolamāʾ.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q3',
          text: 'In June therefore, after an agitator named Mahdī Gāvkoš had been arrested for sedition and ill treated, Ṭabāṭabāʾī delivered a long sermon calling for an end to arbitrary government and for a majles-e mašrūʿa-ye ʿadālat-ḵāna (council of justice) in which all classes would be represented, stopping short, however, of a demand for full constitutional government',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: { section: 'CONSTITUTIONAL REVOLUTION ii. Events', para: '5' }
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
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Portrait_of_Sayyed_Mohammad_Tabatabai_by_Ali_Mahmudi.jpg/1280px-Portrait_of_Sayyed_Mohammad_Tabatabai_by_Ali_Mahmudi.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Sayyed_Mohammad_Tabatabai_by_Ali_Mahmudi.jpg',
    credit: {
      institution: 'Library, Museum and Document Center of the Islamic Parliament of Iran',
      creator: 'Ali Mahmudi'
    },
    license: { id: 'public-domain' }
  }
})
