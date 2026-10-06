import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-ypsilantis',
  names: [
    { text: 'Alexander Ypsilantis', lang: 'en', role: 'primary' },
    { text: 'Αλέξανδρος Υψηλάντης', lang: 'el', role: 'native' },
    {
      text: 'Alexander Ypsilanti',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Russian Protectorate', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1792' },
        cites: [
          {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '26' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:istanbul',
    cites: [
      {
        source: 'sowards-msu-balkan-lectures-greek-revolution',
        loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '26' }
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  roles: ['military', 'revolutionary'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Born in Istanbul in 1792, he had grown up in Russia in exile with his father.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q2',
          text: 'He attended the military cadet school and served with distinction in the tsarist army, rising to the position of aide de camp to the tsar.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The insurgency\'s leader, Alexander Ypsilanti, a general in the Russian army and son of a Phanariot prince, enjoyed the support of some Greek and Romanian boyars in the principalities;',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/14.htm' }
        },
        {
          id: 'q4',
          text: 'Then the Turks, with Russia\'s approval, attacked the principalities, scattered the Greek forces, and chased Ypsilanti into Transylvania.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Russian Protectorate', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/14.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'Ypsilantis retreated into Austria, where he eventually died in prison.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Ypsilantis_Alexander.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Ypsilantis_Alexander.JPG',
    credit: { institution: 'National Historical Museum of Greece', creator: 'Dionysios Tsokos' },
    license: { id: 'public-domain' }
  }
})
