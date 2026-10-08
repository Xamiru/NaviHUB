import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mandate-system-nature',
  about: ['theme:nationalism-in-the-middle-east', 'theme:decolonization'],
  topic: 'nature',
  positions: [
    {
      id: 'league-sacred-trust',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'League of Nations' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'To those colonies and territories which as a consequence of the late war have ceased to be under the sovereignty of the States which formerly governed them and which are inhabited by peoples not yet able to stand by themselves under the strenuous conditions of the modern world, there should be applied the principle that the well-being and development of such peoples form a sacred trust of civilisation and that securities for the performance of this trust should be embodied in this Covenant.',
          lang: 'en',
          cite: {
            source: 'avalon-covenant-of-the-league-of-nations',
            loc: { section: 'The Covenant of the League of Nations' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/20th_century/leagcov.asp'
          }
        },
        {
          id: 'q2',
          text: 'The best method of giving practical effect to this principle is that the tutelage of such peoples should be entrusted to advanced nations who by reason of their resources, their experience or their geographical position can best undertake this responsibility, and who are willing to accept it, and that this tutelage should be exercised by them as Mandatories on behalf of the League.',
          lang: 'en',
          cite: {
            source: 'avalon-covenant-of-the-league-of-nations',
            loc: { section: 'The Covenant of the League of Nations' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/20th_century/leagcov.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'By establishing the mandate system, the League of Nations both undermined and underpinned colonialism – it was foremost the colonised peoples who, hoping for self-determination, were bitterly disappointed',
          lang: 'en',
          cite: {
            source: 'eo1418-ziegerhofer-league-of-nations',
            loc: { section: 'League of Nations' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://encyclopedia.1914-1918-online.net/article/league-of-nations/'
          }
        }
      ]
    },
    {
      id: 'syrian-congress-protest',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'General Syrian Congress' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Considering the fact that the Arabs inhabiting the Syrian area are not naturally less gifted than other more advanced races and that they are by no means less developed than the Bulgarians, Serbians, Greeks, and Roumanians at the beginning of their independence, we protest against Article 22 of the Covenant of the League of Nations, placing us among the nations in their middle stage of development which stand in need of a mandatory power.',
          lang: 'en',
          cite: {
            source: 'frus-1919-paris-v12-king-crane-report',
            loc: { section: '4. The Syrian Congress at Damascus', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1919Parisv12/d380'
          }
        },
        {
          id: 'q4',
          text: 'And desiring that our country should not fall a prey to colonization and believing that the American Nation is farthest from any thought of colonization and has no political ambition in our country',
          lang: 'en',
          cite: {
            source: 'frus-1919-paris-v12-king-crane-report',
            loc: { section: '4. The Syrian Congress at Damascus', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1919Parisv12/d380'
          }
        }
      ]
    },
    {
      id: 'stage-toward-self-determination',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Erez Manela' },
        { kind: 'scholar', name: 'Susanne Brandt' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The League of Nations Mandate System, almost despite itself, entrenched for the first time in the international arena the idea that progress toward self-determination should be the goal of colonial rule and the yardstick against which it is measured.',
          lang: 'en',
          cite: {
            source: 'eo1418-manela-wilsonian-moment',
            loc: { section: 'Toward a New Order', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilsonian-moment/'
          }
        },
        {
          id: 'q6',
          text: 'In the long term, however, the mandate system represented an important stage on the road to decolonization.',
          lang: 'en',
          cite: {
            source: 'eo1418-brandt-versailles-treaty-of',
            loc: { section: 'The Text of the Treaty', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
          }
        }
      ]
    },
    {
      id: 'colonial-rule-replaced',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Alia El Bakri' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The post-war settlement created deep and long-lasting mistrust among the region’s peoples, as it became clear that one colonial rule was simply being replaced by another.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Aftermath', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        },
        {
          id: 'q8',
          text: 'The mandate system created an identity crisis among Arab nationalists that led to the growth of competing nationalisms: Arab versus Islamic versus the more parochial nationalisms of the newly created states.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/israel/14.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
