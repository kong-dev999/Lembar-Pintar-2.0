import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  SparklesIcon, // AI
  ArrowDownTrayIcon, // Export
  UserGroupIcon, // Kolaborasi
  SwatchIcon, // Brand Kit
} from '@heroicons/react/24/outline';

const features = [
  { icon: SparklesIcon, title: 'AI Template Assist' },
  { icon: ArrowDownTrayIcon, title: 'Export ke PDF & PPT' },
  { icon: UserGroupIcon, title: 'Kolaborasi realtime' },
  { icon: SwatchIcon, title: 'Brand Kit Sekolah' },
];

const Guides = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-indigo-800 via-purple-500 to-purple-300 shadow-sm to-slate-50 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        {/* Kiri: showcase template */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:pt-2"
        >
          {['pendidikan.png', 'play.png', 'food.png', 'poster.png'].map(
            (img, i) => (
              <div
                key={i}
                className={[
                  'overflow-hidden rounded-t-xl rounded-b-xl',
                  i >= 2 ? 'mt-6 md:mt-10' : '',
                ].join(' ')}
              >
                <Image
                  src={`/images/tamplate/${img}`}
                  alt={`tamplate ${i + 1}`}
                  width={520}
                  height={400}
                  className="w-full h-auto object-cover rounded-b-xl scale-100 hover:scale-105 transition-transform duration-300"
                  priority={i < 2}
                />
              </div>
            )
          )}
        </motion.div>

        {/* Kanan: fitur utama */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Fitur Utama
          </span>

          <h2 className="mb-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Buat{' '}
            <span className="bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
              ribuan desain edukasi
            </span>{' '}
            hanya dalam hitungan menit
          </h2>

          <p className="mb-8 max-w-xl">
            Dari lembar Pintar, presentasi, hingga poster kreatif. Semua bisa
            kamu desain dengan mudah, cepat, dan tanpa ribet.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <span className="font-medium text-slate-700">{title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guides;