import type { SeedCourse } from './japaneseSeed'

// Third wave of seed packs (2026-07-27): the vocabulary and kanji halves of N2
// and N1, which the path was missing — it previously jumped from N3 kanji
// straight to N2 grammar and then stopped at N1 grammar.
//
// House rules for these packs, mirroring the earlier waves:
//  · vocab cards carry pos AND a full example triple (JP / reading / EN), so
//    they also feed the typed cloze mode in reviews (@shared/cloze).
//  · kanji fronts are ONE character, unique across ALL kanji decks (N5 → N1),
//    with on/kun readings and an example word. japaneseSeed.test.ts enforces it.
//  · at this level the honest advice is "read, and mine what you meet" — the
//    decks cover the unavoidable core, not the whole level.

export const N2_VOCAB_COURSE: SeedCourse = {
  title: 'JLPT N2 Vocabulary',
  description:
    'The abstract, formal and written-register words N2 turns on: degree adverbs, ' +
    'transitive/intransitive pairs, する-compounds and the connectives that hold ' +
    'newspaper and novel prose together.',
  level: 'N2',
  difficulty: 18,
  lessons: [
    {
      kind: 'vocab',
      title: 'Abstract nouns I — thought & judgment',
      cards: [
        { front: '影響', reading: 'えいきょう', back: 'influence; effect', pos: 'noun', exampleJp: '天気が売上に影響する。', exampleReading: 'てんきがうりあげにえいきょうする。', exampleEn: 'The weather affects sales.' },
        { front: '判断', reading: 'はんだん', back: 'judgment; decision', pos: 'noun', exampleJp: '自分で判断してください。', exampleReading: 'じぶんではんだんしてください。', exampleEn: 'Please decide for yourself.' },
        { front: '意識', reading: 'いしき', back: 'consciousness; awareness', pos: 'noun', exampleJp: '意識が戻った。', exampleReading: 'いしきがもどった。', exampleEn: 'He regained consciousness.' },
        { front: '印象', reading: 'いんしょう', back: 'impression', pos: 'noun', exampleJp: '第一印象が悪かった。', exampleReading: 'だいいちいんしょうがわるかった。', exampleEn: 'The first impression was bad.' },
        { front: '記憶', reading: 'きおく', back: 'memory; recollection', pos: 'noun', exampleJp: 'その日の記憶がない。', exampleReading: 'そのひのきおくがない。', exampleEn: 'I have no memory of that day.' },
        { front: '想像', reading: 'そうぞう', back: 'imagination', pos: 'noun', exampleJp: '想像していたより広い。', exampleReading: 'そうぞうしていたよりひろい。', exampleEn: "It's bigger than I imagined." },
        { front: '理解', reading: 'りかい', back: 'understanding', pos: 'noun', exampleJp: '理解に苦しむ。', exampleReading: 'りかいにくるしむ。', exampleEn: "I can't make sense of it." },
        { front: '解決', reading: 'かいけつ', back: 'solution; settlement', pos: 'noun', exampleJp: '問題は解決した。', exampleReading: 'もんだいはかいけつした。', exampleEn: 'The problem is solved.' },
        { front: '判明', reading: 'はんめい', back: 'coming to light; being ascertained', pos: 'noun', exampleJp: '身元が判明した。', exampleReading: 'みもとがはんめいした。', exampleEn: 'The identity was established.' },
        { front: '認識', reading: 'にんしき', back: 'recognition; perception', pos: 'noun', exampleJp: '認識が甘かった。', exampleReading: 'にんしきがあまかった。', exampleEn: 'I underestimated it.' },
        { front: '概念', reading: 'がいねん', back: 'concept; notion', pos: 'noun', exampleJp: '新しい概念を学ぶ。', exampleReading: 'あたらしいがいねんをまなぶ。', exampleEn: 'To learn a new concept.' },
        { front: '傾向', reading: 'けいこう', back: 'tendency; trend', pos: 'noun', exampleJp: '値段が上がる傾向にある。', exampleReading: 'ねだんがあがるけいこうにある。', exampleEn: 'Prices tend to be rising.' },
        { front: '根拠', reading: 'こんきょ', back: 'grounds; basis', pos: 'noun', exampleJp: '根拠のない噂だ。', exampleReading: 'こんきょのないうわさだ。', exampleEn: "It's a baseless rumour." },
        { front: '前提', reading: 'ぜんてい', back: 'premise; assumption', pos: 'noun', exampleJp: '結婚を前提に付き合う。', exampleReading: 'けっこんをぜんていにつきあう。', exampleEn: 'To date with marriage in mind.' },
        { front: '観点', reading: 'かんてん', back: 'point of view', pos: 'noun', exampleJp: '別の観点から見よう。', exampleReading: 'べつのかんてんからみよう。', exampleEn: "Let's look at it from another angle." }
      ]
    },
    {
      kind: 'vocab',
      title: 'Degree & frequency adverbs',
      cards: [
        { front: '相当', reading: 'そうとう', back: 'considerably; fairly', pos: 'adverb/na-adjective', exampleJp: '相当疲れているようだ。', exampleReading: 'そうとうつかれているようだ。', exampleEn: 'He seems quite tired.' },
        { front: '意外と', reading: 'いがいと', back: 'unexpectedly; more than you would think', pos: 'adverb', exampleJp: '意外と簡単だった。', exampleReading: 'いがいとかんたんだった。', exampleEn: 'It was easier than expected.' },
        { front: '実に', reading: 'じつに', back: 'truly; really', pos: 'adverb', exampleJp: '実に見事な演奏だ。', exampleReading: 'じつにみごとなえんそうだ。', exampleEn: 'A truly splendid performance.' },
        { front: '案外', reading: 'あんがい', back: 'contrary to expectation', pos: 'adverb', exampleJp: '案外うまくいった。', exampleReading: 'あんがいうまくいった。', exampleEn: 'It went better than I thought.' },
        { front: '却って', reading: 'かえって', back: 'on the contrary; if anything', pos: 'adverb', exampleJp: '謝ったら却って怒られた。', exampleReading: 'あやまったらかえっておこられた。', exampleEn: 'Apologising only made him angrier.' },
        { front: '次第に', reading: 'しだいに', back: 'gradually', pos: 'adverb', exampleJp: '次第に暗くなってきた。', exampleReading: 'しだいにくらくなってきた。', exampleEn: 'It gradually grew dark.' },
        { front: '徐々に', reading: 'じょじょに', back: 'little by little', pos: 'adverb', exampleJp: '徐々に慣れてきた。', exampleReading: 'じょじょになれてきた。', exampleEn: "I'm slowly getting used to it." },
        { front: '一斉に', reading: 'いっせいに', back: 'all at once; in unison', pos: 'adverb', exampleJp: '鳥が一斉に飛び立った。', exampleReading: 'とりがいっせいにとびたった。', exampleEn: 'The birds took off all at once.' },
        { front: '絶えず', reading: 'たえず', back: 'constantly; without pause', pos: 'adverb', exampleJp: '絶えず変化している。', exampleReading: 'たえずへんかしている。', exampleEn: 'It is constantly changing.' },
        { front: '滅多に', reading: 'めったに', back: 'rarely (+ negative)', pos: 'adverb', exampleJp: '滅多に外食しない。', exampleReading: 'めったにがいしょくしない。', exampleEn: 'I rarely eat out.' },
        { front: '大幅に', reading: 'おおはばに', back: 'substantially; by a wide margin', pos: 'adverb', exampleJp: '大幅に値下げした。', exampleReading: 'おおはばにねさげした。', exampleEn: 'They cut the price substantially.' },
        { front: '僅か', reading: 'わずか', back: 'only; a mere', pos: 'adverb/na-adjective', exampleJp: '僅か三日で完成した。', exampleReading: 'わずかみっかでかんせいした。', exampleEn: 'It was finished in just three days.' },
        { front: '却下', reading: 'きゃっか', back: 'rejection; dismissal', pos: 'noun', exampleJp: '申請は却下された。', exampleReading: 'しんせいはきゃっかされた。', exampleEn: 'The application was rejected.' },
        { front: '一層', reading: 'いっそう', back: 'even more; all the more', pos: 'adverb', exampleJp: '一層努力します。', exampleReading: 'いっそうどりょくします。', exampleEn: 'I will try even harder.' },
        { front: '極めて', reading: 'きわめて', back: 'extremely (written)', pos: 'adverb', exampleJp: '極めて重要な問題だ。', exampleReading: 'きわめてじゅうようなもんだいだ。', exampleEn: 'It is an extremely important issue.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Transitive / intransitive pairs',
      cards: [
        { front: '含む', reading: 'ふくむ', back: 'to include (transitive)', pos: 'verb (u)', exampleJp: '税を含む値段です。', exampleReading: 'ぜいをふくむねだんです。', exampleEn: 'The price includes tax.' },
        { front: '含まれる', reading: 'ふくまれる', back: 'to be included', pos: 'verb (ru)', exampleJp: '送料は含まれていない。', exampleReading: 'そうりょうはふくまれていない。', exampleEn: 'Shipping is not included.' },
        { front: '重ねる', reading: 'かさねる', back: 'to pile up; to repeat (transitive)', pos: 'verb (ru)', exampleJp: '努力を重ねた。', exampleReading: 'どりょくをかさねた。', exampleEn: 'He put in effort again and again.' },
        { front: '重なる', reading: 'かさなる', back: 'to overlap; to coincide', pos: 'verb (u)', exampleJp: '予定が重なってしまった。', exampleReading: 'よていがかさなってしまった。', exampleEn: 'My plans clashed.' },
        { front: '揃える', reading: 'そろえる', back: 'to make uniform; to gather (transitive)', pos: 'verb (ru)', exampleJp: '靴を揃えて置く。', exampleReading: 'くつをそろえておく。', exampleEn: 'To line the shoes up neatly.' },
        { front: '揃う', reading: 'そろう', back: 'to be complete; to be all present', pos: 'verb (u)', exampleJp: '全員揃いました。', exampleReading: 'ぜんいんそろいました。', exampleEn: 'Everyone is here.' },
        { front: '通す', reading: 'とおす', back: 'to let through; to push through (transitive)', pos: 'verb (u)', exampleJp: '意見を通した。', exampleReading: 'いけんをとおした。', exampleEn: 'He got his opinion accepted.' },
        { front: '流す', reading: 'ながす', back: 'to let flow; to pour (transitive)', pos: 'verb (u)', exampleJp: '涙を流した。', exampleReading: 'なみだをながした。', exampleEn: 'She shed tears.' },
        { front: '流れる', reading: 'ながれる', back: 'to flow; to be cancelled', pos: 'verb (ru)', exampleJp: '川が静かに流れる。', exampleReading: 'かわがしずかにながれる。', exampleEn: 'The river flows quietly.' },
        { front: '欠ける', reading: 'かける', back: 'to be lacking; to be chipped', pos: 'verb (ru)', exampleJp: '経験が欠けている。', exampleReading: 'けいけんがかけている。', exampleEn: 'He lacks experience.' },
        { front: '欠かす', reading: 'かかす', back: 'to skip; to do without', pos: 'verb (u)', exampleJp: '毎日欠かさず練習する。', exampleReading: 'まいにちかかさずれんしゅうする。', exampleEn: 'I practise every single day.' },
        { front: 'まとめる', back: 'to put together; to summarise (transitive)', pos: 'verb (ru)', exampleJp: '意見をまとめる。', exampleReading: 'いけんをまとめる。', exampleEn: 'To pull the opinions together.' },
        { front: 'まとまる', back: 'to come together; to be settled', pos: 'verb (u)', exampleJp: '話がまとまった。', exampleReading: 'はなしがまとまった。', exampleEn: 'The deal came together.' },
        { front: '広げる', reading: 'ひろげる', back: 'to spread out; to expand (transitive)', pos: 'verb (ru)', exampleJp: '地図を広げた。', exampleReading: 'ちずをひろげた。', exampleEn: 'He spread out the map.' },
        { front: '広がる', reading: 'ひろがる', back: 'to spread; to widen', pos: 'verb (u)', exampleJp: '噂が広がった。', exampleReading: 'うわさがひろがった。', exampleEn: 'The rumour spread.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Work, study & society',
      cards: [
        { front: '就職', reading: 'しゅうしょく', back: 'finding employment', pos: 'noun', exampleJp: '来年就職します。', exampleReading: 'らいねんしゅうしょくします。', exampleEn: 'I start work next year.' },
        { front: '面接', reading: 'めんせつ', back: 'interview', pos: 'noun', exampleJp: '明日面接がある。', exampleReading: 'あしためんせつがある。', exampleEn: 'I have an interview tomorrow.' },
        { front: '担当', reading: 'たんとう', back: 'being in charge (of)', pos: 'noun', exampleJp: '私が担当します。', exampleReading: 'わたしがたんとうします。', exampleEn: 'I will handle it.' },
        { front: '責任', reading: 'せきにん', back: 'responsibility', pos: 'noun', exampleJp: '責任を取る。', exampleReading: 'せきにんをとる。', exampleEn: 'To take responsibility.' },
        { front: '義務', reading: 'ぎむ', back: 'duty; obligation', pos: 'noun', exampleJp: '納税の義務がある。', exampleReading: 'のうぜいのぎむがある。', exampleEn: 'There is a duty to pay taxes.' },
        { front: '制度', reading: 'せいど', back: 'system; institution', pos: 'noun', exampleJp: '新しい制度が始まる。', exampleReading: 'あたらしいせいどがはじまる。', exampleEn: 'A new system starts.' },
        { front: '環境', reading: 'かんきょう', back: 'environment; surroundings', pos: 'noun', exampleJp: '働く環境が良い。', exampleReading: 'はたらくかんきょうがよい。', exampleEn: 'The working environment is good.' },
        { front: '状況', reading: 'じょうきょう', back: 'situation; circumstances', pos: 'noun', exampleJp: '状況が変わった。', exampleReading: 'じょうきょうがかわった。', exampleEn: 'The situation has changed.' },
        { front: '効率', reading: 'こうりつ', back: 'efficiency', pos: 'noun', exampleJp: '効率が悪い。', exampleReading: 'こうりつがわるい。', exampleEn: 'It is inefficient.' },
        { front: '能力', reading: 'のうりょく', back: 'ability; capacity', pos: 'noun', exampleJp: '能力を活かす。', exampleReading: 'のうりょくをいかす。', exampleEn: 'To make use of one’s abilities.' },
        { front: '経営', reading: 'けいえい', back: 'management (of a business)', pos: 'noun', exampleJp: '会社を経営している。', exampleReading: 'かいしゃをけいえいしている。', exampleEn: 'He runs a company.' },
        { front: '契約', reading: 'けいやく', back: 'contract', pos: 'noun', exampleJp: '契約を結ぶ。', exampleReading: 'けいやくをむすぶ。', exampleEn: 'To sign a contract.' },
        { front: '申請', reading: 'しんせい', back: 'application (formal request)', pos: 'noun', exampleJp: 'ビザを申請する。', exampleReading: 'ビザをしんせいする。', exampleEn: 'To apply for a visa.' },
        { front: '手続き', reading: 'てつづき', back: 'procedure; paperwork', pos: 'noun', exampleJp: '手続きが面倒だ。', exampleReading: 'てつづきがめんどうだ。', exampleEn: 'The paperwork is a pain.' },
        { front: '収入', reading: 'しゅうにゅう', back: 'income', pos: 'noun', exampleJp: '収入が減った。', exampleReading: 'しゅうにゅうがへった。', exampleEn: 'My income went down.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'する-compounds you will actually meet',
      cards: [
        { front: '検討', reading: 'けんとう', back: 'consideration; examination', pos: 'noun', exampleJp: '前向きに検討します。', exampleReading: 'まえむきにけんとうします。', exampleEn: 'We will consider it positively.' },
        { front: '確認', reading: 'かくにん', back: 'confirmation; checking', pos: 'noun', exampleJp: '予約を確認してください。', exampleReading: 'よやくをかくにんしてください。', exampleEn: 'Please confirm the reservation.' },
        { front: '提出', reading: 'ていしゅつ', back: 'submission (of a document)', pos: 'noun', exampleJp: '書類を提出した。', exampleReading: 'しょるいをていしゅつした。', exampleEn: 'I submitted the documents.' },
        { front: '報告', reading: 'ほうこく', back: 'report', pos: 'noun', exampleJp: '結果を報告する。', exampleReading: 'けっかをほうこくする。', exampleEn: 'To report the results.' },
        { front: '相談', reading: 'そうだん', back: 'consultation; talking it over', pos: 'noun', exampleJp: '先生に相談した。', exampleReading: 'せんせいにそうだんした。', exampleEn: 'I talked it over with my teacher.' },
        { front: '協力', reading: 'きょうりょく', back: 'cooperation', pos: 'noun', exampleJp: 'ご協力ありがとうございます。', exampleReading: 'ごきょうりょくありがとうございます。', exampleEn: 'Thank you for your cooperation.' },
        { front: '準備', reading: 'じゅんび', back: 'preparation', pos: 'noun', exampleJp: '準備ができました。', exampleReading: 'じゅんびができました。', exampleEn: 'Preparations are complete.' },
        { front: '実施', reading: 'じっし', back: 'implementation; carrying out', pos: 'noun', exampleJp: '調査を実施する。', exampleReading: 'ちょうさをじっしする。', exampleEn: 'To carry out a survey.' },
        { front: '募集', reading: 'ぼしゅう', back: 'recruitment; call for applicants', pos: 'noun', exampleJp: 'アルバイトを募集中。', exampleReading: 'アルバイトをぼしゅうちゅう。', exampleEn: 'Now hiring part-timers.' },
        { front: '発表', reading: 'はっぴょう', back: 'announcement; presentation', pos: 'noun', exampleJp: '結果を発表します。', exampleReading: 'けっかをはっぴょうします。', exampleEn: 'We will announce the results.' },
        { front: '解散', reading: 'かいさん', back: 'breaking up; disbanding', pos: 'noun', exampleJp: 'バンドが解散した。', exampleReading: 'バンドがかいさんした。', exampleEn: 'The band broke up.' },
        { front: '中止', reading: 'ちゅうし', back: 'cancellation; suspension', pos: 'noun', exampleJp: '雨で中止になった。', exampleReading: 'あめでちゅうしになった。', exampleEn: 'It was cancelled due to rain.' },
        { front: '延期', reading: 'えんき', back: 'postponement', pos: 'noun', exampleJp: '試合は延期された。', exampleReading: 'しあいはえんきされた。', exampleEn: 'The match was postponed.' },
        { front: '判定', reading: 'はんてい', back: 'verdict; decision (of a judge)', pos: 'noun', exampleJp: '判定に納得できない。', exampleReading: 'はんていになっとくできない。', exampleEn: "I can't accept the ruling." },
        { front: '対応', reading: 'たいおう', back: 'response; handling', pos: 'noun', exampleJp: '素早く対応した。', exampleReading: 'すばやくたいおうした。', exampleEn: 'They responded quickly.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Written-register connectives',
      cards: [
        { front: 'および', back: 'and; as well as (formal)', pos: 'conjunction', exampleJp: '氏名および住所を記入。', exampleReading: 'しめいおよびじゅうしょをきにゅう。', exampleEn: 'Fill in your name and address.' },
        { front: 'ならびに', back: 'and also (very formal)', pos: 'conjunction', exampleJp: '教員ならびに学生の皆様。', exampleReading: 'きょういんならびにがくせいのみなさま。', exampleEn: 'Faculty and students alike.' },
        { front: 'したがって', back: 'therefore; accordingly', pos: 'conjunction', exampleJp: '雨だ。したがって中止する。', exampleReading: 'あめだ。したがってちゅうしする。', exampleEn: "It's raining; therefore we cancel." },
        { front: 'ただし', back: 'however; provided that', pos: 'conjunction', exampleJp: '無料。ただし予約が必要。', exampleReading: 'むりょう。ただしよやくがひつよう。', exampleEn: 'Free — but booking is required.' },
        { front: 'なお', back: 'furthermore; incidentally (notices)', pos: 'conjunction', exampleJp: 'なお、詳細は後日連絡します。', exampleReading: 'なお、しょうさいはごじつれんらくします。', exampleEn: 'We will send details later.' },
        { front: 'むしろ', back: 'rather; if anything', pos: 'adverb', exampleJp: '嫌いではない。むしろ好きだ。', exampleReading: 'きらいではない。むしろすきだ。', exampleEn: "I don't dislike it — I rather like it." },
        { front: 'ちなみに', back: 'by the way; incidentally', pos: 'conjunction', exampleJp: 'ちなみに私も行きます。', exampleReading: 'ちなみにわたしもいきます。', exampleEn: "By the way, I'm going too." },
        { front: 'そのため', back: 'for that reason', pos: 'conjunction', exampleJp: '事故があった。そのため遅れた。', exampleReading: 'じこがあった。そのためおくれた。', exampleEn: 'There was an accident, so I was late.' },
        { front: 'とはいえ', back: 'that said; even so', pos: 'conjunction', exampleJp: '安い。とはいえ品質は良い。', exampleReading: 'やすい。とはいえひんしつはよい。', exampleEn: 'Cheap — that said, the quality is good.' },
        { front: 'いわゆる', back: 'so-called', pos: 'pre-noun adjectival', exampleJp: 'いわゆる天才だ。', exampleReading: 'いわゆるてんさいだ。', exampleEn: "He's what you'd call a genius." },
        { front: '一方', reading: 'いっぽう', back: 'on the other hand; meanwhile', pos: 'noun/conjunction', exampleJp: '一方、値段は高い。', exampleReading: 'いっぽう、ねだんはたかい。', exampleEn: 'On the other hand, it is expensive.' },
        { front: '要するに', reading: 'ようするに', back: 'in short; to sum up', pos: 'adverb', exampleJp: '要するに反対なんだね。', exampleReading: 'ようするにはんたいなんだね。', exampleEn: "In short, you're against it." },
        { front: '例えば', reading: 'たとえば', back: 'for example', pos: 'adverb', exampleJp: '例えばこの本はどう？', exampleReading: 'たとえばこのほんはどう？', exampleEn: 'How about this book, for instance?' },
        { front: 'あるいは', back: 'or; alternatively', pos: 'conjunction', exampleJp: '電話あるいはメールで。', exampleReading: 'でんわあるいはメールで。', exampleEn: 'By phone or by email.' },
        { front: 'まして', back: 'let alone; much less', pos: 'adverb', exampleJp: '大人でも難しい。まして子供には。', exampleReading: 'おとなでもむずかしい。ましてこどもには。', exampleEn: "It's hard even for adults, let alone children." }
      ]
    },
    {
      kind: 'vocab',
      title: 'People, character & relationships',
      cards: [
        { front: '性格', reading: 'せいかく', back: 'personality; character', pos: 'noun', exampleJp: '明るい性格だ。', exampleReading: 'あかるいせいかくだ。', exampleEn: 'She has a cheerful personality.' },
        { front: '態度', reading: 'たいど', back: 'attitude; manner', pos: 'noun', exampleJp: '態度が悪い。', exampleReading: 'たいどがわるい。', exampleEn: 'His attitude is bad.' },
        { front: '素直', reading: 'すなお', back: 'honest; obedient; frank', pos: 'na-adjective', exampleJp: '素直に謝った。', exampleReading: 'すなおにあやまった。', exampleEn: 'He apologised honestly.' },
        { front: '真面目', reading: 'まじめ', back: 'serious; diligent', pos: 'na-adjective', exampleJp: '真面目な学生だ。', exampleReading: 'まじめながくせいだ。', exampleEn: 'A diligent student.' },
        { front: '生意気', reading: 'なまいき', back: 'cheeky; impertinent', pos: 'na-adjective', exampleJp: '生意気を言うな。', exampleReading: 'なまいきをいうな。', exampleEn: "Don't get cheeky." },
        { front: '意地悪', reading: 'いじわる', back: 'mean; spiteful', pos: 'na-adjective/noun', exampleJp: '意地悪しないで。', exampleReading: 'いじわるしないで。', exampleEn: "Don't be mean." },
        { front: '優しさ', reading: 'やさしさ', back: 'kindness', pos: 'noun', exampleJp: '彼の優しさに救われた。', exampleReading: 'かれのやさしさにすくわれた。', exampleEn: 'His kindness saved me.' },
        { front: '信頼', reading: 'しんらい', back: 'trust; confidence (in someone)', pos: 'noun', exampleJp: '信頼を失った。', exampleReading: 'しんらいをうしなった。', exampleEn: 'He lost their trust.' },
        { front: '尊敬', reading: 'そんけい', back: 'respect; esteem', pos: 'noun', exampleJp: '父を尊敬している。', exampleReading: 'ちちをそんけいしている。', exampleEn: 'I look up to my father.' },
        { front: '遠慮', reading: 'えんりょ', back: 'reserve; holding back', pos: 'noun', exampleJp: '遠慮しないで食べて。', exampleReading: 'えんりょしないでたべて。', exampleEn: "Help yourself, don't hold back." },
        { front: '我が儘', reading: 'わがまま', back: 'selfish; wilful', pos: 'na-adjective', exampleJp: '我が儘を言うな。', exampleReading: 'わがままをいうな。', exampleEn: "Don't be selfish." },
        { front: '恥ずかしい', reading: 'はずかしい', back: 'embarrassing; ashamed', pos: 'i-adjective', exampleJp: '恥ずかしくて言えない。', exampleReading: 'はずかしくていえない。', exampleEn: "I'm too embarrassed to say it." },
        { front: '羨む', reading: 'うらやむ', back: 'to envy', pos: 'verb (u)', exampleJp: '人を羨んでも仕方ない。', exampleReading: 'ひとをうらやんでもしかたない。', exampleEn: 'No use envying others.' },
        { front: '見直す', reading: 'みなおす', back: 'to re-evaluate; to think better of', pos: 'verb (u)', exampleJp: '彼を見直した。', exampleReading: 'かれをみなおした。', exampleEn: 'I have a new respect for him.' },
        { front: '見下す', reading: 'みくだす', back: 'to look down on', pos: 'verb (u)', exampleJp: '人を見下すな。', exampleReading: 'ひとをみくだすな。', exampleEn: "Don't look down on people." }
      ]
    },
    {
      kind: 'vocab',
      title: 'Nature, science & the physical world',
      cards: [
        { front: '自然', reading: 'しぜん', back: 'nature; natural', pos: 'noun/na-adjective', exampleJp: '自然が豊かな町だ。', exampleReading: 'しぜんがゆたかなまちだ。', exampleEn: 'A town rich in nature.' },
        { front: '資源', reading: 'しげん', back: 'resources', pos: 'noun', exampleJp: '資源が限られている。', exampleReading: 'しげんがかぎられている。', exampleEn: 'Resources are limited.' },
        { front: '汚染', reading: 'おせん', back: 'pollution; contamination', pos: 'noun', exampleJp: '空気が汚染されている。', exampleReading: 'くうきがおせんされている。', exampleEn: 'The air is polluted.' },
        { front: '温暖', reading: 'おんだん', back: 'warm (climate)', pos: 'na-adjective', exampleJp: '温暖な気候だ。', exampleReading: 'おんだんなきこうだ。', exampleEn: 'A mild climate.' },
        { front: '湿気', reading: 'しっけ', back: 'humidity; damp', pos: 'noun', exampleJp: '湿気が多い。', exampleReading: 'しっけがおおい。', exampleEn: "It's very humid." },
        { front: '乾燥', reading: 'かんそう', back: 'dryness; drying', pos: 'noun', exampleJp: '空気が乾燥している。', exampleReading: 'くうきがかんそうしている。', exampleEn: 'The air is dry.' },
        { front: '燃える', reading: 'もえる', back: 'to burn; to be fired up', pos: 'verb (ru)', exampleJp: '家が燃えている。', exampleReading: 'いえがもえている。', exampleEn: 'The house is on fire.' },
        { front: '溶ける', reading: 'とける', back: 'to melt; to dissolve', pos: 'verb (ru)', exampleJp: '雪が溶けた。', exampleReading: 'ゆきがとけた。', exampleEn: 'The snow melted.' },
        { front: '凍る', reading: 'こおる', back: 'to freeze', pos: 'verb (u)', exampleJp: '池が凍っている。', exampleReading: 'いけがこおっている。', exampleEn: 'The pond is frozen.' },
        { front: '沈む', reading: 'しずむ', back: 'to sink; to set (sun)', pos: 'verb (u)', exampleJp: '日が沈む。', exampleReading: 'ひがしずむ。', exampleEn: 'The sun sets.' },
        { front: '浮かぶ', reading: 'うかぶ', back: 'to float; to come to mind', pos: 'verb (u)', exampleJp: 'いい案が浮かんだ。', exampleReading: 'いいあんがうかんだ。', exampleEn: 'A good idea came to me.' },
        { front: '揺れる', reading: 'ゆれる', back: 'to shake; to sway', pos: 'verb (ru)', exampleJp: '地震で家が揺れた。', exampleReading: 'じしんでいえがゆれた。', exampleEn: 'The house shook in the quake.' },
        { front: '爆発', reading: 'ばくはつ', back: 'explosion', pos: 'noun', exampleJp: '怒りが爆発した。', exampleReading: 'いかりがばくはつした。', exampleEn: 'His anger exploded.' },
        { front: '観測', reading: 'かんそく', back: 'observation (scientific)', pos: 'noun', exampleJp: '星を観測する。', exampleReading: 'ほしをかんそくする。', exampleEn: 'To observe the stars.' },
        { front: '現象', reading: 'げんしょう', back: 'phenomenon', pos: 'noun', exampleJp: '珍しい現象だ。', exampleReading: 'めずらしいげんしょうだ。', exampleEn: 'It is a rare phenomenon.' }
      ]
    }
  ]
}

export const N2_KANJI_COURSE: SeedCourse = {
  title: 'JLPT N2 Kanji',
  description:
    'The 150 highest-value N2 characters — the ones that carry news, contracts, ' +
    'documentation and any story with politics or money in it. Past N3, kanji stick ' +
    'best through reading, so mine what you meet and let this cover the backbone.',
  level: 'N2',
  difficulty: 19,
  lessons: [
    {
      kind: 'kanji',
      title: 'Government & law',
      cards: [
        { front: '政', reading: 'せい', back: 'government; politics', onyomi: 'セイ', kunyomi: 'まつりごと', exampleJp: '政治', exampleReading: 'せいじ', exampleEn: 'politics' },
        { front: '治', reading: 'ち', back: 'govern; cure', onyomi: 'ジ, チ', kunyomi: 'おさ(める), なお(る)', exampleJp: '治る', exampleReading: 'なおる', exampleEn: 'to get better' },
        { front: '法', reading: 'ほう', back: 'law; method', onyomi: 'ホウ', exampleJp: '方法', exampleReading: 'ほうほう', exampleEn: 'method' },
        { front: '律', reading: 'りつ', back: 'law; rhythm', onyomi: 'リツ', exampleJp: '法律', exampleReading: 'ほうりつ', exampleEn: 'law' },
        { front: '権', reading: 'けん', back: 'right; authority', onyomi: 'ケン', exampleJp: '権利', exampleReading: 'けんり', exampleEn: 'a right' },
        { front: '制', reading: 'せい', back: 'system; control', onyomi: 'セイ', exampleJp: '制度', exampleReading: 'せいど', exampleEn: 'system' },
        { front: '議', reading: 'ぎ', back: 'deliberation; debate', onyomi: 'ギ', exampleJp: '会議', exampleReading: 'かいぎ', exampleEn: 'meeting' },
        { front: '挙', reading: 'あ(げる)', back: 'raise; hold (an event)', onyomi: 'キョ', kunyomi: 'あ(げる), あ(がる)', exampleJp: '選挙', exampleReading: 'せんきょ', exampleEn: 'election' },
        { front: '党', reading: 'とう', back: 'political party', onyomi: 'トウ', exampleJp: '政党', exampleReading: 'せいとう', exampleEn: 'political party' },
        { front: '官', reading: 'かん', back: 'official; government post', onyomi: 'カン', exampleJp: '警官', exampleReading: 'けいかん', exampleEn: 'police officer' },
        { front: '庁', reading: 'ちょう', back: 'government agency', onyomi: 'チョウ', exampleJp: '県庁', exampleReading: 'けんちょう', exampleEn: 'prefectural office' },
        { front: '県', reading: 'けん', back: 'prefecture', onyomi: 'ケン', exampleJp: '県内', exampleReading: 'けんない', exampleEn: 'within the prefecture' },
        { front: '令', reading: 'れい', back: 'command; order', onyomi: 'レイ', exampleJp: '命令', exampleReading: 'めいれい', exampleEn: 'an order' },
        { front: '察', reading: 'さつ', back: 'guess; police', onyomi: 'サツ', exampleJp: '警察', exampleReading: 'けいさつ', exampleEn: 'police' },
        { front: '警', reading: 'けい', back: 'warn; guard', onyomi: 'ケイ', exampleJp: '警備', exampleReading: 'けいび', exampleEn: 'security' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Money & the economy',
      cards: [
        { front: '済', reading: 'す(む)', back: 'finish; settle', onyomi: 'サイ', kunyomi: 'す(む), す(ませる)', exampleJp: '経済', exampleReading: 'けいざい', exampleEn: 'economy' },
        { front: '資', reading: 'し', back: 'resources; capital', onyomi: 'シ', exampleJp: '資料', exampleReading: 'しりょう', exampleEn: 'materials; documents' },
        { front: '産', reading: 'さん', back: 'produce; give birth', onyomi: 'サン', kunyomi: 'う(む), う(まれる)', exampleJp: '生産', exampleReading: 'せいさん', exampleEn: 'production' },
        { front: '貿', reading: 'ぼう', back: 'trade', onyomi: 'ボウ', exampleJp: '貿易', exampleReading: 'ぼうえき', exampleEn: 'foreign trade' },
        { front: '易', reading: 'えき', back: 'easy; exchange', onyomi: 'エキ, イ', kunyomi: 'やさ(しい)', exampleJp: '簡易', exampleReading: 'かんい', exampleEn: 'simplified' },
        { front: '商', reading: 'しょう', back: 'commerce', onyomi: 'ショウ', kunyomi: 'あきな(う)', exampleJp: '商品', exampleReading: 'しょうひん', exampleEn: 'merchandise' },
        { front: '税', reading: 'ぜい', back: 'tax', onyomi: 'ゼイ', exampleJp: '税金', exampleReading: 'ぜいきん', exampleEn: 'tax' },
        { front: '収', reading: 'しゅう', back: 'take in; income', onyomi: 'シュウ', kunyomi: 'おさ(める)', exampleJp: '収入', exampleReading: 'しゅうにゅう', exampleEn: 'income' },
        { front: '支', reading: 'し', back: 'support; branch; pay out', onyomi: 'シ', kunyomi: 'ささ(える)', exampleJp: '支払い', exampleReading: 'しはらい', exampleEn: 'payment' },
        { front: '給', reading: 'きゅう', back: 'supply; salary', onyomi: 'キュウ', exampleJp: '給料', exampleReading: 'きゅうりょう', exampleEn: 'salary' },
        { front: '額', reading: 'がく', back: 'amount; forehead; frame', onyomi: 'ガク', kunyomi: 'ひたい', exampleJp: '金額', exampleReading: 'きんがく', exampleEn: 'sum of money' },
        { front: '貯', reading: 'ちょ', back: 'savings', onyomi: 'チョ', exampleJp: '貯金', exampleReading: 'ちょきん', exampleEn: 'savings' },
        { front: '預', reading: 'あず(ける)', back: 'deposit; entrust', onyomi: 'ヨ', kunyomi: 'あず(ける), あず(かる)', exampleJp: '預金', exampleReading: 'よきん', exampleEn: 'bank deposit' },
        { front: '券', reading: 'けん', back: 'ticket; certificate', onyomi: 'ケン', exampleJp: '切符券', exampleReading: 'きっぷけん', exampleEn: 'ticket voucher' },
        { front: '価', reading: 'か', back: 'value; price', onyomi: 'カ', kunyomi: 'あたい', exampleJp: '価格', exampleReading: 'かかく', exampleEn: 'price' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Work & organizations',
      cards: [
        { front: '職', reading: 'しょく', back: 'occupation; post', onyomi: 'ショク', exampleJp: '就職', exampleReading: 'しゅうしょく', exampleEn: 'getting a job' },
        { front: '務', reading: 'む', back: 'duty; service', onyomi: 'ム', kunyomi: 'つと(める)', exampleJp: '義務', exampleReading: 'ぎむ', exampleEn: 'obligation' },
        { front: '責', reading: 'せき', back: 'blame; responsibility', onyomi: 'セキ', kunyomi: 'せ(める)', exampleJp: '責任', exampleReading: 'せきにん', exampleEn: 'responsibility' },
        { front: '営', reading: 'えい', back: 'manage; run', onyomi: 'エイ', kunyomi: 'いとな(む)', exampleJp: '経営', exampleReading: 'けいえい', exampleEn: 'management' },
        { front: '管', reading: 'かん', back: 'pipe; control', onyomi: 'カン', kunyomi: 'くだ', exampleJp: '管理', exampleReading: 'かんり', exampleEn: 'management; upkeep' },
        { front: '局', reading: 'きょく', back: 'bureau; office', onyomi: 'キョク', exampleJp: '結局', exampleReading: 'けっきょく', exampleEn: 'in the end' },
        { front: '課', reading: 'か', back: 'section; lesson', onyomi: 'カ', exampleJp: '課題', exampleReading: 'かだい', exampleEn: 'assignment; issue' },
        { front: '委', reading: 'い', back: 'entrust; committee', onyomi: 'イ', kunyomi: 'ゆだ(ねる)', exampleJp: '委員', exampleReading: 'いいん', exampleEn: 'committee member' },
        { front: '労', reading: 'ろう', back: 'labour; toil', onyomi: 'ロウ', exampleJp: '労働', exampleReading: 'ろうどう', exampleEn: 'labour' },
        { front: '協', reading: 'きょう', back: 'cooperation', onyomi: 'キョウ', exampleJp: '協力', exampleReading: 'きょうりょく', exampleEn: 'cooperation' },
        { front: '企', reading: 'き', back: 'plan; undertake', onyomi: 'キ', kunyomi: 'くわだ(てる)', exampleJp: '企業', exampleReading: 'きぎょう', exampleEn: 'enterprise' },
        { front: '個', reading: 'こ', back: 'individual; counter for items', onyomi: 'コ', exampleJp: '個人', exampleReading: 'こじん', exampleEn: 'individual' },
        { front: '団', reading: 'だん', back: 'group; association', onyomi: 'ダン', exampleJp: '集団', exampleReading: 'しゅうだん', exampleEn: 'group' },
        { front: '織', reading: 'お(る)', back: 'weave; organize', onyomi: 'シキ, ショク', kunyomi: 'お(る)', exampleJp: '組織', exampleReading: 'そしき', exampleEn: 'organization' },
        { front: '補', reading: 'おぎな(う)', back: 'supplement; make up for', onyomi: 'ホ', kunyomi: 'おぎな(う)', exampleJp: '候補', exampleReading: 'こうほ', exampleEn: 'candidate' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Thought & judgment',
      cards: [
        { front: '論', reading: 'ろん', back: 'argument; theory', onyomi: 'ロン', exampleJp: '議論', exampleReading: 'ぎろん', exampleEn: 'discussion; debate' },
        { front: '判', reading: 'はん', back: 'judge; stamp', onyomi: 'ハン, バン', exampleJp: '判断', exampleReading: 'はんだん', exampleEn: 'judgment' },
        { front: '断', reading: 'ことわ(る)', back: 'sever; refuse; decide', onyomi: 'ダン', kunyomi: 'ことわ(る), た(つ)', exampleJp: '断る', exampleReading: 'ことわる', exampleEn: 'to refuse' },
        { front: '識', reading: 'しき', back: 'discernment; knowledge', onyomi: 'シキ', exampleJp: '知識', exampleReading: 'ちしき', exampleEn: 'knowledge' },
        { front: '想', reading: 'そう', back: 'idea; conceive', onyomi: 'ソウ', exampleJp: '想像', exampleReading: 'そうぞう', exampleEn: 'imagination' },
        { front: '憶', reading: 'おく', back: 'recollection', onyomi: 'オク', exampleJp: '記憶', exampleReading: 'きおく', exampleEn: 'memory' },
        { front: '慮', reading: 'りょ', back: 'consideration; prudence', onyomi: 'リョ', exampleJp: '遠慮', exampleReading: 'えんりょ', exampleEn: 'reserve; restraint' },
        { front: '概', reading: 'がい', back: 'outline; general', onyomi: 'ガイ', exampleJp: '概念', exampleReading: 'がいねん', exampleEn: 'concept' },
        { front: '較', reading: 'かく', back: 'compare', onyomi: 'カク', exampleJp: '比較', exampleReading: 'ひかく', exampleEn: 'comparison' },
        { front: '評', reading: 'ひょう', back: 'evaluate; criticism', onyomi: 'ヒョウ', exampleJp: '評価', exampleReading: 'ひょうか', exampleEn: 'evaluation' },
        { front: '存', reading: 'そん', back: 'exist; know', onyomi: 'ソン, ゾン', exampleJp: '存在', exampleReading: 'そんざい', exampleEn: 'existence' },
        { front: '確', reading: 'たし(か)', back: 'certain; confirm', onyomi: 'カク', kunyomi: 'たし(か), たし(かめる)', exampleJp: '確認', exampleReading: 'かくにん', exampleEn: 'confirmation' },
        { front: '針', reading: 'はり', back: 'needle; policy', onyomi: 'シン', kunyomi: 'はり', exampleJp: '方針', exampleReading: 'ほうしん', exampleEn: 'policy; course' },
        { front: '略', reading: 'りゃく', back: 'abbreviation; strategy', onyomi: 'リャク', exampleJp: '省略', exampleReading: 'しょうりゃく', exampleEn: 'omission' },
        { front: '承', reading: 'しょう', back: 'consent; acknowledge', onyomi: 'ショウ', kunyomi: 'うけたまわ(る)', exampleJp: '承知', exampleReading: 'しょうち', exampleEn: 'consent; understanding' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Media & communication',
      cards: [
        { front: '報', reading: 'ほう', back: 'report; news', onyomi: 'ホウ', kunyomi: 'むく(いる)', exampleJp: '情報', exampleReading: 'じょうほう', exampleEn: 'information' },
        { front: '述', reading: 'の(べる)', back: 'state; mention', onyomi: 'ジュツ', kunyomi: 'の(べる)', exampleJp: '記述', exampleReading: 'きじゅつ', exampleEn: 'description' },
        { front: '訳', reading: 'わけ', back: 'translate; reason', onyomi: 'ヤク', kunyomi: 'わけ', exampleJp: '翻訳', exampleReading: 'ほんやく', exampleEn: 'translation' },
        { front: '訪', reading: 'たず(ねる)', back: 'visit', onyomi: 'ホウ', kunyomi: 'たず(ねる), おとず(れる)', exampleJp: '訪問', exampleReading: 'ほうもん', exampleEn: 'a visit' },
        { front: '討', reading: 'とう', back: 'discuss; attack', onyomi: 'トウ', kunyomi: 'う(つ)', exampleJp: '検討', exampleReading: 'けんとう', exampleEn: 'consideration' },
        { front: '講', reading: 'こう', back: 'lecture', onyomi: 'コウ', exampleJp: '講義', exampleReading: 'こうぎ', exampleEn: 'lecture' },
        { front: '演', reading: 'えん', back: 'perform; act', onyomi: 'エン', exampleJp: '演技', exampleReading: 'えんぎ', exampleEn: 'acting; performance' },
        { front: '賛', reading: 'さん', back: 'approve; praise', onyomi: 'サン', exampleJp: '賛成', exampleReading: 'さんせい', exampleEn: 'agreement' },
        { front: '否', reading: 'ひ', back: 'deny; no', onyomi: 'ヒ', kunyomi: 'いな', exampleJp: '否定', exampleReading: 'ひてい', exampleEn: 'denial' },
        { front: '招', reading: 'まね(く)', back: 'invite; bring about', onyomi: 'ショウ', kunyomi: 'まね(く)', exampleJp: '招待', exampleReading: 'しょうたい', exampleEn: 'invitation' },
        { front: '誘', reading: 'さそ(う)', back: 'invite; tempt', onyomi: 'ユウ', kunyomi: 'さそ(う)', exampleJp: '誘う', exampleReading: 'さそう', exampleEn: 'to invite someone along' },
        { front: '誌', reading: 'し', back: 'magazine; record', onyomi: 'シ', exampleJp: '雑誌', exampleReading: 'ざっし', exampleEn: 'magazine' },
        { front: '版', reading: 'はん', back: 'edition; printing block', onyomi: 'ハン', exampleJp: '出版', exampleReading: 'しゅっぱん', exampleEn: 'publishing' },
        { front: '刊', reading: 'かん', back: 'publish; issue', onyomi: 'カン', exampleJp: '週刊', exampleReading: 'しゅうかん', exampleEn: 'weekly (publication)' },
        { front: '詳', reading: 'くわ(しい)', back: 'detailed', onyomi: 'ショウ', kunyomi: 'くわ(しい)', exampleJp: '詳しい', exampleReading: 'くわしい', exampleEn: 'detailed; well-informed' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Character & feeling',
      cards: [
        { front: '性', reading: 'せい', back: 'nature; gender', onyomi: 'セイ, ショウ', exampleJp: '性格', exampleReading: 'せいかく', exampleEn: 'personality' },
        { front: '格', reading: 'かく', back: 'status; rank; case', onyomi: 'カク', exampleJp: '合格', exampleReading: 'ごうかく', exampleEn: 'passing (an exam)' },
        { front: '態', reading: 'たい', back: 'condition; attitude', onyomi: 'タイ', exampleJp: '態度', exampleReading: 'たいど', exampleEn: 'attitude' },
        { front: '傾', reading: 'かたむ(く)', back: 'lean; incline', onyomi: 'ケイ', kunyomi: 'かたむ(く)', exampleJp: '傾向', exampleReading: 'けいこう', exampleEn: 'tendency' },
        { front: '向', reading: 'む(く)', back: 'face; turn toward', onyomi: 'コウ', kunyomi: 'む(く), む(かう)', exampleJp: '方向', exampleReading: 'ほうこう', exampleEn: 'direction' },
        { front: '志', reading: 'こころざし', back: 'will; aspiration', onyomi: 'シ', kunyomi: 'こころざ(す)', exampleJp: '意志', exampleReading: 'いし', exampleEn: 'will; volition' },
        { front: '誠', reading: 'まこと', back: 'sincerity', onyomi: 'セイ', kunyomi: 'まこと', exampleJp: '誠実', exampleReading: 'せいじつ', exampleEn: 'sincere' },
        { front: '敬', reading: 'うやま(う)', back: 'respect', onyomi: 'ケイ', kunyomi: 'うやま(う)', exampleJp: '尊敬', exampleReading: 'そんけい', exampleEn: 'respect' },
        { front: '尊', reading: 'とうと(い)', back: 'revere; precious', onyomi: 'ソン', kunyomi: 'とうと(い), たっと(い)', exampleJp: '尊重', exampleReading: 'そんちょう', exampleEn: 'respect (for wishes)' },
        { front: '憎', reading: 'にく(む)', back: 'hate', onyomi: 'ゾウ', kunyomi: 'にく(む), にく(い)', exampleJp: '憎む', exampleReading: 'にくむ', exampleEn: 'to hate' },
        { front: '嫌', reading: 'きら(い)', back: 'dislike', onyomi: 'ケン', kunyomi: 'きら(い), いや', exampleJp: '嫌い', exampleReading: 'きらい', exampleEn: 'disliked' },
        { front: '恥', reading: 'は(じる)', back: 'shame', onyomi: 'チ', kunyomi: 'は(じる), はずか(しい)', exampleJp: '恥ずかしい', exampleReading: 'はずかしい', exampleEn: 'embarrassing' },
        { front: '誇', reading: 'ほこ(る)', back: 'boast; pride', onyomi: 'コ', kunyomi: 'ほこ(る)', exampleJp: '誇り', exampleReading: 'ほこり', exampleEn: 'pride' },
        { front: '謙', reading: 'けん', back: 'humble; modest', onyomi: 'ケン', exampleJp: '謙虚', exampleReading: 'けんきょ', exampleEn: 'modesty' },
        { front: '康', reading: 'こう', back: 'ease; health', onyomi: 'コウ', exampleJp: '健康', exampleReading: 'けんこう', exampleEn: 'health' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Environment & matter',
      cards: [
        { front: '境', reading: 'さかい', back: 'boundary; border', onyomi: 'キョウ', kunyomi: 'さかい', exampleJp: '国境', exampleReading: 'こっきょう', exampleEn: 'national border' },
        { front: '環', reading: 'かん', back: 'ring; surround', onyomi: 'カン', exampleJp: '環境', exampleReading: 'かんきょう', exampleEn: 'environment' },
        { front: '汚', reading: 'きたな(い)', back: 'dirty; pollute', onyomi: 'オ', kunyomi: 'きたな(い), よご(れる)', exampleJp: '汚れる', exampleReading: 'よごれる', exampleEn: 'to get dirty' },
        { front: '染', reading: 'そ(める)', back: 'dye; stain', onyomi: 'セン', kunyomi: 'そ(める), し(みる)', exampleJp: '汚染', exampleReading: 'おせん', exampleEn: 'pollution' },
        { front: '源', reading: 'みなもと', back: 'source; origin', onyomi: 'ゲン', kunyomi: 'みなもと', exampleJp: '資源', exampleReading: 'しげん', exampleEn: 'resources' },
        { front: '燃', reading: 'も(える)', back: 'burn', onyomi: 'ネン', kunyomi: 'も(える), も(やす)', exampleJp: '燃える', exampleReading: 'もえる', exampleEn: 'to burn' },
        { front: '素', reading: 'そ', back: 'element; plain', onyomi: 'ソ, ス', exampleJp: '素直', exampleReading: 'すなお', exampleEn: 'honest; frank' },
        { front: '酸', reading: 'さん', back: 'acid; sour', onyomi: 'サン', kunyomi: 'す(い)', exampleJp: '酸素', exampleReading: 'さんそ', exampleEn: 'oxygen' },
        { front: '液', reading: 'えき', back: 'liquid', onyomi: 'エキ', exampleJp: '液体', exampleReading: 'えきたい', exampleEn: 'liquid' },
        { front: '圧', reading: 'あつ', back: 'pressure', onyomi: 'アツ', exampleJp: '気圧', exampleReading: 'きあつ', exampleEn: 'atmospheric pressure' },
        { front: '蒸', reading: 'む(す)', back: 'steam', onyomi: 'ジョウ', kunyomi: 'む(す), む(れる)', exampleJp: '蒸気', exampleReading: 'じょうき', exampleEn: 'steam' },
        { front: '湿', reading: 'しめ(る)', back: 'damp; humid', onyomi: 'シツ', kunyomi: 'しめ(る)', exampleJp: '湿度', exampleReading: 'しつど', exampleEn: 'humidity' },
        { front: '乾', reading: 'かわ(く)', back: 'dry', onyomi: 'カン', kunyomi: 'かわ(く)', exampleJp: '乾杯', exampleReading: 'かんぱい', exampleEn: 'cheers!' },
        { front: '濃', reading: 'こ(い)', back: 'thick; strong (flavour)', onyomi: 'ノウ', kunyomi: 'こ(い)', exampleJp: '濃い', exampleReading: 'こい', exampleEn: 'strong; dense' },
        { front: '薄', reading: 'うす(い)', back: 'thin; weak', onyomi: 'ハク', kunyomi: 'うす(い)', exampleJp: '薄い', exampleReading: 'うすい', exampleEn: 'thin; pale' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Body & motion II',
      cards: [
        { front: '触', reading: 'さわ(る)', back: 'touch', onyomi: 'ショク', kunyomi: 'さわ(る), ふ(れる)', exampleJp: '触れる', exampleReading: 'ふれる', exampleEn: 'to touch on' },
        { front: '抱', reading: 'だ(く)', back: 'embrace; hold', onyomi: 'ホウ', kunyomi: 'だ(く), かか(える)', exampleJp: '抱える', exampleReading: 'かかえる', exampleEn: 'to hold; to be burdened with' },
        { front: '握', reading: 'にぎ(る)', back: 'grip; grasp', onyomi: 'アク', kunyomi: 'にぎ(る)', exampleJp: '握手', exampleReading: 'あくしゅ', exampleEn: 'handshake' },
        { front: '抜', reading: 'ぬ(く)', back: 'pull out; surpass', onyomi: 'バツ', kunyomi: 'ぬ(く), ぬ(ける)', exampleJp: '抜く', exampleReading: 'ぬく', exampleEn: 'to pull out' },
        { front: '振', reading: 'ふ(る)', back: 'wave; shake', onyomi: 'シン', kunyomi: 'ふ(る), ふ(れる)', exampleJp: '振り返る', exampleReading: 'ふりかえる', exampleEn: 'to look back' },
        { front: '揺', reading: 'ゆ(れる)', back: 'sway; shake', onyomi: 'ヨウ', kunyomi: 'ゆ(れる), ゆ(らす)', exampleJp: '揺れる', exampleReading: 'ゆれる', exampleEn: 'to shake' },
        { front: '眺', reading: 'なが(める)', back: 'gaze at; view', onyomi: 'チョウ', kunyomi: 'なが(める)', exampleJp: '眺め', exampleReading: 'ながめ', exampleEn: 'a view' },
        { front: '睡', reading: 'すい', back: 'sleep', onyomi: 'スイ', exampleJp: '睡眠', exampleReading: 'すいみん', exampleEn: 'sleep' },
        { front: '吸', reading: 'す(う)', back: 'inhale; suck', onyomi: 'キュウ', kunyomi: 'す(う)', exampleJp: '呼吸', exampleReading: 'こきゅう', exampleEn: 'breathing' },
        { front: '吐', reading: 'は(く)', back: 'spit out; vomit', onyomi: 'ト', kunyomi: 'は(く)', exampleJp: '吐く', exampleReading: 'はく', exampleEn: 'to throw up' },
        { front: '潜', reading: 'もぐ(る)', back: 'dive; lurk', onyomi: 'セン', kunyomi: 'もぐ(る), ひそ(む)', exampleJp: '潜る', exampleReading: 'もぐる', exampleEn: 'to dive under' },
        { front: '浮', reading: 'う(く)', back: 'float', onyomi: 'フ', kunyomi: 'う(く), う(かぶ)', exampleJp: '浮かぶ', exampleReading: 'うかぶ', exampleEn: 'to float; to come to mind' },
        { front: '沈', reading: 'しず(む)', back: 'sink', onyomi: 'チン', kunyomi: 'しず(む), しず(める)', exampleJp: '沈む', exampleReading: 'しずむ', exampleEn: 'to sink' },
        { front: '溶', reading: 'と(ける)', back: 'melt; dissolve', onyomi: 'ヨウ', kunyomi: 'と(ける), と(かす)', exampleJp: '溶ける', exampleReading: 'とける', exampleEn: 'to melt' },
        { front: '脱', reading: 'ぬ(ぐ)', back: 'take off; escape', onyomi: 'ダツ', kunyomi: 'ぬ(ぐ), ぬ(げる)', exampleJp: '脱ぐ', exampleReading: 'ぬぐ', exampleEn: 'to take off (clothes)' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Order, degree & time',
      cards: [
        { front: '順', reading: 'じゅん', back: 'order; sequence', onyomi: 'ジュン', exampleJp: '順番', exampleReading: 'じゅんばん', exampleEn: 'turn; order' },
        { front: '序', reading: 'じょ', back: 'preface; order', onyomi: 'ジョ', exampleJp: '順序', exampleReading: 'じゅんじょ', exampleEn: 'order; sequence' },
        { front: '階', reading: 'かい', back: 'floor; storey; rank', onyomi: 'カイ', exampleJp: '段階', exampleReading: 'だんかい', exampleEn: 'stage; phase' },
        { front: '層', reading: 'そう', back: 'layer; stratum', onyomi: 'ソウ', exampleJp: '年齢層', exampleReading: 'ねんれいそう', exampleEn: 'age bracket' },
        { front: '位', reading: 'くらい', back: 'rank; position; about', onyomi: 'イ', kunyomi: 'くらい', exampleJp: '位置', exampleReading: 'いち', exampleEn: 'position' },
        { front: '置', reading: 'お(く)', back: 'put; place', onyomi: 'チ', kunyomi: 'お(く)', exampleJp: '置く', exampleReading: 'おく', exampleEn: 'to put down' },
        { front: '程', reading: 'ほど', back: 'extent; degree', onyomi: 'テイ', kunyomi: 'ほど', exampleJp: '程度', exampleReading: 'ていど', exampleEn: 'degree; extent' },
        { front: '限', reading: 'かぎ(る)', back: 'limit', onyomi: 'ゲン', kunyomi: 'かぎ(る)', exampleJp: '制限', exampleReading: 'せいげん', exampleEn: 'restriction' },
        { front: '際', reading: 'さい', back: 'occasion; edge', onyomi: 'サイ', kunyomi: 'きわ', exampleJp: '国際', exampleReading: 'こくさい', exampleEn: 'international' },
        { front: '及', reading: 'およ(ぶ)', back: 'reach; extend to', onyomi: 'キュウ', kunyomi: 'およ(ぶ), およ(び)', exampleJp: '及ぶ', exampleReading: 'およぶ', exampleEn: 'to reach; to extend' },
        { front: '至', reading: 'いた(る)', back: 'arrive at; culminate', onyomi: 'シ', kunyomi: 'いた(る)', exampleJp: '至る', exampleReading: 'いたる', exampleEn: 'to lead to' },
        { front: '頃', reading: 'ころ', back: 'time; about when', onyomi: 'ケイ', kunyomi: 'ころ', exampleJp: '子供の頃', exampleReading: 'こどものころ', exampleEn: 'childhood' },
        { front: '昨', reading: 'さく', back: 'previous; last', onyomi: 'サク', exampleJp: '昨年', exampleReading: 'さくねん', exampleEn: 'last year' },
        { front: '翌', reading: 'よく', back: 'the following (day/year)', onyomi: 'ヨク', exampleJp: '翌日', exampleReading: 'よくじつ', exampleEn: 'the next day' },
        { front: '候', reading: 'こう', back: 'season; weather; sign', onyomi: 'コウ', exampleJp: '気候', exampleReading: 'きこう', exampleEn: 'climate' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Quality & quantity',
      cards: [
        { front: '状', reading: 'じょう', back: 'condition; letter', onyomi: 'ジョウ', exampleJp: '状況', exampleReading: 'じょうきょう', exampleEn: 'situation' },
        { front: '面', reading: 'めん', back: 'face; surface; aspect', onyomi: 'メン', kunyomi: 'おも, つら', exampleJp: '場面', exampleReading: 'ばめん', exampleEn: 'scene' },
        { front: '種', reading: 'たね', back: 'kind; seed', onyomi: 'シュ', kunyomi: 'たね', exampleJp: '種類', exampleReading: 'しゅるい', exampleEn: 'kind; type' },
        { front: '類', reading: 'るい', back: 'sort; category', onyomi: 'ルイ', kunyomi: 'たぐ(い)', exampleJp: '書類', exampleReading: 'しょるい', exampleEn: 'documents' },
        { front: '域', reading: 'いき', back: 'region; area', onyomi: 'イキ', exampleJp: '地域', exampleReading: 'ちいき', exampleEn: 'region' },
        { front: '幅', reading: 'はば', back: 'width; range', onyomi: 'フク', kunyomi: 'はば', exampleJp: '大幅', exampleReading: 'おおはば', exampleEn: 'substantial' },
        { front: '範', reading: 'はん', back: 'scope; model', onyomi: 'ハン', exampleJp: '範囲', exampleReading: 'はんい', exampleEn: 'scope; range' },
        { front: '囲', reading: 'かこ(む)', back: 'surround', onyomi: 'イ', kunyomi: 'かこ(む)', exampleJp: '周囲', exampleReading: 'しゅうい', exampleEn: 'surroundings' },
        { front: '均', reading: 'きん', back: 'level; even', onyomi: 'キン', exampleJp: '平均', exampleReading: 'へいきん', exampleEn: 'average' },
        { front: '差', reading: 'さ', back: 'difference', onyomi: 'サ', kunyomi: 'さ(す)', exampleJp: '差別', exampleReading: 'さべつ', exampleEn: 'discrimination' },
        { front: '満', reading: 'み(ちる)', back: 'full; satisfy', onyomi: 'マン', kunyomi: 'み(ちる), み(たす)', exampleJp: '満足', exampleReading: 'まんぞく', exampleEn: 'satisfaction' },
        { front: '余', reading: 'あま(る)', back: 'surplus; too much', onyomi: 'ヨ', kunyomi: 'あま(る), あま(り)', exampleJp: '余裕', exampleReading: 'よゆう', exampleEn: 'room; leeway' },
        { front: '械', reading: 'かい', back: 'machine; contrivance', onyomi: 'カイ', exampleJp: '機械', exampleReading: 'きかい', exampleEn: 'machine' },
        { front: '庫', reading: 'こ', back: 'storehouse', onyomi: 'コ', exampleJp: '冷蔵庫', exampleReading: 'れいぞうこ', exampleEn: 'refrigerator' },
        { front: '険', reading: 'けん', back: 'steep; danger', onyomi: 'ケン', kunyomi: 'けわ(しい)', exampleJp: '危険', exampleReading: 'きけん', exampleEn: 'danger' }
      ]
    }
  ]
}

export const N1_VOCAB_COURSE: SeedCourse = {
  title: 'JLPT N1 Vocabulary',
  description:
    'Literary and editorial vocabulary: the near-synonym sets N1 tests you on, the ' +
    'formal verbs of official prose, and the adverbs and onomatopoeia that carry tone ' +
    'in serious fiction. Read widely alongside this — at N1 the deck can only start you off.',
  level: 'N1',
  difficulty: 23,
  lessons: [
    {
      kind: 'vocab',
      title: 'Literary nouns',
      cards: [
        { front: '趣旨', reading: 'しゅし', back: 'purport; gist; aim', pos: 'noun', exampleJp: '話の趣旨が分からない。', exampleReading: 'はなしのしゅしがわからない。', exampleEn: "I don't get the point of the story." },
        { front: '本質', reading: 'ほんしつ', back: 'essence; true nature', pos: 'noun', exampleJp: '問題の本質を突く。', exampleReading: 'もんだいのほんしつをつく。', exampleEn: 'To get at the heart of the problem.' },
        { front: '核心', reading: 'かくしん', back: 'core; crux', pos: 'noun', exampleJp: '核心に触れる。', exampleReading: 'かくしんにふれる。', exampleEn: 'To touch on the crux of it.' },
        { front: '枠組み', reading: 'わくぐみ', back: 'framework', pos: 'noun', exampleJp: '議論の枠組みを決める。', exampleReading: 'ぎろんのわくぐみをきめる。', exampleEn: 'To set the framework for the discussion.' },
        { front: '構造', reading: 'こうぞう', back: 'structure', pos: 'noun', exampleJp: '社会の構造が変わった。', exampleReading: 'しゃかいのこうぞうがかわった。', exampleEn: 'The structure of society has changed.' },
        { front: '基盤', reading: 'きばん', back: 'foundation; base', pos: 'noun', exampleJp: '生活の基盤を築く。', exampleReading: 'せいかつのきばんをきずく。', exampleEn: 'To build a foundation for life.' },
        { front: '前例', reading: 'ぜんれい', back: 'precedent', pos: 'noun', exampleJp: '前例のない事態だ。', exampleReading: 'ぜんれいのないじたいだ。', exampleEn: 'An unprecedented situation.' },
        { front: '措置', reading: 'そち', back: 'measure; step (taken)', pos: 'noun', exampleJp: '緊急措置を取った。', exampleReading: 'きんきゅうそちをとった。', exampleEn: 'Emergency measures were taken.' },
        { front: '経緯', reading: 'けいい', back: 'how things came about; details', pos: 'noun', exampleJp: '事件の経緯を説明する。', exampleReading: 'じけんのけいいをせつめいする。', exampleEn: 'To explain how the incident unfolded.' },
        { front: '兆し', reading: 'きざし', back: 'sign; omen', pos: 'noun', exampleJp: '回復の兆しが見える。', exampleReading: 'かいふくのきざしがみえる。', exampleEn: 'There are signs of recovery.' },
        { front: '矛盾', reading: 'むじゅん', back: 'contradiction', pos: 'noun', exampleJp: '話に矛盾がある。', exampleReading: 'はなしにむじゅんがある。', exampleEn: "There's a contradiction in the story." },
        { front: '妥協', reading: 'だきょう', back: 'compromise', pos: 'noun', exampleJp: '妥協は許さない。', exampleReading: 'だきょうはゆるさない。', exampleEn: 'I will not compromise.' },
        { front: '偏見', reading: 'へんけん', back: 'prejudice', pos: 'noun', exampleJp: '偏見を持たないで。', exampleReading: 'へんけんをもたないで。', exampleEn: "Don't be prejudiced." },
        { front: '慣習', reading: 'かんしゅう', back: 'custom; convention', pos: 'noun', exampleJp: '古い慣習が残る。', exampleReading: 'ふるいかんしゅうがのこる。', exampleEn: 'Old customs persist.' },
        { front: '風潮', reading: 'ふうちょう', back: 'the prevailing mood; trend', pos: 'noun', exampleJp: '社会の風潮を反映する。', exampleReading: 'しゃかいのふうちょうをはんえいする。', exampleEn: 'It reflects the mood of society.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Near-synonyms — pick the right one',
      cards: [
        { front: '直ちに', reading: 'ただちに', back: 'immediately (formal, on the spot)', pos: 'adverb', exampleJp: '直ちに避難してください。', exampleReading: 'ただちにひなんしてください。', exampleEn: 'Evacuate immediately.' },
        { front: '速やかに', reading: 'すみやかに', back: 'promptly (without delay)', pos: 'adverb', exampleJp: '速やかに対応します。', exampleReading: 'すみやかにたいおうします。', exampleEn: 'We will respond promptly.' },
        { front: '早急に', reading: 'そうきゅうに', back: 'urgently; as soon as possible', pos: 'adverb', exampleJp: '早急に対策が必要だ。', exampleReading: 'そうきゅうにたいさくがひつようだ。', exampleEn: 'Countermeasures are urgently needed.' },
        { front: '改めて', reading: 'あらためて', back: 'anew; on another occasion', pos: 'adverb', exampleJp: '改めてご連絡します。', exampleReading: 'あらためてごれんらくします。', exampleEn: 'I will contact you again later.' },
        { front: '予め', reading: 'あらかじめ', back: 'in advance; beforehand', pos: 'adverb', exampleJp: '予めご了承ください。', exampleReading: 'あらかじめごりょうしょうください。', exampleEn: 'Please note this in advance.' },
        { front: '既に', reading: 'すでに', back: 'already (written)', pos: 'adverb', exampleJp: '既に完売しました。', exampleReading: 'すでにかんばいしました。', exampleEn: 'It has already sold out.' },
        { front: '飽くまで', reading: 'あくまで', back: 'to the very end; strictly (speaking)', pos: 'adverb', exampleJp: '飽くまで私の意見です。', exampleReading: 'あくまでわたしのいけんです。', exampleEn: 'This is strictly my own opinion.' },
        { front: '到底', reading: 'とうてい', back: '(not) possibly (+ negative)', pos: 'adverb', exampleJp: '到底間に合わない。', exampleReading: 'とうていまにあわない。', exampleEn: "There's no way I'll make it." },
        { front: '強いて', reading: 'しいて', back: 'if forced to say; by force', pos: 'adverb', exampleJp: '強いて言えば赤が好きだ。', exampleReading: 'しいていえばあかがすきだ。', exampleEn: 'If I had to pick, I like red.' },
        { front: '敢えて', reading: 'あえて', back: 'daringly; deliberately', pos: 'adverb', exampleJp: '敢えて反対した。', exampleReading: 'あえてはんたいした。', exampleEn: 'He deliberately objected.' },
        { front: '如何にも', reading: 'いかにも', back: 'indeed; typically; every bit the…', pos: 'adverb', exampleJp: '如何にも彼らしい。', exampleReading: 'いかにもかれらしい。', exampleEn: 'That is so like him.' },
        { front: '一概に', reading: 'いちがいに', back: 'sweepingly (+ negative)', pos: 'adverb', exampleJp: '一概には言えない。', exampleReading: 'いちがいにはいえない。', exampleEn: "You can't say that across the board." },
        { front: '概ね', reading: 'おおむね', back: 'generally; for the most part', pos: 'adverb', exampleJp: '概ね順調です。', exampleReading: 'おおむねじゅんちょうです。', exampleEn: 'Things are largely going well.' },
        { front: '専ら', reading: 'もっぱら', back: 'exclusively; entirely', pos: 'adverb', exampleJp: '専ら仕事に打ち込む。', exampleReading: 'もっぱらしごとにうちこむ。', exampleEn: 'He devotes himself entirely to work.' },
        { front: '辛うじて', reading: 'かろうじて', back: 'barely; only just', pos: 'adverb', exampleJp: '辛うじて合格した。', exampleReading: 'かろうじてごうかくした。', exampleEn: 'I barely passed.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Formal verbs of official prose',
      cards: [
        { front: '及ぼす', reading: 'およぼす', back: 'to exert (influence); to cause', pos: 'verb (u)', exampleJp: '悪影響を及ぼす。', exampleReading: 'あくえいきょうをおよぼす。', exampleEn: 'To have a bad effect.' },
        { front: '講じる', reading: 'こうじる', back: 'to take (measures)', pos: 'verb (ru)', exampleJp: '対策を講じる。', exampleReading: 'たいさくをこうじる。', exampleEn: 'To take countermeasures.' },
        { front: '担う', reading: 'になう', back: 'to shoulder; to bear (a role)', pos: 'verb (u)', exampleJp: '次世代を担う。', exampleReading: 'じせだいをになう。', exampleEn: 'To carry the next generation.' },
        { front: '促す', reading: 'うながす', back: 'to urge; to prompt', pos: 'verb (u)', exampleJp: '注意を促す。', exampleReading: 'ちゅういをうながす。', exampleEn: 'To call for caution.' },
        { front: '控える', reading: 'ひかえる', back: 'to refrain from; to be close at hand', pos: 'verb (ru)', exampleJp: '発言を控える。', exampleReading: 'はつげんをひかえる。', exampleEn: 'To refrain from comment.' },
        { front: '免れる', reading: 'まぬがれる', back: 'to escape; to avoid (blame)', pos: 'verb (ru)', exampleJp: '責任を免れない。', exampleReading: 'せきにんをまぬがれない。', exampleEn: 'He cannot escape responsibility.' },
        { front: '賄う', reading: 'まかなう', back: 'to cover (costs); to provide', pos: 'verb (u)', exampleJp: '費用を寄付で賄う。', exampleReading: 'ひようをきふでまかなう。', exampleEn: 'To cover costs with donations.' },
        { front: '施す', reading: 'ほどこす', back: 'to administer; to give (aid)', pos: 'verb (u)', exampleJp: '手当てを施す。', exampleReading: 'てあてをほどこす。', exampleEn: 'To administer treatment.' },
        { front: '貫く', reading: 'つらぬく', back: 'to carry through; to pierce', pos: 'verb (u)', exampleJp: '初志を貫く。', exampleReading: 'しょしをつらぬく。', exampleEn: 'To stick to one’s original intent.' },
        { front: '妨げる', reading: 'さまたげる', back: 'to hinder; to obstruct', pos: 'verb (ru)', exampleJp: '睡眠を妨げる。', exampleReading: 'すいみんをさまたげる。', exampleEn: 'To disturb sleep.' },
        { front: '損なう', reading: 'そこなう', back: 'to damage; to spoil', pos: 'verb (u)', exampleJp: '健康を損なう。', exampleReading: 'けんこうをそこなう。', exampleEn: 'To damage one’s health.' },
        { front: '滞る', reading: 'とどこおる', back: 'to be delayed; to fall behind', pos: 'verb (u)', exampleJp: '支払いが滞る。', exampleReading: 'しはらいがとどこおる。', exampleEn: 'Payments fall into arrears.' },
        { front: '帯びる', reading: 'おびる', back: 'to take on (a quality); to wear', pos: 'verb (ru)', exampleJp: '現実味を帯びる。', exampleReading: 'げんじつみをおびる。', exampleEn: 'To take on an air of reality.' },
        { front: '踏まえる', reading: 'ふまえる', back: 'to take into account; to be based on', pos: 'verb (ru)', exampleJp: '結果を踏まえて決める。', exampleReading: 'けっかをふまえてきめる。', exampleEn: 'To decide in light of the results.' },
        { front: '委ねる', reading: 'ゆだねる', back: 'to entrust; to leave to', pos: 'verb (ru)', exampleJp: '判断を委ねる。', exampleReading: 'はんだんをゆだねる。', exampleEn: 'To leave the judgment to someone.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Emotion at full strength',
      cards: [
        { front: '憂鬱', reading: 'ゆううつ', back: 'melancholy; gloom', pos: 'na-adjective/noun', exampleJp: '月曜は憂鬱だ。', exampleReading: 'げつようはゆううつだ。', exampleEn: 'Mondays are depressing.' },
        { front: '焦る', reading: 'あせる', back: 'to be impatient; to panic', pos: 'verb (u)', exampleJp: '焦らないでいい。', exampleReading: 'あせらないでいい。', exampleEn: 'No need to rush.' },
        { front: '苛立つ', reading: 'いらだつ', back: 'to get irritated', pos: 'verb (u)', exampleJp: '待たされて苛立つ。', exampleReading: 'またされていらだつ。', exampleEn: 'Being kept waiting irritates me.' },
        { front: '憤る', reading: 'いきどおる', back: 'to be indignant; to resent', pos: 'verb (u)', exampleJp: '不正に憤る。', exampleReading: 'ふせいにいきどおる。', exampleEn: 'To be outraged at the injustice.' },
        { front: '慰める', reading: 'なぐさめる', back: 'to console; to comfort', pos: 'verb (ru)', exampleJp: '友を慰める。', exampleReading: 'ともをなぐさめる。', exampleEn: 'To comfort a friend.' },
        { front: '励ます', reading: 'はげます', back: 'to encourage', pos: 'verb (u)', exampleJp: '彼女を励ました。', exampleReading: 'かのじょをはげました。', exampleEn: 'I encouraged her.' },
        { front: '慕う', reading: 'したう', back: 'to yearn for; to look up to', pos: 'verb (u)', exampleJp: '先生を慕っている。', exampleReading: 'せんせいをしたっている。', exampleEn: 'She looks up to her teacher.' },
        { front: '忍ぶ', reading: 'しのぶ', back: 'to endure; to slip past unseen', pos: 'verb (u)', exampleJp: '恥を忍んでお願いする。', exampleReading: 'はじをしのんでおねがいする。', exampleEn: 'I swallow my pride and ask.' },
        { front: '耐える', reading: 'たえる', back: 'to endure; to withstand', pos: 'verb (ru)', exampleJp: '痛みに耐える。', exampleReading: 'いたみにたえる。', exampleEn: 'To bear the pain.' },
        { front: '侮る', reading: 'あなどる', back: 'to underestimate; to hold in contempt', pos: 'verb (u)', exampleJp: '敵を侮るな。', exampleReading: 'てきをあなどるな。', exampleEn: "Don't underestimate the enemy." },
        { front: '憧れ', reading: 'あこがれ', back: 'longing; an object of admiration', pos: 'noun', exampleJp: '憧れの人に会えた。', exampleReading: 'あこがれのひとにあえた。', exampleEn: 'I met the person I admire.' },
        { front: '未練', reading: 'みれん', back: 'lingering attachment; regret', pos: 'noun', exampleJp: '未練を断ち切る。', exampleReading: 'みれんをたちきる。', exampleEn: 'To cut off lingering feelings.' },
        { front: '切ない', reading: 'せつない', back: 'painful; heart-wrenching', pos: 'i-adjective', exampleJp: '切ない結末だった。', exampleReading: 'せつないけつまつだった。', exampleEn: 'It was a bittersweet ending.' },
        { front: '潔い', reading: 'いさぎよい', back: 'graceful (in defeat); manly', pos: 'i-adjective', exampleJp: '潔く負けを認めた。', exampleReading: 'いさぎよくまけをみとめた。', exampleEn: 'He accepted defeat gracefully.' },
        { front: '虚しい', reading: 'むなしい', back: 'empty; futile', pos: 'i-adjective', exampleJp: '虚しい勝利だ。', exampleReading: 'むなしいしょうりだ。', exampleEn: 'A hollow victory.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'News & editorial',
      cards: [
        { front: '政権', reading: 'せいけん', back: 'political power; administration', pos: 'noun', exampleJp: '政権が交代した。', exampleReading: 'せいけんがこうたいした。', exampleEn: 'The administration changed.' },
        { front: '交渉', reading: 'こうしょう', back: 'negotiation', pos: 'noun', exampleJp: '交渉が決裂した。', exampleReading: 'こうしょうがけつれつした。', exampleEn: 'The negotiations broke down.' },
        { front: '締結', reading: 'ていけつ', back: 'conclusion (of a treaty)', pos: 'noun', exampleJp: '協定を締結した。', exampleReading: 'きょうていをていけつした。', exampleEn: 'They concluded an agreement.' },
        { front: '逮捕', reading: 'たいほ', back: 'arrest', pos: 'noun', exampleJp: '容疑者を逮捕した。', exampleReading: 'ようぎしゃをたいほした。', exampleEn: 'The suspect was arrested.' },
        { front: '訴訟', reading: 'そしょう', back: 'lawsuit', pos: 'noun', exampleJp: '訴訟を起こす。', exampleReading: 'そしょうをおこす。', exampleEn: 'To file a lawsuit.' },
        { front: '裁判', reading: 'さいばん', back: 'trial; court case', pos: 'noun', exampleJp: '裁判に勝った。', exampleReading: 'さいばんにかった。', exampleEn: 'They won the case.' },
        { front: '賠償', reading: 'ばいしょう', back: 'compensation; reparation', pos: 'noun', exampleJp: '損害賠償を求める。', exampleReading: 'そんがいばいしょうをもとめる。', exampleEn: 'To seek damages.' },
        { front: '株価', reading: 'かぶか', back: 'share price', pos: 'noun', exampleJp: '株価が急落した。', exampleReading: 'かぶかがきゅうらくした。', exampleEn: 'Share prices plunged.' },
        { front: '融資', reading: 'ゆうし', back: 'financing; a loan', pos: 'noun', exampleJp: '銀行が融資を決めた。', exampleReading: 'ぎんこうがゆうしをきめた。', exampleEn: 'The bank approved the loan.' },
        { front: '需要', reading: 'じゅよう', back: 'demand', pos: 'noun', exampleJp: '需要が高まっている。', exampleReading: 'じゅようがたかまっている。', exampleEn: 'Demand is rising.' },
        { front: '供給', reading: 'きょうきゅう', back: 'supply', pos: 'noun', exampleJp: '供給が追いつかない。', exampleReading: 'きょうきゅうがおいつかない。', exampleEn: "Supply can't keep up." },
        { front: '撤退', reading: 'てったい', back: 'withdrawal; pulling out', pos: 'noun', exampleJp: '市場から撤退する。', exampleReading: 'しじょうからてったいする。', exampleEn: 'To withdraw from the market.' },
        { front: '廃止', reading: 'はいし', back: 'abolition; discontinuation', pos: 'noun', exampleJp: '制度が廃止された。', exampleReading: 'せいどがはいしされた。', exampleEn: 'The system was abolished.' },
        { front: '覆す', reading: 'くつがえす', back: 'to overturn; to overrule', pos: 'verb (u)', exampleJp: '判決を覆した。', exampleReading: 'はんけつをくつがえした。', exampleEn: 'They overturned the ruling.' },
        { front: '相次ぐ', reading: 'あいつぐ', back: 'to happen one after another', pos: 'verb (u)', exampleJp: '事故が相次いだ。', exampleReading: 'じこがあいついだ。', exampleEn: 'Accidents happened one after another.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Advanced onomatopoeia',
      cards: [
        { front: 'しみじみ', back: 'keenly; with deep feeling', pos: 'adverb', exampleJp: 'しみじみと語った。', exampleReading: 'しみじみとかたった。', exampleEn: 'He spoke with quiet feeling.' },
        { front: 'つくづく', back: 'thoroughly; deeply (feel)', pos: 'adverb', exampleJp: 'つくづく嫌になった。', exampleReading: 'つくづくいやになった。', exampleEn: "I'm thoroughly sick of it." },
        { front: 'うんざり', back: 'fed up; sick of', pos: 'adverb', exampleJp: 'もううんざりだ。', exampleReading: 'もううんざりだ。', exampleEn: "I've had enough." },
        { front: 'ぼんやり', back: 'vaguely; absent-mindedly', pos: 'adverb', exampleJp: 'ぼんやり外を見ていた。', exampleReading: 'ぼんやりそとをみていた。', exampleEn: 'He gazed blankly outside.' },
        { front: 'はっきり', back: 'clearly; plainly', pos: 'adverb', exampleJp: 'はっきり言ってくれ。', exampleReading: 'はっきりいってくれ。', exampleEn: 'Say it plainly.' },
        { front: 'ぐったり', back: 'limply; exhausted', pos: 'adverb', exampleJp: '暑さでぐったりしている。', exampleReading: 'あつさでぐったりしている。', exampleEn: 'Wilting in the heat.' },
        { front: 'そわそわ', back: 'restlessly; fidgeting', pos: 'adverb', exampleJp: 'さっきからそわそわしている。', exampleReading: 'さっきからそわそわしている。', exampleEn: "He's been fidgety for a while." },
        { front: 'いらいら', back: 'irritably; on edge', pos: 'adverb', exampleJp: '渋滞でいらいらする。', exampleReading: 'じゅうたいでいらいらする。', exampleEn: 'The traffic makes me irritable.' },
        { front: 'ひそひそ', back: 'in whispers', pos: 'adverb', exampleJp: 'ひそひそ話をする。', exampleReading: 'ひそひそばなしをする。', exampleEn: 'To talk in whispers.' },
        { front: 'まじまじ', back: 'staring intently', pos: 'adverb', exampleJp: 'まじまじと見つめた。', exampleReading: 'まじまじとみつめた。', exampleEn: 'She stared hard at it.' },
        { front: 'ぎっしり', back: 'packed tightly', pos: 'adverb', exampleJp: '予定がぎっしり詰まっている。', exampleReading: 'よていがぎっしりつまっている。', exampleEn: 'My schedule is packed.' },
        { front: 'めきめき', back: 'rapidly (improving)', pos: 'adverb', exampleJp: 'めきめき上達した。', exampleReading: 'めきめきじょうたつした。', exampleEn: 'He improved by leaps and bounds.' },
        { front: 'ずるずる', back: 'draggingly; dragging on', pos: 'adverb', exampleJp: 'ずるずる先延ばしにする。', exampleReading: 'ずるずるさきのばしにする。', exampleEn: 'To keep putting it off.' },
        { front: 'こつこつ', back: 'steadily; diligently', pos: 'adverb', exampleJp: 'こつこつ勉強する。', exampleReading: 'こつこつべんきょうする。', exampleEn: 'To study steadily.' },
        { front: 'あっさり', back: 'easily; plainly; light (in taste)', pos: 'adverb', exampleJp: 'あっさり負けた。', exampleReading: 'あっさりまけた。', exampleEn: 'He lost without a fight.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Set phrases & idiomatic verbs',
      cards: [
        { front: '目を通す', reading: 'めをとおす', back: 'to look over; to skim', pos: 'expression', exampleJp: '資料に目を通した。', exampleReading: 'しりょうにめをとおした。', exampleEn: 'I looked over the documents.' },
        { front: '手を打つ', reading: 'てをうつ', back: 'to take steps; to settle', pos: 'expression', exampleJp: '早めに手を打とう。', exampleReading: 'はやめにてをうとう。', exampleEn: "Let's act early." },
        { front: '気が済む', reading: 'きがすむ', back: 'to be satisfied; to feel settled', pos: 'expression', exampleJp: '謝るまで気が済まない。', exampleReading: 'あやまるまできがすまない。', exampleEn: "I won't rest until he apologises." },
        { front: '腑に落ちない', reading: 'ふにおちない', back: "doesn't sit right; unconvincing", pos: 'expression', exampleJp: '説明が腑に落ちない。', exampleReading: 'せつめいがふにおちない。', exampleEn: "The explanation doesn't sit right." },
        { front: '拍車をかける', reading: 'はくしゃをかける', back: 'to spur on; to accelerate', pos: 'expression', exampleJp: '不安に拍車をかけた。', exampleReading: 'ふあんにはくしゃをかけた。', exampleEn: 'It fuelled the anxiety.' },
        { front: '棚に上げる', reading: 'たなにあげる', back: 'to ignore (one’s own faults)', pos: 'expression', exampleJp: '自分を棚に上げて言う。', exampleReading: 'じぶんをたなにあげていう。', exampleEn: 'To criticise while ignoring one’s own faults.' },
        { front: '念を押す', reading: 'ねんをおす', back: 'to make doubly sure', pos: 'expression', exampleJp: '念を押しておいた。', exampleReading: 'ねんをおしておいた。', exampleEn: 'I double-checked with them.' },
        { front: '水を差す', reading: 'みずをさす', back: 'to throw cold water on; to spoil', pos: 'expression', exampleJp: '話に水を差すな。', exampleReading: 'はなしにみずをさすな。', exampleEn: "Don't spoil the mood." },
        { front: '踏み切る', reading: 'ふみきる', back: 'to take the plunge; to decide to act', pos: 'verb (u)', exampleJp: '値上げに踏み切った。', exampleReading: 'ねあげにふみきった。', exampleEn: 'They went ahead with the price rise.' },
        { front: '打ち込む', reading: 'うちこむ', back: 'to devote oneself to; to drive in', pos: 'verb (u)', exampleJp: '研究に打ち込む。', exampleReading: 'けんきゅうにうちこむ。', exampleEn: 'To throw oneself into research.' },
        { front: '見込む', reading: 'みこむ', back: 'to expect; to count on', pos: 'verb (u)', exampleJp: '黒字を見込んでいる。', exampleReading: 'くろじをみこんでいる。', exampleEn: 'They expect a profit.' },
        { front: '取り組む', reading: 'とりくむ', back: 'to tackle; to work on', pos: 'verb (u)', exampleJp: '問題に取り組む。', exampleReading: 'もんだいにとりくむ。', exampleEn: 'To tackle the problem.' },
        { front: '割り込む', reading: 'わりこむ', back: 'to cut in; to interrupt', pos: 'verb (u)', exampleJp: '列に割り込むな。', exampleReading: 'れつにわりこむな。', exampleEn: "Don't cut in line." },
        { front: '食い違う', reading: 'くいちがう', back: 'to not match; to conflict', pos: 'verb (u)', exampleJp: '証言が食い違う。', exampleReading: 'しょうげんがくいちがう。', exampleEn: 'The testimonies conflict.' },
        { front: '差し支える', reading: 'さしつかえる', back: 'to interfere with; to be a problem', pos: 'verb (ru)', exampleJp: '仕事に差し支える。', exampleReading: 'しごとにさしつかえる。', exampleEn: 'It gets in the way of work.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Describing people & scenes (written)',
      cards: [
        { front: '厳か', reading: 'おごそか', back: 'solemn; grave', pos: 'na-adjective', exampleJp: '厳かな雰囲気だ。', exampleReading: 'おごそかなふんいきだ。', exampleEn: 'A solemn atmosphere.' },
        { front: '穏やか', reading: 'おだやか', back: 'calm; gentle', pos: 'na-adjective', exampleJp: '穏やかな海だ。', exampleReading: 'おだやかなうみだ。', exampleEn: 'A calm sea.' },
        { front: '鮮やか', reading: 'あざやか', back: 'vivid; brilliant', pos: 'na-adjective', exampleJp: '鮮やかな色だ。', exampleReading: 'あざやかないろだ。', exampleEn: 'A vivid colour.' },
        { front: '微か', reading: 'かすか', back: 'faint; slight', pos: 'na-adjective', exampleJp: '微かな音がした。', exampleReading: 'かすかなおとがした。', exampleEn: 'There was a faint sound.' },
        { front: '曖昧', reading: 'あいまい', back: 'vague; ambiguous', pos: 'na-adjective', exampleJp: '曖昧な返事だ。', exampleReading: 'あいまいなへんじだ。', exampleEn: 'An evasive answer.' },
        { front: '巧み', reading: 'たくみ', back: 'skilful; deft', pos: 'na-adjective', exampleJp: '巧みな話術だ。', exampleReading: 'たくみなわじゅつだ。', exampleEn: 'Deft rhetoric.' },
        { front: '大胆', reading: 'だいたん', back: 'bold; daring', pos: 'na-adjective', exampleJp: '大胆な計画だ。', exampleReading: 'だいたんなけいかくだ。', exampleEn: 'A bold plan.' },
        { front: '慎重', reading: 'しんちょう', back: 'cautious; careful', pos: 'na-adjective', exampleJp: '慎重に進める。', exampleReading: 'しんちょうにすすめる。', exampleEn: 'To proceed cautiously.' },
        { front: '露骨', reading: 'ろこつ', back: 'blatant; undisguised', pos: 'na-adjective', exampleJp: '露骨に嫌な顔をした。', exampleReading: 'ろこつにいやなかおをした。', exampleEn: 'He made no effort to hide his distaste.' },
        { front: '密か', reading: 'ひそか', back: 'secret; stealthy', pos: 'na-adjective', exampleJp: '密かに準備していた。', exampleReading: 'ひそかにじゅんびしていた。', exampleEn: 'He was secretly preparing.' },
        { front: '滑らか', reading: 'なめらか', back: 'smooth; fluent', pos: 'na-adjective', exampleJp: '滑らかに話す。', exampleReading: 'なめらかにはなす。', exampleEn: 'To speak fluently.' },
        { front: '緩やか', reading: 'ゆるやか', back: 'gentle (slope); lenient', pos: 'na-adjective', exampleJp: '緩やかな坂道だ。', exampleReading: 'ゆるやかなさかみちだ。', exampleEn: 'A gentle slope.' },
        { front: '膨大', reading: 'ぼうだい', back: 'enormous; vast', pos: 'na-adjective', exampleJp: '膨大な量のデータだ。', exampleReading: 'ぼうだいなりょうのデータだ。', exampleEn: 'A vast amount of data.' },
        { front: '綿密', reading: 'めんみつ', back: 'meticulous; detailed', pos: 'na-adjective', exampleJp: '綿密な計画を立てる。', exampleReading: 'めんみつなけいかくをたてる。', exampleEn: 'To make a meticulous plan.' },
        { front: '顕著', reading: 'けんちょ', back: 'marked; conspicuous', pos: 'na-adjective', exampleJp: '効果が顕著だ。', exampleReading: 'こうかがけんちょだ。', exampleEn: 'The effect is marked.' }
      ]
    }
  ]
}

export const N1_KANJI_COURSE: SeedCourse = {
  title: 'JLPT N1 Kanji',
  description:
    'The last 140 characters this app teaches directly: the vocabulary of law, finance, ' +
    'medicine and literary prose. After this deck, everything new should come from what ' +
    'you read — mine it, and let the SRS do the rest.',
  level: 'N1',
  difficulty: 24,
  lessons: [
    {
      kind: 'kanji',
      title: 'Law & the state',
      cards: [
        { front: '憲', reading: 'けん', back: 'constitution', onyomi: 'ケン', exampleJp: '憲法', exampleReading: 'けんぽう', exampleEn: 'constitution' },
        { front: '閣', reading: 'かく', back: 'cabinet; tower', onyomi: 'カク', exampleJp: '内閣', exampleReading: 'ないかく', exampleEn: 'the Cabinet' },
        { front: '盟', reading: 'めい', back: 'alliance; oath', onyomi: 'メイ', exampleJp: '同盟', exampleReading: 'どうめい', exampleEn: 'alliance' },
        { front: '締', reading: 'し(める)', back: 'tighten; conclude (a pact)', onyomi: 'テイ', kunyomi: 'し(める), し(まる)', exampleJp: '締結', exampleReading: 'ていけつ', exampleEn: 'conclusion (of a treaty)' },
        { front: '逮', reading: 'たい', back: 'apprehend', onyomi: 'タイ', exampleJp: '逮捕', exampleReading: 'たいほ', exampleEn: 'arrest' },
        { front: '訴', reading: 'うった(える)', back: 'sue; appeal to', onyomi: 'ソ', kunyomi: 'うった(える)', exampleJp: '訴える', exampleReading: 'うったえる', exampleEn: 'to sue; to appeal' },
        { front: '罰', reading: 'ばつ', back: 'punishment', onyomi: 'バツ, バチ', exampleJp: '罰金', exampleReading: 'ばっきん', exampleEn: 'a fine' },
        { front: '刑', reading: 'けい', back: 'sentence; penalty', onyomi: 'ケイ', exampleJp: '刑事', exampleReading: 'けいじ', exampleEn: 'detective; criminal (case)' },
        { front: '拘', reading: 'こう', back: 'detain; be particular about', onyomi: 'コウ', kunyomi: 'かか(わる)', exampleJp: '拘束', exampleReading: 'こうそく', exampleEn: 'restraint; detention' },
        { front: '弾', reading: 'ひ(く)', back: 'bullet; play (strings); accuse', onyomi: 'ダン', kunyomi: 'ひ(く), はず(む), たま', exampleJp: '弾圧', exampleReading: 'だんあつ', exampleEn: 'oppression' },
        { front: '侵', reading: 'おか(す)', back: 'invade; violate', onyomi: 'シン', kunyomi: 'おか(す)', exampleJp: '侵害', exampleReading: 'しんがい', exampleEn: 'infringement' },
        { front: '攻', reading: 'せ(める)', back: 'attack', onyomi: 'コウ', kunyomi: 'せ(める)', exampleJp: '攻撃', exampleReading: 'こうげき', exampleEn: 'attack' },
        { front: '陥', reading: 'おちい(る)', back: 'fall into; a flaw', onyomi: 'カン', kunyomi: 'おちい(る)', exampleJp: '欠陥', exampleReading: 'けっかん', exampleEn: 'defect' },
        { front: '裁', reading: 'さば(く)', back: 'judge; cut out (cloth)', onyomi: 'サイ', kunyomi: 'さば(く), た(つ)', exampleJp: '裁判', exampleReading: 'さいばん', exampleEn: 'trial' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Finance & industry',
      cards: [
        { front: '融', reading: 'ゆう', back: 'melt; finance', onyomi: 'ユウ', exampleJp: '金融', exampleReading: 'きんゆう', exampleEn: 'finance' },
        { front: '債', reading: 'さい', back: 'debt; bond', onyomi: 'サイ', exampleJp: '負債', exampleReading: 'ふさい', exampleEn: 'liabilities' },
        { front: '株', reading: 'かぶ', back: 'stock; share; stump', onyomi: 'シュ', kunyomi: 'かぶ', exampleJp: '株式', exampleReading: 'かぶしき', exampleEn: 'shares; stock' },
        { front: '賃', reading: 'ちん', back: 'wages; rent', onyomi: 'チン', exampleJp: '家賃', exampleReading: 'やちん', exampleEn: 'rent' },
        { front: '稼', reading: 'かせ(ぐ)', back: 'earn', onyomi: 'カ', kunyomi: 'かせ(ぐ)', exampleJp: '稼ぐ', exampleReading: 'かせぐ', exampleEn: 'to earn' },
        { front: '雇', reading: 'やと(う)', back: 'employ; hire', onyomi: 'コ', kunyomi: 'やと(う)', exampleJp: '雇用', exampleReading: 'こよう', exampleEn: 'employment' },
        { front: '卸', reading: 'おろし', back: 'wholesale', onyomi: 'シャ', kunyomi: 'おろ(す), おろし', exampleJp: '卸売り', exampleReading: 'おろしうり', exampleEn: 'wholesale' },
        { front: '販', reading: 'はん', back: 'sell; trade', onyomi: 'ハン', exampleJp: '販売', exampleReading: 'はんばい', exampleEn: 'sales' },
        { front: '需', reading: 'じゅ', back: 'demand; need', onyomi: 'ジュ', exampleJp: '需要', exampleReading: 'じゅよう', exampleEn: 'demand' },
        { front: '供', reading: 'そな(える)', back: 'offer; supply; accompany', onyomi: 'キョウ, ク', kunyomi: 'そな(える), とも', exampleJp: '供給', exampleReading: 'きょうきゅう', exampleEn: 'supply' },
        { front: '施', reading: 'ほどこ(す)', back: 'carry out; give (aid)', onyomi: 'シ, セ', kunyomi: 'ほどこ(す)', exampleJp: '実施', exampleReading: 'じっし', exampleEn: 'implementation' },
        { front: '促', reading: 'うなが(す)', back: 'urge; prompt', onyomi: 'ソク', kunyomi: 'うなが(す)', exampleJp: '促進', exampleReading: 'そくしん', exampleEn: 'promotion; acceleration' },
        { front: '搬', reading: 'はん', back: 'transport; carry', onyomi: 'ハン', exampleJp: '運搬', exampleReading: 'うんぱん', exampleEn: 'transport' },
        { front: '掲', reading: 'かか(げる)', back: 'put up; publish', onyomi: 'ケイ', kunyomi: 'かか(げる)', exampleJp: '掲示', exampleReading: 'けいじ', exampleEn: 'notice; posting' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Conflict & deception',
      cards: [
        { front: '惑', reading: 'まど(う)', back: 'be puzzled; be led astray', onyomi: 'ワク', kunyomi: 'まど(う)', exampleJp: '迷惑', exampleReading: 'めいわく', exampleEn: 'trouble; nuisance' },
        { front: '欺', reading: 'あざむ(く)', back: 'deceive', onyomi: 'ギ', kunyomi: 'あざむ(く)', exampleJp: '詐欺', exampleReading: 'さぎ', exampleEn: 'fraud' },
        { front: '詐', reading: 'さ', back: 'deceive; lie', onyomi: 'サ', exampleJp: '詐欺師', exampleReading: 'さぎし', exampleEn: 'swindler' },
        { front: '脅', reading: 'おど(す)', back: 'threaten', onyomi: 'キョウ', kunyomi: 'おど(す), おびや(かす)', exampleJp: '脅迫', exampleReading: 'きょうはく', exampleEn: 'intimidation' },
        { front: '迫', reading: 'せま(る)', back: 'press; draw near', onyomi: 'ハク', kunyomi: 'せま(る)', exampleJp: '迫力', exampleReading: 'はくりょく', exampleEn: 'impact; force' },
        { front: '誉', reading: 'ほま(れ)', back: 'honour; praise', onyomi: 'ヨ', kunyomi: 'ほま(れ)', exampleJp: '名誉', exampleReading: 'めいよ', exampleEn: 'honour' },
        { front: '辱', reading: 'はずかし(める)', back: 'disgrace; humiliate', onyomi: 'ジョク', kunyomi: 'はずかし(める)', exampleJp: '侮辱', exampleReading: 'ぶじょく', exampleEn: 'insult' },
        { front: '侮', reading: 'あなど(る)', back: 'scorn; underestimate', onyomi: 'ブ', kunyomi: 'あなど(る)', exampleJp: '侮る', exampleReading: 'あなどる', exampleEn: 'to underestimate' },
        { front: '憤', reading: 'いきどお(る)', back: 'be indignant', onyomi: 'フン', kunyomi: 'いきどお(る)', exampleJp: '憤慨', exampleReading: 'ふんがい', exampleEn: 'indignation' },
        { front: '抗', reading: 'こう', back: 'resist; oppose', onyomi: 'コウ', exampleJp: '抵抗', exampleReading: 'ていこう', exampleEn: 'resistance' },
        { front: '抵', reading: 'てい', back: 'resist; reach', onyomi: 'テイ', exampleJp: '抵抗力', exampleReading: 'ていこうりょく', exampleEn: 'resistance; immunity' },
        { front: '憾', reading: 'かん', back: 'regret; remorse', onyomi: 'カン', exampleJp: '遺憾', exampleReading: 'いかん', exampleEn: 'regrettable' },
        { front: '慨', reading: 'がい', back: 'lament; deplore', onyomi: 'ガイ', exampleJp: '感慨', exampleReading: 'かんがい', exampleEn: 'deep emotion' },
        { front: '載', reading: 'の(せる)', back: 'publish; load onto', onyomi: 'サイ', kunyomi: 'の(せる), の(る)', exampleJp: '掲載', exampleReading: 'けいさい', exampleEn: 'publication (in print)' }
      ]
    },
    {
      kind: 'kanji',
      title: 'The inner life',
      cards: [
        { front: '妥', reading: 'だ', back: 'compromise; peace', onyomi: 'ダ', exampleJp: '妥協', exampleReading: 'だきょう', exampleEn: 'compromise' },
        { front: '顧', reading: 'かえり(みる)', back: 'look back; consider', onyomi: 'コ', kunyomi: 'かえり(みる)', exampleJp: '顧客', exampleReading: 'こきゃく', exampleEn: 'customer; client' },
        { front: '憂', reading: 'うれ(い)', back: 'grief; anxiety', onyomi: 'ユウ', kunyomi: 'うれ(い), う(い)', exampleJp: '憂鬱', exampleReading: 'ゆううつ', exampleEn: 'melancholy' },
        { front: '鬱', reading: 'うつ', back: 'gloom; depression', onyomi: 'ウツ', exampleJp: '鬱陶しい', exampleReading: 'うっとうしい', exampleEn: 'gloomy; irksome' },
        { front: '慰', reading: 'なぐさ(める)', back: 'console', onyomi: 'イ', kunyomi: 'なぐさ(める)', exampleJp: '慰める', exampleReading: 'なぐさめる', exampleEn: 'to console' },
        { front: '励', reading: 'はげ(ます)', back: 'encourage; strive', onyomi: 'レイ', kunyomi: 'はげ(む), はげ(ます)', exampleJp: '励ます', exampleReading: 'はげます', exampleEn: 'to encourage' },
        { front: '慕', reading: 'した(う)', back: 'yearn for; adore', onyomi: 'ボ', kunyomi: 'した(う)', exampleJp: '慕う', exampleReading: 'したう', exampleEn: 'to look up to' },
        { front: '悼', reading: 'いた(む)', back: 'mourn', onyomi: 'トウ', kunyomi: 'いた(む)', exampleJp: '哀悼', exampleReading: 'あいとう', exampleEn: 'condolence' },
        { front: '忍', reading: 'しの(ぶ)', back: 'endure; stealth', onyomi: 'ニン', kunyomi: 'しの(ぶ)', exampleJp: '忍耐', exampleReading: 'にんたい', exampleEn: 'perseverance' },
        { front: '耐', reading: 'た(える)', back: 'withstand; bear', onyomi: 'タイ', kunyomi: 'た(える)', exampleJp: '耐える', exampleReading: 'たえる', exampleEn: 'to endure' },
        { front: '懸', reading: 'か(ける)', back: 'hang; be at stake', onyomi: 'ケン, ケ', kunyomi: 'か(ける)', exampleJp: '懸命', exampleReading: 'けんめい', exampleEn: 'with all one’s might' },
        { front: '焦', reading: 'あせ(る)', back: 'be impatient; scorch', onyomi: 'ショウ', kunyomi: 'あせ(る), こ(げる)', exampleJp: '焦る', exampleReading: 'あせる', exampleEn: 'to panic; to rush' },
        { front: '憧', reading: 'あこが(れる)', back: 'yearn after', onyomi: 'ショウ, ドウ', kunyomi: 'あこが(れる)', exampleJp: '憧れ', exampleReading: 'あこがれ', exampleEn: 'longing; admiration' },
        { front: '慄', reading: 'りつ', back: 'shudder; tremble', onyomi: 'リツ', exampleJp: '戦慄', exampleReading: 'せんりつ', exampleEn: 'shudder; horror' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Formality & ceremony',
      cards: [
        { front: '厳', reading: 'きび(しい)', back: 'strict; solemn', onyomi: 'ゲン, ゴン', kunyomi: 'きび(しい), おごそ(か)', exampleJp: '厳格', exampleReading: 'げんかく', exampleEn: 'strict; rigid' },
        { front: '粛', reading: 'しゅく', back: 'solemn; quietly', onyomi: 'シュク', exampleJp: '厳粛', exampleReading: 'げんしゅく', exampleEn: 'solemn' },
        { front: '謹', reading: 'つつし(む)', back: 'respectfully; refrain', onyomi: 'キン', kunyomi: 'つつし(む)', exampleJp: '謹賀新年', exampleReading: 'きんがしんねん', exampleEn: 'Happy New Year (formal)' },
        { front: '慎', reading: 'つつし(む)', back: 'be prudent; refrain', onyomi: 'シン', kunyomi: 'つつし(む)', exampleJp: '慎重', exampleReading: 'しんちょう', exampleEn: 'cautious' },
        { front: '拝', reading: 'おが(む)', back: 'worship; humbly', onyomi: 'ハイ', kunyomi: 'おが(む)', exampleJp: '拝見', exampleReading: 'はいけん', exampleEn: 'to look at (humble)' },
        { front: '奉', reading: 'たてまつ(る)', back: 'offer; serve', onyomi: 'ホウ, ブ', kunyomi: 'たてまつ(る)', exampleJp: '奉仕', exampleReading: 'ほうし', exampleEn: 'service; volunteering' },
        { front: '献', reading: 'けん', back: 'offer; dedicate', onyomi: 'ケン, コン', exampleJp: '貢献', exampleReading: 'こうけん', exampleEn: 'contribution' },
        { front: '儀', reading: 'ぎ', back: 'ceremony; affair', onyomi: 'ギ', exampleJp: '礼儀', exampleReading: 'れいぎ', exampleEn: 'etiquette' },
        { front: '礼', reading: 'れい', back: 'courtesy; thanks; bow', onyomi: 'レイ, ライ', exampleJp: '失礼', exampleReading: 'しつれい', exampleEn: 'rudeness; excuse me' },
        { front: '敷', reading: 'し(く)', back: 'spread out; lay', onyomi: 'フ', kunyomi: 'し(く)', exampleJp: '敷金', exampleReading: 'しききん', exampleEn: 'security deposit' },
        { front: '貫', reading: 'つらぬ(く)', back: 'pierce; carry through', onyomi: 'カン', kunyomi: 'つらぬ(く)', exampleJp: '一貫', exampleReading: 'いっかん', exampleEn: 'consistency' },
        { front: '徹', reading: 'てつ', back: 'penetrate; thorough', onyomi: 'テツ', exampleJp: '徹底', exampleReading: 'てってい', exampleEn: 'thoroughness' },
        { front: '遂', reading: 'と(げる)', back: 'accomplish; at last', onyomi: 'スイ', kunyomi: 'と(げる), つい(に)', exampleJp: '遂行', exampleReading: 'すいこう', exampleEn: 'execution; carrying out' },
        { front: '勧', reading: 'すす(める)', back: 'recommend; urge', onyomi: 'カン', kunyomi: 'すす(める)', exampleJp: '勧誘', exampleReading: 'かんゆう', exampleEn: 'solicitation; invitation' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Structure & abstraction',
      cards: [
        { front: '趣', reading: 'おもむき', back: 'purport; taste; charm', onyomi: 'シュ', kunyomi: 'おもむき', exampleJp: '趣味', exampleReading: 'しゅみ', exampleEn: 'hobby' },
        { front: '旨', reading: 'むね', back: 'gist; effect (of a statement)', onyomi: 'シ', kunyomi: 'むね, うま(い)', exampleJp: '趣旨', exampleReading: 'しゅし', exampleEn: 'purport; aim' },
        { front: '核', reading: 'かく', back: 'core; nucleus', onyomi: 'カク', exampleJp: '核心', exampleReading: 'かくしん', exampleEn: 'the crux' },
        { front: '枠', reading: 'わく', back: 'frame; limit', onyomi: '—', kunyomi: 'わく', exampleJp: '枠組み', exampleReading: 'わくぐみ', exampleEn: 'framework' },
        { front: '軸', reading: 'じく', back: 'axis; shaft', onyomi: 'ジク', exampleJp: '軸', exampleReading: 'じく', exampleEn: 'axis' },
        { front: '盤', reading: 'ばん', back: 'board; disc; base', onyomi: 'バン', exampleJp: '基盤', exampleReading: 'きばん', exampleEn: 'foundation' },
        { front: '構', reading: 'かま(える)', back: 'construct; posture', onyomi: 'コウ', kunyomi: 'かま(える), かま(う)', exampleJp: '構造', exampleReading: 'こうぞう', exampleEn: 'structure' },
        { front: '築', reading: 'きず(く)', back: 'build; construct', onyomi: 'チク', kunyomi: 'きず(く)', exampleJp: '建築', exampleReading: 'けんちく', exampleEn: 'architecture' },
        { front: '抽', reading: 'ちゅう', back: 'extract; pull out', onyomi: 'チュウ', exampleJp: '抽象', exampleReading: 'ちゅうしょう', exampleEn: 'abstraction' },
        { front: '象', reading: 'しょう', back: 'phenomenon; elephant', onyomi: 'ショウ, ゾウ', exampleJp: '現象', exampleReading: 'げんしょう', exampleEn: 'phenomenon' },
        { front: '微', reading: 'び', back: 'faint; minute', onyomi: 'ビ', kunyomi: 'かす(か)', exampleJp: '微妙', exampleReading: 'びみょう', exampleEn: 'subtle; iffy' },
        { front: '妙', reading: 'みょう', back: 'strange; exquisite', onyomi: 'ミョウ', exampleJp: '妙な話', exampleReading: 'みょうなはなし', exampleEn: 'a strange story' },
        { front: '綿', reading: 'わた', back: 'cotton; meticulous', onyomi: 'メン', kunyomi: 'わた', exampleJp: '綿密', exampleReading: 'めんみつ', exampleEn: 'meticulous' },
        { front: '密', reading: 'みつ', back: 'dense; secret', onyomi: 'ミツ', kunyomi: 'ひそ(か)', exampleJp: '秘密', exampleReading: 'ひみつ', exampleEn: 'secret' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Health & welfare',
      cards: [
        { front: '福', reading: 'ふく', back: 'good fortune; welfare', onyomi: 'フク', exampleJp: '福祉', exampleReading: 'ふくし', exampleEn: 'welfare' },
        { front: '祉', reading: 'し', back: 'welfare; happiness', onyomi: 'シ', exampleJp: '社会福祉', exampleReading: 'しゃかいふくし', exampleEn: 'social welfare' },
        { front: '療', reading: 'りょう', back: 'heal; treat', onyomi: 'リョウ', exampleJp: '治療', exampleReading: 'ちりょう', exampleEn: 'medical treatment' },
        { front: '診', reading: 'み(る)', back: 'diagnose; examine', onyomi: 'シン', kunyomi: 'み(る)', exampleJp: '診断', exampleReading: 'しんだん', exampleEn: 'diagnosis' },
        { front: '患', reading: 'わずら(う)', back: 'afflicted; ill', onyomi: 'カン', kunyomi: 'わずら(う)', exampleJp: '患者', exampleReading: 'かんじゃ', exampleEn: 'patient' },
        { front: '症', reading: 'しょう', back: 'symptom; illness', onyomi: 'ショウ', exampleJp: '症状', exampleReading: 'しょうじょう', exampleEn: 'symptoms' },
        { front: '慢', reading: 'まん', back: 'ridicule; laziness; chronic', onyomi: 'マン', exampleJp: '慢性', exampleReading: 'まんせい', exampleEn: 'chronic' },
        { front: '癖', reading: 'くせ', back: 'habit; quirk', onyomi: 'ヘキ', kunyomi: 'くせ', exampleJp: '口癖', exampleReading: 'くちぐせ', exampleEn: 'a favourite phrase; verbal tic' },
        { front: '潔', reading: 'いさぎよ(い)', back: 'clean; pure; manly', onyomi: 'ケツ', kunyomi: 'いさぎよ(い)', exampleJp: '清潔', exampleReading: 'せいけつ', exampleEn: 'cleanliness' },
        { front: '衛', reading: 'えい', back: 'defence; hygiene', onyomi: 'エイ', exampleJp: '衛生', exampleReading: 'えいせい', exampleEn: 'hygiene' },
        { front: '菌', reading: 'きん', back: 'germ; fungus', onyomi: 'キン', exampleJp: '細菌', exampleReading: 'さいきん', exampleEn: 'bacteria' },
        { front: '疫', reading: 'えき', back: 'epidemic', onyomi: 'エキ, ヤク', exampleJp: '免疫', exampleReading: 'めんえき', exampleEn: 'immunity' },
        { front: '障', reading: 'さわ(る)', back: 'hinder; obstacle', onyomi: 'ショウ', kunyomi: 'さわ(る)', exampleJp: '障害', exampleReading: 'しょうがい', exampleEn: 'obstacle; disability' },
        { front: '併', reading: 'あわ(せる)', back: 'combine; merge', onyomi: 'ヘイ', kunyomi: 'あわ(せる)', exampleJp: '併用', exampleReading: 'へいよう', exampleEn: 'combined use' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Movement & handling',
      cards: [
        { front: '撤', reading: 'てつ', back: 'withdraw; remove', onyomi: 'テツ', exampleJp: '撤退', exampleReading: 'てったい', exampleEn: 'withdrawal' },
        { front: '廃', reading: 'すた(れる)', back: 'abolish; fall into disuse', onyomi: 'ハイ', kunyomi: 'すた(れる)', exampleJp: '廃止', exampleReading: 'はいし', exampleEn: 'abolition' },
        { front: '遣', reading: 'つか(う)', back: 'dispatch; send', onyomi: 'ケン', kunyomi: 'つか(う)', exampleJp: '派遣', exampleReading: 'はけん', exampleEn: 'dispatch; temp staffing' },
        { front: '赴', reading: 'おもむ(く)', back: 'proceed to; head for', onyomi: 'フ', kunyomi: 'おもむ(く)', exampleJp: '赴任', exampleReading: 'ふにん', exampleEn: 'taking up a new post' },
        { front: '陳', reading: 'ちん', back: 'display; state', onyomi: 'チン', exampleJp: '陳列', exampleReading: 'ちんれつ', exampleEn: 'display; exhibition' },
        { front: '陣', reading: 'じん', back: 'camp; ranks', onyomi: 'ジン', exampleJp: '陣営', exampleReading: 'じんえい', exampleEn: 'camp; faction' },
        { front: '覆', reading: 'おお(う)', back: 'cover; overturn', onyomi: 'フク', kunyomi: 'おお(う), くつがえ(す)', exampleJp: '覆す', exampleReading: 'くつがえす', exampleEn: 'to overturn' },
        { front: '翻', reading: 'ひるがえ(る)', back: 'flutter; translate', onyomi: 'ホン', kunyomi: 'ひるがえ(る)', exampleJp: '翻訳', exampleReading: 'ほんやく', exampleEn: 'translation' },
        { front: '携', reading: 'たずさ(える)', back: 'carry; participate', onyomi: 'ケイ', kunyomi: 'たずさ(える), たずさ(わる)', exampleJp: '携帯', exampleReading: 'けいたい', exampleEn: 'mobile phone; portable' },
        { front: '遭', reading: 'あ(う)', back: 'encounter (something bad)', onyomi: 'ソウ', kunyomi: 'あ(う)', exampleJp: '遭遇', exampleReading: 'そうぐう', exampleEn: 'encounter' },
        { front: '遇', reading: 'ぐう', back: 'meet; treatment', onyomi: 'グウ', exampleJp: '待遇', exampleReading: 'たいぐう', exampleEn: 'treatment; working conditions' },
        { front: '阻', reading: 'はば(む)', back: 'obstruct; thwart', onyomi: 'ソ', kunyomi: 'はば(む)', exampleJp: '阻止', exampleReading: 'そし', exampleEn: 'obstruction; blocking' },
        { front: '隔', reading: 'へだ(てる)', back: 'separate; isolate', onyomi: 'カク', kunyomi: 'へだ(てる)', exampleJp: '間隔', exampleReading: 'かんかく', exampleEn: 'interval; spacing' },
        { front: '臨', reading: 'のぞ(む)', back: 'face; be present at', onyomi: 'リン', kunyomi: 'のぞ(む)', exampleJp: '臨時', exampleReading: 'りんじ', exampleEn: 'temporary; special' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Landscape & weather',
      cards: [
        { front: '峰', reading: 'みね', back: 'peak; summit', onyomi: 'ホウ', kunyomi: 'みね', exampleJp: '連峰', exampleReading: 'れんぽう', exampleEn: 'mountain range' },
        { front: '峡', reading: 'きょう', back: 'gorge; ravine', onyomi: 'キョウ', exampleJp: '海峡', exampleReading: 'かいきょう', exampleEn: 'strait; channel' },
        { front: '沼', reading: 'ぬま', back: 'swamp; marsh', onyomi: 'ショウ', kunyomi: 'ぬま', exampleJp: '沼', exampleReading: 'ぬま', exampleEn: 'swamp' },
        { front: '湾', reading: 'わん', back: 'bay; gulf', onyomi: 'ワン', exampleJp: '東京湾', exampleReading: 'とうきょうわん', exampleEn: 'Tokyo Bay' },
        { front: '岬', reading: 'みさき', back: 'cape; headland', onyomi: '—', kunyomi: 'みさき', exampleJp: '岬', exampleReading: 'みさき', exampleEn: 'cape' },
        { front: '溝', reading: 'みぞ', back: 'ditch; gap (between people)', onyomi: 'コウ', kunyomi: 'みぞ', exampleJp: '溝', exampleReading: 'みぞ', exampleEn: 'a rift' },
        { front: '塊', reading: 'かたまり', back: 'lump; mass', onyomi: 'カイ', kunyomi: 'かたまり', exampleJp: '塊', exampleReading: 'かたまり', exampleEn: 'a lump' },
        { front: '粒', reading: 'つぶ', back: 'grain; drop', onyomi: 'リュウ', kunyomi: 'つぶ', exampleJp: '粒', exampleReading: 'つぶ', exampleEn: 'a grain' },
        { front: '滴', reading: 'しずく', back: 'drip; droplet', onyomi: 'テキ', kunyomi: 'しずく, したた(る)', exampleJp: '水滴', exampleReading: 'すいてき', exampleEn: 'water droplet' },
        { front: '霧', reading: 'きり', back: 'fog; mist', onyomi: 'ム', kunyomi: 'きり', exampleJp: '霧', exampleReading: 'きり', exampleEn: 'fog' },
        { front: '露', reading: 'つゆ', back: 'dew; expose', onyomi: 'ロ', kunyomi: 'つゆ', exampleJp: '露骨', exampleReading: 'ろこつ', exampleEn: 'blatant' },
        { front: '雷', reading: 'かみなり', back: 'thunder', onyomi: 'ライ', kunyomi: 'かみなり', exampleJp: '雷', exampleReading: 'かみなり', exampleEn: 'thunder' },
        { front: '嵐', reading: 'あらし', back: 'storm', onyomi: '—', kunyomi: 'あらし', exampleJp: '嵐', exampleReading: 'あらし', exampleEn: 'storm' },
        { front: '潮', reading: 'しお', back: 'tide; current', onyomi: 'チョウ', kunyomi: 'しお', exampleJp: '風潮', exampleReading: 'ふうちょう', exampleEn: 'the prevailing mood' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Writing & the unsaid',
      cards: [
        { front: '稿', reading: 'こう', back: 'draft; manuscript', onyomi: 'コウ', exampleJp: '原稿', exampleReading: 'げんこう', exampleEn: 'manuscript' },
        { front: '執', reading: 'と(る)', back: 'take hold; carry out', onyomi: 'シツ, シュウ', kunyomi: 'と(る)', exampleJp: '執筆', exampleReading: 'しっぴつ', exampleEn: 'writing (as an author)' },
        { front: '筆', reading: 'ふで', back: 'writing brush', onyomi: 'ヒツ', kunyomi: 'ふで', exampleJp: '筆者', exampleReading: 'ひっしゃ', exampleEn: 'the writer' },
        { front: '誓', reading: 'ちか(う)', back: 'vow; swear', onyomi: 'セイ', kunyomi: 'ちか(う)', exampleJp: '誓う', exampleReading: 'ちかう', exampleEn: 'to swear' },
        { front: '詫', reading: 'わ(びる)', back: 'apologize', onyomi: 'タ', kunyomi: 'わ(びる)', exampleJp: 'お詫び', exampleReading: 'おわび', exampleEn: 'an apology' },
        { front: '諭', reading: 'さと(す)', back: 'admonish; persuade', onyomi: 'ユ', kunyomi: 'さと(す)', exampleJp: '説諭', exampleReading: 'せつゆ', exampleEn: 'admonition' },
        { front: '諾', reading: 'だく', back: 'consent; assent', onyomi: 'ダク', exampleJp: '承諾', exampleReading: 'しょうだく', exampleEn: 'consent' },
        { front: '冗', reading: 'じょう', back: 'superfluous; jest', onyomi: 'ジョウ', exampleJp: '冗談', exampleReading: 'じょうだん', exampleEn: 'joke' },
        { front: '漠', reading: 'ばく', back: 'vague; desert', onyomi: 'バク', exampleJp: '漠然', exampleReading: 'ばくぜん', exampleEn: 'vague' },
        { front: '曖', reading: 'あい', back: 'unclear; dim', onyomi: 'アイ', exampleJp: '曖昧', exampleReading: 'あいまい', exampleEn: 'ambiguous' },
        { front: '昧', reading: 'まい', back: 'obscure; dark', onyomi: 'マイ', exampleJp: '曖昧さ', exampleReading: 'あいまいさ', exampleEn: 'ambiguity' },
        { front: '隠', reading: 'かく(す)', back: 'conceal; hide', onyomi: 'イン', kunyomi: 'かく(す), かく(れる)', exampleJp: '隠す', exampleReading: 'かくす', exampleEn: 'to hide' },
        { front: '顕', reading: 'けん', back: 'manifest; conspicuous', onyomi: 'ケン', exampleJp: '顕著', exampleReading: 'けんちょ', exampleEn: 'marked; striking' },
        { front: '虚', reading: 'きょ', back: 'void; empty; false', onyomi: 'キョ, コ', kunyomi: 'むな(しい)', exampleJp: '虚しい', exampleReading: 'むなしい', exampleEn: 'empty; futile' }
      ]
    }
  ]
}
