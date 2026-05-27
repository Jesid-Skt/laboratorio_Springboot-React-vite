import { useEffect, useState } from 'react';

const initialForm = {
  name: '',
  isbnNumber: '',
  publishDate: '',
  price: '',
  type: 'EBOOK',
};

function BookForm({ onSave, selectedBook, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (selectedBook) {
      setForm({
        name: selectedBook.name || '',
        isbnNumber: selectedBook.isbnNumber || '',
        publishDate: selectedBook.publishDate || '',
        price: selectedBook.price ?? '',
        type: selectedBook.type || 'EBOOK',
      });
      setFormError(null);
    } else {
      setForm(initialForm);
    }
  }, [selectedBook]);

  const validate = () => {
    if (!form.name.trim()) return 'El nombre es obligatorio.';
    if (!form.isbnNumber.trim()) return 'El número ISBN es obligatorio.';
    if (!form.publishDate.trim()) return 'La fecha de publicación es obligatoria.';
    if (!form.price || Number(form.price) <= 0) return 'El precio debe ser mayor a 0.';
    if (!form.type) return 'El tipo de libro es obligatorio.';
    return null;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const bookPayload = {
      ...form,
      price: Number(form.price),
      id: selectedBook?.id,
    };

    setFormError(null);
    await onSave(bookPayload, Boolean(selectedBook));
    if (!selectedBook) {
      setForm(initialForm);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setFormError(null);
    if (selectedBook) {
      onCancel();
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white">{selectedBook ? 'Editar libro' : 'Nuevo libro'}</h2>
        <p className="mt-2 text-sm text-slate-400">
          {selectedBook ? 'Ajusta los datos y guarda para actualizar el libro.' : 'Completa el formulario y crea un nuevo libro.'}
        </p>
      </div>

      {formError && <div className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{formError}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">ISBN</label>
          <input
            name="isbnNumber"
            value={form.isbnNumber}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Fecha publicación</label>
          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Precio</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          >
            <option value="EBOOK">EBOOK</option>
            <option value="SOFTCOPY">SOFTCOPY</option>
            <option value="HARDCOVER">HARDCOVER</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button type="submit" className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            {selectedBook ? 'Actualizar' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            {selectedBook ? 'Cancelar' : 'Limpiar'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookForm;
