export interface Specification {
  name: string;
  value: string;
}

export interface ProductImages {
  front: string;
  back: string;
  side: string;
  top: string;
  zoom: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'laptops' | 'desktops' | 'accessories' | 'tablets';
  price: number;
  description: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  mainImage: string;
  images: ProductImages;
  specifications: Specification[];
  highlights: string[];
  pdfBrochure?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'dell-pro-7-14',
    name: 'Dell Pro 7 Series 14 2-in-1 Laptop',
    category: 'laptops',
    price: 2499,
    description: 'A premium, thin, and versatile 14-inch professional 2-in-1 laptop designed for high-performance multitasking and hybrid productivity. Supercharged by next-gen AMD Ryzen™ AI PRO processors and integrated Radeon™ Graphics, it features a durable aluminum design, a stunning 14" WUXGA touch display with active pen support, and advanced on-device AI capabilities with up to 50 TOPS NPUs.',
    rating: 4.9,
    reviewsCount: 42,
    stock: 12,
    mainImage: '/images/products/dell-pro-7/front.png',
    images: {
      front: '/images/products/dell-pro-7/front.png',
      back: '/images/products/dell-pro-7/back.png',
      side: '/images/products/dell-pro-7/side.png',
      top: '/images/products/dell-pro-7/top.png',
      zoom: '/images/products/dell-pro-7/zoom.png'
    },
    specifications: [
      { name: 'Base', value: 'Dell Pro 7 14 2-in-1 (P704265) Base' },
      { name: 'Processor', value: 'AMD Ryzen™ AI 7 PRO 450 (8 cores, 16 threads, up to 5.1 Ghz, 50 TOPS NPU)' },
      { name: 'Operating System', value: 'Windows 11 Pro, Copilot+ PC' },
      { name: 'Memory', value: '32 GB LPDDR5x, up to 8533 MT/s, dual-channel (onboard)' },
      { name: 'Graphics', value: 'Integrated AMD Radeon™ 860M Graphics (32 GB LPDDR5x memory)' },
      { name: 'Storage', value: '512 GB NVMe PCIe SSD' },
      { name: 'Connectivity', value: 'MediaTek Wi-Fi 6E MT7922 + Bluetooth®' },
      { name: 'Mobile Broadband', value: 'No Mobile Broadband Card' },
      { name: 'Display', value: '14" WUXGA Touch, 500 nits, 100% sRGB, Low Blue Light, Pen Support' },
      { name: 'Camera', value: 'FHD RGB HDR + IR Camera, 1080p @ 30 fps, Presence Detection, TNR, Shutter' },
      { name: 'Keyboard', value: 'English (US) Mini-LED backlit keyboard' },
      { name: 'Security', value: 'Fingerprint Reader' },
      { name: 'Ports', value: '2 x USB-C, 2 x USB-A' },
      { name: 'Battery & Warranty', value: '3-cell, 55.8 Wh, ExpressCharge Boost, 1-year hardware warranty' },
      { name: 'Power Adapter', value: '65W USB-C AC adapter' },
      { name: 'Support', value: 'ProSupport: 7x24 Technical Support, 3 Years' }
    ],
    highlights: [
      'Powered by AMD Ryzen™ AI 7 PRO processor with 50 TOPS NPU',
      'Stunning 14" WUXGA touchscreen with active pen support',
      'Versatile 2-in-1 convertible design with premium aluminum chassis',
      'Advanced enterprise security with IR Camera and Fingerprint Reader'
    ],
    pdfBrochure: '/docs/dell-pro-7-product-brochure.pdf'
  },
  {
    id: 'dell-pro-5-14',
    name: 'Dell Pro 5 Series 14 Laptop',
    category: 'laptops',
    price: 2129,
    description: 'A high-performance professional laptop designed for advanced business productivity. Supercharged by next-gen AMD Ryzen™ AI processors and integrated Radeon™ Graphics, it features a premium aluminum design, long battery life, a 14" WUXGA touchscreen with 100% sRGB, and robust enterprise-grade security.',
    rating: 4.8,
    reviewsCount: 37,
    stock: 14,
    mainImage: '/images/products/dell-pro-5/front.png',
    images: {
      front: '/images/products/dell-pro-5/front.png',
      back: '/images/products/dell-pro-5/back.png',
      side: '/images/products/dell-pro-5/side.png',
      top: '/images/products/dell-pro-5/top.png',
      zoom: '/images/products/dell-pro-5/zoom.png'
    },
    specifications: [
      { name: 'Base', value: 'Dell Pro 5 14 (P514265) Base' },
      { name: 'Processor', value: 'AMD Ryzen™ AI 7 450 (8 cores, 16 threads, up to 5.1 Ghz, 50 TOPS NPU)' },
      { name: 'Operating System', value: 'Windows 11 Pro, Copilot+ PC' },
      { name: 'Memory', value: '32 GB: 1 x 32 GB, DDR5, 5600 MT/s, single channel' },
      { name: 'Graphics', value: 'Integrated AMD Radeon™ 860M Graphics with AMD Ryzen AI 7 450' },
      { name: 'Storage', value: '512 GB NVMe PCIe SSD' },
      { name: 'Connectivity', value: 'MediaTek Wi-Fi 6E MT7922 + Bluetooth® 5.2' },
      { name: 'Mobile Broadband', value: 'No Mobile Broadband Card' },
      { name: 'Display', value: '14" WUXGA (1920x1200), Touch, 400 nits, 100% sRGB, Anti-Glare, LBL, 8MP+IR Cam' },
      { name: 'Camera', value: '8MP RGB HDR + IR Camera, 1440p @ 30 fps, Presence Detection, TNR, Shutter, Mic' },
      { name: 'Keyboard', value: 'English (US) Mini-LED backlit keyboard' },
      { name: 'Security', value: 'Fingerprint Reader' },
      { name: 'Battery & Warranty', value: '3-cell, 57 Wh, ExpressCharge Boost, 1-year hardware warranty' },
      { name: 'Power Adapter', value: '65W USB-C AC Adapter' },
      { name: 'Support', value: 'ProSupport: 7x24 Technical Support, 3 Years' }
    ],
    highlights: [
      'Powered by AMD Ryzen™ AI 7 processor with 50 TOPS NPU',
      'High-resolution 8MP RGB HDR + IR Camera for crisp video conferencing',
      'Vibrant 14" WUXGA touchscreen with 100% sRGB and Low Blue Light',
      'Long-lasting 57 Wh battery with ExpressCharge Boost capability'
    ],
    pdfBrochure: '/docs/dell-pro-5-product-brochure.pdf'
  },
  {
    id: 'dell-pro-5-16',
    name: 'Dell Pro 5 Series 16 Laptop',
    category: 'laptops',
    price: 2089,
    description: 'A premium and highly secure 16-inch commercial laptop designed for advanced business productivity. Supercharged by next-gen AMD Ryzen™ AI PRO processors and integrated Radeon™ Graphics, it features a premium metallic design, long battery life, a 16" WUXGA display with a numeric keypad, and robust enterprise-grade security.',
    rating: 4.8,
    reviewsCount: 35,
    stock: 16,
    mainImage: '/images/products/dell-pro-5-16/front.png',
    images: {
      front: '/images/products/dell-pro-5-16/front.png',
      back: '/images/products/dell-pro-5-16/back.png',
      side: '/images/products/dell-pro-5-16/side.png',
      top: '/images/products/dell-pro-5-16/top.png',
      zoom: '/images/products/dell-pro-5-16/zoom.png'
    },
    specifications: [
      { name: 'Base', value: 'Dell Pro 5 16 (P516265) Base' },
      { name: 'Processor', value: 'AMD Ryzen™ AI 7 PRO 450 (8 cores, 16 threads, up to 5.1 Ghz, 50 TOPS NPU)' },
      { name: 'Operating System', value: 'Windows 11 Pro, Copilot+ PC' },
      { name: 'Memory', value: '32 GB: 1 x 32 GB, DDR5, 5600 MT/s, single channel' },
      { name: 'Graphics', value: 'Integrated AMD Radeon™ 860M Graphics with AMD Ryzen AI 7 PRO 450' },
      { name: 'Storage', value: '512 GB NVMe PCIe SSD' },
      { name: 'Display', value: '16" WUXGA (1920x1200), Non-touch, 400 nits, 62.5% sRGB, Anti-Glare, FHD+IR Cam' },
      { name: 'Security', value: 'Fingerprint Reader' },
      { name: 'Camera', value: 'FHD RGB HDR + IR Camera, 1080p @ 30 fps, Presence Detection, TNR, Shutter, Mic' },
      { name: 'Keyboard', value: 'English (US) Mini-LED backlit keyboard with numeric keypad' },
      { name: 'Connectivity', value: 'MediaTek Wi-Fi 6E MT7922 + Bluetooth® 5.2' },
      { name: 'Mobile Broadband', value: 'No Mobile Broadband Card' },
      { name: 'Battery & Warranty', value: '3-cell, 57 Wh, ExpressCharge Boost, 1-year hardware warranty' },
      { name: 'Support', value: 'ProSupport: 7x24 Technical Support, 3 Years' }
    ],
    highlights: [
      'Powered by AMD Ryzen™ AI 7 PRO processor with 50 TOPS NPU',
      'Spacious 16" WUXGA display with premium metallic finish and numeric keypad',
      'Vibrant Mini-LED backlit keyboard for comfortable low-light typing',
      'Comprehensive 3-year ProSupport enterprise warranty protection'
    ],
    pdfBrochure: '/docs/dell-pro-5-16-product-brochure.pdf'
  },
  {
    id: 'dell-pro-3-14',
    name: 'Dell Pro 3 Series 14 Laptop',
    category: 'laptops',
    price: 1499,
    description: 'A highly secure and manageable commercial laptop designed for reliable everyday productivity. Powered by next-gen AMD Ryzen™ AI PRO processors and integrated Radeon™ Graphics, it features a service-friendly design, long battery life, and robust enterprise-grade security.',
    rating: 4.8,
    reviewsCount: 37,
    stock: 14,
    mainImage: '/images/products/dell-pro-3/front.png',
    images: {
      front: '/images/products/dell-pro-3/front.png',
      back: '/images/products/dell-pro-3/back.png',
      side: '/images/products/dell-pro-3/side.png',
      top: '/images/products/dell-pro-3/top.png',
      zoom: '/images/products/dell-pro-3/zoom.png'
    },
    specifications: [
      { name: 'Processor', value: 'AMD Ryzen™ AI 5 PRO 435 (6 cores, 12 threads, up to 4.5 Ghz, 50 TOPS NPU)' },
      { name: 'Graphics', value: 'Integrated AMD Radeon™ 840M Graphics' },
      { name: 'Memory', value: '16 GB DDR5, 5600 MT/s' },
      { name: 'Storage', value: '512 GB NVMe PCIe SSD' },
      { name: 'Display', value: '14" WUXGA (1920x1200), Non-Touch, 60Hz, 400 nits, 62.5% sRGB, Anti-Glare' },
      { name: 'Battery', value: '3-cell, 55 Wh, ExpressCharge Capable' },
      { name: 'Weight', value: '2.95 lbs (1.33 kg)' },
      { name: 'Operating System', value: 'Windows 11 Pro, Copilot+ PC' },
      { name: 'Chassis', value: 'Glass Fiber Composite (Top Cover, Palm-rest), PC+ABS (Bottom Cover)' },
      { name: 'Connectivity', value: 'MediaTek Wi-Fi 7 + Bluetooth 5.4' }
    ],
    highlights: [
      'Powered by AMD Ryzen™ AI PRO processors',
      'Lightweight and thin design starting at just 2.95 lbs',
      'Reliable productivity with up to 70Whr battery configurations',
      'Service-friendly modular design with customer-replaceable parts'
    ],
    pdfBrochure: '/docs/dell-pro-3-product-brochure.pdf'
  },
  {
    id: 'dell-pro-3-16',
    name: 'Dell Pro 3 Series 16 Laptop',
    category: 'laptops',
    price: 1779,
    description: 'A spacious and powerful 16-inch commercial laptop designed for reliable business productivity. Supercharged by next-gen AMD Ryzen™ AI PRO processors and integrated Radeon™ Graphics, it features a service-friendly design, long battery life, a 16" WUXGA display with a numeric keypad, and robust enterprise-grade security.',
    rating: 4.7,
    reviewsCount: 28,
    stock: 15,
    mainImage: '/images/products/dell-pro-3-16/front.png',
    images: {
      front: '/images/products/dell-pro-3-16/front.png',
      back: '/images/products/dell-pro-3-16/back.png',
      side: '/images/products/dell-pro-3-16/side.png',
      top: '/images/products/dell-pro-3-16/top.png',
      zoom: '/images/products/dell-pro-3-16/zoom.png'
    },
    specifications: [
      { name: 'Base', value: 'Dell Pro 3 16 P316265' },
      { name: 'Processor', value: 'AMD Ryzen™ AI 7 PRO 450 (8 cores, 16 threads, up to 5.1 Ghz, 50 TOPS NPU)' },
      { name: 'Operating System', value: 'Windows 11 Pro, Copilot+ PC' },
      { name: 'Display', value: '16" WUXGA (1920x1200), Non-touch, 400 nits, 62.5% sRGB, Anti-Glare, FHD+IR Cam' },
      { name: 'Camera', value: 'FHD RGB HDR + IR Camera, 1080p @ 30 fps, Presence Detection, TNR, Shutter, Mic' },
      { name: 'Storage', value: '512 GB NVMe PCIe SSD' },
      { name: 'Security', value: 'Fingerprint Reader' },
      { name: 'Battery & Warranty', value: '3-cell, 45 Wh, ExpressCharge Boost, 1-year hardware warranty' },
      { name: 'Connectivity', value: 'MediaTek Wi-Fi 6E MT7922 + Bluetooth® 5.2' },
      { name: 'Memory', value: '16 GB: 1 x 16 GB, DDR5, 5600 MT/s, single channel' },
      { name: 'Keyboard', value: 'English US standard backlit keyboard with numeric keypad' },
      { name: 'Mobile Broadband', value: 'No Mobile Broadband Card' },
      { name: 'Support', value: 'ProSupport: 7x24 Technical Support, 3 Years' }
    ],
    highlights: [
      'Powered by AMD Ryzen™ AI 7 PRO processor with 50 TOPS NPU',
      'Spacious 16" WUXGA anti-glare display with integrated numeric keypad',
      'High-quality FHD RGB HDR + IR Camera with presence detection and shutter',
      'Comprehensive 3-year ProSupport enterprise warranty protection'
    ],
    pdfBrochure: '/docs/dell-pro-3-16-product-brochure.pdf'
  },
  {
    id: 'dell-pad-pro-13',
    name: 'Dell Pad Pro 13"',
    category: 'tablets',
    price: 1199,
    description: 'Impossibly thin, mind-blowing performance. Featuring the breakthrough Tandem OLED Ultra Retina XDR display for superb highlights and ink-deep blacks. Powered by the hyper-efficient Dell Prime chip, it handles desktop-class design and CAD apps with ease.',
    rating: 4.8,
    reviewsCount: 92,
    stock: 20,
    mainImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    images: {
      front: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
      side: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80',
      top: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      zoom: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
    },
    specifications: [
      { name: 'Display', value: '13-inch Tandem OLED Ultra Retina XDR (2752 x 2064)' },
      { name: 'Processor', value: 'Dell Prime-2 9-Core Chip' },
      { name: 'Storage Options', value: '256GB / 512GB / 1TB / 2TB' },
      { name: 'Camera', value: '12MP Wide back, Landscape 12MP Ultra Wide front with Center Stage' },
      { name: 'Thickness', value: '5.1 mm' },
      { name: 'Speakers', value: 'Four-speaker audio system' },
      { name: 'Wireless', value: 'Wi-Fi 6E + Bluetooth 5.3' },
      { name: 'Weight', value: '1.28 lbs (579 g)' }
    ],
    highlights: [
      'Thinnest Dell tablet ever designed',
      'Ultra Retina XDR Tandem OLED display',
      'Desktop-class capability in a modular touch interface',
      'Compatible with Dell Pro Pencil and Folio Keyboard'
    ]
  },

  {
    id: 'dell-pro-slim-amd',
    name: 'Dell Pro Slim Desktop AMD',
    category: 'desktops',
    price: 1099,
    description: 'A compact, high-performance business desktop built for heavy workloads and tight spaces. Powered by AMD Ryzen™ PRO processors with integrated Radeon™ graphics, the Dell Pro Slim delivers exceptional security, manageability, and AI-enhanced productivity in a space-saving slim form factor design.',
    rating: 4.5,
    reviewsCount: 36,
    stock: 12,
    mainImage: '/images/products/dell-pro-slim/front.png',
    images: {
      front: '/images/products/dell-pro-slim/front.png',
      back: '/images/products/dell-pro-slim/back.png',
      side: '/images/products/dell-pro-slim/side.png',
      top: '/images/products/dell-pro-slim/top.png',
      zoom: '/images/products/dell-pro-slim/zoom.png'
    },
    specifications: [
      { name: 'Processor', value: 'AMD Ryzen™ 5 PRO 8500G (6 cores, up to 5.0GHz)' },
      { name: 'Operating System', value: 'Windows 11 Pro' },
      { name: 'Memory', value: '32 GB: 1 x 32 GB, DDR5, up to 4800 MT/s, non-ECC' },
      { name: 'Storage', value: '512 GB SSD' },
      { name: 'Graphics', value: 'Integrated AMD Radeon™ Graphics' },
      { name: 'Wireless', value: 'No Wireless LAN Card' },
      { name: 'Keyboard & Mouse', value: 'Dell Pro Keyboard and Mouse - KM5221W - US English - Black' },
      { name: 'Mouse', value: 'Mouse included with Keyboard' },
      { name: 'Form Factor', value: 'Small Form Factor (SFF) Slim Desktop' },
      { name: 'Support', value: 'ProSupport: Next Business Day Onsite, 4 Years' }
    ],
    highlights: [
      'Powered by AMD Ryzen™ 5 PRO 8500G processor for reliable business performance',
      'Space-saving slim desktop design ideal for tight workspaces',
      'Includes Dell Pro Keyboard and Mouse KM5221W bundle',
      'Comprehensive 4-year ProSupport Next Business Day Onsite warranty'
    ],
    pdfBrochure: '/docs/dell-pro-slim-product-brochure.pdf'
  },
  {
    id: 'dell-pro-slim-intel',
    name: 'Dell Pro Slim Desktop Intel',
    category: 'desktops',
    price: 1199,
    description: 'A compact, high-performance business desktop built for heavy workloads and tight spaces. Powered by Intel(R) Core(TM) Ultra 5 245 (13 TOPS NPU, 14 cores, up to 5.1GHz) with Windows 11 Pro, this Dell Pro Slim delivers exceptional security, manageability, and AI‑enhanced productivity in a space‑saving slim form factor design.',
    rating: 4.5,
    reviewsCount: 0,
    stock: 12,
    mainImage: '/images/products/dell-pro-slim/front.png',
    images: {
      front: '/images/products/dell-pro-slim/front.png',
      back: '/images/products/dell-pro-slim/back.png',
      side: '/images/products/dell-pro-slim/side.png',
      top: '/images/products/dell-pro-slim/top.png',
      zoom: '/images/products/dell-pro-slim/zoom.png'
    },
    specifications: [
      { name: 'Processor', value: 'Intel(R) Core(TM) Ultra 5 245 (13 TOPS NPU, 14 cores, up to 5.1GHz)' },
      { name: 'Operating System', value: 'Windows 11 Pro' },
      { name: 'Memory', value: '32GB: 1 x 32 GB, DDR5, up to 5600 MT/s, non‑ECC' },
      { name: 'Storage', value: '512GB SSD' },
      { name: 'Graphics', value: 'Integrated Graphics' },
      { name: 'Wireless', value: 'No Wireless LAN Card' },
      { name: 'Keyboard & Mouse', value: 'Dell Pro Keyboard and Mouse - KM5221W - US English - Black' },
      { name: 'Mouse', value: 'Mouse included with Keyboard' },
      { name: 'Form Factor', value: 'Small Form Factor (SFF) Slim Desktop' },
      { name: 'Support', value: 'ProSupport: Next Business Day Onsite, 4 Years' }
    ],
    highlights: [
      'Powered by Intel(R) Core(TM) Ultra 5 245 processor with AI acceleration',
      'Space‑saving slim desktop design ideal for tight workspaces',
      'Includes Dell Pro Keyboard and Mouse KM5221W bundle',
      'Comprehensive 4‑year ProSupport Next Business Day Onsite warranty'
    ],
    pdfBrochure: '/docs/dell-pro-slim-intel-brochure.pdf'
  },
  {
    id: 'dell-pro-max-tower-intel',
    name: 'Dell Pro Max Tower Desktop Intel',
    category: 'desktops',
    price: 2599,
    description: 'The Dell Pro Max Tower delivers workstation‑class performance for AI, data‑intensive workloads and demanding professional applications. Powered by Intel(R) Core™ Ultra 7 265 processor, 32 GB DDR5 memory, NVIDIA RTX A1000 graphics, and a 500 W Platinum PSU, this tower offers expandability and reliability for enterprise environments.',
    rating: 4.7,
    reviewsCount: 0,
    stock: 8,
    mainImage: '/images/products/big-monitor.avif',
    images: {
      front: '/images/products/big-monitor.avif',
      back: '/images/products/big-monitor.avif',
      side: '/images/products/big-monitor.avif',
      top: '/images/products/big-monitor.avif',
      zoom: '/images/products/big-monitor.avif'
    },
    specifications: [
      { name: 'Processor', value: 'Intel Core Ultra 7 265 (30 MB cache, 20 cores, 20 threads, 1.8 GHz to 5.3 GHz, 65W)' },
      { name: 'Operating System', value: 'Windows 11 Pro' },
      { name: 'Memory', value: '32GB: 1 x 32 GB, DDR5, 5600 MT/s, non‑ECC' },
      { name: 'Storage', value: '512GB SSD TLC with DRAM M.2 2280 PCIe Gen4 SED Ready' },
      { name: 'Graphics', value: 'NVIDIA(R) RTX(TM) A1000, 8 GB GDDR6, 4 mDP to DP adapters' },
      { name: 'Power Supply', value: '500W 80 Plus Platinum' },
      { name: 'Wireless', value: 'No Wireless LAN Card' },
      { name: 'Keyboard & Mouse', value: 'Dell Pro Keyboard and Mouse - KM5221W - US English - Black' },
      { name: 'Mouse', value: 'Mouse included with Keyboard' },
      { name: 'Form Factor', value: 'Large Tower (32L) Pro Max' },
      { name: 'Support', value: 'ProSupport: Next Business Day Onsite, 4 Years' }
    ],
    highlights: [
      'Powered by Intel Core Ultra 7 265 processor for extreme compute performance',
      'NVIDIA RTX A1000 graphics for AI and visualization workloads',
      'Robust 500 W Platinum PSU ensures stable power delivery',
      'Includes Dell Pro Keyboard and Mouse KM5221W bundle',
      'Comprehensive 4‑year ProSupport Next Business Day Onsite warranty'
    ],
    pdfBrochure: '/docs/dell-pro-max-tower-intel-brochure.pdf'
  },

  {
    id: 'hp-elite-x2',
    name: 'HP Elite x2 Detachable Tablet',
    category: 'tablets',
    price: 1149,
    description: 'A premium enterprise 2-in-1 detachable tablet. Engineered for remote professionals, featuring robust security layers, a built-in kickstand, an active stylus pen, and a high-performance detachable keyboard.',
    rating: 4.5,
    reviewsCount: 29,
    stock: 11,
    mainImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    images: {
      front: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
      side: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80',
      top: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      zoom: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
    },
    specifications: [
      { name: 'Display', value: '13-inch WUXGA+ (1920 x 1280) Touch IPS' },
      { name: 'Processor', value: 'Intel Core i5-1335U (10 Cores)' },
      { name: 'Graphics', value: 'Intel Iris Xe Graphics' },
      { name: 'Memory', value: '16GB LPDDR5 RAM' },
      { name: 'Storage', value: '512GB PCIe NVMe SSD' },
      { name: 'Camera', value: '8MP Rear Camera, 5MP Front IR Camera' },
      { name: 'Operating System', value: 'Windows 11 Pro' }
    ],
    highlights: [
      'Robust enterprise-grade biometric security protection',
      'Includes detachable travel keyboard & active stylus pen',
      'Built-in sturdy aluminum kickstand support',
      'Military-grade drop protection (MIL-STD 810H)'
    ]
  },
  {
    id: 'dell-creator-monitor-32',
    name: 'Dell 32" 4K Creator Monitor',
    category: 'accessories',
    price: 899,
    description: 'Elevate your visual workflow. With IPS Black technology delivering double the contrast ratio of traditional screens, 99% DCI-P3 color gamuts, and a built-in USB-C hub that charges your laptop up to 90W, this display is the ultimate studio partner.',
    rating: 4.7,
    reviewsCount: 76,
    stock: 15,
    mainImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    images: {
      front: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
      side: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80',
      top: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
      zoom: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
    },
    specifications: [
      { name: 'Screen Size', value: '31.5-inch Diagonal' },
      { name: 'Panel Type', value: 'IPS Black Technology (2000:1 Contrast Ratio)' },
      { name: 'Resolution', value: '3840 x 2160 (4K UHD)' },
      { name: 'Refresh Rate', value: '60 Hz' },
      { name: 'Brightness', value: '400 cd/m² (VESA DisplayHDR 400)' },
      { name: 'Ports', value: '1x Thunderbolt 4 (90W PD), 1x DisplayPort 1.4, 2x HDMI 2.0' },
      { name: 'Color Accuracy', value: 'Delta E < 2, 99% DCI-P3' },
      { name: 'Stand Adjustability', value: 'Height, Pivot, Swivel, Tilt' }
    ],
    highlights: [
      'IPS Black panel for rich blacks and deep contrast',
      'One cable connectivity with USB-C 90W power delivery',
      'Ultra-thin modern bezel design',
      'Integrated KVM switch to control two computers'
    ]
  },
  {
    id: 'dell-mechanical-keyboard',
    name: 'Dell Premium Mechanical Keyboard',
    category: 'accessories',
    price: 179,
    description: 'An ergonomic mechanical masterpiece designed for typing perfection. Features low-profile tactile switches, custom dye-sub keycaps, a solid CNC-anodized aluminum frame, and hybrid wireless/wired connectivity for Mac, Windows, and iPad.',
    rating: 4.6,
    reviewsCount: 118,
    stock: 35,
    mainImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    images: {
      front: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      side: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80',
      top: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&auto=format&fit=crop&q=80',
      zoom: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    },
    specifications: [
      { name: 'Layout', value: '75% Compact Tenkeyless (84 keys)' },
      { name: 'Switch Type', value: 'Low-profile Brown Tactile Mechanical Switches' },
      { name: 'Keycap Material', value: 'Double-shot PBT Keycaps' },
      { name: 'Connectivity', value: 'Bluetooth 5.1 (up to 3 devices), 2.4Ghz RF, USB-C' },
      { name: 'Backlight', value: 'White LED with 14 smart lighting modes' },
      { name: 'Battery', value: '2000mAh, up to 150 hours without backlight' },
      { name: 'Frame Material', value: 'Anodized Aircraft-grade Aluminum' },
      { name: 'Hot-swappable', value: 'Yes, compatible with 3-pin low profile MX switches' }
    ],
    highlights: [
      'Extremely solid CNC machined aluminum frame',
      'Multi-device seamless pairing with instant switching',
      'Smart sensor backlighting that turns on as hands approach',
      'Optimized layout for both macOS and Windows keys'
    ]
  },
  {
    id: 'dell-touch-mouse',
    name: 'Dell Magic Touch Mouse',
    category: 'accessories',
    price: 99,
    description: 'A revolutionary mouse experience. Featuring a continuous, seamless multi-touch surface that lets you perform simple gestures such as swiping between web pages and scrolling through documents with the brush of a finger.',
    rating: 4.4,
    reviewsCount: 65,
    stock: 50,
    mainImage: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    images: {
      front: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      side: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      top: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      zoom: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    },
    specifications: [
      { name: 'Sensor Type', value: 'Dell Laser Engine (works on glass)' },
      { name: 'Resolution', value: '2000 DPI adjustable' },
      { name: 'Surface', value: 'Multi-Touch gesture capacitive dome' },
      { name: 'Battery', value: 'Internal Rechargeable Lithium-Polymer (up to 2 months per charge)' },
      { name: 'Connectivity', value: 'Bluetooth wireless, Lightning-style charging' },
      { name: 'Dimensions', value: '4.47" x 2.25" x 0.85"' },
      { name: 'Weight', value: '0.22 lbs (99 g)' }
    ],
    highlights: [
      'Full gesture support for horizontal and vertical scrolling',
      'State-of-the-art sensor works flawlessly on any desk surface including glass',
      'Ultra-thin minimalist design contours comfortably to hand',
      'Recharges via USB-C port'
    ]
  },
  {
    id: 'dell-hi-fi-speakers',
    name: 'Dell Hi-Fi Studio Speakers',
    category: 'accessories',
    price: 349,
    description: 'Breathtaking sound, stunning aesthetic. These clear acrylic monitor speakers deliver unmatched acoustic clarity with high-performance dome tweeters and dual active subwoofers, filling your workspace with immersive, crystal-clear studio sound.',
    rating: 4.8,
    reviewsCount: 47,
    stock: 10,
    mainImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    images: {
      front: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&auto=format&fit=crop&q=80',
      side: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      top: 'https://images.unsplash.com/photo-1520170350707-b2da535702f7?w=800&auto=format&fit=crop&q=80',
      zoom: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    },
    specifications: [
      { name: 'Total Power Output', value: '80W RMS (Peak 160W)' },
      { name: 'Frequency Range', value: '45Hz - 22kHz' },
      { name: 'Enclosure Material', value: 'Acoustically Tuned Acrylic and Tempered Glass' },
      { name: 'Amplifier', value: 'Class-D High-Resolution Amplifier built-in' },
      { name: 'Drivers', value: '2.5" Midrange woofers, 0.75" Silk Dome tweeters' },
      { name: 'Connections', value: 'Bluetooth 5.0, 3.5mm Aux, USB-C DAC' },
      { name: 'DSP', value: 'Custom 24-bit DSP with manual bass/treble trim' }
    ],
    highlights: [
      'Acoustically neutral premium cabinet engineering',
      'Dual optical and wireless connections',
      'Stunning transparent build integrates beautifully in modern setups',
      'Deep, controlled bass without muddying mids'
    ]
  }
];
