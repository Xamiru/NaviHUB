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
  researched: '2026-10-07',
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
      name: 'Heinrich Himmler',
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
          id: 'q2',
          text: 'Im Verlauf des Jahres 1941 hatte die NS-Führung die Ermordung aller im deutschen Machtbereich lebenden Juden beschlossen.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-ns-voelkermord',
            loc: { section: 'Der NS-Völkermord', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/voelkermord'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Der deutsche Überfall auf Polen im Herbst 1939 war begleitet von Exzessen an der polnischen Bevölkerung. Juden wurden auf offener Straße schikaniert und gequält, Synagogen entweiht und zerstört, jüdische Wohngebiete geräumt und ihre Bewohner insbesondere nach 1940 in Ghettos zusammengepfercht. Morde waren an der Tagesordnung. Diese Maßnahmen bildeten den Auftakt für die 1941 einsetzende systematische Ermordung der jüdischen Bevölkerung in Polen.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-ns-voelkermord',
            loc: { section: 'Der NS-Völkermord', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/voelkermord'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Mit dem am 22. Juni 1941 begonnenen Krieg gegen die Sowjetunion erhielt die NS-Vernichtungspolitik eine neue Dimension. Anders als die militärischen Auseinandersetzungen im Westen war der Feldzug im Osten als rassenideologischer Raub- und Vernichtungskrieg konzipiert worden, und als solcher wurde er von Beginn an geführt.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-ns-voelkermord',
            loc: { section: 'Der NS-Völkermord', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/voelkermord'
          }
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
          id: 'q6',
          text: 'Über eine Million Menschen fanden den Tod in Auschwitz, das weltweit zu einem Synonym für den Massenmord an den Juden wurde.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-ns-voelkermord',
            loc: { section: 'Der NS-Völkermord', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/voelkermord'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'Insgesamt fielen der von den Nationalsozialisten in ihrem Rassenwahn angestrebten Vernichtung aller Juden Europas durch Vergasung, Erschießung, Injektionen, medizinische Versuche oder durch gezieltes Verhungernlassen rund 5,6 Millionen Juden zum Opfer, davon etwa 2,7 Millionen in den Vernichtungslagern. Neben der jüdischen Bevölkerung fielen mehr als 250.000 europäische Sinti und Roma den Einsatzgruppen zum Opfer oder wurden in den Vernichtungslagern ermordet.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-ns-voelkermord',
            loc: { section: 'Der NS-Völkermord', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/voelkermord'
          }
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
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Auf der Wannsee-Konferenz in Berlin wird unter Vorsitz von Reinhard Heydrich über organisatorische Fragen der Ermordung der europäischen Juden beraten.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1942', loc: { section: 'Chronik 1942', para: '16' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1942.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1943-04-19' },
            cites: [
              { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '89' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Im Warschauer Ghetto, aus dem bereits 300.000 Juden deportiert worden sind, beginnt ein Aufstand, der bis zur kompletten Auflösung des Ghettos am 16. Mai andauert.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '90' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1943.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1945-01-27' },
            cites: [
              { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '24' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Die Rote Armee befreit das Vernichtungslager Auschwitz, in dem noch 7.600 Häftlinge sind.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '25' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1945.html'
        }
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
  ]
})
