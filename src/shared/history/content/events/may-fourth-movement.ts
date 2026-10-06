import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'may-fourth-movement',
  names: [
    { text: 'May Fourth Movement', lang: 'en', role: 'primary' },
    { text: '五四運動', lang: 'zh', role: 'native', translit: 'Wǔsì Yùndòng' },
    {
      text: 'New Culture Movement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1919-05-04' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:paris-peace-conference',
      rel: 'response-to',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '2' }
        }
      ]
    },
    { ref: 'event:xinhai-revolution', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1915 the Japanese set before the warlord government in Beijing the so-called Twenty-One Demands, which would have made China a Japanese protectorate.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q2',
          text: 'In 1917 China declared war on Germany in the hope of recovering its lost province, then under Japanese control. But in 1918 the Beijing government signed a secret deal with Japan accepting the latter\'s claim to Shandong. When the Paris peace conference of 1919 confirmed the Japanese claim to Shandong and Beijing\'s sellout became public, internal reaction was shattering.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On May 4, 1919, there were massive student demonstrations against the Beijing government and Japan. The political fervor, student activism, and iconoclastic and reformist intellectual currents set in motion by the patriotic student protest developed into a national awakening known as the May Fourth Movement.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q4',
          text: 'The intellectual milieu in which the May Fourth Movement developed was known as the New Culture Movement and occupied the period from 1917 to 1923. The student demonstrations of May 4, 1919 were the high point of the New Culture Movement, and the terms are often used synonymously.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The May Fourth Movement helped to rekindle the then-fading cause of republican revolution.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        },
        {
          id: 'q6',
          text: 'In October 1919 Sun reestablished the Guomindang to counter the government in Beijing.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Tsinghua%27s_Students_in_May_Fourth_Movement%2C_by_Wenyiduo.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tsinghua%27s_Students_in_May_Fourth_Movement,_by_Wenyiduo.jpg',
    credit: { creator: 'Wen Yiduo' },
    license: { id: 'public-domain' }
  }
})
