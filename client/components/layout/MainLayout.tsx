import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Sparkles } from "lucide-react";
import { useEffect } from "react";

// Helper function for smooth scrolling and clean URLs
export const scrollToSection = (sectionId: string, push: boolean = true) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    if (push) window.history.pushState({}, '', `/${sectionId}`);
  }
};

export function Header() {
  const navLink =
    "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 flex items-center justify-between w-full">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo-scriptlyfy.png" alt="Scriptlyfy" className="h-8 w-8 object-contain bg-transparent" />
          <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            Scriptlyfy
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/features"
            className={navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            Features
          </a>
          <a
            href="/demo"
            className={navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('demo');
            }}
          >
            Demo
          </a>
          <a
            href="/pricing"
            className={navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('pricing');
            }}
          >
            Pricing
          </a>
          <a
            href="/faq"
            className={navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('faq');
            }}
          >
            FAQs
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button 
            onClick={() => scrollToSection('signup')}
            className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
          >
            Join Early Access
          </Button>
        </div>
        <button className="md:hidden p-2 text-slate-600" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm w-full">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo-scriptlyfy.png" alt="Scriptlyfy" className="h-8 w-8 object-contain bg-transparent" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Scriptlyfy
            </span>
          </div>
          <p className="mt-3 text-slate-600 max-w-xs">
            Turn any creator's entire content library into competitive
            intelligence in minutes.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Product</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a
                href="/features"
                onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                className="hover:text-slate-900"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/demo"
                onClick={(e) => { e.preventDefault(); scrollToSection('demo'); }}
                className="hover:text-slate-900"
              >
                Demo
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
                className="hover:text-slate-900"
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a href="/about" className="hover:text-slate-900">
                About
              </a>
            </li>
            <li>
              <a href="/roadmap" className="hover:text-slate-900">
                Roadmap
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-slate-900">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-slate-900">
                Terms
              </a>
            </li>
            <li>
              <a
                href="/signup"
                onClick={(e) => { e.preventDefault(); scrollToSection('signup'); }}
                className="hover:text-slate-900"
              >
                Join Early Access
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>
              <a
                href="mailto:creategenstudio@gmail.com"
                className="hover:text-slate-900"
              >
                Email support
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
  © {new Date().getFullYear()} Scriptlyfy. All rights reserved.
      </div>
    </footer>
  );
}

export default function MainLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname.replace(/^\//, '');
      const valid = new Set(['features','demo','pricing','faq','signup']);
      if (valid.has(path)) {
        scrollToSection(path, false);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className={cn("min-h-dvh bg-white text-slate-900")}> 
      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded-md focus:shadow">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <div data-observe="reveal"><Footer /></div>
    </div>
  );
}
