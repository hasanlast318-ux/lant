/* ==========================================
المسار الذكي التفاعلي (محاكاة كاملة للتطبيق)
========================================== */
const initSmartPath = () => {
const phone = $('#sp-phone');
if (!phone) return;
const hasAr = (s) => /[\u0600-\u06FF]/.test(s);
const TOPIC_AR = {
'Alphabet': 'الحروف الأبجدية', 'Phonics': 'الأصوات التأسيسية', 'Numbers': 'الأرقام', 'Greetings': 'التحيات والترحيب', 'Colors': 'الألوان',
'Sentence Structure': 'تركيب الجملة', 'Articles and Nouns': 'أدوات التعريف والأسماء', 'Tense Usage': 'استخدام الأزمنة', 'Modals': 'الأفعال الناقصة', 'Conditionals': 'الجمل الشرطية', 'Passive Voice': 'المبني للمجهول', 'Advanced Grammar': 'قواعد متقدمة',
'Present Simple': 'المضارع البسيط', 'Past Simple': 'الماضي البسيط', 'Future': 'المستقبل', 'Present Continuous': 'المضارع المستمر', 'Past Continuous': 'الماضي المستمر', 'Present Perfect': 'المضارع التام',
'Word Order': 'ترتيب الكلمات', 'Questions': 'صياغة الأسئلة', 'Negatives': 'النفي', 'Conjunctions': 'أدوات الربط', 'Relative Clauses': 'وصلات الموصول',
'Nouns': 'الأسماء', 'Verbs': 'الأفعال', 'Adjectives': 'الصفات', 'Adverbs': 'الظروف', 'Prepositions': 'حروف الجر', 'Pronouns': 'الضمائر', 'Articles': 'أدوات التعريف',
'Family': 'مفردات العائلة', 'Food': 'الطعام', 'Travel': 'السفر', 'Work': 'العمل', 'Education': 'التعليم', 'Health': 'الصحة', 'Shopping': 'التسوق',
'Reading Comprehension': 'الفهم القرائي', 'Short Stories': 'القصص القصيرة', 'Inference': 'الاستنتاج', 'Main Idea': 'الفكرة الرئيسية',
'Listening Comprehension': 'الفهم السمعي', 'Following Instructions': 'اتباع التعليمات', 'Social Conversations': 'المحادثات الاجتماعية',
'Social Interaction': 'التفاعل الاجتماعي', 'Daily Conversation': 'المحادثة اليومية', 'Asking Questions': 'طرح الأسئلة', 'Introductions': 'التعارف', 'Professional Interaction': 'التفاعل المهني', 'Small Talk': 'الحديث الودي', 'Conversation Strategies': 'استراتيجيات المحادثة', 'Diplomacy': 'الدبلوماسية', 'Empathy': 'التعاطف',
'Email Writing': 'كتابة الإيميلات', 'Short Essays': 'المقالات القصيرة', 'Sentence Construction': 'بناء الجمل', 'Formal Writing': 'الكتابة الرسمية'
};
const Q = (level, skill, q, options, answer) => ({ level, skill, q, options, answer });
const SECTIONS = [
{ id: 'basics', icon: 'ABC', pro: false, title: 'الأساسيات والتأسيس <span dir="ltr">(Basics & Foundations)</span>',
desc: 'سنختبر مهاراتك في الحروف الأبجدية، الأصوات التأسيسية، الأرقام، والألوان. هذا الاختبار سيحدد مدى إتقانك للقواعد الأساسية التي يبنى عليها كل شيء! 🧱✨',
questions: [
Q('A1','Alphabet',"اختر الحرف الصغير (Lowercase) المطابق للحرف الكبير 'G':",['q','g','j','d'],1),
Q('A1','Alphabet',"اختر الحرف الكبير (Uppercase) المطابق للحرف الصغير 'b':",['D','P','B','Q'],2),
Q('A1','Numbers',"ما معنى الكلمة 'Three'؟",['2','3','4','5'],1),
Q('A1','Colors',"ما هو لون 'Red'؟",['أزرق','أحمر','أخضر','أصفر'],1),
Q('A1','Greetings',"كيف تقول 'صباح الخير' بالإنجليزية؟",['Good night','Good morning','Goodbye','Good luck'],1),
Q('A2','Numbers',"كيف تكتب العدد 12 بالإنجليزية؟",['twenty','twelve','two','ten'],1),
Q('A2','Colors',"أكمل: 'The sky is ___.",['green','blue','pink','brown'],1),
Q('A2','Greetings',"ما الرد المناسب على 'How are you?'؟",["I'm fine, thank you.",'My name is Sara.',"It's a book.",'Yes, please.'],0),
Q('A2','Phonics',"أي كلمة تبدأ بصوت /b/؟",['cat','bat','sat','mat'],1),
Q('A2','Alphabet',"أي حرف يأتي أولاً في الترتيب الأبجدي؟",['S','A','M','F'],1),
Q('B1','Numbers',"كيف تكتب العدد 100؟",['one hundred','one thousand','ten','hundred one'],0),
Q('B1','Colors',"ما معنى 'Dark blue'؟",['أزرق فاتح','أزرق غامق','أخضر غامق','رمادي'],1),
Q('B1','Greetings',"أي تحية تستخدم في المساء عند اللقاء؟",['Good morning','Good evening','Good night','Goodbye'],1),
Q('B1','Phonics',"أي كلمة تحتوي على صوت /ʃ/ (sh)؟",['ship','chip','zip','tip'],0),
Q('B1','Alphabet',"أي حرف يأتي مباشرة بعد 'M'؟",['L','N','O','K'],1),
Q('B2','Numbers',"كيف تقرأ العدد 1,000,000؟",['a billion','a million','a thousand','a hundred'],1),
Q('B2','Colors',"ما معنى العبارة 'She was green with envy'؟",['كانت مريضة','كانت شديدة الحسد','كانت سعيدة','كانت حزينة'],1),
Q('B2','Phonics',"أي كلمة يحتوي نطقها على حرف e صامت؟",['make','mad','men','pet'],0),
Q('B2','Greetings',"كيف تبدأ رسالة رسمية لشخص لا تعرفه؟",['Hey!','Dear Mr. Smith,',"What's up?",'Yo!'],1),
Q('B2','Numbers',"ما الترتيب الصحيح لكلمة 'Second'؟",['1st','2nd','3rd','4th'],1),
Q('C1','Colors',"ما معنى العبارة 'Once in a blue moon'؟",['كثيراً','نادراً جداً','كل شهر','بسرعة'],1),
Q('C1','Numbers',"كم تعني عبارة 'A couple of' عادة؟",['واحد','اثنان','خمسة','عشرة'],1),
Q('C1','Phonics',"أي كلمة تحتوي على صوت /θ/؟",['think','this','that','they'],0),
Q('C1','Greetings',"ما معنى 'Please convey my regards to your family'؟",['أبلغ تحياتي لعائلتك','ودّع عائلتك','اسأل عن عائلتك','زر عائلتك'],0),
Q('C1','Alphabet',"أي كلمة تأتي أولاً في الترتيب الأبجدي؟",['apple','angle','anchor','angry'],2),
Q('C2','Colors',"ما معنى 'To pass with flying colors'؟",['يفشل بشدة','ينجح بتفوق','يسافر كثيراً','يرتدي ألواناً زاهية'],1),
Q('C2','Numbers',"ما معنى 'A myriad of'؟",['عدد قليل','عدد هائل','لا شيء','زوجان'],1),
Q('C2','Phonics',"أي كلمة يُنطق فيها 'gh' بصوت /f/؟",['though','enough','eight','high'],1),
Q('C2','Greetings',"اختر الخاتمة الأكثر رسمية لرسالة عمل:",['Cheers,','Best regards,','Bye!','See ya!'],1),
Q('C2','Alphabet',"اختر الكلمة المكتوبة إملائياً بشكل صحيح:",['recieve','receive','receeve','reseive'],1)
]},
{ id: 'grammar', icon: 'fa-wand-magic-sparkles', pro: true, title: 'إتقان القواعد <span dir="ltr">(Grammar Mastery)</span>',
desc: 'أتقن الهيكل التأسيسي للغة الإنجليزية! سنقيس قدرتك في القواعد الشاملة من التأسيس إلى الاحتراف لتأهيلك لبناء جمل سليمة وخالية من الأخطاء! 📐✨',
questions: [
Q('A1','Sentence Structure','اختر الجملة الصحيحة:',['She is happy.','She happy.','Is she happy.','Happy she.'],0),
Q('A1','Articles and Nouns',"أكمل: '___ apple'.",['a','an','two','بدون أداة'],1),
Q('A1','Articles and Nouns',"اختر الجمع الصحيح لكلمة 'cat':",['cats','cates','caties','cat'],0),
Q('A1','Sentence Structure',"أكمل: 'I ___ a student.'",['is','am','are','be'],1),
Q('A1','Tense Usage',"أكمل: 'She ___ to school every day.'",['go','goes','going','gone'],1),
Q('A2','Tense Usage',"أكمل: 'They ___ football yesterday.'",['play','played','playing','plays'],1),
Q('A2','Articles and Nouns',"أكمل: 'I saw ___ elephant at the zoo.'",['a','an','any','بدون أداة'],1),
Q('A2','Sentence Structure','اختر السؤال الصحيح:',['Where you live?','Where do you live?','Where does you live?','Where lives you?'],1),
Q('A2','Modals',"أكمل: 'You ___ smoke here. It's forbidden.'",["mustn't","don't have to",'can','may'],0),
Q('A2','Articles and Nouns',"اختر الجمع الصحيح لكلمة 'child':",['childs','children','childes','childrens'],1),
Q('B1','Conditionals',"أكمل: 'If it rains, we ___ at home.'",['stay','will stay','stayed','would stay'],1),
Q('B1','Passive Voice',"أكمل: 'The letter ___ yesterday.'",['was sent','is sent','sent','has sent'],0),
Q('B1','Tense Usage',"أكمل: 'I have lived here ___ 2015.'",['for','since','from','at'],1),
Q('B1','Modals',"أكمل: 'You ___ be tired after such a long trip.'",['must',"can't","shouldn't","mustn't"],0),
Q('B1','Sentence Structure',"أكمل: 'Neither of the answers ___ correct.'",['is','are','were','be'],0),
Q('B2','Conditionals',"أكمل: 'If I ___ you, I would apologize.'",['am','was','were','be'],2),
Q('B2','Passive Voice',"أكمل: 'The bridge ___ by next year.'",['will have been completed','will complete','has completed','is completing'],0),
Q('B2','Tense Usage',"أكمل: 'By the time we arrived, the film ___.",['had started','has started','started','starts'],0),
Q('B2','Modals',"أكمل: 'You ___ have seen him; he is abroad.'",["mustn't","can't","shouldn't","wouldn't"],1),
Q('B2','Advanced Grammar',"أكمل: 'Hardly ___ the house when it started to rain.'",['I had left','had I left','I left','did I left'],1),
Q('C1','Conditionals',"أكمل: '___, I would have told you.'",['If I knew','Had I known','If I have known','If I would know'],1),
Q('C1','Advanced Grammar',"أكمل: 'It's high time you ___ harder.'",['study','studied','have studied','studying'],1),
Q('C1','Passive Voice',"أكمل: 'He is said ___ the best doctor in town.'",['to be','being','is','be'],0),
Q('C1','Sentence Structure',"أكمل: 'Not only ___ late, but he also forgot the files.'",['he was','was he','did he','he did'],1),
Q('C1','Modals',"أكمل: 'I'd rather you ___ smoke inside.'",["don't","didn't","won't",'not'],1),
Q('C2','Advanced Grammar',"أكمل: '___ had we reached the station than the train left.'",['No sooner','Hardly','Scarcely','Barely'],0),
Q('C2','Advanced Grammar',"أكمل: 'Be that as it ___, we must continue.'",['may','might','will','would'],0),
Q('C2','Conditionals',"أكمل: '___ your help, we would have failed.'",['But for','Unless','Lest','Whether'],0),
Q('C2','Advanced Grammar','اختر الصياغة الصحيحة الرسمية:',['Whom did you see?','Who did you see him?','Whom you saw?','Who you did see?'],0),
Q('C2','Advanced Grammar',"أكمل: 'The proposal was rejected out of ___.",['hand','mind','way','place'],0)
]},
{ id: 'tenses', icon: 'fa-clock-rotate-left', pro: true, title: 'الأزمنة <span dir="ltr">(Tenses)</span>',
desc: 'استعد لاختبار شامل في الأزمنة! سنقوم بتحليل مستواك في الماضي، المضارع، والمستقبل بكل أنواعهم (بسيط، مستمر، تام). لنعرف أين تكمن قوتك وأين تحتاج للدعم لتتحدث بطلاقة زمنية! ⏳🚀',
questions: [
Q('A1','Present Simple',"أكمل: 'He ___ tea every morning.'",['drinks','drink','drinking','is drink'],0),
Q('A1','Present Simple',"أكمل: 'The sun ___ in the east.'",['rise','rises','rising','rose'],1),
Q('A1','Past Simple',"أكمل: 'I ___ my friend yesterday.'",['visit','visited','visiting','visits'],1),
Q('A1','Future',"أكمل: 'I ___ you tomorrow.'",['call','will call','called','calling'],1),
Q('A1','Present Continuous',"أكمل: 'Look! It ___.",['rains','is raining','rain','rained'],1),
Q('A2','Past Continuous',"أكمل: 'They ___ TV when I called.'",['watched','were watching','watch','are watching'],1),
Q('A2','Present Perfect',"أكمل: 'I ___ my homework already.'",['finished','have finished','finish','finishing'],1),
Q('A2','Future',"أكمل: 'By 2030, robots ___ many jobs.'",['do','did','will do','doing'],2),
Q('A2','Present Simple',"أكمل: 'Water ___ at 100 degrees.'",['boils','is boiling','boil','boiled'],0),
Q('A2','Past Simple',"أكمل: 'She ___ born in 1990.'",['is','was','were','been'],1),
Q('B1','Present Perfect',"أكمل: 'She ___ in London since 2010.'",['lives','has lived','lived','is living'],1),
Q('B1','Past Continuous',"أكمل: 'I ___ dinner when the lights went out.'",['cooked','was cooking','cook','have cooked'],1),
Q('B1','Future',"أكمل: 'This time next week, I ___ on a beach.'",['lie','will be lying','will lie','lay'],1),
Q('B1','Present Perfect',"أكمل: 'I ___ that movie three times.'",['saw','have seen','see','am seeing'],1),
Q('B1','Present Continuous',"أكمل: 'He ___ English at the moment.'",['studies','is studying','study','studied'],1),
Q('B2','Present Perfect',"أكمل: 'They ___ for two hours.'",['have been running','ran','run','are running'],0),
Q('B2','Past Simple',"أكمل: 'I ___ him last week.'",['have seen','saw','see','have been seeing'],1),
Q('B2','Future',"أكمل: 'By June, she ___ her degree.'",['will finish','will have finished','finishes','is finishing'],1),
Q('B2','Past Continuous',"أكمل: 'While I ___, my brother was cooking.'",['studied','was studying','study','have studied'],1),
Q('B2','Present Simple',"أكمل: 'The train ___ at 9 PM sharp.'",['leaves','is leaving','leave','has left'],0),
Q('C1','Future',"أكمل: 'By next year, they ___ here for a decade.'",['will have been working','will work','work','are working'],0),
Q('C1','Present Perfect',"أكمل: 'It's the first time I ___ sushi.'",['ate','have eaten','eat','was eating'],1),
Q('C1','Future',"أكمل: 'I ___ English for ten years by next month.'",['will have been teaching','teach','taught','am teaching'],0),
Q('C1','Present Continuous',"أكمل: 'I ___ the dentist at 5 PM tomorrow.'",['see','am seeing','saw','have seen'],1),
Q('C1','Past Simple',"أكمل: 'She realized she ___ her keys.'",['loses','had lost','has lost','losing'],1),
Q('C2','Past Simple',"أكمل: 'It's about time he ___ responsibility.'",['takes','took','take','taking'],1),
Q('C2','Future',"أكمل: 'I ___ sooner if I had known.'",['would come','would have come','came','had come'],1),
Q('C2','Future',"أكمل: 'By this time tomorrow, I ___ to Paris.'",['will be flying','fly','flew','have flown'],0),
Q('C2','Present Perfect',"أكمل: 'He has never ___ such a beautiful sight.'",['seen','saw','see','seeing'],0),
Q('C2','Past Continuous',"أكمل: 'While the chef ___ the sauce, the guests arrived.'",['was preparing','prepares','prepared','has prepared'],0)
]},
{ id: 'structure', icon: 'fa-diagram-project', pro: true, title: 'تركيب الجملة <span dir="ltr">(Sentence Structure)</span>',
desc: 'بناء الجملة هو سر الاحتراف. سنختبر قدرتك على ترتيب الكلمات، صياغة الأسئلة، واستخدام أدوات الربط المعقدة. ستحصل على كورس يعلمك كيف تبني جملك كالمحترفين! 🏗️',
questions: [
Q('A1','Word Order','اختر الترتيب الصحيح:',['My name is Ali.','My is name Ali.','Name my is Ali.','Is my name Ali.'],0),
Q('A1','Negatives',"أكمل: 'I ___ like coffee.'",["don't","doesn't",'not','am not'],0),
Q('A1','Questions',"أكمل: '___ you from Yemen?'",['Are','Is','Am','Do'],0),
Q('A1','Word Order','اختر الترتيب الصحيح:',['She always drinks tea.','Always she drinks tea.','She drinks always tea.','Drinks she always tea.'],0),
Q('A1','Negatives',"أكمل: 'He ___ a car.'",["don't have","doesn't have",'not have',"isn't have"],1),
Q('A2','Questions',"أكمل: '___ does the movie start?'",['What','When','Who','Which'],1),
Q('A2','Word Order','اختر الترتيب الصحيح:',['I yesterday football played.','I played football yesterday.','Played I football yesterday.','Football I played yesterday.'],1),
Q('A2','Conjunctions',"أكمل: 'I stayed home ___ it was raining.'",['because','but','or','so'],0),
Q('A2','Relative Clauses',"أكمل: 'The man ___ called me was angry.'",['which','who','whose','where'],1),
Q('A2','Negatives',"أكمل: 'There ___ any milk in the fridge.'",["isn't","aren't","don't",'not'],0),
Q('B1','Word Order',"أكمل: 'Could you tell me ___?'",['where is the bank','where the bank is','the bank where is','is where the bank'],1),
Q('B1','Questions',"أكمل: '___ been to London?'",['Did you ever','Have you ever','Do you ever','Are you ever'],1),
Q('B1','Conjunctions',"أكمل: '___ he was tired, he finished the work.'",['Although','Because','Unless','Despite'],0),
Q('B1','Relative Clauses',"أكمل: 'This is the house ___ I was born.'",['which','who','where','when'],2),
Q('B1','Negatives',"أكمل: 'She ___ never ___ seafood.'",['has / tried','have / tried','did / tried','is / trying'],0),
Q('B2','Word Order',"أكمل: 'Not until midnight ___ home.'",['he came','did he come','came he','he did come'],1),
Q('B2','Conjunctions',"أكمل: 'I'll call you ___ I arrive.'",['as soon as','until','by the time','unless'],0),
Q('B2','Relative Clauses',"أكمل: 'The woman ___ bag was stolen called the police.'",['who','which','whose','whom'],2),
Q('B2','Questions',"أكمل: 'You didn't finish the report, ___?'",['did you',"didn't you",'do you','were you'],0),
Q('B2','Negatives',"أكمل: 'I have ___ been to Asia.'",['ever','never','yet','still'],1),
Q('C1','Word Order',"أكمل: 'Under no circumstances ___ the red button.'",['you press','should you press','press you','you should press'],1),
Q('C1','Conjunctions',"أكمل: '___ the rain, the match continued.'",['Although','Despite','However','Even'],1),
Q('C1','Relative Clauses',"أكمل: 'The results, ___ surprised everyone, were published.'",['that','which','who','what'],1),
Q('C1','Questions',"أكمل: 'Rarely ___ such talent.'",['we see','do we see','we do see','see we'],1),
Q('C1','Negatives',"أكمل: 'He denied ___ the money.'",['to steal','stealing','steal','stole'],1),
Q('C2','Word Order',"أكمل: 'So difficult ___ that nobody passed.'",['the exam was','was the exam','did the exam','the exam did'],1),
Q('C2','Conjunctions',"أكمل: '___ had I sat down than the phone rang.'",['Scarcely','No sooner','Hardly','Barely'],1),
Q('C2','Relative Clauses',"أكمل: 'He helped the poor, ___ was admirable.'",['that','which','who','what'],1),
Q('C2','Questions',"أكمل: 'I wonder ___ this precision.'",['how did they achieve','how they achieved','how they did achieve','how achieved they'],1),
Q('C2','Negatives',"أكمل: 'Not a single error ___ in the manuscript.'",['was found','found','was founded','did find'],0)
]},
{ id: 'parts_of_speech', icon: 'fa-shapes', pro: true, title: 'أقسام الكلام <span dir="ltr">(Parts of Speech)</span>',
desc: 'من الأسماء والأفعال إلى الصفات والظروف. سنحلل مدى تمييزك لأجزاء الكلام وكيفية استخدامها الصحيح. هدفنا أن نجعلك تتقن أدوات اللغة بدقة متناهية! 🧩💎',
questions: [
Q('A1','Nouns','أي كلمة تُعد اسماً (Noun)؟',['run','school','happy','quickly'],1),
Q('A1','Verbs','أي كلمة تُعد فعلاً (Verb)؟',['beautiful','eat','table','under'],1),
Q('A1','Adjectives','أي كلمة تُعد صفة (Adjective)؟',['slowly','tall','city','write'],1),
Q('A1','Prepositions',"أكمل: 'The cat is ___ the table.'",['on','is','run','happy'],0),
Q('A1','Pronouns',"أكمل: '___ is my friend.'",['He','Him','His',"He's"],0),
Q('A2','Adverbs',"أكمل: 'She sings ___.",['beautiful','beautifully','beauty','beautify'],1),
Q('A2','Articles',"أكمل: 'I need ___ umbrella.'",['a','an','two','بدون أداة'],1),
Q('A2','Nouns',"ما جمع كلمة 'mouse'؟",['mouses','mice','mices','mouse'],1),
Q('A2','Verbs',"ما الماضي من الفعل 'go'؟",['goed','went','gone','going'],1),
Q('A2','Pronouns',"أكمل: 'This book belongs to me. It is ___.",['my','mine','me','I'],1),
Q('B1','Prepositions',"أكمل: 'She is good ___ math.'",['in','at','on','with'],1),
Q('B1','Adjectives',"اختر صيغة المقارنة الصحيحة لكلمة 'good':",['gooder','better','best','more good'],1),
Q('B1','Adverbs',"أكمل: 'He drives ___ than his brother.'",['careful','more carefully','carefuller','carefully'],1),
Q('B1','Nouns','أي كلمة تُعد اسماً مجرداً (Abstract Noun)؟',['happiness','table','dog','apple'],0),
Q('B1','Verbs',"اختر التصريف الثالث للفعل 'write':",['wrote','written','writing','writes'],1),
Q('B2','Pronouns',"أكمل: '___ of the three answers is correct.'",['Neither','None','Both','Every'],1),
Q('B2','Prepositions',"أكمل: 'He insisted ___ paying the bill.'",['on','for','at','to'],0),
Q('B2','Adjectives',"أكمل: 'The results were ___.",['encouraging','encouraged','encourage','encouragement'],0),
Q('B2','Adverbs',"أكمل: '___, I don't agree with you.'",['Personal','Personally','Person','Personality'],1),
Q('B2','Articles',"أكمل: 'He is ___ honest man.'",['a','an','the','بدون أداة'],1),
Q('C1','Nouns',"أكمل: 'The committee ___ divided in their opinions.'",['was','were','is','be'],1),
Q('C1','Pronouns',"أكمل: 'One should do ___ best.'",['his','their',"one's",'its'],2),
Q('C1','Prepositions',"أكمل: 'She congratulated me ___ my promotion.'",['for','on','at','about'],1),
Q('C1','Nouns',"أكمل: 'The ___ of the situation surprised us.'",['sudden','suddenly','suddenness','suddennesses'],2),
Q('C1','Verbs',"أكمل: 'The news ___ shocking.'",['were','was','are','be'],1),
Q('C2','Adverbs',"أكمل: 'He ___ finished the marathon despite his injury.'",['hardly','scarcely','miraculously','barely'],2),
Q('C2','Prepositions',"أكمل: 'The deal fell ___ at the last minute.'",['out','through','off','apart'],1),
Q('C2','Pronouns',"أكمل: 'The culprit was none ___ than the butler.'",['other','else','more','less'],0),
Q('C2','Articles',"أكمل: 'She has ___ eye for detail.'",['a','an','the','بدون أداة'],1),
Q('C2','Verbs',"أكمل: 'It's essential that he ___ present.'",['is','be','being','been'],1)
]},
{ id: 'vocabulary', icon: 'fa-language', pro: true, title: 'المفردات والترجمة <span dir="ltr">(Vocabulary)</span>',
desc: 'اختبر حصيلتك اللغوية في أهم مجالات الحياة (العائلة، العمل، السفر...). سنقيس قدرتك على الترجمة الصحيحة واستحضار الكلمات المناسبة في كل سياق! 📚',
questions: [
Q('A1','Family',"ما معنى كلمة 'Mother'؟",['أب','أم','أخ','أخت'],1),
Q('A1','Food',"أي كلمة تعني 'خبز'؟",['milk','bread','cheese','juice'],1),
Q('A1','Travel',"ما معنى كلمة 'Airport'؟",['محطة قطار','مطار','ميناء','موقف حافلات'],1),
Q('A1','Family',"ما معنى كلمة 'Uncle'؟",['عم/خال','جدة','ابن','حفيد'],0),
Q('A1','Food',"ما معنى كلمة 'Apple'؟",['تفاحة','موزة','برتقالة','حبة عنب'],0),
Q('A2','Work',"أكمل: 'My father works in a hospital. He is a ___.",['teacher','doctor','driver','chef'],1),
Q('A2','Education',"أكمل: 'Students study in a ___.",['hospital','school','market','bank'],1),
Q('A2','Health',"أكمل: 'I have a headache. I feel ___.",['great','sick','happy','strong'],1),
Q('A2','Shopping',"أكمل: 'How much does this ___?'",['cost','pay','buy','sell'],0),
Q('A2','Travel',"أكمل: 'We stayed in a ___ near the beach.'",['hotel','hospital','library','office'],0),
Q('B1','Work',"أكمل: 'She was ___ to manager last month.'",['promoted','resigned','applied','retired'],0),
Q('B1','Education',"أكمل: 'You must ___ the exam to pass.'",['fail','take','skip','miss'],1),
Q('B1','Health',"أكمل: 'The doctor gave me a ___ for antibiotics.'",['recipe','prescription','receipt','description'],1),
Q('B1','Food',"أكمل: 'A person who doesn't eat meat is a ___.",['vegan','vegetarian','chef','baker'],1),
Q('B1','Family',"أكمل: 'My father's father is my ___.",['uncle','grandfather','cousin','nephew'],1),
Q('B2','Work',"أكمل: 'After years of hard work, he earned a ___.",['promotion','demotion','resignation','dismissal'],0),
Q('B2','Travel',"أكمل: 'The flight was ___; we had to find another way.'",['delayed','arrived','departed','boarded'],0),
Q('B2','Shopping',"أكمل: 'Can I have the ___? I want my money back.'",['refund','receipt','invoice','bill'],0),
Q('B2','Education',"أكمل: 'She graduated with a ___ in engineering.'",['degree','subject','semester','tuition'],0),
Q('B2','Health',"أكمل: 'Regular exercise improves your ___ health.'",['financial','physical','social','digital'],1),
Q('C1','Work',"أكمل: 'The company downsized and many employees were ___.",['laid off','taken on','set up','put off'],0),
Q('C1','Food',"ما معنى 'a balanced diet'؟",['وجبة سريعة','نظام غذائي متوازن','حمية قاسية','وجبة دسمة'],1),
Q('C1','Travel',"أكمل: 'We had a ___ journey; it took 14 hours.'",['tedious','brief','swift','direct'],0),
Q('C1','Family',"أكمل: 'They are distant ___; they rarely meet.'",['relatives','siblings','parents','twins'],0),
Q('C1','Education',"أكمل: 'The lecture was so ___ that I wrote ten pages of notes.'",['comprehensive','brief','vague','dull'],0),
Q('C2','Work',"أكمل: 'She's the ___ of the company; everyone admires her vision.'",['figurehead','driving force','loose cannon','dark horse'],1),
Q('C2','Food',"أكمل: 'The critics praised the meal as a culinary ___.",['masterpiece','mishap','shortage','surplus'],0),
Q('C2','Health',"أكمل: 'After the surgery, he made a speedy ___.",['recovery','discovery','delivery','coverage'],0),
Q('C2','Shopping',"أكمل: 'I bought this painting for a ___; it was surprisingly cheap.'",['song','fortune','dime','buck'],0),
Q('C2','Travel',"أكمل: 'We went off the ___ ___ to explore unknown villages.'",['beaten track','paved road','main street','trodden path'],0)
]},
{ id: 'reading', icon: 'fa-book-open', pro: true, title: 'القراءة <span dir="ltr">(Reading)</span>',
desc: 'هل يمكنك استيعاب المعاني الخفية؟ سنختبر مهاراتك في القراءة، الاستنتاج، وتحديد الأفكار الرئيسية للنصوص. لنطور قدرتك على فهم أي نص إنجليزي تقرأه! 📖💡',
questions: [
Q('A1','Reading Comprehension',"اقرأ: 'The cat is black.' ما لون القطة؟",['أبيض','أسود','بني','رمادي'],1),
Q('A1','Reading Comprehension',"اقرأ: 'Ali has two apples.' كم تفاحة لدى علي؟",['واحدة','اثنتان','ثلاث','أربع'],1),
Q('A1','Short Stories',"اقرأ: 'Lina woke up, brushed her teeth, and ate breakfast.' ماذا فعلت لينا أولاً؟",['أكلت','استيقظت','نظفت أسنانها','نامت'],1),
Q('A1','Main Idea',"اقرأ: 'Dogs are loyal animals. They protect their owners.' ما الفكرة الرئيسية؟",['الكلاب وفية','القطط جميلة','الطيور تغرد','الأسماك تسبح'],0),
Q('A1','Inference',"اقرأ: 'He took his umbrella.' ماذا تستنتج؟",['الطقس ممطر','الطقس مشمس','هو جائع','هو نائم'],0),
Q('A2','Reading Comprehension',"اقرأ: 'The store opens at 9 and closes at 10.' كم ساعة يعمل المتجر؟",['10','12','13','9'],2),
Q('A2','Inference',"اقرأ: 'She yawned during the meeting.' تستنتج أنها:",['متعبة','سعيدة','جائعة','غاضبة'],0),
Q('A2','Main Idea',"اقرأ: 'Exercise keeps your heart strong and reduces stress.' الفكرة الرئيسية:",['فوائد الرياضة','أضرار الرياضة','أنواع الرياضة','أماكن الرياضة'],0),
Q('A2','Short Stories',"اقرأ: 'Tom missed the bus, so he walked to work and arrived late.' لماذا تأخر توم؟",['نام متأخراً','فاته الباص','مرض','استقال'],1),
Q('A2','Reading Comprehension',"اقرأ: 'The recipe needs two eggs and a cup of milk.' ماذا تحتاج الوصفة؟",['بيض وحليب','خبز وجبن','أرز ودجاج','سكر وشاي'],0),
Q('B1','Inference',"اقرأ: 'The streets are wet and people carry umbrellas.' تستنتج:",['أمطرت','عاصفة رملية','الثلج يتساقط','الجو حار'],0),
Q('B1','Main Idea',"اقرأ: 'Reading daily expands vocabulary, sharpens focus, and reduces stress.' الفكرة الرئيسية:",['فوائد القراءة اليومية','أضرار القراءة','طرق نشر الكتب','تاريخ القراءة'],0),
Q('B1','Reading Comprehension',"اقرأ: 'Despite the heavy traffic, Sara arrived on time.' متى وصلت سارة؟",['متأخرة','في الموعد','مبكرة جداً','لم تصل'],1),
Q('B1','Short Stories',"اقرأ: 'The old man fed the pigeons every morning, rain or shine.' ماذا تخبرنا القصة؟",['ملتزم بروتينه','يكره الطيور','يسافر كثيراً','ينسى كثيراً'],0),
Q('B1','Inference',"اقرأ: 'He checked his watch every few seconds.' تستنتج أنه:",['متوتر وينتظر شيئاً','سعيد','جائع','نائم'],0),
Q('B2','Main Idea',"اقرأ: 'Remote work offers flexibility, yet it blurs personal and professional life.' الفكرة:",['إيجابيات وسلبيات العمل عن بعد','العمل عن بعد مثالي','المكاتب انتهت','الرواتب ارتفعت'],0),
Q('B2','Inference',"اقرأ: 'The manager praised everyone except John, who left silently.' شعر جون بـ:",['الإحراج','الفخر','الجوع','الملل'],0),
Q('B2','Reading Comprehension',"اقرأ: 'The deal fell through at the last minute.' ما معنى fell through؟",['نجحت','فشلت','تأجلت','بدأت'],1),
Q('B2','Short Stories',"اقرأ: 'Mona watered her plant daily; her sister's plant, neglected, withered.' المغزى:",['الاهتمام يصنع الفرق','النباتات لا تحتاج ماء','الأخوات مختلفات','الشتاء قاسٍ'],0),
Q('B2','Inference',"اقرأ: 'She bought a ticket, packed popcorn, and silenced her phone.' أين تذهب؟",['السينما','السوق','المستشفى','المدرسة'],0),
Q('C1','Inference',"اقرأ: 'His apology rang hollow.' ما المقصود؟",['اعتذار غير صادق','اعتذار بصوت عالٍ','اعتذار متأخر','اعتذار مكتوب'],0),
Q('C1','Main Idea',"اقرأ: 'While AI automates tasks, human creativity remains the engine of innovation.' الفكرة:",['الإبداع البشري أساس الابتكار','الذكاء الاصطناعي مبدع','الآلات تبتكر','الابتكار انتهى'],0),
Q('C1','Reading Comprehension',"اقرأ: 'The politician's answer was a masterclass in equivocation.' يعني أنه:",['أجاب بغموض متعمد','كان صريحاً','رفض الإجابة','اعتذر'],0),
Q('C1','Short Stories',"اقرأ: 'The captain went down with the ship, as tradition demanded.' ماذا يستحضر النص؟",['تقاليد البحرية','قانوناً جديداً','حادثاً عرضياً','احتفالاً'],0),
Q('C1','Inference',"اقرأ: 'She kept his letter unopened for years.' تستنتج:",['تتجنب ذكريات مؤلمة','لا تقرأ أبداً','فقدت الرسالة','تحب المراسلة'],0),
Q('C2','Reading Comprehension',"اقرأ: 'The author's tone can best be described as sardonic.' يعني:",['ساخر','متفائل','حزين','محايد'],0),
Q('C2','Inference',"اقرأ: 'He wore his father's coat, two sizes too large, with quiet pride.' تستنتج:",['اعتزاز بإرث والده','المعطف غالٍ','يحب الموضة','يشعر بالبرد'],0),
Q('C2','Main Idea',"اقرأ: 'History does not repeat itself, but it often rhymes.' الفكرة:",['الأحداث تتشابه بأنماطها','التاريخ يعيد نفسه حرفياً','التاريخ بلا فائدة','المستقبل مجهول'],0),
Q('C2','Short Stories',"اقرأ: 'The keeper polished the lens each dusk, though no ship had passed in years.' المغزى:",['الالتزام بالواجب رغم غياب الحاجة الظاهرة','الكسل','النسيان','الخوف'],0),
Q('C2','Inference',"اقرأ: 'She smiled, but her knuckles whitened around the cup.' تستنتج:",['هدوء ظاهري وتوتر داخلي','سعادة حقيقية','نعاس','جوع'],0)
]},
{ id: 'listening', icon: 'fa-headphones', pro: true, title: 'الاستماع <span dir="ltr">(Listening)</span>',
desc: 'استعد لاختبار أذنيك! سنقيس مدى فهمك للمحادثات الاجتماعية والتعليمات الصوتية. هدفنا الوصول بك لمستوى تفهم فيه المتحدثين الأصليين بكل سهولة! 🎧👂',
questions: [
Q('A1','Social Conversations',"سمعت: 'Hello, how are you?' ما الرد المناسب؟",["I'm fine, thanks.",'My name is Tom.',"It's a.",'Yes.'],0),
Q('A1','Listening Comprehension',"سمعت: 'The apple is red.' ما لون التفاحة؟",['أخضر','أحمر','أصفر','أزرق'],1),
Q('A1','Following Instructions',"سمعت: 'Stand up, please.' ماذا يجب أن تفعل؟",['أجلس','أقف','أخرج','أنام'],1),
Q('A1','Social Conversations',"سمعت: 'Thank you!' بماذا ترد؟",["You're welcome.",'Goodbye.','Sorry.','Please.'],0),
Q('A1','Listening Comprehension',"سمعت: 'I have a cat and a dog.' كم حيواناً لديه؟",['واحد','اثنان','ثلاثة','أربعة'],1),
Q('A2','Following Instructions',"سمعت: 'Turn left at the bank, then go straight.' أين تنعطف؟",['يميناً عند البنك','يساراً عند البنك','قبل البنك','بعد المدرسة'],1),
Q('A2','Social Conversations',"سمعت: 'Could you pass the salt, please?' ماذا تفعل؟",['تناول الملح','اشرب الماء','اخرج','اجلس'],0),
Q('A2','Listening Comprehension',"سمعت: 'The meeting is at half past nine.' متى الاجتماع؟",['9:00','9:30','10:30','8:30'],1),
Q('A2','Social Conversations',"سمعت: 'I'm sorry I'm late.' ما الرد المناسب؟",["That's okay.",'Good luck.','Well done!','See you.'],0),
Q('A2','Following Instructions',"سمعت: 'Press the red button twice.' كم مرة تضغط؟",['مرة','مرتين','ثلاثاً','أبداً'],1),
Q('B1','Listening Comprehension',"سمعت: 'The flight has been delayed by two hours.' ماذا حدث؟",['أُلغيت','تأخرت','وصلت','أقلعت مبكراً'],1),
Q('B1','Social Conversations',"سمعت: 'Would you mind closing the window?' ما المطلوب؟",['إغلاق النافذة','فتح النافذة','كسر النافذة','تنظيف النافذة'],0),
Q('B1','Following Instructions',"سمعت: 'Fill in the form and hand it to the clerk.' ماذا تفعل أولاً؟",['أملأ النموذج','أذهب للمنزل','أتصل بالشرطة','أنتظر'],0),
Q('B1','Listening Comprehension',"سمعت: 'She can't make it to the party.' ما المعنى؟",['لن تستطيع الحضور','ستطبخ','وصلت متأخرة','أحضرت هدية'],0),
Q('B1','Social Conversations',"سمعت: 'Congratulations on your promotion!' بماذا ترد؟",['Thank you so much!','Better luck next time.',"Don't mention it.",'Never mind.'],0),
Q('B2','Listening Comprehension',"سمعت: 'Let's play it by ear.' ما المعنى؟",['نقرر حسب الظروف','نسمع موسيقى','نتدرب على أغنية','نستخدم سماعات'],0),
Q('B2','Following Instructions',"سمعت: 'Take the second exit at the roundabout.' أي مخرج؟",['الأول','الثاني','الثالث','الأخير'],1),
Q('B2','Social Conversations',"سمعت: 'I'm afraid I didn't catch that.' ماذا يقصد؟",['لم يسمع بوضوح','أمسك الكرة','فهم كل شيء','يركض'],0),
Q('B2','Listening Comprehension',"سمعت: 'The deadline was pushed back.' ما المعنى؟",['تقدم الموعد','تأجل الموعد','أُلغي المشروع','انتهى العمل'],1),
Q('B2','Following Instructions',"سمعت: 'Attach your CV and send it before Friday.' ما المطلوب؟",['إرفاق السيرة وإرسالها قبل الجمعة','طباعة يوم الجمعة','حذف الملف','الانتظار'],0),
Q('C1','Social Conversations',"سمعت: 'I'd rather not say.' ما دلالتها؟",['تحفظ مهذب عن الإجابة','حماس شديد','دعوة للنقاش','موافقة فورية'],0),
Q('C1','Listening Comprehension',"سمعت: 'He beat around the bush.' ما المعنى؟",['تحدث بشكل غير مباشر','ضرب الشجيرة','كان صريحاً','نام'],0),
Q('C1','Following Instructions',"سمعت: 'Circle the answer and underline the key word.' ما المطلوب؟",['تظليل الإجابة وتسطير الكلمة','حذف النص','كتابة مقال','ترجمة'],0),
Q('C1','Social Conversations',"سمعت: 'Let's agree to disagree.' ما المعنى؟",['نتفق على البقاء مختلفين','نتشاجر','نلغي النقاش','نؤجل اللقاء'],0),
Q('C1','Listening Comprehension',"سمعت: 'The ball is in your court now.' ما المعنى؟",['المسؤولية عليك الآن','نلعب تنس','المحكمة مفتوحة','انتهت المباراة'],0),
Q('C2','Listening Comprehension',"سمعت: 'Her remarks were tongue-in-cheek.' ما المعنى؟",['ساخرة غير جادة','غاضبة','رسمية','حزينة'],0),
Q('C2','Social Conversations',"سمعت: 'I don't mean to pry, but...' ما دلالتها؟",['اعتذار مهذب قبل سؤال شخصي','تهديد','وداع','شكر'],0),
Q('C2','Following Instructions',"سمعت: 'Summarize in no more than 50 words.' ما القيد؟",['50 كلمة كحد أقصى','50 سطراً','صفحة كاملة','بلا حدود'],0),
Q('C2','Listening Comprehension',"سمعت: 'He gave a half-hearted apology.' ما المعنى؟",['اعتذار فاتر غير صادق','اعتذار مثالي','اعتذار طويل','رفض الاعتذار'],0),
Q('C2','Social Conversations',"سمعت: 'Let's not open that can of worms.' ما المعنى؟",['نتجنب موضوعاً معقداً','نفتح طعاماً','نبدأ احتفالاً','نؤجل القرار'],0)
]},
{ id: 'conversation', icon: 'fa-comments', pro: true, title: 'المحادثة <span dir="ltr">(Conversation)</span>',
desc: 'أتقن فن الحوار! سنختبر مهاراتك في المواقف الاجتماعية، المهنية، وفن إدارة النقاشات. ستحصل على مسار يجعلك تتحدث بطلاقة وثقة كالمتحدثين الأصليين! 💬🗣️',
questions: [
Q('A1','Introductions','كيف تعرّف بنفسك؟',['My name is Adam.','I name Adam.','Name my Adam.','Me Adam name.'],0),
Q('A1','Asking Questions','تسأل شخصاً عن اسمه، ماذا تقول؟',['What is your name?','Who are you name?','You name what?','What name?'],0),
Q('A1','Social Interaction','تقابل صديقاً صباحاً، ماذا تقول؟',['Good morning','Good night','Good bye','Sorry'],0),
Q('A1','Asking Questions','تسأل عن الوقت:',['What time is it?','How time?','When time?','Time what?'],0),
Q('A1','Daily Conversation','تريد ماءً بلطف، تقول:',['Water, please.','Give me water now!','Water I!','Me water.'],0),
Q('A2','Small Talk',"الطقس جميل، تبدأ حديثاً بسيطاً بـ:",["Nice day, isn't it?",'How much do you earn?','Are you married?','Go away.'],0),
Q('A2','Introductions',"تعرّف صديقك: '___ my friend, Ali.'",['This is','He is name','That','Is'],0),
Q('A2','Asking Questions','تسأل عن المكان:',['Where do you live?','What do you live?','Who do you live?','When live?'],0),
Q('A2','Social Interaction',"يقول لك شخص 'Nice to meet you.' ترد:",['Nice to meet you too.','Goodbye.',"I'm sorry.",'No thanks.'],0),
Q('A2','Daily Conversation','تطلب المساعدة بلطف:',['Could you help me, please?','Help me!','You help!','Helping!'],0),
Q('B1','Conversation Strategies','لم تفهم السؤال، تقول:',['Could you repeat that, please?','What?!','Speak!','I know.'],0),
Q('B1','Professional Interaction','في مقابلة عمل تقول:',['I have five years of experience in sales.','Me work many.','I job good.','Experience me five.'],0),
Q('B1','Empathy','صديقك حزين، تقول:',["I'm sorry to hear that. I'm here for you.",'Whatever.','Stop crying now.',"It's funny."],0),
Q('B1','Small Talk','في المصعد مع زميل، تقول:',['Busy day, huh?','How much money do you have?','Why are you here?','Walk faster.'],0),
Q('B1','Asking Questions','تسأل عن رأي:',['What do you think about this plan?','Think you what?','You think?','What thinks you?'],0),
Q('B2','Diplomacy','تختلف مع زميلك بلطف:',['I see your point, but I have a different view.',"You're wrong!","That's stupid.",'No way.'],0),
Q('B2','Professional Interaction','تطلب تمديد موعد بلطف:',['Would it be possible to extend the deadline?','Extend deadline now!','I no finish, bye.','Deadline bad.'],0),
Q('B2','Conversation Strategies','تغيّر الموضوع بأناقة:',['That reminds me, before I forget...','I refuse to talk.','Silence!','Change!'],0),
Q('B2','Empathy','زميلك فشل في اختبار، تقول:',["That must be tough. You'll do better next time.",'Haha, you failed!','So what?','Stop being sad.'],0),
Q('B2','Social Interaction','دُعيت لعشاء ولا تأكل اللحم، تقول:',["Thank you, but I don't eat meat.",'I hate your food!','Meat is disgusting!','Give me nothing!'],0),
Q('C1','Diplomacy','ترفض عرضاً دون إحراج الطرف الآخر:',['I appreciate the offer, but I must decline for now.','No.',"I don't want it, it's bad.",'Declined.'],0),
Q('C1','Professional Interaction','تقاطع متحدثاً بلطف في اجتماع:',['Sorry to interrupt, may I add something?','Stop talking!','I talk now!','Be quiet!'],0),
Q('C1','Conversation Strategies','تؤكد فهمك لما قيل:',['So, if I understand correctly, you mean...','You said nothing.',"I wasn't listening.",'Repeat everything.'],0),
Q('C1','Small Talk','في مؤتمر دولي تبدأ حديثاً مع غريب:',['What brings you to this conference?','How much do you weigh?','Do you vote?','Where is your car?'],0),
Q('C1','Empathy','صديقك فقد قريباً، تقول:',["My deepest condolences. I'm here if you need anything.","Calm down, it's life.","Don't be weak.",'At least he was old.'],0),
Q('C2','Diplomacy','تنتقد فكرة مدير دون صدام:',['That’s an interesting approach; have we also considered...?','This idea is terrible.','You always fail.','I refuse.'],0),
Q('C2','Conversation Strategies','محادثة متوترة، تلطّف الجو:',["Let's take a step back and find common ground.",'I win, you lose.','Shout louder.','Leave now.'],0),
Q('C2','Professional Interaction','تفاوض على راتب:',['Given my track record, I believe a higher range is fair.','More money now!','I need money, bye.','Pay me double.'],0),
Q('C2','Empathy','شخص غاضب يتحدث، تُظهر إنصاتاً تعاطفياً:',['It sounds like this really upset you.',"You're overreacting.",'Whatever.','Stop shouting.'],0),
Q('C2','Social Interaction','تنهي محادثة طويلة بلطف:',["It's been great catching up; let's continue over coffee next week.","I'm bored, bye.",'Stop talking.','Ignore.'],0)
]},
{ id: 'writing', icon: 'fa-pen-to-square', pro: true, title: 'الكتابة <span dir="ltr">(Writing)</span>',
desc: 'عبر عن أفكارك بوضوح! سنختبر قدرتك على كتابة الإيميلات، المقالات القصيرة، والتعبير الكتابي السليم. هدفنا أن تصبح كاتباً بارعاً بلغة إنجليزية رصينة! ✍️',
questions: [
Q('A1','Email Writing','تبدأ إيميلاً رسمياً بـ:',['Dear Sir/Madam,','Hey you!','Yo!',"What's up?"],0),
Q('A1','Email Writing','تختم إيميلاً رسمياً بـ:',['Sincerely,','Bye bye,','Love,','Cheers mate!'],0),
Q('A1','Sentence Construction','اختر الجملة الصحيحة:',['I like apples.','Apples I like.','Like I apples.','I apples like.'],0),
Q('A1','Sentence Construction','اختر الجملة الصحيحة:',['She is a teacher.','She a teacher.','Is she teacher.','She teacher is.'],0),
Q('A1','Email Writing','موضوع الإيميل (Subject) يكون:',['قصيراً وواضحاً','طويلاً جداً','بدون معنى','فارغاً دائماً'],0),
Q('A2','Email Writing','تطلب موعداً في إيميل:',['I would like to schedule a meeting.','Meet me now!','Meeting. Now.','You come.'],0),
Q('A2','Sentence Construction',"اربط: 'It was raining. We stayed home.'",['Because it was raining, we stayed home.','It was raining we stayed home.','We stayed home it was raining.','Raining stayed because.'],0),
Q('A2','Formal Writing','اختر الأكثر رسمية:',['I would appreciate your assistance.','Help me please okay?','Gimme a hand.','Help!'],0),
Q('A2','Short Essays','الفقرة الجيدة تبدأ بـ:',['جملة رئيسية (Topic Sentence)','نكتة','سؤال عشوائي','توقيع'],0),
Q('A2','Email Writing','ترد متأخراً على إيميل، تعتذر:',['I apologize for the late reply.','Sorry sorry sorry!!!','Late, huh?','I forgot you.'],0),
Q('B1','Sentence Construction','اختر الجملة الأكثر ترابطاً:',['Although it was cold, we went hiking.','It was cold, we went hiking.','We went hiking, it was cold.','Cold although hiking.'],0),
Q('B1','Formal Writing',"بدل 'I want' في الكتابة الرسمية:",['I would like','I wanna','Gimme',"I'd love"],0),
Q('B1','Email Writing','تُرفق ملفاً، تكتب:',['Please find the attached file.','File here look.','I attached nothing.','See file maybe.'],0),
Q('B1','Short Essays','الخاتمة الجيدة:',['تلخص الأفكار الرئيسية','تضيف فكرة جديدة كلياً','تعتذر للقارئ','تسأل سؤالاً محرجاً'],0),
Q('B1','Sentence Construction','اختر الجملة الصحيحة:',['The report, which was published yesterday, caused a debate.','The report, that was published yesterday, caused a debate.','The report which published yesterday, caused a debate.','The report, which published yesterday, causing a debate.'],0),
Q('B2','Formal Writing','اختر الصياغة الرسمية:',['We regret to inform you that...','Sorry but no can do.','Bad news guys.','Nope.'],0),
Q('B2','Sentence Construction','اختر الأنسب لمقال أكاديمي:',['The data suggests a significant correlation.','Stuff shows things are kinda related.','Everyone knows it’s related.','Related, obviously.'],0),
Q('B2','Email Writing','تتابع طلباً دون ضغط:',['I am writing to follow up on my previous request.',"Why didn't you reply?",'Answer now.','Hello???'],0),
Q('B2','Short Essays',"اختر أداة الانتقال المناسبة: 'The plan is cheap. ___, it is fast.'",['Moreover','However','Although','Despite'],0),
Q('B2','Formal Writing',"بدل 'a lot of' في كتابة رسمية:",['a significant number of','a ton of','loads of','heaps of'],0),
Q('C1','Sentence Construction','اختر الأدق:',['Not until the data had been verified did the team publish the results.','Not until the data had been verified the team published the results.','Until the data verified, the team publish.','The team not publish until data verified.'],0),
Q('C1','Formal Writing','اختر الأنسب لتقرير تنفيذي:',['The findings underscore the need for immediate action.','The findings are kinda important, do stuff now.','Stuff found. Act.','Important things happened.'],0),
Q('C1','Email Writing','تكتب لشريك دولي للمرة الأولى:',['I am reaching out to explore potential collaboration.',"Hey, let's do business!",'You. Me. Business?','Collab?'],0),
Q('C1','Short Essays','لذكر حجة مضادة ثم دحضها:',['While some argue X, the evidence suggests otherwise.','Some say X, whatever.','X is stupid.','Nobody says X.'],0),
Q('C1','Sentence Construction','اختر الجملة الصحيحة:',['Seldom has the city witnessed such enthusiasm.','Seldom the city has witnessed such enthusiasm.','Seldom witnessed the city such enthusiasm.','The city seldom has witnessed such enthusiasm.'],0),
Q('C2','Formal Writing','اختر الأكثر دقة وأناقة:',['The committee endeavoured to reconcile divergent viewpoints.','The committee tried hard to make everyone get along okay-ish.','They worked on it.','Stuff was done by them.'],0),
Q('C2','Sentence Construction',"أكمل: 'She demanded that the report ___ revised.'",['be','is','was','been'],0),
Q('C2','Email Writing','ترد على شكوى عميل غاضب:',['We sincerely regret the inconvenience and will resolve this promptly.',"Calm down, it's not a big deal.","You're wrong, sir.",'Complaints go elsewhere.'],0),
Q('C2','Short Essays','أفضل افتتاحية لمقال نقدي:',["Few novels capture the era's anxiety as sharply as this one.",'Once upon a time...','Hi readers!','The end.'],0),
Q('C2','Sentence Construction','اختر الأكثر إحكاماً:',['Aware of the risks, she proceeded cautiously.','She was aware of the risks, and she proceeded cautiously, which she was aware of.','Proceeding cautiously, the risks were aware of her.','The risks aware, she cautious.'],0)
]}
];

/* ---------- التنقل بين الشاشات ---------- */
const screens = $$('.sp-screen', phone);
const gotoScreen = (name) => {
screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
const active = screens.find((s) => s.dataset.screen === name);
if (active) active.scrollTop = 0;
};
$$('[data-sp-goto]', phone).forEach((btn) => btn.addEventListener('click', () => gotoScreen(btn.dataset.spGoto)));

/* ---------- نافذة التحميل للأقسام المقفلة ---------- */
const spModal = $('#sp-download-modal');
const openDownloadModal = () => {
if (!spModal) return;
$$('.modal.open').forEach((m) => m.classList.remove('open'));
spModal.classList.add('open');
document.body.style.overflow = 'hidden';
};
const goDownload = $('#sp-go-download');
if (goDownload) {
goDownload.addEventListener('click', () => {
if (spModal) { spModal.classList.remove('open'); document.body.style.overflow = ''; }
const dl = $('#download');
if (dl) dl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
}

/* ---------- بناء قائمة الأقسام (الأول فقط قابل للاختبار) ---------- */
const listWrap = $('#sp-section-list');
SECTIONS.forEach((sec, si) => {
const locked = sec.id !== 'basics';
const card = document.createElement('div');
card.className = 'sp-section-card' + (sec.pro ? ' sp-pro' : '') + (locked ? ' sp-locked' : '');
card.innerHTML = `${sec.pro ? '<span class="sp-pro-badge">PRO</span>' : ''} <div class="sp-section-top"> <span class="sp-section-icon">${sec.icon.startsWith('fa-') ? '<i class="fas ' + sec.icon + '"></i>' : sec.icon}</span> <div class="sp-section-title"><strong>${sec.title}</strong></div> <span class="sp-status"><i class="fas fa-lock"></i> ${locked ? 'متاح في التطبيق' : 'لم يبدأ'}</span> </div> <div class="sp-section-body"> <p class="sp-section-desc">${sec.desc}</p> <button class="sp-btn-gold" type="button" data-sp-sec="${si}">${locked ? '📲 اختبره داخل التطبيق — حمّل الآن' : 'ابدأ الاختبار الآن <i class="fas fa-arrow-left"></i>'}</button> </div>`;
card.querySelector('.sp-section-top').addEventListener('click', () => {
if (locked) { openDownloadModal(); return; }
const wasOpen = card.classList.contains('open');
$$('.sp-section-card', listWrap).forEach((c) => c.classList.remove('open'));
if (!wasOpen) card.classList.add('open');
});
listWrap.appendChild(card);
});
listWrap.addEventListener('click', (e) => {
const btn = e.target.closest('[data-sp-sec]');
if (!btn) return;
const sec = SECTIONS[+btn.dataset.spSec];
if (sec.id === 'basics') startQuiz(sec); else openDownloadModal();
});

/* ---------- الاختبار ---------- */
const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
let currentSection = null;
let idx = 0;
let answers = [];
const countEl = $('#sp-quiz-count');
const levelBadge = $('#sp-q-level');
const questionEl = $('#sp-quiz-question');
const optionsEl = $('#sp-quiz-options');
const barEl = $('#sp-quiz-bar');
const nextBtn = $('#sp-next-btn');
const prevBtn = $('#sp-prev-btn');
const analyzing = $('#sp-analyzing');
const startQuiz = (sec) => {
currentSection = sec;
idx = 0;
answers = Array(sec.questions.length).fill(null);
renderQuestion();
gotoScreen('quiz');
};
const renderQuestion = () => {
const q = currentSection.questions[idx];
const total = currentSection.questions.length;
countEl.textContent = `${idx + 1}/${total}`;
levelBadge.textContent = q.level;
questionEl.textContent = q.q;
barEl.style.width = `${((idx + 1) / total) * 100}%`;
optionsEl.innerHTML = '';
q.options.forEach((opt, i) => {
const b = document.createElement('button');
b.type = 'button';
b.dir = hasAr(opt) ? 'rtl' : 'ltr';
b.className = 'sp-option' + (answers[idx] === i ? ' selected' : '');
b.textContent = opt;
b.addEventListener('click', () => {
answers[idx] = i;
$$('.sp-option', optionsEl).forEach((o) => o.classList.remove('selected'));
b.classList.add('selected');
});
optionsEl.appendChild(b);
});
prevBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';
nextBtn.innerHTML = idx === total - 1 ? 'عرض النتائج <i class="fas fa-chart-simple"></i>' : 'التالي <i class="fas fa-arrow-left"></i>';
};
prevBtn.addEventListener('click', () => { if (idx > 0) { idx--; renderQuestion(); } });
nextBtn.addEventListener('click', () => {
if (answers[idx] === null) { showToast('اختر إجابة أولاً للمتابعة 👆', 'error'); return; }
if (idx < currentSection.questions.length - 1) { idx++; renderQuestion(); return; }
analyzing.hidden = false;
setTimeout(() => { buildResults(); analyzing.hidden = true; gotoScreen('results'); animateGauge(); }, 1400);
});

/* ---------- التحليل ---------- */
const compute = () => {
let correct = 0;
const perLevel = {}; const perTopic = {};
levelsOrder.forEach((l) => (perLevel[l] = { c: 0, t: 0 }));
currentSection.questions.forEach((q) => (perTopic[q.skill] = perTopic[q.skill] || { c: 0, t: 0 }));
currentSection.questions.forEach((q, i) => {
const ok = answers[i] === q.answer;
if (ok) correct++;
perLevel[q.level].t++; if (ok) perLevel[q.level].c++;
perTopic[q.skill].t++; if (ok) perTopic[q.skill].c++;
});
return { percent: Math.round((correct / currentSection.questions.length) * 100), perLevel, perTopic };
};
const levelFromPercent = (p) => (p >= 85 ? 'C1' : p >= 70 ? 'B2' : p >= 55 ? 'B1' : p >= 40 ? 'A2' : 'A1');
const colorOf = (p) => (p >= 70 ? '#4ade80' : p >= 40 ? '#fbbf24' : '#ef4444');
let lastPercent = 0;
const animateGauge = () => {
const fill = $('#sp-gauge-fill');
fill.style.transition = 'none';
fill.style.strokeDashoffset = 314;
requestAnimationFrame(() => requestAnimationFrame(() => {
fill.style.transition = 'stroke-dashoffset 1.2s ease';
fill.style.strokeDashoffset = 314 - (314 * lastPercent) / 100;
}));
};
const swRow = (t, color) => `<div class="sp-sw-row"><span class="sp-sw-dot" style="background:${color}"></span><div class="sp-sw-name"><strong>${TOPIC_AR[t] || t}</strong><small dir="ltr">${t}</small></div></div>`;
const buildResults = () => {
const { percent, perLevel, perTopic } = compute();
lastPercent = percent;
$('#sp-result-level').textContent = levelFromPercent(percent);
$('#sp-result-percent').textContent = percent + '%';
const levelsWrap = $('#sp-levels');
levelsWrap.innerHTML = '';
levelsOrder.forEach((lv) => {
const d = perLevel[lv];
const p = d.t ? Math.round((d.c / d.t) * 100) : 0;
const c = colorOf(p);
const row = document.createElement('div');
row.className = 'sp-lv-row';
row.innerHTML = `<span class="sp-lv-name">${lv}</span><div class="sp-lv-bar"><i style="width:${p}%;background:${c}"></i></div><div class="sp-lv-val"><b style="color:${c}">${p}%</b><small style="color:${c}">${p >= 70 ? '<i class="fas fa-check"></i> قوي' : '<i class="fas fa-xmark"></i> ضعيف'}</small></div>`;
levelsWrap.appendChild(row);
});
const sorted = Object.keys(perTopic).sort((a, b) => (perTopic[a].c / perTopic[a].t) - (perTopic[b].c / perTopic[b].t));
const topicsWrap = $('#sp-topics');
topicsWrap.innerHTML = '';
sorted.forEach((t) => {
const d = perTopic[t];
const p = Math.round((d.c / d.t) * 100);
const cls = p >= 70 ? 'good' : p >= 40 ? 'mid' : 'bad';
const label = p >= 70 ? 'نقطة قوة' : p >= 40 ? 'تحتاج تحسين' : 'نقطة ضعف';
const row = document.createElement('div');
row.className = 'sp-topic-row';
row.innerHTML = `<div class="sp-topic-name"><strong>${TOPIC_AR[t] || t}</strong><small dir="ltr">${t}</small></div><div class="sp-topic-val"><b style="color:${colorOf(p)}">${p}%</b><span class="sp-topic-badge ${cls}">${label}</span></div>`;
topicsWrap.appendChild(row);
});
const strengths = sorted.filter((t) => perTopic[t].c / perTopic[t].t >= 0.7);
const weaknesses = sorted.filter((t) => perTopic[t].c / perTopic[t].t < 0.7);
$('#sp-strengths').innerHTML = strengths.length ? strengths.map((t) => swRow(t, '#4ade80')).join('') : '<p class="sp-empty">لا توجد بعد — واصل التدريب!</p>';
$('#sp-weaknesses').innerHTML = weaknesses.length ? weaknesses.map((t) => swRow(t, '#ef4444')).join('') : '<p class="sp-empty">رائع! لا توجد نقاط ضعف واضحة 🎉</p>';
buildPath(sorted, perTopic);
};

/* ---------- المسار المخصص (الأضعف أولاً) ---------- */
const buildPath = (sorted, perTopic) => {
$('#sp-path-sub').textContent = `قسم ${currentSection.title.replace(/<[^>]*>/g, '')} — رتبنا الدروس بدءاً من أضعف مهاراتك.`;
const list = $('#sp-path-list');
list.innerHTML = '';
const lessons = [{ title: 'مقدمة وتأسيس القسم', open: true }];
sorted.forEach((t) => lessons.push({ title: `${TOPIC_AR[t] || t} (${t})`, open: false, weak: perTopic[t].c / perTopic[t].t < 0.7 }));
lessons.push({ title: 'الاختبار الشامل النهائي (Final Test)', open: false });
lessons.forEach((l, i) => {
const el = document.createElement('div');
el.className = 'sp-lesson ' + (l.open ? 'open' : 'locked');
el.innerHTML = `<span class="sp-lesson-num">${i + 1}</span><span class="sp-lesson-title">${l.title}${l.weak ? ' ⚠️' : ''}</span><span class="sp-lesson-status">${l.open ? '<i class="fas fa-lock-open"></i> متاح' : '<i class="fas fa-lock"></i> مغلق'}</span>`;
list.appendChild(el);
});
};
const restart = $('#sp-restart');
if (restart) restart.addEventListener('click', () => gotoScreen('sections'));
};