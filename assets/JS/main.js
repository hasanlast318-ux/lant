(function () {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  /* ==========================================
     اللغة الافتراضية + مساعد الترجمة
  ========================================== */
  let LANG = localStorage.getItem('langhub-lang') || 'ar';
  const tr = (ar, en) => (LANG === 'en' ? en : ar);

  /* ==========================================
     Toast
  ========================================== */
  const showToast = (message, type = 'info') => {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast show toast-${type}`;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => { toast.classList.remove('show'); }, 3500);
  };

  /* ============================================================
     ✅ التعديل ① : نشر الدوال المساعدة عالمياً
     بدون هذه الأسطر لا يستطيع ملف smart-path.js الوصول إلى
     $ و $$ و showToast فيرمي خطأ $ is not defined ويتعطل كل شيء
  ============================================================ */
  window.$ = $;
  window.$$ = $$;
  window.showToast = showToast;
  window.tr = tr;

  /* ==========================================
     قائمة الجوال
  ========================================== */
  const initMobileMenu = () => {
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
    $$('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
      });
    });
  };

  /* ==========================================
     التنقل السلس
  ========================================== */
  const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '#0' && href !== '#home') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  /* ==========================================
     الروابط النشطة أثناء التمرير
  ========================================== */
  const initActiveNav = () => {
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = $$('section');
      const navLinks = $$('.nav-link');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) current = section.getAttribute('id');
      });
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
      });
    });
  };

  /* ==========================================
     تأثير التمرير على شريط التنقل
  ========================================== */
  const initNavbarScroll = () => {
    window.addEventListener('scroll', () => {
      const navbar = $('.navbar');
      if (!navbar) return;
      navbar.classList.toggle('scrolled', window.scrollY > 100);
    });
  };

  /* ==========================================
     الوضع الفاتح / الداكن
  ========================================== */
  const initTheme = () => {
    const toggle = $('#theme-toggle');
    if (localStorage.getItem('langhub-theme') === 'light') {
      document.body.classList.add('light-mode');
      if (toggle) toggle.checked = true;
    }
    if (toggle) {
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          document.body.classList.add('light-mode');
          localStorage.setItem('langhub-theme', 'light');
        } else {
          document.body.classList.remove('light-mode');
          localStorage.setItem('langhub-theme', 'dark');
        }
      });
    }
  };

  /* ==========================================
     تأثير الكتابة (يدعم اللغتين)
  ========================================== */
  let startTyping = () => {};
  const initTyping = () => {
    const heroTitle = $('.hero-title');
    if (!heroTitle) return;
    startTyping = () => {
      heroTitle.classList.add('typing-started');
      const part1 = tr('تعلم الإنجليزية ', 'Learn English ');
      const part2 = tr('بـتسلسل ذكي', 'the Smart Way');
      heroTitle.innerHTML = '';
      let i = 0, j = 0;
      function typePart1() {
        if (i < part1.length) {
          heroTitle.innerHTML = part1.substring(0, i + 1);
          i++;
          setTimeout(typePart1, 60);
        } else setTimeout(typePart2, 50);
      }
      function typePart2() {
        if (j < part2.length) {
          heroTitle.innerHTML = part1 + '<span class="highlight">' + part2.substring(0, j + 1) + '</span>';
          j++;
          setTimeout(typePart2, 80);
        } else {
          heroTitle.innerHTML = part1 + '<span class="highlight">' + part2 + '</span>';
        }
      }
      typePart1();
    };
    setTimeout(startTyping, 300);
  };

  /* ==========================================
     النماذج (تدعم اللغتين)
  ========================================== */
  const initForms = () => {
    const contactForm = $('#contact-form');
    const newsletterForm = $('#newsletter-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + tr('جاري الإرسال...', 'Sending...');
        submitBtn.disabled = true;
        setTimeout(() => {
          showToast(tr('✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', '✅ Your message was sent successfully! We will contact you soon.'), 'success');
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newsletterForm.reset();
        showToast(tr('تم الاشتراك في النشرة البريدية بنجاح.', 'Subscribed to the newsletter successfully.'), 'success');
      });
    }
  };

  /* ==========================================
     النوافذ المنبثقة
  ========================================== */
  const initModals = () => {
    const closeModal = (modal) => { modal.classList.remove('open'); document.body.style.overflow = ''; };
    $$('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = $(btn.getAttribute('data-open-modal'));
        if (!modal) return;
        $$('.modal.open').forEach((m) => m.classList.remove('open'));
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    $$('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => {
        const modal = el.closest('.modal');
        if (modal) closeModal(modal);
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') $$('.modal.open').forEach((modal) => closeModal(modal));
    });
  };

  /* ==========================================
     كلمة اليوم (تدعم اللغتين)
  ========================================== */
  let renderDailyWord = () => {};
  const initDailyWord = () => {
    const dailyWords = [
      { word: 'Consistent', meaning: 'ثابت / مستمر', meaningEn: 'steady / constant', sentence: 'Consistent practice makes progress.', sentenceMeaning: 'التدريب المستمر يصنع التقدم.', sentenceMeaningEn: 'Consistent practice makes progress.' },
      { word: 'Improve', meaning: 'يحسّن / يطوّر', meaningEn: 'to improve / develop', sentence: 'I want to improve my English every day.', sentenceMeaning: 'أريد تحسين لغتي الإنجليزية كل يوم.', sentenceMeaningEn: 'I want to improve my English every day.' },
      { word: 'Confident', meaning: 'واثق', meaningEn: 'confident', sentence: 'She is confident when she speaks.', sentenceMeaning: 'إنها واثقة عندما تتحدث.', sentenceMeaningEn: 'She is confident when she speaks.' },
      { word: 'Achieve', meaning: 'يحقق', meaningEn: 'to achieve', sentence: 'You can achieve your goals with practice.', sentenceMeaning: 'يمكنك تحقيق أهدافك بالتدريب.', sentenceMeaningEn: 'You can achieve your goals with practice.' },
      { word: 'Fluent', meaning: 'طليق', meaningEn: 'fluent', sentence: 'He wants to become fluent in English.', sentenceMeaning: 'يريد أن يصبح طليقًا في الإنجليزية.', sentenceMeaningEn: 'He wants to become fluent in English.' },
      { word: 'Opportunity', meaning: 'فرصة', meaningEn: 'opportunity', sentence: 'Learning English creates new opportunities.', sentenceMeaning: 'تعلم الإنجليزية يخلق فرصًا جديدة.', sentenceMeaningEn: 'Learning English creates new opportunities.' },
      { word: 'Journey', meaning: 'رحلة', meaningEn: 'journey', sentence: 'Your learning journey starts today.', sentenceMeaning: 'رحلة تعلمك تبدأ اليوم.', sentenceMeaningEn: 'Your learning journey starts today.' },
    ];
    const wordEl = $('#daily-word');
    const meaningEl = $('#daily-word-meaning');
    const sentenceEl = $('#daily-sentence');
    const sentenceMeaningEl = $('#daily-sentence-meaning');
    if (!wordEl || !meaningEl || !sentenceEl || !sentenceMeaningEl) return;
    const item = dailyWords[Math.floor(Date.now() / 86400000) % dailyWords.length];
    renderDailyWord = () => {
      wordEl.textContent = item.word;
      meaningEl.textContent = tr(item.meaning, item.meaningEn);
      sentenceEl.textContent = item.sentence;
      sentenceMeaningEl.textContent = tr(item.sentenceMeaning, item.sentenceMeaningEn);
    };
    renderDailyWord();
  };

  /* ==========================================
     المحادثة التفاعلية (تبقى بالعربية دائماً)
  ========================================== */
  const initAiChat = () => {
    const chat = $('#ai-chat');
    const input = $('#ai-input');
    const sendBtn = $('#ai-send-btn');
    const micBtn = $('#ai-mic-btn');
    const topicButtons = $$('.ai-topic-btn');
    if (!chat || !input || !sendBtn || !micBtn || !topicButtons.length) return;

    const topics = {
      hotel: {
        task: 'مهمتك: احجز غرفة لشخصين لمدة 3 ليالي مع وجبة إفطار.',
        welcome: { en: "Welcome to LangHub! I'm your Smart Teacher. Let's practice 'Booking a Hotel'. To start, could you tell me: Do you prefer to stay in a hotel or an apartment when you travel?", ar: 'مرحباً بك في LangHub! أنا معلمك الذكي. دعنا نتمرّن على "حجز فندق". للبدء: هل تفضل الإقامة في فندق أم شقة عند السفر؟' },
        demoReply: 'I want book a room for two peoples for 3 night.',
        demoReplyAr: 'أريد حجز غرفة لشخصين لمدة 3 ليالي.',
        aiResponse: { en: 'Perfect! We have a double room with breakfast for 3 nights. Would you like to know the price per night?', ar: 'ممتاز! لدينا غرفة مزدوجة مع الإفطار لمدة 3 ليالي. هل تود معرفة سعر الليلة؟' },
        suggestion: 'Yes, please. How much does it cost per night?',
        followUps: [
          { en: 'Sure! The price is $90 per night including breakfast. For how many nights would you like to book?', ar: 'بالتأكيد! السعر 90 دولاراً لليلة شاملاً الإفطار. لكم ليلة تود أن تحجز؟', suggestion: 'I would like to book for 3 nights, please.' },
          { en: 'Wonderful! Your room is booked. Could you tell me your name, please?', ar: 'رائع! تم حجز غرفتك. هل يمكن أن تخبرني باسمك من فضلك؟', suggestion: 'My name is Adam. Thank you for your help!' },
        ],
      },
      restaurant: {
        task: 'مهمتك: اطلب وجبة العشاء واسأل عن قائمة الحلويات.',
        welcome: { en: "Hello! I'm your Smart Teacher. Let's practice 'Ordering Food'. First question: What would you like to order for dinner tonight?", ar: 'مرحباً! أنا معلمك الذكي. دعنا نتمرّن على "طلب الطعام". سؤالنا الأول: ماذا تود أن تطلب للعشاء الليلة؟' },
        demoReply: 'I want order a grilled chicken and I am agree with any drink.',
        demoReplyAr: 'أريد طلب دجاج مشوي وأنا موافق على أي مشروب.',
        aiResponse: { en: 'Excellent choice! Your grilled chicken will be ready soon. Would you like to see our dessert menu?', ar: 'اختيار رائع! سيكون الدجاج المشوي جاهزاً قريباً. هل تود رؤية قائمة الحلويات؟' },
        suggestion: 'Yes, could I see the dessert menu, please?',
        followUps: [
          { en: 'Of course! We have chocolate cake and ice cream. Which one would you prefer?', ar: 'بالطبع! لدينا كيك الشوكولاتة والآيس كريم. أيهما تفضل؟', suggestion: 'I would like the chocolate cake, please.' },
          { en: 'Great taste! Anything else I can help you with?', ar: 'ذوق رائع! هل يمكنني مساعدتك بشيء آخر؟', suggestion: 'No, thank you. That is all.' },
        ],
      },
      airport: {
        task: 'مهمتك: اسأل عن موعد إقلاع رحلتك وبوابة الصعود.',
        welcome: { en: "Hi! I'm your Smart Teacher. Let's practice 'At the Airport'. Tell me: What did you do when you arrived at the airport?", ar: 'مرحباً! أنا معلمك الذكي. دعنا نتمرّن على "في المطار". أخبرني: ماذا فعلت عندما وصلت إلى المطار؟' },
        demoReply: 'I go to the airport yesterday and my plane go late.',
        demoReplyAr: 'ذهبت إلى المطار أمس وكانت طائرتي متأخرة.',
        aiResponse: { en: 'I see! Your flight departs at 6:30 PM from gate 12. Would you like to know how to get to the gate?', ar: 'فهمت! رحلتك تقلع الساعة 6:30 مساءً من البوابة 12. هل تود معرفة كيفية الوصول إلى البوابة؟' },
        suggestion: 'Yes, please. How can I get to gate 12?',
        followUps: [
          { en: 'Sure! Take the escalator on your right, then turn left at the coffee shop.', ar: 'بالتأكيد! اصعد السلالم المتحركة على يمينك ثم انعطف يساراً عند المقهى.', suggestion: 'Thank you! How long does it take to walk there?' },
          { en: 'About five minutes. You still have plenty of time before boarding.', ar: 'حوالي خمس دقائق. لا يزال لديك متسع من الوقت قبل الصعود.', suggestion: 'That is good to hear. Thank you!' },
        ],
      },
    };

    const translations = {
      'yes, please. how much does it cost per night?': 'نعم، من فضلك. كم تبلغ تكلفة الليلة؟',
      'i would like to book for 3 nights, please.': 'أود أن أحجز لمدة 3 ليالي، من فضلك.',
      'my name is adam. thank you for your help!': 'اسمي آدم. شكراً على مساعدتك!',
      'yes, could i see the dessert menu, please?': 'نعم، هل يمكنني رؤية قائمة الحلويات من فضلك؟',
      'i would like the chocolate cake, please.': 'أود كيك الشوكولاتة، من فضلك.',
      'no, thank you. that is all.': 'لا، شكراً. هذا كل شيء.',
      'yes, please. how can i get to gate 12?': 'نعم، من فضلك. كيف أصل إلى البوابة 12؟',
      'thank you! how long does it take to walk there?': 'شكراً! كم يستغرق المشي إلى هناك؟',
      'that is good to hear. thank you!': 'يسعدني سماع ذلك. شكراً!',
    };

    const grammarRules = [
      { pattern: /\bi\s+want\s+(book|order|go|eat|stay|ask|buy|visit)\b/i, replacement: (m, verb) => `I want to ${verb}`, issue: 'بعد الفعل want نستخدم to ثم الفعل الأساسي (I want to book).' },
      { pattern: /\bpeoples\b/i, replacement: 'people', issue: 'كلمة people جمع بالفعل ولا نضيف لها s.' },
      { pattern: /\b(\d+|two|three|four|five|six|seven|eight|nine|ten)\s+night\b/i, replacement: '$1 nights', issue: 'بعد الأرقام الأكبر من 1 نستخدم الجمع nights.' },
      { pattern: /\bi\s+am\s+agree\b/i, replacement: 'I agree', issue: 'لا نقول I am agree بل نقول I agree.' },
      { pattern: /\bi\s+go\s+to\s+(.+?)\s+yesterday\b/i, replacement: 'I went to $1 yesterday', issue: 'نستخدم went في الماضي عند ذكر yesterday.' },
      { pattern: /\bmy\s+plane\s+go\b/i, replacement: 'my plane goes', issue: 'مع المفرد الغائب (my plane) نستخدم goes.' },
      { pattern: /\bhe\s+go\b/i, replacement: 'he goes', issue: 'مع he نستخدم goes.' },
      { pattern: /\bshe\s+go\b/i, replacement: 'she goes', issue: 'مع she نستخدم goes.' },
      { pattern: /\bmore\s+better\b/i, replacement: 'better', issue: 'كلمة better كافية ولا نستخدم more قبلها.' },
    ];

    let currentTopic = null;
    let followUpIndex = 0;
    let busy = false;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const scrollDown = () => { chat.scrollTop = chat.scrollHeight; };
    const escapeHtml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const setInputsEnabled = (enabled) => { input.disabled = !enabled; sendBtn.disabled = !enabled; micBtn.disabled = !enabled; };
    const showPlaceholder = () => { chat.innerHTML = '<div class="ai-placeholder">👆 اختر موضوعاً من القائمة لبدء المحادثة</div>'; };

    const addTaskBanner = (text) => {
      const el = document.createElement('div');
      el.className = 'task-banner';
      el.innerHTML = '<i class="fas fa-flag"></i> <p></p>';
      el.querySelector('p').textContent = text;
      chat.appendChild(el); scrollDown();
    };

    const addListeningBubble = () => {
      const el = document.createElement('div');
      el.className = 'listening-bubble';
      el.innerHTML = '<i class="fas fa-microphone"></i> جاري الاستماع... تحدث الآن';
      chat.appendChild(el); scrollDown();
      return el;
    };

    const addUserBubble = (en, ar) => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble user-bubble';
      bubble.innerHTML = '<p class="en"></p>' + (ar ? '<p class="ar"></p>' : '');
      bubble.querySelector('.en').textContent = en;
      if (ar) bubble.querySelector('.ar').textContent = ar;
      chat.appendChild(bubble); scrollDown();
    };

    const addAiBubble = (en, ar, suggestion) => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble ai-bubble';
      bubble.innerHTML = `<p class="en"></p><p class="ar"></p><button class="bubble-speak" type="button" aria-label="تشغيل الرد صوتياً"><i class="fas fa-volume-high"></i></button>${suggestion ? `<div class="ai-suggestion">💡 Suggestion: You could say: '${escapeHtml(suggestion)}'</div>` : ''}`;
      bubble.querySelector('.en').textContent = en;
      bubble.querySelector('.ar').textContent = ar;
      bubble.querySelector('.bubble-speak').addEventListener('click', () => {
        if (!('speechSynthesis' in window)) return;
        const utterance = new SpeechSynthesisUtterance(en);
        utterance.lang = 'en-US';
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      });
      const sugg = bubble.querySelector('.ai-suggestion');
      if (sugg) sugg.addEventListener('click', () => { if (input.disabled) return; input.value = suggestion; input.focus(); });
      chat.appendChild(bubble); scrollDown();
    };

    const wordPercent = (word, index) => {
      let hash = 0;
      for (let i = 0; i < word.length; i++) hash += word.charCodeAt(i);
      return 88 + ((hash + index * 3) % 12);
    };

    const analyze = (text) => {
      let clean = text.trim().replace(/\s+/g, ' ');
      let fixed = clean;
      const issues = [];
      grammarRules.forEach((rule) => {
        if (rule.pattern.test(fixed)) { fixed = fixed.replace(rule.pattern, rule.replacement); issues.push(rule.issue); }
      });
      const words = clean.split(' ').filter(Boolean);
      if (words.length < 4) issues.push('حاول التحدث بجملة كاملة من 4 كلمات أو أكثر.');
      const grammar = Math.max(5, 10 - issues.length * 2);
      const wordsScore = Math.min(10, 3 + Math.floor(words.length / 2));
      const accuracy = Math.max(5, Math.round((grammar + wordsScore) / 2));
      const pron = 88 + (clean.length % 10);
      return { clean, fixed, issues, grammar, wordsScore, accuracy, pron, words };
    };

    const addEvalCard = (a) => {
      const chips = a.words.map((w, i) => `<span class="pron-chip">${escapeHtml(w)}<small>${wordPercent(w, i)}%</small></span>`).join('');
      const hasFix = a.fixed.toLowerCase() !== a.clean.toLowerCase();
      const correctedHtml = hasFix ? `<p class="eval-corrected">${escapeHtml(a.fixed)}</p>` : '<p>جملتك صحيحة تماماً من حيث القواعد. استمر!</p>';
      const issuesHtml = a.issues.length ? `<ul class="eval-notes">${a.issues.map((i) => `<li>${i}</li>`).join('')}</ul>` : '';
      const alts = [];
      if (hasFix) alts.push(a.fixed);
      if (currentTopic) alts.push(currentTopic.suggestion);
      alts.push('Could you repeat the question, please?');
      const card = document.createElement('div');
      card.className = 'eval-card';
      card.innerHTML = `<div class="eval-title"><i class="fas fa-chart-column"></i> تقييم ردك الأخير</div><div class="eval-metrics"><div class="metric"><span class="m-label">الدقة</span><span class="m-value">${a.accuracy}/10</span></div><div class="metric"><span class="m-label">الكلمات</span><span class="m-value">${a.wordsScore}/10</span></div><div class="metric"><span class="m-label">القواعد</span><span class="m-value">${a.grammar}/10</span></div><div class="metric"><span class="m-label">نطق</span><span class="m-value">${a.pron}%</span></div></div><div class="eval-block"><h4>التصحيح النحوي:</h4>${correctedHtml}${issuesHtml}</div><div class="eval-block"><h4>اقتراحات بديلة:</h4><ul class="eval-alts">${alts.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul></div><div class="eval-block"><h4><i class="fas fa-microphone-lines"></i> تحليل النطق لكل كلمة:</h4><div class="pron-chips">${chips}</div></div>`;
      chat.appendChild(card); scrollDown();
    };

    const startTopic = async (key) => {
      const topic = topics[key];
      if (!topic || busy) return;
      busy = true;
      currentTopic = topic;
      followUpIndex = 0;
      setInputsEnabled(false);
      topicButtons.forEach((b) => b.classList.toggle('active', b.dataset.topic === key));
      chat.innerHTML = '';
      addTaskBanner(topic.task);
      await wait(800);
      addAiBubble(topic.welcome.en, topic.welcome.ar, null);
      await wait(1400);
      const listening = addListeningBubble();
      await wait(1600);
      listening.remove();
      addUserBubble(topic.demoReply, topic.demoReplyAr);
      await wait(1000);
      addEvalCard(analyze(topic.demoReply));
      await wait(1400);
      addAiBubble(topic.aiResponse.en, topic.aiResponse.ar, topic.suggestion);
      setInputsEnabled(true);
      busy = false;
    };

    const handleUserSend = async (text) => {
      const value = (text || input.value).trim();
      if (!value || busy || !currentTopic) return;
      busy = true;
      input.value = '';
      addUserBubble(value, translations[value.toLowerCase()] || null);
      await wait(900);
      addEvalCard(analyze(value));
      await wait(1200);
      const follow = currentTopic.followUps[followUpIndex % currentTopic.followUps.length];
      followUpIndex++;
      addAiBubble(follow.en, follow.ar, follow.suggestion);
      busy = false;
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let listeningBubble = null;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.onstart = () => { micBtn.classList.add('recording'); listeningBubble = addListeningBubble(); };
      recognition.onresult = (event) => { handleUserSend(event.results[0][0].transcript); };
      recognition.onerror = () => { showToast(tr('تعذر التعرف على الصوت. يمكنك الكتابة بدلاً من ذلك.', 'Voice recognition failed. You can type instead.'), 'error'); };
      recognition.onend = () => { micBtn.classList.remove('recording'); if (listeningBubble) { listeningBubble.remove(); listeningBubble = null; } };
    }

    micBtn.addEventListener('click', () => {
      if (micBtn.disabled || busy) return;
      if (!recognition) { showToast(tr('المتصفح لا يدعم التعرف الصوتي. يمكنك الكتابة بدلاً من ذلك.', 'Browser does not support voice recognition. You can type instead.'), 'error'); return; }
      if (micBtn.classList.contains('recording')) recognition.stop();
      else recognition.start();
    });
    sendBtn.addEventListener('click', () => handleUserSend());
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleUserSend(); } });
    topicButtons.forEach((btn) => { btn.addEventListener('click', () => startTopic(btn.dataset.topic)); });
    showPlaceholder();
  };

  /* ==========================================
     اختبار تحديد المستوى (يدعم اللغتين)
  ========================================== */
  const initQuiz = () => {
    const modal = $('#quiz-modal');
    const startScreen = $('#quiz-start');
    const bodyScreen = $('#quiz-body');
    const resultScreen = $('#quiz-result');
    const startBtn = $('#quiz-start-btn');
    const progressEl = $('#quiz-progress');
    const questionEl = $('#quiz-question');
    const optionsEl = $('#quiz-options');
    const nextBtn = $('#quiz-next-btn');
    if (!modal || !startScreen || !bodyScreen || !resultScreen || !startBtn || !progressEl || !questionEl || !optionsEl || !nextBtn) return;

    const questions = [
      { skill: 'Grammar', question: 'Choose the correct sentence:', options: ['I go to the mall yesterday.', 'I went to the mall yesterday.', 'I gone to the mall yesterday.', 'I going to the mall yesterday.'], answer: 1 },
      { skill: 'Vocabulary', question: 'ما مرادف كلمة "begin"؟', options: ['Stop', 'Start', 'Finish', 'Wait'], answer: 1 },
      { skill: 'Reading', question: '"Sara studies English every day." ما معنى هذه الجملة؟', options: ['سارة تدرس الإنجليزية كل يوم', 'سارة درست الإنجليزية أمس', 'سارة ستدرس غدًا', 'سارة لا تدرس'], answer: 0 },
      { skill: 'Listening', question: 'اختر الجملة الصحيحة:', options: ['My name is John.', 'My name are John.', 'My name were John.', 'My name being John.'], answer: 0 },
      { skill: 'Grammar', question: 'She ___ to school every morning.', options: ['go', 'goes', 'going', 'gone'], answer: 1 },
      { skill: 'Vocabulary', question: 'ضد كلمة "weak" هو:', options: ['tired', 'strong', 'slow', 'quiet'], answer: 1 },
      { skill: 'Reading', question: '"The weather is cold." ما معناها؟', options: ['الطقس بارد', 'الطقس حار', 'الطقس ممطر', 'الطقس مشمس'], answer: 0 },
      { skill: 'Grammar', question: 'I have lived here ___ 2020.', options: ['since', 'for', 'at', 'on'], answer: 0 },
    ];

    let current = 0, selected = null, overallScore = 0, skillStats = {};
    const resetState = () => {
      current = 0; selected = null; overallScore = 0; skillStats = {};
      questions.forEach((q) => { if (!skillStats[q.skill]) skillStats[q.skill] = { correct: 0, total: 0 }; });
    };

    const renderQuestion = () => {
      selected = null;
      nextBtn.disabled = true;
      const q = questions[current];
      progressEl.textContent = tr(`السؤال ${current + 1} من ${questions.length} — ${q.skill}`, `Question ${current + 1} of ${questions.length} — ${q.skill}`);
      questionEl.textContent = q.question;
      optionsEl.innerHTML = '';
      q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', () => {
          selected = index;
          $$('.quiz-option', optionsEl).forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
          nextBtn.disabled = false;
        });
        optionsEl.appendChild(btn);
      });
    };

    const renderResult = () => {
      const percent = Math.round((overallScore / questions.length) * 100);
      let level = 'A1';
      if (percent >= 85) level = 'C1';
      else if (percent >= 70) level = 'B2';
      else if (percent >= 55) level = 'B1';
      else if (percent >= 40) level = 'A2';
      const strengths = [], weaknesses = [];
      Object.entries(skillStats).forEach(([skill, data]) => {
        const p = data.total ? Math.round((data.correct / data.total) * 100) : 0;
        if (p >= 70) strengths.push(skill); else weaknesses.push(skill);
      });
      resultScreen.innerHTML = `<div class="quiz-result-box"><h3>${tr('نتيجتك', 'Your Result')}</h3><div class="quiz-score">${percent}%</div><p><strong>${tr('المستوى المقترح:', 'Suggested Level:')}</strong> ${level}</p><p><strong>${tr('نقاط القوة:', 'Strengths:')}</strong> ${strengths.length ? strengths.join('، ') : tr('لا توجد بعد', 'None yet')}</p><p><strong>${tr('نقاط الضعف:', 'Weaknesses:')}</strong> ${weaknesses.length ? weaknesses.join('، ') : tr('لا توجد نقاط ضعف واضحة', 'No clear weaknesses')}</p><p>${tr('بناءً على نتيجتك، ننصحك بالتركيز على دروس نقاط الضعف مع مراجعة يومية قصيرة.', 'Based on your result, we recommend focusing on weak areas with a short daily review.')}</p><button id="quiz-restart-btn" class="btn btn-outline" type="button">${tr('إعادة الاختبار', 'Retake Test')}</button></div>`;
      resultScreen.hidden = false;
      const restartBtn = $('#quiz-restart-btn');
      if (restartBtn) restartBtn.addEventListener('click', () => { resetState(); resultScreen.hidden = true; bodyScreen.hidden = false; renderQuestion(); });
    };

    startBtn.addEventListener('click', () => { resetState(); startScreen.hidden = true; resultScreen.hidden = true; bodyScreen.hidden = false; renderQuestion(); });
    nextBtn.addEventListener('click', () => {
      if (selected === null) return;
      const q = questions[current];
      skillStats[q.skill].total += 1;
      if (selected === q.answer) { overallScore += 1; skillStats[q.skill].correct += 1; }
      current += 1;
      if (current < questions.length) renderQuestion();
      else { bodyScreen.hidden = true; renderResult(); }
    });
    resetState();
  };

  /* ==========================================
     عداد الأرقام في الهيرو
  ========================================== */
  const initHeroCounters = () => {
    const counters = $$('.hero-stats .stat-number');
    if (!counters.length) return;
    counters.forEach((counter) => {
      const target = +counter.dataset.target;
      if (!target) return;
      let current = 0;
      const step = target / 100;
      const updateCounter = () => {
        if (current < target) { current += step; counter.textContent = Math.ceil(current); requestAnimationFrame(updateCounter); }
        else counter.textContent = target;
      };
      setTimeout(updateCounter, 300);
    });
  };

  /* ==========================================
     نظام اللغتين AR / EN
  ========================================== */
  const I18N = {
    'Langhub منصة متكاملة تأخذك من المستوى التأسيسي (A1) إلى الاحتراف (C2).': 'Langhub is an all-in-one platform that takes you from beginner (A1) to mastery (C2).',
    'اختر موضوعاً، واستمع لسؤال المعلم الذكي، ثم أجب بصوتك لتحصل على تقييم فوري وتصحيح أخطائك': "Pick a topic, listen to the smart teacher's question, then answer with your voice to get instant evaluation and corrections",
    'جرّب الآن: اختر موضوعاً بالأعلى، وسيبدأ المعلم الذكي بطرح سؤاله، ثم اضغط على زر الميكروفون وأجب بصوتك (أو اكتب ردك) لترى تقييمك وتصحيح أخطائك فوراً.': 'Try now: pick a topic above and the smart teacher will ask a question, then press the mic and answer with your voice (or type your reply) to see your evaluation and corrections instantly.',
    'احفظ كلمة وجملة جديدة كل يوم بدون مجهود كبير': 'Save a new word and sentence every day without much effort',
    'طور مهاراتك في اللغة الإنجليزية عبر كورسات مصممة بعناية': 'Improve your English skills with carefully designed courses',
    'اختبر مستواك في كل مهارة واحصل على خطة مخصصة توفر وقتك': 'Test your level in every skill and get a personalized plan that saves your time',
    'اكتشف المهارات التي تتقنها والمهارات التي تحتاج تركيزًا أكبر.': 'Discover the skills you master and the skills that need more focus.',
    'احصل على دروس مركزة على نقاط ضعفك بدلًا من الدراسة العشوائية.': 'Get lessons focused on your weaknesses instead of random studying.',
    'ركّز على ما تحتاجه فعلًا وقلل الوقت الضائع في دروس غير مناسبة.': 'Focus on what you truly need and reduce wasted time on unsuitable lessons.',
    'أجب على أسئلة قصيرة لتحديد مستواك الحالي بدقة.': 'Answer short questions to determine your current level accurately.',
    'نحن هنا للإجابة على استفساراتك': 'We are here to answer your questions',
    'تعرف على واجهة التطبيق وتجربة المستخدم': 'Get to know the app interface and user experience',
    '6 مستويات للمبتدئين حتى الاحتراف': '6 levels from beginner to mastery',
    'ابدأ رحلة تعلم الإنجليزية اليوم': 'Start your English learning journey today',
    'منصتك المثالية لتعلم الإنجليزية.': 'Your ideal platform for learning English.',
    'اختبار تجريبي سريع لتحليل مستواك العام في اللغة الإنجليزية.': 'A quick trial test to analyze your general English level.',
    'نحن نعمل بجد لتوفير نسخة لأجهزة iOS': 'We are working hard to provide an iOS version',
    'دقائق قليلة يوميًا تصنع فرقًا كبيرًا في مستواك.': 'A few minutes a day make a big difference in your level.',
    'راجع الكلمات السابقة في الوقت المناسب حتى تثبت في ذاكرتك.': 'Review previous words at the right time so they stick in your memory.',
    'تعلّم جملة كاملة جاهزة للاستخدام في حياتك اليومية.': 'Learn a full sentence ready to use in your daily life.',
    'استقبل كلمة جديدة مع معناها ونطقها يوميًا.': 'Receive a new word with its meaning and pronunciation daily.',
    'تعلّم قراءة النصوص الإنجليزية بسرعة وفهم أعمق.': 'Learn to read English texts quickly with deeper understanding.',
    'درّب أذنك على فهم المحادثات واللهجات المختلفة.': 'Train your ear to understand conversations and accents.',
    'تحدث بثقة في المواقف اليومية والعملية.': 'Speak confidently in daily and professional situations.',
    'من الجملة البسيطة إلى الفقرة والمقال.': 'From simple sentences to paragraphs and essays.',
    'افهم القواعد من داخل الجمل الحقيقية.': 'Understand grammar within real sentences.',
    'احفظ جملًا كاملة واستخرج منها المفردات والمعاني.': 'Memorize full sentences and extract vocabulary and meanings.',
    'تعلم يومي قصير يعتمد على الأخطاء الشائعة والنصائح الذكية.': 'Short daily learning based on common mistakes and smart tips.',
    'منصة مصممة خصيصاً ليجعل التعلم ممتعاً': 'A platform designed to make learning enjoyable',
    'تجربة حية مطابقة للتطبيق: اختر قسمك، أجب على 30 سؤالاً، واستلم مسارك المخصص': 'A live experience just like the app: choose your section, answer 30 questions, and get your personalized path',
    'اختر قسمك': 'Choose your section',
    'عشرة أقسام متخصصة من الأساسيات إلى الكتابة، كل قسم باختبار مستقل.': 'Ten specialized sections from Basics to Writing, each with its own independent test.',
    'اختبار تشخيصي من 30 سؤالاً': '30-question diagnostic test',
    '5 أسئلة لكل مستوى من A1 إلى C2 لقياس دقيق لمستواك في كل موضوع.': '5 questions for each level from A1 to C2 to measure your level accurately in every topic.',
    'تحليل ذكي شامل': 'Comprehensive smart analysis',
    'تحليل المستويات، الدقة لكل موضوع، نقاط قوتك ونقاط ضعفك.': 'Level analysis, accuracy per topic, your strengths and weaknesses.',
    'مسار مخصص': 'Personalized path',
    'دروس تُرتَّب تلقائياً بدءاً من أضعف مهاراتك لتصل إلى الاحتراف بأقصر وقت.': 'Lessons are automatically ordered starting from your weakest skills so you reach mastery in the shortest time.',
    'احصل على المسار الكامل في التطبيق': 'Get the Full Path in the App',
    'كل درس يبدأ بشرح وافٍ': 'Every lesson starts with a clear explanation',
    'راقب تقدمك بدقة': 'Track your progress accurately',
    'واجهة سهلة وبسيطة': 'Easy and simple interface',
    'أكثر من 200 درس': 'More than 200 lessons',
    'محتوى جديد باستمرار': 'New content all the time',
    'دروس مرتبة حسب المستوى': 'Lessons ordered by level',
    'تحليل نقاط القوة والضعف': 'Strengths & Weaknesses Analysis',
    'خطة تعلم مخصصة': 'Personalized Learning Plan',
    'اختبار تحديد المستوى': 'Placement Test',
    'ابدأ اختبار تحديد المستوى': 'Start the Placement Test',
    'تفعيل الإشعارات اليومية': 'Enable Daily Notifications',
    'حمل تطبيق Langhub الآن': 'Download Langhub Now',
    'حمل التطبيق الآن': 'Download the App Now',
    'اكتشف المزيد': 'Discover More',
    'تواصل معنا': 'Contact Us',
    'الإشعارات الذكية': 'Smart Notifications',
    'المستويات التعليمية': 'Learning Levels',
    'صور من التطبيق': 'App Screenshots',
    'الكورسات المتخصصة': 'Specialized Courses',
    'لماذا تختار Langhub؟': 'Why Choose Langhub?',
    'تحدث مع الذكاء الاصطناعي': 'Talk with AI',
    'كورس القراءة الاحترافية': 'Professional Reading Course',
    'كورس الاستماع الذكي': 'Smart Listening Course',
    'كورس المحادثة المنهجي': 'Systematic Conversation Course',
    'كورس الكتابة الإبداعية': 'Creative Writing Course',
    'كورس القواعد الاحترافية': 'Professional Grammar Course',
    'التعلم من خلال جمل إنجليزية': 'Learning Through English Sentences',
    'التعلم بأفكار توعوية': 'Learning with Awareness Tips',
    'المسار الذكي': 'Smart Path',
    'المحادثة': 'Conversation',
    'الإشعارات': 'Notifications',
    'معرض الصور': 'Gallery',
    'اتصل بنا': 'Contact Us',
    'الرئيسية': 'Home',
    'الميزات': 'Features',
    'الكورسات': 'Courses',
    'المستويات': 'Levels',
    'تحميل': 'Download',
    'درس تفاعلي': 'Interactive Lessons',
    'سؤال تدريبي': 'Practice Questions',
    'مستويات متقدمة': 'Advanced Levels',
    'تسلسل ذكي': 'Smart Sequencing',
    'شرح ثم اختبار': 'Explain then Test',
    'تتبع التقدم': 'Progress Tracking',
    'تجربة ممتازة': 'Great Experience',
    'دروس غير محدودة': 'Unlimited Lessons',
    'تحديثات مستمرة': 'Continuous Updates',
    'اختبار سريع': 'Quick Test',
    'توفير الوقت': 'Save Time',
    'كلمة اليوم': 'Word of the Day',
    'جملة اليوم': 'Sentence of the Day',
    'مراجعة ذكية': 'Smart Review',
    'تذكيرات قصيرة': 'Short Reminders',
    'تعلم اليوم': 'Learn Today',
    'مستخدم نشط': 'Active Users',
    'درس تعليمي': 'Educational Lessons',
    'تقييم المستخدمين': 'User Ratings',
    'تحميل مباشر': 'Direct Download',
    'إرسال الرسالة': 'Send Message',
    'روابط سريعة': 'Quick Links',
    'النشرة البريدية': 'Newsletter',
    'فيسبوك': 'Facebook',
    'انستغرام': 'Instagram',
    'لينكد إن': 'LinkedIn',
    'البريد الإلكتروني': 'Email',
    'قريبًا على App Store': 'Coming soon on App Store',
    'قيد التطوير حالياً': 'Currently under development',
    'ابدأ الاختبار': 'Start the Test',
    'التالي': 'Next',
    'حسناً': 'OK',
    'المستوى الأول': 'Level 1',
    'المستوى الثاني': 'Level 2',
    'المستوى الثالث': 'Level 3',
    'المستوى الرابع': 'Level 4',
    'ابدأ الآن': 'Start Now',
    'A1 - التأسيسي': 'A1 - Foundation',
    'A2 - الأساسي': 'A2 - Basic',
    'B1 - المتوسط': 'B1 - Intermediate',
    'B2 - فوق المتوسط': 'B2 - Upper Intermediate',
    'C1 - المتقدم': 'C1 - Advanced',
    'C2 - الاحتراف': 'C2 - Mastery',
    '40 درساً': '40 Lessons',
    'هذا القسم متاح داخل التطبيق': 'This Section is Available in the App',
    'يمكنك اختبار هذا القسم عبر تطبيق Langhub — حمّله الآن واختر طريقة التحميل المناسبة لك.': 'You can try this section through the Langhub app — download it now and choose the download method that suits you.',
    'تحميل التطبيق': 'Download the App',
    'قريبًا على Google Play': 'Coming soon on Google Play',
    'التطبيق متوفر على أجهزة Android ويمكنك تحميله من HUAWEI AppGallery': 'The app is available on Android devices and you can download it from HUAWEI AppGallery',
    'نعمل على توفيرة في متجر Google Play قريباً': 'We are working to make it available on Google Play soon',
    'منصة اللغة. جميع الحقوق محفوظة': 'Language Platform. All rights reserved.',
    'منصة اللغة': 'Language Platform',
    'الاسم الكامل': 'Full Name',
    'رسالتك': 'Your message',
    'بريدك الإلكتروني': 'Your email',
  };
  const I18N_KEYS = Object.keys(I18N).sort((a, b) => b.length - a.length);

  const originalTexts = new WeakMap();
  const originalHtml = new WeakMap();
  const originalAttrs = new WeakMap();
  const translatedMixed = new Set();
  const MIXED_SEL = 'h1, h2, h3, h4, h5, p, a, button, strong, small, span, li';
  const inPhone = (el) => el.closest('.ai-phone, .sp-phone');

  /* حفظ النصوص الأصلية قبل أي ترجمة */
  const captureOriginals = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (!originalTexts.has(n)) originalTexts.set(n, n.nodeValue);
    }
    $$(MIXED_SEL).forEach((el) => {
  if (!el.children.length || inPhone(el) || !originalHtml.has(el)) return;
  if (el.querySelector('a')) return;
});
  };

  /* ترجمة العناصر المقطوعة بـ span مع الحفاظ على تأثير highlight */
  const translateMixedElements = () => {
    $$(MIXED_SEL).forEach((el) => {
      if (!el.children.length || inPhone(el) || !originalHtml.has(el)) return;
      const tmp = document.createElement('div');
      tmp.innerHTML = originalHtml.get(el);
      const en = I18N[tmp.textContent.trim()];
      if (!en) return;
      let html = en;
      /* 1) الحفاظ على الأيقونات إن وجدت */
      const icons = (originalHtml.get(el).match(/<i\b[^>]*>\s*<\/i>|<img\b[^>]*>/g) || []).join(' ');
      if (icons) html = icons + ' ' + html;
      /* 2) إعادة تطبيق highlight على الكلمة المقابلة */
      const hl = tmp.querySelector('.highlight') || tmp.querySelector('span');
      if (hl) {
        const t = hl.textContent.trim();
        if (t && html.includes(t)) {
          html = html.replace(t, `<span class="${hl.className}">${t}</span>`);
        } else {
          html = html.replace(/([A-Za-z0-9]+)([?!.,؛:]?)$/, `<span class="${hl.className}">$1</span>$2`);
        }
      }
      el.innerHTML = html;
      translatedMixed.add(el);
    });
  };

  const applyLang = (lang) => {
    if (lang === 'en') captureOriginals();
    LANG = lang;
    localStorage.setItem('langhub-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.title = lang === 'en' ? 'Langhub | Language Platform' : 'Langhub | منصة اللغة';

    /* عند الرجوع للعربية: استعادة العناصر المختلطة أولاً */
    if (lang === 'ar') {
      translatedMixed.forEach((el) => { if (originalHtml.has(el)) el.innerHTML = originalHtml.get(el); });
      translatedMixed.clear();
    }

    /* ترجمة النصوص العادية */
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || inPhone(p) || p.closest('script, style')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (lang === 'ar') { if (originalTexts.has(node)) node.nodeValue = originalTexts.get(node); return; }
      let val = originalTexts.get(node) || node.nodeValue;
      I18N_KEYS.forEach((ar) => { if (val.includes(ar)) val = val.split(ar).join(I18N[ar]); });
      node.nodeValue = val;
    });

    /* ترجمة العناوين المقطوعة بـ span أو أيقونة */
    if (lang === 'en') translateMixedElements();

    /* ترجمة الـ placeholders */
    $$('input[placeholder], textarea[placeholder]').forEach((el) => {
      if (inPhone(el)) return;
      if (!originalAttrs.has(el)) originalAttrs.set(el, el.getAttribute('placeholder'));
      if (lang === 'ar') { el.setAttribute('placeholder', originalAttrs.get(el)); return; }
      let val = originalAttrs.get(el);
      I18N_KEYS.forEach((ar) => { if (val.includes(ar)) val = val.split(ar).join(I18N[ar]); });
      el.setAttribute('placeholder', val);
    });

    const langBtn = $('#lang-toggle');
    if (langBtn) langBtn.textContent = lang === 'en' ? 'عربي' : 'EN';
    startTyping();
    renderDailyWord();
  };

  const initLang = () => {
    const langBtn = $('#lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => applyLang(LANG === 'ar' ? 'en' : 'ar'));
    if (LANG === 'en') applyLang('en');
  };

  /* ==========================================
     السنة في الفوتر
  ========================================== */
  const initFooterYear = () => {
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  };

  /* ============================================================
     ✅ التعديل ② : إعادة ترتيب التشغيل
     - نُقدّم تشغيل اللغة (initLang) والسنة (initFooterYear)
       قبل المسار الذكي حتى يعمل تبديل اللغة دائماً.
     - نضع المسار الذكي داخل try/catch حتى لا يؤدي أي خطأ فيه
       إلى إيقاف بقية تهيئة الموقع (وهذا ما كان يحدث سابقاً).
  ============================================================ */
  const init = () => {
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initNavbarScroll();
    initTheme();
    initTyping();
    initForms();
    initModals();
    initDailyWord();
    initAiChat();
    initHeroCounters();
    initQuiz();
    initLang();          // ✅ يعمل الآن دائماً
    initFooterYear();    // ✅ يعمل الآن دائماً
    try {
      if (typeof initSmartPath === 'function') initSmartPath();
    } catch (err) {
      console.error('Smart Path init failed:', err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();