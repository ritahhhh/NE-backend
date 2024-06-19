import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(3); // Adjust the number of books per page as needed

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/book/books');
      if (response?.status === 200) {
        setBooks(response.data.Result);
      } else {
        setError('Error occurred while fetching books');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white mt-10 rounded-lg h-fit p-10">
      <div className="flex justify-center justify-items-center">
        <h3 className="text-xl font-bold text-gray-900">Book List</h3>
      </div>
      <Link
        to={'/add-book'}
        className="border border-blue-500 bg-blue-500 p-2 rounded-md text-white outline-none float-right"
      >
        Add Book
      </Link>
      <div className="mt-10">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-1 border rounded w-full"
        />
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-gray-900">Book Name</th>
              <th className="py-2 px-4 text-gray-900">Author</th>
              <th className="py-2 px-4 text-gray-900">Publisher</th>
              <th className="py-2 px-4 text-gray-900">Publication Year</th>
              <th className="py-2 px-4 text-gray-900">Subject</th>
              <th className="py-2 px-4 text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentBooks.map((book) => (
              <tr key={book?.id} className="bg-white text-gray-900">
                <td className="py-2 px-4 whitespace-nowrap font-medium text-gray-900">{book?.name}</td>
                <td className="py-2 px-4 whitespace-nowrap font-medium text-gray-900">{book?.author}</td>
                <td className="py-2 px-4 whitespace-nowrap font-medium text-gray-900">{book?.publisher}</td>
                <td className="py-2 px-4 whitespace-nowrap font-medium text-gray-900">{book?.publishedyear}</td>
                <td className="py-2 px-4 whitespace-nowrap font-medium text-gray-900">{book?.subject}</td>
                <td className="py-2 px-4">
                  <button
                    className="font-medium text-cyan-600 hover:underline"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Borrow
                  </button>
                  <button
                    className="font-medium text-red-600 hover:underline ml-4"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded-md ${currentPage === index + 1 ? 'bg-blue-600' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
