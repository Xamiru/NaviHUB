import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'israeli-disengagement-from-gaza',
  names: [
    { text: 'Israeli disengagement from Gaza', lang: 'en', role: 'primary' },
    { text: 'Gaza disengagement plan', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '2005-08' },
        cites: [
          {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2005-09' },
        cites: [
          {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:gaza-strip',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'place:west-bank',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ariel-sharon',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 8000, qualifier: 'about' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:second-intifada',
      rel: 'caused-by',
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    },
    {
      ref: 'event:gaza-war-2008-2009',
      rel: 'contributed-to',
      cites: [
        {
          source: 'hrw-2010-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2010: Israel / Occupied Palestinian Territories (OPT)' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
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
          id: 'q2',
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
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Israeli Cabinet adopted Prime Minister Sharon’s Gaza “disengagement” plan on June 6, 2004, and the full Knesset gave its approval on October 26.',
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
          id: 'q4',
          text: 'A World Bank study on the economic effects of the plan determined that “disengagement” would ease restrictions on mobility inside Gaza.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-10-28-israel-disengagement-will-not-end-gaza-occupation',
            loc: { section: 'Israel: \'Disengagement\' Will Not End Gaza Occupation', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2004/10/28/israel-disengagement-will-not-end-gaza-occupation'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Under the plan, Israel is scheduled to remove settlers and military bases protecting the settlers from the Gaza Strip and four isolated West Bank Jewish settlements by the end of 2005.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-10-28-israel-disengagement-will-not-end-gaza-occupation',
            loc: { section: 'Israel: \'Disengagement\' Will Not End Gaza Occupation', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2004/10/28/israel-disengagement-will-not-end-gaza-occupation'
          }
        },
        {
          id: 'q6',
          text: 'In addition to controlling the borders, coastline and airspace, Israel will continue to control Gaza’s telecommunications, water, electricity and sewage networks, as well as the flow of people and goods into and out of the territory.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-10-28-israel-disengagement-will-not-end-gaza-occupation',
            loc: { section: 'Israel: \'Disengagement\' Will Not End Gaza Occupation', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2004/10/28/israel-disengagement-will-not-end-gaza-occupation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Israel maintains effective control over Gaza by regulating movement in and out of the Strip as well as the airspace, sea space, public utilities and population registry.',
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
        },
        {
          id: 'q8',
          text: 'Since the withdrawal, Israel has carried out aerial bombardments, including targeted killings, and has fired artillery into the northeastern corner of Gaza.',
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
        },
        {
          id: 'q9',
          text: 'In January Hamas\'s "Change and Reform" bloc won an unanticipated victory in the second-ever Palestinian Legislative Council elections, taking 74 of 132 seats (or 56 percent).',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2007: Israel', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-5'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '2004-06-06' },
            cites: [
              {
                source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The plan calls for the withdrawal of Jewish settlers and the redeployment of Israeli troops to posts on the Israeli side of the border with Gaza, while Israel will retain control of Gaza’s borders, coastline, and airspace.',
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
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-10-26' },
            cites: [
              {
                source: 'hrw-2005-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2005: Israel/Occupied Palestinian Territories' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Under the “disengagement” plan endorsed Tuesday by the Knesset, Israeli forces will keep control over Gaza’s borders, coastline and airspace, and will reserve the right to launch incursions at will.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-10-28-israel-disengagement-will-not-end-gaza-occupation',
          loc: { section: 'Israel: \'Disengagement\' Will Not End Gaza Occupation', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/news/2004/10/28/israel-disengagement-will-not-end-gaza-occupation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-08' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'While Israel has since declared the Gaza Strip a “foreign territory” and the crossings between Gaza and Israel “international borders,” under international humanitarian law (IHL), Gaza remains occupied, and Israel retains its responsibilities for the welfare of Gaza residents.',
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
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Flickr_-_Israel_Defense_Forces_-_The_Evacuation_of_Neve_Dekalim_%2865%29.jpg/1280px-Flickr_-_Israel_Defense_Forces_-_The_Evacuation_of_Neve_Dekalim_%2865%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Flickr_-_Israel_Defense_Forces_-_The_Evacuation_of_Neve_Dekalim_(65).jpg',
    credit: { institution: 'Israel Defense Forces' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
