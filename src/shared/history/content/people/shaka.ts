import { definePerson } from '../../schema'

export default definePerson({
  id: 'shaka',
  names: [
    { text: 'Shaka', lang: 'en', role: 'primary' },
    {
      text: 'Shaka Zulu',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1787' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1828' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['monarch', 'military'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Shaka Zulu was born in 1787, the illegitimate son of Senzangakona, chief of the Zulu clan. An outcast as a child, Shaka was brought up among a number of neighboring groups, finally ending with the Mthethwa where he distinguished himself as a skilled warrior in Dingiswayo\'s army.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Shaka fostered a new national identity by stressing the Zuluness of the state.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        },
        {
          id: 'q3',
          text: 'He also welcomed British traders to his kingdom and sent diplomatic emissaries to the British king.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Shaka was assassinated at the height of his powers in 1828 and was succeeded by Dingane, his half-brother and one of the assassins.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Shaka and the Rise of the Zulu State', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/9.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/KingShaka.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:KingShaka.jpg',
    credit: { creator: 'James King' },
    license: { id: 'public-domain' }
  }
})
