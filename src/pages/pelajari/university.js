import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function StudentPage() {
    const [showMenu, setShowMenu] = useState(false);
    const [activeNav, setActiveNav] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    return (
        <section className="w-full bg-gradient-to-b from-white to-slate-50 min-h-screen py-12">
            <div className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-90 backdrop-blur shadow-sm border-b border-gray-300" style={{ top: '0px', paddingBottom: '10px' }}>
                <div className="mx-auto max-w-7xl px-6 pt-1 lg:px-8">
                    <header className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-1 md:gap-2" aria-label="LembarPintar home">
                            <div className="relative w-[40px] h-[40px] md:w-[60px] md:h-[60px] shrink-0 p-2 bg-transparent rounded-lg">
                                <Image
                                    src="/images/logo.png"
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
                            <nav className="flex w-full flex-col text-center md:w-auto md:flex-row md:space-x-3">                        
                                <div className="relative flex justify-center w-full md:w-auto" style={{ display: 'inline-flex' }}>
                                    <button
                                        className={`rounded px-5 py-2 transition-colors flex items-center justify-center focus:outline-none bg-transparent text-slate-900 border border-transparent group ${activeNav === 'template' ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' : ''} hover:bg-blue-600 hover:text-white`}
                                        type="button"
                                        onClick={() => { setActiveDropdown(activeDropdown === 'template' ? null : 'template'); setActiveNav('template'); }}
                                    >
                                        Template
                                        <svg className={["ml-1 h-4 w-4 text-slate-900 group-hover:text-white transform transition-transform duration-200", activeDropdown === 'template' ? 'rotate-180' : 'rotate-0'].join(' ')} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {activeDropdown === 'template' && (
                                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-2xl bg-white text-slate-900 shadow-lg z-50 border border-gray-200" style={{ borderRadius: '1rem', top: '100%' }}>
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
                                                                <li><Link href="/kelas/SD/1" className="block w-full px-4 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded">Kelas 1</Link></li>
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
                                                        className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b border-gray-100 hover:bg-blue-600 hover:text-white focus:outline-none"
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
                                                        <span className="w-full text-center">Sekolah Menengah Pertama (SMA)</span>
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
            <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center" style={{ paddingTop: '130px' }}>
                {/* Text Section */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Lembar <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Pintar</span> untuk Kampus
                    </h1>
                    <p className="max-w-2xl text-lg text-slate-600 mb-6">
                        Dukung seluruh aktivitas akademik di kampus dengan Lembar Pintar – solusi serbaguna untuk mahasiswa, dosen, dan staf. Satu platform untuk berkreasi, berkolaborasi, dan menginspirasi civitas akademika.
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <Image src="/images/pelajari/university/university01.png" alt="Lembar Pintar untuk Kampus" width={500} height={500} className="rounded-lg shadow-lg" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6">
                {/* Header Section */}
                <header className="text-center mb-12 mt-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Hadirkan semua manfaat Lembar Pintar ke komunitas kampus Anda
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Rasakan kemudahan dalam merancang, meneliti, berkolaborasi, dan membagikan karya akademik dengan alat modern yang mendukung mahasiswa, dosen, dan seluruh staf kampus.
                    </p>
                </header>

                {/* Content Section */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Video Section */}
                    <div className="flex justify-center">
                        <Image src="/images/pelajari/university/university02.png" alt="Lembar Pintar untuk Kampus" width={600} height={400} className="rounded-lg shadow-lg" />
                    </div>

                    {/* Text Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-7">Solusi Digital untuk Civitas Akademika</h2>
                        <ul className="list-disc pl-5 text-slate-600 space-y-7">
                            <li>
                                <strong>Desain jadi sederhana:</strong> Buat presentasi kuliah, laporan penelitian, proposal, hingga poster seminar dengan mudah menggunakan fitur seret dan taruh.
                            </li>
                            <li>
                                <strong>Kolaborasi lebih lancar:</strong> Mahasiswa, dosen, dan staf dapat bekerja bersama dalam satu platform – tanpa perangkat lunak tambahan.
                            </li>
                            <li>
                                <strong>Efisien dengan template:</strong> Gunakan template siap pakai untuk berbagai kebutuhan kampus, mulai dari kegiatan akademik, penelitian, hingga event kemahasiswaan.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
