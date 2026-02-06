export type Language = 'id' | 'en';

export const PHONE_NUMBER = '+62 815-5487-7596';
export const WHATSAPP_URL = `https://wa.me/6281554877596`;

export const translations = {
  id: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'Tentang Kami',
      features: 'Fitur',
      catalog: 'Produk',
      testimonials: 'Testimonial',
      blog: 'Blog',
      contact: 'Kontak',
      joinNow: 'Bergabung Sekarang',
      admin: 'Admin',
    },
    // Hero Section
    hero: {
      badge: 'Platform Pertanian Berkelanjutan',
      headline: 'Transparansi Harga, Kesejahteraan Petani',
      description: 'GoTani menghubungkan petani langsung dengan distributor, memberikan transparansi harga pasar dan mengurangi food loss untuk sistem pangan berkelanjutan.',
      joinButton: 'Bergabung Sekarang',
      learnMore: 'Pelajari Lebih Lanjut',
      stats: {
        farmers: 'Petani Aktif',
        distributors: 'Distributor',
        provinces: 'Provinsi',
      },
    },
    // WhatsApp Section
    whatsapp: {
      title: 'Katalog GoTani',
      description: 'Bergabung dengan saluran WhatsApp kami dan dapatkan akses ke katalog lengkap produk segar dari petani pilihan',
      fullCatalog: 'Katalog Lengkap',
      free: 'Gratis',
      joinChannel: 'Gabung Channel',
    },
    // Features Section
    features: {
      title: 'Mengapa Memilih GoTani?',
      subtitle: 'Platform yang dirancang untuk memberdayakan petani dan mendukung distributor dengan teknologi dan transparansi.',
      items: [
        {
          title: 'Transparansi Harga',
          description: 'Informasi harga pasar dari berbagai wilayah dengan analisis mendalam',
        },
        {
          title: 'Koneksi Langsung',
          description: 'Hubungkan petani dengan distributor tanpa perantara berbelit-belit',
        },
        {
          title: 'Kurangi Food Loss',
          description: 'Strategi efektif untuk mengurangi pemborosan makanan hingga 40%',
        },
        {
          title: 'Komunitas Aktif',
          description: 'Bergabung dengan ribuan petani dan distributor yang saling mendukung',
        },
      ],
    },
    // Admin
    admin: {
      title: 'Admin Dashboard',
      products: 'Products',
      newProduct: 'New Product',
      deleteConfirm: 'Delete this product?',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      images: 'Images',
      backToSite: 'Back to site',
      signOut: 'Sign out',
      settings: 'Settings'
    },
    // Latest section
    latest: {
      title: 'Produk Terbaru',
      description: 'Produk yang ditambahkan melalui dashboard admin',
      noProducts: 'Tidak ada produk tersedia'
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About Us',
      features: 'Features',
      catalog: 'Products',
      testimonials: 'Testimonials',
      blog: 'Blog',
      contact: 'Contact',
      joinNow: 'Join Now',
      admin: 'Admin',
    },
    // Hero Section
    hero: {
      badge: 'Sustainable Agriculture Platform',
      headline: 'Price Transparency, Farmer Prosperity',
      description: 'GoTani connects farmers directly with distributors, providing market price transparency and reducing food loss for a sustainable food system.',
      joinButton: 'Join Now',
      learnMore: 'Learn More',
      stats: {
        farmers: 'Active Farmers',
        distributors: 'Distributors',
        provinces: 'Provinces',
      },
    },
    // WhatsApp Section
    whatsapp: {
      title: 'GoTani Catalog',
      description: 'Join our WhatsApp channel and get access to a complete catalog of fresh products from selected farmers',
      fullCatalog: 'Full Catalog',
      free: 'Free',
      joinChannel: 'Join Channel',
    },
    // Features Section
    features: {
      title: 'Why Choose GoTani?',
      subtitle: 'A platform designed to empower farmers and support distributors with technology and transparency.',
      items: [
        {
          title: 'Price Transparency',
          description: 'Market price information from various regions with in-depth analysis',
        },
        {
          title: 'Direct Connection',
          description: 'Connect farmers with distributors without complicated intermediaries',
        },
        {
          title: 'Reduce Food Loss',
          description: 'Effective strategies to reduce food waste by up to 40%',
        },
        {
          title: 'Active Community',
          description: 'Join thousands of farmers and distributors supporting each other',
        },
      ],
    },
    // Admin
    admin: {
      title: 'Admin Dashboard',
      products: 'Products',
      newProduct: 'New Product',
      deleteConfirm: 'Delete this product?',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      images: 'Images',
      backToSite: 'Back to site',
      signOut: 'Sign out',
      settings: 'Settings'
    },
    // Latest section
    latest: {
      title: 'Latest Products',
      description: 'Products added via the admin dashboard',
      noProducts: 'No products available'
    },
  },
};

export function getTranslation(language: Language, path: string): any {
  const keys = path.split('.');
  let value: any = translations[language];
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value;
}
