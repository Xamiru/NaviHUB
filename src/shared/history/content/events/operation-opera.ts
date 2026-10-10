import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'operation-opera',
  names: [
    { text: 'Operation Opera', lang: 'en', role: 'primary' },
    { text: 'Israeli strike on the Osirak reactor', lang: 'en', role: 'alternative' },
    { text: 'عملية أوبرا', lang: 'ar', role: 'alternative' },
    { text: 'מבצע אופרה', lang: 'he', role: 'native' },
    {
      text: 'Osiraq',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Search for Nuclear Technology', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1981-06-07' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Search for Nuclear Technology', para: '1' }
          },
          {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Search for Nuclear Technology', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Search for Nuclear Technology', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Search for Nuclear Technology', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'israel',
      name: 'Israel',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Search for Nuclear Technology', para: '1' }
        }
      ]
    },
    {
      key: 'iraq',
      name: 'Iraq',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Search for Nuclear Technology', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:menachem-begin',
      role: 'leader',
      side: 'israel',
      cites: [
        {
          source: 'fas-nuke-guide-osiraq-tammuz-i',
          loc: { section: 'Osiraq / Tammuz I', para: '4' }
        }
      ]
    },
    {
      name: 'Rafael Eitan',
      role: 'commander',
      side: 'israel',
      cites: [
        {
          source: 'fas-nuke-guide-osiraq-tammuz-i',
          loc: { section: 'Osiraq / Tammuz I', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'fas-nuke-guide-osiraq-tammuz-i',
          loc: { section: 'Osiraq / Tammuz I', para: '3' }
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
          text: 'On June 7, 1981, Israeli air force planes flew over Jordanian, Saudi, and Iraqi airspace to attack and destroy an Iraqi nuclear facility near Baghdad.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Search for Nuclear Technology', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/100.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Iraq established its nuclear program in the late 1960s when it acquired its first nuclear facilites.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        },
        {
          id: 'q3',
          text: 'In September 1980, at the onset of the Iran-Iraq War, the Israeli Chief of Army Intelligence urged the Iranians to bomb Osiraq.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        },
        {
          id: 'q4',
          text: 'In June 1981, Israel held Knesset elections that focused on the Likud\'s failure to stop the PLO buildup in southern Lebanon or to remove Syrian missile batteries from the Biqa (Bekaa) Valley in eastern Lebanon.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/israel/33.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The raid would have to occur before its first fuel was to be loaded, before the reactor went "hot" so as not to endanger the surrounding community.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        },
        {
          id: 'q6',
          text: 'At 15:55 on 07 June 1981, the first F-15 and F-16\'s roared off the runway from Etzion Air Force Base in the south.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        },
        {
          id: 'q7',
          text: 'To remove a potential nuclear threat and also to bolster its public image, the IDF launched a successful attack on the French-built Iraqi Osiraq (acronym for Osiris-Iraq) nuclear reactor three weeks before the elections.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/israel/33.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Iraq\'s plans to develop a nuclear generating capacity were set back by Israel\'s June 1981 bombing of the Osiraq (OsirisIraq ) reactor, then under construction.',
          lang: 'en',
          cite: { source: 'loc-iraq-country-study-1988', loc: { section: 'ELECTRICITY', para: '2' } },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/67.htm' }
        },
        {
          id: 'q9',
          text: 'With the loss of this reactor, Baghdad apparently refocused its nuclear weapons effort on producing highly enriched uranium.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        },
        {
          id: 'q10',
          text: 'After the raid, Baghdad announced that it planned to rebuild the destroyed facility. Although France agreed in principle to provide technical assistance, no definitive timetable was announced. Ultimately, France decided to forego commercially lucrative opportunities to repair the damaged Osirak reactor.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        },
        {
          id: 'q11',
          text: 'Begin interpreted widespread public approval of the attack as a mandate for a more aggressive policy in Lebanon.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Israel in Lebanon', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/israel/33.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1980-09-30' },
            cites: [
              {
                source: 'fas-nuke-guide-osiraq-tammuz-i',
                loc: { section: 'Osiraq / Tammuz I', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'No further Iranian air attacks against Iraqi nuclear facilities were identified during the rest of the seven-year war.',
        lang: 'en',
        cite: {
          source: 'fas-nuke-guide-osiraq-tammuz-i',
          loc: { section: 'Osiraq / Tammuz I', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-07' },
            cites: [
              {
                source: 'fas-nuke-guide-osiraq-tammuz-i',
                loc: { section: 'Osiraq / Tammuz I', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Iraqi defenses were caught by surprise and opened fire too late. In one minute and twenty seconds, the reactor lay in ruins.',
        lang: 'en',
        cite: {
          source: 'fas-nuke-guide-osiraq-tammuz-i',
          loc: { section: 'Osiraq / Tammuz I', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-01-19' },
            cites: [
              {
                source: 'fas-nuke-guide-osiraq-tammuz-i',
                loc: { section: 'Osiraq / Tammuz I', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On the third day of the Desert Storm air campaign, a large conventional daylight strike by 56 F-16s with unguided bombs attacked the nuclear complex, which was one of the three most heavily defended areas in Iraq. The results were assessed as very poor.',
        lang: 'en',
        cite: {
          source: 'fas-nuke-guide-osiraq-tammuz-i',
          loc: { section: 'Osiraq / Tammuz I', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Osirak_reactor_site_damage.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Osirak_reactor_site_damage.jpg',
    credit: { institution: 'National Security Archive', creator: 'Joyce Battle and William Burr' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
