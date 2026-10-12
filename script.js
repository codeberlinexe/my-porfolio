const body = document.body;
const toggle = document.querySelector('.theme-toggle');
const icon = document.querySelector('.theme-icon');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const languageToggle = document.querySelector('.language-toggle');

const translations = {
  en: {
    navHome:'Home', navAbout:'About', navSkills:'Skills', navProjects:'Projects', navContact:'Contact', available:'Available for new projects', heroTitle:'I create <em>digital</em> experiences that matter.', intro:'Hello, I am <strong>Amine Nefati</strong> — a web development student based in Morocco.', viewProjects:'View my projects', contactMe:'Contact me', creative:'creative', scroll:'Scroll',
    aboutLabel:'ABOUT', aboutTitle:'Curious by nature.<br /><em>Creative</em> by choice.', aboutText1:'I am a student passionate about web development and creating simple, useful and enjoyable digital products.', aboutText2:'Every project is a chance to learn, experiment and turn an idea into a real experience.', location:'LOCATION', morocco:'Morocco 🇲🇦', education:'EDUCATION', webDev:'Web Development', status:'STATUS', beginner:'Beginner · Learning',
    skillsLabel:'SKILLS', skillsTitle:'What I am currently<br /><em>learning.</em>', htmlText:'I build the structure of web pages and learn the right tags.', structure:'Structure', tags:'Tags', forms:'Forms', cssText:'I am learning colours, spacing and responsive layouts.', colours:'Colours', jsText:'I am starting to add simple interactions to my web pages.', variables:'Variables', conditions:'Conditions',
    projectsLabel:'PROJECTS', allProjects:'All projects', projectsTitle:'A few selected<br /><em>works.</em>', studioText:'Landing page for a creative agency', hello:'Hello, Adam 👋', expenses:'Your spending this month', budgetText:'Budget management application', contactLabel:'CONTACT', contactEyebrow:'AN IDEA, A PROJECT?', contactTitle:"Let's talk<br /><em>together.</em>", contactAction:'Message me on Instagram <span>↗</span>', madeWith:'Made with passion.'
  },
  ar: {
    navHome:'الرئيسية', navAbout:'عني', navSkills:'المهارات', navProjects:'المشاريع', navContact:'تواصل', available:'متاح لمشاريع جديدة', heroTitle:'أصنع تجارب <em>رقمية</em> لها معنى.', intro:'مرحباً، أنا <strong>أمين النفاتي</strong> — طالب في تطوير الويب من المغرب.', viewProjects:'شاهد مشاريعي', contactMe:'تواصل معي', creative:'مبدع', scroll:'اكتشف المزيد',
    aboutLabel:'عني', aboutTitle:'فضولي بطبيعتي.<br /><em>مبدع</em> باختياري.', aboutText1:'أنا طالب شغوف بتطوير الويب وبناء منتجات رقمية بسيطة، مفيدة وسهلة الاستخدام.', aboutText2:'كل مشروع هو فرصة للتعلم والتجربة وتحويل فكرة إلى تجربة حقيقية.', location:'الموقع', morocco:'المغرب 🇲🇦', education:'التكوين', webDev:'تطوير الويب', status:'الحالة', beginner:'مبتدئ · أتعلم',
    skillsLabel:'المهارات', skillsTitle:'ما أتعلمه<br /><em>حالياً.</em>', htmlText:'أبني هيكل صفحات الويب وأتعلم استخدام الوسوم الصحيحة.', structure:'الهيكل', tags:'الوسوم', forms:'النماذج', cssText:'أتعلم الألوان والمسافات والتصميم المتجاوب.', colours:'الألوان', jsText:'بدأت بإضافة تفاعلات بسيطة إلى صفحات الويب الخاصة بي.', variables:'المتغيرات', conditions:'الشروط',
    projectsLabel:'المشاريع', allProjects:'كل المشاريع', projectsTitle:'بعض الأعمال<br /><em>المختارة.</em>', studioText:'صفحة تعريفية لوكالة إبداعية', hello:'مرحباً، آدم 👋', expenses:'مصاريفك هذا الشهر', budgetText:'تطبيق لإدارة الميزانية', contactLabel:'تواصل', contactEyebrow:'فكرة أو مشروع؟', contactTitle:'لنتحدث<br /><em>معاً.</em>', contactAction:'راسلني على إنستغرام <span>↗</span>', madeWith:'صنع بشغف.'
  }
};

function setLanguage(language) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.innerHTML = translations[language][element.dataset.i18n];
  });
  languageToggle.textContent = language === 'ar' ? 'EN' : 'ع';
  languageToggle.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  localStorage.setItem('portfolio-language', language);
}

setLanguage(localStorage.getItem('portfolio-language') || 'en');
languageToggle.addEventListener('click', () => setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'));

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') body.classList.add('light');

function updateThemeIcon() {
  icon.textContent = body.classList.contains('light') ? '☾' : '☼';
}
updateThemeIcon();

toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));
