import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'molotov-ribbentrop-pact',
  names: [
    { text: 'Molotov–Ribbentrop Pact', lang: 'en', role: 'primary' },
    {
      text: 'Nazi-Soviet Nonaggression Pact',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '23' }
        }
      ]
    },
    { text: 'Hitler-Stalin-Pakt', lang: 'de', role: 'alternative' },
    { text: 'Пакт Молотова — Риббентропа', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1939-08-23' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '23' }
          },
          { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '151' } },
          {
            source: 'avalon-nazi-soviet-secret-additional-protocol-1939',
            loc: { section: 'Secret Additional Protocol' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '151' } },
        {
          source: 'avalon-nazi-soviet-secret-additional-protocol-1939',
          loc: { section: 'Secret Additional Protocol' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:joseph-stalin',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '23' }
        }
      ]
    },
    {
      ref: 'person:adolf-hitler',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '23' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Third Reich: Foreign Policy', para: '6' }
        }
      ]
    },
    {
      name: 'Vyacheslav Molotov',
      role: 'signatory',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '23' }
        },
        { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '151' } }
      ]
    },
    {
      name: 'Joachim von Ribbentrop',
      role: 'signatory',
      cites: [
        { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '151' } }
      ]
    }
  ],
  related: [
    { ref: 'event:munich-agreement', rel: 'preceded-by' },
    {
      ref: 'event:second-world-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation and Terror', para: '23' }
        },
        {
          source: 'european-parliament-2019-09-19-european-remembrance-resolution',
          loc: { section: 'Recital B' }
        }
      ],
      disputedIn: 'molotov-ribbentrop-pact-responsibility'
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Signaling a shift in foreign policy, Vyacheslav Molotov, Stalin\'s loyal assistant, replaced Litvinov, who was Jewish, as commissar of foreign affairs in May 1939.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'While Britain and France dilatorily attempted to induce the Soviet Union to join them in pledging to protect Poland, the Soviet Union and Germany engaged in intense negotiations.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q3',
          text: 'The open provisions of the agreement pledged absolute neutrality in the event one of the parties should become involved in war, while a secret protocol partitioned Poland between the parties and assigned Romanian territory as well as Estonia and Latvia (and later Lithuania) to the Soviet sphere of influence.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q4',
          text: 'Both High Contracting Parties obligate, themselves to desist from any act of violence, any aggressive action, and any attack on each other, either individually or jointly with other powers.',
          lang: 'en',
          cite: {
            source: 'avalon-nazi-soviet-nonaggression-treaty-1939',
            loc: {
              section: 'Treaty of Nonaggression Between Germany and the Union of Soviet Socialist Republics'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/nonagres.asp'
          }
        },
        {
          id: 'q5',
          text: '2. In the event of a territorial and political rearrangement of the areas belonging to the Polish state the spheres of influence of Germany and the U.S.S.R. shall be bounded approximately by the line of the rivers Narew, Vistula, and San.',
          lang: 'en',
          cite: {
            source: 'avalon-nazi-soviet-secret-additional-protocol-1939',
            loc: { section: 'Secret Additional Protocol' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/addsepro.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'With his eastern flank thus secured, Hitler began the German invasion of Poland on September 1, 1939; Britain and France declared war on Germany two days later. World War II had begun.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        },
        {
          id: 'q7',
          text: 'In that context, Persia initially welcomed the German-Soviet pact of August 1939, as it seemed not only to put an end to the obstructive attitude of the main opponent thus far to the flourishing German-Persian commercial relations, but also because it gave rise to the hope that Soviet transit would soon be opened for German-Persian trade.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Bundesarchiv_Bild_183-H27337%2C_Moskau%2C_Stalin_und_Ribbentrop_im_Kreml.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H27337,_Moskau,_Stalin_und_Ribbentrop_im_Kreml.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'Helmut Laux' },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    },
    title: 'Moskau, Stalin und Ribbentrop im Kreml'
  }
})
