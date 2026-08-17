import type { SeedCourse } from './japaneseSeed'

// Wave-4 seeded courses (2026-08-15): the set phrases you meet constantly in
// anime and manga, and the vocabulary of visual novels, games and Japanese
// net culture. Kept in their own file so japaneseSeed.ts (4k lines) stops
// growing. Both are vocab-only courses that enter the same SRS as every other
// pack; fronts must not collide with any existing seeded course
// (tests/japaneseSeed.test.ts enforces it across the whole catalog).

export const SET_PHRASES_COURSE: SeedCourse = {
  title: 'Anime & Manga Set Phrases',
  description:
    'The stock lines you hear in every episode — greetings at the door, apologies, battle talk, reactions — with the register that decides who may say them to whom.',
  level: 'N5–N4',
  difficulty: 5,
  lessons: [
    {
      kind: 'vocab',
      title: 'Coming and going: the doorway lines',
      cards: [
        {
          front: '行ってきます',
          reading: 'いってきます',
          back: "I'm off — back later",
          pos: 'set phrase',
          notes:
            'Said by whoever is LEAVING the house, to whoever stays behind. Skipping it in a family scene reads as a slammed door. Blunt clip: 行ってくる (male); 行ってきまーす is the cheerful one.',
          exampleJp: '行ってきます、母さん。',
          exampleReading: 'いってきます、かあさん。',
          exampleEn: "I'm off, Mum."
        },
        {
          front: '行ってらっしゃい',
          reading: 'いってらっしゃい',
          back: 'off you go — have a good one',
          pos: 'set phrase',
          notes:
            'The fixed reply to 行ってきます, from the person staying: a mother at the door, a landlady, a shopkeeper to a regular. Warm by default; only delivery makes it sarcastic.',
          exampleJp: '行ってらっしゃい、気をつけてね。',
          exampleReading: 'いってらっしゃい、きをつけてね。',
          exampleEn: 'Off you go, be careful.'
        },
        {
          front: 'ただいま帰りました',
          reading: 'ただいまかえりました',
          back: 'I have returned',
          pos: 'set phrase',
          notes:
            'The full, formal form of ただいま — a soldier reporting in, a servant to the household, a very correct child. Ordinary family scenes clip it to ただいま.',
          exampleJp: 'ただいま帰りました、お館様。',
          exampleReading: 'ただいまかえりました、おやかたさま。',
          exampleEn: 'I have returned, my lord.'
        },
        {
          front: 'おかえりなさい',
          reading: 'おかえりなさい',
          back: 'welcome home',
          pos: 'set phrase',
          notes:
            'The answer to ただいま, never said about yourself. おかえり (clipped) between family and close friends; the full おかえりなさい from someone being proper — a maid to her employer, a wife in older fiction.',
          exampleJp: 'おかえりなさい、遅かったね。',
          exampleReading: 'おかえりなさい、おそかったね。',
          exampleEn: "Welcome back — you're late."
        },
        {
          front: 'お邪魔しました',
          reading: 'おじゃましました',
          back: 'thanks for having me',
          pos: 'set phrase',
          notes:
            'Said on the way OUT of someone else\'s home; お邪魔します is the way in. Polite without being stiff — a classmate leaving a friend\'s house says it. Literally "I have intruded", so never in your own house.',
          exampleJp: 'お邪魔しました。また来ます。',
          exampleReading: 'おじゃましました。またきます。',
          exampleEn: "Thanks for having me. I'll come again."
        },
        {
          front: '失礼します',
          reading: 'しつれいします',
          back: 'excuse me (entering or leaving)',
          pos: 'set phrase',
          notes:
            'The all-purpose polite doorway line: knocking before you enter a teacher or boss\'s room, and again on the way out. Also ends a phone call. Neutral-polite, aimed at an equal or above — never at a younger sibling.',
          exampleJp: '失礼します。先生、よろしいですか。',
          exampleReading: 'しつれいします。せんせい、よろしいですか。',
          exampleEn: 'Excuse me. Sir, do you have a moment?'
        },
        {
          front: 'いらっしゃいませ',
          reading: 'いらっしゃいませ',
          back: 'welcome (shop staff to customer)',
          pos: 'set phrase',
          notes:
            'Staff to customer, one direction only — shop, restaurant, inn. A character who greets a friend with it is playing shopkeeper. The clipped いらっしゃい is a market stall, or a host waving a guest inside.',
          exampleJp: 'いらっしゃいませ、何名様ですか。',
          exampleReading: 'いらっしゃいませ、なんめいさまですか。',
          exampleEn: 'Welcome. How many in your party?'
        },
        {
          front: 'ごめんください',
          reading: 'ごめんください',
          back: 'hello? anyone home?',
          pos: 'set phrase',
          notes:
            'Called at a front door or into an empty shop before stepping in. Old-fashioned and well-mannered — marks a visitor who was raised properly, or a rural setting. Nothing to do with apologising, despite the ごめん.',
          exampleJp: 'ごめんください。誰かいませんか。',
          exampleReading: 'ごめんください。だれかいませんか。',
          exampleEn: 'Hello? Is anyone in?'
        },
        {
          front: 'どちら様ですか',
          reading: 'どちらさまですか',
          back: 'and you are?',
          pos: 'expression',
          notes:
            'Polite "who is it?" at a door or on the phone: keeps a stranger at arm\'s length while staying correct, with 様 doing the work. The blunt versions are 誰だ (suspicious) and お前は誰だ (openly hostile).',
          exampleJp: '失礼ですが、どちら様ですか。',
          exampleReading: 'しつれいですが、どちらさまですか。',
          exampleEn: 'Sorry, but who are you?'
        },
        {
          front: 'お久しぶりです',
          reading: 'おひさしぶりです',
          back: "it's been a long time",
          pos: 'set phrase',
          notes:
            'To someone unseen for months, at polite distance — a colleague, a former teacher. Drops to 久しぶり between friends; ご無沙汰しております is the business-grade version, which quietly admits the silence was your fault.',
          exampleJp: 'お久しぶりです。お元気でしたか。',
          exampleReading: 'おひさしぶりです。おげんきでしたか。',
          exampleEn: "It's been a while. Have you been well?"
        },
        {
          front: '出かけてくる',
          reading: 'でかけてくる',
          back: "I'm heading out (and coming back)",
          pos: 'expression',
          notes:
            'An announcement to housemates rather than a greeting, and brusque in the bare form — a teenager throws it over their shoulder. Politer: 出かけてきます. The てくる is the promise to return; plain 出かける sounds like leaving for good.',
          exampleJp: 'ちょっと出かけてくる。',
          exampleReading: 'ちょっとでかけてくる。',
          exampleEn: "I'm popping out for a bit."
        },
        {
          front: '帰ったぞ',
          reading: 'かえったぞ',
          back: "I'm back (blunt)",
          pos: 'expression',
          notes:
            'A gruff stand-in for ただいま — a father, an older brother, a delinquent. The ぞ announces rather than greets. Polite characters and most women use ただいま; 帰ったよ is the softer middle ground.',
          exampleJp: 'おい、帰ったぞ。飯はまだか。',
          exampleReading: 'おい、かえったぞ。めしはまだか。',
          exampleEn: 'Hey, I am back. Is dinner ready?'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Meals, work and thanks',
      cards: [
        {
          front: '召し上がれ',
          reading: 'めしあがれ',
          back: 'dig in',
          pos: 'set phrase',
          notes:
            'Said BY whoever cooked or served, to the eater — a mother, a girlfriend presenting a bento. It is the honorific 召し上がる in command form, so it lands warm rather than bossy. The eater answers いただきます.',
          exampleJp: 'どうぞ、召し上がれ。',
          exampleReading: 'どうぞ、めしあがれ。',
          exampleEn: 'Go on, dig in.'
        },
        {
          front: 'ごちそうさま',
          reading: 'ごちそうさま',
          back: 'that was great, thanks',
          pos: 'set phrase',
          notes:
            'The casual close of a meal, aimed at whoever fed you; ごちそうさまでした adds a layer of politeness. Also thrown at a couple being sweet in public — "thanks for the show".',
          exampleJp: 'ごちそうさま、うまかった。',
          exampleReading: 'ごちそうさま、うまかった。',
          exampleEn: 'Thanks, that was delicious.'
        },
        {
          front: 'お粗末様でした',
          reading: 'おそまつさまでした',
          back: 'it was nothing special',
          pos: 'set phrase',
          notes:
            'The set reply to ごちそうさま, from the cook: literally "it was crude fare". Ritual modesty — the food may have been superb. Older or formal speakers; a young character using it is being deliberately proper.',
          exampleJp: 'お粗末様でした。おかわりは。',
          exampleReading: 'おそまつさまでした。おかわりは。',
          exampleEn: 'Glad you liked it. Want seconds?'
        },
        {
          front: '冷めないうちに',
          reading: 'さめないうちに',
          back: 'before it gets cold',
          pos: 'expression',
          notes:
            'The nudge that gets a guest eating — host to guest, mother to child. Fussing and affectionate. The full 冷めないうちに食べなさい is usually left hanging at うちに.',
          exampleJp: '冷めないうちにどうぞ。',
          exampleReading: 'さめないうちにどうぞ。',
          exampleEn: 'Please, before it goes cold.'
        },
        {
          front: 'お疲れ様です',
          reading: 'おつかれさまです',
          back: 'thanks for your work',
          pos: 'set phrase',
          notes:
            'The workplace all-purpose greeting: hello, goodbye and thank-you at once, and safe in every direction including junior to senior. Contrast ご苦労様, which only travels downward. Clipped to お疲れ among equals.',
          exampleJp: 'お疲れ様です。今日はここまでにしましょう。',
          exampleReading: 'おつかれさまです。きょうはここまでにしましょう。',
          exampleEn: "Good work. Let's call it a day."
        },
        {
          front: 'ご苦労だった',
          reading: 'ごくろうだった',
          back: 'you have done well',
          pos: 'expression',
          notes:
            'Downward only — a lord to a retainer, a boss to a subordinate, a captain to his squad. Said upward it is an insult, which is exactly why arrogant characters aim it at people who outrank them.',
          exampleJp: 'ご苦労だった。下がってよい。',
          exampleReading: 'ごくろうだった。さがってよい。',
          exampleEn: 'Well done. You may withdraw.'
        },
        {
          front: '恐れ入ります',
          reading: 'おそれいります',
          back: 'much obliged; I hate to trouble you',
          pos: 'set phrase',
          notes:
            'Humble-polite, business grade. Does double duty: thanking a superior for a favour, and softening an imposition before you ask. A butler, a shop manager, an underling in a suit. Out of place between friends.',
          exampleJp: '恐れ入りますが、こちらへどうぞ。',
          exampleReading: 'おそれいりますが、こちらへどうぞ。',
          exampleEn: 'Sorry to trouble you — this way, please.'
        },
        {
          front: 'おかげさまで',
          reading: 'おかげさまで',
          back: 'thanks to you, it went well',
          pos: 'set phrase',
          notes:
            'The modest answer to "how have you been?" — it credits the listener, or fate, for your good fortune even when they did nothing at all. Adults say it; teenagers do not.',
          exampleJp: 'おかげさまで、無事に合格しました。',
          exampleReading: 'おかげさまで、ぶじにごうかくしました。',
          exampleEn: 'Thanks to you, I passed.'
        },
        {
          front: 'どういたしまして',
          reading: 'どういたしまして',
          back: 'not at all',
          pos: 'set phrase',
          notes:
            'The textbook answer to ありがとう, but stiffer than it looks — adults more often say いえいえ or とんでもないです. In fiction it marks a polite child, a service role, or someone being pointedly formal.',
          exampleJp: 'どういたしまして。気にしないで。',
          exampleReading: 'どういたしまして。きにしないで。',
          exampleEn: "Not at all. Don't worry about it."
        },
        {
          front: '助かった',
          reading: 'たすかった',
          back: 'you saved me; that helps a lot',
          pos: 'expression',
          notes:
            'Plain-form thanks between equals or downward — to the friend who covered for you. Warmer and more male-flavoured than ありがとう. 助かります is the polite version aimed at a superior.',
          exampleJp: '悪い、助かった。',
          exampleReading: 'わるい、たすかった。',
          exampleEn: 'Sorry about that — you saved me.'
        },
        {
          front: '礼を言う',
          reading: 'れいをいう',
          back: 'you have my thanks',
          pos: 'expression',
          notes:
            'A declaration rather than a thank-you: 礼を言うぞ comes from a proud character who finds plain ありがとう beneath them — a knight, a demon lord, a tsundere. お礼を言います is the ordinary polite form.',
          exampleJp: '助けてもらった礼を言う。',
          exampleReading: 'たすけてもらったれいをいう。',
          exampleEn: 'You have my thanks for saving me.'
        },
        {
          front: 'かたじけない',
          reading: 'かたじけない',
          back: 'I am in your debt (archaic)',
          pos: 'expression',
          notes:
            'Samurai-era thanks, delivered with a bow of the head. Still used by period characters, stoic swordsmen and anyone written as old-fashioned; in a modern setting it is a deliberate joke.',
          exampleJp: 'かたじけない、恩に着る。',
          exampleReading: 'かたじけない、おんにきる。',
          exampleEn: 'You have my thanks — I am in your debt.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Apologies, excuses and taking the blame',
      cards: [
        {
          front: '申し訳ありません',
          reading: 'もうしわけありません',
          back: 'I am truly sorry',
          pos: 'set phrase',
          notes:
            'The business-grade apology: staff to customer, subordinate to boss, company president at the bowing press conference. 申し訳ございません is one rung higher again. Between friends it puts distance in.',
          exampleJp: '申し訳ありません、私のミスです。',
          exampleReading: 'もうしわけありません、わたしのミスです。',
          exampleEn: "I'm very sorry — this is my mistake."
        },
        {
          front: '申し訳ない',
          reading: 'もうしわけない',
          back: 'I feel awful about this',
          pos: 'expression',
          notes:
            'Plain form, so it reads as real regret rather than protocol — a man to his friend, a boss admitting he asked too much. Usually about a burden you are imposing, not a rule you broke.',
          exampleJp: '迷惑をかけて申し訳ない。',
          exampleReading: 'めいわくをかけてもうしわけない。',
          exampleEn: "I'm sorry for the trouble I've caused."
        },
        {
          front: 'すまない',
          reading: 'すまない',
          back: 'sorry (blunt, male)',
          pos: 'expression',
          notes:
            'Masculine plain apology, and also "thanks for going to the trouble" — an older brother, a captain to his crew. Warmer than it looks: it admits fault without ceremony. すまん is the gruff clip.',
          exampleJp: 'すまない、待たせたな。',
          exampleReading: 'すまない、またせたな。',
          exampleEn: 'Sorry — I kept you waiting.'
        },
        {
          front: '悪かった',
          reading: 'わるかった',
          back: 'my bad',
          pos: 'expression',
          notes:
            'An admission of fault between equals, usually male and slightly grudging — the apology a rival can manage. Present-tense 悪い is the lighter "sorry" tossed off before asking a favour. Too casual for a superior.',
          exampleJp: 'さっきは言い過ぎた。悪かった。',
          exampleReading: 'さっきはいいすぎた。わるかった。',
          exampleEn: 'I went too far earlier. My bad.'
        },
        {
          front: '失礼しました',
          reading: 'しつれいしました',
          back: 'my apologies',
          pos: 'set phrase',
          notes:
            'For a breach of manners rather than real damage — wrong room, interrupting, an ill-judged remark. Polite and cool: it closes the matter instead of grovelling. Service staff use it constantly.',
          exampleJp: '人違いでした。失礼しました。',
          exampleReading: 'ひとちがいでした。しつれいしました。',
          exampleEn: 'I mistook you for someone else. My apologies.'
        },
        {
          front: '勘弁してくれ',
          reading: 'かんべんしてくれ',
          back: 'give me a break; let me off',
          pos: 'expression',
          notes:
            'Begging to be spared — a man pleading with a creditor, or comic despair at more work landing on his desk. Rough-plain, so equals or below; 勘弁してください is the pleading polite version.',
          exampleJp: 'それだけは勘弁してくれ。',
          exampleReading: 'それだけはかんべんしてくれ。',
          exampleEn: 'Anything but that, please.'
        },
        {
          front: '許してくれ',
          reading: 'ゆるしてくれ',
          back: 'forgive me',
          pos: 'expression',
          notes:
            'Heavier than an apology — used when the damage cannot be undone, or by a villain begging for his life. Male-plain; 許して is softer and can even be flirtatious, 許してください formal.',
          exampleJp: '頼む、許してくれ。',
          exampleReading: 'たのむ、ゆるしてくれ。',
          exampleEn: 'Please, forgive me.'
        },
        {
          front: 'お詫びします',
          reading: 'おわびします',
          back: 'I offer my apologies',
          pos: 'set phrase',
          notes:
            'Formal, public and written — press statements, letters, an executive bowing on stage. お詫び申し上げます is the full ceremonial version. In dialogue it signals an institution speaking, not a person.',
          exampleJp: '心よりお詫びします。',
          exampleReading: 'こころよりおわびします。',
          exampleEn: 'I apologise from the bottom of my heart.'
        },
        {
          front: '言い訳するな',
          reading: 'いいわけするな',
          back: 'no excuses',
          pos: 'expression',
          notes:
            'Snapped downward — coach to player, boss to subordinate, father to son. The bare な command makes it a rebuke rather than advice. 言い訳しないで is the softer, more feminine version.',
          exampleJp: '言い訳するな。結果を出せ。',
          exampleReading: 'いいわけするな。けっかをだせ。',
          exampleEn: 'No excuses. Get results.'
        },
        {
          front: 'わざとじゃない',
          reading: 'わざとじゃない',
          back: "I didn't do it on purpose",
          pos: 'expression',
          notes:
            'The flustered defence, and the child\'s one — casual plain form, said mid-panic. わざとではありません is the stiff version. Usually followed by 本当に as the speaker realises nobody believes them.',
          exampleJp: '違う、わざとじゃない。',
          exampleReading: 'ちがう、わざとじゃない。',
          exampleEn: "No — I didn't mean to."
        },
        {
          front: '二度としません',
          reading: 'にどとしません',
          back: 'it will not happen again',
          pos: 'expression',
          notes:
            'The promise attached to an apology aimed upward — student to teacher, employee to boss. Plain 二度としない is a vow to yourself, or a defiant one. 二度と needs a negative to land.',
          exampleJp: 'すみません、二度としません。',
          exampleReading: 'すみません、にどとしません。',
          exampleEn: "I'm sorry. It won't happen again."
        },
        {
          front: '反省している',
          reading: 'はんせいしている',
          back: 'I have thought about what I did',
          pos: 'expression',
          notes:
            'The phrase authority expects to hear — schools, workplaces and courtrooms all want this word. Delivered flatly it sounds hollow, which fiction exploits: 全然反省してない is the standard comeback.',
          exampleJp: '本当に反省しているのか。',
          exampleReading: 'ほんとうにはんせいしているのか。',
          exampleEn: 'Are you actually sorry?'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Battle talk and resolve',
      cards: [
        {
          front: '覚悟しろ',
          reading: 'かくごしろ',
          back: 'prepare yourself',
          pos: 'expression',
          notes:
            'Shouted at an enemy before the finishing move: you are about to die, brace for it. Command form, pure confrontation — never aimed at a superior outside a duel. 覚悟はいいか asks the same thing more coldly.',
          exampleJp: '逃げられんぞ。覚悟しろ。',
          exampleReading: 'にげられんぞ。かくごしろ。',
          exampleEn: 'There is no escape. Prepare yourself.'
        },
        {
          front: '任せろ',
          reading: 'まかせろ',
          back: 'leave it to me',
          pos: 'expression',
          notes:
            'Male-plain confidence thrown to a teammate mid-fight. 任せて is the softer unisex version, 任せてください the polite one, 俺に任せろ the full boast.',
          exampleJp: 'ここは任せろ。先へ行け。',
          exampleReading: 'ここはまかせろ。さきへいけ。',
          exampleEn: 'Leave this to me. Go on ahead.'
        },
        {
          front: '容赦しない',
          reading: 'ようしゃしない',
          back: 'no mercy; I will not hold back',
          pos: 'expression',
          notes:
            'A warning delivered calmly by the stronger party — the moment a fight stops being a spar. It works in polite register too (容赦しません), which is more chilling rather than less.',
          exampleJp: '次は容赦しない。',
          exampleReading: 'つぎはようしゃしない。',
          exampleEn: 'Next time I will not go easy.'
        },
        {
          front: 'やってやる',
          reading: 'やってやる',
          back: 'just watch me',
          pos: 'expression',
          notes:
            'Defiance aimed at a challenge rather than a person — the underdog before the rematch. The てやる ending adds spite or triumph: やってやるぞ psyches the speaker up, やってやったぜ celebrates afterwards.',
          exampleJp: '見てろ、やってやる。',
          exampleReading: 'みてろ、やってやる。',
          exampleEn: 'Just watch — I will do it.'
        },
        {
          front: 'かかってこい',
          reading: 'かかってこい',
          back: 'come at me',
          pos: 'expression',
          notes:
            'An invitation to attack from someone certain they will win — a martial artist, a delinquent, a boss enemy. Rough command form; かかってきなさい turns it into a teacher\'s challenge.',
          exampleJp: '全員でかかってこい。',
          exampleReading: 'ぜんいんでかかってこい。',
          exampleEn: 'All of you, come at me at once.'
        },
        {
          front: '邪魔をするな',
          reading: 'じゃまをするな',
          back: 'stay out of my way',
          pos: 'expression',
          notes:
            'Snarled at a bystander or a weaker opponent. The clipped 邪魔だ is ruder still. Even the polite version (お邪魔はしないでください) lands as a threat, because nobody says it kindly.',
          exampleJp: 'これは俺の戦いだ。邪魔をするな。',
          exampleReading: 'これはおれのたたかいだ。じゃまをするな。',
          exampleEn: 'This is my fight. Stay out of it.'
        },
        {
          front: '逃がさない',
          reading: 'にがさない',
          back: 'you are not getting away',
          pos: 'expression',
          notes:
            'Pursuer to prey — a hunter, a detective, a jealous rival. Cold rather than loud. 逃がすか is the same idea spat out as a rhetorical question mid-chase.',
          exampleJp: '今度は逃がさない。',
          exampleReading: 'こんどはにがさない。',
          exampleEn: 'You will not escape this time.'
        },
        {
          front: '諦めるな',
          reading: 'あきらめるな',
          back: "don't give up",
          pos: 'expression',
          notes:
            'Shouted at an ally who is about to fold — a teammate, a mentor, the hero to himself. The bare command is urgent rather than rude. 諦めないで is the softer version, typically female or pleading.',
          exampleJp: 'まだ終わってない。諦めるな。',
          exampleReading: 'まだおわってない。あきらめるな。',
          exampleEn: "It's not over yet. Don't give up."
        },
        {
          front: '動くな',
          reading: 'うごくな',
          back: "don't move",
          pos: 'expression',
          notes:
            'The line behind a drawn weapon — police, soldier, hostage-taker. The bare な expects instant obedience. A doctor holding a patient still says 動かないで instead.',
          exampleJp: '動くな、手を上げろ。',
          exampleReading: 'うごくな、てをあげろ。',
          exampleEn: "Don't move. Hands up."
        },
        {
          front: '決着をつける',
          reading: 'けっちゃくをつける',
          back: 'settle this once and for all',
          pos: 'expression',
          notes:
            'For a rivalry with history behind it, not a random scuffle — the rematch announcement. Neutral in register, so the hero and the courteous villain can both say it; often as 決着をつけようぜ.',
          exampleJp: '今日で決着をつける。',
          exampleReading: 'きょうでけっちゃくをつける。',
          exampleEn: 'Today we settle this.'
        },
        {
          front: 'そこまでだ',
          reading: 'そこまでだ',
          back: 'that is far enough',
          pos: 'expression',
          notes:
            'Said by whoever has just taken control of the scene — the rescuer arriving, the referee stopping a match, the captain cutting off a beating. Calm and final; the drama is in how quietly it comes out.',
          exampleJp: 'そこまでだ。剣を下ろせ。',
          exampleReading: 'そこまでだ。けんをおろせ。',
          exampleEn: 'That is far enough. Lower your sword.'
        },
        {
          front: '手を出すな',
          reading: 'てをだすな',
          back: "don't lay a finger on them",
          pos: 'expression',
          notes:
            'A protective order — to an ally who wants to join in, or a warning to the enemy about a third party. 手を出すんじゃねえ is the street version, 手出しは無用 the period-drama one.',
          exampleJp: 'あいつには手を出すな。',
          exampleReading: 'あいつにはてをだすな。',
          exampleEn: "Don't lay a hand on him."
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Reactions and interjections',
      cards: [
        {
          front: 'さすがに',
          reading: 'さすがに',
          back: 'even so; admittedly',
          pos: 'adverb',
          notes:
            'Not the praising さすが. This one concedes a limit — "even I cannot do that". Neutral in register and just as common in narration as in grumbling.',
          exampleJp: 'これはさすがに無理だ。',
          exampleReading: 'これはさすがにむりだ。',
          exampleEn: 'Even I cannot manage this one.'
        },
        {
          front: 'まったく',
          reading: 'まったく',
          back: 'honestly; good grief',
          pos: 'interjection',
          notes:
            'A sigh with words in it, aimed at someone being a nuisance — the exasperated friend, the long-suffering teacher. Fine sideways or downward; at a superior it is insubordination.',
          exampleJp: 'まったく、世話が焼けるな。',
          exampleReading: 'まったく、せわがやけるな。',
          exampleEn: 'Honestly, you are a handful.'
        },
        {
          front: 'とんでもない',
          reading: 'とんでもない',
          back: 'no way; not at all',
          pos: 'expression',
          notes:
            'Two lives: refusing an outrageous suggestion, and modestly deflecting praise or thanks (とんでもないです). Polite speakers reach for the second far more often than for どういたしまして.',
          exampleJp: 'とんでもない、私は何もしていません。',
          exampleReading: 'とんでもない、わたしはなにもしていません。',
          exampleEn: 'Not at all — I did nothing.'
        },
        {
          front: 'しまった',
          reading: 'しまった',
          back: 'damn, I blew it',
          pos: 'interjection',
          notes:
            'A blurt aimed at nobody, the instant a mistake registers — the forgotten appointment, the trap you just walked into. Unisex and safe in any register, because it is an involuntary noise.',
          exampleJp: 'しまった、財布を忘れた。',
          exampleReading: 'しまった、さいふをわすれた。',
          exampleEn: 'Damn — I left my wallet behind.'
        },
        {
          front: '参ったな',
          reading: 'まいったな',
          back: 'well, this is a problem',
          pos: 'interjection',
          notes:
            'Rueful, scratching-the-back-of-the-head trouble. Bare 参った is also "I surrender" in a fight or an argument — the loser\'s word, usually said with a wry grin rather than shame.',
          exampleJp: '参ったな、鍵がない。',
          exampleReading: 'まいったな、かぎがない。',
          exampleEn: 'Great — my keys are gone.'
        },
        {
          front: 'なんてこった',
          reading: 'なんてこった',
          back: 'what a mess',
          pos: 'interjection',
          notes:
            'A slurred なんということだ, so it reads male and slightly theatrical — the tough guy surveying the wreckage. Translates naturally as "oh, hell".',
          exampleJp: 'なんてこった、全部壊れてる。',
          exampleReading: 'なんてこった、ぜんぶこわれてる。',
          exampleEn: 'Oh hell — it is all destroyed.'
        },
        {
          front: '信じられない',
          reading: 'しんじられない',
          back: "I can't believe it",
          pos: 'expression',
          notes:
            'Shock in either direction: awe at good news, disgust at bad behaviour. Female speakers use it often as reproach, snapped at someone who has just said something appalling.',
          exampleJp: 'こんな結果、信じられない。',
          exampleReading: 'こんなけっか、しんじられない。',
          exampleEn: "I can't believe this result."
        },
        {
          front: 'どうりで',
          reading: 'どうりで',
          back: 'no wonder',
          pos: 'adverb',
          notes:
            'The click of a penny dropping, said aloud to whoever just explained. Neutral register. Normally completes as どうりで〜わけだ, and often trails off unfinished once the point is obvious.',
          exampleJp: 'どうりで静かなわけだ。',
          exampleReading: 'どうりでしずかなわけだ。',
          exampleEn: 'No wonder it is so quiet.'
        },
        {
          front: '呆れた',
          reading: 'あきれた',
          back: 'I am speechless',
          pos: 'interjection',
          notes:
            'Disgusted amazement at someone\'s behaviour rather than at an event — the friend who has stopped being angry and is simply done. Slightly feminine standing alone; 呆れて物も言えない is the full version.',
          exampleJp: '呆れた。本当に一人で行ったの。',
          exampleReading: 'あきれた。ほんとうにひとりでいったの。',
          exampleEn: 'Unbelievable. You really went alone?'
        },
        {
          front: '嘘だろ',
          reading: 'うそだろ',
          back: 'you are kidding',
          pos: 'interjection',
          notes:
            'Male-plain disbelief at something happening in front of you, usually bad. 嘘でしょ is the feminine counterpart. 嘘つき is a real accusation, not this reflex.',
          exampleJp: '嘘だろ、あいつが負けた。',
          exampleReading: 'うそだろ、あいつがまけた。',
          exampleEn: 'You are kidding — he lost?'
        },
        {
          front: '気のせいか',
          reading: 'きのせいか',
          back: 'maybe I am imagining it',
          pos: 'expression',
          notes:
            'A muttered aside to the reader as much as to anyone present — the horror-scene staple just before something moves. 気のせいだよ is the reassurance a friend offers, usually wrongly.',
          exampleJp: '気のせいか、誰かに見られている。',
          exampleReading: 'きのせいか、だれかにみられている。',
          exampleEn: 'Maybe it is nothing, but I feel watched.'
        },
        {
          front: 'ありえない',
          reading: 'ありえない',
          back: 'impossible; no way',
          pos: 'expression',
          notes:
            'Flat refusal to accept what you are seeing, or a verdict on someone\'s behaviour. Very common in casual speech, especially younger and female; ありえません is the polite, colder form.',
          exampleJp: 'そんなこと、ありえない。',
          exampleReading: 'そんなこと、ありえない。',
          exampleEn: 'That is simply impossible.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Refusals and telling someone off',
      cards: [
        {
          front: '冗談じゃない',
          reading: 'じょうだんじゃない',
          back: 'you cannot be serious',
          pos: 'expression',
          notes:
            'Not "that was not a joke" — it is angry refusal of something unreasonable. Sideways or downward; よ or ぞ sharpens it further. 冗談でしょ is the surprised, much softer relative.',
          exampleJp: 'こんな条件、冗談じゃない。',
          exampleReading: 'こんなじょうけん、じょうだんじゃない。',
          exampleEn: 'These terms? You must be joking.'
        },
        {
          front: '黙れ',
          reading: 'だまれ',
          back: 'shut up',
          pos: 'expression',
          notes:
            'Hard command form and genuine hostility — a villain, or a hero past his limit. 黙って is merely "be quiet" and うるさい is everyday irritation. Aimed at a superior it declares war.',
          exampleJp: '黙れ。お前に言う資格はない。',
          exampleReading: 'だまれ。おまえにいうしかくはない。',
          exampleEn: 'Be silent. You have no right to speak.'
        },
        {
          front: '舐めるな',
          reading: 'なめるな',
          back: "don't underestimate me",
          pos: 'expression',
          notes:
            'Wounded pride, from the person being written off — often right before they win. なめんなよ is the delinquent version. The register is rough throughout; a polite form barely exists outside comedy.',
          exampleJp: '舐めるな。俺はまだ本気じゃない。',
          exampleReading: 'なめるな。おれはまだほんきじゃない。',
          exampleEn: "Don't underestimate me. I'm not even serious yet."
        },
        {
          front: '調子に乗るな',
          reading: 'ちょうしにのるな',
          back: "don't get carried away",
          pos: 'expression',
          notes:
            'Aimed at someone whose recent win has gone to their head — a senior to a junior, a rival mid-fight. Downward or sideways only. 調子に乗ってた is the sheepish admission afterwards.',
          exampleJp: '一回勝っただけで調子に乗るな。',
          exampleReading: 'いっかいかっただけでちょうしにのるな。',
          exampleEn: "You won once. Don't let it go to your head."
        },
        {
          front: '何様のつもりだ',
          reading: 'なにさまのつもりだ',
          back: 'who do you think you are',
          pos: 'expression',
          notes:
            'Contempt for someone acting above their station, with a sarcastic 様 doing the damage. Strictly for equals or below — used upward, it is a character burning a bridge on purpose.',
          exampleJp: '何様のつもりだ、お前。',
          exampleReading: 'なにさまのつもりだ、おまえ。',
          exampleEn: 'Just who do you think you are?'
        },
        {
          front: 'とぼけるな',
          reading: 'とぼけるな',
          back: "don't play dumb",
          pos: 'expression',
          notes:
            'An accusation, not a complaint — the interrogator, or the girlfriend who already knows. とぼけないで is softer, しらばっくれるな rougher. It calls the listener a liar, so it is never neutral.',
          exampleJp: 'とぼけるな。全部知ってるぞ。',
          exampleReading: 'とぼけるな。ぜんぶしってるぞ。',
          exampleEn: "Don't play innocent. I know everything."
        },
        {
          front: '大きなお世話だ',
          reading: 'おおきなおせわだ',
          back: 'mind your own business',
          pos: 'expression',
          notes:
            'Snapped at unwanted advice or pity, with a sarcastic bow to the word お世話 (kindness). Sideways and downward. 余計なお世話 is the same barb delivered with a shrug instead of a shout.',
          exampleJp: '大きなお世話だ。放っといてくれ。',
          exampleReading: 'おおきなおせわだ。ほっといてくれ。',
          exampleEn: 'Mind your own business. Leave me alone.'
        },
        {
          front: '知ったことか',
          reading: 'しったことか',
          back: 'what do I care',
          pos: 'expression',
          notes:
            'A brush-off with real coldness in it — the antihero refusing to be moved by anyone\'s circumstances. Male-plain; 知るか is the shorter, ruder cousin.',
          exampleJp: '事情なんて知ったことか。',
          exampleReading: 'じじょうなんてしったことか。',
          exampleEn: 'Your reasons are nothing to me.'
        },
        {
          front: '話にならない',
          reading: 'はなしにならない',
          back: 'this is pointless',
          pos: 'expression',
          notes:
            'Dismissal on grounds of quality — the offer is too poor, the opponent too weak, the argument too stupid. Cool rather than shouted, which is what makes it cut. 話になりません keeps it polite and just as brutal.',
          exampleJp: 'その条件じゃ話にならない。',
          exampleReading: 'そのじょうけんじゃはなしにならない。',
          exampleEn: 'With terms like that, there is nothing to discuss.'
        },
        {
          front: '出て行け',
          reading: 'でていけ',
          back: 'get out',
          pos: 'expression',
          notes:
            'Throwing someone out of your home, your room or your organisation — a father disowning a son, a boss firing on the spot. 出てって is the shorter angry form, 出て行ってください the icy polite one.',
          exampleJp: '二度と顔を見せるな。出て行け。',
          exampleReading: 'にどとかおをみせるな。でていけ。',
          exampleEn: 'Never show your face again. Get out.'
        },
        {
          front: 'もういい',
          reading: 'もういい',
          back: 'forget it; that is enough',
          pos: 'expression',
          notes:
            'Giving up on the conversation itself. From a friend it is weary; from a partner it is the dangerous kind of "it is fine". もういいです stays polite while closing the door just as firmly.',
          exampleJp: 'もういい。自分でやる。',
          exampleReading: 'もういい。じぶんでやる。',
          exampleEn: "Forget it. I'll do it myself."
        },
        {
          front: '二度と来るな',
          reading: 'にどとくるな',
          back: 'never come back',
          pos: 'expression',
          notes:
            'The door slamming — a shopkeeper to a troublemaker, a family cutting someone off. Bare command plus 二度と (never again). The gentler もう来ないでください hurts in a different way.',
          exampleJp: '顔も見たくない。二度と来るな。',
          exampleReading: 'かおもみたくない。にどとくるな。',
          exampleEn: 'I do not want to see you. Never come back.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Comfort and encouragement',
      cards: [
        {
          front: '気にするな',
          reading: 'きにするな',
          back: "don't worry about it",
          pos: 'expression',
          notes:
            'Male-plain reassurance, usually about the mistake the other person is apologising for. 気にしないで is the unisex softer form, 気になさらないでください the polite one.',
          exampleJp: '気にするな。誰にでもある。',
          exampleReading: 'きにするな。だれにでもある。',
          exampleEn: "Don't worry about it. It happens to everyone."
        },
        {
          front: '大丈夫',
          reading: 'だいじょうぶ',
          back: 'it is fine; are you all right?',
          pos: 'expression',
          notes:
            'Question and answer both, decided by intonation: 大丈夫？ asks, 大丈夫 reassures. Modern speakers also use it to refuse an offer politely, which older listeners find maddeningly vague. Safe in any register.',
          exampleJp: '大丈夫、俺がついてる。',
          exampleReading: 'だいじょうぶ、おれがついてる。',
          exampleEn: 'It is all right. I am here.'
        },
        {
          front: '元気出して',
          reading: 'げんきだして',
          back: 'cheer up',
          pos: 'expression',
          notes:
            'Said to someone visibly down, by a friend at the same level or below. The て-form request keeps it gentle; 元気出せ is the male-plain shove of the same idea.',
          exampleJp: '元気出して、まだ終わりじゃない。',
          exampleReading: 'げんきだして、まだおわりじゃない。',
          exampleEn: 'Cheer up — this is not the end.'
        },
        {
          front: '頑張って',
          reading: 'がんばって',
          back: 'good luck; give it your best',
          pos: 'expression',
          notes:
            'The all-purpose send-off before an exam, a match or a shift. 頑張れ is the shout from the stands, 頑張ろう is "let us do this together", 頑張ってください the polite form. To someone already exhausted it can land as pressure.',
          exampleJp: '試験、頑張ってね。',
          exampleReading: 'しけん、がんばってね。',
          exampleEn: 'Good luck with the exam.'
        },
        {
          front: '無理するな',
          reading: 'むりするな',
          back: "don't push yourself",
          pos: 'expression',
          notes:
            'Concern that comes out gruff — to someone working through illness or injury. Male-plain; 無理しないで is the gentler version. Often the only affection a stoic character allows himself.',
          exampleJp: '熱があるんだろ。無理するな。',
          exampleReading: 'ねつがあるんだろ。むりするな。',
          exampleEn: 'You have a fever. Do not push it.'
        },
        {
          front: '心配するな',
          reading: 'しんぱいするな',
          back: "don't worry",
          pos: 'expression',
          notes:
            'Reassurance about a danger ahead, where 気にするな is about a mistake behind. Male-plain, and usually paired with a promise the speaker may not be able to keep.',
          exampleJp: '心配するな、必ず戻る。',
          exampleReading: 'しんぱいするな、かならずもどる。',
          exampleEn: 'Do not worry. I will come back.'
        },
        {
          front: 'しっかりしろ',
          reading: 'しっかりしろ',
          back: 'pull yourself together; stay with me',
          pos: 'expression',
          notes:
            'Two settings: bracing someone who is being feeble, and shaking a wounded ally to keep them conscious. Command form, urgent. しっかりして is the frightened bedside version, usually female.',
          exampleJp: 'しっかりしろ、まだ死ぬな。',
          exampleReading: 'しっかりしろ、まだしぬな。',
          exampleEn: "Stay with me — don't you dare die."
        },
        {
          front: '落ち着け',
          reading: 'おちつけ',
          back: 'calm down',
          pos: 'expression',
          notes:
            'Barked at a panicking ally by whoever is still thinking. Command form, so downward or sideways only — a furious customer gets 落ち着いてください. Telling an angry person this rarely helps, and fiction knows it.',
          exampleJp: '落ち着け。順番に話せ。',
          exampleReading: 'おちつけ。じゅんばんにはなせ。',
          exampleEn: 'Calm down. Tell me in order.'
        },
        {
          front: '何とかなる',
          reading: 'なんとかなる',
          back: 'it will work out somehow',
          pos: 'expression',
          notes:
            'Cheerful fatalism from the friend who has no plan — the counterweight to a worrier. 何とかする is the version that promises to do something about it.',
          exampleJp: '明日のことは何とかなる。',
          exampleReading: 'あしたのことはなんとかなる。',
          exampleEn: 'Tomorrow will sort itself out.'
        },
        {
          front: '応援してる',
          reading: 'おうえんしてる',
          back: 'I am rooting for you',
          pos: 'expression',
          notes:
            'Support from the sidelines, offered by someone who cannot help directly. Casual contraction of 応援している; 応援しています is the polite version, and a crowd chanting for a team uses the same verb.',
          exampleJp: '遠くからだけど応援してる。',
          exampleReading: 'とおくからだけどおうえんしてる。',
          exampleEn: 'I am far away, but I am cheering for you.'
        },
        {
          front: '泣くな',
          reading: 'なくな',
          back: "don't cry",
          pos: 'expression',
          notes:
            'Blunt on the surface, protective underneath — an older brother, a squad leader. 泣かないで is the tender version. In a battle scene it usually means there is no time for that yet.',
          exampleJp: '泣くな。お前らしくない。',
          exampleReading: 'なくな。おまえらしくない。',
          exampleEn: 'Do not cry. That is not like you.'
        },
        {
          front: 'お大事に',
          reading: 'おだいじに',
          back: 'take care of yourself',
          pos: 'set phrase',
          notes:
            'Said to the sick or injured, and by every pharmacist and clinic receptionist as you leave. Polite but warm, and safe in any direction. Full form: お大事になさってください.',
          exampleJp: 'それじゃ、お大事に。',
          exampleReading: 'それじゃ、おだいじに。',
          exampleEn: 'Well then, get well soon.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Partings and promises',
      cards: [
        {
          front: 'また今度',
          reading: 'またこんど',
          back: 'some other time',
          pos: 'expression',
          notes:
            'A soft decline as often as a plan — また今度ね usually means the invitation is being dodged politely. Casual, between friends. A genuine plan names a day.',
          exampleJp: '今日は無理だ。また今度な。',
          exampleReading: 'きょうはむりだ。またこんどな。',
          exampleEn: 'Not today. Some other time.'
        },
        {
          front: '気をつけて',
          reading: 'きをつけて',
          back: 'take care; be careful',
          pos: 'set phrase',
          notes:
            'To someone heading out, or into danger — the standard partner to 行ってらっしゃい. 気をつけろ is the male-plain warning shouted mid-fight, 気をつけてください the polite form.',
          exampleJp: '夜道は気をつけて。',
          exampleReading: 'よみちはきをつけて。',
          exampleEn: 'Be careful walking home at night.'
        },
        {
          front: '約束だ',
          reading: 'やくそくだ',
          back: 'it is a promise',
          pos: 'expression',
          notes:
            'Male-plain sealing of a promise, typically the last line before a long separation. 約束だよ is softer, 約束する is the act, 約束を守る is keeping it. Fiction loves to break the ones made on station platforms.',
          exampleJp: '必ず帰る。約束だ。',
          exampleReading: 'かならずかえる。やくそくだ。',
          exampleEn: 'I will come back. That is a promise.'
        },
        {
          front: 'お先に失礼します',
          reading: 'おさきにしつれいします',
          back: 'excuse me for leaving first',
          pos: 'set phrase',
          notes:
            'For walking out of an office while colleagues are still working — leaving before your seniors requires an apology. The expected reply is お疲れ様でした. お先に alone is the casual clip between equals.',
          exampleJp: 'お先に失礼します。お疲れ様でした。',
          exampleReading: 'おさきにしつれいします。おつかれさまでした。',
          exampleEn: 'I am heading off. Good work today.'
        },
        {
          front: 'お世話になりました',
          reading: 'おせわになりました',
          back: 'thank you for everything',
          pos: 'set phrase',
          notes:
            'Said on leaving for good — a job, a school, a host family. The past tense closes a chapter; お世話になります is the version used on arrival, or as a standard business greeting.',
          exampleJp: '三年間、お世話になりました。',
          exampleReading: 'さんねんかん、おせわになりました。',
          exampleEn: 'Thank you for these three years.'
        },
        {
          front: 'また会おう',
          reading: 'またあおう',
          back: 'let us meet again',
          pos: 'expression',
          notes:
            'A parting between equals with weight behind it — comrades splitting up, a rival after a good fight. The volitional form makes it an invitation rather than a wish; また会いましょう is the polite version.',
          exampleJp: '生きていたら、また会おう。',
          exampleReading: 'いきていたら、またあおう。',
          exampleEn: 'If we live through this, we will meet again.'
        },
        {
          front: '達者でな',
          reading: 'たっしゃでな',
          back: 'keep well (old-fashioned)',
          pos: 'expression',
          notes:
            'A rural, elderly or period-drama farewell — a grandfather at the gate, a village elder. The な makes it male and affectionate. In a modern city setting it is deliberately quaint.',
          exampleJp: '達者でな。体だけは気をつけろ。',
          exampleReading: 'たっしゃでな。からだだけはきをつけろ。',
          exampleEn: 'Keep well. Look after yourself.'
        },
        {
          front: 'さらばだ',
          reading: 'さらばだ',
          back: 'farewell',
          pos: 'expression',
          notes:
            'Archaic and grand — samurai, demon lords, anyone with a cape. Signals a permanent parting or a dramatic exit; in an ordinary conversation it is a joke. Bare さらば survives in narration and song titles.',
          exampleJp: '世話になった。さらばだ。',
          exampleReading: 'せわになった。さらばだ。',
          exampleEn: 'You have my thanks. Farewell.'
        },
        {
          front: '指切りげんまん',
          reading: 'ゆびきりげんまん',
          back: 'pinky swear',
          pos: 'set phrase',
          notes:
            'The children\'s promise chant, little fingers hooked — and the thousand needles threatened in the next line are part of the rhyme. Children, or adults reaching back to childhood; a serious adult promise never uses it.',
          exampleJp: '指切りげんまん、嘘ついたら針千本。',
          exampleReading: 'ゆびきりげんまん、うそついたらはりせんぼん。',
          exampleEn: 'Pinky swear — a thousand needles if you lie.'
        },
        {
          front: '忘れるな',
          reading: 'わすれるな',
          back: "don't forget",
          pos: 'expression',
          notes:
            'A parting instruction with authority behind it — a master to a student, a dying ally. Bare command. 忘れないで is the pleading version, usually female and far softer.',
          exampleJp: 'この日のことを忘れるな。',
          exampleReading: 'このひのことをわすれるな。',
          exampleEn: 'Never forget this day.'
        },
        {
          front: '待ってる',
          reading: 'まってる',
          back: 'I will be waiting',
          pos: 'expression',
          notes:
            'Casual contraction of 待っている, and a promise rather than a statement — the line of the person left behind. 待ってます is polite, 待ってろ an order to stay put.',
          exampleJp: '帰ってくるまで待ってる。',
          exampleReading: 'かえってくるまでまってる。',
          exampleEn: 'I will wait until you come back.'
        },
        {
          front: 'また明日',
          reading: 'またあした',
          back: 'see you tomorrow',
          pos: 'set phrase',
          notes:
            'The everyday school-gate goodbye between friends: また明日ね softens it, また明日な is male. Because it assumes there will be a tomorrow, fiction likes to use it as the last line before something goes wrong.',
          exampleJp: 'じゃあ、また明日。',
          exampleReading: 'じゃあ、またあした。',
          exampleEn: 'Right then — see you tomorrow.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Narration and the connectives manga runs on',
      cards: [
        {
          front: 'その時',
          reading: 'そのとき',
          back: 'at that moment',
          pos: 'narration',
          notes:
            'The caption that cuts to the turning point, usually alone on a dark panel. Formal enough for prose, plain enough for a narration box. In ordinary speech it just means "back then".',
          exampleJp: 'その時、扉が開いた。',
          exampleReading: 'そのとき、とびらがひらいた。',
          exampleEn: 'At that moment, the door opened.'
        },
        {
          front: '気がつくと',
          reading: 'きがつくと',
          back: 'when I came to; before I knew it',
          pos: 'narration',
          notes:
            'First-person narration waking into a new situation — after a blackout, or after time slipped away unnoticed. It sets up something the narrator did not choose. 気がついたら is the more colloquial twin.',
          exampleJp: '気がつくと、知らない部屋にいた。',
          exampleReading: 'きがつくと、しらないへやにいた。',
          exampleEn: 'When I came to, I was in a room I did not know.'
        },
        {
          front: 'そうは言っても',
          reading: 'そうはいっても',
          back: 'that said; even so',
          pos: 'conjunction',
          notes:
            'Concedes the other side and then contradicts it. Common in dialogue and in a narrator\'s grumbling; そうは言うが is the male-plain version and とはいえ the written one.',
          exampleJp: 'そうは言っても、金がない。',
          exampleReading: 'そうはいっても、かねがない。',
          exampleEn: 'Even so, we have no money.'
        },
        {
          front: 'というわけで',
          reading: 'というわけで',
          back: 'and so; that is why',
          pos: 'conjunction',
          notes:
            'Wraps up an explanation and jumps to the consequence, often comically — the character who has just justified something absurd. Casual-neutral; a narrator uses it to skip the boring part. Polite: というわけです.',
          exampleJp: 'というわけで、今日から同居だ。',
          exampleReading: 'というわけで、きょうからどうきょだ。',
          exampleEn: 'And so, we are living together from today.'
        },
        {
          front: 'こうして',
          reading: 'こうして',
          back: 'and thus; in this way',
          pos: 'narration',
          notes:
            'Storybook narration closing an arc, in the final panels beside そして. Nobody uses it casually about their own day.',
          exampleJp: 'こうして戦いは終わった。',
          exampleReading: 'こうしてたたかいはおわった。',
          exampleEn: 'And thus the battle ended.'
        },
        {
          front: 'やがて',
          reading: 'やがて',
          back: 'before long',
          pos: 'adverb',
          notes:
            'Written narration for time passing without a stated amount. Literary enough that a character saying it aloud sounds like a storyteller; すぐに is the everyday equivalent.',
          exampleJp: 'やがて、雨がやんだ。',
          exampleReading: 'やがて、あめがやんだ。',
          exampleEn: 'Before long, the rain stopped.'
        },
        {
          front: '一方その頃',
          reading: 'いっぽうそのころ',
          back: 'meanwhile',
          pos: 'narration',
          notes:
            'The caption that cuts away to the rest of the cast — pure narration, never dialogue. 一方 alone does the same job in prose; その頃 alone is simply "around that time".',
          exampleJp: '一方その頃、敵は動き出していた。',
          exampleReading: 'いっぽうそのころ、てきはうごきだしていた。',
          exampleEn: 'Meanwhile, the enemy was already moving.'
        },
        {
          front: 'さて',
          reading: 'さて',
          back: 'now then',
          pos: 'conjunction',
          notes:
            'A speaker turning to the next order of business — the villain who has finished monologuing, a teacher starting class, a narrator turning the page. Neutral, but it always announces that something is about to happen.',
          exampleJp: 'さて、始めようか。',
          exampleReading: 'さて、はじめようか。',
          exampleEn: 'Now then — shall we begin?'
        },
        {
          front: '果たして',
          reading: 'はたして',
          back: 'sure enough; but will it really',
          pos: 'adverb',
          notes:
            'Two jobs: confirming an expectation, and hanging a cliffhanger in front of a question (果たして間に合うのか). Written register — a character who says it aloud is being dramatic on purpose.',
          exampleJp: '果たして、彼は現れるのか。',
          exampleReading: 'はたして、かれはあらわれるのか。',
          exampleEn: 'Will he actually appear?'
        },
        {
          front: 'いつの間にか',
          reading: 'いつのまにか',
          back: 'before anyone noticed',
          pos: 'adverb',
          notes:
            'Something changed while the narrator was not looking — a threat that closed in, a friendship that formed. At home in speech and narration alike, always with a hint of "I never saw it happen".',
          exampleJp: 'いつの間にか、夜になっていた。',
          exampleReading: 'いつのまにか、よるになっていた。',
          exampleEn: 'Before I knew it, night had fallen.'
        },
        {
          front: '数日後',
          reading: 'すうじつご',
          back: 'a few days later',
          pos: 'narration',
          notes:
            'A time-skip caption. The family — 数時間後, 翌朝, 三年後 — are all bare captions rather than sentences. Spoken aloud only when a character is summarising events.',
          exampleJp: '数日後、手紙が届いた。',
          exampleReading: 'すうじつご、てがみがとどいた。',
          exampleEn: 'A few days later, a letter arrived.'
        },
        {
          front: 'そんなある日',
          reading: 'そんなあるひ',
          back: 'then one day',
          pos: 'narration',
          notes:
            'The line that ends the setup and starts the plot, after a page of ordinary life. Storybook register, always in a caption box; bare ある日 opens a tale from cold.',
          exampleJp: 'そんなある日、彼女が転校してきた。',
          exampleReading: 'そんなあるひ、かのじょがてんこうしてきた。',
          exampleEn: 'Then one day, she transferred into our class.'
        }
      ]
    }
  ]
}

export const VN_SLANG_COURSE: SeedCourse = {
  title: 'VN, Gaming & Net Slang',
  description:
    'Menu text, route talk, gacha vocabulary and the slang of Japanese chat and streaming — the words a dictionary lists late and a visual novel uses on screen one.',
  level: 'N4–N3',
  difficulty: 12,
  lessons: [
    {
      kind: 'vocab',
      title: 'Saving, loading and the config menu',
      cards: [
        {
          front: 'セーブ',
          reading: 'セーブ',
          back: 'save (a game)',
          pos: 'noun (suru-verb)',
          notes:
            'Title-screen and menu text, in every VN and console game. セーブする to save; the slots are セーブ枠 / セーブデータ.',
          exampleJp: 'セーブしてから先に進もう。',
          exampleReading: 'セーブしてからさきにすすもう。',
          exampleEn: "Let's save before we go on."
        },
        {
          front: 'ロード',
          reading: 'ロード',
          back: 'load (a save)',
          pos: 'noun (suru-verb)',
          notes:
            'Sits next to セーブ on every menu. Also ロード画面 (loading screen) and the review complaint ロードが長い.',
          exampleJp: '最後のセーブからロードした。',
          exampleReading: 'さいごのセーブからロードした。',
          exampleEn: 'I loaded from the last save.'
        },
        {
          front: 'オートセーブ',
          reading: 'オートセーブ',
          back: 'autosave',
          pos: 'noun',
          notes:
            'A slot the game writes for you, separate from your own. オートセーブ中 is the on-screen warning not to quit yet.',
          exampleJp: 'オートセーブ中は電源を切らないでください。',
          exampleReading: 'オートセーブちゅうはでんげんをきらないでください。',
          exampleEn: 'Do not turn off the power while autosaving.'
        },
        {
          front: '上書き',
          reading: 'うわがき',
          back: 'overwriting (a save slot)',
          pos: 'noun (suru-verb)',
          notes:
            'The confirmation dialog you will read a thousand times: 上書きしますか？ — はい / いいえ. Also ordinary computer Japanese for overwriting a file.',
          exampleJp: 'このデータに上書きしますか？',
          exampleReading: 'このデータにうわがきしますか？',
          exampleEn: 'Overwrite this save data?'
        },
        {
          front: '既読',
          reading: 'きどく',
          back: 'already read (text you have seen before)',
          pos: 'noun',
          notes:
            'A VN tracks its script line by line: 既読 lines print in a different colour and can be skipped. Outside games it is the "read" mark on a LINE message.',
          exampleJp: '既読の文章は色が変わる。',
          exampleReading: 'きどくのぶんしょうはいろがかわる。',
          exampleEn: 'Lines you have already read change colour.'
        },
        {
          front: '未読',
          reading: 'みどく',
          back: 'unread (text you have not reached yet)',
          pos: 'noun',
          notes:
            'The opposite of 既読. 未読スキップ is the config switch that skips new text too — it will spoil you, so it ships off.',
          exampleJp: '未読文章はスキップしない設定にする。',
          exampleReading: 'みどくぶんしょうはスキップしないせっていにする。',
          exampleEn: 'Set it so that unread text is never skipped.'
        },
        {
          front: '既読スキップ',
          reading: 'きどくスキップ',
          back: 'skip already-read text',
          pos: 'noun',
          notes:
            'The option that makes a second playthrough bearable: hold Ctrl and the game flies until it hits a line you have not seen. Every route hunt runs on it.',
          exampleJp: '二周目は既読スキップで一気に進める。',
          exampleReading: 'にしゅうめはきどくスキップでいっきにすすめる。',
          exampleEn: 'On a second playthrough you blast ahead with skip-read.'
        },
        {
          front: '環境設定',
          reading: 'かんきょうせってい',
          back: 'settings; preferences (the options screen)',
          pos: 'noun',
          notes:
            'The VN word for the config menu — other games say 設定 or コンフィグ. Text speed, volume and skip behaviour all live under it.',
          exampleJp: '環境設定で文字の速さを変えられる。',
          exampleReading: 'かんきょうせっていでもじのはやさをかえられる。',
          exampleEn: 'You can change the text speed in the settings.'
        },
        {
          front: 'バックログ',
          reading: 'バックログ',
          back: 'text history (scroll back through past lines)',
          pos: 'noun',
          notes:
            'Usually the mouse wheel; most VNs let you replay the voice clip from there. Some menus label it 履歴 instead.',
          exampleJp: 'バックログで前のセリフを読み返す。',
          exampleReading: 'バックログでまえのセリフをよみかえす。',
          exampleEn: 'Reread the previous line in the backlog.'
        },
        {
          front: '文字送り',
          reading: 'もじおくり',
          back: 'text speed (how fast the letters appear)',
          pos: 'noun',
          notes:
            'A slider in 環境設定, spelled out as 文字送り速度. Readers push it to 瞬間表示 (instant) once they can keep up.',
          exampleJp: '文字送りを最速に設定した。',
          exampleReading: 'もじおくりをさいそくにせっていした。',
          exampleEn: 'I set the text speed to maximum.'
        },
        {
          front: '続きから',
          reading: 'つづきから',
          back: 'continue (from where you left off)',
          pos: 'expression',
          notes:
            'Title-screen button, paired with はじめから (new game). Literally just 続き + から, "from the continuation".',
          exampleJp: '続きから始めますか？',
          exampleReading: 'つづきからはじめますか？',
          exampleEn: 'Continue from your last save?'
        },
        {
          front: '音量',
          reading: 'おんりょう',
          back: 'volume',
          pos: 'noun',
          notes:
            'Config menu, split into BGM音量 / SE音量 / ボイス音量. Ordinary Japanese, not slang — the same word for a TV or a phone.',
          exampleJp: 'ボイスの音量だけ下げる。',
          exampleReading: 'ボイスのおんりょうだけさげる。',
          exampleEn: 'Turn down only the voice volume.'
        },
        {
          front: '全画面',
          reading: 'ぜんがめん',
          back: 'fullscreen',
          pos: 'noun',
          notes:
            'Config option, usually written 全画面表示 with ウィンドウ (windowed) as the alternative. Alt+Enter in most engines.',
          exampleJp: '全画面表示に切り替える。',
          exampleReading: 'ぜんがめんひょうじにきりかえる。',
          exampleEn: 'Switch to fullscreen.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Choices, routes and endings',
      cards: [
        {
          front: '選択肢',
          reading: 'せんたくし',
          back: 'a choice (the options a VN puts on screen)',
          pos: 'noun',
          notes:
            'The two or three lines you click to steer the story. 選択肢が出る = a choice comes up. A game with none is 一本道.',
          exampleJp: 'ここの選択肢で結末が変わる。',
          exampleReading: 'ここのせんたくしでけつまつがかわる。',
          exampleEn: 'The ending changes depending on this choice.'
        },
        {
          front: 'ルート',
          reading: 'ルート',
          back: 'a route (one character or faction storyline)',
          pos: 'noun',
          notes:
            'The unit VN readers count in. ルートに入る = to get onto a route; 全ルート制覇 = clearing every one of them.',
          exampleJp: 'やっと彼女のルートに入った。',
          exampleReading: 'やっとかのじょのルートにはいった。',
          exampleEn: 'I finally got onto her route.'
        },
        {
          front: '分岐',
          reading: 'ぶんき',
          back: 'a branch; the point where the story splits',
          pos: 'noun (suru-verb)',
          notes:
            'Walkthroughs are written as a list of 分岐 with the choice to pick at each. 分岐点 = the branch point itself.',
          exampleJp: '三章の分岐で全部決まる。',
          exampleReading: 'さんしょうのぶんきでぜんぶきまる。',
          exampleEn: 'Everything is decided at the branch in chapter three.'
        },
        {
          front: '共通ルート',
          reading: 'きょうつうルート',
          back: 'the common route (the shared opening everyone plays)',
          pos: 'noun',
          notes:
            'Everything before the heroines split off. You skip it on replays, and a bloated 共通ルート is a standard complaint.',
          exampleJp: '共通ルートが十時間もある。',
          exampleReading: 'きょうつうルートがじゅうじかんもある。',
          exampleEn: 'The common route alone is ten hours long.'
        },
        {
          front: '個別ルート',
          reading: 'こべつルート',
          back: 'an individual route (one character arc of their own)',
          pos: 'noun',
          notes:
            'What you enter once the common route ends. Often clipped to 個別: 個別に入ってからが本番 — the real game starts there.',
          exampleJp: '個別ルートに入ると雰囲気が変わる。',
          exampleReading: 'こべつルートにはいるとふんいきがかわる。',
          exampleEn: 'The mood changes once you enter her own route.'
        },
        {
          front: 'エンディング',
          reading: 'エンディング',
          back: 'an ending',
          pos: 'noun',
          notes:
            'Collected rather than merely reached: エンディング回収 = getting them all. Shortened to エンド inside compounds.',
          exampleJp: 'エンディングを全部見た。',
          exampleReading: 'エンディングをぜんぶみた。',
          exampleEn: "I've seen every ending."
        },
        {
          front: 'バッドエンド',
          reading: 'バッドエンド',
          back: 'a bad ending',
          pos: 'noun',
          notes:
            'Clipped to バドエン in chat. Many VNs make you walk into one before the good route will unlock.',
          exampleJp: '選択を間違えてバッドエンドになった。',
          exampleReading: 'せんたくをまちがえてバッドエンドになった。',
          exampleEn: 'I picked wrong and got a bad ending.'
        },
        {
          front: 'トゥルーエンド',
          reading: 'トゥルーエンド',
          back: 'the true ending',
          pos: 'noun',
          notes:
            'The canon one, usually locked until every other route is cleared. Printed as TRUE END on the screen itself.',
          exampleJp: '全ルート後にトゥルーエンドが解放される。',
          exampleReading: 'ぜんルートごにトゥルーエンドがかいほうされる。',
          exampleEn: 'The true ending unlocks after all the routes.'
        },
        {
          front: '攻略',
          reading: 'こうりゃく',
          back: 'clearing a game; a walkthrough; winning a character over',
          pos: 'noun (suru-verb)',
          notes:
            'Three senses at once — 攻略サイト (walkthrough site), 攻略する a boss, 攻略する a heroine. Site and forum text more than speech.',
          exampleJp: '攻略サイトを見ながら進めた。',
          exampleReading: 'こうりゃくサイトをみながらすすめた。',
          exampleEn: 'I played with a walkthrough site open.'
        },
        {
          front: '攻略対象',
          reading: 'こうりゃくたいしょう',
          back: 'a romanceable character',
          pos: 'noun',
          notes:
            'Otome-game vocabulary above all: the list of people you can actually pursue. 攻略対象じゃない means stop trying.',
          exampleJp: '彼は攻略対象じゃないらしい。',
          exampleReading: 'かれはこうりゃくたいしょうじゃないらしい。',
          exampleEn: 'Apparently he is not a romanceable character.'
        },
        {
          front: '好感度',
          reading: 'こうかんど',
          back: 'affection points (how much a character likes you)',
          pos: 'noun',
          notes:
            'The hidden number your choices move; walkthroughs annotate each 選択肢 with 好感度+1. Also used half-jokingly about real people.',
          exampleJp: '好感度が足りなくてルートに入れない。',
          exampleReading: 'こうかんどがたりなくてルートにはいれない。',
          exampleEn: 'Her affection is too low to get onto her route.'
        },
        {
          front: '一本道',
          reading: 'いっぽんみち',
          back: 'linear; on rails (a single path)',
          pos: 'noun',
          notes:
            'Literally "one road". A review word, neutral to mildly negative: 一本道だけどシナリオは良い.',
          exampleJp: 'このゲームは一本道で選択肢がない。',
          exampleReading: 'このゲームはいっぽんみちでせんたくしがない。',
          exampleEn: 'This game is linear and has no choices at all.'
        },
        {
          front: '立ち絵',
          reading: 'たちえ',
          back: 'a character sprite (the standing art over the background)',
          pos: 'noun',
          notes:
            'The art term readers and reviewers use: 立ち絵が綺麗, 立ち絵の差分 = expression variants. Distinct from CG, the full event illustrations.',
          exampleJp: '立ち絵の表情が細かくて良い。',
          exampleReading: 'たちえのひょうじょうがこまかくてよい。',
          exampleEn: 'The sprites have wonderfully detailed expressions.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Heroines, tropes and flags',
      cards: [
        {
          front: 'ヒロイン',
          reading: 'ヒロイン',
          back: 'a heroine (a main girl with a route of her own)',
          pos: 'noun',
          notes:
            'Narrower than the English word: in a VN it means someone you can actually pursue. メインヒロイン is the one on the box art.',
          exampleJp: '一番好きなヒロインは誰？',
          exampleReading: 'いちばんすきなヒロインはだれ？',
          exampleEn: 'Which heroine do you like best?'
        },
        {
          front: '幼馴染',
          reading: 'おさななじみ',
          back: 'a childhood friend',
          pos: 'noun',
          notes:
            'A whole archetype, not just a fact: she wakes the protagonist up in scene one and loses in scene four hundred. Also written 幼なじみ.',
          exampleJp: '幼馴染ヒロインが一番好きだ。',
          exampleReading: 'おさななじみヒロインがいちばんすきだ。',
          exampleEn: 'The childhood-friend heroine is my favourite.'
        },
        {
          front: 'ツンデレ',
          reading: 'ツンデレ',
          back: 'tsundere (prickly outside, soft underneath)',
          pos: 'noun (slang)',
          notes:
            'ツンツン (cold) + デレデレ (lovestruck). Normal in fan talk; aimed at a real person it is teasing at best.',
          exampleJp: '彼女は完全にツンデレだ。',
          exampleReading: 'かのじょはかんぜんにツンデレだ。',
          exampleEn: 'She is a complete tsundere.'
        },
        {
          front: 'ヤンデレ',
          reading: 'ヤンデレ',
          back: 'yandere (affection that has curdled into obsession)',
          pos: 'noun (slang)',
          notes:
            '病んでる (mentally unwell) + デレ — the knife-behind-the-back archetype. Fan vocabulary only; do not aim it at anyone real.',
          exampleJp: 'ヤンデレの子が出てくるルートは怖い。',
          exampleReading: 'ヤンデレのこがでてくるルートはこわい。',
          exampleEn: 'The route with the yandere girl is terrifying.'
        },
        {
          front: 'フラグ',
          reading: 'フラグ',
          back: 'a flag (the moment that locks in a later event)',
          pos: 'noun',
          notes:
            'Borrowed from programming. フラグが立つ = a flag goes up; 死亡フラグ is the line that means a character is doomed. Common in speech and chat.',
          exampleJp: 'それ完全に死亡フラグだろ。',
          exampleReading: 'それかんぜんにしぼうフラグだろ。',
          exampleEn: "That's a death flag if ever I heard one."
        },
        {
          front: '伏線',
          reading: 'ふくせん',
          back: 'foreshadowing (a planted detail that pays off later)',
          pos: 'noun',
          notes:
            'The reviewer word: 伏線を張る = to plant it, 伏線を回収する = to pay it off. 伏線回収が見事 is high praise.',
          exampleJp: '最終章で伏線が全部回収された。',
          exampleReading: 'さいしゅうしょうでふくせんがぜんぶかいしゅうされた。',
          exampleEn: 'Every piece of foreshadowing paid off in the final chapter.'
        },
        {
          front: '回想',
          reading: 'かいそう',
          back: 'a flashback; scene replay (a gallery menu)',
          pos: 'noun (suru-verb)',
          notes:
            'Two uses at once: a flashback in the story, and the 回想 menu that replays scenes you have unlocked. Menu text and narration alike.',
          exampleJp: '回想モードで見逃した場面を見る。',
          exampleReading: 'かいそうモードでみのがしたばめんをみる。',
          exampleEn: 'Use the scene-replay mode to see what you missed.'
        },
        {
          front: '主人公',
          reading: 'しゅじんこう',
          back: 'the protagonist (the character you play)',
          pos: 'noun',
          notes:
            'Ordinary literary Japanese, but VN readers use it constantly — 主人公補正 = plot armour, and a faceless, voiceless 主人公 is a standard gripe.',
          exampleJp: 'この主人公は声がついていない。',
          exampleReading: 'このしゅじんこうはこえがついていない。',
          exampleEn: 'This protagonist has no voice acting.'
        },
        {
          front: '告白',
          reading: 'こくはく',
          back: 'confessing your feelings',
          pos: 'noun (suru-verb)',
          notes:
            'The scene every route builds towards. Perfectly ordinary Japanese — it also means confessing to a crime.',
          exampleJp: '屋上で告白するイベントがある。',
          exampleReading: 'おくじょうでこくはくするイベントがある。',
          exampleEn: 'There is a confession scene on the roof.'
        },
        {
          front: '三角関係',
          reading: 'さんかくかんけい',
          back: 'a love triangle',
          pos: 'noun',
          notes:
            'Blurb and review vocabulary: 三角関係のもつれ = a tangled triangle. Neutral register, safe anywhere.',
          exampleJp: '幼馴染と後輩の三角関係になる。',
          exampleReading: 'おさななじみとこうはいのさんかくかんけいになる。',
          exampleEn: 'It turns into a love triangle with the childhood friend and the underclassman.'
        },
        {
          front: '中二病',
          reading: 'ちゅうにびょう',
          back: 'eighth-grader syndrome (cringeworthy delusions of being special)',
          pos: 'noun (slang)',
          notes:
            'Literally "middle-school-year-two disease": the kid whose right arm is sealed by a demon. Teasing between friends, insulting otherwise.',
          exampleJp: '中二病全開のセリフだ。',
          exampleReading: 'ちゅうにびょうぜんかいのセリフだ。',
          exampleEn: 'That line is peak eighth-grader syndrome.'
        },
        {
          front: '記憶喪失',
          reading: 'きおくそうしつ',
          back: 'amnesia',
          pos: 'noun',
          notes:
            'A plot device common enough to be a joke — 記憶喪失ヒロイン. It is also the real medical term, so the register stays neutral.',
          exampleJp: 'ヒロインは記憶喪失になっている。',
          exampleReading: 'ヒロインはきおくそうしつになっている。',
          exampleEn: 'The heroine has lost her memory.'
        },
        {
          front: '修羅場',
          reading: 'しゅらば',
          back: 'an ugly confrontation (two girls, one boy, no exits)',
          pos: 'noun',
          notes:
            'From the Buddhist 修羅 realm of endless fighting. In a VN it is where the routes collide; in office slang it is crunch week. Speech and chat.',
          exampleJp: '二人に鉢合わせして修羅場になった。',
          exampleReading: 'ふたりにはちあわせしてしゅらばになった。',
          exampleEn: 'They both walked in on him and it turned into a bloodbath.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'RPG systems and battle',
      cards: [
        {
          front: '経験値',
          reading: 'けいけんち',
          back: 'experience points (EXP)',
          pos: 'noun',
          notes:
            'Status-screen text. Also used figuratively in speech about real life: いい経験値になった — that was a good learning experience.',
          exampleJp: '今は経験値が二倍になるイベント中だ。',
          exampleReading: 'いまはけいけんちがにばいになるイベントちゅうだ。',
          exampleEn: 'There is a double-EXP event running right now.'
        },
        {
          front: '熟練度',
          reading: 'じゅくれんど',
          back: 'proficiency (a skill that levels by being used)',
          pos: 'noun',
          notes:
            'The separate bar for a weapon type or job — 熟練度を上げる by swinging the same sword a thousand times. Menu text.',
          exampleJp: '斧の熟練度がまだ低い。',
          exampleReading: 'おののじゅくれんどがまだひくい。',
          exampleEn: 'My axe proficiency is still low.'
        },
        {
          front: '属性',
          reading: 'ぞくせい',
          back: 'element (fire, water…); attribute',
          pos: 'noun',
          notes:
            'Battle menus: 火属性, 闇属性, 属性相性 = the element matchup chart. Fandom borrows it for character traits too (ツンデレ属性).',
          exampleJp: 'この敵は火属性に弱い。',
          exampleReading: 'このてきはひぞくせいによわい。',
          exampleEn: 'This enemy is weak to fire.'
        },
        {
          front: '状態異常',
          reading: 'じょうたいいじょう',
          back: 'a status ailment (poison, sleep, paralysis)',
          pos: 'noun',
          notes:
            'The umbrella term on every RPG menu; the individual ones are 毒, 麻痺, 睡眠. 状態異常無効 on a piece of gear means immune.',
          exampleJp: '状態異常を回復するアイテムを使う。',
          exampleReading: 'じょうたいいじょうをかいふくするアイテムをつかう。',
          exampleEn: 'Use an item that cures status ailments.'
        },
        {
          front: '詠唱',
          reading: 'えいしょう',
          back: 'casting; chanting a spell',
          pos: 'noun (suru-verb)',
          notes:
            'The cast bar: 詠唱中 = casting. 詠唱破棄 — casting without the incantation — is the standard light-novel flex.',
          exampleJp: '詠唱中に攻撃されると中断される。',
          exampleReading: 'えいしょうちゅうにこうげきされるとちゅうだんされる。',
          exampleEn: 'Getting hit while casting interrupts the spell.'
        },
        {
          front: '耐性',
          reading: 'たいせい',
          back: 'resistance (to an element or an ailment)',
          pos: 'noun',
          notes:
            'Gear stats: 炎耐性+20%. Everyday Japanese too — 酒に耐性がない means you cannot hold your drink.',
          exampleJp: '毒耐性の装備をつけていく。',
          exampleReading: 'どくたいせいのそうびをつけていく。',
          exampleEn: 'I go in wearing poison-resistance gear.'
        },
        {
          front: '弱点',
          reading: 'じゃくてん',
          back: 'a weak point',
          pos: 'noun',
          notes:
            'Battle vocabulary — 弱点を突く = hit the weak spot — and ordinary Japanese for a personal shortcoming.',
          exampleJp: '弱点を突けば大ダメージが出る。',
          exampleReading: 'じゃくてんをつけばだいダメージがでる。',
          exampleEn: 'Hit the weak point and you do huge damage.'
        },
        {
          front: '必殺技',
          reading: 'ひっさつわざ',
          back: 'a special move; a finisher',
          pos: 'noun',
          notes:
            'Literally "certain-kill technique". Fighting-game and shounen vocabulary: the move that gets a shouted name and a cut-in.',
          exampleJp: '必殺技でとどめを刺した。',
          exampleReading: 'ひっさつわざでとどめをさした。',
          exampleEn: 'I finished him off with the special move.'
        },
        {
          front: '装備',
          reading: 'そうび',
          back: 'equipment; to equip',
          pos: 'noun (suru-verb)',
          notes:
            'Both the menu tab and the verb. 装備を整える = to gear up before a boss. Also the military and outdoor-gear word.',
          exampleJp: '新しい武器を装備する。',
          exampleReading: 'あたらしいぶきをそうびする。',
          exampleEn: 'Equip the new weapon.'
        },
        {
          front: '回復',
          reading: 'かいふく',
          back: 'healing; recovery',
          pos: 'noun (suru-verb)',
          notes:
            '回復魔法, 回復薬, HPが回復する. Perfectly ordinary Japanese outside games, for recovering from illness or a slump.',
          exampleJp: '回復アイテムが尽きた。',
          exampleReading: 'かいふくアイテムがつきた。',
          exampleEn: "I'm out of healing items."
        },
        {
          front: 'ステータス',
          reading: 'ステータス',
          back: 'stats (the character status screen)',
          pos: 'noun',
          notes:
            'Both the screen and the numbers on it: ステータス画面, ステータス振り = allocating your points. Never means social status in this context.',
          exampleJp: 'ステータスを確認してから戦う。',
          exampleReading: 'ステータスをかくにんしてからたたかう。',
          exampleEn: 'Check your stats before fighting.'
        },
        {
          front: '全体攻撃',
          reading: 'ぜんたいこうげき',
          back: 'an attack that hits the whole party',
          pos: 'noun',
          notes:
            'Paired with 単体攻撃 (single target). Boss-fight talk: 全体攻撃が来る前に回復しておく.',
          exampleJp: 'ボスの全体攻撃で全滅した。',
          exampleReading: 'ボスのぜんたいこうげきでぜんめつした。',
          exampleEn: 'The boss wiped the whole party with an area attack.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Gacha',
      cards: [
        {
          front: 'ガチャ',
          reading: 'ガチャ',
          back: 'gacha (a paid random draw)',
          pos: 'noun',
          notes:
            'From the ガチャガチャ capsule machines. ガチャを回す = to pull. An entire subculture of vocabulary hangs off this one word.',
          exampleJp: '限定ガチャを三十連回した。',
          exampleReading: 'げんていガチャをさんじゅうれんまわした。',
          exampleEn: 'I did thirty pulls on the limited banner.'
        },
        {
          front: '排出率',
          reading: 'はいしゅつりつ',
          back: 'drop rate (the disclosed pull rate)',
          pos: 'noun',
          notes:
            'Japanese law makes publishers disclose it, so every banner carries a 排出率 table. Official text, not slang — you read it on the announcement page.',
          exampleJp: '最高レアの排出率は三パーセントだ。',
          exampleReading: 'さいこうレアのはいしゅつりつはさんパーセントだ。',
          exampleEn: 'The top rarity has a three percent rate.'
        },
        {
          front: '天井',
          reading: 'てんじょう',
          back: 'pity (the guaranteed unit after enough pulls)',
          pos: 'noun',
          notes:
            'Literally "ceiling" — the point where the game stops taking your money for nothing. 天井まで回す = to pull all the way to pity.',
          exampleJp: '天井まで回してやっと確保した。',
          exampleReading: 'てんじょうまでまわしてやっとかくほした。',
          exampleEn: 'I pulled all the way to pity and finally secured her.'
        },
        {
          front: 'すり抜け',
          reading: 'すりぬけ',
          back: 'losing the coin flip (an off-banner unit drops instead)',
          pos: 'noun',
          notes:
            'Literally "slipping through": the rate-up character slips past you and a permanent one comes out. The most cursed word in gacha chat.',
          exampleJp: 'すり抜けで欲しくないキャラが出た。',
          exampleReading: 'すりぬけでほしくないキャラがでた。',
          exampleEn: 'I lost the coin flip and got a character I did not want.'
        },
        {
          front: '限定',
          reading: 'げんてい',
          back: 'limited (available only during this banner)',
          pos: 'noun',
          notes:
            'The pressure word: 限定キャラ, 期間限定, 復刻するかは不明. Also all over ordinary retail — 数量限定, 地域限定.',
          exampleJp: '限定キャラは今月までだ。',
          exampleReading: 'げんていキャラはこんげつまでだ。',
          exampleEn: 'The limited character is only up until the end of this month.'
        },
        {
          front: '有償石',
          reading: 'ゆうしょうせき',
          back: 'paid gems (as opposed to free ones)',
          pos: 'noun',
          notes:
            'Japanese games track 有償石 and 無償石 separately for consumer-law reasons, and some banners take only the paid kind. The currency itself is just 石.',
          exampleJp: '有償石限定のガチャは引かない。',
          exampleReading: 'ゆうしょうせきげんていのガチャはひかない。',
          exampleEn: 'I do not pull on paid-gems-only banners.'
        },
        {
          front: 'ピックアップ',
          reading: 'ピックアップ',
          back: 'rate-up (the featured character on a banner)',
          pos: 'noun',
          notes:
            'Shortened to PU in chat. ピックアップ対象 = who is rate-upped; missing them is a すり抜け.',
          exampleJp: '今回のピックアップは誰？',
          exampleReading: 'こんかいのピックアップはだれ？',
          exampleEn: 'Who is the rate-up this time?'
        },
        {
          front: '単発',
          reading: 'たんぱつ',
          back: 'a single pull',
          pos: 'noun',
          notes:
            'The opposite of 十連. 単発で出た is the brag nobody believes. Ordinary Japanese for a one-off job or a standalone episode.',
          exampleJp: '単発で当たりを引いた。',
          exampleReading: 'たんぱつであたりをひいた。',
          exampleEn: 'I hit the jackpot on a single pull.'
        },
        {
          front: '十連',
          reading: 'じゅうれん',
          back: 'a ten-pull (ten draws at once)',
          pos: 'noun',
          notes:
            'The standard bulk pull, usually with one high rarity guaranteed. Also written 10連; 連 is the counter for consecutive draws.',
          exampleJp: '十連を三回引いて全部外れた。',
          exampleReading: 'じゅうれんをさんかいひいてぜんぶはずれた。',
          exampleEn: 'I did three ten-pulls and whiffed on all of them.'
        },
        {
          front: '爆死',
          reading: 'ばくし',
          back: 'blowing everything and getting nothing',
          pos: 'noun (slang)',
          notes:
            'Literally "death by explosion". 爆死した is the standard post-gacha report to friends. Pure fan slang, never anything official.',
          exampleJp: '三万円溶かして爆死した。',
          exampleReading: 'さんまんえんとかしてばくしした。',
          exampleEn: 'I burned thirty thousand yen and came away with nothing.'
        },
        {
          front: '復刻',
          reading: 'ふっこく',
          back: 'a rerun (a banner or event brought back)',
          pos: 'noun (suru-verb)',
          notes:
            'What you pray for after missing a 限定. Originally a publishing word — a reprint of an old edition.',
          exampleJp: '去年のイベントが復刻するらしい。',
          exampleReading: 'きょねんのイベントがふっこくするらしい。',
          exampleEn: 'Apparently last year\'s event is being rerun.'
        },
        {
          front: '被り',
          reading: 'かぶり',
          back: 'a duplicate (something you already own)',
          pos: 'noun',
          notes:
            'From 被る, to overlap. Dupes usually convert into upgrade material. The same word covers clashing schedules and matching outfits.',
          exampleJp: '被りばかりで新キャラが出ない。',
          exampleReading: 'かぶりばかりでしんキャラがでない。',
          exampleEn: 'Nothing but duplicates — no new characters at all.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Grinding and play patterns',
      cards: [
        {
          front: '周回',
          reading: 'しゅうかい',
          back: 'farming; running the same stage over and over',
          pos: 'noun (suru-verb)',
          notes:
            'Also a playthrough count in VNs — 二周目 is run two. 周回する an event quest until the drops dry up.',
          exampleJp: '素材のために同じクエストを周回する。',
          exampleReading: 'そざいのためにおなじクエストをしゅうかいする。',
          exampleEn: 'Farm the same quest over and over for materials.'
        },
        {
          front: '厳選',
          reading: 'げんせん',
          back: 'rerolling or breeding for perfect stats',
          pos: 'noun (suru-verb)',
          notes:
            'Pokémon vocabulary above all — hatching eggs until the IVs come out right. Ordinary Japanese means "carefully selected" (厳選素材 on a menu).',
          exampleJp: '理想の個体値を厳選している。',
          exampleReading: 'りそうのこたいちをげんせんしている。',
          exampleEn: 'I am breeding for perfect stats.'
        },
        {
          front: '育成',
          reading: 'いくせい',
          back: 'raising; training a character up',
          pos: 'noun (suru-verb)',
          notes:
            'Also a genre name: 育成ゲーム = a raising sim. Ordinary business Japanese for developing staff or talent.',
          exampleJp: '新キャラの育成に時間がかかる。',
          exampleReading: 'しんキャラのいくせいにじかんがかかる。',
          exampleEn: 'Training up a new character takes ages.'
        },
        {
          front: 'レベル上げ',
          reading: 'レベルあげ',
          back: 'grinding levels',
          pos: 'noun',
          notes:
            'The activity rather than the stat: レベル上げが面倒. The verb is レベルを上げる, and レベリング is the loanword alternative.',
          exampleJp: 'ボスの前にレベル上げをしておく。',
          exampleReading: 'ボスのまえにレベルあげをしておく。',
          exampleEn: 'Grind a few levels before the boss.'
        },
        {
          front: '引退',
          reading: 'いんたい',
          back: 'quitting a game for good',
          pos: 'noun (suru-verb)',
          notes:
            'Borrowed from sports retirement and used with the same finality: 引退します is the goodbye post. 半引退 = barely logging in any more.',
          exampleJp: '課金が続かないので引退した。',
          exampleReading: 'かきんがつづかないのでいんたいした。',
          exampleEn: 'I could not keep paying, so I quit for good.'
        },
        {
          front: '復帰',
          reading: 'ふっき',
          back: 'coming back after a break',
          pos: 'noun (suru-verb)',
          notes:
            'The opposite of 引退. 復帰勢 = returning players, who get catch-up bonuses in most Japanese mobile games.',
          exampleJp: '二年ぶりに復帰した。',
          exampleReading: 'にねんぶりにふっきした。',
          exampleEn: 'I came back after two years away.'
        },
        {
          front: '放置',
          reading: 'ほうち',
          back: 'idling; leaving it running unattended',
          pos: 'noun (suru-verb)',
          notes:
            '放置ゲー = an idle game, 放置狩り = leaving the auto-battler on. Outside games the word is negative — neglect.',
          exampleJp: '放置しておけば勝手に周回してくれる。',
          exampleReading: 'ほうちしておけばかってにしゅうかいしてくれる。',
          exampleEn: 'Leave it idling and it farms for you.'
        },
        {
          front: '縛りプレイ',
          reading: 'しばりプレイ',
          back: 'a self-imposed restriction run',
          pos: 'noun',
          notes:
            'From 縛る, to tie up: no-levelling runs, no-item runs, 無課金縛り. Very common in video titles and stream descriptions.',
          exampleJp: '装備なしの縛りプレイに挑戦する。',
          exampleReading: 'そうびなしのしばりプレイにちょうせんする。',
          exampleEn: 'I am attempting a no-equipment run.'
        },
        {
          front: 'やり込み',
          reading: 'やりこみ',
          back: 'playing a game to exhaustion; completionist content',
          pos: 'noun',
          notes:
            'やり込み要素 = the content that keeps you going after the credits. In a review it is praise: やり込み要素が豊富.',
          exampleJp: 'やり込み要素が多くて終わらない。',
          exampleReading: 'やりこみようそがおおくておわらない。',
          exampleEn: 'There is so much postgame content that I never finish it.'
        },
        {
          front: '初見',
          reading: 'しょけん',
          back: 'seeing something for the first time; a blind run',
          pos: 'noun',
          notes:
            'Streaming vocabulary: 初見プレイ = a blind playthrough, and 初見です is what you type the first time you land in a stream chat. 初見殺し = a trap that kills first-timers.',
          exampleJp: '初見でこのボスは無理だ。',
          exampleReading: 'しょけんでこのボスはむりだ。',
          exampleEn: 'Nobody beats this boss blind.'
        },
        {
          front: '積みゲー',
          reading: 'つみゲー',
          back: 'a backlog of games bought and never played',
          pos: 'noun (slang)',
          notes:
            'From 積む, to pile up; Steam sales feed it. 積み本 and 積みプラ are the same joke for unread books and unbuilt model kits.',
          exampleJp: 'セールでまた積みゲーが増えた。',
          exampleReading: 'セールでまたつみゲーがふえた。',
          exampleEn: 'The sale added even more to my backlog.'
        },
        {
          front: 'スタミナ',
          reading: 'スタミナ',
          back: 'stamina (the energy meter that gates how much you can play)',
          pos: 'noun',
          notes:
            'Refills over time and blocks farming; individual games call it AP or BP instead. スタミナ切れ = out of stamina, also said of a tired person.',
          exampleJp: 'スタミナが切れたので明日また周回する。',
          exampleReading: 'スタミナがきれたのであしたまたしゅうかいする。',
          exampleEn: 'I am out of stamina, so I will farm again tomorrow.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Online play and matches',
      cards: [
        {
          front: '野良',
          reading: 'のら',
          back: 'playing with randoms (no premade party)',
          pos: 'noun (slang)',
          notes:
            'Literally "stray", as in 野良猫. 野良で行く = to queue solo; 野良は地雷が多い is the eternal complaint. Chat and voice, not writing.',
          exampleJp: '今日は野良でランクに潜る。',
          exampleReading: 'きょうはのらでランクにもぐる。',
          exampleEn: 'I am queueing ranked solo today.'
        },
        {
          front: '部屋',
          reading: 'へや',
          back: 'a room; a custom lobby',
          pos: 'noun',
          notes:
            'The everyday word for a room, reused for lobbies: 部屋を立てる = to host one, 部屋に入る = to join, パス付きの部屋 = password-locked.',
          exampleJp: '部屋を立てたので入ってきて。',
          exampleReading: 'へやをたてたのではいってきて。',
          exampleEn: 'I have made a room, come join.'
        },
        {
          front: '回線',
          reading: 'かいせん',
          back: 'connection (your internet line)',
          pos: 'noun',
          notes:
            'The word blamed for every loss: 回線が悪い, 回線落ち = dropping out mid-match. Ordinary telecoms vocabulary otherwise.',
          exampleJp: '回線が不安定で落ちた。',
          exampleReading: 'かいせんがふあんていでおちた。',
          exampleEn: 'My connection was unstable and I dropped out.'
        },
        {
          front: 'ラグ',
          reading: 'ラグ',
          back: 'lag',
          pos: 'noun',
          notes:
            'Players coined an adjective from it — ラグい, as in ラグくて当たらない. Chat and voice only; a bug report would say 遅延.',
          exampleJp: 'ラグがひどくて操作できない。',
          exampleReading: 'ラグがひどくてそうさできない。',
          exampleEn: 'The lag is so bad I cannot control anything.'
        },
        {
          front: 'バフ',
          reading: 'バフ',
          back: 'a buff (a temporary boost)',
          pos: 'noun',
          notes:
            'バフをかける = to buff someone; デバフ is the reverse. Battle-log and team-chat vocabulary, borrowed straight from English.',
          exampleJp: '味方に攻撃力のバフをかける。',
          exampleReading: 'みかたにこうげきりょくのバフをかける。',
          exampleEn: 'Buff an ally\'s attack power.'
        },
        {
          front: '弱体化',
          reading: 'じゃくたいか',
          back: 'a nerf (an official weakening)',
          pos: 'noun (suru-verb)',
          notes:
            'The patch-notes word; 強化 is its opposite. Players say ナーフ in chat, but the official notes always say 弱体化.',
          exampleJp: '次のアップデートで弱体化されるらしい。',
          exampleReading: 'つぎのアップデートでじゃくたいかされるらしい。',
          exampleEn: 'Apparently it gets nerfed in the next update.'
        },
        {
          front: 'マッチング',
          reading: 'マッチング',
          back: 'matchmaking',
          pos: 'noun (suru-verb)',
          notes:
            'マッチングしない = no games found; マッチング画面 is where you wait. The dating-app word is identical, so context decides.',
          exampleJp: 'マッチングに五分もかかった。',
          exampleReading: 'マッチングにごふんもかかった。',
          exampleEn: 'Matchmaking took a full five minutes.'
        },
        {
          front: '味方',
          reading: 'みかた',
          back: 'an ally; a teammate',
          pos: 'noun',
          notes:
            'The counterpart of 敵. Team chat lives on it: 味方が強い, 味方のせい. Ordinary Japanese too — 味方する = to take someone\'s side.',
          exampleJp: '味方が全員上手くて楽に勝てた。',
          exampleReading: 'みかたがぜんいんうまくてらくにかてた。',
          exampleEn: 'My teammates were all good, so we won easily.'
        },
        {
          front: '切断',
          reading: 'せつだん',
          back: 'disconnecting, often on purpose to dodge a loss',
          pos: 'noun (suru-verb)',
          notes:
            'Fighting-game vocabulary especially: 切断厨 is a rage-quitter. A serious accusation, so it is not thrown around casually.',
          exampleJp: '負けそうになると切断する人がいる。',
          exampleReading: 'まけそうになるとせつだんするひとがいる。',
          exampleEn: 'Some people disconnect the moment they are about to lose.'
        },
        {
          front: '猛者',
          reading: 'もさ',
          back: 'a beast; a genuinely fearsome player',
          pos: 'noun',
          notes:
            'An old word for a warrior, revived online as praise — ランキング上位の猛者. Read もさ, not もうしゃ.',
          exampleJp: 'ランキング上位は猛者ばかりだ。',
          exampleReading: 'ランキングじょういはもさばかりだ。',
          exampleEn: 'The top of the leaderboard is nothing but monsters.'
        },
        {
          front: 'ガチ勢',
          reading: 'ガチぜい',
          back: 'the hardcore crowd (people who play seriously)',
          pos: 'noun (slang)',
          notes:
            'ガチ (serious, from ガチンコ) + 勢 (a faction). The counterpart is エンジョイ勢, who are there for fun. Fan talk only.',
          exampleJp: 'このゲームはガチ勢が多い。',
          exampleReading: 'このゲームはガチぜいがおおい。',
          exampleEn: 'This game has a lot of hardcore players.'
        },
        {
          front: '地雷',
          reading: 'じらい',
          back: 'a liability (a teammate who sinks the match)',
          pos: 'noun (slang)',
          notes:
            'Literally a land mine: you find out only after you step on it. Genuinely rude — said behind someone\'s back. 地雷を踏む also means saying the one wrong thing.',
          exampleJp: '味方に地雷がいて負けた。',
          exampleReading: 'みかたにじらいがいてまけた。',
          exampleEn: 'We had dead weight on the team and lost.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Net slang',
      cards: [
        {
          front: '草生える',
          reading: 'くさはえる',
          back: 'that is hilarious (literally "grass grows")',
          pos: 'expression (slang)',
          notes:
            'The chain: laughing is written wwww, a row of w looks like grass, so 草 came to mean "lol". Chat and comment sections ONLY — never an email, never to a superior. 大草原 is the howling version.',
          exampleJp: 'それは草生えるわ。',
          exampleReading: 'それはくさはえるわ。',
          exampleEn: 'That is genuinely hilarious.'
        },
        {
          front: '乙',
          reading: 'おつ',
          back: 'nice work; thanks for that',
          pos: 'expression (slang)',
          notes:
            'A one-character clipping of お疲れ様. Fine in stream chat and between friends; dropped into a work message it reads as curt or sarcastic. After someone fails, 乙www turns to mockery.',
          exampleJp: '配信お疲れ、乙でした。',
          exampleReading: 'はいしんおつかれ、おつでした。',
          exampleEn: 'Good stream, nice work.'
        },
        {
          front: 'ワロタ',
          reading: 'ワロタ',
          back: 'lol (literally "I laughed")',
          pos: 'expression (slang)',
          notes:
            'From 笑った by way of 笑(わら). Slightly older-internet than 草; message boards and comment sections rather than speech.',
          exampleJp: 'このコメント欄ワロタ。',
          exampleReading: 'このコメントらんワロタ。',
          exampleEn: 'This comment section is killing me.'
        },
        {
          front: 'リア充',
          reading: 'リアじゅう',
          back: 'someone whose real life is going well',
          pos: 'noun (slang)',
          notes:
            'リアル + 充実 (fulfilled) — the person who does not need the internet. Half envy, half insult; リア充爆発しろ is a Christmas tradition online.',
          exampleJp: 'リア充は今日も忙しそうだ。',
          exampleReading: 'リアじゅうはきょうもいそがしそうだ。',
          exampleEn: 'The people with real lives look busy again today.'
        },
        {
          front: 'ぼっち',
          reading: 'ぼっち',
          back: 'a loner; on your own',
          pos: 'noun (slang)',
          notes:
            'Clipped from 一人ぼっち. Usually self-deprecating rather than cruel: ぼっち飯 = eating alone, ぼっち参加 = turning up solo.',
          exampleJp: '今日も昼はぼっちだった。',
          exampleReading: 'きょうもひるはぼっちだった。',
          exampleEn: 'I ate lunch on my own again today.'
        },
        {
          front: '情弱',
          reading: 'じょうじゃく',
          back: 'someone who does not do their research',
          pos: 'noun (slang)',
          notes:
            'Clipped from 情報弱者, "information weak". A real insult — it says you got ripped off because you never checked. 情弱乙 is the classic board sneer.',
          exampleJp: '調べずに買うと情弱扱いされる。',
          exampleReading: 'しらべずにかうとじょうじゃくあつかいされる。',
          exampleEn: 'Buy without researching and people will call you a sucker.'
        },
        {
          front: '炎上',
          reading: 'えんじょう',
          back: 'a pile-on; being flamed into the ground',
          pos: 'noun (suru-verb)',
          notes:
            'Literally "going up in flames" — a post draws thousands of angry replies. Now standard enough for TV news to use it straight.',
          exampleJp: '軽率な発言で炎上した。',
          exampleReading: 'けいそつなはつげんでえんじょうした。',
          exampleEn: 'A careless remark got him torn apart online.'
        },
        {
          front: 'ネタバレ',
          reading: 'ネタバレ',
          back: 'a spoiler',
          pos: 'noun',
          notes:
            'ネタ (material) + バレる (to leak out). ネタバレ注意 is the standard warning line above a post; ネタバレ厨 is someone who spoils on purpose.',
          exampleJp: 'ネタバレ注意、未プレイの人は見ないで。',
          exampleReading: 'ネタバレちゅうい、みプレイのひとはみないで。',
          exampleEn: 'Spoiler warning — do not read this if you have not played it.'
        },
        {
          front: 'ワンチャン',
          reading: 'ワンチャン',
          back: 'there is a chance; maybe, possibly',
          pos: 'expression (slang)',
          notes:
            'From "one chance", originally mahjong and poker. Now a general hedge in young speech and chat: ワンチャン行けるかも. Not for anything written formally.',
          exampleJp: 'ワンチャン天井前に出るかも。',
          exampleReading: 'ワンチャンてんじょうまえにでるかも。',
          exampleEn: 'There is an outside chance she drops before pity.'
        },
        {
          front: '陰キャ',
          reading: 'いんキャ',
          back: 'the gloomy, indoors type',
          pos: 'noun (slang)',
          notes:
            '陰 (shade) + キャラ; 陽キャ is the sunny extrovert opposite. Fine about yourself, rude about anyone else. School-age and online.',
          exampleJp: '学生の頃は完全に陰キャだった。',
          exampleReading: 'がくせいのころはかんぜんにいんキャだった。',
          exampleEn: 'At school I was a complete indoor kid.'
        },
        {
          front: '推し',
          reading: 'おし',
          back: 'your favourite; the one you back',
          pos: 'noun (slang)',
          notes:
            'From 推す, to push or recommend. 推しキャラ, 推しが尊い, 推し活 = the hobby of supporting them. Mainstream enough now for advertising.',
          exampleJp: '推しが実装されたので課金した。',
          exampleReading: 'おしがじっそうされたのでかきんした。',
          exampleEn: 'They added my favourite to the game, so I spent money.'
        },
        {
          front: '尊い',
          reading: 'とうとい',
          back: 'precious; blessed (too good to bear)',
          pos: 'i-adjective (slang)',
          notes:
            'The ordinary word means noble or sacred; fandom uses it for two characters being unbearably sweet together. Chat, fan art captions and nowhere formal.',
          exampleJp: 'この二人、尊い……。',
          exampleReading: 'このふたり、とうとい……。',
          exampleEn: 'These two are too precious for words.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Streaming and chat',
      cards: [
        {
          front: '実況',
          reading: 'じっきょう',
          back: 'live commentary; a let\'s play',
          pos: 'noun (suru-verb)',
          notes:
            'Originally sports play-by-play, now the standard word for a commentated playthrough. ゲーム実況 is the genre, 実況者 the person doing it.',
          exampleJp: 'ゲーム実況を見ながら飯を食う。',
          exampleReading: 'ゲームじっきょうをみながらめしをくう。',
          exampleEn: 'I eat while watching game commentary videos.'
        },
        {
          front: '配信',
          reading: 'はいしん',
          back: 'a stream; broadcasting online',
          pos: 'noun (suru-verb)',
          notes:
            'Covers streaming anything — video, music, a game. 配信者 = streamer, 配信中 = live now. Neutral and used in official announcements.',
          exampleJp: '今夜八時から配信します。',
          exampleReading: 'こんやはちじからはいしんします。',
          exampleEn: 'I will be streaming from eight tonight.'
        },
        {
          front: '生放送',
          reading: 'なまほうそう',
          back: 'a live broadcast',
          pos: 'noun',
          notes:
            'From television. Clipped to 生 (生で見る = watch it live) or 生配信; ニコ生 is Niconico\'s. The point is that nothing is edited.',
          exampleJp: '生放送だから編集できない。',
          exampleReading: 'なまほうそうだからへんしゅうできない。',
          exampleEn: 'It is live, so nothing can be edited out.'
        },
        {
          front: 'コメント',
          reading: 'コメント',
          back: 'a comment (in chat or under a video)',
          pos: 'noun (suru-verb)',
          notes:
            'On Niconico they scroll across the video itself. Clipped to コメ: コメ欄 = the comment section, コメント読み = reading them out on stream.',
          exampleJp: 'コメントありがとうございます。',
          exampleReading: 'コメントありがとうございます。',
          exampleEn: 'Thank you for the comments.'
        },
        {
          front: '投げ銭',
          reading: 'なげせん',
          back: 'a tip; a superchat',
          pos: 'noun',
          notes:
            'Literally "thrown coins", from street performers. スパチャ is the YouTube-specific word; 投げ銭 covers the whole idea across platforms.',
          exampleJp: '投げ銭で応援する。',
          exampleReading: 'なげせんでおうえんする。',
          exampleEn: 'Support them with a tip.'
        },
        {
          front: '切り抜き',
          reading: 'きりぬき',
          back: 'a clip (a short cut out of a long stream)',
          pos: 'noun',
          notes:
            'Originally a newspaper clipping. 切り抜き師 = a clipper, 切り抜きチャンネル = a clips channel — most VTuber fandoms run on them.',
          exampleJp: '切り抜きだけ見て本編は見てない。',
          exampleReading: 'きりぬきだけみてほんぺんはみてない。',
          exampleEn: 'I only watch the clips, never the full streams.'
        },
        {
          front: '荒らし',
          reading: 'あらし',
          back: 'a troll; someone wrecking the chat',
          pos: 'noun',
          notes:
            'From 荒らす, to lay waste. 荒らしはスルー — ignore the trolls — is the oldest rule of the Japanese internet.',
          exampleJp: '荒らしはブロックしてください。',
          exampleReading: 'あらしはブロックしてください。',
          exampleEn: 'Please block the trolls.'
        },
        {
          front: '視聴者',
          reading: 'しちょうしゃ',
          back: 'a viewer',
          pos: 'noun',
          notes:
            'Formal register borrowed from broadcasting — a streamer addresses 視聴者の皆さん. Safe in any context, unlike most of this deck.',
          exampleJp: '視聴者からの質問に答える。',
          exampleReading: 'しちょうしゃからのしつもんにこたえる。',
          exampleEn: 'Answering questions from viewers.'
        },
        {
          front: '同接',
          reading: 'どうせつ',
          back: 'concurrent viewers',
          pos: 'noun (slang)',
          notes:
            'Clipped from 同時接続数. The number streamers and their fans argue about: 同接一万超え. Fan and industry shorthand, not formal writing.',
          exampleJp: '同接が一万人を超えた。',
          exampleReading: 'どうせつがいちまんにんをこえた。',
          exampleEn: 'The concurrent viewer count passed ten thousand.'
        },
        {
          front: 'アーカイブ',
          reading: 'アーカイブ',
          back: 'the recording left up after a stream',
          pos: 'noun',
          notes:
            'アーカイブを残す = to leave the video up; アーカイブ無し means it disappears, which is why people rush to watch live.',
          exampleJp: 'アーカイブは残さない予定です。',
          exampleReading: 'アーカイブはのこさないよていです。',
          exampleEn: 'I do not plan to leave the recording up.'
        },
        {
          front: '高評価',
          reading: 'こうひょうか',
          back: 'a like (a thumbs-up)',
          pos: 'noun',
          notes:
            'The Japanese YouTube button; 低評価 is the dislike. 高評価よろしく is the standard sign-off at the end of a video.',
          exampleJp: '高評価とチャンネル登録お願いします。',
          exampleReading: 'こうひょうかとチャンネルとうろくおねがいします。',
          exampleEn: 'Please like and subscribe.'
        },
        {
          front: '待機',
          reading: 'たいき',
          back: 'waiting (in the pre-stream holding room)',
          pos: 'noun (suru-verb)',
          notes:
            '待機所 or 待機画面 is the screen before a stream starts, where chat simply posts 待機. Ordinary Japanese for standing by.',
          exampleJp: '配信前から待機してる。',
          exampleReading: 'はいしんまえからたいきしてる。',
          exampleEn: 'I have been waiting here since before the stream started.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Reactions and reviews',
      cards: [
        {
          front: '神ゲー',
          reading: 'かみゲー',
          back: 'an incredible game',
          pos: 'noun (slang)',
          notes:
            '神 (god) + ゲー. The 神〜 prefix is productive: 神回, 神対応, 神曲. Casual praise, fine anywhere fans are talking.',
          exampleJp: '今年一番の神ゲーだった。',
          exampleReading: 'ことしいちばんのかみゲーだった。',
          exampleEn: 'The best game of the year, hands down.'
        },
        {
          front: 'クソゲー',
          reading: 'クソゲー',
          back: 'a garbage game',
          pos: 'noun (slang)',
          notes:
            'クソ (crap) + ゲー, also written 糞ゲー. Crude but extremely common. The opposite of 神ゲー; 無理ゲー is one that simply cannot be won.',
          exampleJp: '操作性が最悪でクソゲーだった。',
          exampleReading: 'そうさせいがさいあくでクソゲーだった。',
          exampleEn: 'The controls were awful — a total garbage game.'
        },
        {
          front: '課金',
          reading: 'かきん',
          back: 'spending money in a game',
          pos: 'noun (suru-verb)',
          notes:
            'Strictly it means levying a charge, but players use it for paying: 課金する. 重課金 is whaling, 廃課金 the extreme end of it.',
          exampleJp: '今月は一円も課金していない。',
          exampleReading: 'こんげつはいちえんもかきんしていない。',
          exampleEn: 'I have not spent a single yen this month.'
        },
        {
          front: '無課金',
          reading: 'むかきん',
          back: 'free-to-play (spending nothing)',
          pos: 'noun',
          notes:
            'Worn as a badge of pride: 無課金勢, 無課金でクリアした. 微課金 is spending just a little.',
          exampleJp: '無課金でも十分楽しめる。',
          exampleReading: 'むかきんでもじゅうぶんたのしめる。',
          exampleEn: 'It is plenty of fun even without paying.'
        },
        {
          front: '鬼畜',
          reading: 'きちく',
          back: 'brutally hard; sadistic',
          pos: 'noun (slang)',
          notes:
            'Literally "demon beast". 鬼畜難易度 is a punishing difficulty. Careful — the word also names a nasty adult-VN genre, so context carries a lot here.',
          exampleJp: 'この難易度は鬼畜すぎる。',
          exampleReading: 'このなんいどはきちくすぎる。',
          exampleEn: 'This difficulty is downright sadistic.'
        },
        {
          front: '沼る',
          reading: 'ぬまる',
          back: 'to sink into a money-and-time pit',
          pos: 'verb (slang)',
          notes:
            'From 沼, a swamp. ガチャで沼る = the pulls will not come, so you keep going. Also used warmly of a hobby you fell into: 沼にハマる.',
          exampleJp: 'このゲームは絶対沼るぞ。',
          exampleReading: 'このゲームはぜったいぬまるぞ。',
          exampleEn: 'This game will absolutely swallow you whole.'
        },
        {
          front: '作業ゲー',
          reading: 'さぎょうゲー',
          back: 'a grindfest (a game that is mostly chores)',
          pos: 'noun (slang)',
          notes:
            '作業 (routine work) + ゲー. Mild criticism only — plenty of players like them: 作業ゲーだけど嫌いじゃない.',
          exampleJp: '終盤はただの作業ゲーだ。',
          exampleReading: 'しゅうばんはただのさぎょうゲーだ。',
          exampleEn: 'The endgame is nothing but busywork.'
        },
        {
          front: '運ゲー',
          reading: 'うんゲー',
          back: 'a luck-based game (skill barely matters)',
          pos: 'noun (slang)',
          notes:
            '運 (luck) + ゲー, said bitterly after a loss: 完全に運ゲー. The complimentary opposite is 実力ゲー.',
          exampleJp: 'このカードゲームは運ゲーだ。',
          exampleReading: 'このカードゲームはうんゲーだ。',
          exampleEn: 'This card game comes down to luck.'
        },
        {
          front: '神回',
          reading: 'かみかい',
          back: 'an outstanding episode',
          pos: 'noun (slang)',
          notes:
            'Used for anime episodes and stream sessions alike: 今週は神回だった. 回 is the same counter used for episode numbers.',
          exampleJp: '今週のアニメは神回だった。',
          exampleReading: 'こんしゅうのアニメはかみかいだった。',
          exampleEn: "This week's episode was incredible."
        },
        {
          front: '泣きゲー',
          reading: 'なきゲー',
          back: 'a visual novel built to make you cry',
          pos: 'noun',
          notes:
            'A recognised VN genre, with Key\'s work as the reference point. Sibling terms: 鬱ゲー (a bleak one) and 笑いゲー.',
          exampleJp: '泣きゲーの代表作と言われている。',
          exampleReading: 'なきゲーのだいひょうさくといわれている。',
          exampleEn: 'It is called the definitive tearjerker VN.'
        },
        {
          front: '神対応',
          reading: 'かみたいおう',
          back: 'an outstanding response (from a developer or a creator)',
          pos: 'noun (slang)',
          notes:
            'A studio that apologises properly and compensates everyone earns 神対応; クソ対応 is the reverse. Also said of shop staff and idols meeting fans.',
          exampleJp: '運営の神対応で炎上が収まった。',
          exampleReading: 'うんえいのかみたいおうでえんじょうがおさまった。',
          exampleEn: 'The developers handled it so well that the outrage died down.'
        },
        {
          front: '実績',
          reading: 'じっせき',
          back: 'achievements; a track record',
          pos: 'noun',
          notes:
            'What Steam calls achievements in Japanese; PlayStation says トロフィー instead. Also ordinary business Japanese for a proven record of results.',
          exampleJp: '実績を全部解除した。',
          exampleReading: 'じっせきをぜんぶかいじょした。',
          exampleEn: 'I unlocked every achievement.'
        }
      ]
    }
  ]
}
