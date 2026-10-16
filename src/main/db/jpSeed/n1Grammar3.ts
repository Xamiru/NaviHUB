import type { SeedCourseDef } from '../japaneseSeed'

// JLPT N1 Grammar III (2026-10-16): the N1 patterns that attach to nouns —
// literary particles, set phrases of news and formal writing, comparison,
// emphasis and the rest — the first two N1 courses did not reach. Right after
// JLPT N1 Grammar II. Keys are frozen.

export const N1C_COURSE: SeedCourseDef = {
  title: 'JLPT N1 Grammar III',
  description:
    'Noun-attached N1 patterns: doing two things at once, indispensable conditions, emphasis, comparison, ' +
    'turning points and the set phrases of formal writing. Do this right after JLPT N1 Grammar II.',
  level: 'N1',
  lessons: [
    {
      key: 'n1c.gatera',
      kind: 'grammar',
      title: '～がてら・～かたがた・～を兼ねて — while (doing one thing, also another)',
      body: `Three ways to say one outing or action serves two purposes.

・Noun / verb ます-stem + がてら — "while, on the way (doing X), also Y". X is usually a movement or outing (散歩、買い物、見物) that serves as the convenient occasion; Y is the errand done along with it.
  散歩がてら、パンを買いに行った。 — "I went to buy bread while out on a walk."
・Noun + かたがた — the same idea in formal, polite language; common in letters and business (お礼かたがた、ご挨拶かたがた).
  お礼かたがた、お伺いしました。 — "I've come to visit, and to thank you as well."
・Noun + を兼ねて / と + noun + を兼ねて — "doubling as, combined with". Both purposes are equal.
  趣味と実益を兼ねて、家庭菜園を始めた。 — "I started a vegetable garden as a hobby that also pays."

Compare ついでに (N3 Grammar III): ついでに is the everyday "while you're at it". がてら is a little more written; かたがた is formal; を兼ねて treats both goals as intended from the start.`,
      cards: [
        { front: '駅まで散歩がてら、友達を送った。', reading: 'えきまでさんぽがてら、ともだちをおくった。', back: 'I walked my friend to the station, taking a stroll at the same time.' },
        { front: '買い物がてら、新しくできた店をのぞいてみた。', reading: 'かいものがてら、あたらしくできたみせをのぞいてみた。', back: 'While out shopping, I took a peek at the new store.' },
        { front: 'ご報告かたがた、ご挨拶に参りました。', reading: 'ごほうこくかたがた、ごあいさつにまいりました。', back: 'I have come to greet you, and to report as well.' },
        { front: '先日のお礼かたがた、近況をお知らせします。', reading: 'せんじつのおれいかたがた、きんきょうをおしらせします。', back: 'I am writing to tell you how I have been, and to thank you for the other day as well.' },
        { front: '運動を兼ねて、毎日自転車で通勤している。', reading: 'うんどうをかねて、まいにちじてんしゃでつうきんしている。', back: 'I cycle to work every day, which doubles as exercise.' },
        { front: '視察と観光を兼ねて、京都を訪れた。', reading: 'しさつとかんこうをかねて、きょうとをおとずれた。', back: 'I visited Kyoto for an inspection combined with sightseeing.' }
      ]
    },
    {
      key: 'n1c.katawara',
      kind: 'grammar',
      title: '～かたわら — while also (pursuing something else)',
      body: `Verb dictionary form / noun + の + かたわら means "while (mainly doing X), also (doing Y) on the side". It describes two long-term activities a person carries on in parallel: a main job and a second pursuit.
  彼は会社に勤めるかたわら、小説を書いている。 — "Alongside his office job, he writes novels."
  教師の仕事のかたわら、ボランティアをしている。 — "Besides my work as a teacher, I volunteer."

The verbs are ongoing activities (働く、勉強する、育てる、経営する), not one-off actions, and the tone is written.

Compare ながら (N4): ながら is two actions at the same moment (歩きながら話す). かたわら is two roles over a period of life.`,
      cards: [
        { front: '彼女は大学で教えるかたわら、翻訳の仕事もしている。', reading: 'かのじょはだいがくでおしえるかたわら、ほんやくのしごともしている。', back: 'Alongside teaching at a university, she also works as a translator.' },
        { front: '父は農業のかたわら、民宿を経営している。', reading: 'ちちはのうぎょうのかたわら、みんしゅくをけいえいしている。', back: 'Besides farming, my father runs a guesthouse.' },
        { front: '子育てのかたわら、資格の勉強を続けた。', reading: 'こそだてのかたわら、しかくのべんきょうをつづけた。', back: 'While raising my children, I kept studying for a qualification.' },
        { front: '彼は医者として働くかたわら、絵を描いている。', reading: 'かれはいしゃとしてはたらくかたわら、えをかいている。', back: 'He paints alongside his work as a doctor.' },
        { front: '本業のかたわら、週末はカフェを開いている。', reading: 'ほんぎょうのかたわら、しゅうまつはカフェをひらいている。', back: 'Besides my main job, I run a café on weekends.' },
        { front: '研究のかたわら、後輩の指導にもあたっている。', reading: 'けんきゅうのかたわら、こうはいのしどうにもあたっている。', back: 'Alongside my research, I also mentor junior colleagues.' }
      ]
    },
    {
      key: 'n1c.atte-no',
      kind: 'grammar',
      title: '～あっての・～なくして(は)・～なしには — cannot exist without',
      body: `Three patterns that say one thing depends completely on another.

・A あっての B — "B exists only because of A, there is no B without A". Usually gratitude or a principle.
  お客様あっての商売です。 — "Our business exists only thanks to our customers."
・Noun / verb + こと + なくして(は)～ない — "without X, Y cannot happen". Formal and emphatic.
  努力なくして、成功はない。 — "There is no success without effort."
  苦労することなくしては、何も得られない。 — "Nothing is gained without hardship."
・Noun + なしには / なしでは～ない — "without X, can't Y". The same meaning; なしでは is the more everyday form.
  彼の協力なしには、この計画は進まない。 — "Without his cooperation, this plan won't move forward."
  辞書なしでは読めない。 — "I can't read it without a dictionary."

なくして and なしには / なしでは end in a negative or an impossibility; あっての states the same dependence positively. Compare を抜きにしては (N2 Grammar IV): similar, but なくして and あっての sound weightier and more principled.`,
      cards: [
        { front: '健康あっての人生だ。', reading: 'けんこうあってのじんせいだ。', back: 'Without health, there is no life worth the name.' },
        { front: 'ファンあっての私たちです。', reading: 'ファンあってのわたしたちです。', back: 'We are nothing without our fans.' },
        { front: '信頼なくして、本当の友情はありえない。', reading: 'しんらいなくして、ほんとうのゆうじょうはありえない。', back: 'True friendship is impossible without trust.' },
        { front: '皆様の支援なくしては、この成功はありませんでした。', reading: 'みなさまのしえんなくしては、このせいこうはありませんでした。', back: 'This success would not have been possible without your support.' },
        { front: '眼鏡なしでは、何も見えない。', reading: 'めがねなしでは、なにもみえない。', back: "I can't see a thing without my glasses." },
        { front: '彼女の助けなしには、ここまで来られなかった。', reading: 'かのじょのたすけなしには、ここまでこられなかった。', back: "I couldn't have come this far without her help." }
      ]
    },
    {
      key: 'n1c.kara-aru',
      kind: 'grammar',
      title: '～からある・～からの — as much as, no less than',
      body: `After a number with a unit, から + ある / の stresses that the amount is large: "as much as, no less than, a good…".

・Number + からある — for size, weight and length (重さ、長さ、高さ).
  三十キロからある荷物を一人で運んだ。 — "I carried a load weighing a good thirty kilos by myself."
・Number + からの — the same emphasis, especially for numbers of people or money; also からする for prices (百万円からする時計 — "a watch costing a million yen or more").
  一万人からの観客が集まった。 — "A crowd of no fewer than ten thousand gathered."

The number is always big for its context, and the speaker is impressed. Compare も (N4): 三十キロも is the everyday way to stress a large amount; からある sounds written and dramatic.`,
      cards: [
        { front: '二メートルからある大男が現れた。', reading: 'にメートルからあるおおおとこがあらわれた。', back: 'A giant of a man, a good two metres tall, appeared.' },
        { front: '百キロからある岩を、三人で動かした。', reading: 'ひゃくキロからあるいわを、さんにんでうごかした。', back: 'Three of us moved a rock weighing a good hundred kilos.' },
        { front: '彼は五十キロからある道を歩いて帰った。', reading: 'かれはごじゅっキロからあるみちをあるいてかえった。', back: 'He walked home along a road a good fifty kilometres long.' },
        { front: '三千人からの人が、その講演を聞きに来た。', reading: 'さんぜんにんからのひとが、そのこうえんをききにきた。', back: 'No fewer than three thousand people came to hear the lecture.' },
        { front: '一億円からの借金を抱えている。', reading: 'いちおくえんからのしゃっきんをかかえている。', back: 'I am saddled with debts of no less than a hundred million yen.' },
        { front: 'あの絵は一千万円からするそうだ。', reading: 'あのえはいっせんまんえんからするそうだ。', back: 'I hear that painting goes for ten million yen or more.' }
      ]
    },
    {
      key: 'n1c.ni-iwasereba',
      kind: 'grammar',
      title: '～に言わせれば・～から言わせれば — if you ask X',
      body: `Person + に言わせれば (に言わせると / から言わせれば) means "if you ask X, according to X". It is the causative of 言う: "if we let X speak". It introduces a personal, often strong or unusual opinion that differs from the general view.
  祖母に言わせれば、最近の若者は我慢が足りないそうだ。 — "If you ask my grandmother, young people these days lack patience."
  私に言わせれば、あの映画は退屈だ。 — "If you ask me, that film is boring."

The opinion is usually critical or confident, and only people (or groups of people) take this pattern.

Compare によると (N3): によると reports information from a source. に言わせれば presents someone's personal judgment.`,
      cards: [
        { front: '専門家に言わせれば、この方法は危険だそうだ。', reading: 'せんもんかにいわせれば、このほうほうはきけんだそうだ。', back: 'According to the experts, this method is dangerous.' },
        { front: '私に言わせれば、彼の計画は甘すぎる。', reading: 'わたしにいわせれば、かれのけいかくはあますぎる。', back: 'If you ask me, his plan is far too naive.' },
        { front: '母に言わせると、私はまだ子供らしい。', reading: 'ははにいわせると、わたしはまだこどもらしい。', back: "According to my mother, I'm apparently still a child." },
        { front: 'プロから言わせれば、素人の作品はすぐ分かる。', reading: 'プロからいわせれば、しろうとのさくひんはすぐわかる。', back: 'If you ask a professional, amateur work is easy to spot.' },
        { front: '彼に言わせれば、遅刻は電車のせいだ。', reading: 'かれにいわせれば、ちこくはでんしゃのせいだ。', back: 'To hear him tell it, being late was the train\'s fault.' },
        { front: '子供たちに言わせれば、宿題は人生の敵だ。', reading: 'こどもたちにいわせれば、しゅくだいはじんせいのてきだ。', back: "If you ask the kids, homework is life's great enemy." }
      ]
    },
    {
      key: 'n1c.koso-are',
      kind: 'grammar',
      title: '～こそあれ・～こそすれ — may be X, but never Y',
      body: `Two literary patterns with emphatic こそ that grant one thing and flatly deny its opposite.

・Noun + こそあれ — "there may be X, but (not Y)" / "though there is X". X exists; the opposite does not.
  程度の差こそあれ、誰にでも悩みはある。 — "There are differences of degree, but everyone has worries."
  感謝こそあれ、恨みはない。 — "I feel gratitude, if anything — no resentment."
・Verb ます-stem / noun + こそすれ, ～ない — "(it may) X, but certainly not Y". Y is the opposite of X.
  彼の努力は称賛こそすれ、非難されるべきものではない。 — "His effort deserves praise, not criticism."
  喜びこそすれ、怒るはずがない。 — "I'd be pleased, if anything — there's no way I'd be angry."

Both belong to writing and formal speech. In conversation the same idea is ～ことはあっても、～ことはない.`,
      cards: [
        { front: '理由こそあれ、暴力は正当化されない。', reading: 'りゆうこそあれ、ぼうりょくはせいとうかされない。', back: 'There may be reasons, but violence is never justified.' },
        { front: '時間の差こそあれ、いずれ皆が経験することだ。', reading: 'じかんのさこそあれ、いずれみながけいけんすることだ。', back: 'Sooner or later, everyone goes through it.' },
        { front: '彼には感謝こそすれ、文句を言うつもりはない。', reading: 'かれにはかんしゃこそすれ、もんくをいうつもりはない。', back: "I'm grateful to him, if anything — I have no intention of complaining." },
        { front: 'その知らせを聞いて、喜びこそすれ悲しみはしなかった。', reading: 'そのしらせをきいて、よろこびこそすれかなしみはしなかった。', back: 'Hearing the news, I felt joy, if anything, not sorrow.' },
        { front: 'この経験は、役に立ちこそすれ、無駄にはならない。', reading: 'このけいけんは、やくにたちこそすれ、むだにはならない。', back: 'This experience will be useful, if anything — it will never be wasted.' },
        { front: '大小の違いこそあれ、失敗しない人はいない。', reading: 'だいしょうのちがいこそあれ、しっぱいしないひとはいない。', back: 'Big or small, nobody avoids mistakes altogether.' }
      ]
    },
    {
      key: 'n1c.tari-tomo',
      kind: 'grammar',
      title: '～たりとも～ない・～なりとも — not even one, at least a little',
      body: `Two literary particles about minimal amounts.

・One + counter + たりとも～ない — "not even one, not a single". A strong negative, often a firm resolve or rule.
  一円たりとも無駄にはできない。 — "We can't waste a single yen."
  一日たりとも休まなかった。 — "I didn't take a single day off."
  Also 何人(なんぴと)たりとも — "no one whatsoever": 何人たりとも立ち入りを禁ず — "Entry forbidden to all."
・Noun + なりとも — "at least, even a little". A modest request or hope for a minimal amount.
  少しなりとも、お役に立てれば嬉しいです。 — "I'd be glad to be of help, even a little."
  一目なりとも会いたい。 — "I want to see them, even if only for a moment."

Compare も (N4): 一円も無駄にしない says the same as 一円たりとも, but たりとも is more emphatic and formal.`,
      cards: [
        { front: '一秒たりとも目を離してはいけない。', reading: 'いちびょうたりともめをはなしてはいけない。', back: "Don't take your eyes off it for even a second." },
        { front: '敵は一人たりとも通すな。', reading: 'てきはひとりたりともとおすな。', back: "Don't let a single enemy through." },
        { front: '一滴たりとも水を無駄にしない。', reading: 'いってきたりともみずをむだにしない。', back: "We don't waste a single drop of water." },
        { front: '何人たりとも、この部屋に入ることは許されない。', reading: 'なんぴとたりとも、このへやにはいることはゆるされない。', back: 'No one whatsoever is allowed into this room.' },
        { front: '一時なりとも、心が休まる時間が欲しい。', reading: 'いっときなりとも、こころがやすまるじかんがほしい。', back: 'I want a moment of peace, even just a brief one.' },
        { front: 'わずかなりとも、被災地に寄付をしたい。', reading: 'わずかなりとも、ひさいちにきふをしたい。', back: 'I want to donate to the disaster area, even if only a little.' }
      ]
    },
    {
      key: 'n1c.de-nakute',
      kind: 'grammar',
      title: '～でなくてなんだろう・～をおいて～ない — if not X, what is?',
      body: `Two emphatic ways to single one thing out.

・Noun + でなくてなんだろう (でなくてなんであろう) — "if this is not X, what is?" A rhetorical question: it is X beyond doubt. Literary, often in essays and speeches.
  これが愛でなくてなんだろう。 — "If this isn't love, what is?"
  これが奇跡でなくてなんであろうか。 — "What is this, if not a miracle?"
・Noun + をおいて(ほかに)～ない — "there is no one / nothing but X". X is the only possible choice.
  この役ができるのは、彼をおいてほかにいない。 — "There is no one but him who can play this role."
  話し合うなら、今をおいてない。 — "If we're going to talk, there's no time but now."

Compare にほかならない (N2 Grammar III): also "nothing other than", but as a calm statement. These two are dramatic.`,
      cards: [
        { front: 'これが運命でなくてなんだろう。', reading: 'これがうんめいでなくてなんだろう。', back: 'If this is not fate, what is?' },
        { front: '命をかけて子を守る、これが親の愛でなくてなんであろう。', reading: 'いのちをかけてこをまもる、これがおやのあいでなくてなんであろう。', back: "Risking one's life to protect a child — what is this, if not a parent's love?" },
        { front: '無実の人を罰するとは、不正でなくてなんだろう。', reading: 'むじつのひとをばっするとは、ふせいでなくてなんだろう。', back: 'Punishing an innocent person — if that is not injustice, what is?' },
        { front: '次のリーダーは、彼女をおいてほかにいない。', reading: 'つぎのリーダーは、かのじょをおいてほかにいない。', back: 'There is no one but her to be the next leader.' },
        { front: 'この問題を解決できるのは、あなたをおいていない。', reading: 'このもんだいをかいけつできるのは、あなたをおいていない。', back: 'No one but you can solve this problem.' },
        { front: '会議を開くなら、来週をおいてほかにない。', reading: 'かいぎをひらくなら、らいしゅうをおいてほかにない。', back: 'If we hold the meeting, it has to be next week.' }
      ]
    },
    {
      key: 'n1c.to-iu-tokoro',
      kind: 'grammar',
      title: '～というところだ・～といったところだ — at most, roughly',
      body: `Noun / plain form + といったところだ (というところだ) sums up an amount or a level as "about, at best, more or less X". It usually plays the amount down: it's not a lot.
  参加者は、多くて二十人といったところだ。 — "There'll be twenty participants at most."
  私の英語は、日常会話ができる程度というところです。 — "My English is about everyday-conversation level, at best."

It also describes a stage something has reached: 工事は八割終わったというところだ — "The construction is about eighty percent done."

The tone is casual and a little modest, so it suits answers about your own ability, income or progress. Compare ぐらい (N5): ぐらい is a neutral "about"; といったところだ adds "and no more than that".`,
      cards: [
        { front: '睡眠時間は、毎日五時間といったところだ。', reading: 'すいみんじかんは、まいにちごじかんといったところだ。', back: 'I get about five hours of sleep a day.' },
        { front: '家から駅までは、歩いて十分というところです。', reading: 'いえからえきまでは、あるいてじゅっぷんというところです。', back: "It's about ten minutes' walk from my house to the station." },
        { front: '今年の売り上げは、去年並みといったところだ。', reading: 'ことしのうりあげは、きょねんなみといったところだ。', back: "This year's sales are roughly on a par with last year's." },
        { front: '料理の腕は、まあまあといったところかな。', reading: 'りょうりのうでは、まあまあといったところかな。', back: "My cooking is so-so, I'd say." },
        { front: '夏休みといっても、せいぜい三日といったところだ。', reading: 'なつやすみといっても、せいぜいみっかといったところだ。', back: "Although it's called summer vacation, it's three days at the very most." },
        { front: '完成までは、あと一息というところだ。', reading: 'かんせいまでは、あとひといきというところだ。', back: "We're just about there — one last push to finish." }
      ]
    },
    {
      key: 'n1c.to-iwazu',
      kind: 'grammar',
      title: '～といわず～といわず — all over, every',
      body: `A といわず B といわず means "whether A or B, all over, every part": not only A and B but everything of that kind. A and B are two typical examples that stand for the whole.
  顔といわず手といわず、泥だらけだ。 — "Covered in mud — face, hands, everywhere."
  昼といわず夜といわず、工事の音がする。 — "Day and night, there's the noise of construction."

A and B are nouns of the same type (body parts, times, places). The pattern stresses that something is everywhere or all the time, often in an unpleasant way.

Compare も～も (N5): 顔も手も汚れている lists two places. といわず～といわず says it isn't limited to them — the whole thing is affected.`,
      cards: [
        { front: '机の上といわず床といわず、本が散らかっている。', reading: 'つくえのうえといわずゆかといわず、ほんがちらかっている。', back: 'Books are scattered everywhere — on the desk, on the floor.' },
        { front: '平日といわず週末といわず、彼は働いている。', reading: 'へいじつといわずしゅうまつといわず、かれははたらいている。', back: 'Weekdays, weekends — he works all the time.' },
        { front: '家の中といわず外といわず、猫の毛だらけだ。', reading: 'いえのなかといわずそとといわず、ねこのけだらけだ。', back: "There's cat hair everywhere, inside the house and out." },
        { front: '朝といわず晩といわず、電話がかかってくる。', reading: 'あさといわずばんといわず、でんわがかかってくる。', back: 'The phone rings morning and night.' },
        { front: '頭といわず背中といわず、蚊に刺された。', reading: 'あたまといわずせなかといわず、かにさされた。', back: 'I got bitten by mosquitoes all over — head, back, everywhere.' },
        { front: '駅前といわず住宅街といわず、新しい店が増えた。', reading: 'えきまえといわずじゅうたくがいといわず、あたらしいみせがふえた。', back: 'New shops have sprung up everywhere, near the station and in the residential areas alike.' }
      ]
    },
    {
      key: 'n1c.hikikae',
      kind: 'grammar',
      title: '～にひきかえ・～にもまして・～とは比べものにならない — compared with',
      body: `Three N1 comparison patterns.

・Noun (or plain form + の) + にひきかえ — "in stark contrast to". Two people or things are set against each other, usually with a judgment of one.
  よく働く兄にひきかえ、弟は怠けてばかりいる。 — "In contrast to his hard-working older brother, the younger one does nothing but laze around."
・Noun + にもまして — "even more than (X, which was already a lot)". Often with question words: 何にもまして (above all), 以前にもまして (more than ever).
  今年の夏は、去年にもまして暑い。 — "This summer is even hotter than last year."
  何にもまして健康が大切だ。 — "Health matters above all else."
・Noun + とは比べものにならない — "is in a different league from, can't be compared with". The gap is enormous.
  プロの技術は、素人とは比べものにならない。 — "A professional's skill is in a different league from an amateur's."

Compare に比べて (N3 Grammar III): a neutral comparison. These three carry strong evaluation.`,
      cards: [
        { front: '去年の失敗にひきかえ、今年は大成功だった。', reading: 'きょねんのしっぱいにひきかえ、ことしはだいせいこうだった。', back: "In stark contrast to last year's failure, this year was a huge success." },
        { front: '静かな姉にひきかえ、妹はおしゃべりだ。', reading: 'しずかなあねにひきかえ、いもうとはおしゃべりだ。', back: 'In contrast to her quiet older sister, the younger one is a chatterbox.' },
        { front: '彼は以前にもまして、練習に励んでいる。', reading: 'かれはいぜんにもまして、れんしゅうにはげんでいる。', back: 'He is training harder than ever.' },
        { front: '何にもまして、家族の幸せを願っている。', reading: 'なににもまして、かぞくのしあわせをねがっている。', back: "Above all else, I wish for my family's happiness." },
        { front: '今の携帯は、昔のものとは比べものにならないほど便利だ。', reading: 'いまのけいたいは、むかしのものとはくらべものにならないほどべんりだ。', back: "Today's phones are incomparably more convenient than the old ones." },
        { front: '都会の家賃は、田舎とは比べものにならない。', reading: 'とかいのやちんは、いなかとはくらべものにならない。', back: "City rents are in a different league from the countryside's." }
      ]
    },
    {
      key: 'n1c.tomo-arou',
      kind: 'grammar',
      title: '～ともあろう — of all people (someone in that position)',
      body: `Noun + ともあろう + noun (ともあろう者 / 人) means "someone of X's standing, of all people". It criticizes a person for behaving in a way unworthy of their status or role.
  教師ともあろう者が、生徒を殴るとは。 — "For a teacher, of all people, to hit a student!"
  大臣ともあろう人が、こんな発言をするなんて信じられない。 — "I can't believe a minister, of all people, would make such a remark."

The first noun is a respected position (警察官、医者、社長、大人) and the rest of the sentence expresses shock or disapproval: とは、なんて、～てはいけない.

Compare たる者 (N1 Grammar I): たる者 states how a person in that position should behave. ともあろう criticizes one who failed to.`,
      cards: [
        { front: '警察官ともあろう者が、法律を破るとは。', reading: 'けいさつかんともあろうものが、ほうりつをやぶるとは。', back: 'For a police officer, of all people, to break the law!' },
        { front: '医者ともあろう人が、たばこをやめられないなんて。', reading: 'いしゃともあろうひとが、たばこをやめられないなんて。', back: "A doctor, of all people, unable to quit smoking!" },
        { front: '社長ともあろう者が、約束の時間に遅れるとは情けない。', reading: 'しゃちょうともあろうものが、やくそくのじかんにおくれるとはなさけない。', back: 'How pathetic for a company president, of all people, to be late for an appointment.' },
        { front: '大人ともあろう者が、子供と本気で喧嘩するな。', reading: 'おとなともあろうものが、こどもとほんきでけんかするな。', back: "A grown adult, of all people, shouldn't get into a serious quarrel with a child." },
        { front: 'プロともあろう人が、そんな初歩的なミスをするなんて。', reading: 'プロともあろうひとが、そんなしょほてきなミスをするなんて。', back: 'A professional making such a basic mistake — I can hardly believe it.' },
        { front: '首相ともあろう人物が、嘘をついていたとは。', reading: 'しゅしょうともあろうじんぶつが、うそをついていたとは。', back: 'To think that a prime minister, of all people, had been lying!' }
      ]
    },
    {
      key: 'n1c.aimatte',
      kind: 'grammar',
      title: '～と相まって・～も相まって — combined with',
      body: `相まって (あいまって) means "working together". A と相まって says A combines with another factor to produce a result, usually a stronger one.
  美しい景色と相まって、旅は忘れられないものになった。 — "Combined with the beautiful scenery, the trip became unforgettable."
  努力と才能が相まって、彼女は成功した。 — "Effort and talent together brought her success."

With も, A も相まって adds A as one more contributing factor: "helped also by A".
  連休も相まって、観光地は大変な人出だった。 — "Helped also by the long weekend, the tourist spots were packed."

Written and descriptive; the result is a single combined effect, good or bad. Compare に伴って (N2 Grammar III): に伴って says one thing changes along with another; と相まって says two factors add up to one effect.`,
      cards: [
        { front: '天気の良さと相まって、祭りは大いに盛り上がった。', reading: 'てんきのよさとあいまって、まつりはおおいにもりあがった。', back: 'Combined with the fine weather, the festival was a great success.' },
        { front: '彼の演技は音楽と相まって、観客を感動させた。', reading: 'かれのえんぎはおんがくとあいまって、かんきゃくをかんどうさせた。', back: 'His acting, together with the music, moved the audience.' },
        { front: '円安も相まって、外国人観光客が増えている。', reading: 'えんやすもあいまって、がいこくじんかんこうきゃくがふえている。', back: 'Helped also by the weak yen, foreign tourists are increasing.' },
        { front: '疲れと寝不足が相まって、熱が出た。', reading: 'つかれとねぶそくがあいまって、ねつがでた。', back: 'Fatigue and lack of sleep together gave me a fever.' },
        { front: '新しい監督の戦術と選手の努力が相まって、チームは優勝した。', reading: 'あたらしいかんとくのせんじゅつとせんしゅのどりょくがあいまって、チームはゆうしょうした。', back: "The new manager's tactics and the players' effort together won the team the title." },
        { front: '雨も相まって、道路はひどく渋滞した。', reading: 'あめもあいまって、どうろはひどくじゅうたいした。', back: 'With the rain on top of it all, traffic was badly jammed.' }
      ]
    },
    {
      key: 'n1c.iza-shirazu',
      kind: 'grammar',
      title: '～ならいざ知らず・～はいざ知らず — X might be one thing, but',
      body: `いざ知らず means "I don't know about (X)". Noun + ならいざ知らず / はいざ知らず grants that X might be excused or different, and then insists that the case at hand is another matter.
  子供ならいざ知らず、大人がそんなことも知らないとは。 — "A child, maybe, but for an adult not to know even that!"
  昔はいざ知らず、今は女性も働くのが当たり前だ。 — "The old days were one thing, but now it's normal for women to work too."

The second clause is usually criticism or a strong statement about the present case. A clause can also come before ならいざ知らず: 初めてならいざ知らず、三回目なのにまだ間違える — "If it were your first time, fine, but it's your third and you still get it wrong."

Compare はまだしも (N2 Grammar IV): very close in meaning. いざ知らず is more literary and often contrasts eras or special cases.`,
      cards: [
        { front: '素人ならいざ知らず、プロがこんなミスをするとは。', reading: 'しろうとならいざしらず、プロがこんなミスをするとは。', back: 'From an amateur, maybe, but for a pro to make a mistake like this!' },
        { front: '他の人はいざ知らず、私はこの計画に反対だ。', reading: 'ほかのひとはいざしらず、わたしはこのけいかくにはんたいだ。', back: "I don't know about anyone else, but I'm against this plan." },
        { front: '百年前ならいざ知らず、今時そんな考えは通用しない。', reading: 'ひゃくねんまえならいざしらず、いまどきそんなかんがえはつうようしない。', back: 'A hundred years ago, maybe, but that way of thinking will not fly today.' },
        { front: '一度ならいざ知らず、何度も同じことを言わせるな。', reading: 'いちどならいざしらず、なんどもおなじことをいわせるな。', back: "Once is one thing, but don't make me say the same thing over and over." },
        { front: '外国人ならいざ知らず、日本人なのに漢字が読めないのか。', reading: 'がいこくじんならいざしらず、にほんじんなのにかんじがよめないのか。', back: "A foreigner, maybe — but you're Japanese and you can't read kanji?" },
        { front: '冬ならいざ知らず、この暑さでコートを着るなんて。', reading: 'ふゆならいざしらず、このあつさでコートをきるなんて。', back: "In winter, perhaps, but wearing a coat in this heat?" }
      ]
    },
    {
      key: 'n1c.kasanete',
      kind: 'grammar',
      title: '～に～を重ねて — (X) upon (X)',
      body: `Noun + に + the same noun + を重ねて means "X upon X, X after X": something was repeated or piled up many times. It stresses great persistence or accumulation.
  努力に努力を重ねて、ついに夢を叶えた。 — "Through effort upon effort, I finally achieved my dream."
  改良に改良を重ねた製品 — "a product improved again and again"

Common pairs: 努力に努力を重ねる、苦労に苦労を重ねる、失敗に失敗を重ねる、工夫に工夫を重ねる、検討に検討を重ねる.

Related forms: 重ね重ね (repeatedly, formal: 重ね重ねお詫び申し上げます — "I apologize once again"), 回を重ねる (to be held many times).`,
      cards: [
        { front: '失敗に失敗を重ねて、やっと成功した。', reading: 'しっぱいにしっぱいをかさねて、やっとせいこうした。', back: 'After failure upon failure, I finally succeeded.' },
        { front: '苦労に苦労を重ねて、店を大きくした。', reading: 'くろうにくろうをかさねて、みせをおおきくした。', back: 'Through hardship upon hardship, they built the shop up.' },
        { front: '検討に検討を重ねた結果、計画は中止となった。', reading: 'けんとうにけんとうをかさねたけっか、けいかくはちゅうしとなった。', back: 'After deliberating over and over, the plan was cancelled.' },
        { front: '工夫に工夫を重ねて、この料理が生まれた。', reading: 'くふうにくふうをかさねて、このりょうりがうまれた。', back: 'This dish was born from refinement after refinement.' },
        { front: '彼は練習に練習を重ね、代表選手に選ばれた。', reading: 'かれはれんしゅうにれんしゅうをかさね、だいひょうせんしゅにえらばれた。', back: 'Through practice upon practice, he was chosen for the national team.' },
        { front: '研究に研究を重ねて、ついに新薬を開発した。', reading: 'けんきゅうにけんきゅうをかさねて、ついにしんやくをかいはつした。', back: 'After research upon research, they finally developed the new drug.' }
      ]
    },
    {
      key: 'n1c.ni-atte',
      kind: 'grammar',
      title: '～にあって・～にして — in (a special situation), only (someone like)',
      body: `Two literary particle compounds.

・Noun + にあって(は) — "in (a special situation or position)". Formal; the situation is unusual or important, and the main clause describes how one acts or what happens in it.
  非常時にあっては、冷静な判断が求められる。 — "In an emergency, calm judgment is required."
  異国の地にあって、彼は故郷を思った。 — "Far away in a foreign land, he thought of home."
・Noun + にして — "only someone like X, even X". Often にして初めて ("only when (you are) X") or にしてはじめて.
  名人にして初めてできる技だ。 — "It's a technique only a master can pull off."
  It also marks an age or a time: 四十歳にして結婚した — "They married at the age of forty, at last."

Compare において (N3 Grammar III): において is a neutral formal "in". にあって stresses being placed in a demanding situation.`,
      cards: [
        { front: '厳しい状況にあっても、彼女は笑顔を忘れなかった。', reading: 'きびしいじょうきょうにあっても、かのじょはえがおをわすれなかった。', back: 'Even in difficult circumstances, she never stopped smiling.' },
        { front: '指導者の立場にあっては、言葉に責任を持つべきだ。', reading: 'しどうしゃのたちばにあっては、ことばにせきにんをもつべきだ。', back: 'Those in positions of leadership should take responsibility for their words.' },
        { front: '戦争の時代にあって、人々は助け合って生きた。', reading: 'せんそうのじだいにあって、ひとびとはたすけあっていきた。', back: 'In an age of war, people survived by helping one another.' },
        { front: 'この味は、長年の経験を持つ職人にして初めて出せる。', reading: 'このあじは、ながねんのけいけんをもつしょくにんにしてはじめてだせる。', back: 'Only a craftsman with years of experience can produce this flavour.' },
        { front: '天才の彼にして、この問題は解けなかった。', reading: 'てんさいのかれにして、このもんだいはとけなかった。', back: "Even he, a genius, couldn't solve this problem." },
        { front: '彼は五十歳にして、初めて海外へ行った。', reading: 'かれはごじゅっさいにして、はじめてかいがいへいった。', back: 'At the age of fifty, he went abroad for the first time.' }
      ]
    },
    {
      key: 'n1c.ni-todomarazu',
      kind: 'grammar',
      title: '～にとどまらず・～に限ったことではない — not limited to',
      body: `Two ways to say something reaches beyond one case.

・Noun / verb dictionary form + にとどまらず(～も) — "not stopping at, not limited to". The effect spreads to a wider range.
  彼の人気は国内にとどまらず、海外にも広がっている。 — "His popularity isn't limited to Japan; it's spreading abroad too."
  被害は一つの町にとどまらなかった。 — "The damage was not confined to one town."
・Noun + に限ったことではない (でもない) — "it's not just X, it's not only true of X". Often to calm a complaint or broaden a criticism.
  渋滞は今日に限ったことではない。 — "The traffic jam isn't just today's problem."
  遅刻するのは彼に限ったことではない。 — "He's not the only one who comes late."

Compare だけでなく (N3 Grammar II): the plain "not only… but also". にとどまらず stresses spreading beyond a boundary; に限ったことではない corrects the idea that something is unique.`,
      cards: [
        { front: 'その病気は高齢者にとどまらず、若者の間でも広がっている。', reading: 'そのびょうきはこうれいしゃにとどまらず、わかもののあいだでもひろがっている。', back: 'The illness is not confined to the elderly; it is spreading among young people too.' },
        { front: '彼女の活動は、音楽にとどまらず映画にまで及んでいる。', reading: 'かのじょのかつどうは、おんがくにとどまらずえいがにまでおよんでいる。', back: 'Her work extends beyond music, all the way into film.' },
        { front: '問題は一つの会社にとどまらない。', reading: 'もんだいはひとつのかいしゃにとどまらない。', back: 'The problem goes beyond a single company.' },
        { front: '物価の上昇は、日本に限ったことではない。', reading: 'ぶっかのじょうしょうは、にほんにかぎったことではない。', back: 'Rising prices are not a problem unique to Japan.' },
        { front: '彼が文句を言うのは、今に始まったことでも、今日に限ったことでもない。', reading: 'かれがもんくをいうのは、いまにはじまったことでも、きょうにかぎったことでもない。', back: "His complaining isn't new, and it isn't just today, either." },
        { front: '子供の読書離れは、この学校に限ったことではない。', reading: 'こどものどくしょばなれは、このがっこうにかぎったことではない。', back: 'Children turning away from books is not limited to this school.' }
      ]
    },
    {
      key: 'n1c.ni-yorazu',
      kind: 'grammar',
      title: '～によらず・～はさておき・～はどうであれ — regardless, setting aside',
      body: `Three ways to set a factor aside.

・Noun + によらず — "regardless of, irrespective of". The factor does not affect the outcome; formal (何事によらず — "in everything").
  年齢によらず、誰でも応募できる。 — "Anyone can apply, regardless of age."
  見かけによらず、彼は力持ちだ。 — "Despite appearances, he's very strong." (a fixed phrase: "contrary to looks")
・Noun + はさておき — "setting X aside, X apart". Put one topic on hold to focus on something more urgent.
  冗談はさておき、本題に入ろう。 — "Joking aside, let's get to the point."
・Noun + はどうであれ — "whatever X may be, however X turns out".
  結果はどうであれ、最後までやり遂げたい。 — "Whatever the result, I want to see it through to the end."

Compare にかかわらず (N2 Grammar III): very close to によらず; によらず is more literary and has the fixed phrase 見かけによらず. はさておき is like はともかく (N2 Grammar IV).`,
      cards: [
        { front: '性別によらず、能力のある人を採用する。', reading: 'せいべつによらず、のうりょくのあるひとをさいようする。', back: 'We hire capable people regardless of gender.' },
        { front: '彼女は見かけによらず、とても頑固だ。', reading: 'かのじょはみかけによらず、とてもがんこだ。', back: 'Contrary to appearances, she is very stubborn.' },
        { front: '何事によらず、最初が肝心だ。', reading: 'なにごとによらず、さいしょがかんじんだ。', back: 'In everything, the beginning is what counts.' },
        { front: '費用の問題はさておき、まず計画を立てよう。', reading: 'ひようのもんだいはさておき、まずけいかくをたてよう。', back: "Setting aside the question of cost, let's first make a plan." },
        { front: '理由はどうであれ、暴力は許されない。', reading: 'りゆうはどうであれ、ぼうりょくはゆるされない。', back: 'Whatever the reason, violence is not acceptable.' },
        { front: '他人の評価はどうであれ、自分の道を進む。', reading: 'たにんのひょうかはどうであれ、じぶんのみちをすすむ。', back: 'Whatever others think of me, I will follow my own path.' }
      ]
    },
    {
      key: 'n1c.sakigakete',
      kind: 'grammar',
      title: '～に先駆けて・～を皮切りに — ahead of, starting with',
      body: `Two patterns about being first.

・Noun + に先駆けて — "ahead of, before anyone else in". Someone does something first, leading the way.
  この会社は他社に先駆けて、新技術を導入した。 — "This company introduced the new technology ahead of its competitors."
  全国に先駆けて、この町で新制度が始まった。 — "The new system started in this town, ahead of the rest of the country."
・Noun + を皮切りに(して) — "starting with, beginning with". X is the first in a series of similar events that follow.
  東京公演を皮切りに、全国ツアーが始まる。 — "Starting with the Tokyo show, a national tour begins."

Compare に先立ち (N2 Grammar III): に先立ち means "before (an event), as preparation". に先駆けて means "ahead of others", leading the way. を皮切りに opens a series; をはじめ (N2 Grammar III) names the leading example of a group.`,
      cards: [
        { front: '世界に先駆けて、この薬が日本で発売された。', reading: 'せかいにさきがけて、このくすりがにほんではつばいされた。', back: 'This medicine went on sale in Japan ahead of the rest of the world.' },
        { front: '一般公開に先駆けて、記者向けの発表会が開かれた。', reading: 'いっぱんこうかいにさきがけて、きしゃむけのはっぴょうかいがひらかれた。', back: 'Ahead of the public release, a press presentation was held.' },
        { front: '彼は時代に先駆けて、ネットで商売を始めた。', reading: 'かれはじだいにさきがけて、ネットでしょうばいをはじめた。', back: 'Ahead of his time, he started doing business online.' },
        { front: '大阪店を皮切りに、全国に店を広げた。', reading: 'おおさかてんをかわきりに、ぜんこくにみせをひろげた。', back: 'Starting with the Osaka branch, they expanded across the country.' },
        { front: '彼の発言を皮切りにして、次々と反対意見が出た。', reading: 'かれのはつげんをかわきりにして、つぎつぎとはんたいいけんがでた。', back: 'Starting with his remark, objections came one after another.' },
        { front: '来月の札幌を皮切りに、各地で展覧会が開かれる。', reading: 'らいげつのさっぽろをかわきりに、かくちでてんらんかいがひらかれる。', back: 'Beginning in Sapporo next month, the exhibition will be held around the country.' }
      ]
    },
    {
      key: 'n1c.ni-soku',
      kind: 'grammar',
      title: '～に即して・～を踏まえて — in line with, taking into account',
      body: `Two formal ways of grounding an action in something.

・Noun + に即して / に即した — "in accordance with, in line with (the facts, the rules, reality)". You match the action precisely to X.
  法律に即して判断する。 — "We make our judgment in line with the law."
  現実に即した計画 — "a plan grounded in reality"
・Noun + を踏まえて / を踏まえた — "based on, taking into account". You build on X as a foundation (results, discussion, experience).
  前回の反省を踏まえて、改善策を考えた。 — "Taking into account what we learned last time, we came up with improvements."
  調査結果を踏まえた提案 — "a proposal based on the survey results"

Both appear in reports, meetings and official documents. Compare に基づいて (N2 Grammar III): very close to に即して. を踏まえて stresses that earlier discussion or results were taken on board.`,
      cards: [
        { front: '実際の状況に即して、対応を考えるべきだ。', reading: 'じっさいのじょうきょうにそくして、たいおうをかんがえるべきだ。', back: 'We should plan our response in line with the actual situation.' },
        { front: '規則に即して、処分が決定された。', reading: 'きそくにそくして、しょぶんがけっていされた。', back: 'The penalty was decided in accordance with the rules.' },
        { front: '時代に即した教育が求められている。', reading: 'じだいにそくしたきょういくがもとめられている。', back: 'An education that fits the times is needed.' },
        { front: '皆さんの意見を踏まえて、案を修正しました。', reading: 'みなさんのいけんをふまえて、あんをしゅうせいしました。', back: 'We revised the proposal taking everyone\'s opinions into account.' },
        { front: '過去の経験を踏まえて、新しい方法を試した。', reading: 'かこのけいけんをふまえて、あたらしいほうほうをためした。', back: 'Building on past experience, we tried a new method.' },
        { front: '前回の議論を踏まえた上で、話を進めましょう。', reading: 'ぜんかいのぎろんをふまえたうえで、はなしをすすめましょう。', back: "Let's move forward, taking last time's discussion into account." }
      ]
    },
    {
      key: 'n1c.kirai',
      kind: 'grammar',
      title: '～きらいがある — has a tendency to (something bad)',
      body: `Verb dictionary form / noun + の + きらいがある means "has a (bad) tendency to, is inclined to". The speaker points out an undesirable habit or leaning, usually in a critical but restrained tone. きらい here is written 嫌い but has nothing to do with "dislike".
  彼は物事を悲観的に考えるきらいがある。 — "He tends to look on the dark side of things."
  最近の若者は、すぐ諦めるきらいがある。 — "Young people these days tend to give up easily."
  Noun: 独断のきらいがある — "tends to be dogmatic"

It is written and judgmental, used about others, groups or society, rather than yourself. Compare がち (N2 Grammar I): がち is the everyday "tends to"; きらいがある is formal and written, and passes a stronger judgment on character.`,
      cards: [
        { front: '彼は人の話を最後まで聞かないきらいがある。', reading: 'かれはひとのはなしをさいごまできかないきらいがある。', back: "He tends not to listen to people all the way through." },
        { front: 'この国の政治家は、問題を先送りにするきらいがある。', reading: 'このくにのせいじかは、もんだいをさきおくりにするきらいがある。', back: "This country's politicians tend to put problems off." },
        { front: '彼女は何でも一人で抱え込むきらいがある。', reading: 'かのじょはなんでもひとりでかかえこむきらいがある。', back: 'She has a tendency to shoulder everything on her own.' },
        { front: 'マスコミは事件を大げさに報道するきらいがある。', reading: 'マスコミはじけんをおおげさにほうどうするきらいがある。', back: 'The media tend to report incidents in an exaggerated way.' },
        { front: 'あの監督の作品は、説明過多のきらいがある。', reading: 'あのかんとくのさくひんは、せつめいかたのきらいがある。', back: "That director's films tend to over-explain." },
        { front: '人は自分に都合よく考えるきらいがある。', reading: 'ひとはじぶんにつごうよくかんがえるきらいがある。', back: 'People tend to think in ways that suit themselves.' }
      ]
    },
    {
      key: 'n1c.temae',
      kind: 'grammar',
      title: '～手前 — out of face (in front of others)',
      body: `手前 (てまえ) literally means "this side, in front of". As a grammar pattern, noun + の + 手前 or plain-form verb + 手前 means "because of what (I said / did) in front of others, out of consideration for appearances". Having said or done something publicly, you feel obliged to act consistently, to save face.
  皆の前で約束した手前、今さら断れない。 — "Having promised in front of everyone, I can't back out now."
  子供の手前、親が嘘をつくわけにはいかない。 — "With the children watching, parents can't very well lie."

The main clause is usually an obligation or impossibility: ～わけにはいかない、～なければならない、～できない.

Compare 以上 (N2 Grammar IV): 以上 reasons from a fact to a duty. 手前 adds that the duty comes from how you would look to others.`,
      cards: [
        { front: '自分から言い出した手前、やめるとは言えない。', reading: 'じぶんからいいだしたてまえ、やめるとはいえない。', back: "Since I was the one who suggested it, I can't say I'm quitting." },
        { front: '部下の手前、上司が弱音を吐くわけにはいかない。', reading: 'ぶかのてまえ、じょうしがよわねをはくわけにはいかない。', back: 'With subordinates watching, a boss can\'t very well complain.' },
        { front: '大丈夫だと言った手前、助けを求めにくい。', reading: 'だいじょうぶだといったてまえ、たすけをもとめにくい。', back: "Having said I was fine, it's hard to ask for help." },
        { front: '客の手前、怒るわけにもいかなかった。', reading: 'きゃくのてまえ、おこるわけにもいかなかった。', back: "With customers present, I couldn't very well get angry." },
        { front: '皆の前で優勝を宣言した手前、手を抜くわけにはいかない。', reading: 'みなのまえでゆうしょうをせんげんしたてまえ、てをぬくわけにはいかない。', back: "Having declared in front of everyone that I'd win, I can't slack off now." },
        { front: '妻の手前、高い買い物をしたとは言えなかった。', reading: 'つまのてまえ、たかいかいものをしたとはいえなかった。', back: "With my wife there, I couldn't admit to the expensive purchase." }
      ]
    },
    {
      key: 'n1c.itari',
      kind: 'grammar',
      title: '～の至り・～限りだ — the height of, extremely',
      body: `Two literary ways to express a feeling at its peak.

・Noun + の至り — "the height of, the utmost". Mostly in fixed formal phrases of gratitude, honour or embarrassment, plus 若気の至り (youthful folly).
  このような賞をいただき、光栄の至りです。 — "Receiving such an award is the greatest honour."
  お恥ずかしい限り / 赤面の至りです — "I am thoroughly embarrassed."
  若気の至りで、無茶なことをした。 — "In my youthful folly, I did reckless things."
・い-adjective (dictionary form) or な-adjective + な + 限りだ — "extremely, I feel nothing but…". The speaker's own feeling, at its strongest.
  一人で異国に住むのは、心細い限りだ。 — "Living alone in a foreign country is so very lonely."
  皆さんに会えて、嬉しい限りです。 — "I'm truly delighted to see you all."

Compare の極み (N1 Grammar II): the same "height of", mostly with nouns (贅沢の極み). 限りだ attaches to feeling adjectives (嬉しい、寂しい、羨ましい、残念な).`,
      cards: [
        { front: 'お褒めの言葉をいただき、恐縮の至りです。', reading: 'おほめのことばをいただき、きょうしゅくのいたりです。', back: 'I am deeply honoured by your kind words.' },
        { front: '若気の至りとはいえ、あの行動は反省している。', reading: 'わかげのいたりとはいえ、あのこうどうははんせいしている。', back: 'Even if it was youthful folly, I regret what I did.' },
        { front: '皆様にお越しいただき、感激の至りです。', reading: 'みなさまにおこしいただき、かんげきのいたりです。', back: 'I am deeply moved that you have all come.' },
        { front: '優勝できて、嬉しい限りです。', reading: 'ゆうしょうできて、うれしいかぎりです。', back: 'I am overjoyed to have won.' },
        { front: '毎日海外旅行なんて、羨ましい限りだ。', reading: 'まいにちかいがいりょこうなんて、うらやましいかぎりだ。', back: 'Travelling abroad every day — I am terribly envious.' },
        { front: '最後に会えなかったのは、残念な限りです。', reading: 'さいごにあえなかったのは、ざんねんなかぎりです。', back: 'It is a great pity I could not see them one last time.' }
      ]
    },
    {
      key: 'n1c.mo-saru',
      kind: 'grammar',
      title: '～もさることながら — not only X, but (even more) Y',
      body: `A もさることながら B も means "A goes without saying, but B too (perhaps even more so)". A is admitted as important; the speaker's real emphasis is on B.
  この店は味もさることながら、サービスも素晴らしい。 — "The food here is excellent, of course, but the service is wonderful too."
  彼は成績もさることながら、人柄が素晴らしい。 — "His grades are good, but it's his character that's truly wonderful."

Formal and appreciative; both A and B are usually positive. The B part often has も or adds a stronger point.

Compare はもちろん / はもとより (N3 Grammar II, N2 Grammar IV): those treat A and B as roughly equal ("A, of course, and B"). もさることながら puts the spotlight on B.`,
      cards: [
        { front: 'この映画は、ストーリーもさることながら、映像が美しい。', reading: 'このえいがは、ストーリーもさることながら、えいぞうがうつくしい。', back: 'The story is good, of course, but what is really beautiful is the visuals.' },
        { front: '彼女は歌唱力もさることながら、表現力が素晴らしい。', reading: 'かのじょはかしょうりょくもさることながら、ひょうげんりょくがすばらしい。', back: 'Her singing ability is a given, but her expressiveness is remarkable.' },
        { front: '値段もさることながら、品質の良さで選ばれている。', reading: 'ねだんもさることながら、ひんしつのよさでえらばれている。', back: 'Price matters, of course, but it is chosen above all for its quality.' },
        { front: '景色もさることながら、この宿は料理も一流だ。', reading: 'けしきもさることながら、このやどはりょうりもいちりゅうだ。', back: 'The view is wonderful, but this inn\'s food is first-class too.' },
        { front: '才能もさることながら、努力が彼を成功に導いた。', reading: 'さいのうもさることながら、どりょくがかれをせいこうにみちびいた。', back: 'Talent played its part, but it was effort that led him to success.' },
        { front: 'デザインもさることながら、使いやすさにこだわった。', reading: 'デザインもさることながら、つかいやすさにこだわった。', back: 'Design mattered, but we were particular above all about ease of use.' }
      ]
    },
    {
      key: 'n1c.monotomo',
      kind: 'grammar',
      title: '～をものともせず(に)・～をよそに — in defiance of, ignoring',
      body: `Two patterns for pressing on regardless of an obstacle or of other people.

・Noun + をものともせず(に) — "in defiance of, undaunted by". Someone bravely overcomes difficulty; the tone is admiring and it describes others, not yourself.
  彼は大怪我をものともせず、試合に出場した。 — "Undaunted by a serious injury, he played in the match."
・Noun + をよそに — "ignoring, paying no heed to". Someone disregards others' worries, opposition or expectations; often critical.
  親の心配をよそに、彼女は一人で旅に出た。 — "Ignoring her parents' worries, she set off on a trip alone."
  住民の反対をよそに、工事が始まった。 — "Construction began despite residents' opposition."

Compare にもかかわらず (N2 Grammar III): a neutral "despite". をものともせず praises courage; をよそに points out disregard.`,
      cards: [
        { front: '選手たちは強い雨をものともせず、最後まで戦った。', reading: 'せんしゅたちはつよいあめをものともせず、さいごまでたたかった。', back: 'Undaunted by the heavy rain, the players fought to the end.' },
        { front: '周囲の反対をものともせずに、彼は起業した。', reading: 'しゅういのはんたいをものともせずに、かれはきぎょうした。', back: 'In defiance of the opposition around him, he started his own company.' },
        { front: '彼女は病気をものともせず、仕事を続けている。', reading: 'かのじょはびょうきをものともせず、しごとをつづけている。', back: 'Undaunted by her illness, she carries on working.' },
        { front: '家族の期待をよそに、彼は大学を辞めた。', reading: 'かぞくのきたいをよそに、かれはだいがくをやめた。', back: "Ignoring his family's expectations, he dropped out of university." },
        { front: '試験が近いのをよそに、弟はゲームばかりしている。', reading: 'しけんがちかいのをよそに、おとうとはゲームばかりしている。', back: 'Paying no heed to the approaching exams, my brother does nothing but play games.' },
        { front: '世間の批判をよそに、計画は進められた。', reading: 'せけんのひはんをよそに、けいかくはすすめられた。', back: 'The plan went ahead regardless of public criticism.' }
      ]
    },
    {
      key: 'n1c.yogi-naku',
      kind: 'grammar',
      title: '～を余儀なくされる・～を禁じ得ない — forced to, cannot help feeling',
      body: `Two formal set phrases about things beyond one's control.

・Noun + を余儀なくされる — "be forced to, have no choice but". 余儀ない means "unavoidable"; the noun is usually a する-verb noun (中止、変更、撤退、入院). The cause is outside circumstances.
  大雪のため、試合は中止を余儀なくされた。 — "The match had to be cancelled because of heavy snow."
  The active form を余儀なくさせる means "to force (someone) to".
・Noun + を禁じ得ない — "cannot help (feeling), cannot suppress". With nouns of emotion (同情、怒り、驚き、涙); written and formal.
  被害者の話を聞いて、同情を禁じ得なかった。 — "Hearing the victim's story, I couldn't help but feel sympathy."

Compare ざるを得ない (N2 Grammar I): a general "have no choice but to". を余儀なくされる is passive and news-like. を禁じ得ない is the formal version of ずにはいられない.`,
      cards: [
        { front: '台風の影響で、飛行機は引き返しを余儀なくされた。', reading: 'たいふうのえいきょうで、ひこうきはひきかえしをよぎなくされた。', back: 'Because of the typhoon, the plane was forced to turn back.' },
        { front: '怪我のため、彼は引退を余儀なくされた。', reading: 'けがのため、かれはいんたいをよぎなくされた。', back: 'Injury forced him to retire.' },
        { front: '経営不振で、工場は閉鎖を余儀なくされた。', reading: 'けいえいふしんで、こうじょうはへいさをよぎなくされた。', back: 'Poor business forced the factory to close.' },
        { front: '彼の不誠実な態度には、怒りを禁じ得ない。', reading: 'かれのふせいじつなたいどには、いかりをきんじえない。', back: 'I cannot help but feel anger at his dishonest attitude.' },
        { front: '突然の訃報に、驚きを禁じ得なかった。', reading: 'とつぜんのふほうに、おどろきをきんじえなかった。', back: 'I could not suppress my shock at the sudden news of the death.' },
        { front: '子供たちの境遇には、涙を禁じ得ない。', reading: 'こどもたちのきょうぐうには、なみだをきんじえない。', back: "I can't hold back tears at the children's plight." }
      ]
    },
    {
      key: 'n1c.zentei',
      kind: 'grammar',
      title: '～を前提に(して)・～を前提として — on the assumption of',
      body: `前提 (ぜんてい) means "premise, precondition". Noun + を前提に(して) / を前提として means "on the premise of, assuming, with X as a condition".
  結婚を前提に付き合っている。 — "We're dating with marriage in mind."
  全員参加を前提として、計画を立てた。 — "We made the plan on the assumption that everyone would take part."

Before a noun: を前提とした (返済を前提とした融資 — "a loan made on condition of repayment").
With a clause: 前提で / という前提で: 雨が降らないという前提で、準備した — "We prepared on the assumption it wouldn't rain."

Compare として (N3 Grammar III) and を～として (N2 Grammar III): を前提に narrows that to "taking X as a given starting condition".`,
      cards: [
        { front: '将来の独立を前提に、技術を学んでいる。', reading: 'しょうらいのどくりつをぜんていに、ぎじゅつをまなんでいる。', back: "I'm learning the trade with going independent in mind." },
        { front: 'この議論は、予算が増えることを前提にしている。', reading: 'このぎろんは、よさんがふえることをぜんていにしている。', back: 'This argument assumes that the budget will increase.' },
        { front: '長期滞在を前提として、部屋を探している。', reading: 'ちょうきたいざいをぜんていとして、へやをさがしている。', back: "I'm looking for a room on the assumption of a long stay." },
        { front: '返品しないことを前提とした割引です。', reading: 'へんぴんしないことをぜんていとしたわりびきです。', back: 'This discount is given on condition that the item is not returned.' },
        { front: '全員が賛成するという前提で話を進めるのは危険だ。', reading: 'ぜんいんがさんせいするというぜんていではなしをすすめるのはきけんだ。', back: 'It is risky to proceed on the assumption that everyone will agree.' },
        { front: '正社員としての採用を前提に、まず半年は試用期間だ。', reading: 'せいしゃいんとしてのさいようをぜんていに、まずはんとしはしようきかんだ。', back: "With full-time employment in view, there's first a six-month trial period." }
      ]
    },
    {
      key: 'n1c.sakai',
      kind: 'grammar',
      title: '～を境に・～を機に・～を限りに — from (that point) on',
      body: `Three noun + を compounds that mark a point in time where things change.

・を境に(して) — "from (that point) on, with X as the dividing line". Before and after are clearly different.
  あの事故を境に、彼は変わってしまった。 — "From that accident on, he was a changed man."
・を機に(して) — "taking (the occasion) as a chance". Someone uses an event as an opportunity to start something; like をきっかけに (N2 Grammar III) but more formal.
  定年を機に、田舎へ引っ越した。 — "On retiring, they took the chance to move to the countryside."
・を限りに — "as of, after (this) no more". The last time something happens; often announcements of an ending.
  今日を限りに、たばこをやめる。 — "As of today, I'm quitting smoking."
  今月を限りに閉店いたします。 — "We will close at the end of this month."

The three differ in focus: 境 is the dividing line itself, 機 is the opportunity it gives, 限り is the end point.`,
      cards: [
        { front: '十月を境に、急に寒くなった。', reading: 'じゅうがつをさかいに、きゅうにさむくなった。', back: 'From October on, it suddenly got cold.' },
        { front: 'その日を境にして、二人は口をきかなくなった。', reading: 'そのひをさかいにして、ふたりはくちをきかなくなった。', back: 'From that day on, the two stopped speaking to each other.' },
        { front: '入院を機に、生活習慣を見直した。', reading: 'にゅういんをきに、せいかつしゅうかんをみなおした。', back: 'Taking my hospital stay as a chance, I rethought my lifestyle.' },
        { front: '子供の誕生を機にして、家を買った。', reading: 'こどものたんじょうをきにして、いえをかった。', back: 'With the birth of our child, we took the chance to buy a house.' },
        { front: '彼女は今回の公演を限りに、引退する。', reading: 'かのじょはこんかいのこうえんをかぎりに、いんたいする。', back: 'She will retire after this performance.' },
        { front: '本日を限りに、このサービスは終了いたします。', reading: 'ほんじつをかぎりに、このサービスはしゅうりょういたします。', back: 'This service ends as of today.' }
      ]
    },
    {
      key: 'n1c.hete',
      kind: 'grammar',
      title: '～を経て — via, after going through',
      body: `経る (へる) means "to pass through". Noun + を経て means "via, through, after (going through)". It covers three things:

・A place passed through on the way: 香港を経て、ロンドンに着いた。 — "We reached London via Hong Kong."
・A period of time: 十年の歳月を経て、建物が完成した。 — "After ten years, the building was finally completed."
・Stages or procedures: 厳しい審査を経て、合格者が決まった。 — "The successful candidates were chosen after a rigorous screening."

It is formal and common in news, biographies and official writing, where a long or demanding process leads to a result. In speech, 通って / 経由で (for places) or 後で are more usual.

Compare を通じて (N2 Grammar III): を通じて is "through (a channel) / throughout (a period)". を経て stresses passing through stages, one after another, to reach an end point.`,
      cards: [
        { front: '大阪を経て、福岡に向かった。', reading: 'おおさかをへて、ふくおかにむかった。', back: 'We headed for Fukuoka via Osaka.' },
        { front: '長い議論を経て、ようやく法案が成立した。', reading: 'ながいぎろんをへて、ようやくほうあんがせいりつした。', back: 'After long debate, the bill finally passed.' },
        { front: '彼は助手を経て、教授になった。', reading: 'かれはじょしゅをへて、きょうじゅになった。', back: 'He became a professor after working as an assistant.' },
        { front: '二年の準備期間を経て、店をオープンした。', reading: 'にねんのじゅんびきかんをへて、みせをオープンした。', back: 'After two years of preparation, we opened the shop.' },
        { front: '数々の困難を経て、二人は結ばれた。', reading: 'かずかずのこんなんをへて、ふたりはむすばれた。', back: 'After many hardships, the two were finally united.' },
        { front: '面接を経て、最終的に三人が採用された。', reading: 'めんせつをへて、さいしゅうてきにさんにんがさいようされた。', back: 'After the interviews, three people were hired in the end.' }
      ]
    },
    {
      key: 'n1c.gurumi',
      kind: 'grammar',
      title: '～ぐるみ・～並み — whole, on a par with',
      body: `Two suffixes that attach to nouns.

・Noun + ぐるみ — "whole, including all of, the entire". Everyone or everything in a group takes part together.
  家族ぐるみの付き合い — "a friendship between whole families"
  町ぐるみで祭りを盛り上げた。 — "The whole town got behind the festival."
  It can be negative: 会社ぐるみの不正 — "fraud involving the whole company".
・Noun + 並み (なみ) — "on a par with, the same level as, average". The level is compared to a standard.
  彼の料理の腕はプロ並みだ。 — "His cooking is on a par with a professional's."
  今年の夏は例年並みの暑さだ。 — "This summer is about as hot as a normal year."
  Also in compounds: 家並み (a row of houses) and 月並み (commonplace).

Compare ごと (皮ごと食べる — "eat it, skin and all"): ごと means the whole thing, including a part you would normally leave out; ぐるみ means everyone in a group together.`,
      cards: [
        { front: 'あの家とは、家族ぐるみで仲がいい。', reading: 'あのいえとは、かぞくぐるみでなかがいい。', back: 'Our two families are close friends, all of us.' },
        { front: '地域ぐるみで、子供たちを見守っている。', reading: 'ちいきぐるみで、こどもたちをみまもっている。', back: 'The whole community keeps an eye on the children.' },
        { front: '組織ぐるみの犯罪が明らかになった。', reading: 'そしきぐるみのはんざいがあきらかになった。', back: 'A crime involving the entire organization came to light.' },
        { front: '彼女の英語はネイティブ並みだ。', reading: 'かのじょのえいごはネイティブなみだ。', back: 'Her English is on a par with a native speaker\'s.' },
        { front: '今年の米の収穫は、平年並みだった。', reading: 'ことしのこめのしゅうかくは、へいねんなみだった。', back: "This year's rice harvest was about average." },
        { front: '人並みの生活ができれば、それで十分だ。', reading: 'ひとなみのせいかつができれば、それでじゅうぶんだ。', back: "If I can live an ordinary life like everyone else, that's enough." }
      ]
    },
    {
      key: 'n1c.biru-buru',
      kind: 'grammar',
      title: '～びる・～ぶる・～ぶり — seeming, acting, manner',
      body: `Three suffixes that build words from nouns and adjective stems.

・～びる / ～びた — "to seem, to take on the air of". The quality shows naturally.
  大人びる (seem grown-up), 古びる (look old), 田舎びた (rustic), 鄙びた (rural, quaint)
  あの子は年の割に大人びている。 — "That child seems grown-up for their age."
・～ぶる / ～ぶって / ～ぶった — "to act, to put on airs of". The quality is a pretence, and it is critical.
  偉ぶる (act important), 上品ぶる (affect refinement), いい子ぶる (play the good child), 知ったかぶり (pretending to know)
  彼は偉ぶった態度で話す。 — "He talks with a self-important air."
・～ぶり — two meanings: "manner, way of" (仕事ぶり — one's way of working, 話しぶり) and, after a time span, "for the first time in" (三年ぶりに会った — "We met for the first time in three years").

Keep びる (it really seems so) and ぶる (pretending) apart: 大人びる is a compliment; 大人ぶる is a jab.`,
      cards: [
        { front: '彼女は中学生とは思えないほど大人びている。', reading: 'かのじょはちゅうがくせいとはおもえないほどおとなびている。', back: 'She seems so grown-up you would never think she was in middle school.' },
        { front: '古びた旅館に泊まった。', reading: 'ふるびたりょかんにとまった。', back: 'We stayed at a time-worn inn.' },
        { front: '先生の前でだけ、いい子ぶるのはやめなさい。', reading: 'せんせいのまえでだけ、いいこぶるのはやめなさい。', back: 'Stop playing the good child only when the teacher is around.' },
        { front: '知ったかぶりをすると、後で困るよ。', reading: 'しったかぶりをすると、あとでこまるよ。', back: "If you pretend to know, you'll be in trouble later." },
        { front: '彼の真面目な仕事ぶりは、皆に評価されている。', reading: 'かれのまじめなしごとぶりは、みなにひょうかされている。', back: 'His diligent way of working is appreciated by everyone.' },
        { front: '五年ぶりに故郷に帰った。', reading: 'ごねんぶりにこきょうにかえった。', back: 'I went back to my hometown for the first time in five years.' }
      ]
    },
    {
      key: 'n1c.taru',
      kind: 'grammar',
      title: '～に足る・～に堪える・～に堪えない — worthy of, worth, unbearable',
      body: `Three literary patterns about whether something deserves or bears an action.

・Verb dictionary form / noun + に足る — "worthy of, sufficient for". Something is good enough to deserve X.
  彼は信頼するに足る人物だ。 — "He is a person worthy of trust."
  満足に足る結果 — "a satisfactory result"
・Verb dictionary form + に堪える — "worth (doing), able to withstand". Often 鑑賞に堪える (worth viewing), 読むに堪える (worth reading).
  この作品は大人の鑑賞にも堪える。 — "This work is worth watching even for adults."
・Verb dictionary form / noun + に堪えない — two senses: "too awful to (watch, hear)" (見るに堪えない — unbearable to look at), and in set formal phrases "I cannot express enough" (感謝に堪えない — "I am deeply grateful").
  彼の発言は、聞くに堪えない。 — "His remarks are too awful to listen to."

The plain verb 耐える (to endure, withstand) uses the same reading: 痛みに耐える — "endure pain", 高温に耐える — "withstand high temperatures".`,
      cards: [
        { front: 'これは議論するに足る問題だ。', reading: 'これはぎろんするにたるもんだいだ。', back: 'This is a question worth discussing.' },
        { front: '彼の話は、信じるに足る証拠がない。', reading: 'かれのはなしは、しんじるにたるしょうこがない。', back: 'There is no evidence to make his story believable.' },
        { front: 'この小説は、何度読んでも読むに堪える。', reading: 'このしょうせつは、なんどよんでもよむにたえる。', back: 'This novel is worth reading no matter how many times you read it.' },
        { front: '事故現場は、見るに堪えない光景だった。', reading: 'じこげんばは、みるにたえないこうけいだった。', back: 'The accident scene was too awful to look at.' },
        { front: '皆様のご支援には、感謝に堪えません。', reading: 'みなさまのごしえんには、かんしゃにたえません。', back: 'I cannot thank you enough for your support.' },
        { front: 'この映画は子供向けだが、大人の鑑賞にも堪える。', reading: 'このえいがはこどもむけだが、おとなのかんしょうにもたえる。', back: "This film is aimed at children, but it is worth an adult's viewing too." }
      ]
    },
    {
      key: 'n1c.sashitsukae',
      kind: 'grammar',
      title: '～て差し支えない・～に越したことはない・～に難くない — evaluations',
      body: `Three formal set expressions of judgment.

・Verb て-form + (も)差し支えない — "it is all right to, there's no problem with". A formal てもいい, common in business.
  明日の提出で差し支えありません。 — "Submitting it tomorrow will be fine."
  ここに座っても差し支えないですか。 — "Would it be all right if I sat here?"
・Plain form + に越したことはない — "nothing is better than, it's best to". Common sense advice: ideally, X.
  安いに越したことはない。 — "Cheaper is always better."
  用心するに越したことはない。 — "It never hurts to be careful."
・Verb dictionary form / noun + に難くない — "it is not difficult to (imagine, understand)". Literary; mostly with 想像、理解、察する.
  彼女の苦労は想像に難くない。 — "It is not hard to imagine her hardship."

Each replaces a plainer phrase: てもいい, ～ほうがいい, 簡単に想像できる.`,
      cards: [
        { front: 'お支払いは来月でも差し支えありません。', reading: 'おしはらいはらいげつでもさしつかえありません。', back: 'Payment next month will also be fine.' },
        { front: 'ご都合が悪ければ、欠席されても差し支えありません。', reading: 'ごつごうがわるければ、けっせきされてもさしつかえありません。', back: 'If it is inconvenient, it is perfectly all right to be absent.' },
        { front: '健康のためには、早寝早起きに越したことはない。', reading: 'けんこうのためには、はやねはやおきにこしたことはない。', back: 'For your health, nothing beats early to bed and early to rise.' },
        { front: '準備は早めにするに越したことはない。', reading: 'じゅんびははやめにするにこしたことはない。', back: "It's always best to prepare early." },
        { front: '突然家族を失った彼の悲しみは、察するに難くない。', reading: 'とつぜんかぞくをうしなったかれのかなしみは、さっするにかたくない。', back: 'It is not hard to understand the grief of a man who suddenly lost his family.' },
        { front: 'この計画が失敗することは、予想に難くない。', reading: 'このけいかくがしっぱいすることは、よそうにかたくない。', back: 'It is easy to predict that this plan will fail.' }
      ]
    }
  ]
}
