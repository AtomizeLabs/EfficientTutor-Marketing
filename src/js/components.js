export async function renderTutorialsHub() {
    const hubRoot = document.getElementById('tutorials-hub-root');
    if (!hubRoot) return;

    let tutorialTopics = [];

    const getParams = () => new URLSearchParams(window.location.search);
    const getHash = () => window.location.hash.replace('#', '');

    const updateURL = (id, hash = '') => {
        const newURL = id 
            ? `${window.location.pathname}?id=${id}${hash ? '#' + hash : ''}`
            : window.location.pathname;
        window.history.pushState({ id, hash }, '', newURL);
    };

    const fetchTutorials = async () => {
        try {
            hubRoot.innerHTML = `
                <div class="flex items-center justify-center py-20">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
            `;
            const response = await fetch('/data/tutorials.json');
            const data = await response.json();
            tutorialTopics = data.tutorialTopics;
        } catch (error) {
            console.error('Failed to load tutorials:', error);
            hubRoot.innerHTML = `
                <div class="text-center py-20">
                    <p class="text-red-400">Failed to load tutorials. Please try again later.</p>
                </div>
            `;
            return false;
        }
        return true;
    };

    const renderList = (isInitial = false) => {
        if (!isInitial) updateURL(null);
        
        hubRoot.innerHTML = `
            <div class="text-center mb-16 animate-fade-in">
                <h1 class="text-4xl font-bold text-white mb-4">Tutorials Hub</h1>
                <p class="text-slate-400 max-w-2xl mx-auto">Master EfficientTutor with our step-by-step guides designed for both students and educators.</p>
            </div>
            
            <div class="space-y-20">
                ${tutorialTopics.map(topic => `
                    <section class="animate-fade-in">
                        <div class="flex items-center mb-8 pb-4 border-b border-slate-800">
                            <div class="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mr-4">
                                ${topic.icon}
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold text-white">${topic.title}</h2>
                                <p class="text-slate-400 text-sm mt-1">${topic.description}</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${topic.tutorials.map(tutorial => `
                                <article class="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all group cursor-pointer flex flex-col" data-id="${tutorial.id}">
                                    <div class="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
                                        <img src="https://img.youtube.com/vi/${tutorial.videos.desktop}/mqdefault.jpg" alt="Video thumbnail for ${tutorial.title}" class="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-105 transition-transform duration-500">
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div class="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-300">
                                                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-5 flex-grow">
                                        <h3 class="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">${tutorial.title}</h3>
                                        <p class="text-slate-400 text-sm line-clamp-2">${tutorial.description}</p>
                                    </div>
                                    <div class="px-5 pb-5 mt-auto">
                                        <span class="text-xs font-semibold text-emerald-400 flex items-center">
                                            Learn More 
                                            <svg class="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </section>
                `).join('')}
            </div>
        `;

        hubRoot.querySelectorAll('[data-id]').forEach(card => {
            card.addEventListener('click', () => {
                const tutorial = findTutorial(card.dataset.id);
                if (tutorial) {
                    renderDetail(tutorial);
                    updateURL(tutorial.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    };

    const findTutorial = (id) => {
        for (const topic of tutorialTopics) {
            const tutorial = topic.tutorials.find(t => t.id === id);
            if (tutorial) {
                return { ...tutorial, category: topic.title };
            }
        }
        return null;
    };

    const renderDetail = (tutorial, targetSection = null) => {
        // Auto-detect platform on load
        let currentPlatform = window.innerWidth < 768 ? 'mobile' : 'desktop';

        hubRoot.innerHTML = `
            <div class="animate-fade-in max-w-4xl mx-auto">
                <button id="back-to-tutorials" class="flex items-center text-slate-400 hover:text-emerald-400 transition-colors mb-8 group">
                    <svg class="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to all tutorials
                </button>

                <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <!-- Video Section -->
                    <div id="video" class="lg:col-span-2 scroll-mt-24">
                        <div class="sticky top-24">
                            <!-- Platform Switcher -->
                            <div class="flex p-1 bg-slate-950 border border-slate-800 rounded-xl mb-4">
                                <button data-platform="desktop" class="flex-1 flex items-center justify-center py-2 rounded-lg text-xs font-bold transition-all ${currentPlatform === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    Desktop
                                </button>
                                <button data-platform="mobile" class="flex-1 flex items-center justify-center py-2 rounded-lg text-xs font-bold transition-all ${currentPlatform === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                    Mobile
                                </button>
                            </div>

                            <div class="aspect-[9/16] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative">
                                <iframe 
                                    id="tutorial-iframe"
                                    class="w-full h-full"
                                    src="https://www.youtube.com/embed/${tutorial.videos[currentPlatform]}?rel=0&modestbranding=1" 
                                    title="${tutorial.title}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                            <p class="text-xs text-slate-500 mt-4 text-center italic">Video Tutorial (Shorts)</p>
                        </div>
                    </div>

                    <!-- Content Section -->
                    <div class="lg:col-span-3">
                        <div class="mb-2 text-emerald-400 font-semibold tracking-wide uppercase text-sm">${tutorial.category}</div>
                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-6">${tutorial.title}</h1>
                        <p class="text-slate-400 text-lg mb-10 leading-relaxed">${tutorial.description}</p>

                        <div class="space-y-16">
                            <section id="guide" class="scroll-mt-24">
                                <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                                    <span class="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                                    Step-by-Step Guide
                                </h3>
                                <ul class="space-y-4">
                                    ${tutorial.steps.map((step, index) => `
                                        <li class="flex items-start">
                                            <span class="flex-shrink-0 w-6 h-6 rounded-full border border-slate-700 text-slate-500 flex items-center justify-center text-xs mt-0.5 mr-4">${index + 1}</span>
                                            <span class="text-slate-300 leading-relaxed">${step}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </section>

                            ${tutorial.troubleshoot ? `
                                <section id="troubleshoot" class="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 scroll-mt-24">
                                    <h3 class="text-lg font-bold text-amber-400 mb-3 flex items-center">
                                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        Troubleshooting
                                    </h3>
                                    <p class="text-slate-400 text-sm leading-relaxed">${tutorial.troubleshoot}</p>
                                </section>
                            ` : ''}
                        </div>

                        ${tutorial.relatedIds ? `
                            <div class="mt-20 pt-10 border-t border-slate-800">
                                <h3 class="text-xl font-bold text-white mb-8 flex items-center">
                                    <svg class="w-6 h-6 mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    What's Next?
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    ${tutorial.relatedIds.map(id => {
                                        const related = findTutorial(id);
                                        if (!related) return '';
                                        return `
                                            <div data-id="${related.id}" class="group p-4 bg-slate-800/30 border border-slate-700 rounded-xl hover:border-emerald-500/50 cursor-pointer transition-all flex items-center">
                                                <div class="w-12 h-8 bg-slate-900 rounded overflow-hidden mr-4 flex-shrink-0">
                                                    <img src="https://img.youtube.com/vi/${related.videos.desktop}/mqdefault.jpg" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity">
                                                </div>
                                                <div class="flex-grow">
                                                    <h4 class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">${related.title}</h4>
                                                    <p class="text-xs text-slate-500 line-clamp-1">Tutorial Guide</p>
                                                </div>
                                                <svg class="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('back-to-tutorials').addEventListener('click', () => renderList());

        // Add listeners for "What's Next" cards
        hubRoot.querySelectorAll('.mt-20 [data-id]').forEach(card => {
            card.addEventListener('click', () => {
                const related = findTutorial(card.dataset.id);
                if (related) {
                    renderDetail(related);
                    updateURL(related.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });

        // Platform switcher logic
        const platformButtons = hubRoot.querySelectorAll('[data-platform]');
        const iframe = document.getElementById('tutorial-iframe');

        platformButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                if (platform === currentPlatform) return;

                currentPlatform = platform;
                
                // Update iframe
                iframe.src = `https://www.youtube.com/embed/${tutorial.videos[currentPlatform]}?rel=0&modestbranding=1`;

                // Update UI styles
                platformButtons.forEach(b => {
                    if (b.dataset.platform === currentPlatform) {
                        b.classList.remove('text-slate-500', 'hover:text-slate-300');
                        b.classList.add('bg-slate-800', 'text-white');
                    } else {
                        b.classList.remove('bg-slate-800', 'text-white');
                        b.classList.add('text-slate-500', 'hover:text-slate-300');
                    }
                });
            });
        });

        if (targetSection) {
            setTimeout(() => {
                const element = document.getElementById(targetSection);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    // Initial Route Handling
    const init = async () => {
        const success = await fetchTutorials();
        if (!success) return;

        const params = getParams();
        const initialId = params.get('id');
        const initialSection = getHash();

        if (initialId) {
            const tutorial = findTutorial(initialId);
            if (tutorial) {
                renderDetail(tutorial, initialSection);
            } else {
                renderList(true);
            }
        } else {
            renderList(true);
        }
    };

    init();

    // Handle Back/Forward buttons
    window.addEventListener('popstate', (e) => {
        const params = getParams();
        const id = params.get('id');
        if (id) {
            const tutorial = findTutorial(id);
            if (tutorial) renderDetail(tutorial, getHash());
        } else {
            renderList(true);
        }
    });
}

export function renderNav() {
    const navRoot = document.getElementById('nav-root');
    if (!navRoot) return;

    const currentPath = window.location.pathname;
    
    const isLinkActive = (path) => {
        // Normalize current path (remove trailing slash and .html)
        const normalizedCurrent = currentPath.replace(/\/$/, '').replace('.html', '') || '/';
        
        // Normalize target path (ensure leading slash, remove trailing slash and .html)
        let normalizedTarget = path.startsWith('/') ? path : '/' + path;
        normalizedTarget = normalizedTarget.replace(/\/$/, '').replace('.html', '') || '/';

        // Home page special case (match / or /index)
        if (normalizedTarget === '/' || normalizedTarget === '/index') {
            return normalizedCurrent === '/' || normalizedCurrent === '/index';
        }

        return normalizedCurrent === normalizedTarget;
    };

    navRoot.innerHTML = `
        <nav class="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50" aria-label="Main navigation">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center">
                        <a href="/" class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400" aria-label="EfficientTutor home">
                            EfficientTutor
                        </a>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-8" role="menubar">
                            <a href="/" class="${isLinkActive('/') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors" ${isLinkActive('/') ? 'aria-current="page"' : ''} role="menuitem">Home</a>
                            <a href="/tutorials.html" class="${isLinkActive('tutorials.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors" ${isLinkActive('tutorials.html') ? 'aria-current="page"' : ''} role="menuitem">Tutorials</a>
                            <a href="/contact.html" class="${isLinkActive('contact.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors" ${isLinkActive('contact.html') ? 'aria-current="page"' : ''} role="menuitem">Contact</a>
                            <a href="/privacy.html" class="${isLinkActive('privacy.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors" ${isLinkActive('privacy.html') ? 'aria-current="page"' : ''} role="menuitem">Privacy</a>
                            <a href="/terms.html" class="${isLinkActive('terms.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors" ${isLinkActive('terms.html') ? 'aria-current="page"' : ''} role="menuitem">Terms</a>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-slate-400 hover:text-white p-2" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open main menu">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile menu, show/hide based on menu state. -->
            <div id="mobile-menu" class="hidden md:hidden border-t border-slate-800 bg-slate-900" role="menu">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}" ${isLinkActive('/') ? 'aria-current="page"' : ''} role="menuitem">Home</a>
                    <a href="/tutorials.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('tutorials.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}" ${isLinkActive('tutorials.html') ? 'aria-current="page"' : ''} role="menuitem">Tutorials</a>
                    <a href="/contact.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('contact.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}" ${isLinkActive('contact.html') ? 'aria-current="page"' : ''} role="menuitem">Contact</a>
                    <a href="/privacy.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('privacy.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}" ${isLinkActive('privacy.html') ? 'aria-current="page"' : ''} role="menuitem">Privacy</a>
                    <a href="/terms.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('terms.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}" ${isLinkActive('terms.html') ? 'aria-current="page"' : ''} role="menuitem">Terms</a>
                </div>
            </div>
        </nav>
    `;

    // Mobile menu toggle logic
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }
}

export function renderFooter() {
    const footerRoot = document.getElementById('footer-root');
    if (!footerRoot) return;

    footerRoot.innerHTML = `
        <footer class="bg-slate-900 border-t border-slate-800 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold text-white mb-4">EfficientTutor</h3>
                        <p class="text-slate-400 text-sm leading-relaxed mb-2">
                            An <span class="text-white font-medium">Atomize Labs</span> product.
                        </p>
                        <p class="text-slate-400 text-sm leading-relaxed">
                            Empowering students and tutors with intelligent scheduling and resource management tools for the modern educational landscape.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-white font-medium mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-sm text-slate-400">
                            <li><a href="/" class="hover:text-emerald-400 transition-colors">Home</a></li>
                            <li><a href="/tutorials.html" class="hover:text-emerald-400 transition-colors">Tutorials</a></li>
                            <li><a href="/contact.html" class="hover:text-emerald-400 transition-colors">Contact Support</a></li>
                            <li><a href="/privacy.html" class="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms.html" class="hover:text-emerald-400 transition-colors">Terms of Use</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-medium mb-4">Contact</h4>
                        <p class="text-sm text-slate-400 mb-6">
                            Questions? Reach out to us at <br>
                            <a href="mailto:support@atomizelabs.com" class="text-emerald-400 hover:underline">support@atomizelabs.com</a>
                        </p>
                        <div class="flex space-x-4">
                            <!-- X (formerly Twitter) -->
                            <a href="https://x.com/atomizelabs" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors">
                                <span class="sr-only">X (Twitter)</span>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
                                </svg>
                            </a>
                            <!-- LinkedIn -->
                            <a href="https://linkedin.com/company/atomizelabs" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors">
                                <span class="sr-only">LinkedIn</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <!-- GitHub -->
                            <a href="https://github.com/atomizelabs" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors">
                                <span class="sr-only">GitHub</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                    &copy; ${new Date().getFullYear()} Atomize Labs. All rights reserved. <br class="sm:hidden"> EfficientTutor is a trademark of Atomize Labs.
                </div>
            </div>
        </footer>
    `;
}
