import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-england',
  names: [
    { text: 'Kingdom of England', lang: 'en', role: 'primary' },
    {
      text: 'England',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-united-kingdom',
          loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '0959-10' },
        cites: [
          { source: 'britannica-1911-edgar-king', loc: { section: 'Edgar, King', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1707' },
        cites: [
          {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1272' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 179876, to: 1700 },
    { set: 'early', code: 330362, from: 1649, to: 1660 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Coat_of_Arms_of_England_%281558-1603%29.svg/1280px-Coat_of_Arms_of_England_%281558-1603%29.svg.png',
    page: 'https://commons.wikimedia.org/wiki/File:Coat_of_Arms_of_England_(1558-1603).svg',
    credit: { creator: 'Sodacan' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On the death of his brother in October 959 Edgar became king of a united England.',
          lang: 'en',
          cite: { source: 'britannica-1911-edgar-king', loc: { section: 'Edgar, King', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Edgar,_King'
          }
        },
        {
          id: 'q2',
          text: '“Great Britain” was employed as a formal designation from the time of the union of the kingdoms of England and Scotland in 1707.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_Kingdom'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'An independent national Church was formed in 1534, continued, however, for a time to adhere to all the characteristic beliefs of the medieval Catholic Church, excepting alone the headship of the pope.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-reformation',
            loc: { section: 'Reformation', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q4',
          text: 'The Protestant martyrs and Calais between them removed all the alternatives to an insular national English policy in church and in state; and no sovereign was better qualified to lead such a cause than the queen who ascended the throne amid universal, and the Spaniards thought indecent, rejoicings at Mary’s death on the 17th of November 1558.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-elizabeth-of-england',
            loc: { section: 'Elizabeth of England', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Elizabeth_of_England'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The Spanish or Invincible Armada was the great fleet (in Spanish, armada) sent against England by Philip II. in 1588.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        },
        {
          id: 'q6',
          text: 'On the 22nd of August the king set up his standard at Nottingham, and on the 23rd of October he fought the indecisive battle of Edgehill, occupying Oxford and advancing as far as Brentford.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-charles-i-king-of-england',
            loc: { section: 'Charles I. (King of England)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_I._(King_of_England)'
          }
        },
        {
          id: 'q7',
          text: 'The king and the monarchy being now destroyed in England, Cromwell had next to turn his attention to the suppression of royalism in Ireland and in Scotland.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        },
        {
          id: 'q8',
          text: 'Cromwell, who had no desire to exercise arbitrary power and whose main object therefore was to devise some constitutional limit to the authority which circumstances had placed in his hands, now accepted the written constitution drawn up by some of the officers, called the Instrument of Government, the earliest example of a “fixed government” based on “fundamentals,” or constitutional guarantees, and the only example of it in English history.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        },
        {
          id: 'q9',
          text: 'No event in the history of England had been attended with more lively and general rejoicing than Charles’s restoration, and none was destined to cause greater subsequent disappointment and disillusion.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-charles-ii-king-of-england',
            loc: { section: 'Charles II. (King of England)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Charles_II._(King_of_England)'
          }
        },
        {
          id: 'q10',
          text: 'A constitutional settlement was effected by the end of 1689, almost all the disputed points between king and parliament being settled in favour of the latter.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-iii-king-of-england',
            loc: { section: 'William III., King of England', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'By the Act of Union in 1707 Scotland ceased to have a separate parliament, and its government was assimilated to that of England.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1268' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        }
      ]
    }
  ]
})
