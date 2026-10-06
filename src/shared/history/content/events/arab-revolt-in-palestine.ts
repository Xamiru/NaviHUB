import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'arab-revolt-in-palestine',
  names: [
    { text: 'Arab revolt in Palestine', lang: 'en', role: 'primary' },
    { text: 'الثورة الفلسطينية الكبرى', lang: 'ar', role: 'native' },
    {
      text: 'Palestinian Revolt',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Palestinian Revolt', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1936-04' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  participants: [
    {
      name: 'Hajj Amin al Husayni',
      role: 'leader',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Palestinian Revolt', para: '1' }
        },
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Palestinian Revolt', para: '3' }
        }
      ]
    },
    {
      name: 'Arab Higher Committee',
      role: 'organizer',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Palestinian Revolt', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'By 1936 the increase in Jewish immigration and land acquisition, the growing power of Hajj Amin al Husayni, and general Arab frustration at the continuation of European rule, radicalized increasing numbers of Palestinian Arabs.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Thus, in April 1936 an Arab attack on a Jewish bus led to a series of incidents that escalated into a major Palestinian rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        },
        {
          id: 'q3',
          text: 'It declared a national strike in support of three basic demands: cessation of Jewish immigration, an end to all further land sales to the Jews, and the establishment of an Arab national government.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        },
        {
          id: 'q4',
          text: 'The British put down the revolt using harsh measures, shutting down the AHC and deporting many Palestinian Arab leaders.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Thus, Britain\'s commitment to a Jewish homeland in Palestine dissipated, and the Mandate authorities pursued a policy of appeasement with respect to the Arabs.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        },
        {
          id: 'q6',
          text: 'Another outcome of the Palestinian Revolt was the involvement of the Arab states as advocates of the Palestinian Arabs.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        },
        {
          id: 'q7',
          text: 'In the Yishuv, the Palestinian Revolt reinforced the already firm belief in the need for a strong Jewish defense network.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Palestinian Revolt', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1937-07' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'The Palestinian Revolt', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Its report, issued in July 1937, described the Arab and Zionist positions and the British obligation to each as irreconcilable and the existing Mandate as unworkable. It recommended partition of Palestine into Jewish and Arab states, with a retained British Mandate over Nazareth, Bethlehem, and Jerusalem and a corridor from Jerusalem to the coast.',
        lang: 'en',
        cite: {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Palestinian Revolt', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1937-11' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'The Palestinian Revolt', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'This group, the Woodhead Commission, reversed the Peel Commission\'s findings and reported in November 1937 that partition was impracticable; this view in its turn was accepted.',
        lang: 'en',
        cite: {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'The Palestinian Revolt', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1939-02-26' },
            cites: [
              { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Die Palästina-Konferenz in London, die eine Verständigungslösung zwischen Juden und Palästinensern unter Kontrolle der Mandatsmacht Großbritannien erbringen soll, scheitert an der ablehnenden Haltung der Jewish Agency unter Chaim Weizmann (1874-1952).',
        lang: 'de',
        cite: { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '29' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1939.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Palestine_disturbances_1936._Armoured_cars_being_brought_into_Palestine_by_rail_LOC_matpc.18166.jpg/1280px-Palestine_disturbances_1936._Armoured_cars_being_brought_into_Palestine_by_rail_LOC_matpc.18166.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Palestine_disturbances_1936._Armoured_cars_being_brought_into_Palestine_by_rail_LOC_matpc.18166.jpg',
    credit: { institution: 'Library of Congress, G. Eric and Edith Matson Photograph Collection' },
    license: { id: 'public-domain' },
    title: 'Palestine disturbances 1936. Armoured cars being brought into Palestine by rail'
  },
  archive: [
    {
      id: 'peel-commission-report-1937',
      mediaKind: 'document',
      title: 'M 00300 Peel Commission Full Report',
      url: 'https://archive.org/download/m-00300-peel-commission-full-report/M00300%20-%20PeelCommissionFullReport.pdf',
      page: 'https://archive.org/details/m-00300-peel-commission-full-report',
      credit: { institution: 'Internet Archive', creator: 'Palestine Royal Commission' },
      license: { id: 'public-domain', url: 'https://creativecommons.org/publicdomain/mark/1.0/' },
      bytes: 47698315,
      date: { d: '1937-07' }
    }
  ]
})
