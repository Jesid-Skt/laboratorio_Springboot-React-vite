package com.tdea.book.Services;

import com.tdea.book.Entity.Book;
import com.tdea.book.Repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    public Book save(Book book) {

        if (bookRepository.existsByIsbnNumber(book.getIsbnNumber())) {
            throw new RuntimeException("ISBN already exists");
        }

        return bookRepository.save(book);
    }

    public Book update(Long id, Book book) {

        Book existing = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // validar si el ISBN ya existe en otro registro
        if (bookRepository.existsByIsbnNumber(book.getIsbnNumber())
                && !existing.getIsbnNumber().equals(book.getIsbnNumber())) {
            throw new RuntimeException("ISBN already exists");
        }

        book.setId(id);
        return bookRepository.save(book);
    }

    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

    public List<Book> findByName(String name) {
        return bookRepository.findByNameContainingIgnoreCase(name);
    }
}