import { definePerson } from '../../schema'

export default definePerson({
  id: 'cixi',
  names: [
    { text: 'Cixi', lang: 'en', role: 'primary' },
    { text: '慈禧', lang: 'zh', role: 'native' },
    { text: 'Ci Xi', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  regions: ['east-asia'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Supported by ultraconservatives and with the tacit support of the political opportunist Yuan Shikai (1859-1916), Empress Dowager Ci Xi engineered a coup d\'etat on September 21, 1898, forcing the young reform-minded Guangxu into seclusion. Ci Xi took over the government as regent.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        },
        {
          id: 'q2',
          text: 'With the backing of Empress Dowager Cixi (Tz’u Hsi) and the Imperial Army, the Boxer Rebellion turned into a violent conflict that claimed the lives of hundreds of foreign missionaries and thousands of Chinese nationals.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-open-door-china',
            loc: {
              section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/hay-and-china'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Empress_Dowager_Cixi_-_Hair_2_-_Dress_4_-_Pic_1.jpg/1280px-Empress_Dowager_Cixi_-_Hair_2_-_Dress_4_-_Pic_1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Empress_Dowager_Cixi_-_Hair_2_-_Dress_4_-_Pic_1.jpg',
    credit: {
      institution: 'Freer Gallery of Art and Arthur M. Sackler Gallery Archives, Smithsonian Institution',
      creator: 'Yu Xunling'
    },
    license: { id: 'public-domain' }
  }
})
