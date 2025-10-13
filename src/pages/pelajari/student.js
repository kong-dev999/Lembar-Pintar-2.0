import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import StarButton from '@/components/ui/star-button';

export default function StudentPage() {
  const [showMenu, setMenuVisibility] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeNav, setActiveNav] = useState(null);
  const [suppressNavHover, setSuppressNavHover] = useState(false);
  const closeTimeoutRef = useRef(null);
  const submenuCloseTimeoutRef = useRef(null);

  const toggleMenu = () => setMenuVisibility((v) => !v);
  // open dropdowns on hover for better desktop UX
  const openDropdown = (name) => {
    // cancel pending close when opening
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(name);
    setActiveNav(name === 'template' || name === 'pelajari' ? name : activeNav);
    // when opening template/pelajari, suppress hover on other nav items
    if (name === 'template' || name === 'pelajari') setSuppressNavHover(true);
  };
  const closeDropdown = (name) => {
    if (activeSubmenu) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      return;
    }

    // schedule a short delay before closing so users can move pointer into the menu
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      if (activeDropdown === name) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
        // closing template/pelajari should re-enable hover
        if (name === 'template' || name === 'pelajari')
          setSuppressNavHover(false);
      }
      closeTimeoutRef.current = null;
    }, 150);
  };
  const dropdownRef = useRef(null);
  const navContainerRef = useRef(null);
  const templateButtonRef = useRef(null);
  const [showTopGradient, setShowTopGradient] = useState(true);

  useEffect(() => {
    // show gradient only when scroll is at the very top
    const onScroll = () => {
      const atTop = window.scrollY <= 6;
      setShowTopGradient(atTop);
    };
    // initialize state
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!activeDropdown) return;
      const target = e.target;
      if (
        (navContainerRef.current && navContainerRef.current.contains(target)) ||
        (dropdownRef.current && dropdownRef.current.contains(target)) ||
        (templateButtonRef.current &&
          templateButtonRef.current.contains(target))
      ) {
        return;
      }

      // otherwise close any open dropdowns
      setActiveDropdown(null);
      setActiveSubmenu(null);
      setSuppressNavHover(false);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setActiveSubmenu(null);
        setSuppressNavHover(false);
      }
    }

    document.addEventListener('mousedown', handleDocumentClick);
    // also listen for touchstart so mobile taps are handled the same way
    document.addEventListener('touchstart', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (submenuCloseTimeoutRef.current) {
        clearTimeout(submenuCloseTimeoutRef.current);
        submenuCloseTimeoutRef.current = null;
      }
    };
  }, [activeDropdown]);

  return (
    <section
      className="w-full min-h-screen py-12"
      style={{
        background:
          'linear-gradient(180deg, #3f0d95ff 0%, #000000ff 23%, #000000ff 35%, #3f0d95ff 45%, #000000ff 73%, #000000ff 93%, #3f0d95ff 100%, #3f0d95ff 35%)',
      }}
    >
      {/* NAV */}
      <div
        className="fixed top-0 left-0 w-full z-50"
        style={{
          top: '0px',
          paddingBottom: '8px',
          background: showTopGradient
            ? 'transparent'
            : 'linear-gradient(180deg, #040432ff 42%, #4a0db4ff 95%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 pt-1 lg:px-8">
          <header className="flex items-center justify-between roobert-mono">
            <Link
              href="/"
              className="flex items-center gap-1 md:gap-2"
              aria-label="LembarPintar home"
            >
              <div className="relative w-[40px] h-[40px] md:w-[60px] md:h-[60px] shrink-0 p-2 bg-transparent rounded-lg">
                <Image
                  src="/images/logo.png"
                  alt="Logo LembarPintar"
                  fill
                  sizes="180px"
                  className="object-contain object-center !max-w-none"
                  priority
                />
              </div>
              {/* Brand text */}
              <span className="leading-none -ml-1 mt-2">
                <span className="block text-[22px] md:text-[28px] font-extrabold tracking-tight text-white">
                  Lembar{' '}
                  <span className="bg-gradient-to-r bg-clip-text text-white">
                    Pintar
                  </span>
                </span>
              </span>
            </Link>
            <button
              className="md:hidden mt-4"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {showMenu ? (
                <XMarkIcon className="h-8 w-8 text-white" />
              ) : (
                <Bars3Icon className="h-8 w-8 text-white" />
              )}
            </button>
            <div
              className={[
                'items-center md:relative md:flex md:space-x-3 md:bg-transparent md:shadow-none mt-4 md:mt-4',
                showMenu
                  ? 'absolute left-6 right-6 top-20 z-50 flex flex-col space-y-3 rounded-xl bg-white/90 p-5 shadow-xl backdrop-blur md:static md:flex-row md:space-y-0 md:bg-transparent md:p-0 md:shadow-none'
                  : 'hidden md:flex',
              ].join(' ')}
            >
              <nav
                ref={navContainerRef}
                className="flex w-full flex-col text-center md:w-auto md:flex-row md:space-x-3"
              >
                <div className="relative flex justify-center w-full md:w-auto">
                  <button
                    className={`rounded px-5 py-2 transition-colors flex items-center justify-center focus:outline-none bg-transparent ${showMenu ? 'text-black' : 'text-white'} border border-transparent group mt-2 md:mt-0 ${activeDropdown === 'template' ? (showMenu ? 'bg-white/10 text-black' : 'bg-white/10 text-white') : ''}`}
                    type="button"
                    ref={templateButtonRef}
                    onClick={() => {
                      setActiveDropdown(
                        activeDropdown === 'template' ? null : 'template'
                      );
                      setActiveNav('template');
                    }}
                    onMouseEnter={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => {
                            setSuppressNavHover(true);
                            openDropdown('template');
                          }
                        : undefined
                    }
                    onMouseLeave={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => {
                            setSuppressNavHover(false);
                            closeDropdown('template');
                          }
                        : undefined
                    }
                    onFocus={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => openDropdown('template')
                        : undefined
                    }
                    onBlur={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => closeDropdown('template')
                        : undefined
                    }
                  >
                    Template
                    <svg
                      className={[
                        'ml-1 h-4 w-4 transform transition-transform duration-200',
                        showMenu ? 'text-black' : 'text-white',
                        activeDropdown === 'template'
                          ? 'rotate-180'
                          : 'rotate-0',
                      ].join(' ')}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {activeDropdown === 'template' && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 min-w-fit w-auto rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200"
                      style={{ borderRadius: '1rem', top: '100%' }}
                      onMouseEnter={() => {
                        if (closeTimeoutRef.current) {
                          clearTimeout(closeTimeoutRef.current);
                          closeTimeoutRef.current = null;
                        }
                        setSuppressNavHover(true);
                      }}
                      onMouseLeave={() => {
                        setSuppressNavHover(false);
                        closeDropdown('template');
                      }}
                    >
                      <ul className="py-2 px-2 text-center">
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b border-gray-100 hover:bg-[#5e21df] hover:text-white rounded-t-xl focus:outline-none"
                            onClick={() => {
                              // cancel any pending close timers so click reliably toggles submenu
                              if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                              }
                              if (submenuCloseTimeoutRef.current) {
                                clearTimeout(submenuCloseTimeoutRef.current);
                                submenuCloseTimeoutRef.current = null;
                              }
                              setActiveDropdown('template');
                              setActiveSubmenu(
                                activeSubmenu === 'tk' ? null : 'tk'
                              );
                            }}
                          >
                            <span className="w-full text-center">TK</span>
                          </button>
                          {activeSubmenu === 'tk' && (
                            <div
                              className="absolute top-0 left-full ml-2 min-w-fit w-auto rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200"
                              style={{ borderRadius: '1rem' }}
                            >
                              <ul className="py-2 px-2 text-center min-w-fit w-auto">
                                {['A', 'B'].map((kelas, idx) => (
                                  <li key={kelas}>
                                    <Link
                                      href={`/kelas/SMP/${kelas}`}
                                      className={`flex items-center justify-center w-auto min-w-fit px-4 py-2 text-center ${idx === 0 ? 'rounded-t-xl' : ''} ${idx === 1 ? 'rounded-b-xl' : ''} border-b border-gray-100 hover:bg-[#5e21df] hover:text-white`}
                                    >
                                      <span>Kelas</span>
                                      <span className="ml-2">{kelas}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b border-gray-100 hover:bg-[#5e21df] hover:text-white rounded focus:outline-none"
                            onClick={() => {
                              if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                              }
                              if (submenuCloseTimeoutRef.current) {
                                clearTimeout(submenuCloseTimeoutRef.current);
                                submenuCloseTimeoutRef.current = null;
                              }
                              setActiveDropdown('template');
                              setActiveSubmenu(
                                activeSubmenu === 'sd' ? null : 'sd'
                              );
                            }}
                          >
                            <span className="w-full text-center">SD</span>
                          </button>
                          {activeSubmenu === 'sd' && (
                            <div
                              className="absolute top-0 left-full ml-2 min-w-fit w-auto rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200"
                              style={{ borderRadius: '1rem' }}
                            >
                              <ul className="py-2 px-2 text-center min-w-fit w-auto">
                                {[1, 2, 3, 4, 5, 6].map((kelas) => (
                                  <li key={kelas}>
                                    <Link
                                      href={`/kelas/SD/${kelas}`}
                                      className={`flex items-center justify-center w-auto min-w-fit px-4 py-2 text-center ${kelas === 1 ? 'rounded-t-xl' : ''} ${kelas === 6 ? 'rounded-b-xl' : ''} border-b border-gray-100 hover:bg-[#5e21df] hover:text-white`}
                                    >
                                      <span>Kelas</span>
                                      <span className="ml-2">{kelas}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b border-gray-100 hover:bg-[#5e21df] hover:text-white rounded focus:outline-none"
                            onClick={() => {
                              if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                              }
                              if (submenuCloseTimeoutRef.current) {
                                clearTimeout(submenuCloseTimeoutRef.current);
                                submenuCloseTimeoutRef.current = null;
                              }
                              setActiveDropdown('template');
                              setActiveSubmenu(
                                activeSubmenu === 'smp' ? null : 'smp'
                              );
                            }}
                          >
                            <span className="w-full text-center">SMP</span>
                          </button>
                          {activeSubmenu === 'smp' && (
                            <div
                              className="absolute top-0 left-full ml-2 min-w-fit w-auto rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200"
                              style={{ borderRadius: '1rem' }}
                            >
                              <ul className="py-2 px-2 text-center min-w-fit w-auto">
                                {[7, 8, 9].map((kelas) => (
                                  <li key={kelas}>
                                    <Link
                                      href={`/kelas/SMP/${kelas}`}
                                      className={`flex items-center justify-center w-auto min-w-fit px-4 py-2 text-center ${kelas === 7 ? 'rounded-t-xl' : ''} ${kelas === 9 ? 'rounded-b-xl' : ''} border-b border-gray-100 hover:bg-[#5e21df] hover:text-white`}
                                    >
                                      <span>Kelas</span>
                                      <span className="ml-2">{kelas}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                        <li className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 font-semibold hover:bg-[#5e21df] hover:text-white rounded-b-xl focus:outline-none"
                            onClick={() => {
                              if (closeTimeoutRef.current) {
                                clearTimeout(closeTimeoutRef.current);
                                closeTimeoutRef.current = null;
                              }
                              if (submenuCloseTimeoutRef.current) {
                                clearTimeout(submenuCloseTimeoutRef.current);
                                submenuCloseTimeoutRef.current = null;
                              }
                              setActiveDropdown('template');
                              setActiveSubmenu(
                                activeSubmenu === 'sma' ? null : 'sma'
                              );
                            }}
                          >
                            <span className="w-full text-center">SMA</span>
                          </button>
                          {activeSubmenu === 'sma' && (
                            <div
                              className="absolute top-0 left-full ml-2 min-w-fit w-auto rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200"
                              style={{ borderRadius: '1rem' }}
                            >
                              <ul className="py-2 px-2 text-center min-w-fit w-auto">
                                {[10, 11, 12].map((kelas) => (
                                  <li key={kelas}>
                                    <Link
                                      href={`/kelas/SMA/${kelas}`}
                                      className={`flex items-center justify-center w-auto min-w-fit px-4 py-2 text-center ${kelas === 10 ? 'rounded-t-xl' : ''} ${kelas === 12 ? 'rounded-b-xl' : ''} border-b border-gray-100 hover:bg-[#5e21df] hover:text-white`}
                                    >
                                      <span>Kelas</span>
                                      <span className="ml-2">{kelas}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative flex justify-center w-full md:w-auto">
                  <button
                    className={`rounded px-5 py-2 transition-colors flex items-center justify-center focus:outline-none bg-transparent ${showMenu ? 'text-black' : 'text-white'} border border-transparent group mt-2 md:mt-0 ${activeDropdown === 'pelajari' ? (showMenu ? 'bg-white/10 text-black' : 'bg-white/10 text-white') : ''}`}
                    type="button"
                    onClick={() => {
                      setActiveDropdown(
                        activeDropdown === 'pelajari' ? null : 'pelajari'
                      );
                      setActiveNav('pelajari');
                    }}
                    onMouseEnter={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => {
                            setSuppressNavHover(true);
                            openDropdown('pelajari');
                          }
                        : undefined
                    }
                    onMouseLeave={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => {
                            setSuppressNavHover(false);
                            closeDropdown('pelajari');
                          }
                        : undefined
                    }
                    onFocus={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => openDropdown('pelajari')
                        : undefined
                    }
                    onBlur={
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? () => closeDropdown('pelajari')
                        : undefined
                    }
                  >
                    Pelajari
                    <svg
                      className={[
                        'ml-1 h-4 w-4 transform transition-transform duration-200',
                        showMenu ? 'text-black' : 'text-white',
                        activeDropdown === 'pelajari'
                          ? 'rotate-180'
                          : 'rotate-0',
                      ].join(' ')}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {activeDropdown === 'pelajari' && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200"
                      style={{ borderRadius: '0.75rem', top: '100%' }}
                      onMouseEnter={() => {
                        if (closeTimeoutRef.current) {
                          clearTimeout(closeTimeoutRef.current);
                          closeTimeoutRef.current = null;
                        }
                        setSuppressNavHover(true);
                      }}
                      onMouseLeave={() => {
                        setSuppressNavHover(false);
                        closeDropdown('pelajari');
                      }}
                    >
                      <ul className="py-2 px-2 text-center">
                        <li>
                          <Link
                            href="/pelajari/student"
                            className="block px-4 py-2 font-semibold border-b border-gray-100 hover:bg-[#5e21df] hover:text-white rounded-t-xl"
                          >
                            Siswa
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pelajari/teacher"
                            className="block px-4 py-2 font-semibold border-b border-gray-100 hover:bg-[#5e21df] hover:text-white rounded"
                          >
                            Guru
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pelajari/school"
                            className="block px-4 py-2 font-semibold border-b border-gray-100 hover:bg-[#5e21df] hover:text-white rounded-b-xl"
                          >
                            Sekolah
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </nav>
              <div className="flex space-x-3">
                <a
                  href="/auth/login"
                  className={`rounded px-5 py-2 ${showMenu ? 'border border-black text-black hover:bg-black hover:text-white' : 'border border-white-600 text-white hover:bg-white hover:text-black'}`}
                >
                  Masuk
                </a>

                {/* Button Mobile */}
                <a
                  href="/auth/register"
                  className="rounded bg-[#6123e3] px-5 py-2 text-white md:hidden hover:bg-[#4b18b3] hover:text-white transition-colors"
                >
                  Coba Gratis
                </a>

                {/* Button Desktop */}
                <StarButton
                  href="/auth/register"
                  className={`rounded border border-white border-[1px] px-3 py-1.5 text-base hidden md:inline-block ${showMenu ? 'border border-black text-black hover:bg-black hover:text-white' : 'border border-white-600 text-black hover:bg-transparent hover:text-white'}`}
                  disableStars
                >
                  Coba Gratis
                </StarButton>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div
        className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center"
        style={{ paddingTop: '130px' }}
      >
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Lembar{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Pintar
            </span>{' '}
            untuk Siswa
          </h1>
          <p className="max-w-2xl text-lg text-white mb-6">
            Dari ruang kelas hingga tempat karier. Raih prestasi akademik,
            tingkatkan aktivitas ekstrakurikuler, dan bersiaplah untuk meraih
            kesuksesan bersama Lembar Pintar.
          </p>
        </div>
        {/* Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/images/pelajari/student/student01.png"
            alt="Lembar Pintar untuk siswa"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <header className="text-center mb-12 mt-20">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Mulai lebih awal
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white">
            Tingkatkan bahan belajar dan bangun dasar yang kuat untuk karier
            Anda dengan aplikasi komunikasi visual Lembar Pintar. Mulai dari
            proyek kelompok hingga lamaran kerja, Lembar Pintar memberi Anda
            keunggulan kreatif.
          </p>
        </header>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
          <div className="flex justify-center">
            <Image
              src="/images/pelajari/student/student02.png"
              alt="Lembar Pintar untuk siswa"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-7">
              Tingkatkan nilai, tanpa usaha lebih
            </h2>
            <ul className="list-disc pl-5 text-white space-y-7">
              <li>
                <strong>Wujudkan proyek Anda:</strong> Buat tugas menarik di
                Aplikasi Visual Lembar Pintar dengan Presentasi, Docs, Papan
                Tulis, dan banyak lagi!
              </li>
              <li>
                <strong>Produktivitas yang didukung AI:</strong> Hadirkan visual
                yang memukau dan ubah ukuran desain dengan sekali klik dengan
                alat desain yang didukung AI.
              </li>
              <li>
                <strong>Berkolaborasi sebagai kelompok:</strong> Bekerja sama
                dan taklukkan proyek kelompok dari mana pun, dengan komentar dan
                masukan secara real-time.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
