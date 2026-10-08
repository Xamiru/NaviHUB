import { definePerson } from '../../schema'

export default definePerson({
  id: 'saddam-hussein',
  names: [
    { text: 'Saddam Hussein', lang: 'en', role: 'primary' },
    { text: 'صدام حسين', lang: 'ar', role: 'native' },
    {
      text: 'Saddam Husayn',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1937' },
        cites: [
          { source: 'lc-names-hussein-saddam-n81024571', loc: { section: 'Hussein, Saddam' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2006-12-29' },
        cites: [
          {
            source: 'white-house-2006-12-29-statement-on-execution-of-saddam-hussein',
            loc: { section: 'President Bush’s Statement on Execution of Saddam Hussein', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of Iraq',
      polity: 'polity:republic-of-iraq',
      start: {
        alts: [
          {
            value: { d: '1979-07-16' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '6' }
        }
      ]
    },
    {
      title: 'Chairman of the Revolutionary Command Council',
      polity: 'polity:republic-of-iraq',
      start: {
        alts: [
          {
            value: { d: '1979-07-16' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '6' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Saddam_Hussein_1987.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Saddam_Hussein_1987.jpg',
    credit: { institution: 'Ministry of Information of the Republic of Iraq' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On July 16, 1979, President Bakr resigned, and Saddam Husayn officially replaced him as president of the republic, secretary general of the Baath Party Regional Command, chairman of the RCC, and commander in chief of the armed forces.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/23.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Saddam Husayn, on the other hand, was a consummate party politician whose formative experiences were in organizing clandestine opposition activity. He was adept at outmaneuvering--and at times ruthlessly eliminating--political opponents. Although Bakr was the older and more prestigious of the two, by 1969 Saddam Husayn clearly had become the moving force behind the party. He personally directed Baathist attempts to settle the Kurdish question and he organized the party\'s institutional structure.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE EMERGENCE OF SADDAM HUSAYN, 1968-79', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/23.htm' }
        },
        {
          id: 'q3',
          text: 'In September 1980, border skirmishes erupted in the central sector near Qasr-e Shirin, with an exchange of artillery fire by both sides. A few weeks later, Saddam Husayn officially abrogated the 1975 treaty between Iraq and Iran and announced that the Shatt al Arab was returning to Iraqi sovereignty. Iran rejected this action and hostilities escalated as the two sides exchanged bombing raids deep into each other\'s territory. Finally, on September 23, Iraqi troops marched into Iranian territory, beginning what was to be a protracted and extremely costly war.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ CONFLICT', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/24.htm' }
        },
        {
          id: 'q4',
          text: 'Phebe Marr, a noted analyst of Iraqi affairs, stated that "the war was more immediately the result of poor political judgement and miscalculation on the part of Saddam Hussein," and "the decision to invade, taken at a moment of Iranian weakness, was Saddam\'s".',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ WAR', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/101.htm' }
        },
        {
          id: 'q5',
          text: 'Saddam Hussein had fulfilled his promise to cut off "the head of the snake."',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '59' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Today, Saddam Hussein was executed after receiving a fair trial -- the kind of justice he denied the victims of his brutal regime.',
          lang: 'en',
          cite: {
            source: 'white-house-2006-12-29-statement-on-execution-of-saddam-hussein',
            loc: { section: 'President Bush’s Statement on Execution of Saddam Hussein', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/news/releases/2006/12/20061229-15.html'
          }
        }
      ]
    }
  ]
})
