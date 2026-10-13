import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'beslan-school-siege',
  names: [
    { text: 'Beslan school siege', lang: 'en', role: 'primary' },
    {
      text: 'Beslan school hostage crisis',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
          loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '2004-09-01' },
        cites: [
          {
            source: 'hrw-2019-remembering-beslan-15-years-later',
            loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
          },
          {
            source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
            loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2004-09-03' },
        cites: [
          {
            source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
            loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:beslan',
      cites: [
        {
          source: 'hrw-2019-remembering-beslan-15-years-later',
          loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'hostage-takers',
      name: 'Armed group of hostage-takers',
      cites: [
        {
          source: 'hrw-2019-remembering-beslan-15-years-later',
          loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
        }
      ]
    },
    {
      key: 'russian-forces',
      name: 'Russian security forces',
      cites: [
        {
          source: 'hrw-2019-remembering-beslan-15-years-later',
          loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:vladimir-putin',
      role: 'head-of-state',
      side: 'russian-forces',
      cites: [
        {
          source: 'hrw-2005-world-report-russia',
          loc: { section: 'World Report 2005: Russia', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 314 },
            cites: [
              {
                source: 'hrw-2019-remembering-beslan-15-years-later',
                loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          },
          {
            value: { min: 325, qualifier: 'over' },
            cites: [
              {
                source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
                loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Joint NGO statement of 8 September 2004' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:second-chechen-war',
      rel: 'response-to',
      cites: [
        {
          source: 'hrw-2019-remembering-beslan-15-years-later',
          loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
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
          text: 'On Sept. 1, 2004, a group of three dozen Chechen-led armed militants took more than 1,100 local residents hostage at Beslan School #1, located in Russia’s North Caucasus.',
          lang: 'en',
          cite: {
            source: 'hrw-2019-remembering-beslan-15-years-later',
            loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240409111047/https://www.hrw.org/news/2019/08/30/remembering-beslan-15-years-later'
          }
        },
        {
          id: 'q2',
          text: 'In 2004 Russia endured the worst terrorist attack in its modern history.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-russia',
            loc: { section: 'World Report 2005: Russia', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303050840/https://www.hrw.org/world-report/2005/country-chapters/russia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The actions taken by the armed group: taking over 1000 people as hostages, including young children – the most vulnerable members of society; depriving them of food and water for over 48 hours; issuing repeated death threats against them; and the subsequent deliberate killing of many hostages – are all flagrant abuses of international and domestic law.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
            loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303134835/https://www.hrw.org/news/2004/09/07/joint-ngo-statement-beslan-hostage-tragedy'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'The death toll was 314 hostages, including 186 children.',
          lang: 'en',
          cite: {
            source: 'hrw-2019-remembering-beslan-15-years-later',
            loc: { section: 'Remembering Beslan 15 Years Later', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240409111047/https://www.hrw.org/news/2019/08/30/remembering-beslan-15-years-later'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'In September 2004, a few days after the worst terrorist attack in Russia’s history ended in the massacre of hundreds of children, their parents and teachers at a school in Beslan, North Ossetia, Putin revealed his vision. In a speech to the nation, he linked terrorism to the collapse of the Soviet Union and the deficiencies of Russia’s transition to democracy, and announced a package of political measures that would take the Kremlin’s already overwhelming dominance of Russian politics to a new level. The proposals would give the president de facto power to appoint governors, even more sway over the parliament, or State Duma, and increase the executive’s influence over the judiciary.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-russia',
            loc: { section: 'World Report 2005: Russia', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303050840/https://www.hrw.org/world-report/2005/country-chapters/russia'
          }
        },
        {
          id: 'q6',
          text: 'For years, local activists have argued in Russian courts that the authorities were responsible for the deaths of many hostages.',
          lang: 'en',
          cite: {
            source: 'hrw-2019-remembering-beslan-15-years-later',
            loc: { section: 'Remembering Beslan 15 Years Later', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240409111047/https://www.hrw.org/news/2019/08/30/remembering-beslan-15-years-later'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The government paid the complainants close to 3 million euros in compensation.',
          lang: 'en',
          cite: {
            source: 'hrw-2019-remembering-beslan-15-years-later',
            loc: { section: 'Remembering Beslan 15 Years Later', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240409111047/https://www.hrw.org/news/2019/08/30/remembering-beslan-15-years-later'
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
            value: { d: '2004-09-01' },
            cites: [
              {
                source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
                loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The crisis began on 1 September when armed men and women burst into the school as approximately one thousand children, their parents and teachers had gathered to celebrate the beginning of the academic year.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
          loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240303134835/https://www.hrw.org/news/2004/09/07/joint-ngo-statement-beslan-hostage-tragedy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-09-03' },
            cites: [
              {
                source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
                loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The armed group held the hostages without food or drinking water for over 48 hours before Russian security forces, at approximately 13:00 on 3 September, stormed the school in circumstances that still remain unclear.',
        lang: 'en',
        cite: {
          source: 'hrw-2004-09-08-joint-ngo-statement-on-the-beslan-hostage-tragedy',
          loc: { section: 'Joint NGO statement on the Beslan Hostage Tragedy', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240303134835/https://www.hrw.org/news/2004/09/07/joint-ngo-statement-beslan-hostage-tragedy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2017-04' },
            cites: [
              {
                source: 'hrw-2019-remembering-beslan-15-years-later',
                loc: { section: 'Remembering Beslan 15 Years Later', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'When Russia’s judicial system failed them, they sought justice at the European Court of Human Rights. In April 2017, the court delivered its ruling, finding the Russian government responsible for violating the right to life, including “the use of lethal force by security forces,” and for failing to provide victims an effective legal remedy.',
        lang: 'en',
        cite: {
          source: 'hrw-2019-remembering-beslan-15-years-later',
          loc: { section: 'Remembering Beslan 15 Years Later', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240409111047/https://www.hrw.org/news/2019/08/30/remembering-beslan-15-years-later'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Beslan_Memorial.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Beslan_Memorial.jpg',
    credit: { creator: 'Konstantin Farniev' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
