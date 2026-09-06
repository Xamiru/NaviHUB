import type { LearningUnit } from '../learningEvidence'

export interface JapaneseTransferUnit extends LearningUnit {
  production: string
  criteria: string[]
}
const e = (id: string, prompt: string, answers: string[], explanation: string) => ({ id, prompt, answers, explanation })
const criteria = [
  'I wrote a first draft before looking at examples or using a dictionary.',
  'I checked that my response addresses this situation, not the memorized model situation.',
  'I recorded a revision and the help I needed; remaining uncertainty is explicit.'
]

// These narrow tasks check an explicitly requested form, never the naturalness
// of a whole utterance. The separate production task is explicitly self-assessed.
export const JP_OUTPUT_TRANSFER: Record<string, JapaneseTransferUnit> = {
  'build-state': {
    id: 'build-state-transfer', title: 'Transfer: topics and possession',
    body: 'A topic marked with は tells the listener what the comment concerns. の links an owner to a noun. For example, “田中さんの傘です” identifies an umbrella belonging to Tanaka. You do not need to repeat 私は when the speaker is already obvious. The following gaps deliberately constrain one form; they do not grade complete Japanese.',
    practice: [e('state-p1', 'Fill only the particle: これ___私のペンです。 (As for this, it is my pen.)', ['は'], 'は marks the topic of the comment.'), e('state-p2', 'Fill only the particle: 田中さん___傘です。 (It is Tanaka’s umbrella.)', ['の'], 'の links the possessor to the possessed noun.')],
    transfer: [e('state-t1', 'At a lost-property counter: それ___山田さんのかばんです。 Fill the topic particle.', ['は'], 'The new situation still uses は to introduce what is being identified.'), e('state-t2', 'Identify an owner: 先生___時計です。 Fill only the particle meaning possession.', ['の'], 'The same possession relationship applies to a teacher’s watch.')],
    production: 'At a lost-property counter, identify a bag as your friend’s, then explain that the umbrella is not yours. Write your first draft and a revision, naming any help used.', criteria
  },
  'build-actions': {
    id: 'build-actions-transfer', title: 'Transfer: action location and destination',
    body: 'で marks the place where an action occurs: 公園で走ります. に or へ can mark a destination: 公園に行きます. を marks an object, as in 本を読みます. A place word alone does not decide the particle; identify what the verb is doing.',
    practice: [e('actions-p1', 'Fill only the particle: 図書館___勉強します。 (Study at the library.)', ['で'], 'Studying occurs at the library, so use で.'), e('actions-p2', 'Fill only the destination particle: 学校___行きます。', ['に', 'へ'], 'に or へ can mark where someone goes.')],
    transfer: [e('actions-t1', 'You will eat at a restaurant: レストラン___食べます。 Fill one particle.', ['で'], 'Eating is the action carried out at this place.'), e('actions-t2', 'You will travel to a station: 駅___行きます。 Fill one particle.', ['に', 'へ'], 'The station is the destination, not the site of another action.')],
    production: 'Tell a classmate where you will go tomorrow and what you will do there. Use two different locations from the models and distinguish movement from the action at the destination.', criteria
  },
  'transform-time': {
    id: 'transform-time-transfer', title: 'Transfer: polite past and unfinished actions',
    body: 'For a polite past action, change ます to ました: 読みます becomes 読みました. A negative past uses ませんでした. まだ with a negative states that an expected event has not occurred yet. This contrasts with もう with a completed event. Keep the time word and verb consistent.',
    practice: [e('time-p1', 'Change 読みます to its polite affirmative past form. Answer only the verb.', ['読みました', 'よみました'], 'Replace ます with ました.'), e('time-p2', 'Fill まだ or もう: ___終わっていません。 (It has not finished yet.)', ['まだ'], 'まだ pairs with the negative here to mean not yet.')],
    transfer: [e('time-t1', 'Report yesterday’s shopping. Change 買います to the polite affirmative past.', ['買いました', 'かいました'], '買います uses the same ます to ました change.'), e('time-t2', 'A delivery has not arrived yet: ___届いていません。 Fill まだ or もう.', ['まだ'], 'The expected delivery remains incomplete, so use まだ with the negative.')],
    production: 'Tell someone about one errand you finished yesterday and one task you have not finished yet. Do not reuse the anime or reading examples.', criteria
  },
  'respond-needs': {
    id: 'respond-needs-transfer', title: 'Transfer: ask for conversational repair',
    body: 'もう一度お願いします asks for repetition. もう少しゆっくり話してください asks for slower speech. どういう意味ですか asks about intended meaning. Choose the request that addresses the actual difficulty rather than repeating a stock phrase.',
    practice: [e('needs-p1', 'You did not hear a sentence. Fill the number word: もう___お願いします。 (One more time.)', ['一度', 'いちど'], '一度 is one time; もう一度 asks for another repetition.'), e('needs-p2', 'Fill the missing word: どういう___ですか。 (What does that mean?)', ['意味', 'いみ'], '意味 asks for meaning, rather than slower delivery.')],
    transfer: [e('needs-t1', 'The station clerk speaks too quickly. Fill the adverb meaning slowly: もう少し___話してください。', ['ゆっくり'], 'ゆっくり targets the speed problem.'), e('needs-t2', 'You heard the words but not the meaning: それはどういう___ですか。 Fill only the noun.', ['意味', 'いみ'], 'Ask for meaning when repeating the same sounds would not resolve the problem.')],
    production: 'At a station, first ask a fast-speaking clerk to slow down, then ask what an unfamiliar instruction means. Explain why these are different repair requests.', criteria
  },
  'respond-opinion': {
    id: 'respond-opinion-transfer', title: 'Transfer: reasons and changing qualities',
    body: 'から or ので can connect a reason to a conclusion. An い-adjective changes い to く before なる: 安い becomes 安くなります, “becomes cheaper”. A な-adjective uses に: 静かになります. Keep the claim and its reason distinct.',
    practice: [e('opinion-p1', 'Complete with the form of 高い before なります: ___なります。 (Becomes more expensive.)', ['高く', 'たかく'], 'An い-adjective changes final い to く before なる.'), e('opinion-p2', 'Use から to connect the reason: 便利です___、毎日使います。 Fill only the connector.', ['から'], '便利です supplies the reason for daily use.')],
    transfer: [e('opinion-t1', 'Complete with the form of 暖かい before なります: ___なります。 (Becomes warmer.)', ['暖かく', 'あたたかく'], 'This new adjective follows the same い to く change.'), e('opinion-t2', 'Complete using the particle before なる: 静か___なりました。', ['に'], '静か is a な-adjective, which takes に before なる.')],
    production: 'Recommend a place to study. Give a reason, then explain how it changes at a different time of day. Use a concrete observation rather than only 好きです.', criteria
  },
  'roleplay-shop': {
    id: 'roleplay-shop-transfer', title: 'Transfer: requests and corrections',
    body: 'A て-form plus ください makes a request: 見せてください, “please show me”. A negative request uses the ない-form plus でください: 入れないでください, “please do not put it in”. Differentiate not wanting an item from asking the other person not to perform an action.',
    practice: [e('shop-p1', 'Complete the negative request: 砂糖を入れない___ください。 Fill only the connector.', ['で'], 'ないでください is the negative request pattern.'), e('shop-p2', 'Fill the request word: メニューを見せて___。', ['ください'], 'てください asks someone to perform the action.')],
    transfer: [e('shop-t1', 'A parcel must not be opened: 開けない___ください。 Fill only the connector.', ['で'], 'The same negative request pattern transfers to opening a parcel.'), e('shop-t2', 'Ask someone to write a name: 名前を書いて___。 Fill the request word.', ['ください'], 'The verb changes, but the request construction stays てください.')],
    production: 'In a shop, ask to see a different size, explain that the first one is too small, and politely refuse a bag. Write three turns without copying the café models.', criteria
  },
  'roleplay-friend': {
    id: 'roleplay-friend-transfer', title: 'Transfer: negotiate another plan',
    body: 'ませんか offers a polite invitation: 一緒に行きませんか. A refusal can name a constraint and suggest another time. なら can set a condition or pick up the other person’s proposal: 日曜日なら大丈夫です. A useful reply advances the plan instead of simply saying no.',
    practice: [e('friend-p1', 'Complete the invitation ending: 一緒に行き___。 Use ませんか.', ['ませんか'], 'A negative question can invite rather than describe a refusal.'), e('friend-p2', 'Fill なら: 日曜日___大丈夫です。', ['なら'], 'The acceptance is conditional on Sunday.')],
    transfer: [e('friend-t1', 'Invite someone to eat: 一緒に食べ___。 Supply the polite invitation ending.', ['ませんか'], '食べませんか applies the same invitation to a new action.'), e('friend-t2', 'You are available after six: 六時から___大丈夫です。 Supply the conditional connector.', ['なら'], 'なら accepts the proposed plan under the specified time condition.')],
    production: 'A friend suggests a Saturday morning museum visit. You work then, but Sunday afternoon is free. Refuse gently, propose the alternative, and ask whether it works.', criteria
  },
  'roleplay-media': {
    id: 'roleplay-media-transfer', title: 'Transfer: attribute a view and preserve uncertainty',
    body: 'と思います presents a thought: 主人公は戻ると思います. かもしれません marks a possibility rather than certainty: 戻らないかもしれません. Do not turn an interpretation into a fact just because it sounds plausible. Cite the scene that led you to it.',
    practice: [e('media-p1', 'Fill the quotation particle: 主人公は戻る___思います。', ['と'], 'と marks the content of the thought.'), e('media-p2', 'Complete with the ending meaning might: 嘘かも___。 Use polite しれません.', ['しれません'], 'かもしれません marks a possibility.')],
    transfer: [e('media-t1', 'Express a prediction about weather: 明日は晴れる___思います。 Fill one particle.', ['と'], 'The quotation structure applies to thoughts about a different domain.'), e('media-t2', 'Complete a tentative prediction: 遅れるかも___。 Use the same polite possibility ending.', ['しれません'], 'This says a delay is possible, not certain.')],
    production: 'A character returns a letter without opening it. Offer one interpretation, name the observed evidence, and acknowledge another possible interpretation. Do not invent later events.', criteria
  },
  'write-retell': {
    id: 'write-retell-transfer', title: 'Transfer: preserve event order',
    body: '前に follows a dictionary-form verb: 出かける前に, “before going out”. 後で follows a past-form verb: 帰った後で, “after returning”. A retell should distinguish sequence from cause; two events occurring in order does not itself establish why one happened.',
    practice: [e('retell-p1', 'Fill the form of 食べる before 前に: ___前に手を洗います。', ['食べる', 'たべる'], 'Use dictionary form before 前に.'), e('retell-p2', 'Fill the past form of 食べる before 後で: ___後で帰ります。', ['食べた', 'たべた'], 'Use the past form before 後で.')],
    transfer: [e('retell-t1', 'Use the correct form of 寝る: ___前に日記を書きます。', ['寝る', 'ねる'], 'Dictionary form marks the event before which something happens.'), e('retell-t2', 'Use the correct form of 見る: 映画を___後で話しました。', ['見た', 'みた'], 'The completed viewing precedes the later conversation.')],
    production: 'Retell only these facts in four sentences: a student missed a bus, walked to school, arrived after class started, and apologized. Do not invent why the bus was missed. Separate sequence from any inference.', criteria
  },
  'write-opinion': {
    id: 'write-opinion-transfer', title: 'Transfer: concession and evidence',
    body: '確かに can acknowledge a point before a qualification with しかし. For example, “確かに便利です。しかし、費用が高いです” concedes convenience while noting cost. 一方で presents another side. An opinion becomes more useful when its supporting example is specific and its conclusion stays within that evidence.',
    practice: [e('write-opinion-p1', 'Fill the contrast word しかし: 確かに安いです。___、時間がかかります。', ['しかし'], 'The second sentence qualifies the acknowledged advantage.'), e('write-opinion-p2', 'Answer fact or opinion in English: この方法が一番いいと思います。', ['opinion'], 'と思います frames an evaluation as the speaker’s opinion.')],
    transfer: [e('write-opinion-t1', 'Fill an acknowledgement phrase meaning certainly: ___便利ですが、誰にでも必要なわけではありません。', ['確かに', 'たしかに', 'もちろん'], 'Acknowledging an advantage does not require claiming it applies universally. Other natural wording may also be valid; this is a narrow authored check.'), e('write-opinion-t2', 'Answer fact or opinion in English: 私は紙の本のほうが読みやすいと思います。', ['opinion'], 'The sentence reports a personal comparison, not a universal property of books.')],
    production: 'Argue for paper or digital notes in five sentences. Include one concession, one concrete example from the task, and a limitation. Label anything you cannot substantiate as your view.', criteria
  }
}
