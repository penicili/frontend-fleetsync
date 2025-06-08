import React from 'react';
import Image from 'next/image';

const Home = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
        {/* Hero Section */}
        <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10 md:gap-0">
            <div className="flex-1 flex flex-col items-center md:items-start z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow-xl">
                    FleetHub <span className="text-blue-600">Management</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-800 mb-8 max-w-2xl font-medium">
                    Platform internal perusahaan untuk manajemen armada, pengemudi, dan rute perjalanan. Dirancang khusus untuk mendukung efisiensi, keamanan, dan kolaborasi antar tim di lingkungan korporasi Anda.
                </p>
                <div className="flex gap-4">
                    <a href="/auth/login" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-colors duration-200 text-lg">
                        Mulai Sekarang
                    </a>
                    <a
                        href="#features"
                        className="inline-block bg-white border border-blue-700 text-blue-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-200 text-lg"
                    >
                        Lihat Fitur
                    </a>
                </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end relative">
                <div className="w-[340px] h-[260px] md:w-[500px] md:h-[360px] relative">
                    <Image
                        src="/images/retrocar.jpg"
                        alt="FleetHub Hero"
                        fill
                        className="object-cover rounded-3xl shadow-2xl border-4 border-white"
                        priority
                    />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-transparent pointer-events-none rounded-b-3xl" />
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-6xl mx-auto py-20 px-4">
            <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-14 tracking-tight">Fitur Utama</h2>
            <div className="grid gap-10 md:grid-cols-3">
                <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <Image src="/file.svg" alt="Vehicle" width={56} height={56} className="mb-5" />
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">Vehicle Service</h3>
                    <p className="text-gray-700 text-center text-lg">Kelola data kendaraan operasional perusahaan secara terpusat dan aman. Hanya untuk admin dan manajer internal.</p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <Image src="/globe.svg" alt="Driver" width={56} height={56} className="mb-5" />
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">Driver Service</h3>
                    <p className="text-gray-700 text-center text-lg">Manajemen data pengemudi dan penugasan kendaraan untuk seluruh karyawan yang berwenang. Penugasan dan update data lebih mudah.</p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <Image src="/window.svg" alt="Route" width={56} height={56} className="mb-5" />
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">Route Service</h3>
                    <p className="text-gray-700 text-center text-lg">Atur dan pantau rute perjalanan armada perusahaan. Akses dan kontrol berdasarkan peran dan penugasan internal.</p>
                </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 py-16 text-center text-white mt-auto">
            <p className="mb-8 text-lg md:text-xl">Akses hanya untuk karyawan dan tim internal perusahaan. Daftar sekarang untuk mulai menggunakan FleetHub Management.</p>
            <a href="/auth/register" className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-lg shadow-lg hover:bg-blue-100 transition-colors duration-200 text-lg">
                Register
            </a>
        </section>
    </div>
);

export default Home;
