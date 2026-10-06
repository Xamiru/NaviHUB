import { definePerson } from '../../schema'

export default definePerson({
  id: 'david-ben-gurion',
  names: [
    { text: 'David Ben-Gurion', lang: 'en', role: 'primary' },
    { text: 'דוד בן-גוריון', lang: 'he', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['mena'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime Minister of Israel',
      lang: 'en',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'PROBLEMS OF THE NEW STATE, 1948-67', para: '2' }
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
          text: 'Under Ben-Gurion\'s direction, the Jewish Agency decided in October 1945 to unite with Jewish dissident groups in a combined rebellion against the British administration in Palestine.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Prelude to Statehood', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/20.htm' }
        },
        {
          id: 'q2',
          text: 'On May 14, 1948, David Ben-Gurion, the head of the Jewish Agency, proclaimed the establishment of the State of Israel.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-creation-of-israel',
            loc: { section: 'Creation of Israel, 1948', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/creation-israel'
          }
        },
        {
          id: 'q3',
          text: 'He announced the formation of a Provisional Council of State, actually a transformed executive committee of the Jewish Agency with himself as prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'PROBLEMS OF THE NEW STATE, 1948-67', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/21.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Flickr_-_Government_Press_Office_%28GPO%29_-_Portrait_of_PM_David_Ben_Gurion.jpg/1280px-Flickr_-_Government_Press_Office_%28GPO%29_-_Portrait_of_PM_David_Ben_Gurion.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Government_Press_Office_(GPO)_-_Portrait_of_PM_David_Ben_Gurion.jpg',
    credit: { institution: 'Israel Government Press Office / National Photo Collection of Israel' },
    license: { id: 'cc-by-sa', version: '3.0' }
  }
})
