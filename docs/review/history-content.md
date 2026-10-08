# History content review — 2026-10-07

Covers everything researched so far: 1800–1969, 430 events, 207 people, 50 periods, 191
interpretations, 686 sources, about 6,000 quotes. Two read-only reviewers read 173 articles in full
(every prominence-1 event, every prominence-1/2 Iran event, 24 others across regions, 20 person
pages and every interpretation attached), and a script measured the whole catalog
(`~/.cache/navihub-history-work/review/metrics.py`). This file is the backlog; the lessons that
apply to new research are in `.claude/skills/history-era/SKILL.md` ("Quality bar").

## What is good — keep it

- **The rule held.** Every visible sentence is a cited verbatim quote with a locator; the validator
  is green; no Wikipedia/Wikidata citations; the sites whose terms forbid reuse were purged.
- **Contested topics, when done fully, are the section's best work**: the 1953 coup (five
  positions: scholarly with standing, US official, Islamic Republic official, Pahlavi official,
  Takeyh revisionist with three receptions), the Armenian Genocide (contested names with `usedBy`,
  the Turkish state in its own words, denialists as revisionist with reception), the American Civil
  War (Lost Cause with reception), the 1921 coup's British role, Khiabani's historiography, the
  Tobacco Protest, Waitangi's two texts, the Crimean War in Hansard.
- **Dated "Course of events" timelines** where they exist (Iran in the First World War, the Cuban
  Missile Crisis, the Indo-European telegraph, the Perry expedition, the 1834 succession crisis).
- **Iran depth**: 139 of 430 events, Encyclopaedia Iranica throughout, Solar Hijri dates.
- **Coverage**: 24–30 events every decade; no gap of three or more years except 1841–44 and
  1891–94. Images on 413 of 430 events, 191 of 207 people and all 50 periods.
- **Primary voices** where used: `in-their-words` sections (Tehran Conference declaration, the
  assassin of Naser al-Din Shah, Fath-Ali Shah), treaty texts beside narrative.

## What needs fixing (errors a reader meets)

| # | Problem | Scale | Fix |
|---|---|---|---|
| F1 | **German and French text carrying essential content** (LeMO chronology lines above all) | 433 non-English quotes (325 German, 41 French); worst: March on Rome (no English at all), the Second World War and Holocaust timelines, Franco-Prussian War (11 of 16 quotes), 1848 (whole course), Dreyfus, founding of the USSR, Bismarck's page | Replace with English sources item by item; LeMO may stay only as a second citation, never as the course, opener or a side's name |
| F2 | **Pages open under "Background" or "Causes"**, and the dated course renders after Aftermath and Consequences | about 42 pages store background/causes first | Renderer: draw sections in `SECTION_KINDS` order and place the course after `course`/before `aftermath` (one change fixes every page) |
| F3 | **Chronology lines, headwords or dangling sentences as openers** | about 27 (most are Yarshater's Iranica chronology) | Iranica article ledes first; chronology lines move to the course |
| F4 | **Disputes that are not disputes** | about 22: values that refer to a different thing (Turkmenchay 1826, Tobacco Régie 1872 = Reuter, two different 1801 treaties, Mexican–American War's two end points) and values that differ only in precision or qualifier (Holocaust "about"/"nearly" 6 million, influenza "about"/"over" 50 million) | Drop an alternative that is about a different subject; collapse precision-only differences (SKILL rule). **Genuine precise disagreements stay**, including likely slips (the user's rule: every sourced value is shown) |
| F5 | **Quotes that state something false or point at the wrong person** | 6+: Slavery Abolition Act 1833 opener ("outlawed British trade", that was 1807), "indemnity to Korea" (First Sino-Japanese War), "His" = Azal after a Bahá'u'lláh quote (Bábí–Baháʼí schism), Taiping "Guizhou", "Lee-Enfield" (1857), Abbas Mirza aged 44 vs 41 | Quotes cannot be edited: take a better source or drop the quote; never let an error be the opener |
| F6 | **Positions whose holder never speaks** — an `official` or `contemporary` position made of a historian's paraphrase; one article sliced into several "positions"; reception attached to the wrong position; a conspiracy view labelled `popular` (so no reception) | about 35 positions | Holder's own words, or relabel as scholarly; reception on the position it answers; Trans-Iranian Railway "British design" becomes fringe |
| F7 | **Partisan memoirs as narration** | Shah's *Mission for My Country* in the 1953 coup, 30 Tir, Mosaddegh's trial, nationalization; Khamenei.ir as the first line of Khomeini's page | Move into an `official` position or `in-their-words` |
| F8 | **Participants entered as plain names although their page exists** | 149 unlinked in the 1900s sample alone; Mosaddegh's page misses three events | Link every participant whose person page exists (scriptable) |
| F9 | **Infobox figures one-sided or showing a denial value** | Nanjing shows "0–50" beside 300,000; 15 Khordad deaths only from Khamenei.ir; Partition only a minimum | Denial ranges live in the interpretation only; add independent figures |
| F10 | **Images**: human remains (Little Bighorn "pile of bones"); the young Naser al-Din portrait on his 1896 assassination and the 1881 treaty; one portrait reused 4–6 times; a modern mausoleum photo for the Jangali movement | about 15 | Swap or drop |
| F11 | **Scan artefacts and citation walls inside quotes** | ~30 OCR artefacts ("toobtain", "β131,000" for £, "0ctober", "Octo-ber"), 72 quotes ending in bibliographies, ~15 cut mid-clause | Recut to end before the parenthesis; replace OCR-damaged quotes from a clean copy |
| F12 | **Repetition** | ~8 pages say the same thing 3–4 times (Mosaddegh's trial "three years", the White Revolution's six points, Iran's WWI neutrality) | Keep the best quote of each fact |

## What is lacking

- **Thin articles**: 200 of 430 events have no dated course; 54 overviews are a single quote. Thin
  prominence-1 pages: Waterloo, South African War, Masjed Soleyman oil strike, Wall Street Crash,
  founding of the USSR, Young Turk Revolution, Vietnam War (2 course items), Cultural Revolution
  (no figures since the Stanford source was removed).
- **People**: 80 without a birth date, 61 without a death date, many without an overview lede
  (Naser al-Din Shah has none and six quotes; Jinnah, Kuchik Khan), offices missing (Mosaddegh,
  Bismarck). Participants with no page at all: Taqizadeh, Foroughi, Kermit Roosevelt, Curzon,
  Kasravi, Hindenburg, Himmler, MacArthur, Kim Il Sung, Mountbatten, Kerensky, Jefferson Davis,
  Grant, Lee; no Iranian woman beyond Tahereh has a page.
- **Native names**: 86 of 139 Iran events have no Persian-script name (including prominence-1
  Russo-Persian wars, the siege of Herat, the Declaration of the Báb); Mahabad has no Kurdish name,
  the Azerbaijan government no Azerbaijani name; 86 people lack a native-script name.
- **Voices of the people the events happened to**: no Mexican view of the Mexican–American War,
  no Spanish or Cuban view of 1898, no Japanese view of Perry, no African view of Berlin 1884, no
  Mahdist view of Khartoum, no Filipino view of 1899; no Soviet or Chinese official narratives
  (1917, 1946 Iran crisis, Hungary 1956 as "counter-revolution"); no Iranian-nationalist view of
  1907. Classic debates absent: Fischer on 1914, intentionalism vs functionalism, Korean War
  origins, the Irish famine's responsibility. 17 prominence-1 20th-century events have no
  interpretation (Second World War, Korean War, Vietnam, Suez, Cuban Missile Crisis,
  nationalization of Iranian oil, Cultural Revolution …).
- **Regions**: Oceania 4 events in 170 years, Southeast Asia 14, Sub-Saharan Africa 26 (South
  Africa absent after 1902), Latin America 39, against Europe 170.
- **Events a reader would expect**: Tanzimat (1839), First Serbian Uprising, Anglo-Sikh wars,
  Garibaldi, Tewodros/Magdala, French Indochina, Boshin War; Japan's annexation of Korea (1910),
  Russian Civil War, Turkish War of Independence and Lausanne, Chinese Civil War, Egypt 1952,
  Guatemala 1954, apartheid and Sharpeville, Indonesia 1965–66, Sino-Indian War; Iran: OPEC (1960),
  the Saadabad Pact and 1937 border treaty, Fedaian-e Islam and Kasravi's assassination, the
  Freedom Movement (1961), Bahrain, Zanjan and Neyriz, Tahereh's execution (1852), Qanun.
- **Source diversity**: Encyclopaedia Iranica (33% of quotes) and the LoC country studies (29%,
  written 1987–96) carry most of the text; 6 books and 7 journal articles in total; **no
  Persian-language quote anywhere**, although the user reads Persian (Persian primary texts,
  Majles records and newspapers are fair game in the original).
- **Archive**: 98 items on 86 entities, mostly documents; 3 audio recordings.

## Order of work (proposed)

1. Renderer: canonical section order and course placement (F2). Small, fixes ~42 pages at once.
2. Scripted sweeps with `edit.py`: participant links (F8), precision-only and wrong-subject
   disputes (F4), citation-wall recuts (F11), graphic/misfit images (F10).
3. English replacement of German/French content (F1), prominence-1 pages first.
4. Interpretation pass (F6, F7, F9) and the missing voices.
5. Deepen thin prominence-1 pages and people; Persian names.
6. Gap events and regions, folded into a deepening pass per century before the 1970s.

## Status — 2026-10-08

| Item | State |
|---|---|
| F1 German/French | 433 → 110 non-English quotes (82 de, 23 fr; the rest are deliberate originals: Spanish, Russian, Persian, Portuguese, Chinese, Italian state and primary texts). No page opens with, or starts its course on, German or French. The remaining lines have no English source found (list in the agents' ledgers under `~/.cache/navihub-history-work/english_*`). |
| F2 section order | Fixed in the renderer (`shared/history/sectionOrder.ts`): overview, background, causes, the dated course, then "What followed". |
| F3 openers | Fixed on the pages deepened; weak ones left: Tutankhamun (does not name him), Kuchik Khan (fragment), the Soviet Union, the March on Rome, SAVAK's course "he". |
| F4 disputes | All 103 checked against their paragraphs: 102 genuine (kept, likely slips included), 1 removed (Mexican–American War "end" = the battle for Mexico City). |
| F6/F7/F9 interpretations | 59 (1900–69) and ~45 (1800s) interpretations repaired; 10 new (Korea, Vietnam, Suez, Cuban Missile Crisis, oil nationalization, Cultural Revolution, Second World War origins, 1905, Spanish Civil War, Boxers). Missing voices added: Mexican, Spanish/Cuban, Japanese, Mahdist, Filipino, Soviet, Comintern, Fischer, Irish famine. Still missing: an African view of Berlin 1884, North Korean, Egyptian (Nasser), Cuban, intentionalism/functionalism. Shah's memoir narration moved to "In their own words"; Nanjing denial range out of the infobox. |
| F8 participants | 20 linked; more participants added with refs during deepening. |
| F10 images | Little Bighorn bones, young-shah portraits, Nanjing parade, Wounded Knee burial, telegraph strip and Bahá'u'lláh photo removed or replaced. |
| Persian names | 7 of 139 Iran events still without one (subjects with no established Persian name); Kurdish and Azerbaijani added. |
| Thin pages | Deepened: Waterloo, South African War, Crimean War, Congress of Vienna, Irish famine, Taiping, Dreyfus, First Sino-Japanese War, Trafalgar, Little Bighorn, Turkmenchay, Reuter, Wall Street Crash, Vietnam, Cultural Revolution, USSR founding, Young Turks, Masjed Soleyman, first Majles, 1906 constitution, SAVAK, 1935 name change, Tutankhamun, Louisiana Purchase, Indian Removal Act, emancipation of the serfs, Congress of Berlin, Alexander II, Berlin Conference, First Opium War. People: Naser al-Din Shah, Mirza Hasan Shirazi, Lin Zexu, Urabi, Bismarck, Mosaddegh, Zahedi, Jinnah, Kuchik Khan. |
| Step 6 gaps (2026-10-08) | 38 events added (14 Iran: Zanjan, Nayriz, Tahereh, Karbala 1843, Qanun, Mozaffar's accession, Saadabad, the 1937 border treaty, Fedaian-e Islam, Kasravi, the 1946 southern revolt, OPEC, the Freedom Movement, Bahrain; world: Tanzimat, Serbia 1804, Anglo-Sikh war, Garibaldi, Magdala, Cochinchina, Aceh, Tunisia, Madagascar, Taranaki, Eureka, Korea 1910, Russian Civil War, Turkish independence, Lausanne, Chinese Civil War, Egypt 1952, Guatemala 1954, apartheid, Sharpeville, Indonesia 1965, Sino-Indian War, Mau Mau, Australian federation), 24 person pages, 27 date fills. Still thin: Oceania 7 events, Southeast Asia 17; 55 people without a birth date; Boshin War and Latin America/East Asia 1800s not added. |

Published translations quoted as the text when the original was out of reach (FRUS, Ramsey 1850, Butler 1898, Blunt, Hawks 1856, Gordon's *Journals*, Aguinaldo 1899, the Moscow 1939 *Short Course*): the source cited is the translation's own publication.
