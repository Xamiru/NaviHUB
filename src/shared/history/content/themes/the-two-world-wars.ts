import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'the-two-world-wars',
  names: [
    { text: 'The two world wars', lang: 'en', role: 'primary' }
  ],
  regions: ['global', 'europe', 'mena', 'russia-central-asia', 'east-asia', 'iran'],
  thread: [
    { ref: 'event:triple-alliance-1882' },
    { ref: 'event:bosnian-annexation-crisis' },
    { ref: 'event:balkan-wars' },
    {
      ref: 'person:franz-ferdinand',
      quote: {
        id: 'q5',
        text: 'Within six weeks all the European great powers, excepting Italy, were at war.',
        lang: 'en',
        cite: {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'From War to Peace?', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
        }
      }
    },
    {
      ref: 'event:first-world-war',
      quote: {
        id: 'q6',
        text: 'The First World War has come to mark one of the great ruptures in modern history, the handmaiden of, to name but a small number of examples, new forms of literary irony, violence against civilians, and anti-colonial movements.',
        lang: 'en',
        cite: {
          source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
          loc: { section: 'Introduction', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
        }
      }
    },
    { ref: 'event:iran-in-the-first-world-war' },
    { ref: 'event:armenian-genocide' },
    { ref: 'event:battle-of-the-somme' },
    { ref: 'event:russian-revolution-of-1917' },
    {
      ref: 'period:weimar-republic',
      quote: {
        id: 'q7',
        text: 'The historian Michael Salewski (1938-2010) stressed in 1980 that it was not only German foreign policy in the years of the Weimar Republic that was shaped by the goal of revising the provisions of the treaty, but that the struggle against Versailles was also the domestic theme that united all social and political groups.',
        lang: 'en',
        cite: {
          source: 'eo1418-brandt-versailles-treaty-of',
          loc: { section: 'Evaluation of the Treaty', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
        }
      }
    },
    {
      ref: 'event:paris-peace-conference',
      quote: {
        id: 'q8',
        text: 'Britain and France were left to execute a settlement that the Americans had heavily influenced but now reneged upon. Britain favoured modifying the terms in the hope of reconciling Germany, France preferred rigid enforcement to nullify German power. As a result they veered between conciliation and coercion, effectively stymying both policies, contributing, in part, to an outcome in 1939 that neither wanted.',
        lang: 'en',
        cite: {
          source: 'eo1418-sharp-paris-peace-conference',
          loc: { section: 'Conclusion', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
        }
      }
    },
    {
      ref: 'event:founding-of-the-league-of-nations',
      quote: {
        id: 'q9',
        text: 'Wilson’s hope was that conflicts would be resolved peacefully in the future, and he firmly believed that the League of Nations would be able to address any possible shortcomings of the peace treaty.',
        lang: 'en',
        cite: {
          source: 'eo1418-brandt-versailles-treaty-of',
          loc: { section: 'The Text of the Treaty', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
        }
      }
    },
    { ref: 'event:mukden-incident' },
    { ref: 'event:nazi-seizure-of-power' },
    { ref: 'event:second-italo-ethiopian-war' },
    { ref: 'event:anschluss' },
    { ref: 'event:munich-agreement' },
    { ref: 'event:molotov-ribbentrop-pact' },
    { ref: 'event:second-world-war' },
    { ref: 'event:the-holocaust' },
    { ref: 'event:anglo-soviet-invasion-of-iran' },
    { ref: 'event:tehran-conference' },
    { ref: 'event:atomic-bombings-of-hiroshima-and-nagasaki' },
    {
      ref: 'event:founding-of-the-united-nations',
      quote: {
        id: 'q10',
        text: 'In contrast to American unwillingness to politically or militarily entangle itself in the League of Nations, the United States became one of the first members of the international organization designed to promote international security, commerce, and law, the United Nations.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-1945-1952-foreword',
          loc: { section: '1945–1952: The Early Cold War', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/foreword'
        }
      }
    },
    {
      ref: 'event:nuremberg-trials',
      quote: {
        id: 'q11',
        text: 'Politicians and military leaders were held accountable for the first time after the Second World War in the war crimes trials in Nuremberg and Tokyo.',
        lang: 'en',
        cite: {
          source: 'eo1418-brandt-versailles-treaty-of',
          loc: { section: 'The Text of the Treaty', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
        }
      }
    }
  ],
  related: [
    { ref: 'theme:the-cold-war' },
    { ref: 'theme:decolonization' },
    { ref: 'theme:nationalism-in-the-middle-east' },
    { ref: 'theme:iran-and-russia' },
    { ref: 'theme:iran-and-britain' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Orpen%2C_William_%28Sir%29_%28RA%29_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors%2C_Versailles%2C_28th_June_1919_-_Google_Art_Project.jpg/1280px-Orpen%2C_William_%28Sir%29_%28RA%29_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors%2C_Versailles%2C_28th_June_1919_-_Google_Art_Project.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Orpen,_William_(Sir)_(RA)_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors,_Versailles,_28th_June_1919_-_Google_Art_Project.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'William Orpen' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Not only Charles de Gaulle (1890-1970) or Winston Churchill (1874-1965), but also historians like Pierre Grosser or philosopher Raymond Aron (1905-1983) have linked the two wars into a Thirty Years’ War',
          lang: 'en',
          cite: {
            source: 'eo1418-brandt-versailles-treaty-of',
            loc: { section: 'Evaluation of the Treaty', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
          }
        },
        {
          id: 'q2',
          text: 'In this way, the peace treaty, which could not establish a stable peace order, was virtually blamed for the ensuing world war.',
          lang: 'en',
          cite: {
            source: 'eo1418-brandt-versailles-treaty-of',
            loc: { section: 'Evaluation of the Treaty', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
          }
        },
        {
          id: 'q3',
          text: 'With greater temporal distance – especially since 1989 – both conflicts have been analysed more strongly with a view to their respective particularities.',
          lang: 'en',
          cite: {
            source: 'eo1418-brandt-versailles-treaty-of',
            loc: { section: 'Evaluation of the Treaty', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
          }
        },
        {
          id: 'q4',
          text: 'The question of whether the peace treaty failed because it punished Germany too harshly or not harshly enough is still controversial among historians today.',
          lang: 'en',
          cite: {
            source: 'eo1418-brandt-versailles-treaty-of',
            loc: { section: 'Evaluation of the Treaty', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/versailles-treaty-of/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  furtherReading: [
    { source: 'istoriya-vtoroi-mirovoi-voiny-1973', perspective: 'russian-soviet' },
    {
      source: 'mgfa-1979-das-deutsche-reich-und-der-zweite-weltkrieg',
      perspective: 'european'
    },
    { source: 'hattori-1965-daitoa-senso-zenshi', perspective: 'japanese' },
    { source: 'becker-krumeich-2008-la-grande-guerre', perspective: 'european' }
  ]
})
