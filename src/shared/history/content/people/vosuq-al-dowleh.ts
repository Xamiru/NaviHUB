import { definePerson } from '../../schema'

export default definePerson({
  id: 'vosuq-al-dowleh',
  names: [
    { text: 'Vosuq al-Dowleh', lang: 'en', role: 'primary' },
    { text: 'وثوق‌الدوله', lang: 'fa', role: 'native' },
    {
      text: 'Ḥasan Woṯuq-al-Dawla',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1918' }
        }
      ]
    },
    {
      text: 'Vosuq od-Dowleh',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'World War I', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      start: {
        alts: [
          {
            value: { d: '1916-08' },
            cites: [
              {
                source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
                loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '27' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
          loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '27' }
        }
      ]
    },
    {
      title: 'prime minister',
      start: {
        alts: [
          {
            value: { d: '1918-08-07' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '56' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1920-06' },
            cites: [
              {
                source: 'iranica-fatemi-anglo-persian-agreement-1919',
                loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '16' }
              },
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '59'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '56' }
        },
        {
          source: 'iranica-fatemi-anglo-persian-agreement-1919',
          loc: { section: 'ANGLO-PERSIAN AGREEMENT OF 1919', para: '16' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Woṯūq-al-Dawla was named prime minister with British backing in August 1916. He attempted to ease out of Sepah-sālār’s agreement, claiming that the text had been lost, but to no avail.',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
            loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
          }
        },
        {
          id: 'q2',
          text: 'After much maneuvering, in August 1918 Britain had secured the reappointment of the pro-British Ḥasan Khan Woṯuq-al-Dawla as Persian prime minister, in exchange for a pledge of personal protection and payment of subsidy to Aḥmad Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q3',
          text: 'On the Iranian side Woṯūq was the chief architect of the treaty, and the British considered his continuation in office essential to the treaty’s ratification and implementation.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    }
  ]
})
