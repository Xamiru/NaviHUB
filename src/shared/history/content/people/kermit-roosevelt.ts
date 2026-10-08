import { definePerson } from '../../schema'

export default definePerson({
  id: 'kermit-roosevelt',
  names: [
    { text: 'Kermit Roosevelt Jr.', lang: 'en', role: 'primary' },
    { text: 'Kermit Roosevelt', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  regions: ['north-america', 'iran'],
  roles: ['other'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Kermit_Roosevelt_Jr._in_Tehran_in_1953.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kermit_Roosevelt_Jr._in_Tehran_in_1953.jpg',
    credit: { institution: 'Central Intelligence Agency', creator: 'Studies in Intelligence' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Kermit Roosevelt, chief of CIA\'s Near East operations division, and on-the-ground manager of the U.S.-U.K. coup plan.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-435-cia-confirms-role-in-1953-iran-coup',
            loc: { section: 'CIA Confirms Role in 1953 Iran Coup' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB435/' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'AJAX was to be carried out by the C.I.A. under the direction of Kermit Roosevelt.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q3',
          text: 'Roosevelt traveled to Persia several times in late 1331 and early 1332 Š. /1953 to meet with Zāhedī, who was working diligently against Moṣaddeq.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q4',
          text: 'Following the collapse of the original plan, Roosevelt and his team began to improvise a new strategy for overthrowing Moṣaddeq. After first making contin­gency plans to evacuate himself, Zāhedī, and several of their confederates in the American military attaché’s airplane',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'Despite the appearance of countless published accounts about the operation over the years - including Kermit Roosevelt\'s own detailed memoir, and the subsequent leak to The New York Times of the 200-page CIA narrative history',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-435-cia-confirms-role-in-1953-iran-coup',
            loc: { section: 'CIA Confirms Role in 1953 Iran Coup' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB435/' }
        }
      ]
    }
  ]
})
