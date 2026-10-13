import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-jam-1528',
  names: [
    { text: 'Battle of Jam', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1528-09-24' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    },
    {
      ref: 'polity:khanate-of-bukhara',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    },
    {
      key: 'uzbek',
      name: 'Uzbeks',
      polity: 'polity:khanate-of-bukhara',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tahmasp-i',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    },
    {
      name: 'ʿObayd-Allāh Khan',
      role: 'commander',
      side: 'uzbek',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:battle-of-marv',
      rel: 'followed-by',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } }
      ]
    },
    {
      ref: 'event:recapture-of-herat-1598',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
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
          text: 'The fourteen-year-old Ṭahmāsp led a relief force to the east and, by all accounts, acquitted himself bravely at the battle of Jām (24 September 1528).',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        },
        {
          id: 'q2',
          text: 'They besieged Herat, but in 1528 were defeated at the Battle of Jām, which they lost against superior Safavid gunpowder.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the northeast, he took on the Uzbeks, who had repeatedly invaded Khorasan, taking advantage of Persia’s military weakness.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The Safavid defeat of the Uzbeks in that encounter, thanks primarily to their introduction of gunpowder technology to this particular frontier, turned out to be rather fleeting.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        },
        {
          id: 'q5',
          text: 'After a lengthy siege and ensuing negotiations, Herat was handed over to the Uzbeks by Sām Mirzā and his tutor, Ḥosayn Khan Šāmlu, in exchange for safe passage out of Khorasan to the west.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
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
            value: { d: '1528' },
            cites: [
              {
                source: 'iranica-mitchell-tahmasp-i',
                loc: { section: 'ṬAHMĀSP I', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1528, ʿObayd-Allāh managed to re-conquer the cities of Astarābād and Mashad and lay siege to the city of Herat.',
        lang: 'en',
        cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/tahmasp-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1530' },
            cites: [
              {
                source: 'iranica-mitchell-tahmasp-i',
                loc: { section: 'ṬAHMĀSP I', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The Safavids quickly drove the Uzbeks from eastern Khorasan in the late summer of 1530, and Ṭahmāsp appointed his brother, Bahrām Mirzā, and his tutor, Ḡāzi Khan Takkalu to take charge of the province.',
        lang: 'en',
        cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/tahmasp-i'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Portrait_of_Shah_Tahmasp_circa_1531.jpg/1280px-Portrait_of_Shah_Tahmasp_circa_1531.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Shah_Tahmasp_circa_1531.jpg',
    credit: { creator: 'Sultan Muhammad' },
    license: { id: 'public-domain' }
  }
})
