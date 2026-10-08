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
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1880' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '8' }
          },
          {
            source: 'iranica-dailami-gilan-constitutional-revolution',
            loc: { section: 'GILĀN viiia. In the Constitutional Revolution of 1905-11', para: '26' }
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
          },
          {
            source: 'iranica-dailami-gilan-constitutional-revolution',
            loc: { section: 'GILĀN viiia. In the Constitutional Revolution of 1905-11', para: '26' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'Mirzā Kuček Khan (1880-1921), who was later to lead the Jangali movement in Gilān',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-gilan-constitutional-revolution',
            loc: { section: 'GILĀN viiia. In the Constitutional Revolution of 1905-11', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/gilan-viii/'
          }
        }
      ]
    },
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
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/%D8%B9%DA%A9%D8%B3_%DB%B3%DB%B1%D8%8C_%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE_%D9%85%D8%AE%D8%AA%D8%B5%D8%B1_%D8%A7%D8%AD%D8%B2%D8%A7%D8%A8_%D8%B3%DB%8C%D8%A7%D8%B3%DB%8C_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86%D8%8C_%D8%AC%D9%84%D8%AF_%D8%A7%D9%88%D9%84.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%B9%DA%A9%D8%B3_%DB%B3%DB%B1%D8%8C_%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE_%D9%85%D8%AE%D8%AA%D8%B5%D8%B1_%D8%A7%D8%AD%D8%B2%D8%A7%D8%A8_%D8%B3%DB%8C%D8%A7%D8%B3%DB%8C_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86%D8%8C_%D8%AC%D9%84%D8%AF_%D8%A7%D9%88%D9%84.jpg',
    credit: { institution: 'Mohammad-Taqi Bahar, Tarikh-e mokhtasar-e ahzab-e siyasi-ye Iran, vol. 1' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'fakhrai-1978-sardar-e-jangal', perspective: 'iranian' }
  ]
})
