'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useLanguage } from "@/app/language-provider"
import { PHONE_NUMBER, WHATSAPP_URL } from "@/lib/translations"
import { useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'

export default function ContactPage() {
  const { language } = useLanguage()
  
  const content = {
    id: {
      title: 'Hubungi Kami',
      subtitle: 'Tim support kami siap membantu Anda dengan pertanyaan atau kebutuhan apapun. Hubungi kami melalui berbagai channel yang tersedia.',
      contactInfo: [
        { icon: Mail, title: 'Email', info: 'gotanisejahtera@gmail.com', detail: 'Respons dalam 2 jam' },
        { icon: Phone, title: 'WhatsApp', info: PHONE_NUMBER, detail: 'Chat Langsung' },
        { icon: MapPin, title: 'Kantor Pusat', info: 'Jakarta, Indonesia', detail: 'Kunjungi kami di sini' },
        { icon: Clock, title: 'Support 24/7', info: 'Live Chat', detail: 'Bantuan instan' },
      ],
      formTitle: 'Kirim Pesan',
      labels: { name: 'Nama Lengkap', email: 'Email', phone: 'Telepon', topic: 'Topik', message: 'Pesan' },
      placeholders: { name: 'Nama Anda', email: 'email@example.com', phone: '+62-8xx-xxxx-xxxx', message: 'Tulis pesan Anda di sini...' },
      topicOptions: [
        'Daftar sebagai petani',
        'pembelian produk',
        'partnership',
        'fitur platform',
        'kendala dan masalah teknis',
        'kritik dan saran',
        'lainnya',
      ],
      submit: 'Kirim Pesan',
      hours: 'Jam Operasional',
      response: 'Response Time',
      monday: 'Senin - Jumat', friday_time: '09:00 - 17:00 WIB',
      saturday: 'Sabtu', saturday_time: '10:00 - 14:00 WIB',
      sunday: 'Minggu', sunday_time: 'Tutup',
      response_email: 'Email: Respons dalam 2 jam',
      response_chat: 'Live Chat: Respons dalam 5 menit',
      response_phone: 'Telepon: Respons langsung',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Our support team is ready to help you with any questions or needs. Contact us through various channels available.',
      contactInfo: [
        { icon: Mail, title: 'Email', info: 'gotanisejahtera@gmail.com', detail: 'Response within 2 hours' },
        { icon: Phone, title: 'WhatsApp', info: PHONE_NUMBER, detail: 'Direct Chat' },
        { icon: MapPin, title: 'Head Office', info: 'Jakarta, Indonesia', detail: 'Visit us here' },
        { icon: Clock, title: '24/7 Support', info: 'Live Chat', detail: 'Instant Help' },
      ],
      formTitle: 'Send Message',
      labels: { name: 'Full Name', email: 'Email', phone: 'Phone', topic: 'Topic', message: 'Message' },
      placeholders: { name: 'Your Name', email: 'email@example.com', phone: '+62-8xx-xxxx-xxxx', message: 'Write your message here...' },
      topicOptions: [
        'Daftar sebagai petani',
        'pembelian produk',
        'partnership',
        'fitur platform',
        'kendala dan masalah teknis',
        'kritik dan saran',
        'lainnya',
      ],
      submit: 'Send Message',
      hours: 'Operating Hours',
      response: 'Response Time',
      monday: 'Monday - Friday', friday_time: '09:00 - 17:00 WIB',
      saturday: 'Saturday', saturday_time: '10:00 - 14:00 WIB',
      sunday: 'Sunday', sunday_time: 'Closed',
      response_email: 'Email: Response within 2 hours',
      response_chat: 'Live Chat: Response within 5 minutes',
      response_phone: 'Phone: Instant response',
    },
  }
  
  const t = content[language]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')

  function buildWhatsAppMessage() {
    const parts: string[] = []
    parts.push('Halo GoTani! Ada yang mau kusampaikan nih')
    parts.push('')
    parts.push('DATA PROFILE')
    parts.push('')
    parts.push(`${t.labels.name}: ${name}`)
    parts.push(`${t.labels.email}: ${email}`)
    parts.push(`${t.labels.phone}: ${phone}`)
    parts.push(`${t.labels.topic}: ${topic}`)
    parts.push(`${t.labels.message}: ${message}`)
    return parts.join('\n')
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name || !message) {
      toast({ title: language === 'id' ? 'Form tidak lengkap' : 'Missing fields', description: language === 'id' ? 'Nama dan pesan harus diisi' : 'Name and message are required', variant: 'destructive' })
      return
    }
    const text = buildWhatsAppMessage()
    const url = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  useEffect(() => {
    // Ensure the topic is initialized to the first option when language/content loads
    if (!topic && Array.isArray(t.topicOptions) && t.topicOptions.length > 0) {
      setTopic(t.topicOptions[0])
    }
    // run when language changes
  }, [language])

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">{t.title}</h1>
          <p className="text-lg text-muted-foreground text-balance">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {t.contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="font-bold text-primary mb-1">{item.info}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.formTitle}</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.labels.name}</label>
                  <input
                    type="text"
                    value={name ?? ''}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.placeholders.name}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.labels.email}</label>
                  <input
                    type="email"
                    value={email ?? ''}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholders.email}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.labels.phone}</label>
                  <input
                    type="tel"
                    value={phone ?? ''}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.placeholders.phone}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.labels.topic}</label>
                  <select value={topic ?? ''} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    {(t.topicOptions ?? []).map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">{t.labels.message}</label>
                  <textarea
                    placeholder={t.placeholders.message}
                    rows={5}
                    value={message ?? ''}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t.submit}
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">{t.hours}</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex justify-between">
                    <span>{t.monday}</span>
                    <span className="font-semibold text-foreground">{t.friday_time}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{t.saturday}</span>
                    <span className="font-semibold text-foreground">{t.saturday_time}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{t.sunday}</span>
                    <span className="font-semibold text-foreground">{t.sunday_time}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">{t.response}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t.response_email}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t.response_chat}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{t.response_phone}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
