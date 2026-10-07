import { definePerson } from '../../schema'

export default definePerson({
  id: 'chukwuemeka-odumegwu-ojukwu',
  names: [
    { text: 'Chukwuemeka Odumegwu Ojukwu', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  regions: ['subsaharan-africa'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'military governor of the Eastern Region',
      cites: [
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '2' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Eastern Region\'s military governor, Lieutenant Colonel Chukwuemeka Odumegwu Ojukwu, was under pressure from Igbo officers to assert greater independence from the FMG.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'General Odumegwu Ojukwu has been faulted, notably by Ken Saro-Wiwa and Dr. Nnamdi Azikiwe, for rejecting peace overtures from the federal government. Both Saro-Wiwa and Azikiwe believe that Ojukwu stage-managed the Eastern Region Constituent Assembly to authorize him to declare secession.',
          lang: 'en',
          cite: {
            source: 'ssrc-amadi-2007-story-of-biafra',
            loc: {
              section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
              para: '26'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://items.ssrc.org/how-genocides-end/colonial-legacy-elite-dissension-and-the-making-of-genocide-the-story-of-biafra/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'Ojukwu, in exile, was made the scapegoat, but efforts to have him extradited failed.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    }
  ]
})
