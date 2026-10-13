import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2004-iranian-legislative-election',
  names: [
    { text: '2004 Iranian legislative election', lang: 'en', role: 'primary' },
    { text: 'Seventh Majles election', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '2004-02-20' },
        cites: [
          {
            source: 'iran-data-portal-2004-parliamentary-election',
            loc: { section: '2004 Parliamentary Election' }
          },
          {
            source: 'hrw-2004-02-18-iran-reformist-newspapers-muzzled-before-election',
            loc: { section: 'Iran: Reformist Newspapers Muzzled Before Election', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '13' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-2004-02-18-iran-reformist-newspapers-muzzled-before-election',
          loc: { section: 'Iran: Reformist Newspapers Muzzled Before Election', para: '3' }
        }
      ]
    },
    {
      name: 'Saeed Mortazavi',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2004-02-18-iran-reformist-newspapers-muzzled-before-election',
          loc: { section: 'Iran: Reformist Newspapers Muzzled Before Election', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2000-iranian-legislative-election',
      rel: 'followed-by',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '13' }
        }
      ]
    },
    {
      ref: 'event:2005-iranian-presidential-election',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
          loc: { section: 'Access Denied: I. Summary and Recommendations', para: '13' }
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
          text: 'The exclusionary and discriminatory nature of Iran’s elections was evident during the parliamentary elections in February 2004. Then the Guardian Council disqualified 3,605 candidates representing more than forty-four percent of registered candidates nationwide.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'Iran’s judiciary should immediately reverse its order closing the last two newspapers associated with the country’s reformers, Human Rights Watch said today. Chief Prosecutor Said Mortazavi yesterday ordered the closure of Sharq and Yas-e Nau ahead of parliamentary elections on February 20.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-02-18-iran-reformist-newspapers-muzzled-before-election',
            loc: { section: 'Iran: Reformist Newspapers Muzzled Before Election', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2004/02/18/iran-reformist-newspapers-muzzled-election'
          }
        },
        {
          id: 'q3',
          text: 'The Guardian Council’s discriminatory and arbitrary disqualification of candidates was on stark display during the parliamentary elections of 2004.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-rights',
            loc: { section: 'Access Denied: III. Human Rights Violations', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/3.htm'
          }
        },
        {
          id: 'q4',
          text: 'In February 2004, the dailies Šarq (East) and Yās-e now (New Jasmine) were closed down for publishing a critical letter addressed to Ayatollah Khamenei, signed by 144 Majles deputies.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
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
            value: { d: '2004-02-17' },
            cites: [
              {
                source: 'hrw-2004-02-18-iran-reformist-newspapers-muzzled-before-election',
                loc: { section: 'Iran: Reformist Newspapers Muzzled Before Election', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The authorities moved against the two newspapers after they published excerpts from a letter circulated by over 100 members of parliament on February 17. The letter criticized Supreme Leader Ayatollah Ali Khamenei for approving the Guardian Council’s disqualification of more than 2,000 candidates from the upcoming parliamentary elections.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-02-18-iran-reformist-newspapers-muzzled-before-election',
          loc: { section: 'Iran: Reformist Newspapers Muzzled Before Election', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/news/2004/02/18/iran-reformist-newspapers-muzzled-election'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/National_Consultative_Majlis.JPG/1280px-National_Consultative_Majlis.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:National_Consultative_Majlis.JPG',
    credit: { creator: 'Mahdifa33' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
