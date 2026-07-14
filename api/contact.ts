import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

// Validasi format email sederhana
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, message } = req.body as ContactPayload;

  // Validasi input di server (jangan cuma percaya validasi client-side)
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Nama, email, dan pesan wajib diisi." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Format email tidak valid." });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ error: "Pesan terlalu singkat." });
  }

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
  const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || GMAIL_USER;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD belum diset di environment variable.");
    return res.status(500).json({ error: "Layanan email belum dikonfigurasi." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true untuk port 465 (SSL)
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD, // WAJIB App Password, bukan password akun Gmail biasa
      },
    });

    await transporter.sendMail({
      from: `"Portofolio Contact Form" <${GMAIL_USER}>`,
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: `Pesan baru dari ${name} lewat portofolio`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      html: `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Gagal mengirim email:", err);
    return res.status(500).json({ error: "Gagal mengirim pesan, coba lagi nanti." });
  }
}
