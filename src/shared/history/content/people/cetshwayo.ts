import { definePerson } from '../../schema'

export default definePerson({
  id: 'cetshwayo',
  names: [
    { text: 'Cetshwayo', lang: 'en', role: 'primary' },
    { text: 'Cetshwayo kaMpande', lang: 'zu', role: 'alternative' }
  ],
  researched: '2026-10-06',
  regions: ['subsaharan-africa'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Fearing British aggression, Cetshwayo had already started to purchase guns before the war began.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '23' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        },
        {
          id: 'q2',
          text: 'The Zulus were aware that Chelmsford was planning a second invasion and King Cetshwayo sent envoys to negotiate peace.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '66' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'Cetshwayo\'s possessions were seized, and he was exiled to Cape Town, and later London.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '84' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        },
        {
          id: 'q4',
          text: 'In 1883, the British attempted to restore order by returning Cetshwayo to his throne. However, his powers were now greatly reduced and he died the following year.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '85' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: '‘March slowly, attack at dawn and eat up the red soldiers.’',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '25' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Cetshwayo%2C_King_of_the_Zulus_%28d._1884%29%2C_Carl_Rudolph_Sohn%2C_1882.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Cetshwayo,_King_of_the_Zulus_(d._1884),_Carl_Rudolph_Sohn,_1882.jpg',
    credit: { institution: 'Royal Collection', creator: 'Carl Rudolph Sohn' },
    license: { id: 'public-domain' }
  }
})
