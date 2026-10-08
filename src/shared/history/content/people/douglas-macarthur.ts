import { definePerson } from '../../schema'

export default definePerson({
  id: 'douglas-macarthur',
  names: [
    { text: 'Douglas MacArthur', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1880-01-26' },
        cites: [
          {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1964-04-05' },
        cites: [
          {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:little-rock',
    cites: [
      {
        source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
        loc: { section: 'Douglas MacArthur' }
      }
    ]
  },
  diedIn: {
    ref: 'place:washington-dc',
    cites: [
      {
        source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
        loc: { section: 'Douglas MacArthur' }
      }
    ]
  },
  regions: ['north-america', 'east-asia', 'southeast-asia'],
  roles: ['military'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/DouglasMacArthur.jpg/1280px-DouglasMacArthur.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:DouglasMacArthur.jpg',
    credit: { institution: 'National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'led American forces in Pacific campaigns as Supreme Allied Commander, 19411945; was promoted to temporary General of the Army December 1944; received the Medal of Honor for Philippine defense preparations and operations; was appointed Supreme Allied Commander, Japan, 1945',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Douglas MacArthur was born in Little Rock, Arkansas, on 26 January 1880; graduated from the United States Military Academy, 1903; was commissioned a second lieutenant of engineers and served in the Philippines, 19031904; was promoted to first lieutenant, April 1904; was an engineer officer and aide to the commander of the Pacific Division, 19041906; served with the 2d Engineer Battalion, attended the Engineer School, and was aide to President Theodore Roosevelt, 19061908; was troop commander, adjutant, and Army Service Schools instructor at Fort Leavenworth, 19081912; was promoted to captain, February 1911; was on the General Staff, 19131917; took part in the Vera Cruz Expedition; was promoted to major, December 1915, and colonel, August 1917; was chief of staff of the 42d Division in France, 19171918; was promoted to brigadier general in the National Army, June 1918, took part in Marne operations, and commanded the 84th Infantry Brigade in the St. Mihiel and Meuse-Argonne offensives; commanded the 42d Division in the Sedan offensive, 1918; served with the Army of Occupation, 19181919; was superintendent of the United States Military Academy, 19191922; became a brigadier general in the Regular Army, January 1920; married Louise Cromwell Brooks, 1922 (divorced 1929); was promoted to major general, January 1925; successively commanded the District of Manila, 19221923, the Fourth and Third Corps Areas, 19251928, and the Ninth Corps Area, 1930; was promoted to temporary general, November 1930; was chief of staff of the United States Army, 21 November 19301 October 1935; stressed Army deficiencies in personnel and materiel, presided over development of plans for industrial mobilization and manpower procurement, established an Air Force headquarters, administered Army control over the Civilian Conservation Corps, and supervised eviction of "bonus marchers" from Washington; resumed his permanent rank of major general and became military adviser to the government of the Philippines, 19351941; married Jean Marie Faircloth, 1937; retired from active service, December 1937, but continued as adviser to the Philippine government; was recalled to active duty as lieutenant general and named commander, United States Army Forces in the Far East, July 1941; was promoted to temporary general, December 1941',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        },
        {
          id: 'q3',
          text: 'rank as General of the Army made permanent, April 1946; was designated commander in chief, Far East Command, 1947; upon the North Korean invasion of South Korea, was designated commander, United Nations Command in the Far East, July 1950; was relieved of his command by President Truman, April 1951; died in Washington, D.C., on 5 April 1964.',
          lang: 'en',
          cite: {
            source: 'cmh-commanding-generals-and-chiefs-of-staff-douglas-macarthur',
            loc: { section: 'Douglas MacArthur' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://webdoc.sub.gwdg.de/ebook/p/2005/CMH/www.army.mil/cmh-pg/books/cg&csa/macarthur-d.htm'
          }
        }
      ]
    }
  ]
})
