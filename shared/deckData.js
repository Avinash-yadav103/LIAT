export const deckData = {
  property: {
    name: 'The Dubai Mall',
    city: 'Downtown Dubai',
    tagline: 'A city-scale commercial stage for luxury retail, destination dining, live events, and brand moments.',
    heroHeadline: 'Sell the scale, energy, and reach of the world’s most visited destination retail platform.',
    heroCopy:
      'A property story inspired by the public Dubai Mall positioning: Fashion Avenue, Dubai Aquarium & Underwater Zoo, Events, Exhibition Center, and the promise that you shop and they deliver.',
    heroVideo:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    ambientVideo:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  },
  dashboardPages: [
    {
      id: 'destination',
      label: 'Destination',
      title: 'Welcome to Dubai Mall',
      kicker: 'Scale first',
      summary:
        'A grand, luminous entry state that frames the mall as a city-scale destination for luxury, leisure, and live demand.',
      background:
        'https://images.unsplash.com/photo-1520763185298-1b434c919abe?auto=format&fit=crop&w=1600&q=80',
      orbitImage:
        'https://images.unsplash.com/photo-1516406146926-c627033eee98?auto=format&fit=crop&w=700&q=80',
      stats: ['1,200+ retailers', 'Global tourism draw', 'Premium dwell time']
    },
    {
      id: 'fashion',
      label: 'Fashion Avenue',
      title: 'Luxury retail with gravity',
      kicker: 'Retail path',
      summary:
        'A cinematic presentation of luxury fashion, flagship visibility, and brand adjacency designed for tenants and aspirational labels.',
      background:
        'https://images.unsplash.com/photo-1555377519-c92f03641dec?auto=format&fit=crop&w=1600&q=80',
      orbitImage:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80',
      stats: ['Flagship-ready', 'Luxury focus', 'High-intent audience']
    },
    {
      id: 'entertainment',
      label: 'Entertainment',
      title: 'Attractions that drive repeat visits',
      kicker: 'Family draw',
      summary:
        'Aquarium, fountain energy, and destination attractions are framed as reasons to visit, not just things to do after shopping.',
      background:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80',
      orbitImage:
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=700&q=80',
      stats: ['Repeat traffic', 'Immersive moments', 'Content-worthy scenes']
    },
    {
      id: 'events',
      label: 'Events',
      title: 'A platform for launches and live moments',
      kicker: 'Commercial stage',
      summary:
        'A flexible events and sponsorship story that positions the property as a booking platform for brands, agencies, and producers.',
      background:
        'https://images.unsplash.com/photo-1501612008063-e6ddd1ef86e7?auto=format&fit=crop&w=1600&q=80',
      orbitImage:
        'https://images.unsplash.com/photo-1501612008063-e6ddd1ef86e7?auto=format&fit=crop&w=700&q=80',
      stats: ['Bookable venue energy', 'Brand activations', 'Calendar leverage']
    }
  ],
  quickStats: [
    { label: 'Retailers', value: '1,200+' },
    { label: 'Annual visitors', value: '100M+', note: 'destination scale narrative' },
    { label: 'Core zones', value: 'Fashion, dining, entertainment' },
    { label: 'Partnership modes', value: 'Retail, sponsor, event' }
  ],
  journey: [
    {
      id: 'overview',
      title: 'Opening',
      eyebrow: 'Cinematic intro',
      description:
        'Start with a destination moment: towering scale, prestige adjacency, and a retail environment that feels closer to a city than a shopping center.',
      mediaLabel: 'Atmospheric opening sequence',
      bullets: ['Screen-share ready', 'Narrative-first', 'Non-linear deck'],
      cta: 'Explore the business case'
    },
    {
      id: 'why',
      title: 'Why This Property',
      eyebrow: 'Location + reach',
      description:
        'Downtown Dubai, global tourism, regional spending power, and iconic connectivity create a high-intent audience that brands can meet at scale.',
      stats: ['Tourism draw', 'Luxury adjacency', 'International visibility'],
      cta: 'See the audience profile'
    },
    {
      id: 'retail',
      title: 'Retail',
      eyebrow: 'Leasing opportunity',
      description:
        'Flagship, mid-market, and pop-up paths can all be staged in a property where dwell time, discovery, and brand visibility are part of the product. The public mall story already frames retail through Fashion Avenue and category-led districts.',
      stats: ['Flagships', 'Pop-ups', 'Fashion Avenue'],
      cta: 'Open leasing paths'
    },
    {
      id: 'luxury',
      title: 'Luxury',
      eyebrow: 'Premium positioning',
      description:
        'Luxury here is not a corner of the mall. It is a journey with cinematic pacing, elevated materiality, and a shopper mindset built for aspiration.',
      stats: ['Hero brands', 'High-spend traffic', 'Distinctive presentation'],
      cta: 'See luxury story'
    },
    {
      id: 'dining',
      title: 'Dining & Lifestyle',
      eyebrow: 'Social anchor',
      description:
        'Food is treated as content and community. It keeps the property alive beyond shopping hours and gives sponsors multiple touchpoints across the day.',
      stats: ['Daypart reach', 'Social content', 'Family dwell time'],
      cta: 'Browse lifestyle zones'
    },
    {
      id: 'attractions',
      title: 'Attractions & Entertainment',
      eyebrow: 'Differentiator',
      description:
        'Aquariums, fountains, immersive attractions, and adjacent cultural venues create repeat visitation and a reason to visit even without a purchase mission. Dubai Aquarium & Underwater Zoo is the kind of anchor that turns the mall into a destination on its own.',
      stats: ['Repeat visits', 'Family draw', 'Aquarium anchor'],
      cta: 'Launch the experience module'
    },
    {
      id: 'events',
      title: 'Events & Platform',
      eyebrow: 'Commercial stage',
      description:
        'Position the property as a platform for concerts, launches, conventions, and brand activations with booking paths that are easy to understand. Public site messaging already points to events, offers, and exhibition center storytelling, which makes the venue expansion feel credible.',
      stats: ['Brand activations', 'Venue bookings', 'Exhibition center'],
      cta: 'Open sponsorship tools'
    }
  ],
  modules: {
    events: {
      title: 'Events Module',
      description:
        'A dedicated booking layer for promoters, agencies, and corporates that need to understand formats, audience fit, and calendar availability.',
      points: ['Launches, showcases, concerts, and conferences', 'Scalable venue blueprints', 'Clear inquiry path'],
      cta: 'Request venue availability'
    },
    sponsorship: {
      title: 'Sponsorship Module',
      description:
        'A brand partnership framework with audience framing, tiered placements, and activation examples that translate into pipeline.',
      points: ['Tiered exposure', 'Audience reach', 'Activation storyboards'],
      cta: 'Review partnership tiers'
    },
    leasing: {
      title: 'Leasing Paths',
      description:
        'Segmented pitches for luxury, retail, food & beverage, and pop-up tenants so each prospect immediately sees relevance.',
      points: ['Luxury flagships', 'Mid-tier growth', 'Short-term activations'],
      cta: 'Compare leasing paths'
    },
    venue: {
      title: 'Venue Blueprint',
      description:
        'A modular venue story that can expand into performing arts, exposition, and convention modules without rewriting the deck.',
      points: ['Performing arts-ready', 'Expo hall logic', 'Convention overlays'],
      cta: 'Explore venue potential'
    }
  },
  actionCards: [
    {
      label: 'Leasing inquiry',
      title: 'Retail and flagship opportunities',
      detail: 'Ideal for luxury, fashion, beauty, and category-defining brands.',
      mood: 'Commercial'
    },
    {
      label: 'Sponsorship conversation',
      title: 'High-intent audience moments',
      detail: 'For brands looking to own visibility at destination scale.',
      mood: 'Partnership'
    },
    {
      label: 'Event booking',
      title: 'Launches, conferences, and live moments',
      detail: 'For producers and agencies booking the venue as a platform.',
      mood: 'Programming'
    }
  ]
};
