import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'accession-of-abbas-i',
  names: [
    { text: 'Accession of Abbas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1588-10-01' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1587' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '30' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1586' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1072' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:qazvin',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
      ]
    },
    {
      name: 'Solṭān Moḥammad Shah',
      role: 'head-of-state',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
      ]
    },
    {
      name: 'Moršed-qolī Khan Ostāǰlū',
      role: 'organizer',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:death-of-tahmasp-i-and-the-succession-crisis',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '29' }
        }
      ]
    },
    {
      ref: 'event:abbas-is-military-reforms',
      rel: 'led-to',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ʿAbbās Mirzā was next enthroned as Shah ʿAbbās, although Moršedqoli Khan continued to wield supreme authority for some time to come.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q13',
          text: 'Shah ʽAbbas the Great commenced his long and glorious reign (1586) by retracing his steps towards Khorasan, which had been reinvaded by the Uzbegs almost immediately after his departure thence with the Kizil-bash chief.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1072' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Ḵodā-banda’s weak rule spawned several Qezelbāš revolts, the most important of which occurred in Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q3',
          text: 'In Rabīʿ I, 989/April-May, 1581, when ʿAbbās was only ten years old, a group of rival Qezelbāš amirs of the Ostāǰlū and Šāmlū tribes swore allegiance to the young prince and raised the standard of revolt in Khorasan.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q4',
          text: 'In 993/1585, the ambitious Qezelbāš chief, Moršed-qolī Khan Ostāǰlū, governor of Ḵᵛāf and Bāḵarz, seized possession of Mašhad.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q14',
          text: 'One of the insurgents, the Šāmlu amir ʿAliqoli Khan, used ʿAbbās Mirzā, Ḵodā-banda’s young son who had been sent to the east as governor, as a protégé, declaring him shah in 1581.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q15',
          text: 'When ʿAliqoli Khan’s revolt was quelled, ʿAbbās Mirzā was adopted by Moršedqoli Khan, a member of the Ostājlu.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q16',
          text: 'Together they marched on Qazvin, forcing the shah to abdicate.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'While Moršed-qolī Khan Ostāǰlū debated whether to take the risk of marching to Qazvīn to install ʿAbbās Mīrzā on the throne, a major invasion of Khorasan by the Uzbeks in Moḥarram, 996/December, 1587, decided the issue.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'From the moment of his accession, Shah ʿAbbās realized that he must impose his authority on the Qezelbāš or remain their tool.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q9',
          text: 'The formative years of Shah ʿAbbās had thus been marked by the factionalism of the Qezelbāš tribes.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
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
            value: { d: '1581-04', notAfter: '1581-05' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Coins were minted in the name of ʿAbbās, and his name was mentioned in the ḵoṭba.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '2' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1586' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '3' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Following the assassination of Ḥamza Mīrzā while on campaign against the Ottomans (994/1586), the Ostāǰlū faction at Qazvīn supported the claims of Abū Ṭāleb, another brother of ʿAbbās, as heir apparent, but an attempt to put Abū Ṭāleb on the throne also proved abortive.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '3' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1588-10-01' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'When he reached Qazvīn, a popular demonstration in favor of ʿAbbās won over the remaining waverers, and on 10 Ḏu’l-qaʿda 996/1 October 1588, Solṭān Moḥammad Shah handed the insignia of royalty to his son, who, at the age of seventeen, was crowned Shah ʿAbbās I. Moršed-qolī Khan Ostāǰlū, to whom he owned the throne, was rewarded with the office of vakīl-e dīvān-e ʿālī (deputy of the court), which made him the most powerful man in the kingdom.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/A_Safavid_portrait_of_Shah_Abbas_%281571-1629%29_as_a_young_man%2C_Iran%2C_c._1590%2C_with_a_scene_from_Layla_and_Majnun_above.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_Safavid_portrait_of_Shah_Abbas_(1571-1629)_as_a_young_man,_Iran,_c._1590,_with_a_scene_from_Layla_and_Majnun_above.jpg',
    credit: { institution: 'Roseberys' },
    license: { id: 'public-domain' }
  }
})
