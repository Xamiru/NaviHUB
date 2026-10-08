import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nazi-seizure-of-power-causes',
  about: ['event:nazi-seizure-of-power'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'depression-and-desperation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Had it not been for the economic collapse that began with the Wall Street stock market crash of October 1929, Hitler probably would not have come to power.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q2',
          text: 'In times of desperation, voters are ready for extreme solutions, and the NSDAP exploited the situation.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        }
      ]
    },
    {
      id: 'conservative-establishment',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Many historians' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Many historians see this development as part of a strategic plan formulated at the time by elements of the conservative establishment to abolish the republic and replace it with an authoritarian regime.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q4',
          text: 'Papen and other conservatives thought they could tame Hitler by tying him down with the responsibilities of government and transferring to themselves his tremendous popularity with a large portion of the electorate. But they proved no match for his ruthlessness and his genius at knowing how--and when--to seize power.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        }
      ]
    },
    {
      id: 'social-democracy-disarmed-the-workers',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Communist International' },
        { kind: 'participant', name: 'Georgi Dimitrov' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The Social-Democratic leaders glossed over and concealed from the masses the true class nature of fascism, and did not call them to the struggle against the increasingly reactionary measures of the bourgeoisie. They bear great historical responsibility for the fact that, at the decisive moment of the fascist offensive, a large section of the working people of Germany and of a number of other fascist countries failed to recognize in fascism the most bloodthirsty monster of finance capital, their most vicious enemy, and that these masses were not prepared to resist it.',
          lang: 'en',
          cite: {
            source: 'dimitrov-1935-fascist-offensive',
            loc: {
              section: 'Main Report delivered at the Seventh World Congress of the Communist International'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/reference/archive/dimitrov/works/1935/08_02.htm'
          }
        }
      ]
    },
    {
      id: 'comintern-share',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Conversely, the Comintern ordered the Communist Party of Germany to aid the anti-Soviet National Socialist German Workers\' Party (Nazi Party) in its bid for power, in the hopes that a Nazi regime would exacerbate social tensions and produce conditions that would lead to a communist revolution in Germany. In pursuing this policy, Stalin thus shared responsibility for Adolf Hitler\'s rise to power in 1933 and its tragic consequences for the Soviet Union and the rest of the world.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation and Terror', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/10.htm' }
        }
      ]
    }
  ]
})
