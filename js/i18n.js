/* ==========================================================================
   Bilingual support (English default · Arabic / RTL)
   English text lives in the HTML / main.js; this file holds the Arabic
   dictionary and the switching logic. Add a key to the HTML with
   data-i18n="key" (text) or data-i18n-html="key" (markup), and add its
   Arabic string below.
   ========================================================================== */
(function () {
  'use strict';
  var KEY = 'ma-portfolio-lang';
  var root = document.documentElement;

  var AR = {
    'meta.title': 'محمد عبد الله — مهندس ذكاء اصطناعي ورؤية حاسوبية',
    'meta.desc': 'محمد عبد الله مهندس ذكاء اصطناعي متخصص في الرؤية الحاسوبية وأنظمة LLM وبنى RAG وهندسة الأنظمة الخلفية. استعرض المشاريع والخبرات والمهارات.',
    'nav.about': 'نبذة', 'nav.experience': 'الخبرات', 'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع', 'nav.stack': 'التقنيات', 'nav.contact': 'تواصل',
    'loader': 'جارٍ التحميل',
    'hero.eyebrow': 'مهندس ذكاء اصطناعي · رؤية حاسوبية · أنظمة LLM',
    'hero.name': 'محمد<br><span class="hero__title-accent">عبد الله</span>',
    'hero.summary': 'أصمّم وأنفّذ أنظمة ذكية متكاملة — من خطوط الرؤية الحاسوبية اللحظية ومساعدات RAG المدعومة بالنماذج اللغوية، إلى البنية الخلفية والواجهات التي تضعها بين يدي المستخدمين الحقيقيين.',
    'hero.resume': 'تحميل السيرة الذاتية', 'hero.contact': 'تواصل معي', 'hero.projects': 'عرض المشاريع',
    'hero.loc': 'دمشق، سوريا', 'hero.remote': 'متاح للعمل عن بُعد', 'hero.scroll': 'مرّر',
    'about.eyebrow': '01 / نبذة', 'about.title': 'مفكّر نظم يُنجز خطوط العمل كاملة',
    'about.p1': 'أنا مهندس ذكاء اصطناعي مقيم في دمشق، سوريا، أركّز على بناء برمجيات تفهم العالم الحقيقي وتتصرف بناءً عليه — سواء كان بثّ كاميرا أو مجموعة مستندات أو طلب REST. أتنقّل بسلاسة عبر الحزمة التقنية كلها: تصميم قاعدة البيانات، وبناء الواجهة البرمجية، وتدريب النموذج، وتسليم الواجهة التي تجمع ذلك كله.',
    'about.p2': 'تشمل خلفيتي <strong>الرؤية الحاسوبية</strong> للأجهزة المدمجة والطرفية، وأنظمة <strong>LLM وRAG</strong> لاسترجاع المعرفة، و<strong>هندسة الأنظمة الخلفية</strong> للخدمات التي يجب أن تبقى سريعة وآمنة وقابلة للمراقبة في الإنتاج.',
    'tag.1': 'مهندس ذكاء اصطناعي', 'tag.2': 'خبير Python', 'tag.3': 'مطوّر أنظمة خلفية',
    'tag.4': 'مطوّر React', 'tag.5': 'مهندس رؤية حاسوبية', 'tag.6': 'مطوّر LLM',
    'stat.1': 'سنوات الخبرة', 'stat.2': 'مشاريع منجزة', 'stat.3': 'تقنيات مستخدمة', 'stat.4': 'شركات عملت معها',
    'exp.eyebrow': '02 / الخبرات', 'exp.title': 'الخبرات المهنية',
    'exp0.title': 'مهندس برمجيات مستقل', 'exp0.date': 'أيار 2026 – حتى الآن', 'exp0.org': 'عمل حر',
    'exp0.1': 'أبني تطبيقات خلفية مخصصة وواجهات REST باستخدام Python وDjango وFastAPI، تشمل قواعد البيانات والمصادقة والتكامل مع خدمات خارجية',
    'exp0.2': 'أطوّر تطبيقات LLM وRAG ووكلاء الذكاء الاصطناعي، منها مساعدات معرفية تعتمد نماذج التضمين وقواعد البيانات المتجهية',
    'exp0.3': 'أقدّم حلول رؤية حاسوبية لاكتشاف الأجسام وتحليلات الفيديو، وأنشر التطبيقات وأصونها على Linux وDocker',
    'exp3.title': 'مطوّر Python مستقل', 'exp3.date': 'كانون الثاني 2018 – كانون الثاني 2023', 'exp3.org': 'عمل حر',
    'exp3.1': 'بنيت تطبيقات ويب وأنظمة خلفية بـ Django وDjango REST Framework مع PostgreSQL وMySQL وMongoDB',
    'exp3.2': 'أنشأت واجهات متجاوبة (HTML وCSS وJavaScript وBootstrap)، وجمعت متطلبات العملاء وسلّمت برمجيات مخصصة',
    'exp1.title': 'مطوّر أنظمة خلفية', 'exp1.date': 'أيار 2024 – نيسان 2026',
    'exp1.1': 'صمّمت واجهات RESTful قابلة للتوسع تربط تطبيقات العملاء بأنظمة الخادم',
    'exp1.2': 'هندستُ وحسّنتُ طبقات البيانات في PostgreSQL وMySQL وSQL Server وMongoDB',
    'exp1.3': 'نفّذت منطق الخادم الأساسي بإطار Django ليغطي العمليات التجارية الرئيسية',
    'exp1.4': 'دمجت OAuth وJWT لتأمين الوصول إلى الخدمات الخلفية',
    'exp1.5': 'حسّنت قابلية التوسع عبر موازنة الأحمال والتخزين المؤقت بـ Redis وضبط الموارد',
    'exp1.6': 'ساهمت في الانتقال من البنية المتجانسة إلى الخدمات المصغّرة باستخدام Docker وKubernetes',
    'exp1.7': 'بنيت خطوط CI/CD بـ Jenkins وGitLab CI للاختبار والتسليم الآلي',
    'exp2.title': 'مهندس رؤية حاسوبية', 'exp2.date': 'شباط 2023 – أذار 2024',
    'exp2.1': 'طوّرت وضبطت خوارزميات اكتشاف الأجسام وتتبعها في الزمن الحقيقي',
    'exp2.2': 'حسّنت نماذج الرؤية لتعمل على المنصات المدمجة محدودة الموارد',
    'exp2.3': 'دربت ونشرت وصنت نماذج تعلّم الآلة للاكتشاف والتصنيف والتجزئة',
    'exp2.4': 'تعاونت مع فرق العتاد لدمج خطوط الرؤية في الأنظمة المدمجة',
    'exp2.5': 'خفّضت زمن الاستجابة ورفعت الإنتاجية في الاستدلال على الأجهزة الطرفية',
    'exp2.6': 'أجريت اختبارات جودة صارمة لدقة الاكتشاف ووثّقت النماذج وخطوط المعالجة',
    'skills.eyebrow': '03 / المهارات', 'skills.title': 'الكفاءات المُكتشفة',
    'proj.eyebrow': '04 / المشاريع', 'proj.title': 'أعمال مختارة',
    'f.all': 'الكل', 'f.cv': 'الرؤية الحاسوبية', 'f.backend': 'أنظمة خلفية', 'f.ai': 'ذكاء اصطناعي', 'f.llm': 'LLM', 'f.fullstack': 'تطوير متكامل',
    'stack.eyebrow': '05 / التقنيات', 'stack.title': 'أدوات المهنة',
    'achv.eyebrow': '06 / الإنجازات', 'achv.title': 'الأثر بالأرقام',
    'achv.1': 'مشاريع مكتملة', 'achv.2': 'واجهات برمجية خلفية', 'achv.3': 'نماذج ذكاء اصطناعي مدرّبة',
    'achv.4': 'أنظمة رؤية حاسوبية', 'achv.5': 'تطبيقات LLM',
    'cert.eyebrow': '07 / الشهادات', 'cert.title': 'المؤهلات',
    'edu1.title': 'ماجستير في علوم الويب والذكاء الاصطناعي', 'edu1.org': 'الجامعة الافتراضية السورية', 'edu1.date': '2024 – حتى الآن',
    'edu2.title': 'إجازة في الهندسة المعلوماتية', 'edu2.org': 'جامعة حلب', 'edu2.date': '2021',
    'contact.eyebrow': '08 / تواصل', 'contact.title': 'لنبنِ شيئًا ذكيًا معًا',
    'contact.lead': 'لديك وظيفة أو مشروع أو سؤال عن عمل ما؟ عادةً أردّ خلال يوم.',
    'form.name': 'الاسم', 'form.email': 'البريد الإلكتروني', 'form.subject': 'الموضوع', 'form.message': 'الرسالة',
    'form.send': 'إرسال الرسالة',
    'form.err': 'يرجى إدخال اسمك وبريد إلكتروني صحيح ورسالة.',
    'form.ok': 'شكرًا {name} — رسالتك جاهزة. جارٍ فتح بريدك الإلكتروني…',
    'form.subj': 'تواصل من الموقع',
    'footer.tag': 'مهندس ذكاء اصطناعي · رؤية حاسوبية · أنظمة LLM · تطوير متكامل',
    'footer.name': 'محمد عبد الله', 'footer.built': 'بُني باستخدام HTML وCSS وJavaScript — بدون أطر عمل.',
    'aria.theme': 'تبديل السمة', 'aria.burger': 'تبديل قائمة التنقل', 'aria.top': 'العودة للأعلى',
    'aria.lang': 'تغيير اللغة', 'lang.btn': 'EN',
    'roles': ['مهندس ذكاء اصطناعي', 'مطوّر أنظمة خلفية', 'مطوّر متكامل', 'مهندس رؤية حاسوبية', 'مهندس LLM'],
    'skillTitles': ['لغات البرمجة', 'الأنظمة الخلفية', 'الواجهات الأمامية', 'قواعد البيانات', 'DevOps',
      'الذكاء الاصطناعي', 'الرؤية الحاسوبية', 'الأنظمة المدمجة', 'LLM والذكاء التوليدي', 'الاختبار', 'هندسة البرمجيات'],
    'cats': { cv: 'الرؤية الحاسوبية', ai: 'ذكاء اصطناعي', llm: 'LLM', fullstack: 'تطوير متكامل', backend: 'أنظمة خلفية' },
    'projects': [
      ['اكتشاف الأجسام اللحظي بـ YOLO11 وTensorRT', 'اكتشاف أجسام بنموذج YOLO11 مسرَّع بـ TensorRT لكاميرا الويب وبثّ الفيديو، مع عتبات ثقة قابلة للضبط وعرض FPS وحفظ المخرجات المعلَّمة.'],
      ['التعرّف على إيماءات اليد — 10 فئات', 'شبكة CNN مدرَّبة بتعزيز الصور والتطبيع لتصنيف عشر إيماءات يدوية، من الإبهام المرفوع إلى إشارات حجر-ورقة-مقص.'],
      ['اكتشاف المشاعر البشرية', 'مصنّف لتعابير الوجه يميّز الغضب والسعادة والحزن باستخدام استخلاص ميزات CNN وتقييم بمصفوفة الارتباك.'],
      ['تشخيص الملاريا بـ TensorFlow', 'مصنّف صور طبية يميّز خلايا الدم المصابة بالملاريا من السليمة عبر عدة معماريات CNN.'],
      ['التعرّف على الأرقام المكتوبة بخط اليد بـ Keras', 'شبكة عصبية متصلة بالكامل تصنّف الأرقام من 0 إلى 9 عبر مخرج softmax من عشر فئات.'],
      ['روبوت دردشة RAG للأزياء', 'مساعد أزياء للتجارة الإلكترونية يجمع البحث الدلالي وBM25 الهجين على مخزن Weaviate مع نموذج LLM عبر Groq للتوصيات، ويُقدَّم عبر FastAPI.'],
      ['مساعد صوتي عربي لحظي', 'مساعد صوتي عربي حواري يحوّل الكلام إلى نص عبر WebSocket، ويولّد الردود بـ Gemini، ويجيب بتحويل نص إلى كلام مسرَّع بـ GPU.'],
      ['توقّع أسعار السيارات بـ TensorFlow', 'نموذج انحدار يتوقع سعر إعادة بيع السيارة من العمر والمسافة والحالة والمواصفات، مع مقارنة MAE وMSE وHuber.'],
      ['تصنيف انسحاب العملاء', 'نظام متكامل للتنبؤ بانسحاب العملاء يعالج اختلال الفئات والترميز والتحجيم، مع خط معالجة محفوظ للتنبؤ بعملاء جدد.'],
      ['توقّع اشتراك عملاء البنك', 'مصنّف ثنائي يتوقع اشتراك العميل في خدمة بنكية من بياناته الديموغرافية وتفاصيل حسابه وتاريخ الحملات.'],
      ['مصنّف البريد المزعج بـ Keras', 'خط معالجة لاكتشاف البريد المزعج: تجزئة نصوص وإزالة كلمات توقف وميزات TF-IDF تغذي مصنّفًا ثنائيًا بـ Keras، مع سحابة كلمات.'],
      ['MeetMesh — منصة اجتماعات فيديو ذاتية الاستضافة', 'تطبيق مؤتمرات فيديو ذاتي الاستضافة بصوت وصورة نظير-لنظير ومشاركة الشاشة وتحكم بالميكروفون والكاميرا ودردشة، باستخدام Django Channels وRedis للإشارات اللحظية.']
    ]
  };

  var lang = 'en';
  try { var s = localStorage.getItem(KEY); if (s === 'ar') lang = 'ar'; } catch (e) {}

  function t(key, vars) {
    var v = AR[key];
    if (v == null) return null;
    if (vars) Object.keys(vars).forEach(function (k) { v = v.replace('{' + k + '}', vars[k]); });
    return v;
  }

  function setDir() {
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }
  setDir(); // before first paint

  function cacheEn(el, html) {
    if (el._en === undefined) el._en = html ? el.innerHTML : el.textContent;
    return el._en;
  }
  function apply() {
    var ar = lang === 'ar';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var en = cacheEn(el, false);
      el.textContent = ar ? (AR[el.getAttribute('data-i18n')] || en) : en;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var en = cacheEn(el, true);
      el.innerHTML = ar ? (AR[el.getAttribute('data-i18n-html')] || en) : en;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      if (el._enAria === undefined) el._enAria = el.getAttribute('aria-label');
      el.setAttribute('aria-label', ar ? AR[el.getAttribute('data-i18n-aria')] : el._enAria);
    });
    document.querySelectorAll('[data-href-ar]').forEach(function (el) {
      if (el._enHref === undefined) el._enHref = el.getAttribute('href');
      el.setAttribute('href', ar ? el.getAttribute('data-href-ar') : el._enHref);
    });
    document.querySelectorAll('[data-meta]').forEach(function (el) {
      if (el._enMeta === undefined) el._enMeta = el.getAttribute('content');
      var k = el.getAttribute('data-meta');
      el.setAttribute('content', ar ? AR[k] : el._enMeta);
    });
    if (document._enTitle === undefined) document._enTitle = document.title;
    document.title = ar ? AR['meta.title'] : document._enTitle;
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = ar ? AR['lang.btn'] : 'عربي';
  }

  function set(next) {
    lang = next === 'ar' ? 'ar' : 'en';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    setDir();
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  window.I18N = {
    get lang() { return lang; },
    t: t,
    set: set,
    toggle: function () { set(lang === 'ar' ? 'en' : 'ar'); },
    // pick Arabic list/map entry when Arabic is active, else the English fallback
    pick: function (key, idx, fallback) {
      if (lang !== 'ar') return fallback;
      var v = AR[key];
      return v && v[idx] != null ? v[idx] : fallback;
    },
    roles: function (en) { return lang === 'ar' ? AR.roles : en; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', function () { window.I18N.toggle(); });
    if (lang === 'ar') apply(); else apply(); // caches English, sets button label
  });
})();
