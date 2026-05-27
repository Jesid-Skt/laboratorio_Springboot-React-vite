import { useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookService from './services/BookService';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await BookService.getAllBooks();
      setBooks(response.data);
    } catch (err) {
      setError('No se pudieron cargar los libros.');
    }
  };

  const handleSave = async (book, isEdit) => {
    try {
      if (isEdit) {
        await BookService.updateBook(book.id, book);
        setMessage('Libro actualizado correctamente.');
      } else {
        await BookService.createBook(book);
        setMessage('Libro creado correctamente.');
      }
      setError(null);
      setSelectedBook(null);
      await fetchBooks();
    } catch (err) {
      setError('Error al guardar el libro. Verifica los datos.');
      setMessage(null);
    }
  };

  const handleEdit = async (bookId) => {
    try {
      const response = await BookService.getBookById(bookId);
      setSelectedBook(response.data);
      setError(null);
      setMessage(null);
    } catch (err) {
      setError('No se pudo cargar el libro para editar.');
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await BookService.deleteBook(bookId);
      setMessage('Libro eliminado correctamente.');
      setError(null);
      setSelectedBook((current) => (current?.id === bookId ? null : current));
      await fetchBooks();
    } catch (err) {
      setError('Error al eliminar el libro.');
      setMessage(null);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard de Libros</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Conexión lista para su API backend en <span className="text-cyan-300">http://localhost:8080/api/books</span>.
          </p>
        </header>

        {message && (
          <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.35fr_1.65fr]">
          <BookForm
            onSave={handleSave}
            selectedBook={selectedBook}
            onCancel={() => setSelectedBook(null)}
          />

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white">Lista de Libros</h2>
                <p className="text-sm text-slate-400">Filtra en tiempo real por nombre.</p>
              </div>
              <div className="w-full max-w-sm">
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
