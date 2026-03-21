export function renderNav() {
    const navRoot = document.getElementById('nav-root');
    if (!navRoot) return;

    const currentPath = window.location.pathname;
    const isLinkActive = (path) => {
        if (path === '/' && (currentPath === '/' || currentPath === '/index.html')) return true;
        return currentPath.includes(path);
    };

    navRoot.innerHTML = `
        <nav class="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center">
                        <a href="/" class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            EfficientTutor
                        </a>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-8">
                            <a href="/" class="${isLinkActive('/') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors">Home</a>
                            <a href="/tutorials.html" class="${isLinkActive('tutorials.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors">Tutorials</a>
                            <a href="/contact.html" class="${isLinkActive('contact.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors">Contact</a>
                            <a href="/privacy.html" class="${isLinkActive('privacy.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors">Privacy</a>
                            <a href="/terms.html" class="${isLinkActive('terms.html') ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-300 hover:text-white'} px-1 py-2 text-sm font-medium transition-colors">Terms</a>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-slate-400 hover:text-white p-2">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile menu, show/hide based on menu state. -->
            <div id="mobile-menu" class="hidden md:hidden border-t border-slate-800 bg-slate-900">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('/') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}">Home</a>
                    <a href="/tutorials.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('tutorials.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}">Tutorials</a>
                    <a href="/contact.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('contact.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}">Contact</a>
                    <a href="/privacy.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('privacy.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}">Privacy</a>
                    <a href="/terms.html" class="block px-3 py-2 rounded-md text-base font-medium ${isLinkActive('terms.html') ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}">Terms</a>
                </div>
            </div>
        </nav>
    `;

    // Mobile menu toggle logic
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
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