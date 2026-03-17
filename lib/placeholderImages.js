export const placeholderImages = {
  trekking: 'https://source.unsplash.com/400x300/?trekking',
  safari: 'https://source.unsplash.com/400x300/?safari',
  honeymoon: 'https://source.unsplash.com/400x300/?honeymoon',
  group: 'https://source.unsplash.com/400x300/?group,tour',
  adventure: 'https://source.unsplash.com/400x300/?adventure',
};

const categoryKeyMap = {
  'group tour': 'group',
  'custom adventure': 'adventure',
};

/**
 * Returns the image URL for a tour: uses tour.image if set,
 * otherwise the category-based Unsplash placeholder, else the default placeholder.
 */
export function getTourImageUrl(tour) {
  if (tour?.image) return tour.image;
  const category = tour?.category?.toLowerCase?.() ?? '';
  const key = categoryKeyMap[category] || category.replace(/\s+/g, '_');
  const placeholder = placeholderImages[key] || placeholderImages.adventure;
  return placeholder || '/placeholder.svg';
}
