export type OutputStage = 'build' | 'transform' | 'respond' | 'roleplay' | 'write'

export interface OutputPrompt {
  id: string
  situation: string
  prompt: string
  model: string
  reading: string
  required: { label: string; alternatives: string[] }[]
  note: string
}

export interface OutputUnit {
  id: string
  stage: OutputStage
  title: string
  level: string
  purpose: string
  prompts: OutputPrompt[]
}

export interface OutputCheck {
  matched: boolean[]
  score: number
}

function normalize(text: string): string {
  return text.normalize('NFKC').toLowerCase().replace(/[\s、。！？!?「」『』]/g, '')
}

export function checkOutput(input: string, prompt: OutputPrompt): OutputCheck {
  const value = normalize(input)
  const matched = prompt.required.map((group) =>
    group.alternatives.some((alternative) => value.includes(normalize(alternative)))
  )
  return {
    matched,
    score: matched.length === 0 ? 0 : Math.round((matched.filter(Boolean).length / matched.length) * 100)
  }
}

export const OUTPUT_UNITS: OutputUnit[] = [
  {
    id: 'build-state',
    stage: 'build',
    title: 'State what is true',
    level: 'N5',
    purpose: 'Build a complete topic-comment sentence instead of recalling an isolated word.',
    prompts: [
      { id: 'state-student', situation: 'Introduce yourself in a class.', prompt: 'Say: I am a student.', model: '私は学生です。', reading: 'わたしはがくせいです。', required: [{ label: 'topic は', alternatives: ['は'] }, { label: 'student', alternatives: ['学生', 'がくせい'] }, { label: 'polite ending', alternatives: ['です'] }], note: 'The topic can be omitted in a real conversation when it is already obvious.' },
      { id: 'state-book', situation: 'Someone points at an object.', prompt: 'Say: That is my book.', model: 'それは私の本です。', reading: 'それはわたしのほんです。', required: [{ label: 'that', alternatives: ['それ'] }, { label: 'possession の', alternatives: ['私の', 'わたしの'] }, { label: 'book', alternatives: ['本', 'ほん'] }], note: 'これ refers to something near you; それ is nearer the listener or already mentioned.' },
      { id: 'state-not-free', situation: 'A friend asks whether you are free tomorrow.', prompt: 'Say: I am not free tomorrow.', model: '明日は暇じゃないです。', reading: 'あしたはひまじゃないです。', required: [{ label: 'tomorrow', alternatives: ['明日', 'あした'] }, { label: 'topic は', alternatives: ['は'] }, { label: 'negative', alternatives: ['じゃない', 'ではありません'] }], note: '暇ではありません is more formal; 暇じゃない is ordinary conversation.' }
    ]
  },
  {
    id: 'build-actions',
    stage: 'build',
    title: 'Put actions in place',
    level: 'N5',
    purpose: 'Use the object and location particles in meaningful requests and reports.',
    prompts: [
      { id: 'action-read', situation: 'Describe your evening.', prompt: 'Say: I read manga at home.', model: '家で漫画を読みます。', reading: 'いえでまんがをよみます。', required: [{ label: 'action location で', alternatives: ['家で', 'いえで'] }, { label: 'object を', alternatives: ['漫画を', 'まんがを'] }, { label: 'read', alternatives: ['読みます', '読む', 'よみます', 'よむ'] }], note: 'で marks where an action happens.' },
      { id: 'action-go', situation: 'Tell someone your plan.', prompt: 'Say: I will go to the library tomorrow.', model: '明日、図書館に行きます。', reading: 'あした、としょかんにいきます。', required: [{ label: 'tomorrow', alternatives: ['明日', 'あした'] }, { label: 'destination に/へ', alternatives: ['図書館に', '図書館へ', 'としょかんに', 'としょかんへ'] }, { label: 'go', alternatives: ['行きます', '行く', 'いきます', 'いく'] }], note: 'に and へ can both mark this destination; へ emphasizes direction.' },
      { id: 'action-request', situation: 'You cannot hear the video.', prompt: 'Ask: Please make it a little louder.', model: 'もう少し大きくしてください。', reading: 'もうすこしおおきくしてください。', required: [{ label: 'a little more', alternatives: ['もう少し', 'もうすこし'] }, { label: 'adverb form', alternatives: ['大きく', 'おおきく'] }, { label: 'request', alternatives: ['してください'] }], note: 'The adverb form of 大きい is 大きく, which comes before する.' }
    ]
  },
  {
    id: 'transform-time',
    stage: 'transform',
    title: 'Move through time',
    level: 'N5–N4',
    purpose: 'Transform known verbs instead of memorizing every sentence as a new phrase.',
    prompts: [
      { id: 'time-yesterday', situation: 'Correct someone who thinks you watched it today.', prompt: 'Say: I watched that anime yesterday.', model: 'そのアニメは昨日見ました。', reading: 'そのアニメはきのうみました。', required: [{ label: 'yesterday', alternatives: ['昨日', 'きのう'] }, { label: 'watch past', alternatives: ['見ました', '見た', 'みました', 'みた'] }], note: 'A time word usually needs no particle when it is relative, such as 今日 or 昨日.' },
      { id: 'time-not-finished', situation: 'Someone asks whether you have finished the chapter.', prompt: 'Say: I have not finished reading it yet.', model: 'まだ読み終わっていません。', reading: 'まだよみおわっていません。', required: [{ label: 'still/not yet', alternatives: ['まだ'] }, { label: 'finish reading', alternatives: ['読み終わって', 'よみおわって'] }, { label: 'negative state', alternatives: ['いません', 'ない'] }], note: 'まだ with a negative means not yet.' },
      { id: 'time-while', situation: 'Explain how you study.', prompt: 'Say: I take notes while watching anime.', model: 'アニメを見ながらメモを取ります。', reading: 'アニメをみながらメモをとります。', required: [{ label: 'while ながら', alternatives: ['見ながら', 'みながら'] }, { label: 'take notes', alternatives: ['メモを取', 'メモをと'] }], note: 'The action after ながら is normally the main action.' }
    ]
  },
  {
    id: 'respond-needs',
    stage: 'respond',
    title: 'Ask, refuse and repair',
    level: 'N4',
    purpose: 'Respond to another person instead of translating an isolated English sentence.',
    prompts: [
      { id: 'needs-repeat', situation: 'You did not catch what was said.', prompt: 'Ask them to say it one more time.', model: 'すみません、もう一度言ってください。', reading: 'すみません、もういちどいってください。', required: [{ label: 'softener', alternatives: ['すみません'] }, { label: 'one more time', alternatives: ['もう一度', 'もういちど'] }, { label: 'request to say', alternatives: ['言ってください', 'いってください'] }], note: 'A request with no softener can sound abrupt when speaking to a stranger.' },
      { id: 'needs-decline', situation: 'A friend invites you out, but you must study.', prompt: 'Decline gently and give the reason.', model: '行きたいけど、今日は勉強しなきゃ。', reading: 'いきたいけど、きょうはべんきょうしなきゃ。', required: [{ label: 'want to go', alternatives: ['行きたい', 'いきたい'] }, { label: 'soft contrast', alternatives: ['けど'] }, { label: 'obligation', alternatives: ['勉強しなきゃ', '勉強しなくちゃ', '勉強しないと', 'べんきょうしなきゃ'] }], note: 'けど leaves the refusal softer than a blunt 行かない.' },
      { id: 'needs-clarify', situation: 'You know the words but not the intention.', prompt: 'Ask: What do you mean by that?', model: 'それはどういう意味ですか。', reading: 'それはどういういみですか。', required: [{ label: 'what kind of', alternatives: ['どういう'] }, { label: 'meaning', alternatives: ['意味', 'いみ'] }, { label: 'question', alternatives: ['ですか', 'なの'] }], note: 'どういう意味 asks for intended meaning, not merely a dictionary definition.' }
    ]
  },
  {
    id: 'respond-opinion',
    stage: 'respond',
    title: 'Give a reasoned opinion',
    level: 'N4–N3',
    purpose: 'Join an opinion to evidence instead of stopping at 好き or 嫌い.',
    prompts: [
      { id: 'opinion-character', situation: 'A friend asks why you like a character.', prompt: 'Say: I like her because she is strong but kind.', model: '強いのに優しいから、彼女が好きです。', reading: 'つよいのにやさしいから、かのじょがすきです。', required: [{ label: 'unexpected contrast のに', alternatives: ['のに'] }, { label: 'kind', alternatives: ['優しい', 'やさしい'] }, { label: 'reason から', alternatives: ['から'] }], note: 'This model foregrounds the contrast; 強くて優しいから is also natural but loses that nuance.' },
      { id: 'opinion-story', situation: 'Recommend a visual novel.', prompt: 'Say: The beginning is slow, but the story becomes interesting.', model: '最初は遅いけど、だんだん話が面白くなります。', reading: 'さいしょはおそいけど、だんだんはなしがおもしろくなります。', required: [{ label: 'beginning', alternatives: ['最初', 'さいしょ'] }, { label: 'contrast', alternatives: ['けど', 'が'] }, { label: 'becomes interesting', alternatives: ['面白くな', 'おもしろくな'] }], note: 'An い-adjective takes its く form before なる, so 面白い becomes 面白くなる.' },
      { id: 'opinion-subtitles', situation: 'Explain a study preference.', prompt: 'Say: Japanese subtitles are useful because I can confirm words I heard.', model: '聞こえた言葉を確認できるので、日本語字幕は役に立ちます。', reading: 'きこえたことばをかくにんできるので、にほんごじまくはやくにたちます。', required: [{ label: 'heard words', alternatives: ['聞こえた言葉', 'きこえたことば'] }, { label: 'can confirm', alternatives: ['確認できる', 'かくにんできる'] }, { label: 'reason ので', alternatives: ['ので'] }], note: 'ので presents the reason more neutrally than から.' }
    ]
  },
  {
    id: 'roleplay-shop',
    stage: 'roleplay',
    title: 'Role-play: shop and café',
    level: 'N4',
    purpose: 'Practice polite interaction, clarification and a small problem in one scene.',
    prompts: [
      { id: 'shop-order', situation: 'Staff: ご注文はお決まりですか。', prompt: 'Order a coffee and ask for it without sugar.', model: 'コーヒーを一つお願いします。砂糖は入れないでください。', reading: 'コーヒーをひとつおねがいします。さとうはいれないでください。', required: [{ label: 'order', alternatives: ['コーヒー'] }, { label: 'please', alternatives: ['お願いします', 'ください'] }, { label: 'without sugar', alternatives: ['砂糖は入れない', '砂糖なし', 'さとうはいれない'] }], note: '一つ is safe for a single item; cafés may also use 一杯 for one cup.' },
      { id: 'shop-misheard', situation: 'Staff repeats the wrong size.', prompt: 'Correct them politely: Not large—the small one, please.', model: '大きいほうじゃなくて、小さいほうをお願いします。', reading: 'おおきいほうじゃなくて、ちいさいほうをおねがいします。', required: [{ label: 'not X but', alternatives: ['じゃなくて', 'ではなくて'] }, { label: 'small one', alternatives: ['小さいほう', 'ちいさいほう'] }, { label: 'please', alternatives: ['お願いします', 'おねがいします'] }], note: 'XじゃなくてY is the ordinary correction frame.' },
      { id: 'shop-problem', situation: 'You receive the wrong item.', prompt: 'Explain that this is not what you ordered.', model: 'すみません、これは注文したものと違います。', reading: 'すみません、これはちゅうもんしたものとちがいます。', required: [{ label: 'softener', alternatives: ['すみません'] }, { label: 'ordered item', alternatives: ['注文したもの', 'ちゅうもんしたもの'] }, { label: 'different', alternatives: ['違います', 'ちがいます'] }], note: 'Describe the mismatch before demanding a solution.' }
    ]
  },
  {
    id: 'roleplay-friend',
    stage: 'roleplay',
    title: 'Role-play: making plans',
    level: 'N4–N3',
    purpose: 'Negotiate time, preference and changes with a friend.',
    prompts: [
      { id: 'friend-invite', situation: 'Friend: 土曜日、一緒に映画を見ない？', prompt: 'Accept and ask what time.', model: 'いいね。何時から？', reading: 'いいね。なんじから？', required: [{ label: 'accept', alternatives: ['いいね', '見よう', 'みよう'] }, { label: 'what time', alternatives: ['何時', 'なんじ'] }], note: 'Casual conversation can be much shorter than a textbook sentence.' },
      { id: 'friend-change', situation: 'Friend: 三時はどう？', prompt: 'Say that three is difficult and suggest four.', model: '三時はちょっと難しい。四時なら大丈夫だよ。', reading: 'さんじはちょっとむずかしい。よじならだいじょうぶだよ。', required: [{ label: 'soft refusal', alternatives: ['ちょっと難しい', 'ちょっとむずかしい'] }, { label: 'four o’clock', alternatives: ['四時', 'よじ'] }, { label: 'if four', alternatives: ['なら'] }], note: 'ちょっと難しい is a conventional indirect refusal.' },
      { id: 'friend-followup', situation: 'The plan is settled.', prompt: 'Say that you will message them when you arrive.', model: '着いたら連絡するね。', reading: 'ついたられんらくするね。', required: [{ label: 'when I arrive', alternatives: ['着いたら', 'ついたら'] }, { label: 'contact', alternatives: ['連絡する', 'れんらくする'] }], note: 'たら naturally expresses “when/once” for a completed arrival.' }
    ]
  },
  {
    id: 'roleplay-media',
    stage: 'roleplay',
    title: 'Role-play: discuss a story',
    level: 'N3',
    purpose: 'Explain interpretation, uncertainty and disagreement about media.',
    prompts: [
      { id: 'media-interpret', situation: 'A friend asks why the protagonist left.', prompt: 'Say: I think he left because he did not want to involve everyone.', model: 'みんなを巻き込みたくなかったから、出て行ったんだと思う。', reading: 'みんなをまきこみたくなかったから、でていったんだとおもう。', required: [{ label: 'did not want to involve', alternatives: ['巻き込みたくなかった', 'まきこみたくなかった'] }, { label: 'reason', alternatives: ['から'] }, { label: 'I think', alternatives: ['と思う', 'とおもう'] }], note: 'んだ frames the departure as the explanation you are offering.' },
      { id: 'media-unsure', situation: 'You are not certain whether a character is lying.', prompt: 'Say: She may be hiding something, but I am not sure.', model: '何か隠しているかもしれないけど、まだ分からない。', reading: 'なにかかくしているかもしれないけど、まだわからない。', required: [{ label: 'hiding something', alternatives: ['何か隠して', 'なにかかくして'] }, { label: 'may', alternatives: ['かもしれない'] }, { label: 'not know yet', alternatives: ['まだ分からない', 'まだわからない'] }], note: 'かもしれない marks possibility without claiming evidence you do not have.' },
      { id: 'media-disagree', situation: 'A friend calls the ending happy.', prompt: 'Disagree gently and explain that it felt lonely to you.', model: 'そうかな。私には、むしろ寂しい終わり方に見えた。', reading: 'そうかな。わたしには、むしろさびしいおわりかたにみえた。', required: [{ label: 'soft disagreement', alternatives: ['そうかな', 'そうでしょうか'] }, { label: 'to me', alternatives: ['私には', 'わたしには'] }, { label: 'seemed lonely', alternatives: ['寂しい', 'さびしい'] }], note: 'そうかな opens disagreement without declaring the other reading foolish.' }
    ]
  },
  {
    id: 'write-retell',
    stage: 'write',
    title: 'Write: retell a scene',
    level: 'N3–N2',
    purpose: 'Connect events with time, cause and viewpoint in four to six sentences.',
    prompts: [
      { id: 'retell-rescue', situation: 'A character arrives late and saves a friend.', prompt: 'Write a short retell: what happened first, why the friend was in danger, and how the situation changed.', model: '主人公が着いた時、友達は敵に囲まれていた。約束の場所を間違えたため、助けに来るのが遅くなったのだ。しかし、主人公が敵の注意を引いたおかげで、友達は逃げることができた。二人は無事だったが、もう少しで手遅れになるところだった。', reading: 'しゅじんこうがついたとき、ともだちはてきにかこまれていた。やくそくのばしょをまちがえたため、たすけにくるのがおそくなったのだ。しかし、しゅじんこうがてきのちゅういをひいたおかげで、ともだちはにげることができた。ふたりはぶじだったが、もうすこしでておくれになるところだった。', required: [{ label: 'time order', alternatives: ['時', 'とき', 'まず', 'その後'] }, { label: 'cause', alternatives: ['ため', 'から', 'ので'] }, { label: 'change/result', alternatives: ['おかげで', '結果', 'できた', 'なった'] }], note: 'Your events may differ from the model. Check whether the relationships are explicit and consistent.' },
      { id: 'retell-reveal', situation: 'A trusted character is revealed as the traitor.', prompt: 'Write a short retell that distinguishes earlier clues from what the characters learned now.', model: '彼はずっと仲間のふりをしていたが、以前から不自然な行動がいくつかあった。主人公たちはそれに気づいていたものの、彼を疑いたくなかった。今回、敵に情報を渡しているところを見たことで、ようやく裏切りが明らかになった。', reading: 'かれはずっとなかまのふりをしていたが、いぜんからふしぜんなこうどうがいくつかあった。しゅじんこうたちはそれにきづいていたものの、かれをうたがいたくなかった。こんかい、てきにじょうほうをわたしているところをみたことで、ようやくうらぎりがあきらかになった。', required: [{ label: 'earlier state', alternatives: ['以前', 'いぜん', 'ずっと', '前から'] }, { label: 'contrast', alternatives: ['が', 'ものの', 'けれど'] }, { label: 'new evidence/result', alternatives: ['ことで', '明らか', 'あきらか', '分かった'] }], note: 'A retell should separate what the audience knew, what characters suspected, and what was proven.' },
      { id: 'retell-quiet', situation: 'Nothing dramatic happens; two characters reconcile.', prompt: 'Write a short retell focused on what each person understood rather than physical actions.', model: '二人は最初、相手が自分を避けていると思っていた。けれども、話してみると、どちらも迷惑をかけたくなくて距離を置いていただけだった。誤解が解けた後、以前のように話せるようになった。', reading: 'ふたりはさいしょ、あいてがじぶんをさけているとおもっていた。けれども、はなしてみると、どちらもめいわくをかけたくなくてきょりをおいていただけだった。ごかいがとけたあと、いぜんのようにはなせるようになった。', required: [{ label: 'initial belief', alternatives: ['最初', 'さいしょ', 'と思っていた'] }, { label: 'discovery', alternatives: ['話してみると', '分かった', '気づいた'] }, { label: 'changed state', alternatives: ['ようになった', '誤解が解け', 'ごかいがとけ'] }], note: 'State changes and beliefs carry a quiet scene better than a list of movements.' }
    ]
  },
  {
    id: 'write-opinion',
    stage: 'write',
    title: 'Write: support an opinion',
    level: 'N2–N1',
    purpose: 'Make a claim, concede a limit, and support the conclusion with specific evidence.',
    prompts: [
      { id: 'opinion-adaptation', situation: 'Compare an anime adaptation with its source.', prompt: 'Write five to eight sentences: state which version works better, concede one strength of the other version, and give concrete reasons.', model: '全体としては原作のほうが優れていると思う。アニメ版は音楽と声優の演技によって感情が伝わりやすいものの、重要な場面がいくつも省かれている。そのため、主人公の決断が唐突に見えてしまう。原作では迷いが段階的に描かれており、結末にも説得力がある。映像としての魅力は認めるが、物語を理解するなら原作を勧めたい。', reading: 'ぜんたいとしてはげんさくのほうがすぐれているとおもう。アニメばんはおんがくとせいゆうのえんぎによってかんじょうがつたわりやすいものの、じゅうようなばめんがいくつもはぶかれている。そのため、しゅじんこうのけつだんがとうとつにみえてしまう。げんさくではまよいがだんかいてきにえがかれており、けつまつにもせっとくりょくがある。えいぞうとしてのみりょくはみとめるが、ものがたりをりかいするならげんさくをすすめたい。', required: [{ label: 'claim', alternatives: ['と思う', 'と考える', 'ほうが'] }, { label: 'concession', alternatives: ['ものの', 'とはいえ', '認める', '一方'] }, { label: 'evidence/result', alternatives: ['ため', 'ので', '具体的', 'その結果'] }], note: 'The app checks discourse signals, not whether the opinion itself is correct.' },
      { id: 'opinion-subtitle-policy', situation: 'Argue for or against using Japanese subtitles while learning.', prompt: 'Write five to eight sentences with a conditional recommendation rather than one rule for everyone.', model: '日本語字幕は、音と文字を結びつける段階では非常に役に立つ。ただし、常に字幕だけを読んでいると、音声を処理する力が伸びにくいおそれがある。まず字幕なしで短く聞き、その後で日本語字幕を使って確認する方法がよいだろう。語彙が少ない初心者には字幕を長めに使い、慣れてきたら字幕なしの時間を増やすべきだ。', reading: 'にほんごじまくは、おとともじをむすびつけるだんかいではひじょうにやくにたつ。ただし、つねにじまくだけをよんでいると、おんせいをしょりするちからがのびにくいおそれがある。まずじまくなしでみじかくきき、そのあとでにほんごじまくをつかってかくにんするほうほうがよいだろう。ごいがすくないしょしんしゃにはじまくをながめにつかい、なれてきたらじまくなしのじかんをふやすべきだ。', required: [{ label: 'benefit', alternatives: ['役に立', 'やくにた', '利点'] }, { label: 'limit', alternatives: ['ただし', '一方', 'おそれ', '問題'] }, { label: 'conditional recommendation', alternatives: ['なら', '場合', '段階', 'に応じて', 'べき'] }], note: 'A strong recommendation names who it applies to and when it should change.' },
      { id: 'opinion-difficulty', situation: 'Explain whether learners should read material above their current level.', prompt: 'Write five to eight sentences that distinguish challenge from incomprehensibility.', model: '少し難しい作品に挑戦することは、新しい表現に出会うために必要だ。しかし、ほとんどの文で辞書を引かなければならない状態では、物語の流れを保てず、学習も続きにくい。大意を追いながら重要な未知語だけを調べられる程度が望ましい。難しすぎる場合は、準備用の単語帳を作るか、より易しい作品を一冊挟んでから戻るとよい。', reading: 'すこしむずかしいさくひんにちょうせんすることは、あたらしいひょうげんにであうためにひつようだ。しかし、ほとんどのぶんでじしょをひかなければならないじょうたいでは、ものがたりのながれをたもてず、がくしゅうもつづきにくい。たいいをおいながらじゅうようなみちごだけをしらべられるていどがのぞましい。むずかしすぎるばあいは、じゅんびようのたんごちょうをつくるか、よりやさしいさくひんをいっさつはさんでからもどるとよい。', required: [{ label: 'value of challenge', alternatives: ['必要', 'ひつよう', '役に立', '価値'] }, { label: 'limit or contrast', alternatives: ['しかし', '一方', '難しすぎ', 'むずかしすぎ'] }, { label: 'practical condition', alternatives: ['程度', '場合', 'なら', 'とよい'] }], note: 'Use a testable condition, such as lookup frequency or lost story flow, rather than “hard is good.”' }
    ]
  }
]

export function outputUnit(id: string): OutputUnit | undefined {
  return OUTPUT_UNITS.find((unit) => unit.id === id)
}
