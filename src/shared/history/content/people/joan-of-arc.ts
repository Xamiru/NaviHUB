import { definePerson } from '../../schema'

export default definePerson({
  id: 'joan-of-arc',
  names: [
    { text: 'Joan of Arc', lang: 'en', role: 'primary' },
    { text: 'Jeanne d’Arc', lang: 'fr', role: 'native' },
    {
      text: 'Maid of Orleans',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1412' },
        cites: [
          {
            source: 'loc-name-authority-joan-of-arc',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      },
      {
        value: { d: '1411' },
        cites: [
          { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1431-05-30' },
        cites: [
          { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '3' } },
          {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '6' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:rouen',
    cites: [
      { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '3' } }
    ]
  },
  regions: ['europe'],
  roles: ['military'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Jeanne_d%27Arc_-_Les_vies_des_femmes_c%C3%A9l%C3%A8bres.jpg/1280px-Jeanne_d%27Arc_-_Les_vies_des_femmes_c%C3%A9l%C3%A8bres.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jeanne_d%27Arc_-_Les_vies_des_femmes_c%C3%A9l%C3%A8bres.jpg',
    credit: { creator: 'Jean Pichore' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Due to her persistence, Joan, who heard voices from God telling her to save France, was granted a visit with the future king.',
          lang: 'en',
          cite: { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://guides.loc.gov/feminism-french-women-history/famous/joan-of-arc'
          }
        },
        {
          id: 'q2',
          text: 'One of the most courageous women of French history, she was ultimately used and abandoned by the King after her purpose had been served.',
          lang: 'en',
          cite: { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://guides.loc.gov/feminism-french-women-history/famous/joan-of-arc'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'In all household work she was specially proficient, her skill in the use of the needle not being excelled (she said) by that of any matron even of Rouen.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q4',
          text: 'Although her parents were in easy circumstances, Joan never learned to read or write, and received her sole religious instruction from her mother, who taught her to recite the Pater Noster, Ave Maria, and Credo.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q5',
          text: 'She heard the voices of St Michael, St Catherine and St Margaret urging her on.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'Joan succeeded in entering Orleans on the 29th of April 1429, and through the vigorous and unremitting sallies of the French the English gradually became so discouraged that on the 8th of May they raised the siege.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q7',
          text: 'In a single week (June 12 to 19), by the capture of Jargeau and Beaugency, followed by the great victory of Patay, where Talbot was taken prisoner, the English were driven beyond the Loire.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q8',
          text: 'With some difficulty the dauphin was then persuaded to set out towards Reims, which he entered with an army of 12,000 men on the 16th of July, Troyes having yielded on the way.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q9',
          text: 'Joan went into Normandy to assist the duke of Alençon, but in December returned to the court, and on the 29th she and her family were ennobled with the surname of du Lis. Unconsoled by such honours, she rode away from the court in March, to assist in the defence of Compiègne against the duke of Burgundy; and on the 24th of May she led an unsuccessful sortie against the besiegers, when she was surrounded and taken prisoner.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q10',
          text: 'By means of negotiations instigated and prosecuted with great perseverance by the university of Paris and the Inquisition, and through the persistent scheming of Pierre Cauchon, the bishop of Beauvais—a Burgundian partisan, who, chased from his own see, hoped to obtain the archbishopric of Rouen—she was sold in November by John of Luxemburg and Burgundy to the English, who on the 3rd of January 1431, at the instance of the university of Paris, delivered her over to the Inquisition for trial.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q11',
          text: 'She was still, however, the prisoner of the English, and, having been induced by those who had her in charge to resume her male clothes, she was on this account judged to have relapsed, was sentenced to death, and burned at the stake on the streets of Rouen on the 30th of May 1431.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        },
        {
          id: 'q12',
          text: 'The sentence passed on Joan of Arc was revoked by the pope on the 7th of July 1456, and since then it has been the custom of Catholic writers to uphold the reality of her divine inspiration.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'The story of Joan of Arc is so captivating that even in our modern era the French are drawn to her as a figure of national pride.',
          lang: 'en',
          cite: { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://guides.loc.gov/feminism-french-women-history/famous/joan-of-arc'
          }
        },
        {
          id: 'q14',
          text: 'She undoubtedly nerved the French at a critical time, and inspired an army of laggards and pillagers with a fanatical enthusiasm, comparable with that of Cromwell’s Puritans.',
          lang: 'en',
          cite: { source: 'britannica-1911-joan-of-arc', loc: { section: 'Joan of Arc', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q15',
          text: 'Whereupon she replied "You might very well ask me one sort of question which I would answer truly, and another sort which I would not answer."',
          lang: 'en',
          cite: {
            source: 'colby-1920-the-trial-of-joan-of-arc-1431',
            loc: { section: 'The Trial of Joan of Arc, 1431', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/1431joantrial.asp'
          }
        },
        {
          id: 'q16',
          text: 'And she added: "If you were well informed about me, you should wish that I were out of your hands. I have done nothing save by revelation."',
          lang: 'en',
          cite: {
            source: 'colby-1920-the-trial-of-joan-of-arc-1431',
            loc: { section: 'The Trial of Joan of Arc, 1431', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/1431joantrial.asp'
          }
        }
      ]
    }
  ]
})
