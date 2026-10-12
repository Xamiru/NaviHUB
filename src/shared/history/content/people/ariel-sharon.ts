import { definePerson } from '../../schema'

export default definePerson({
  id: 'ariel-sharon',
  names: [
    { text: 'Ariel Sharon', lang: 'en', role: 'primary' },
    { text: 'אריאל שרון', lang: 'he', role: 'native' },
    { text: 'أرييل شارون', lang: 'ar', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1928-02-27' },
        cites: [
          { source: 'lc-names-sharon-ariel-n85022373', loc: { section: 'Sharon, Ariel' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2014-01-11' },
        cites: [
          { source: 'lc-names-sharon-ariel-n85022373', loc: { section: 'Sharon, Ariel' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tel-aviv',
    cites: [
      { source: 'lc-names-sharon-ariel-n85022373', loc: { section: 'Sharon, Ariel' } }
    ]
  },
  regions: ['mena'],
  roles: ['politician', 'military'],
  offices: [
    {
      title: 'Prime Minister of Israel',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '1' }
        }
      ]
    },
    {
      title: 'Minister of Defense',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2001-israel-sharon-investigation-urged',
          loc: { section: 'Israel: Sharon Investigation Urged', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Ariel_Sharon_official_portrait_%28cropped%29.jpg/1280px-Ariel_Sharon_official_portrait_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ariel_Sharon_official_portrait_(cropped).jpg',
    credit: { institution: 'Government Press Office (Israel)', creator: 'Yaakov Saar' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Prime Minister Ariel Sharon\'s coalition government held the severely weakened Palestinian Authority (PA) responsible for all armed attacks by Palestinians.',
          lang: 'en',
          cite: {
            source: 'hrw-2003-world-report-israel-and-the-occupied-territories',
            loc: {
              section: 'World Report 2003: Israel, the Occupied West Bank and Gaza Strip, and Palestinian Authority Territories',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k3/mideast5.html'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'As Defense Minister, Ariel Sharon had overall responsibility over the Israeli Defense Forces and allowed Phalangist militias to enter the camps where they terrorized the residents for three days.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-israel-sharon-investigation-urged',
            loc: { section: 'Israel: Sharon Investigation Urged', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2001/06/22/israel-sharon-investigation-urged'
          }
        },
        {
          id: 'q3',
          text: 'On September 28, riots erupted following a visit of Likud Party leader Ariel Sharon to the Temple Mount, and soon escalated into a wave of Israeli-Palestinian violence that became known as the al-Aqsa Intifada.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q4',
          text: 'In October 2004 the Knesset approved Prime Minister Ariel Sharon’s plan to “disengage” from the Gaza Strip in 2005 by withdrawing its military forces and Jewish settlements, although the plan will leave Israel in control of Gaza’s borders, coastline, and airspace.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2005/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q5',
          text: 'In August and September 2005, Israel unilaterally withdrew approximately eight thousand settlers, along with military personnel and installations, from the Gaza Strip and four small settlements in the northern West Bank near Jenin.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        }
      ]
    }
  ]
})
