import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'the-holocaust',
  names: [
    { text: 'The Holocaust', lang: 'en', role: 'primary' },
    {
      text: 'NS-Völkermord',
      lang: 'de',
      role: 'alternative',
      cites: [
        {
          source: 'lemo-kapitel-ns-voelkermord',
          loc: { section: 'Der NS-Völkermord', para: '0' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'genocide',
  start: {
    alts: [
      {
        value: { d: '1941' },
        cites: [
          {
            source: 'lemo-kapitel-ns-voelkermord',
            loc: { section: 'Der NS-Völkermord', para: '4' }
          },
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '5' }
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
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Holocaust', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:auschwitz',
      cites: [
        {
          source: 'lemo-kapitel-ns-voelkermord',
          loc: { section: 'Der NS-Völkermord', para: '19' }
        }
      ]
    },
    {
      ref: 'place:berlin',
      cites: [
        { source: 'lemo-chronik-1942', loc: { section: 'Chronik 1942', para: '16' } }
      ]
    },
    {
      ref: 'place:warsaw',
      cites: [
        { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '90' } }
      ]
    }
  ],
  partOf: [
    { ref: 'event:second-world-war' },
    { ref: 'period:nazi-germany' }
  ],
  participants: [
    {
      ref: 'person:adolf-hitler',
      role: 'perpetrator',
      cites: [
        {
          source: 'lemo-kapitel-ns-voelkermord',
          loc: { section: 'Der NS-Völkermord', para: '9' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '6' }
        }
      ]
    },
    {
      ref: 'person:heinrich-himmler',
      role: 'perpetrator',
      cites: [
        {
          source: 'lemo-kapitel-ns-voelkermord',
          loc: { section: 'Der NS-Völkermord', para: '20' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '6' }
        }
      ]
    },
    {
      name: 'Reinhard Heydrich',
      role: 'perpetrator',
      cites: [
        {
          source: 'lemo-kapitel-ns-voelkermord',
          loc: { section: 'Der NS-Völkermord', para: '13' }
        }
      ]
    },
    {
      name: 'Adolf Eichmann',
      role: 'perpetrator',
      cites: [
        {
          source: 'lemo-kapitel-ns-voelkermord',
          loc: { section: 'Der NS-Völkermord', para: '13' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 5600000, qualifier: 'about' },
            cites: [
              {
                source: 'lemo-kapitel-ns-voelkermord',
                loc: { section: 'Der NS-Völkermord', para: '23' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Arnulf Scriba' }
            ]
          },
          {
            value: { min: 6000000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { min: 6000000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-israel-country-study-1988',
                loc: { section: 'The Holocaust', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { min: 5000000, max: 6000000 },
            cites: [
              {
                source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
                loc: {
                  section: 'VIII. JUSTIFICATION: THE CLAIM THAT IRVING IS A "HOLOCAUST DENIER"',
                  para: '8.3'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Richard J. Evans', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:second-world-war', rel: 'related' },
    { ref: 'event:nuremberg-trials', rel: 'related' },
    { ref: 'event:1948-arab-israeli-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'The impact of the Holocaust on world Jewry, either on contemporaries of the horror or on succeeding generations, cannot be exaggerated. The scope of Hitler\'s genocidal efforts can be quickly summarized. In 1939 about 10 million of the estimated 16 million Jews in the world lived in Europe. By 1945 almost 6 million had been killed, most of them in the nineteen main concentration camps.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Holocaust', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/19.htm' }
        },
        {
          id: 'q1',
          text: 'However, wartime conditions and the presence of millions of Jews in Poland, the Soviet Union, and other occupied areas in Eastern Europe gradually led to the adoption of another plan: the systematic extermination of all Jews who came under German control.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        },
        {
          id: 'q13',
          text: 'In the summer of 1941, however, plans were made for the " final solution" of the Jewish question in all of Europe.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
            loc: { section: 'PERSECUTION OF THE JEWS', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q14',
          text: 'The Nazi persecution of Jews in Germany before the war, severe and repressive as it was, cannot compare, however, with the policy pursued during the war in the occupied territories. Originally the policy was similar to that which had been in force inside Germany. Jews were required to register, were forced to live in ghettoes, to wear the yellow star, and were used as slave labourers.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
            loc: { section: 'PERSECUTION OF THE JEWS', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q15',
          text: 'The plan for exterminating the Jews was developed shortly after the attack on the Soviet Union. Einsatzgruppen of the Security Police and SD, formed for the purpose of breaking the resistance of the population of the areas lying behind the German armies in the East, were given the duty of exterminating the Jews in those areas.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
            loc: { section: 'PERSECUTION OF THE JEWS', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
        },
        {
          id: 'q5',
          text: 'Killing came to be done in an efficient, factorylike fashion in large extermination camps run by Himmler\'s Special Duty Section (Sonderdienst--SD). The tempo of the mass murder of Jewish men, women, and children was accelerated toward the end of the war. Hitler\'s preoccupation with the "final solution" was so great that the transport of Jews was at times given preference over the transport of war matériel.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        },
        {
          id: 'q16',
          text: 'All who were fit to work were used as slave labourers in the concentration camps; all who were not fit to work were destroyed in gas chambers and their bodies burnt. Certain concentration camps such as Treblinka and Auschwitz were set aside for this main purpose.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
            loc: { section: 'PERSECUTION OF THE JEWS', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q17',
          text: 'A large number (about 4.5 million) of those killed came from Poland and the Soviet Union; about 125,000 German Jews were murdered.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The magnitude of the Holocaust cast a deep gloom over the Jewish people and tormented the spirit of Judaism. The faith of observant Jews was shaken, and the hope of the assimilationists smashed. Not only had 6 million Jews perished, but the Allies, who by 1944 could have easily disrupted the operation of the death camps, did nothing. In this spiritual vacuum, Zionism alone emerged as a viable Jewish response to this demonic anti-Semitism.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'The Holocaust', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/19.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1942-01-20' },
            cites: [
              { source: 'lemo-chronik-1942', loc: { section: 'Chronik 1942', para: '15' } },
              {
                source: 'lemo-kapitel-ns-voelkermord',
                loc: { section: 'Der NS-Völkermord', para: '13' }
              },
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Discussions in January 1942 at the Wannsee Conference on the outskirts of Berlin led to the improved organization and coordination of the program of genocide.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/42.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1943-04-19' },
            cites: [
              { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '89' } },
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'World War II', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Acting independently of the overall Polish resistance, an underground Jewish network organized the courageous but unsuccessful 1943 risings in the ghettos of Warsaw, Bialystok, and Vilnius.',
        lang: 'en',
        cite: {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'World War II', para: '13' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/poland/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1945-01-27' },
            cites: [
              {
                source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
                loc: {
                  section: 'VIII. JUSTIFICATION: THE CLAIM THAT IRVING IS A "HOLOCAUST DENIER"'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Auschwitz itself was liberated on 27th January 1945 by the advancing Russian army. The Russians found a total of 7,500 inmates.',
        lang: 'en',
        cite: {
          source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
          loc: { section: 'VIII. JUSTIFICATION: THE CLAIM THAT IRVING IS A "HOLOCAUST DENIER"' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.hdot.org/judge/' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Selection_on_the_ramp_at_Auschwitz-Birkenau%2C_1944_%28Auschwitz_Album%29_1b.jpg/1280px-Selection_on_the_ramp_at_Auschwitz-Birkenau%2C_1944_%28Auschwitz_Album%29_1b.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Selection_on_the_ramp_at_Auschwitz-Birkenau,_1944_(Auschwitz_Album)_1b.jpg',
    credit: { institution: 'Yad Vashem', creator: 'Bernhard Walter' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'nazi-concentration-camps-1945',
      mediaKind: 'video',
      title: 'NAZI CONCENTRATION CAMPS',
      url: 'https://archive.org/download/gov.archives.arc.43452/gov.archives.arc.43452_512kb.mp4',
      page: 'https://archive.org/details/gov.archives.arc.43452',
      credit: { institution: 'U.S. National Archives and Records Administration (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 264483287,
      date: { d: '1945' },
      durationSec: 3473
    }
  ],
  furtherReading: [
    { source: 'grossman-erenburg-2015-chernaia-kniga', perspective: 'russian-soviet' },
    { source: 'gutman-1990-encyclopedia-of-the-holocaust', perspective: 'israeli' }
  ]
})
