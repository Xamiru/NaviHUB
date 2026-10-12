import { definePerson } from '../../schema'

export default definePerson({
  id: 'mahmoud-ahmadinejad',
  names: [
    { text: 'Mahmoud Ahmadinejad', lang: 'en', role: 'primary' },
    { text: 'محمود احمدی‌نژاد', lang: 'fa', role: 'native' },
    { text: 'Mahmoud Ahmadi Nejad', lang: 'en', role: 'alternative' },
    { text: 'Maḥmud Aḥmadinežād', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1955', notAfter: '1956' },
        cites: [
          {
            source: 'lc-names-ahmadinejad-mahmoud-n2006056194',
            loc: { section: 'Ahmadinejad, Mahmoud' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      },
      {
        value: { d: '1965', notAfter: '1966' },
        cites: [
          {
            source: 'lc-names-ahmadinejad-mahmoud-n2006056194',
            loc: { section: 'Ahmadinejad, Mahmoud' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'Mayor of Tehran',
      end: {
        alts: [
          {
            value: { d: '2005' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 2005' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2005' }
        }
      ]
    },
    {
      title: 'President of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '2005-08' },
            cites: [
              {
                source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
                loc: { section: 'Ministers of Murder: Introduction', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '2013' },
            cites: [
              {
                source: 'hrw-2014-world-report-iran',
                loc: { section: 'World Report 2014: Iran', para: '4' }
              },
              {
                source: 'lc-names-ahmadinejad-mahmoud-n2006056194',
                loc: { section: 'Iran. President (2005-2013 : Ahmadinejad)' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
          loc: { section: 'Ministers of Murder: Introduction', para: '1' }
        },
        {
          source: 'lc-names-ahmadinejad-mahmoud-n2006056194',
          loc: { section: 'Iran. President (2005-2013 : Ahmadinejad)' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Mahmoud_Ahmadinejad_16-17_October_2007.jpg/1280px-Mahmoud_Ahmadinejad_16-17_October_2007.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmoud_Ahmadinejad_16-17_October_2007.jpg',
    credit: { institution: 'Presidential Press and Information Office (Russia)' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In June 2005, Iranians elected Mahmoud Ahmadinejad, who had campaigned on a platform of improving economic conditions, as their new president.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
          }
        },
        {
          id: 'q2',
          text: 'Ahmadinejad assumed his new post in early August 2005 with the backing of those political factions in Iran who most vigorously opposed political and social reforms initiated by his predecessor, Mohammad Khatami.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Maḥmud Aḥmadinežād, the fundamentalist mayor of Tehran, is elected president of Iran, defeating ʿAli-Akbar Hāšemi Rafsanjāni.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2005' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q4',
          text: 'Ahmadinejad, a former Revolutionary Guard Corps officer, appointed another former officer in the Corps, Ḥosayn Ṣaffār Harandi, as Minister of Culture and Islamic Guidance, who for ten years had edited the daily, Kayhān, attacking the reform movement and liberal journalists and intellectuals. Ṣaffār Harandi’s first year in office saw three very prominent newspaper closures, which highlighted the continued serious assault on the Iranian media and the demise of its relationship with the state.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q5',
          text: 'Only months into his term, amid intensified American and Israeli threats against Iran over its nuclear program, Aḥmadi-nežād heated up Iran’s anti-Israel rhetoric by making inflammatory statements.',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
            loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '82' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/israel-i-relations-with-iran/'
          }
        },
        {
          id: 'q6',
          text: 'Particularly troubling are President Ahmadinejad’s choices for the powerful positions of Minister of Interior, Mustafa Pour-Mohammadi, and Minister of Information, Gholamhussein Mohseni Ezhei.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-12-ministers-of-murder-irans-new-security-cabinet-introduction',
            loc: { section: 'Ministers of Murder: Introduction', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/1.htm'
          }
        }
      ]
    }
  ]
})
