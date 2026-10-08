import { definePerson } from '../../schema'

export default definePerson({
  id: 'heinrich-himmler',
  names: [
    { text: 'Heinrich Himmler', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1900' },
        cites: [
          {
            source: 'lemo-biografie-heinrich-himmler',
            loc: { section: 'Heinrich Himmler 1900-1945' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1945' },
        cites: [
          {
            source: 'lemo-biografie-heinrich-himmler',
            loc: { section: 'Heinrich Himmler 1900-1945' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:munich',
    cites: [
      {
        source: 'lemo-biografie-heinrich-himmler',
        loc: { section: 'Heinrich Himmler 1900-1945' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'Reichsführer SS',
      start: {
        alts: [
          {
            value: { d: '1929' },
            cites: [
              {
                source: 'avalon-imt-judgment-the-accused-organisations',
                loc: { section: 'Judgment: The Accused Organisations' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'avalon-imt-judgment-the-accused-organisations',
          loc: { section: 'Judgment: The Accused Organisations' }
        }
      ]
    },
    {
      title: 'Chief of the German Police',
      start: {
        alts: [
          {
            value: { d: '1936-06-17' },
            cites: [
              {
                source: 'avalon-imt-judgment-the-accused-organisations',
                loc: { section: 'Judgment: The Accused Organisations' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'avalon-imt-judgment-the-accused-organisations',
          loc: { section: 'Judgment: The Accused Organisations' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Bundesarchiv_Bild_183-R99621%2C_Heinrich_Himmler.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R99621,_Heinrich_Himmler.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1936 Himmler, the Reichs Fuehrer SS, became Chief of the German Police with authority over the regular uniformed police as well as the Security Police.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-the-accused-organisations',
            loc: { section: 'Judgment: The Accused Organisations' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judorg.asp' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1929, when Himmler was first appointed as Reichs Fuehrer the SS consisted of 980 men who were regarded as especially trustworthy.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-the-accused-organisations',
            loc: { section: 'Judgment: The Accused Organisations' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judorg.asp' }
        },
        {
          id: 'q3',
          text: 'the Reichs Security Head Office (RSHA) which was at the same time both one of the principal offices (Hauptamter) of the SS under Himmler as Reichsfuehrer SS and an office in the Ministry of the Interior under Himmler as Chief of the German Police.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-the-accused-organisations',
            loc: { section: 'Judgment: The Accused Organisations' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judorg.asp' }
        },
        {
          id: 'q4',
          text: 'There is evidence that where manpower considerations permitted, Himmler wanted to rotate guard battalions so that all members of the SS would be instructed as to the proper attitude to take to inferior races.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-the-accused-organisations',
            loc: { section: 'Judgment: The Accused Organisations' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judorg.asp' }
        },
        {
          id: 'q5',
          text: 'On 1st October, 1944, the custody of prisoners of war and interned persons was transferred to Himmler',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-the-accused-organisations',
            loc: { section: 'Judgment: The Accused Organisations' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judorg.asp' }
        }
      ]
    }
  ]
})
