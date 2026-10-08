import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'new-deal',
  names: [
    { text: 'New Deal', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1933-03-06' },
        cites: [
          { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '61' } }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    { ref: 'place:washington-dc' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      ref: 'person:franklin-d-roosevelt',
      role: 'leader',
      cites: [
        { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '61' } },
        {
          source: 'lemo-biografie-franklin-d-roosevelt',
          loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '39' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:great-depression',
      rel: 'response-to',
      cites: [
        {
          source: 'lemo-biografie-franklin-d-roosevelt',
          loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '39' }
        },
        {
          source: 'nara-milestone-social-security-act',
          loc: { section: 'Social Security Act (1935)', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q13',
          text: 'When President Franklin Delano Roosevelt took office in March 1933, he immediately focused his attention on the domestic economic situation created by the Great Depression. Believing that recovery would come from measures taken at home rather than abroad, he secured Congressional passage of a series of far-reaching domestic economic reforms that would come to be known as the first New Deal.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-export-import-bank',
            loc: {
              section: 'New Deal Trade Policy: The Export-Import Bank & the Reciprocal Trade Agreements Act, 1934',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1921-1936/export-import-bank'
          }
        },
        {
          id: 'q14',
          text: 'Congress meets beginning what is later known as Roosevelt\'s “Hundred Days.” During this period, Congress enacts many of the principal programs of FDR\'s “New Deal.”',
          lang: 'en',
          cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt/key-events'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'More important, a host of unemployed citizens face the grim problem of existence, and an equally great number toil with little return.',
          lang: 'en',
          cite: {
            source: 'avalon-fdr-first-inaugural-address',
            loc: { section: 'First Inaugural Address of Franklin D. Roosevelt' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/froos1.asp'
          }
        },
        {
          id: 'q4',
          text: 'Our greatest primary task is to put people to work.',
          lang: 'en',
          cite: {
            source: 'avalon-fdr-first-inaugural-address',
            loc: { section: 'First Inaugural Address of Franklin D. Roosevelt' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/froos1.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Before the 1930s, support for the elderly was a matter of local, state, and family concern rather than a federal concern (except for veterans’ pensions). However, the widespread suffering experienced during the Great Depression elicited congressional support for numerous proposals for a national old-age insurance system.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-social-security-act',
            loc: { section: 'Social Security Act (1935)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/social-security-act'
          }
        },
        {
          id: 'q6',
          text: 'The act created a uniquely American solution to the problem of old-age pensions.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-social-security-act',
            loc: { section: 'Social Security Act (1935)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/social-security-act'
          }
        },
        {
          id: 'q7',
          text: 'Mit eigenständigen Lohnerhöhungen und dem Verbot jeder gewerkschaftlichen Aktivität widersetzen sich die Ford-Werke in Wilmington (Delaware/USA) dem "New Deal" von Präsident Roosevelt.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1933', loc: { section: 'Chronik 1933', para: '189' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1933.html'
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
            value: { d: '1933-05-18' },
            cites: [
              {
                source: 'nara-milestone-tennessee-valley-authority-act',
                loc: { section: 'Tennessee Valley Authority Act (1933)', para: '1' }
              },
              {
                source: 'nara-milestone-tennessee-valley-authority-act',
                loc: { section: 'Tennessee Valley Authority Act (1933)', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'President Roosevelt signed the Tennessee Valley Authority Act on May 18, 1933, creating the TVA as a federal corporation.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-tennessee-valley-authority-act',
          loc: { section: 'Tennessee Valley Authority Act (1933)', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/tennessee-valley-authority-act'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1934-08-05' },
            cites: [
              { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '147' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Roosevelt erklärt den wirtschaftlichen Wiederaufschwung der USA dank des "New Deal" als gelungen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1934', loc: { section: 'Chronik 1934', para: '149' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1934.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935-01-04' },
            cites: [
              { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '5' } },
              { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In his third State of the Union Address, FDR effectively announces the beginning of a second stage of his New Deal. This new phase will focus on long-term gains such as a system of social security--for the aged, the unemployed, the ill--and for improved housing and tax reform.',
        lang: 'en',
        cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://millercenter.org/president/fdroosevelt/key-events'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935-08-14' },
            cites: [
              {
                source: 'nara-milestone-social-security-act',
                loc: { section: 'Social Security Act (1935)', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On August 14, 1935, the Social Security Act established a system of old-age benefits for workers, benefits for victims of industrial accidents, unemployment insurance, and aid for dependent mothers and children, persons who are blind, and persons with disabilities.',
        lang: 'en',
        cite: {
          source: 'nara-milestone-social-security-act',
          loc: { section: 'Social Security Act (1935)', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.archives.gov/milestone-documents/social-security-act'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1937' },
            cites: [
              {
                source: 'lemo-biografie-franklin-d-roosevelt',
                loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '42' }
              },
              { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Emboldened by his sweeping electoral victory, FDR sends his “court packing” scheme to Congress. He does so in a bill calling for the reorganization of the federal judiciary system, allegedly to make it more efficient at all levels. Frustrated by recent Supreme Court decisions against some of his New Deal policies, the bill calls for adding as many as six justices to the Court should any of the current members over age seventy--namely those that oppose his programs--refuse to retire.',
        lang: 'en',
        cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://millercenter.org/president/fdroosevelt/key-events'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Signing_Of_The_Social_Security_Act.jpg/1280px-Signing_Of_The_Social_Security_Act.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Signing_Of_The_Social_Security_Act.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'president-speaks-to-the-nation-1933-05-08',
      mediaKind: 'video',
      title: 'President Speaks To The Nation, 1933/05/08',
      url: 'https://archive.org/download/1933-05-08_President_Speaks_To_The_Nation/1933-05-08_President_Speaks_To_The_Nation.mp4',
      page: 'https://archive.org/details/1933-05-08_President_Speaks_To_The_Nation',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 12019854,
      date: { d: '1933-05-08' },
      durationSec: 124
    },
    {
      id: 'the-plow-that-broke-the-plains-1936',
      mediaKind: 'video',
      title: 'The Plow That Broke The Plains (1936) — Full Length',
      url: 'https://archive.org/download/the-plow-that-broke-the-plains-1936/The%20Plow%20That%20Broke%20The%20Plains%20(1936).mp4',
      page: 'https://archive.org/details/the-plow-that-broke-the-plains-1936',
      credit: {
        institution: 'Internet Archive (U.S. federal government work)',
        creator: 'Pare Lorentz'
      },
      license: { id: 'public-domain' },
      bytes: 896306473,
      date: { d: '1936-05-10' },
      durationSec: 1720
    },
    {
      id: 'the-river-1938',
      mediaKind: 'video',
      title: 'The River (1938) — Full Length',
      url: 'https://archive.org/download/the-river-1938/The%20River%201938.mp4',
      page: 'https://archive.org/details/the-river-1938',
      credit: {
        institution: 'Internet Archive (U.S. federal government work)',
        creator: 'Pare Lorentz'
      },
      license: { id: 'public-domain' },
      bytes: 392171544,
      date: { d: '1938-02-04' },
      durationSec: 1873
    }
  ],
  furtherReading: [
    { source: 'yakovlev-1965-franklin-ruzvelt', perspective: 'russian-soviet' }
  ]
})
