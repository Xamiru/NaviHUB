import { definePerson } from '../../schema'

export default definePerson({
  id: 'abdolhossein-teymourtash',
  names: [
    { text: 'Abdolhossein Teymourtash', lang: 'en', role: 'primary' },
    { text: 'عبدالحسین تیمورتاش', lang: 'fa', role: 'native' },
    { text: 'ʿAbd-al-Ḥosayn Teymūrtāš', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1933' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1933' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'diplomat'],
  offices: [
    {
      title: 'minister of the Pahlavi court',
      polity: 'polity:pahlavi-iran',
      lang: 'en',
      end: {
        alts: [
          {
            value: { d: '1932-12-24' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '36' }
              }
            ]
          },
          {
            value: { d: '1933' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
                loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
          loc: {
            section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
            para: '1'
          }
        },
        {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '32' }
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
          text: 'Indeed, in the early years the court of Reżā Shah was largely controlled by this ambitious and powerful man.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        },
        {
          id: 'q2',
          text: 'On the other hand, Teymūrtāš shared the shah’s vision of Persia’s future, and he used the court ministry as an instrument of social change and the nucleus of a modern centralized bureaucracy.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        },
        {
          id: 'q3',
          text: 'His commands were considered to be those of the shah, who announced at one cabinet meeting: “Teymūr speaks for me” (Hedāyat, p. 472).',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'The mastermind of Persia’s foreign policy during that period, Reżā Shah’s minister of court, ʿAbd-al-Ḥosayn Teymūrtāš, counted on Germany as a mediator in his negotiations with Britain and Russia in view of a more independent position for Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        },
        {
          id: 'q5',
          text: 'He was, in spite of the existence of the Council of Ministers, almost a one-man cabinet himself, concentrating power in his bands, but lacking the time to cope with all his responsibilities and problems as he interpreted the commands of his monarch, manipulated the movements of his colleagues, and preserved his own position',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        },
        {
          id: 'q6',
          text: 'One proponent of such views was the powerful court minister ʿAbd-al-­Ḥosayn Teymūrtāš, who, in a cabinet meeting in 1312 Š./1933, proposed that importation of ladies’ hats from abroad be legalized',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'In 1311 Š./1932 Teymūrtāš was dismissed; he was subsequently tried by the order of the shah and convicted of corruption and embezzlement. Five months later he was mur­dered in his prison cell',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        },
        {
          id: 'q8',
          text: 'ʿAbd-al-Ḥosayn Teymurtāš, minister of the royal court, one of the architects of the Pahlavi State and the modernization of the country, and for many years a close confidant of the Shah, is dismissed, imprisoned, and murdered in prison on the Shah’s orders.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1933' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Abdolhossein_Teymourtash.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abdolhossein_Teymourtash.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  }
})
