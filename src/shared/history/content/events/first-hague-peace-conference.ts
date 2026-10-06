import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-hague-peace-conference',
  names: [
    { text: 'First Hague Peace Conference', lang: 'en', role: 'primary' },
    {
      text: 'Erste Haager Friedenskonferenz',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '29' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1899-05-18' },
        cites: [
          { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '28' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1899-07-29' },
        cites: [
          { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '29' } },
          { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '36' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:the-hague',
      cites: [
        {
          source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
          loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nicholas-ii',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '29' } }
      ]
    },
    {
      name: 'Léon Bourgeois',
      role: 'diplomat',
      cites: [
        {
          source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
          loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:hague-convention-iv-1907', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1899, an international conference began in The Hague on the initiative of Russia, with the general objective of “seeking the most effective means of ensuring to all peoples the benefits of a real and lasting peace.”',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        },
        {
          id: 'q2',
          text: 'Three subjects were on the agenda: arms control, troops, and military budgets; the implementation of conventions seeking to reduce, during times of war, the use of the deadliest weapons, as well as pointless suffering; and the recognition, for cases that lent themselves thereto, of the principle of arbitration “in order to prevent armed conflict between nations.”',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        },
        {
          id: 'q3',
          text: 'Auf Initiative Zar Nikolaus II. wird die Erste Haager Friedenskonferenz mit 26 teilnehmenden Staaten einberufen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '29' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1899.html'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'Even though Russia’s intention was, more mundanely, to avoid an arms race with Germany that it did not have the means to pursue, the conference gave rise to great hopes in Europe and across the globe.',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Die erste internationale Friedenskonferenz in Den Haag endet mit der Annahme von einem Abkommen zur friedlichen Regelung internationaler Streitfälle, der Haager Landkriegsordnung und einem Abkommen über den Seekrieg.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '37' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1899.html'
          }
        },
        {
          id: 'q6',
          text: 'The conference of 1899 decided to create a Permanent Court of Arbitration, still active today, which at the time was the first international institution offering legal solutions for disputes between states, without for all that drawing up a list of cases for which the signatories would be required to resort to the court.',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        },
        {
          id: 'q7',
          text: 'The results of the two conferences seem limited at first glance, as they were not followed by any concrete effect in matters of disarmament.',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Beyond their immediate effect, which remained very limited, the two Hague Conferences of 1899 and 1907 laid the groundwork for a new international system based on law.',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        },
        {
          id: 'q9',
          text: 'Article 27 of the Convention of 1899 on arbitration, which was requested by the French delegation, introduced the notion of “duty,” and therefore of moral obligation, in international relations.',
          lang: 'en',
          cite: {
            source: 'ehne-jeannesson-hague-conferences-1899-and-1907',
            loc: { section: 'The International Hague Conferences of 1899 and 1907', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/europe-and-legal-regulation-international-relations/international-hague-conferences-1899-and-1907'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Delegates_of_the_First_International_Peace_Conference_at_The_Hague%2C_1899.png/1280px-Delegates_of_the_First_International_Peace_Conference_at_The_Hague%2C_1899.png',
    page: 'https://commons.wikimedia.org/wiki/File:Delegates_of_the_First_International_Peace_Conference_at_The_Hague,_1899.png',
    credit: { institution: 'Haags Gemeentearchief' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'holls-peace-conference-1900',
      mediaKind: 'document',
      title: 'The peace conference at The Hague, and its bearings on international law and policy',
      date: { d: '1900' },
      url: 'https://archive.org/download/peaceconferencea00holl/peaceconferencea00holl.pdf',
      page: 'https://archive.org/details/peaceconferencea00holl',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Holls, Frederick William, 1857-1903'
      },
      license: { id: 'public-domain' },
      bytes: 34742992
    }
  ]
})
