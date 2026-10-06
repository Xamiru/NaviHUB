import { definePerson } from '../../schema'

export default definePerson({
  id: 'winston-churchill',
  names: [
    { text: 'Winston Churchill', lang: 'en', role: 'primary' },
    {
      text: 'Winston Leonard Spencer Churchill',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lemo-biografie-winston-churchill',
          loc: { section: 'Winston Churchill 1874-1965', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1874-11-30' },
        cites: [
          {
            source: 'lemo-biografie-winston-churchill',
            loc: { section: 'Winston Churchill 1874-1965', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1965-01-24' },
        cites: [
          {
            source: 'lemo-biografie-winston-churchill',
            loc: { section: 'Winston Churchill 1874-1965', para: '62' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'lemo-biografie-winston-churchill',
        loc: { section: 'Winston Churchill 1874-1965', para: '62' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'writer'],
  offices: [
    {
      title: 'Prime Minister of the United Kingdom',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1940-05-10' },
            cites: [
              {
                source: 'lemo-biografie-winston-churchill',
                loc: { section: 'Winston Churchill 1874-1965', para: '43' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1945' },
            cites: [
              {
                source: 'lemo-biografie-winston-churchill',
                loc: { section: 'Winston Churchill 1874-1965', para: '46' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-winston-churchill',
          loc: { section: 'Winston Churchill 1874-1965', para: '43' }
        },
        {
          source: 'lemo-biografie-winston-churchill',
          loc: { section: 'Winston Churchill 1874-1965', para: '48' }
        }
      ]
    },
    {
      title: 'Prime Minister of the United Kingdom',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1951' },
            cites: [
              {
                source: 'lemo-biografie-winston-churchill',
                loc: { section: 'Winston Churchill 1874-1965', para: '52' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1955' },
            cites: [
              {
                source: 'lemo-biografie-winston-churchill',
                loc: { section: 'Winston Churchill 1874-1965', para: '52' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-winston-churchill',
          loc: { section: 'Winston Churchill 1874-1965', para: '53' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Seine Stellungnahme gegen Arthur Neville Chamberlains Politik der Beschwichtigung (Appeasement-Politik) und seine Warnung vor den Gefahren des nationalsozialistischen Regimes stoßen in der Öffentlichkeit auf wachsende Resonanz.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-winston-churchill',
            loc: { section: 'Winston Churchill 1874-1965', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/winston-churchill'
          }
        },
        {
          id: 'q2',
          text: '10. Mai: Nach dem Beginn des deutschen "Westfeldzugs" gegen Frankreich wird Churchill unter dem Druck der öffentlichen Meinung Premier- und Verteidigungsminister einer neu gebildeten Koalitionsregierung und Parteiführer der Konservativen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-winston-churchill',
            loc: { section: 'Winston Churchill 1874-1965', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/winston-churchill'
          }
        },
        {
          id: 'q3',
          text: '5. März: In der Rolle des britischen Oppositionsführers hält Churchill in Fulton, Missouri (USA), eine Rede, in der er vom "Eisernen Vorhang" inmitten Europas spricht und ein Bild der UdSSR zeichnet, das in der westlichen Welt im "Kalten Krieg" bestimmend wird.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-winston-churchill',
            loc: { section: 'Winston Churchill 1874-1965', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/winston-churchill'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: 'I would say to the House, as I said to those who have joined this Government: "I have nothing to offer but blood, toil, tears and sweat."',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1940-05-13-his-majestys-government',
            loc: { section: 'HC Deb 13 May 1940 vol 360 cc1501-25', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1940/may/13/his-majestys-government-1'
          }
        },
        {
          id: 'q5',
          text: 'We shall go on to the end. We shall fight in France, we shall fight on the seas and oceans, we shall fight with growing confidence and growing strength in the air, we shall defend our island, whatever the cost may be. We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender,',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1940-06-04-war-situation',
            loc: { section: 'HC Deb 04 June 1940 vol 361 cc787-98', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1940/jun/04/war-situation'
          }
        },
        {
          id: 'q6',
          text: 'Never in the field of human conflict was so much owed by so many to so few.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1940-08-20-war-situation',
            loc: { section: 'HC Deb 20 August 1940 vol 364 cc1132-274', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1940/aug/20/war-situation'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q7',
          text: 'Churchill macht sich als Maler und Schriftsteller einen Namen. Für seine vielfältigen Schriften, besonders für das sechsbändige Werk "The Second World War" (1948-1953), erhält er den Nobelpreis für Literatur.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-winston-churchill',
            loc: { section: 'Winston Churchill 1874-1965', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/winston-churchill'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Churchill_V_sign_HU_55521.jpg/1280px-Churchill_V_sign_HU_55521.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Churchill_V_sign_HU_55521.jpg',
    credit: { institution: 'Imperial War Museum' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'fdr-churchill-christmas-tree-1941',
      mediaKind: 'audio',
      title: 'President Franklin D. Roosevelt And Winston Churchill At The White House Christmas Tree Lighting Ceremonies, 12-24-1941',
      url: 'https://archive.org/download/FDRChurchillChristmasTree/President%20Franklin%20D%20Roosevelt%20and%20Winston%20Churchill%20at%20the%20White%20House%20Christmas%20Tree%20Lighting%20Ceremonies,%2012-24-1941.mp3',
      page: 'https://archive.org/details/FDRChurchillChristmasTree',
      credit: {
        institution: 'wwIIarchive-audio collection (Internet Archive)',
        creator: 'Columbia Broadcasting System, Inc.'
      },
      license: { id: 'public-domain' },
      bytes: 14725456,
      date: { d: '1941-12-24' },
      durationSec: 1841
    }
  ]
})
