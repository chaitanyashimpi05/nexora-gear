export const categories = [
  {
    id: "mechanical-keyboards",
    name: "Mechanical Keyboards",
    icon: "FaKeyboard",
    banner: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1200",
    description: "Precision switches and tactile metallic chassis built for rapid responsiveness."
  },
  {
    id: "gaming-mouse",
    name: "Gaming Mouse",
    icon: "FaMousePointer",
    banner: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200",
    description: "Ultra-lightweight gaming mice with optical switches and high-DPI tracking."
  },
  {
    id: "mouse-pads",
    name: "Mouse Pads",
    icon: "FaLayerGroup",
    banner: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200",
    description: "Low-friction surface textures with anti-slip rubber bases and RGB lighting."
  },
  {
    id: "gaming-monitors",
    name: "Gaming Monitors",
    icon: "FaTv",
    banner: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200",
    description: "High refresh rates, curved panels, IPS screens, and low-latency response times."
  },
  {
    id: "gaming-headsets",
    name: "Gaming Headsets",
    icon: "FaHeadphones",
    banner: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200",
    description: "Immersive 7.1 surround sound audio, wireless flexibility, and studio-grade mics."
  },
  {
    id: "gaming-accessories",
    name: "Gaming Accessories",
    icon: "FaGamepad",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200",
    description: "RGB strip lights, durable aluminum headset stands, cables, and premium gear."
  }
];

export const products = [
  // MECHANICAL KEYBOARDS
  {
    id: "nexora-phantom-x68",
    name: "Nexora Phantom X68",
    price: 6999,
    category: "mechanical-keyboards",
    shortDesc: "RGB Mechanical Keyboard with hot-swappable switches and robust aluminum frame.",
    description: "The Nexora Phantom X68 is engineered for competitive gamers who demand performance and style. Featuring hot-swappable switches, a solid aircraft-grade aluminum chassis, dynamic per-key RGB lighting, and custom pre-lubed stabilizers, it provides an unparalleled tactile typing and gaming experience.",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800",
      "https://images.unsplash.com/photo-1626958011663-83d3e69ff228?q=80&w=800"
    ],
    specs: [
      "Layout: 65% Compact Layout (68 Keys)",
      "Switches: Outemu Blue (Tactile) / Red (Linear)",
      "Body: Aircraft-Grade Aluminum Alloy Top Plate",
      "Connectivity: Detachable USB Type-C Wired",
      "Features: Hot-Swappable Switches, Dynamic Per-key RGB"
    ],
    features: [
      "Premium Double-Shot PBT Keycaps",
      "Full N-Key Rollover & Anti-Ghosting",
      "Compatible with Windows, Mac, and Linux",
      "Pre-lubricated Stabilizers for wobble-free keys"
    ],
    stockStatus: "in-stock",
    rating: 4.8,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-06-01T12:00:00Z"
  },
  {
    id: "hyperstrike-tkl-pro",
    name: "HyperStrike TKL Pro",
    price: 8499,
    category: "mechanical-keyboards",
    shortDesc: "Wireless RGB mechanical gaming keyboard with rapid magnetic switches.",
    description: "Take absolute control with the HyperStrike TKL Pro. Driven by magnetic Hall-effect switches with customizable actuation points from 0.1mm to 4.0mm, this wireless keyboard delivers blistering speeds. A clean TKL (Tenkeyless) layout saves valuable mouse space.",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800"
    ],
    specs: [
      "Layout: Tenkeyless 80% Layout",
      "Switches: Magnetic Hall-Effect Switches",
      "Connectivity: 2.4GHz Wireless, Bluetooth 5.1 & USB-C",
      "Battery Life: Up to 120 hours (RGB off)",
      "Features: Adjustable Actuation, Rapid Trigger Mode"
    ],
    features: [
      "Rapid Trigger Technology with 0.1mm sensitivity",
      "Multi-device connection (up to 3 devices via Bluetooth)",
      "Vibrant per-key RGB backlighting",
      "Premium sound dampening dual-layer silicone foam"
    ],
    stockStatus: "in-stock",
    rating: 4.9,
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: "2026-07-01T12:00:00Z"
  },
  {
    id: "novablade-75",
    name: "NovaBlade 75",
    price: 5999,
    category: "mechanical-keyboards",
    shortDesc: "75% layout custom keyboard with pre-lubed silent switches and premium gasket mount.",
    description: "The NovaBlade 75 focuses on heavy sound dampening and elegant acoustics. Utilizing a gasket-mounted structure and silent mechanical linear switches, it offers a soft, quiet bottom-out sound profile suitable for gaming late at night or working in silent offices.",
    images: [
      "https://images.unsplash.com/photo-1626958011663-83d3e69ff228?q=80&w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800"
    ],
    specs: [
      "Layout: 75% Layout (82 Keys)",
      "Switches: Pre-lubed Silent Linear Switches",
      "Mounting: Gasket-Mounted plate structure",
      "Connectivity: USB Type-C Wired",
      "Materials: High-density polycarbonate case"
    ],
    features: [
      "Custom IXPE shaft pads and Poron foam layers",
      "Interactive media volume metal knob",
      "South-facing RGB LEDs for brilliant glow",
      "Fully programmable macros using Nexora Engine software"
    ],
    stockStatus: "low-stock",
    rating: 4.6,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-05-15T12:00:00Z"
  },

  // GAMING MOUSE
  {
    id: "phantom-claw-x1",
    name: "Phantom Claw X1",
    price: 3499,
    category: "gaming-mouse",
    shortDesc: "26000 DPI wireless mouse with optical switches and customizable RGB charging base.",
    description: "Achieve legendary precision with the Phantom Claw X1. Packing a cutting-edge 26,000 DPI PAW3395 sensor and custom optical switches rated for 90 million clicks, this mouse captures every micro-movement without lag, even in high-stakes esports matches.",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800"
    ],
    specs: [
      "Sensor: PAW3395 Optical Sensor (26,000 DPI)",
      "Polling Rate: Up to 4000Hz (with wireless dongle)",
      "Switches: Custom Optical Micro-Switches",
      "Connectivity: High-speed 2.4GHz Wireless & USB-C",
      "Weight: 63 grams"
    ],
    features: [
      "Ergonomic claw-grip optimized profile",
      "Super-slick 100% Virgin PTFE skates",
      "RGB side strip lighting indicators",
      "Includes magnetic charging dock with RGB glow"
    ],
    stockStatus: "in-stock",
    rating: 4.7,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-04-10T12:00:00Z"
  },
  {
    id: "ghost-pulse-elite",
    name: "Ghost Pulse Elite",
    price: 4799,
    category: "gaming-mouse",
    shortDesc: "Ultra-lightweight wireless mouse with 70-hour battery life and honeycomb frame.",
    description: "The Ghost Pulse Elite is engineered to reduce fatigue. Weighing in at a mere 54 grams, it utilizes a custom internal structure to remain incredibly rigid while feeling virtually weightless in your hand. The 70-hour fast-charging battery keeps you playing for days.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800"
    ],
    specs: [
      "Sensor: Nexora-Opti 20K Sensor (20,000 DPI)",
      "Weight: 54 grams Ultra-lightweight",
      "Battery Life: 70 Hours (continuous gaming)",
      "Connectivity: 2.4GHz Wireless, Bluetooth & Wired",
      "Buttons: 6 Programmable buttons"
    ],
    features: [
      "Symmetrical ambidextrous shape",
      "Quick charge: 10 mins charge gives 10 hours play",
      "Zero-debounce lag optical click mechanism",
      "Matte texture coating for sweat resistance"
    ],
    stockStatus: "in-stock",
    rating: 4.8,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: "2026-06-25T12:00:00Z"
  },
  {
    id: "apex-talon",
    name: "Apex Talon",
    price: 2999,
    category: "gaming-mouse",
    shortDesc: "12000 DPI ergonomic gaming mouse with dynamic RGB and thumb rest.",
    description: "Built for gamers seeking ultimate palm-grip comfort, the Apex Talon boasts a contoured ergonomic layout with an integrated thumb rest. The 12,000 DPI optical sensor combined with onboard profile storage lets you carry your custom sensitivity configurations anywhere.",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f329045565a?q=80&w=800",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800"
    ],
    specs: [
      "Sensor: Optical Gaming Sensor (12,000 DPI)",
      "Connectivity: Braided USB Cable",
      "Form Factor: Right-Handed Ergonomic with Thumb Rest",
      "Lighting: 3-Zone dynamic RGB lighting",
      "Switches: Mechanical click switches (50M ratings)"
    ],
    features: [
      "Textured rubber side grips for secure handling",
      "On-the-fly DPI cycle button",
      "Modular weights system (3 x 4g weights included)",
      "Assign macros with user-friendly app interface"
    ],
    stockStatus: "in-stock",
    rating: 4.5,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: "2026-03-20T12:00:00Z"
  },

  // MOUSE PADS
  {
    id: "shadow-glide-xxl",
    name: "Shadow Glide XXL",
    price: 1299,
    category: "mouse-pads",
    shortDesc: "Waterproof, anti-slip extra large desk mat with stitched edges.",
    description: "Protect your desk and master mouse control with the Shadow Glide XXL. Measuring 900mm by 400mm, it holds both keyboard and mouse. A microfiber cloth surface offers speed and stopping power, while a nano-waterproof layer guards against spills.",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800",
      "https://images.unsplash.com/photo-1632292224971-0d45778bd364?q=80&w=800"
    ],
    specs: [
      "Dimensions: 900 x 400 x 4 mm",
      "Surface Material: Water-resistant microfiber knit",
      "Base Material: Anti-slip textured natural rubber",
      "Stitching: Heavy-duty anti-fray stitched borders"
    ],
    features: [
      "Massive surface fits gaming keyboard & mouse",
      "Hydrophobic spill-resistant easy-clean coating",
      "Optimized for high and low DPI mouse sensors",
      "Flexible roll-up design with travel sleeve"
    ],
    stockStatus: "in-stock",
    rating: 4.7,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-02-15T12:00:00Z"
  },
  {
    id: "neon-grid-rgb",
    name: "Neon Grid RGB",
    price: 1599,
    category: "mouse-pads",
    shortDesc: "USB-powered mouse pad with dual-zone RGB edge lighting.",
    description: "Frame your setup in neon light with the Neon Grid RGB. Featuring a custom cybernetic grid design on a medium-speed textile surface, it incorporates dynamic fiber-optic edge lighting powered by a standard USB connector. Switch colors using the integrated controller.",
    images: [
      "https://images.unsplash.com/photo-1632292224971-0d45778bd364?q=80&w=800",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800"
    ],
    specs: [
      "Dimensions: 800 x 300 x 4 mm",
      "Power Source: Detachable Micro-USB cable",
      "Lighting: Dual-Zone 14-Mode RGB border",
      "Surface: Slick micro-textured fabric"
    ],
    features: [
      "Built-in one-button controller for light sequences",
      "Bright fiber-optics around the entire circumference",
      "Steady rubber base eliminates slippage",
      "Onboard memory retains color preset after shutdown"
    ],
    stockStatus: "in-stock",
    rating: 4.8,
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: "2026-06-18T12:00:00Z"
  },
  {
    id: "frost-surface-control",
    name: "Frost Surface Control",
    price: 999,
    category: "mouse-pads",
    shortDesc: "Medium-sized mouse pad with textured weave optimized for tactility.",
    description: "For players who prioritize stopping power over raw speed, the Frost Surface Control features a rough, textured micro-weave. This provides distinct physical feedback, allowing for pinpoint accuracy during tactical shooter headshots.",
    images: [
      "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=800",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800"
    ],
    specs: [
      "Dimensions: 450 x 400 x 3 mm",
      "Texture: Rough tactical-control hybrid weave",
      "Border: Sub-surface flat stitched borders",
      "Base: Non-slip polyurethane foam"
    ],
    features: [
      "High friction coefficient for precision mouse stop",
      "Humidity resistant construction prevents sluggish glide",
      "Compact desk profile suited for competitive tournaments",
      "Minimalist design with single corner logo stamp"
    ],
    stockStatus: "in-stock",
    rating: 4.4,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: "2026-01-05T12:00:00Z"
  },

  // GAMING MONITORS
  {
    id: "visionx-27q",
    name: "VisionX 27Q",
    price: 22999,
    category: "gaming-monitors",
    shortDesc: "27-inch 2K QHD IPS gaming monitor with 165Hz refresh rate and HDR400.",
    description: "Elevate your visual standards with the VisionX 27Q. Offering a crisp 2560x1440 2K QHD resolution on a Fast IPS display panel, it delivers vibrant color reproduction, wide viewing angles, and a blazing 165Hz refresh rate that turns fast-motion scenes silky smooth.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800"
    ],
    specs: [
      "Display: 27-inch Fast IPS Panel",
      "Resolution: 2K QHD (2560 x 1440)",
      "Refresh Rate: 165Hz",
      "Response Time: 1ms (GtG)",
      "Ports: 2x HDMI 2.0, 1x DisplayPort 1.4, USB Hub"
    ],
    features: [
      "VESA DisplayHDR 400 certification",
      "NVIDIA G-Sync and AMD FreeSync Premium compatible",
      "99% sRGB coverage for professional color grading",
      "Ergonomic height, tilt, swivel, and pivot adjust stand"
    ],
    stockStatus: "in-stock",
    rating: 4.7,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-03-12T12:00:00Z"
  },
  {
    id: "hyperview-240",
    name: "HyperView 240",
    price: 29999,
    category: "gaming-monitors",
    shortDesc: "24.5-inch professional esports monitor with 240Hz refresh rate and DyAc blur reduction.",
    description: "Designed strictly for competitive esports, the HyperView 240 features an extreme 240Hz refresh rate and 0.5ms response time on a high-speed panel. With motion-blur reduction algorithms, tracking fast targets across the screen is effortless.",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800"
    ],
    specs: [
      "Display: 24.5-inch Fast TN/IPS panel",
      "Resolution: Full HD (1920 x 1080)",
      "Refresh Rate: 240Hz",
      "Response Time: 0.5ms (Min GtG)",
      "Sync Tech: FreeSync Premium & G-Sync Syncing"
    ],
    features: [
      "Integrated side shielding hood to prevent glare",
      "Black Equalizer highlights dark corners without overexposing bright spots",
      "Fast-access S-Switch remote control for visual presets",
      "Ultra-thin borders for seamless multi-monitor configurations"
    ],
    stockStatus: "in-stock",
    rating: 4.9,
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: "2026-06-30T12:00:00Z"
  },
  {
    id: "novavision-ultra",
    name: "NovaVision Ultra",
    price: 35999,
    category: "gaming-monitors",
    shortDesc: "32-inch 1500R curved monitor with 144Hz refresh rate and 4K Ultra HD.",
    description: "Immerse yourself completely with the NovaVision Ultra. This huge 32-inch curved gaming display features a wrap-around 1500R curvature that conforms to the human eye field of view. The 4K resolution (3840x2160) provides jaw-dropping detail.",
    images: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800"
    ],
    specs: [
      "Display: 32-inch VA 1500R Curved Panel",
      "Resolution: 4K UHD (3840 x 2160)",
      "Refresh Rate: 144Hz",
      "Response Time: 1ms MPRT",
      "Contrast Ratio: 3000:1 (Native)"
    ],
    features: [
      "Deep blacks with high contrast VA panel",
      "HDR10 support for spectacular gaming visuals",
      "Built-in RGB ambient backlighting glows against walls",
      "Picture-in-Picture & Picture-by-Picture viewing mode"
    ],
    stockStatus: "out-of-stock",
    rating: 4.6,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: "2026-05-01T12:00:00Z"
  },

  // GAMING HEADSETS
  {
    id: "echostorm-x",
    name: "EchoStorm X",
    price: 5499,
    category: "gaming-headsets",
    shortDesc: "7.1 surround sound headset with noise-canceling mic and RGB styling.",
    description: "Gain the tactical audio advantage with the EchoStorm X. Its custom-tuned 50mm neodymium drivers deliver pinpoint 7.1 positional surround sound. The high-performance cardiod microphone filters out background noise, ensuring your team calls are crystal clear.",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800"
    ],
    specs: [
      "Drivers: Custom 50mm Neodymium Drivers",
      "Audio: 7.1 Virtual Surround Sound",
      "Connectivity: USB Wired with inline control",
      "Microphone: Retractable Cardioid Noise-Canceling",
      "Compatibility: PC, PS5, Xbox Series X, Switch"
    ],
    features: [
      "RGB cyclic ear cup rings with lockable colors",
      "Premium memory-foam ear cushions with cooling gel",
      "Robust steel reinforced headband frame",
      "Integrated audio dial and microphone mute slider"
    ],
    stockStatus: "in-stock",
    rating: 4.7,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-02-28T12:00:00Z"
  },
  {
    id: "shadowbass-elite",
    name: "ShadowBass Elite",
    price: 7299,
    category: "gaming-headsets",
    shortDesc: "Dual-wireless gaming headset with 60-hour battery life and deep bass boost.",
    description: "The ShadowBass Elite provides absolute wireless freedom with zero lag. Combining 2.4GHz lossless wireless and Bluetooth connectivity, you can hook it up to your PC and phone simultaneously. Specialized bass chambers deliver thunderous low-end sound without distorting mids.",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800"
    ],
    specs: [
      "Audio Connection: 2.4GHz Wireless, Bluetooth 5.2, 3.5mm Aux",
      "Battery Life: 60 Hours (USB-C Fast Charging)",
      "Drivers: 40mm Bio-Diaphragm Dual Chambers",
      "Wireless Range: Up to 15 meters / 50 feet",
      "Weight: 285g"
    ],
    features: [
      "Lossless ultra-low latency audio transmission",
      "Simultaneous audio mixing from two separate channels",
      "Plush fabric ear cups prevent sweat accumulation",
      "Detachable omnidirectional broadcast microphone"
    ],
    stockStatus: "in-stock",
    rating: 4.8,
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: "2026-07-03T12:00:00Z"
  },
  {
    id: "novabeat-pro",
    name: "NovaBeat Pro",
    price: 3999,
    category: "gaming-headsets",
    shortDesc: "Lightweight stereo gaming headset with deep bass and multi-platform jack.",
    description: "Designed for multi-platform gamers, the NovaBeat Pro provides rich, punchy stereo audio. Weighing only 240g, it features a self-adjusting ski-goggle headband that distributes weight evenly, making it comfortable during marathon gaming sessions.",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800"
    ],
    specs: [
      "Connectivity: 3.5mm Gold-Plated Audio Jack",
      "Weight: 240g ultra-lightweight build",
      "Drivers: 40mm dynamic dynamic drivers",
      "Mic Pattern: Flexible unidirectional microphone",
      "Cable Length: 2.0 meters braided cord"
    ],
    features: [
      "Self-adjusting suspension headband design",
      "Volume wheel and mute switch located on the ear cup",
      "Includes 3.5mm Y-splitter cable for PC",
      "Fold-flat earcups for easy neck rest and storage"
    ],
    stockStatus: "in-stock",
    rating: 4.5,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: "2026-03-05T12:00:00Z"
  },

  // GAMING ACCESSORIES
  {
    id: "aura-sync-rgb-strip",
    name: "Aura Sync RGB Strip",
    price: 1499,
    category: "gaming-accessories",
    shortDesc: "Smart RGB lighting strip with game audio sync and magnetic mount.",
    description: "Cast an immersive glow behind your setup. The Aura Sync RGB Strip features 60 addressable LEDs per meter, adhering cleanly to the back of monitors or desks with double-sided adhesive or built-in magnets. Integrated sound-reactive sensors sync patterns to your audio.",
    images: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800"
    ],
    specs: [
      "Length: 2x 1.2 Meter Strips",
      "LED Density: 60 LEDs per Meter (ARGB)",
      "Mounting: Strong integrated magnets & 3M backing",
      "Power Source: 5V USB connection"
    ],
    features: [
      "Audio controller syncs lights to music and gameplay sounds",
      "Compatible with major motherboard sync programs",
      "Soft silicone diffuse layer prevents harsh hotspots",
      "Fully cuttable strips with reconnect pins"
    ],
    stockStatus: "in-stock",
    rating: 4.6,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: "2026-01-20T12:00:00Z"
  },
  {
    id: "nexora-headset-stand",
    name: "Nexora Headset Stand",
    price: 1999,
    category: "gaming-accessories",
    shortDesc: "Aluminum headset stand with built-in 3-port USB hub and RGB base.",
    description: "Declutter your desk with the Nexora Headset Stand. Constructed from high-grade anodized aluminum, it supports all headset sizes. The weighted base contains an integrated 3-port USB 3.0 hub for flash drives and accessories, alongside a customized RGB glow border.",
    images: [
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800",
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800"
    ],
    specs: [
      "Materials: Anodized aluminum post, plastic base",
      "Ports: 3x USB 3.0 Type-A Data Ports",
      "Cable: 1.5 Meter braided USB-A link cable",
      "Lighting: 9-Mode dynamic RGB lighting ring base"
    ],
    features: [
      "USB 3.0 high-speed data transfer and charging",
      "Non-slip rubber base keeps the stand firmly planted",
      "Rubberized cradle protects headband from indents",
      "Includes a 3.5mm audio jack for direct pass-through"
    ],
    stockStatus: "in-stock",
    rating: 4.8,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: "2026-04-05T12:00:00Z"
  }
];

export const mockReviews = [
  {
    id: "rev-1",
    productId: "nexora-phantom-x68",
    name: "Rohan Sharma",
    rating: 5,
    comment: "This keyboard is outstanding. The key clicks are extremely responsive and the build is premium aluminum. Definitely worth the price!",
    createdAt: "2026-07-01T15:30:00Z"
  },
  {
    id: "rev-2",
    productId: "nexora-phantom-x68",
    name: "Aditya Verma",
    rating: 4,
    comment: "Excellent switches, but the blue switches are slightly loud. Go for red if you prefer a quieter keyboard. The RGB looks super premium.",
    createdAt: "2026-07-02T10:15:00Z"
  },
  {
    id: "rev-3",
    productId: "phantom-claw-x1",
    name: "Vikram Malhotra",
    rating: 5,
    comment: "Perfect wireless tracking. Absolutely zero latency and the charging dock looks gorgeous on my gaming desk.",
    createdAt: "2026-07-03T18:45:00Z"
  },
  {
    id: "rev-4",
    productId: "visionx-27q",
    name: "Nikhil Joshi",
    rating: 5,
    comment: "Stunning colors! Upgraded from a 1080p 60Hz and the difference is day and night. FPS gaming feels like butter.",
    createdAt: "2026-07-04T09:20:00Z"
  },
  {
    id: "rev-5",
    productId: "hyperstrike-tkl-pro",
    name: "Pooja Hegde",
    rating: 5,
    comment: "The magnetic switches are incredible. Customizing the actuation depth has completely changed my Valorant movement. High quality build!",
    createdAt: "2026-07-05T14:10:00Z"
  }
];
