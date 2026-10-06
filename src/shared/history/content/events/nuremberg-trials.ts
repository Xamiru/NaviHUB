import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nuremberg-trials',
  names: [
    { text: 'Nuremberg trials', lang: 'en', role: 'primary' },
    {
      text: 'Nürnberger Prozesse',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '263' } }
      ]
    },
    {
      text: 'International Military Tribunal',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '1'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1945-11-20' },
        cites: [
          { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '262' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1946-10-01' },
        cites: [
          { source: 'lemo-chronik-1946', loc: { section: 'Jahreschronik 1946', para: '123' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:nuremberg',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '1'
          }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Hermann Goering',
      role: 'perpetrator',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '9'
          }
        }
      ]
    },
    {
      name: 'Rudolph Hess',
      role: 'perpetrator',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '9'
          }
        }
      ]
    },
    {
      name: 'Joachim von Ribbentrop',
      role: 'perpetrator',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '9'
          }
        }
      ]
    },
    {
      name: 'Albert Speer',
      role: 'perpetrator',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '9'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:the-holocaust',
      rel: 'response-to',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '10'
          }
        }
      ]
    },
    {
      ref: 'event:second-world-war',
      rel: 'response-to',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '1'
          }
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
          text: 'Following World War II, the victorious Allied governments established the first international criminal tribunals to prosecute high-level political officials and military authorities for war crimes and other wartime atrocities.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
            loc: {
              section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
          }
        },
        {
          id: 'q2',
          text: 'The four major Allied powers—France, the Soviet Union, the United Kingdom, and the United States—set up the International Military Tribunal (IMT) in Nuremberg, Germany, to prosecute and punish “the major war criminals of the European Axis.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
            loc: {
              section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Abkommen der Vier Mächte in London über die Strafverfolgung der Hauptkriegsverbrecher und Einsetzung eines Internationalen Militärgerichtshofes in Nürnberg.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '205' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1945.html'
          }
        },
        {
          id: 'q4',
          text: '(c) Crimes Against Humanity: namely, murder, extermination, enslavement, deportation, and other inhumane acts committed against any civilian population, before or during the war, or persecutions on political, racial, or religious grounds in execution of or in connection with any crime within the jurisdiction of the Tribunal, whether or not in violation of domestic law of the country where perpetrated.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
            loc: {
              section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The IMT prosecutors indicted twenty-two senior German political and military leaders, including Hermann Goering, Rudolph Hess, Joachim von Ribbentrop, Alfred Rosenberg, and Albert Speer. Nazi leader Adolf Hitler was not indicted because he had committed suicide in April 1945, in the final days before Germany’s surrender.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
            loc: {
              section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
          }
        },
        {
          id: 'q6',
          text: 'Urteilsverkündung im Nürnberger Hauptkriegsverbrecherprozess. Zwölf der Angeklagten werden zu Tode verurteilt, sieben erhalten langjährige oder lebenslange Haftstrafen, drei werden freigesprochen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1946', loc: { section: 'Jahreschronik 1946', para: '121' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.hdg.de/lemo/jahreschronik/1946.html'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The Nuremberg and Tokyo tribunals contributed significantly to the development of international criminal law, then in its infancy.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
            loc: {
              section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
              para: '19'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
          }
        },
        {
          id: 'q8',
          text: 'In addition, the Nuremberg Charter’s reference to “crimes against peace,” “war crimes,” and “crimes against humanity” represented the first time these terms were used and defined in an adopted international instrument.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
            loc: {
              section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
              para: '19'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
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
            value: { d: '1945-08-08' },
            cites: [
              { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '204' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In August 1945, the four major Allied powers therefore signed the 1945 London Agreement, which established the IMT.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '4'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-10-01' },
            cites: [
              {
                source: 'lemo-chronik-1946',
                loc: { section: 'Jahreschronik 1946', para: '123' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The tribunal found nineteen individual defendants guilty and sentenced them to punishments that ranged from death by hanging to fifteen years’ imprisonment. Three defendants were found not guilty, one committed suicide prior to trial, and one did not stand trial due to physical or mental illness.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '10'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1945-1952/nuremberg'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Defendants_G%C3%B6ring%2C_D%C3%B6nitz%2C_and_Hess_conferring_Nuremberg_Trials.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Defendants_G%C3%B6ring,_D%C3%B6nitz,_and_Hess_conferring_Nuremberg_Trials.jpeg',
    credit: {
      institution: 'Harvard Law School Library',
      creator: 'United States Army Signal Corps photographer'
    },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'nuremberg-trial-reel-1946-03',
      mediaKind: 'video',
      title: 'War Crimes Trials, Nuremberg, Germany, 03/21/1946 - 03/22/1946',
      url: 'https://archive.org/download/ADC-5831/ADC-5831.mp4',
      page: 'https://archive.org/details/ADC-5831',
      credit: {
        institution: 'wwIIarchive collection (Internet Archive)',
        creator: 'United States. Army'
      },
      license: { id: 'public-domain' },
      bytes: 75741916,
      date: { d: '1946-03-21' },
      durationSec: 726
    }
  ]
})
