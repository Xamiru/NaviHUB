import { definePerson } from '../../schema'

export default definePerson({
  id: 'massoud-rajavi',
  names: [
    { text: 'Massoud Rajavi', lang: 'en', role: 'primary' },
    { text: 'مسعود رجوی', lang: 'fa', role: 'native' },
    {
      text: 'Masʻūd Rajavī',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'lc-names-rajavi-masud-n83181861', loc: { section: 'Rajavī, Masʻūd' } }
      ]
    }
  ],
  researched: '2026-10-10',
  regions: ['iran'],
  roles: ['revolutionary', 'politician'],
  offices: [
    {
      title: 'Leader of the Mojahedin-e Khalq (People\'s Mojahedin of Iran)',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Islamic Groups', para: '8' }
        }
      ]
    },
    {
      title: 'Co-founder of the National Council of Resistance',
      start: {
        alts: [
          {
            value: { d: '1981-07' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '2' }
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
          text: 'Rajavi, the leader of the Mojahedin, managed to escape from Iran with Bani Sadr in July 1981. In France he reorganized the Mojahedin and tried to broaden its appeal by inviting all nonmonarchist parties to join the National Council of Resistance, which he and Bani Sadr established to coordinate opposition activities.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Islamic Groups', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/96.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In 1987 the principal Islamic party in opposition to the government of Iran was the Mojahedin, which had been founded in 1965 by a group of religiously inspired young Shias.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Islamic Groups', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/96.htm' }
        },
        {
          id: 'q3',
          text: 'By 1981 the only political party that could seriously challenge the IRP was the Mojahedin.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Islamic Republican Party', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/95.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Bani Sadr remained in hiding for several weeks. Believing he was illegally impeached, he maintained his claim to the presidency, formed an alliance with Mojahedin leader Masoud Rajavi, and in July 1981 escaped with Rajavi from Iran to France.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q5',
          text: 'In Paris, Bani Sadr and Rajavi announced the establishment of the National Council of Resistance (NCR) and committed themselves to work for the overthrow of the Khomeini regime.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q6',
          text: 'In September 1981, expecting to spark a general uprising, the Mojahedin sent their young followers into the streets to demonstrate against the government and to confront the authorities with their own armed contingents. On September 27, the Mojahedin used machine guns and rocket-propelled grenade launchers against units of the Pasdaran.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Terror and Repression', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q7',
          text: 'Although most of the political parties refrained from cooperating with the Mojahedin, it nevertheless was most successful in recruiting new members and establishing a loyal following in United States and West European cities with sizable Iranian communities. From the perspective of the other political parties, one of the Mojahedin\'s most controversial positions was its public endorsement of direct contacts with Iraq, beginning in 1983. This was a contentious issue even within the National Council of Resistance and eventually led to Bani Sadr\'s break with Rajavi in 1984.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Islamic Groups', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/96.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q8',
          text: 'Witnesses also accused fighters from the Iranian opposition organization Mojahedin-i-Khalq (People\'s Mojahedin of Iran) and Jordanian, Sudanese, Palestinian and Yemeni mercenaries of helping to suppress the uprising. They claimed to recognize the fighters\' nationalities from their appearance or accents. While the testimony collected was persuasive that the Mojahedin-i-Khalq and foreign mercenaries helped Iraqi soldiers to crush the uprising, it was not possible to assess how important a role these various groups played.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '36'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q9',
          text: 'Assad-Allāh Lājevardi, former head of Iran’s notorious Evin prison, is assassinated. The militant opposition group Mojāhedin-e ḵalq claim responsibility.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1998' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q10',
          text: 'The annual U.S. report on terrorism listed the Iranian opposition groups the National Council of Resistance and the People\'s Mojahedine Organization as terrorist organizations.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '38' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    }
  ]
})
