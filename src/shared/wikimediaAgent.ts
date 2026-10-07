// Wikimedia allows an anonymous client 10 requests a minute unless its agent names the
// client and a contact, which raises the limit to 200 a minute shared by every Wikimedia
// site. Every request to Wikipedia, Wikidata and Commons sends this agent.
export const WIKIMEDIA_USER_AGENT = 'NaviHUB/0.2 (https://github.com/Xamiru/NaviHUB)'

// The API appends `?utm_source=…&utm_campaign=api&utm_content=…` to every image URL it
// returns. downloadImage is content-addressed on sha1(url), so keeping that query means
// every stored image downloads again the day Wikimedia changes a campaign string.
export function stripWikimediaTracking(url: string): string {
  const q = url.indexOf('?')
  return q < 0 ? url : url.slice(0, q)
}
