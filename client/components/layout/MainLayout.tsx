import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect } from "react";

// Helper function for smooth scrolling and clean URLs
export const scrollToSection = (sectionId: string, push: boolean = true) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    if (push) window.history.pushState({}, "", `/${sectionId}`);
  }
};

export function Header() {
  // Track currently visible section for highlighting nav links
  const [active, setActive] = useState<string>("");
  // Control sheet open state to add aria-expanded + body scroll lock
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // prevent background scroll when menu open
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = ["features", "demo", "pricing", "faq", "signup"];
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!('IntersectionObserver' in window) || els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLink =
    "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] focus-visible:ring-offset-2 rounded";
  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 flex items-center justify-between w-full">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo-scriptlyfy.png"
            alt="Scriptlyfy"
            width="32"
            height="32"
            sizes="32px"
            className="h-8 w-8 object-contain bg-transparent"
            decoding="async"
            fetchPriority="high"
          />
          <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
            Scriptlyfy
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          <a
            href="/features"
            className={cn(
              navLink,
              active === "features"
                ? "text-slate-900"
                : "text-slate-600 hover:text-slate-900",
            )}
            onClick={(e) => handleNav(e, "features")}
            aria-current={active === "features" ? "true" : undefined}
          >
            Features
          </a>
          <a
            href="/demo"
            className={cn(
              navLink,
              active === "demo"
                ? "text-slate-900"
                : "text-slate-600 hover:text-slate-900",
            )}
            onClick={(e) => handleNav(e, "demo")}
            aria-current={active === "demo" ? "true" : undefined}
          >
            Demo
          </a>
          <a
            href="/pricing"
            className={cn(
              navLink,
              active === "pricing"
                ? "text-slate-900"
                : "text-slate-600 hover:text-slate-900",
            )}
            onClick={(e) => handleNav(e, "pricing")}
            aria-current={active === "pricing" ? "true" : undefined}
          >
            Pricing
          </a>
          <a
            href="/faq"
            className={cn(
              navLink,
              active === "faq"
                ? "text-slate-900"
                : "text-slate-600 hover:text-slate-900",
            )}
            onClick={(e) => handleNav(e, "faq")}
            aria-current={active === "faq" ? "true" : undefined}
          >
            FAQs
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => scrollToSection("signup")}
            className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
          >
            Join Early Access
          </Button>
        </div>
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 -m-2 rounded-md text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-5/6 max-w-xs p-0" id="mobile-primary-nav" aria-label="Mobile primary">
            <nav className="px-5 pt-14 pb-6" role="navigation">
              <ul className="space-y-1">
                <li>
                  <SheetClose asChild>
                    <a
                      href="/features"
                      className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                      onClick={(e) => {
                        handleNav(e, "features");
                        setOpen(false);
                      }}
                      aria-current={active === "features" ? "true" : undefined}
                    >
                      Features
                    </a>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <a
                      href="/demo"
                      className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                      onClick={(e) => {
                        handleNav(e, "demo");
                        setOpen(false);
                      }}
                      aria-current={active === "demo" ? "true" : undefined}
                    >
                      Demo
                    </a>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <a
                      href="/pricing"
                      className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                      onClick={(e) => {
                        handleNav(e, "pricing");
                        setOpen(false);
                      }}
                      aria-current={active === "pricing" ? "true" : undefined}
                    >
                      Pricing
                    </a>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <a
                      href="/faq"
                      className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                      onClick={(e) => {
                        handleNav(e, "faq");
                        setOpen(false);
                      }}
                      aria-current={active === "faq" ? "true" : undefined}
                    >
                      FAQs
                    </a>
                  </SheetClose>
                </li>
              </ul>
              <div className="mt-4">
                <SheetClose asChild>
                  <Button
                    className="w-full bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand))]/90"
                    onClick={() => scrollToSection("signup")}
                  >
                    Join Early Access
                  </Button>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
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
            <img
              src="/logo-scriptlyfy.png"
              alt="Scriptlyfy"
              width="32"
              height="32"
              sizes="32px"
              className="h-8 w-8 object-contain bg-transparent"
              loading="lazy"
              decoding="async"
            />
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
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("features");
                }}
                className="hover:text-slate-900"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("demo");
                }}
                className="hover:text-slate-900"
              >
                Demo
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("pricing");
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("signup");
                }}
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
                href="mailto:emma@scriptlyfy.com"
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
      const path = window.location.pathname.replace(/^\//, "");
      const valid = new Set(["features", "demo", "pricing", "faq", "signup"]);
      if (valid.has(path)) {
        scrollToSection(path, false);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <div className={cn("min-h-dvh bg-white text-slate-900 overflow-x-clip")}>
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded-md focus:shadow"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <div data-observe="reveal">
        <Footer />
      </div>
    </div>
  );
}
