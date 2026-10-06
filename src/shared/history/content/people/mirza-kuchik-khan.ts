import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-kuchik-khan',
  names: [
    { text: 'Mirza Kuchik Khan', lang: 'en', role: 'primary' },
    { text: 'میرزا کوچک خان جنگلی', lang: 'fa', role: 'native' },
    {
      text: 'Mirzā Kuček Khan Jangali',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '1' }
        }
      ]
    },
    {
      text: 'Kuchek Khan Jangali',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1880' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1921' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['revolutionary'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'In his youth he had been a religious student, but in 1908 he abandoned his religious career and joined the constitutionalist social-democrats. Already in 1909, he was a junior commander of the revolutionary force that attacked and captured Tehran, and two years later he was forced into internal exile.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '9' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Mirzā Kuček Khan became a revolutionary leader because he adapted to this revolutionary situation, exploiting rather than initiating fortuitous circumstances.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        },
        {
          id: 'q3',
          text: 'On the other hand, Kuček Khan was a perfectionist and he hesitated to move on Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        },
        {
          id: 'q4',
          text: 'The leader of this movement, Mīrzā Kūček Khan (Jangalī), was badly defeated by the British in 1336/1918-19 and was subsequently invited by Caucasian Bolsheviks to collaborate in extending the “Red revolution” in the east.',
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
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q5',
          text: 'The extent of Kuček Khan’s involvement with the Committee is not clear. As it turned out he was no fan of the Turks.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '35' }
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
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'Reżā Khan shortly thereafter invaded Gīlān and defeated Mīrzā Kūček Khan’s forces.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '14' }
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
