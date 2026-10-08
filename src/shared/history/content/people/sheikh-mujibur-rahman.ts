import { definePerson } from '../../schema'

export default definePerson({
  id: 'sheikh-mujibur-rahman',
  names: [
    { text: 'Sheikh Mujibur Rahman', lang: 'en', role: 'primary' },
    { text: 'শেখ মুজিবুর রহমান', lang: 'bn', role: 'native', translit: 'Śekh Mujibur Rahmān' },
    {
      text: 'Mujib',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Ayub Khan', para: '3' }
        }
      ]
    },
    {
      text: 'Bangabandhu',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Introduction', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1975-08-15' },
        cites: [
          { source: 'loc-bangladesh-country-study-1989', loc: { section: 'Mujib', para: '7' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['politician', 'revolutionary', 'head-of-state'],
  offices: [
    {
      title: 'prime minister of Bangladesh',
      polity: 'polity:bangladesh',
      start: {
        alts: [
          {
            value: { d: '1972-01-12' },
            cites: [
              {
                source: 'loc-bangladesh-country-study-1989',
                loc: { section: 'Independence', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Independence', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Sheikh_Mujibur_Rahman_returns_to_Bangladesh_1972-01-10_%28PID-h0047%29.jpg/1280px-Sheikh_Mujibur_Rahman_returns_to_Bangladesh_1972-01-10_%28PID-h0047%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sheikh_Mujibur_Rahman_returns_to_Bangladesh_1972-01-10_(PID-h0047).jpg',
    credit: { institution: 'Press Information Department, Government of Bangladesh' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The death of the Awami League\'s Suhrawardy in 1963 gave the mercurial Sheikh Mujibur Rahman--commonly known as Mujib--the leadership of East Pakistan\'s dominant party.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Ayub Khan', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/15.htm' }
        },
        {
          id: 'q2',
          text: 'Bangladeshis rejoiced at their attainment of independence and offered their adulation to the first national leader of Bangladesh, Sheikh Mujibur Rahman (Mujib), or the Bangabandhu, the "Beloved of Bangladesh."',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Introduction', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/3.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In a convincing demonstration of Bengali dissatisfaction with the West Pakistani regime, the Awami League won all but 2 of the 162 seats allotted East Pakistan in the National Assembly. Bhutto\'s Pakistan People\'s Party came in a poor second nationally, winning 81 out of the 138 West Pakistani seats in the National Assembly. The Awami League\'s electoral victory promised it control of the government, with Mujib as the country\'s prime minister, but the inaugural assembly never met.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Crisis and Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/16.htm' }
        },
        {
          id: 'q4',
          text: 'On March 25, the Pakistan Army launched a terror campaign calculated to intimidate the Bengalis into submission. Within hours a wholesale slaughter had commenced in Dhaka, with the heaviest attacks concentrated on the University of Dhaka and the Hindu area of the old town. Bangladeshis remember the date as a day of infamy and liberation. The Pakistan Army came with hit lists and systematically killed several hundred Bengalis. Mujib was captured and flown to West Pakistan for incarceration.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Civil War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        },
        {
          id: 'q5',
          text: 'On January 10, 1972, Mujib arrived in Dhaka to a tumultuous welcome. Mujib first assumed the title of president but vacated that office two days later to become the prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/18.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'On the morning of August 15, 1975, Mujib and several members of his family were murdered in a coup engineered by a group of young army officers, most of whom were majors.',
          lang: 'en',
          cite: { source: 'loc-bangladesh-country-study-1989', loc: { section: 'Mujib', para: '7' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/19.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'mujibur-rahman-2012-the-unfinished-memoirs', perspective: 'south-asian' }
  ],
  born: {
    alts: [
      {
        value: { d: '1920' },
        cites: [
          {
            source: 'lc-names-n81068854',
            loc: { section: 'Mujibur Rahman, Sheikh, 1920-1975' }
          }
        ]
      }
    ]
  }
})
