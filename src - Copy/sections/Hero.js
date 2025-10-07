"use client";

import { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const [showMenu, setMenuVisibility] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeNav, setActiveNav] = useState(null);

  const toggleMenu = () => setMenuVisibility((v) => !v);
  const dropdownRef = useRef(null);
  const navContainerRef = useRef(null);
  const templateButtonRef = useRef(null);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!activeDropdown) return;
      const target = e.target;
      // if click is outside the nav container, close any open dropdowns
      if (navContainerRef.current && !navContainerRef.current.contains(target)) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }
    }

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDropdown]);

  return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">

      {/* NAV */}
           <div className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-90 backdrop-blur shadow-sm border-b border-gray-300" style={{ top: '0px', paddingBottom: '10px' }}>

        <div className="mx-auto max-w-7xl px-6 pt-1 lg:px-8">
          <header className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 md:gap-2" aria-label="LembarPintar home">
              <div className="relative w-[40px] h-[40px] md:w-[60px] md:h-[60px] shrink-0 p-2 bg-transparent rounded-lg">
                <Image
                  src="/images/logoLP.png"
                  alt="Logo LembarPinter"
                  fill
                  sizes="180px"
                  className="object-contain object-center !max-w-none"
                  priority
                />
              </div>
              {/* Brand text */}
              <span className="leading-none -ml-1 mt-4">
                <span className="block text-[22px] md:text-[28px] font-extrabold tracking-tight text-slate-900 dark:text-black">
                  Lembar{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Pintar</span>
                </span>
              </span>
            </Link>
            <button
              className="md:hidden mt-4"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {showMenu ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
            <div
              className={[
                "items-center md:relative md:flex md:space-x-3 md:bg-transparent md:shadow-none mt-4 md:mt-4",
                showMenu
                  ? "absolute left-6 right-6 top-20 z-50 flex flex-col space-y-3 rounded-xl bg-white/90 p-5 shadow-xl backdrop-blur md:static md:flex-row md:space-y-0 md:bg-transparent md:p-0 md:shadow-none"
                  : "hidden md:flex",
              ].join(" ")}
            >
              <nav ref={navContainerRef} className="flex w-full flex-col text-center md:w-auto md:flex-row md:space-x-3">
                <div className="relative flex justify-center w-full md:w-auto" style={{ display: 'inline-flex' }}>
                  <a
                    href="#QnA"
                    className={`rounded px-5 py-2 transition-colors cursor-pointer ${activeNav === 'KasusPenggunaan' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : ''} hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:text-white mt-2 md:mt-0`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav('KasusPenggunaan');
                      setActiveDropdown(null);
                      const qnaSection = document.querySelector('h3.text-3xl.font-bold.text-center.text-slate-900.mb-8');
                      if (qnaSection) {
                        const navbarHeight = document.querySelector('.fixed.top-0')?.offsetHeight || 100;
                        const qnaTop = qnaSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                        window.scrollTo({ top: qnaTop, behavior: 'smooth' });
                      }
                    }}
                  >
                    Kasus Penggunaan
                  </a>
                </div>
                <div className="relative flex justify-center w-full md:w-auto" style={{ display: 'inline-flex' }}>
                  <button
                    className={`rounded px-5 py-2 transition-colors flex items-center justify-center focus:outline-none bg-transparent text-slate-900 border border-transparent group ${activeNav === 'template' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : ''} hover:bg-blue-600 hover:text-white`}
                    type="button"
                    ref={templateButtonRef}
                    onClick={() => { setActiveDropdown(activeDropdown === 'template' ? null : 'template'); setActiveNav('template'); }}
                  >
                    Template
                    <svg className={["ml-1 h-4 w-4 text-slate-900 group-hover:text-white transform transition-transform duration-200", activeDropdown === 'template' ? 'rotate-180' : 'rotate-0'].join(' ')} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {activeDropdown === 'template' && (
                    <div ref={dropdownRef} className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200" style={{ borderRadius: '1rem', top: '100%' }}>
                      <ul className="py-2 px-2 text-center">
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-t-xl focus:outline-none"
                            onClick={() => setActiveSubmenu(activeSubmenu === 'sd' ? null : 'sd')}
                          >
                            <span className="w-full text-center">Sekolah Dasar (SD)</span>
                            <span className="ml-2 text-2xl font-bold text-slate-900" style={{ marginLeft: 'auto' }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </span>
                          </button>
                          {activeSubmenu === 'sd' && (
                            <div className="absolute top-0 left-full ml-2 w-48 rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200" style={{ borderRadius: '1rem' }}>
                              <ul className="py-2 px-2 text-center">
                                <li><Link href="/kelas/SD/1" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-t-xl">Kelas 1</Link></li>
                                <li><Link href="/kelas/SD/2" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Kelas 2</Link></li>
                                <li><Link href="/kelas/SD/3" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Kelas 3</Link></li>
                                <li><Link href="/kelas/SD/4" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Kelas 4</Link></li>
                                <li><Link href="/kelas/SD/5" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Kelas 5</Link></li>
                                <li><Link href="/kelas/SD/6" className="block w-full px-4 py-2 text-center hover:bg-blue-600 hover:text-white rounded-b-xl">Kelas 6</Link></li>
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded focus:outline-none"
                            onClick={() => setActiveSubmenu(activeSubmenu === 'smp' ? null : 'smp')}
                          >
                            <span className="w-full text-center">Sekolah Menengah Pertama (SMP)</span>
                            <span className="ml-2 text-2xl font-bold text-slate-900" style={{ marginLeft: 'auto' }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </span>
                          </button>
                          {activeSubmenu === 'smp' && (
                            <div className="absolute top-0 left-full ml-2 w-48 rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200" style={{ borderRadius: '1rem' }}>
                              <ul className="py-2 px-2 text-center">
                                <li><Link href="/kelas/SMP/7" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-t-xl">Kelas 7</Link></li>
                                <li><Link href="/kelas/SMP/8" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white">Kelas 8</Link></li>
                                <li><Link href="/kelas/SMP/9" className="block w-full px-4 py-2 text-center hover:bg-blue-600 hover:text-white rounded-b-xl">Kelas 9</Link></li>
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold hover:bg-blue-600 hover:text-white rounded focus:outline-none"
                            onClick={() => setActiveSubmenu(activeSubmenu === 'sma' ? null : 'sma')}
                          >
                            <span className="w-full text-center">Sekolah Menengah <br></br>Atas (SMA)</span>
                            <span className="ml-2 text-2xl font-bold text-slate-900" style={{ marginLeft: 'auto' }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </span>
                          </button>
                          {activeSubmenu === 'sma' && (
                            <div className="absolute top-0 left-full ml-2 w-48 rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200" style={{ borderRadius: '1rem' }}>
                              <ul className="py-2 px-2 text-center">
                                <li><Link href="/kelas/SMA/10" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-t-xl">Kelas 10</Link></li>
                                <li><Link href="/kelas/SMA/11" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white">Kelas 11</Link></li>
                                <li><Link href="/kelas/SMA/12" className="block w-full px-4 py-2 text-center hover:bg-blue-600 hover:text-white rounded-b-xl">Kelas 12</Link></li>
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold hover:bg-slate-50 rounded-b-xl focus:outline-none"
                            onClick={() => setActiveSubmenu(activeSubmenu === 'PT' ? null : '')}
                          >
                            <span className="w-full text-center"> Perguruan Tinggi (PT)</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <a
                  href="#fitur"
                  className={`rounded px-5 py-2 transition-colors cursor-pointer ${activeNav === 'fitur' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : ''} hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:text-white mt-2 md:mt-0`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('fitur');
                    setActiveDropdown(null);
                    const fiturSection = document.getElementById('fitur');
                    if (fiturSection) {
                      const navbarHeight = document.querySelector('.fixed.top-0')?.offsetHeight || 100;
                      const fiturTop = fiturSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                      window.scrollTo({ top: fiturTop, behavior: 'smooth' });
                    }
                  }}
                >
                  Fitur
                </a>
                <a
                  href="#harga"
                  className={`rounded px-5 py-2 transition-colors cursor-pointer ${activeNav === 'harga' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : ''} hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:text-white mt-2 md:mt-0`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav('harga');
                    setActiveDropdown(null);
                    const hargaSection = document.getElementById('harga');
                    if (hargaSection) {
                      const navbar = document.querySelector('.fixed.top-0');
                      const navbarHeight = navbar ? navbar.offsetHeight : 100;
                      const hargaTop = hargaSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                      window.scrollTo({ top: hargaTop, behavior: 'smooth' });
                    }
                  }}
                >
                  Harga
                </a>
                <div className="relative flex justify-center w-full md:w-auto" style={{ display: 'inline-flex' }}>
                  <button
                    className={`rounded px-5 py-2 transition-colors flex items-center justify-center focus:outline-none bg-transparent text-slate-900 border border-transparent group ${activeNav === 'pelajari' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : ''} hover:bg-blue-600 hover:text-white`}
                    type="button"
                    onClick={() => { setActiveDropdown(activeDropdown === 'pelajari' ? null : 'pelajari'); setActiveNav('pelajari'); }}
                  >
                    Pelajari
                    <svg className={["ml-1 h-4 w-4 text-slate-900 group-hover:text-white transform transition-transform duration-200", activeDropdown === 'pelajari' ? 'rotate-180' : 'rotate-0'].join(' ')} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {activeDropdown === 'pelajari' && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200" style={{ borderRadius: '0.75rem', top: '100%' }}>
                      <ul className="py-2 px-2 text-center">
                        <li>
                          <Link href="/pelajari/student" className="block px-4 py-2 font-semibold border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-t-xl">Siswa</Link>
                        </li>
                        <li>
                          <Link href="/pelajari/teacher" className="block px-4 py-2 font-semibold border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Guru</Link>
                        </li>
                        <li>
                          <Link href="/pelajari/school" className="block px-4 py-2 font-semibold border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Sekolah</Link>
                        </li>
                        <li>
                          <Link href="/pelajari/university" className="block px-4 py-2 font-semibold hover:bg-blue-600 hover:text-white rounded-b-xl">Kampus</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </nav>
              <div className="flex space-x-3">
                <a href="/auth/login" className="rounded border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50">
                  Masuk
                </a>
                <a href="/auth/register" className="rounded bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-2 text-white hover:from-purple-600 hover:to-pink-600">
                  Coba Gratis
                </a>
              </div>
            </div>
          </header>
        </div>

        {/* HERO CONTENT */}
      </div>
  <div className="mx-auto max-w-7xl px-6 lg:px-8" style={{ paddingTop: '90px' }}>
        <div className="w-full rounded-[28px] overflow-hidden" style={{ background: 'linear-gradient(180deg,#050610 0%, #22063a 36%, #6b22ff 70%, #dec6ff 100%)' }}>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.06 },
              },
            }}
            className="text-left"
          >
            {/* Headline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              <span className="block">Temukan Cara Baru dengan</span>
              <motion.span
                className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                Mengajar, Belajar, dan Berkreasi
              </motion.span>
              <span className="block">di Era Digital</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 text-lg sm:text-xl leading-8 text-slate-200"
            >
              Lembar Pintar membantu guru, pelajar, dan kreator menyusun ide dengan cepat
              melalui ribuan template interaktif yang siap pakai.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="/auth/register"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Mulai Gratis Sekarang
              </motion.a>
              <motion.a
                href="/demo"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Lihat Contoh Template
              </motion.a>
            </motion.div>

            {/* Rating Section */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex text-yellow-400">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">3k+ reviews</p>
                <p className="text-xs">Coba Gratis! Tanpa kartu kredit.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="w-full h-100 flex items-center justify-center p-8 bg-transparent">
              <div className="text-center">
                 <div className="w-[520px] h-[520px] mx-auto mb-8 rounded-3xl overflow-hidden relative shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/link_tamplate.png"
                    alt="Template Profesional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;