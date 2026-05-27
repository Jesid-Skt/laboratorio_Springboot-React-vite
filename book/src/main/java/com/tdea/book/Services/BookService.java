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
        return bookRepository.save(book);
    }

    public Book update(Long id, Book book) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found");
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