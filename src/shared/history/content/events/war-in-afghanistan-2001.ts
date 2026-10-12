import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'war-in-afghanistan-2001',
  names: [
    { text: 'War in Afghanistan', lang: 'en', role: 'primary' },
    {
      text: 'Operation Enduring Freedom',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '15' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '2001-10-07' },
        cites: [
          {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '12' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2021-08' },
        cites: [
          {
            source: 'millercenter-perry-biden-foreign-affairs',
            loc: { section: 'Joe Biden: Foreign Affairs', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'south-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:afghanistan',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
        }
      ]
    },
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'hrw-2022-world-report-afghanistan',
          loc: { section: 'World Report 2022: Afghanistan', para: '3' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-life-in-brief',
          loc: { section: 'George W. Bush: Life in Brief', para: '12' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'taliban',
      name: 'Taliban',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
        }
      ]
    },
    {
      key: 'us-led-coalition',
      name: 'United States and coalition partners',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '15' }
        }
      ]
    },
    {
      key: 'northern-alliance',
      name: 'Northern Alliance',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '13' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:george-w-bush',
      role: 'head-of-state',
      side: 'us-led-coalition',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '14' }
        }
      ]
    },
    {
      ref: 'person:barack-obama',
      role: 'head-of-state',
      side: 'us-led-coalition',
      cites: [
        {
          source: 'millercenter-nelson-obama-foreign-affairs',
          loc: { section: 'Barack Obama: Foreign Affairs', para: '4' }
        }
      ]
    },
    {
      name: 'Joe Biden',
      role: 'head-of-state',
      side: 'us-led-coalition',
      cites: [
        {
          source: 'millercenter-perry-biden-foreign-affairs',
          loc: { section: 'Joe Biden: Foreign Affairs', para: '13' }
        }
      ]
    },
    {
      ref: 'person:osama-bin-laden',
      role: 'leader',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
        }
      ]
    },
    {
      name: 'Hamid Karzai',
      role: 'leader',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
        }
      ]
    },
    {
      name: 'Tommy Franks',
      role: 'commander',
      side: 'us-led-coalition',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '15' }
        }
      ]
    },
    {
      name: 'Stanley McChrystal',
      role: 'commander',
      side: 'us-led-coalition',
      cites: [
        {
          source: 'millercenter-nelson-obama-foreign-affairs',
          loc: { section: 'Barack Obama: Foreign Affairs', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:september-11-attacks',
      rel: 'response-to',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-life-in-brief',
          loc: { section: 'George W. Bush: Life in Brief', para: '12' }
        }
      ]
    },
    {
      ref: 'event:soviet-afghan-war',
      rel: 'related',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '21' }
        }
      ]
    },
    {
      ref: 'event:iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '13' }
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
          text: 'On October 7, 2001, coordinated American military attacks began in Afghanistan against al Qaeda terrorist training camps and military installations of the Taliban regime, which had supported al Qaeda.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        },
        {
          id: 'q2',
          text: 'What seemed like a quick and easy war against a Third World nation and terrorist group, however, would become the longest war in American history.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-life-in-brief',
            loc: { section: 'George W. Bush: Life in Brief', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/life-in-brief'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Taliban, an extremist Islamic regime that controlled Afghanistan, offered bin Laden sanctuary, and al Qaeda trained thousands of terrorists in camps located in that country.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q4',
          text: 'Prior to September 11, the United States had funneled CIA funds to the anti-Taliban group, the Northern Alliance, to combat the Taliban and al Qaeda forces in Afghanistan.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q5',
          text: 'General Tommy Franks’s war plan, which became known as “Operation Enduring Freedom,” consisted of four phases.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'After the Taliban takeover of the country in August, the protracted Afghanistan conflict abruptly gave way to an accelerating human rights and humanitarian crisis.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-world-report-afghanistan',
            loc: { section: 'World Report 2022: Afghanistan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20220113064739/https://www.hrw.org/world-report/2022/country-chapters/afghanistan'
          }
        },
        {
          id: 'q7',
          text: 'The Taliban victory propelled Afghanistan from humanitarian crisis to catastrophe, with millions of Afghans facing severe food insecurity due to lost income, cash shortages, and rising food costs.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-world-report-afghanistan',
            loc: { section: 'World Report 2022: Afghanistan', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20220113064739/https://www.hrw.org/world-report/2022/country-chapters/afghanistan'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The Taliban immediately rolled back women’s rights advances and media freedom—among the foremost achievements of the post-2001 reconstruction effort.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-world-report-afghanistan',
            loc: { section: 'World Report 2022: Afghanistan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20220113064739/https://www.hrw.org/world-report/2022/country-chapters/afghanistan'
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
            value: { d: '2001-10-07' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-life-in-brief',
                loc: { section: 'George W. Bush: Life in Brief', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Taliban was quickly driven from power, and members of al Qaeda fled into the mountains or across the borders to find refuge.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-life-in-brief',
          loc: { section: 'George W. Bush: Life in Brief', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/life-in-brief'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-11' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'By early November, Special Forces and the Northern Alliance had liberated Mazar-i-Sharif, a strategic city in northern Afghanistan; most of the major northern cities fell soon after, forcing the Taliban to retreat from Kabul into the mountains of the South and East.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2001-12-07' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Hamid Karzai, leader of southern oppositions forces, joined with Marines to take Kandahar on December 7, 2001, forcing the remaining Taliban and al Qaeda members to flee to the eastern border.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2002' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In early 2002, “Operation Anaconda” effectively drove out the remaining Taliban and al Qaeda combatants.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2006' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-foreign-affairs',
                loc: { section: 'George W. Bush: Foreign Affairs', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'By the summer of 2006, attacks throughout Afghanistan had drastically increased.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-foreign-affairs',
          loc: { section: 'George W. Bush: Foreign Affairs', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-12-01' },
            cites: [
              {
                source: 'millercenter-nelson-obama-foreign-affairs',
                loc: { section: 'Barack Obama: Foreign Affairs', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'After an extended series of meetings beginning in September, Obama announced in a speech on December 1, 2009, at West Point that he had approved a short-term surge of 33,000 troops with a proviso that American forces must begin to withdraw from Afghanistan in July 2011.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-foreign-affairs',
          loc: { section: 'Barack Obama: Foreign Affairs', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2011-05-02' },
            cites: [
              {
                source: 'millercenter-nelson-obama-foreign-affairs',
                loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Buttressing Obama’s credentials on military matters was the May 2, 2011, killing of al Qaeda’s leader, Osama bin Laden, by a team of Navy SEALS.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-foreign-affairs',
          loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2014' },
            cites: [
              {
                source: 'millercenter-nelson-obama-foreign-affairs',
                loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'After the 2010 midterm elections, congressional Republicans were much more interested in domestic policy than foreign policy, which allowed President Obama to accomplish a complete disengagement of US forces, at least in terms of active combat, from Afghanistan by 2014.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-foreign-affairs',
          loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2020-02' },
            cites: [
              {
                source: 'millercenter-perry-biden-foreign-affairs',
                loc: { section: 'Joe Biden: Foreign Affairs', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'After President Trump reached a peace agreement with the Taliban in February 2020 that called for the withdrawal of all U.S. troops from Afghanistan, President Biden finally had the opportunity to follow through on that withdrawal.',
        lang: 'en',
        cite: {
          source: 'millercenter-perry-biden-foreign-affairs',
          loc: { section: 'Joe Biden: Foreign Affairs', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/biden/foreign-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2021-08-15' },
            cites: [
              {
                source: 'hrw-2022-world-report-afghanistan',
                loc: { section: 'World Report 2022: Afghanistan', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'As the Taliban entered Kabul on August 15, thousands of people tried to flee the country, but chaos and violence at the airport impeded the evacuation of many at-risk Afghans.',
        lang: 'en',
        cite: {
          source: 'hrw-2022-world-report-afghanistan',
          loc: { section: 'World Report 2022: Afghanistan', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20220113064739/https://www.hrw.org/world-report/2022/country-chapters/afghanistan'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Canadian_and_Afghan_National_Army_soldiers_patrol_in_Badula_Qulp_during_Operation_Moshtarak.jpg/1280px-Canadian_and_Afghan_National_Army_soldiers_patrol_in_Badula_Qulp_during_Operation_Moshtarak.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Canadian_and_Afghan_National_Army_soldiers_patrol_in_Badula_Qulp_during_Operation_Moshtarak.jpg',
    credit: { institution: 'ISAF Headquarters Public Affairs Office' },
    license: { id: 'public-domain' }
  }
})
