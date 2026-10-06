import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'south-african-war',
  names: [
    { text: 'South African War', lang: 'en', role: 'primary' },
    { text: 'Boer War', lang: 'en', role: 'alternative' },
    {
      text: 'Second War of Independence',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'public', name: 'Afrikaners' }
      ],
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '16' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1899' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1902-05-21' },
        cites: [
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 1,
  related: [
    { ref: 'event:first-boer-war', rel: 'preceded-by' }
  ],
  sides: [
    {
      key: 'british',
      name: 'British',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
        }
      ]
    },
    {
      key: 'afrikaners',
      name: 'Afrikaners',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'afrikaners',
      value: {
        alts: [
          {
            value: { min: 90000 },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'british',
      value: {
        alts: [
          {
            value: { min: 500000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      side: 'afrikaners',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The South African War (1899-1902), fought by the British to establish their hegemony in South Africa and by the Afrikaners to defend their autonomy, lasted three years and caused enormous suffering.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q2',
          text: 'Ninety thousand Afrikaners fought against a British army that eventually approached 500,000 men, most from Britain but including large numbers of volunteers also from Australia, New Zealand, and Canada.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q3',
          text: 'Approximately 30,000 Africans were also employed as soldiers by the British, while thousands more labored as transport workers.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Kruger\'s forces, taking advantage of initial superiority in numbers (before the British regulars arrived) and of surprise, won a number of victories at the beginning of the war. In 1900, however, British forces overwhelmed the Boers, took Bloemfontein (capital of the Orange Free State), Johannesburg, and Pretoria (capital of the South African Republic), and forced Kruger into exile.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q5',
          text: 'Resistance continued, however, in the countryside, where the Boers fought a ferocious guerrilla war. The British ultimately succeeded in breaking this resistance, but only by adopting a scorched-earth policy. In 1901 and 1902, the British torched more than 30,000 farms in the South African Republic and the Orange Free State and placed all the Afrikaner women and children in concentration camps, where, because of overcrowding and unsanitary conditions, more than 25,000 perished.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Peace was finally concluded at the town of Vereeniging on May 21, 1902. Milner, who drew up the terms, intended that Afrikaner power should be broken forever. He required that the Boers hand over all their arms and agree to the incorporation of their territories into the British empire as the Orange River Colony and the Transvaal.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q7',
          text: 'Indeed, Afrikaners, already imbued with a sense of collective suffering by their nineteenth-century experiences at the hands of British imperialists, were even more united after the South African War (which they termed the Second War of Independence).',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        },
        {
          id: 'q8',
          text: 'The greatest blow to Milner\'s plans, however, came in 1905 with the victory of the Liberal Party in the British general election and the formation of a government led by men who had opposed the scorched-earth policy in the South African War as no more than "methods of barbarism."',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'British Imperialism and the Afrikaners', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/south-africa/16.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Battle_of_Belmont%2C_Boer_War_-_Kurz_%26_Allison.jpg/1280px-Battle_of_Belmont%2C_Boer_War_-_Kurz_%26_Allison.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Belmont,_Boer_War_-_Kurz_%26_Allison.jpg',
    credit: { institution: 'Library of Congress', creator: 'Kurz & Allison' },
    license: { id: 'public-domain' }
  }
})
