import { useState } from 'react';

const defaultItineraryItem = () => ({ day: '', title: '', description: '' });

export default function TourForm({ tour, onSave, onCancel, saving }) {
  const [title, setTitle] = useState(tour?.title ?? '');
  const [description, setDescription] = useState(tour?.description ?? '');
  const [price, setPrice] = useState(tour?.price ?? '');
  const [image, setImage] = useState(tour?.image ?? '');
  const [duration, setDuration] = useState(tour?.duration ?? '');
  const [highlights, setHighlights] = useState(tour?.highlights?.length ? [...tour.highlights] : ['']);
  const [gallery, setGallery] = useState(tour?.gallery?.length ? [...tour.gallery] : ['']);
  const [itinerary, setItinerary] = useState(
    tour?.itinerary?.length ? tour.itinerary.map((i) => ({ ...i })) : [defaultItineraryItem()]
  );
  const [bookingNote, setBookingNote] = useState(tour?.booking_note ?? '');

  const addHighlight = () => setHighlights((h) => [...h, '']);
  const removeHighlight = (i) => setHighlights((h) => h.filter((_, idx) => idx !== i));
  const setHighlight = (i, v) => setHighlights((h) => h.map((x, idx) => (idx === i ? v : x)));

  const addGallery = () => setGallery((g) => [...g, '']);
  const removeGallery = (i) => setGallery((g) => g.filter((_, idx) => idx !== i));
  const setGalleryUrl = (i, v) => setGallery((g) => g.map((x, idx) => (idx === i ? v : x)));

  const addItinerary = () => setItinerary((i) => [...i, defaultItineraryItem()]);
  const removeItinerary = (idx) => setItinerary((i) => i.filter((_, i) => i !== idx));
  const setItineraryField = (idx, field, value) =>
    setItinerary((i) => i.map((item, iidx) => (iidx === idx ? { ...item, [field]: value } : item)));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description: description || null,
      price: price === '' ? null : Number(price),
      image: image || null,
      duration: duration || null,
      highlights: highlights.filter(Boolean),
      gallery: gallery.filter(Boolean),
      itinerary: itinerary.filter((i) => i.day || i.title || i.description),
      booking_note: bookingNote || null,
    };
    if (tour?.id) payload.id = tour.id;
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Basic info */}
      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Basic info</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                placeholder="e.g. 5 days / 4 nights"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Highlights</h2>
        <div className="space-y-2">
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={h}
                onChange={(e) => setHighlight(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2"
                placeholder="e.g. Scenic drives through mountains"
              />
              <button type="button" onClick={() => removeHighlight(i)} className="text-red-600 px-2">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addHighlight} className="text-blue-600 text-sm">
            + Add highlight
          </button>
        </div>
      </section>

      {/* Itinerary */}
      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Itinerary</h2>
        <div className="space-y-4">
          {itinerary.map((item, idx) => (
            <div key={idx} className="border rounded p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Day {idx + 1}</span>
                <button type="button" onClick={() => removeItinerary(idx)} className="text-red-600 text-sm">
                  Remove
                </button>
              </div>
              <input
                type="text"
                placeholder="Day label (e.g. Day 1)"
                value={item.day}
                onChange={(e) => setItineraryField(idx, 'day', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) => setItineraryField(idx, 'title', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <textarea
                placeholder="Description"
                value={item.description}
                onChange={(e) => setItineraryField(idx, 'description', e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
          <button type="button" onClick={addItinerary} className="text-blue-600 text-sm">
            + Add day
          </button>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Gallery</h2>
        <div className="space-y-2">
          {gallery.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setGalleryUrl(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2"
                placeholder="Image URL"
              />
              <button type="button" onClick={() => removeGallery(i)} className="text-red-600 px-2">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addGallery} className="text-blue-600 text-sm">
            + Add image
          </button>
        </div>
      </section>

      {/* Booking */}
      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Booking</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Booking note (optional)</label>
          <textarea
            value={bookingNote}
            onChange={(e) => setBookingNote(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. Book 30 days in advance for best availability"
          />
        </div>
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : tour?.id ? 'Update tour' : 'Create tour'}
        </button>
        <button type="button" onClick={onCancel} className="border border-gray-300 px-4 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </form>
  );
}
