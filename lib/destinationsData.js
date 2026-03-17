import { referenceAssets } from './referenceAssets';

export const destinations = [
  {
    slug: 'eiffel-tower',
    title: 'Eiffel Tower',
    subtitle: 'Paris, 24 Trips',
    image: referenceAssets.destinations[0].image,
    description: 'The Eiffel Tower is one of the most iconic landmarks in the world. Experience Paris from above with stunning views of the city. Our tours include skip-the-line access, guided visits, and optional evening experiences.',
  },
  {
    slug: 'pryde-mountains',
    title: 'Pryde Mountains',
    subtitle: 'Prydelands, 100 Trips',
    image: referenceAssets.destinations[1].image,
    description: 'Explore the dramatic landscapes of the Pryde Mountains. From hiking and climbing to scenic drives, we offer a range of trips for every level. Discover pristine nature and unforgettable vistas.',
  },
  {
    slug: 'lao-lading-island',
    title: 'Lao Lading Island',
    subtitle: 'Krabal, 12 Trips',
    image: referenceAssets.destinations[2].image,
    description: 'Lao Lading Island is a tropical paradise with crystal-clear waters and white sand beaches. Join our island-hopping tours, snorkeling trips, or simply relax and unwind in this idyllic setting.',
  },
  {
    slug: 'ton-kwen-temple',
    title: 'Ton Kwen Temple',
    subtitle: 'Thailand, 20 Trips',
    image: referenceAssets.destinations[3].image,
    description: 'Discover the ancient beauty of Ton Kwen Temple and the rich culture of Thailand. Our tours combine temple visits with local experiences, markets, and authentic cuisine.',
  },
  {
    slug: 'bali-indonesia',
    title: 'Bali, Indonesia',
    subtitle: 'Thailand, 50 Trips',
    image: referenceAssets.destinations[4].image,
    description: 'Bali offers something for everyone: lush rice terraces, sacred temples, vibrant culture, and stunning beaches. Choose from adventure, wellness, or cultural tours tailored to your interests.',
  },
];

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug) || null;
}

export function getAllDestinationSlugs() {
  return destinations.map((d) => d.slug);
}
