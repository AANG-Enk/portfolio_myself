import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Head from "../components/Head";

export default function NotFound() {
  return (
    <>
      <Head
        title="Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak tersedia."
        path="/404"
      />
      <div className="container-custom py-24 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-neutral-500 mx-auto" />
        <h1 className="text-2xl font-bold text-neutral-900">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-neutral-700">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sky-800 font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </>
  );
}
