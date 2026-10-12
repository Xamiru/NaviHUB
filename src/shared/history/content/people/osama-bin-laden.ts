import { definePerson } from '../../schema'

export default definePerson({
  id: 'osama-bin-laden',
  names: [
    { text: 'Osama bin Laden', lang: 'en', role: 'primary' },
    {
      text: 'Usama Bin Ladin',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'national-commission-2004-9-11-commission-report-executive-summary',
          loc: { section: 'Executive Summary', para: '20' }
        }
      ]
    },
    { text: 'أسامة بن محمد بن لادن', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-12',
  born: {
    alts: [
      {
        value: { d: '1957' },
        cites: [
          {
            source: 'lc-names-bin-laden-osama-n98940446',
            loc: { section: 'Bin Laden, Osama, 1957-2011' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2011-05-02' },
        cites: [
          {
            source: 'millercenter-nelson-obama-foreign-affairs',
            loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
          },
          {
            source: 'lc-names-bin-laden-osama-n98940446',
            loc: { section: 'Bin Laden, Osama, 1957-2011' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:abbottabad',
    cites: [
      {
        source: 'millercenter-nelson-obama-foreign-affairs',
        loc: { section: 'Barack Obama: Foreign Affairs', para: '6' }
      }
    ]
  },
  regions: ['mena'],
  roles: ['other'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Osama_bin_Laden_full_portrait_%283x4_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Osama_bin_Laden_full_portrait_(3x4_cropped).jpg',
    credit: { creator: 'Hamid Mir' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The 9/11 attack was driven by Usama Bin Ladin.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Twenty-three when he arrived in Afghanistan in 1980, Bin Ladin was the seventeenth of 57 children of a Saudi construction magnate.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-2',
            loc: { section: 'The Foundation of the New Terrorism', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
          }
        },
        {
          id: 'q3',
          text: 'Bin Ladin was conspicuous among the volunteers not because he showed evidence of religious learning but because he had access to some of his family\'s huge fortune.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-2',
            loc: { section: 'The Foundation of the New Terrorism', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Bin Ladin and Azzam agreed that the organization successfully created for Afghanistan should not be allowed to dissolve.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-2',
            loc: { section: 'The Foundation of the New Terrorism', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
          }
        },
        {
          id: 'q5',
          text: 'By this time, Bin Ladin was well-known and a senior figure among Islamist extremists, especially those in Egypt, the Arabian Peninsula, and the Afghanistan-Pakistan border region.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-chapter-2',
            loc: { section: 'The Foundation of the New Terrorism', para: '71' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Ch2.htm'
          }
        },
        {
          id: 'q6',
          text: 'Until 1997, the U.S. intelligence community viewed Bin Ladin as a financier of terrorism, not as a terrorist leader.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        },
        {
          id: 'q7',
          text: 'In August 1998, Bin Ladin\'s group, al Qaeda, carried out near-simultaneous truck bomb attacks on the U.S. embassies in Nairobi, Kenya, and Dar es Salaam, Tanzania.',
          lang: 'en',
          cite: {
            source: 'national-commission-2004-9-11-commission-report-executive-summary',
            loc: { section: 'Executive Summary', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://govinfo.library.unt.edu/911/report/911Report_Exec.htm'
          }
        },
        {
          id: 'q8',
          text: 'In the words of Osama bin Laden, the Americans were “paper tigers” who could be made to “run in less than twenty-four hours.”',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '14' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q9',
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
        },
        {
          id: 'q10',
          text: 'Intelligence agencies had concluded that bin Laden was probably hiding in a residential compound near Abbottabad, Pakistan.',
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
      ]
    }
  ]
})
