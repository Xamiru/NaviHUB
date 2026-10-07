import { definePerson } from '../../schema'

export default definePerson({
  id: 'yakubu-gowon',
  names: [
    { text: 'Yakubu Gowon', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  regions: ['subsaharan-africa'],
  roles: ['military', 'head-of-state'],
  offices: [
    {
      title: 'head of state',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'The 1966 Coups, Civil War, and Gowon\'s Government', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/General_Yakubu_Gowon.png',
    page: 'https://commons.wikimedia.org/wiki/File:General_Yakubu_Gowon.png',
    credit: {
      institution: 'Federal Nigeria, Vol. IX No. 5-11 (Nigerian government periodical, Nov 1966)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Lieutenant Colonel (later General) Yakubu Gowon, a Christian from the middle belt, became the head of state after the coup. His first act was to reinstate the federal system, along with the four regions and their allotted functions.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'The 1966 Coups, Civil War, and Gowon\'s Government', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/70.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In anticipation of eastern secession, Gowon moved quickly to weaken the support base of the region by decreeing the creation of twelve new states to replace the four regions.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'The 1966 Coups, Civil War, and Gowon\'s Government', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/70.htm' }
        },
        {
          id: 'q3',
          text: 'Gowon’s background as an ethnic and religious minority in northern Nigeria probably influenced his disposition to be less vengeful and spiteful against Ibos.',
          lang: 'en',
          cite: {
            source: 'ssrc-amadi-2007-story-of-biafra',
            loc: {
              section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
              para: '33'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://items.ssrc.org/how-genocides-end/colonial-legacy-elite-dissension-and-the-making-of-genocide-the-story-of-biafra/'
          }
        }
      ]
    }
  ]
})
