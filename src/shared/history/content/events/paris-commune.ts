import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'paris-commune',
  names: [
    { text: 'Paris Commune', lang: 'en', role: 'primary' },
    { text: 'Commune de Paris', lang: 'fr', role: 'native' },
    {
      text: 'Pariser Kommune',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '40' } }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1871-03-18' },
        cites: [
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '24' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1871-05-28' },
        cites: [
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '39' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '25' } }
      ]
    },
    {
      ref: 'place:versailles',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '25' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:adolphe-thiers',
      role: 'head-of-government',
      cites: [
        { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } }
      ]
    }
  ],
  related: [
    { ref: 'event:franco-prussian-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'The Paris Commune was a seizure of power by a popularly-led government that ruled Paris for three months. Members of the National Guard that had been defending Paris rose up against what was seen as a forced surrender to Prussia.',
          lang: 'en',
          cite: {
            source: 'loc-guide-paris-commune-1871',
            loc: { section: 'The Paris Commune and the Franco-Prussian War of 1871', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://guides.loc.gov/women-in-the-french-revolution/revolutions-rebellions/paris-commune-franco-prussian-war-1871'
          }
        },
        {
          id: 'q1',
          text: 'Aufstand in Paris: Die französische Regierung flieht nach Versailles.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '25' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
          }
        },
        {
          id: 'q2',
          text: 'Der aus allgemeinen Wahlen hervorgegangene Rat der Kommune vereinigt exekutive und legislative Gewalt und organisiert die Verteidigung von Paris gegen die Regierungstruppen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '29' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'The Commune was formed of the municipal councillors, chosen by universal suffrage in the various wards of the town, responsible and revocable at short terms.',
          lang: 'en',
          cite: {
            source: 'marx-1871-civil-war-in-france',
            loc: { section: 'The Third Address, [The Paris Commune]', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.marxists.org/archive/marx/works/1871/civil-war-france/ch05.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Die französische Regierung lässt den Aufstand der Pariser Kommune blutig niederwerfen und verhängt anschließend ein Strafgericht.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '40' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
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
            value: { d: '1871-03-28' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'In Paris wird offiziell die "Kommune" proklamiert.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '29' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Barricade_Voltaire_Lenoir_Commune_Paris_1871.jpg/1280px-Barricade_Voltaire_Lenoir_Commune_Paris_1871.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Barricade_Voltaire_Lenoir_Commune_Paris_1871.jpg',
    credit: {
      institution: 'Bibliothèque historique de la Ville de Paris',
      creator: 'Bruno Braquehais'
    },
    license: { id: 'public-domain' }
  }
})
