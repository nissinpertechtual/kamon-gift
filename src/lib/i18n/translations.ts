export const EN = {
  nav: {
    products: 'Products',
    story: 'Story',
    column: 'Journal',
    faq: 'FAQ',
    contact: 'Contact',
  },
  hero: {
    label: 'Laser-engraved Kamon Gifts',
    heading: 'Your family crest,\nengraved for eternity.',
    sub: 'Delicate laser engraving on metal, acrylic and glass.\nFor weddings, celebrations and gifts you’ll treasure.',
    ctaShop: 'View Products',
    ctaOrder: 'Make an Inquiry',
    trust: ['From a single piece', 'No crest? We’ll help you find it', 'Ships in about 2–3 weeks'],
    tate: 'A crest, carried into form.',
  },
  story: {
    label: 'Story',
    block1: {
      heading: 'Kamon — the crest of your lineage.',
      body: 'Japan is home to over ten thousand family crests.\nFrom samurai clans to merchant families,\neach kamon carries the memory of a name.',
    },
    block2: {
      heading: 'Every crest holds a wish.',
      body: 'Most kamon are drawn from plants, birds\nand the forms of nature —\nquiet wishes for prosperity, long life\nand the protection of a home.',
    },
    block3: {
      heading: 'A gift that carries meaning.',
      body: 'For a wedding. For a milestone.\nFor someone you want to remember forever.\nOne crest. One gift. Entirely yours.',
    },
  },
  scenes: {
    label: 'For Your Scene',
    items: [
      {
        title: 'For the things you love',
        body: 'Engrave a beloved crest or your own design\nonto metal or acrylic —\na one-of-a-kind keepsake.',
        href: '/en/products',
        imageUrl:
          'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=70&auto=format&fit=crop',
      },
      {
        title: 'Weddings & celebrations',
        body: 'A keepsake engraved with both family crests —\na refined gift for wedding favors\nor for your parents.',
        href: '/en/products',
        imageUrl:
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=70&auto=format&fit=crop',
      },
      {
        title: 'Souvenirs from Japan',
        body: 'Kamon is a design Japan is proud of.\nAn authentic Japanese gift for visitors\nand those heading overseas.',
        href: '/en/products',
        imageUrl:
          'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=70&auto=format&fit=crop',
      },
    ],
  },
  products: {
    label: 'Products',
    estimateLabel: 'Custom Quote',
    viewAll: 'View all products',
    empty: 'No products available yet.',
    materialLabels: {
      metal: 'Metal',
      leather: 'Leather',
      glass: 'Glass',
      acrylic: 'Acrylic',
    },
  },
  contact: {
    label: 'Contact',
    description:
      "Not sure of your family crest? We're happy to help.\nWe'll respond within 2–3 business days.",
    purposes: [
      'Personal Gift',
      'Wedding / Celebration',
      'Souvenir for Overseas',
      'Corporate / Wholesale',
      'Other',
    ],
    budgets: [
      'Under ¥5,000',
      '¥5,000–¥10,000',
      '¥10,000–¥30,000',
      '¥30,000+',
      "Not sure / Let's discuss",
    ],
    submit: 'Send Inquiry',
    sending: 'Sending...',
    successTitle: 'Thank you for your inquiry.',
    successBody:
      "We've sent a confirmation email.\nOur team will be in touch within 2–3 business days.",
    backHome: 'Back to Home',
  },
  flow: {
    label: 'How It Works',
    steps: [
      {
        number: '01',
        title: 'Send an Inquiry',
        body: 'Tell us your kamon and\nwhat you have in mind.\nUnsure of your crest? Just ask.',
      },
      {
        number: '02',
        title: 'Confirm & Quote',
        body: 'For custom orders,\nwe contact you directly\nwith a quote before we begin.',
      },
      {
        number: '03',
        title: 'Crafted & Delivered',
        body: 'Carefully engraved\nand delivered to you.\nTypical lead time: 2–3 weeks.',
      },
    ],
    points: [
      'Your crest data is handled with the utmost care',
      'Custom orders are guided personally by our team',
      'Production starts only after you approve the quote',
    ],
  },
  faq: {
    label: 'FAQ',
    heading: 'Frequently Asked Questions',
    items: [
      {
        q: 'I don’t know my family crest. Can I still order?',
        a: 'Absolutely. We’ll help you identify it from your family name or region. If you have an image of the crest, upload it through the inquiry form and we’ll take it from there.',
      },
      {
        q: 'How does ordering work?',
        a: 'Send us your desired item, crest name and purpose via the inquiry form. We’ll review it and reply with a quote — production begins once you approve.',
      },
      {
        q: 'How long does it take?',
        a: 'Typically about 2–3 weeks. It may vary by specification and quantity, so please let us know if you’re in a hurry.',
      },
      {
        q: 'Which materials do you offer?',
        a: 'Metal (brass / stainless steel), genuine leather, crystal glass and acrylic. Feel free to ask if you’re unsure which suits your gift.',
      },
      {
        q: 'Can I order just one piece?',
        a: 'Yes — we make pieces from a single item. We also handle bulk orders for wedding favors and corporate gifts.',
      },
      {
        q: 'How do I pay?',
        a: 'After you confirm the quote, our team will guide you through payment individually.',
      },
      {
        q: 'Can I submit my own crest image or data?',
        a: 'Yes. You can upload a crest image or logo data via the inquiry form.',
      },
    ],
  },
  finalCta: {
    heading: 'Questions? We’re here to help.',
    sub: 'Not sure about your family crest? Just ask.',
    button: 'Get in Touch',
  },
  footer: {
    tagline: 'Laser-engraved kamon gift specialist',
    cta: 'Inquiries & Orders',
    contactLabel: 'Phone & Contact',
    copy: '© Nisshin Partectual Co., Ltd.',
    links: [
      { label: 'Products', href: '/en/products' },
      { label: 'Story', href: '/en#story' },
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Contact', href: '/en/contact' },
    ],
  },
} as const;
