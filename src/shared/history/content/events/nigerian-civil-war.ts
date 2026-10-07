import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nigerian-civil-war',
  names: [
    { text: 'Nigerian Civil War', lang: 'en', role: 'primary' },
    {
      text: 'Biafran War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'The 1966 Coups, Civil War, and Gowon\'s Government', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1967-07-06' },
        cites: [
          {
            source: 'ssrc-amadi-2007-story-of-biafra',
            loc: {
              section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1970-01-12' },
        cites: [
          {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  sides: [
    {
      key: 'federal',
      name: 'Federal Military Government',
      cites: [
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '1' } }
      ]
    },
    {
      key: 'biafra',
      name: 'Republic of Biafra',
      cites: [
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '7' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:yakubu-gowon',
      role: 'head-of-state',
      side: 'federal',
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'The 1966 Coups, Civil War, and Gowon\'s Government', para: '4' }
        },
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '5' } }
      ]
    },
    {
      ref: 'person:chukwuemeka-odumegwu-ojukwu',
      role: 'leader',
      side: 'biafra',
      cites: [
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '2' } },
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '7' } }
      ]
    },
    {
      name: 'Philip Effiong',
      role: 'commander',
      side: 'biafra',
      cites: [
        { source: 'loc-nigeria-country-study-1991', loc: { section: 'Civil War', para: '14' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 1000000, max: 3000000 },
            cites: [
              {
                source: 'loc-nigeria-country-study-1991',
                loc: { section: 'Civil War', para: '15' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Food_aid_Nigeria.png',
    page: 'https://commons.wikimedia.org/wiki/File:Food_aid_Nigeria.png',
    credit: {
      institution: 'U.S. CDC Public Health Image Library (PHIL #7162)',
      creator: 'Dr. Lyle Conrad'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Nigeria civil war broke out on 6 July 1967. The war was the culmination of an uneasy peace and stability that had plagued the nation since independence in 1960.',
          lang: 'en',
          cite: {
            source: 'ssrc-amadi-2007-story-of-biafra',
            loc: {
              section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://items.ssrc.org/how-genocides-end/colonial-legacy-elite-dissension-and-the-making-of-genocide-the-story-of-biafra/'
          }
        },
        {
          id: 'q2',
          text: 'On May 30, Ojukwu answered the federal decree with the proclamation of the independent Republic of Biafra, named after the Bight of Biafra. He cited as the principal cause for this action the Nigerian government\'s inability to protect the lives of easterners and suggested its culpability in genocide, depicting secession as a measure taken reluctantly after all efforts to safeguard the Igbo people in other regions had failed.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In September attacks on Igbo in the north were renewed with unprecedented ferocity, stirred up by Muslim traditionalists with the connivance, Eastern Region leaders believed, of northern political leaders. The army was sharply divided along regional lines. Reports circulated that troops from the Northern Region had participated in the mayhem. The estimated number of deaths ranged as high as 30,000, although the figure was probably closer to 8,000 to 10,000. More than 1 million Igbo returned to the Eastern Region.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        },
        {
          id: 'q4',
          text: 'In January 1967, the military leaders and senior police officials met at Aburi, Ghana, at the invitation of the Ghanaian military government. By now the Eastern Region was threatening secession. In a last-minute effort to hold Nigeria together, the military reached an accord that provided for a loose confederation of regions.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'A stalemate developed as federal attacks on key towns broke down in the face of stubborn Biafran resistance. Ill-armed and trained under fire, rebel troops nonetheless had the benefit of superior leadership and superb morale. Although vastly outnumbered and outgunned, the Biafrans probed weak points in the federal lines, making lightning tactical gains,',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        },
        {
          id: 'q6',
          text: 'Biafran propaganda, which stressed the threat of genocide to the Igbo people, was extremely effective abroad in winning sympathy for the secessionist movement. Food and medical supplies were scarce in Biafra. Humanitarian aid, as well as arms and munitions, reached the embattled region from international relief organizations and from private and religious groups in the United States and Western Europe by way of nighttime airlifts over the war zone.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        },
        {
          id: 'q7',
          text: 'In December federal forces opened a four-pronged offensive, involving 120,000 troops, that sliced Biafra in half. When Owerri fell on January 6, 1970, Biafran resistance collapsed. Ojukwu fled to the Ivory Coast, leaving his chief of staff, Philip Effiong, behind as "officer administering the government." Effiong called for an immediate, unconditional cease-fire January 12 and submitted to the authority of the federal government at ceremonies in Lagos.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'Estimates in the former Eastern Region of the number of dead from hostilities, disease, and starvation during the thirty-month civil war are estimated at between 1 million and 3 million.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'In accepting Biafra\' unconditional cease-fire, Gowon declared that there would be no victor and no vanquished. In this spirit, the years afterward were declared to be a period of rehabilitation, reconstruction, and reconciliation.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'The 1966 Coups, Civil War, and Gowon\'s Government', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/70.htm' }
        }
      ]
    }
  ]
})
