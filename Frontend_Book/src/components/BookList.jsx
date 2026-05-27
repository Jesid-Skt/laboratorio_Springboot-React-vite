function BookList({ books, onEdit, onDelete }) {
  const handleDelete = (book) => {
    const confirmed = window.confirm(`¿Eliminar libro ${book.name}?`);
    if (confirmed) {
      onDelete(book.id);
    }
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/80 shadow-lg shadow-black/10">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
        <thead className="bg-slate-900 text-xs uppercase tracking-[0.12em] text-slate-400">
          <tr>
            <th className="px-4 py-4">Nombre</th>
            <th className="px-4 py-4">ISBN</th>
            <th className="px-4 py-4">Fecha publicación</th>
            <th className="px-4 py-4">Precio</th>
            <th className="px-4 py-4">Tipo</th>
            <th className="px-4 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {books.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-12 text-center text-slate-500">
                No hay libros que coincidan.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id} className="hover:bg-slate-900/70">
                <td className="px-4 py-4 font-medium text-slate-100">{book.name}</td>
                <td className="px-4 py-4 text-slate-300">{book.isbnNumber}</td>
                <td className="px-4 py-4 text-slate-300">{book.publishDate}</td>
                <td className="px-4 py-4 text-slate-300">{book.price}</td>
                <td className="px-4 py-4 text-slate-300">{book.type}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    className="mr-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                    onClick={() => onEdit(book.id)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                    onClick={() => handleDelete(book)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
