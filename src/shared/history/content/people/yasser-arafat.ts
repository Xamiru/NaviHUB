import { definePerson } from '../../schema'

export default definePerson({
  id: 'yasser-arafat',
  names: [
    { text: 'Yasser Arafat', lang: 'en', role: 'primary' },
    { text: 'ياسر عرفات', lang: 'ar', role: 'native' },
    {
      text: 'Yasir Arafat',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-jordan-country-study-1989',
          loc: { section: 'THE RABAT SUMMIT CONFERENCE', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1929' },
        cites: [
          {
            source: 'lc-names-arafat-yasir-n83055228',
            loc: { section: 'Arafat, Yasir, 1929-2004' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2004' },
        cites: [
          {
            source: 'lc-names-arafat-yasir-n83055228',
            loc: { section: 'Arafat, Yasir, 1929-2004' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'Chairman of the Palestine Liberation Organization',
      cites: [
        {
          source: 'loc-jordan-country-study-1989',
          loc: { section: 'THE RABAT SUMMIT CONFERENCE', para: '4' }
        },
        {
          source: 'loc-jordan-country-study-1989',
          loc: { section: 'The Israeli Invasion of Lebanon', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Bundesarchiv_Bild_183-1982-0310-027%2C_Berlin%2C_Yasser_Arafat%2C_Erich_Honecker.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1982-0310-027,_Berlin,_Yasser_Arafat,_Erich_Honecker.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'Rainer Mittelstädt' },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In late November 1974, the UN recognized PLO representation of the Palestinian people, and PLO Chairman Yasir Arafat addressed the General Assembly in Arabic, his pistol at his side.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'THE RABAT SUMMIT CONFERENCE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/jordan/16.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'PLO chairman Yasir Arafat, considerably weakened by the PLO\'s devastating defeat in the war in Lebanon, needed Jordanian support to gain access to the political process.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'The Israeli Invasion of Lebanon', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/jordan/23.htm' }
        },
        {
          id: 'q3',
          text: 'Whereas Hussein saw the proposed confederation as a means to reestablish Jordanian control over the West Bank, Arafat viewed the negotiations as a means to gain PLO sovereignty over the occupied territories.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'The Israeli Invasion of Lebanon', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/jordan/23.htm' }
        },
        {
          id: 'q4',
          text: 'On October 13, Hussein and Arafat signed a further agreement in Amman, under which the fedayeen were to recognize Jordanian sovereignty and the king\'s authority, to withdraw their armed forces from towns and villages, and to refrain from carrying arms outside their camps. In return the government agreed to grant amnesty to the fedayeen for incidents that had occurred during the civil war.',
          lang: 'en',
          cite: {
            source: 'loc-jordan-country-study-1989',
            loc: { section: 'Hussein - The Guerrilla Crisis', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/jordan/14.htm' }
        },
        {
          id: 'q5',
          text: 'In October 1998, Clinton hosted Netanyahu and Arafat at the Wye River Plantation, where they negotiated an agreement calling for further Israeli withdrawals from the West Bank.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q6',
          text: 'In September, Barak signed the Sharm al-Shaykh Memorandum with Arafat, which committed both sides to begin permanent status negotiations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q7',
          text: 'The summit ended without a settlement; Clinton would blame Arafat for its failure.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'In the name of God, the most merciful, the passionate, Mr. President, ladies and gentlemen, I would like to express our tremendous appreciation to President Clinton and to his administration for sponsoring this historic event which the entire world has been waiting for.',
          lang: 'en',
          cite: {
            source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
            loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1993/09/1993-09-13-remarks-by-the-president-and-others-at-israel-palestinian-sig.html'
          }
        },
        {
          id: 'q9',
          text: 'And let me assure them that the difficult decision we reached together was one that required great and exceptional courage.',
          lang: 'en',
          cite: {
            source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
            loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1993/09/1993-09-13-remarks-by-the-president-and-others-at-israel-palestinian-sig.html'
          }
        },
        {
          id: 'q10',
          text: 'Our two peoples are awaiting today this historic hope, and they want to give peace a real chance.',
          lang: 'en',
          cite: {
            source: 'clinton-1993-09-13-remarks-at-the-signing-of-the-israel-palestinian-agreement',
            loc: { section: 'Remarks at the signing of the Israel-Palestinian agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse6.archives.gov/1993/09/1993-09-13-remarks-by-the-president-and-others-at-israel-palestinian-sig.html'
          }
        }
      ]
    }
  ]
})
