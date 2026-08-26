'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useTripStore } from '../../lib/useTripStore';
import type { NewTrip, TransportMode } from '../../lib/types';

type TripFormData = NewTrip;

const transportOptions: { value: TransportMode; label: string }[] = [
  { value: 'train', label: 'train' },
  { value: 'bus', label: 'bus' },
  { value: 'tram', label: 'tram' },
  { value: 'metro', label: 'metro' },
  { value: 'bike', label: 'bike' },
  { value: 'walk', label: 'walk' },
  { value: 'car', label: 'car' },
  { value: 'other', label: 'other' },
];

export default function TripForm() {
  const today = new Date().toISOString().split('T')[0];
  const router = useRouter();
  const addTrip = useTripStore((state) => state.addTrip);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<TripFormData>({
    date: today,
    from: '',
    to: '',
    mode: 'train',
    actualCost: 0,
    normalCost: 0,
    note: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'actualCost' || name === 'normalCost' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from.trim() || !form.to.trim()) return;

    setError(null);
    try {
      await addTrip({
        ...form,
        from: form.from.trim(),
        to: form.to.trim(),
        note: form.note?.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan is mislukt.');
      return;
    }

    setForm({
      date: today,
      from: '',
      to: '',
      mode: 'train',
      actualCost: 0,
      normalCost: 0,
      note: '',
    });

    router.push('/');
  };

  return (
      <div className="w-full rounded-lg border border-border bg-background p-4 max-w-6xl">

        <form onSubmit={handleSubmit} className="p-5 font-mono text-sm">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider">
              Datum
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded border border-border px-3 py-2 outline-none"
              required
            />
          </div>

          {/* Van → Naar */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs uppercase">
                Van
              </label>
              <input
                type="text"
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder="venlo"
                className="w-full rounded border border-border px-3 py-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider">
                Naar
              </label>
              <input
                type="text"
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder="cologne"
                className="w-full rounded border border-border px-3 py-2 outline-none"
                required
              />
            </div>
          </div>

          {/* Vervoer */}
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider">
              Vervoer
            </label>
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="w-full rounded border border-border px-3 py-2 outline-none"
            >
              {transportOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Kosten */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider">
                Betaald (€)
              </label>
              <input
                type="number"
                name="actualCost"
                value={form.actualCost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded border border-border px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-wider">
                Normale prijs (€)
              </label>
              <input
                type="number"
                name="normalCost"
                value={form.normalCost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded border border-border px-3 py-2 outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="pt-2 text-xs text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded border border-border px-4 py-2 transition"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="rounded px-4 py-2 font-medium"
            >
              Trip opslaan
            </button>
          </div>
        </form>
      </div>
  );
}