import './App.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import bookStore from '@/lib/data';
import { useState } from 'react';
import { cn } from './lib/utils';
type Book = {
  [key: string]: string | number;
};
const inputDefaultState = {
  author: '',
  country: '',
  language: '',
  pages: '',
  title: '',
  year: '',
};
function App() {
  const [books, setBooks] = useState(bookStore);
  const [inputs, setInputs] =
    useState<Record<string, string>>(inputDefaultState);
  const keys = Object.keys(bookStore[0]);

  function filterBooks(inputsArg: Record<string, string>) {
    const booksClone = [...bookStore];
    const { author, title, country, language, pages, year } = inputsArg;
    const authorRegex = new RegExp(author, 'i');
    const titleRegex = new RegExp(title, 'i');
    const countryRegex = new RegExp(country, 'i');
    const languageRegex = new RegExp(language, 'i');
    const pagesRegex = new RegExp(pages, 'i');
    const yearRegex = new RegExp(year, 'i');
    const filteredBooks = booksClone.filter((book) => {
      return (
        authorRegex.test(book.author) &&
        titleRegex.test(book.title) &&
        countryRegex.test(book.country) &&
        languageRegex.test(book.language) &&
        pagesRegex.test(book.pages.toString()) &&
        yearRegex.test(book.year.toString())
      );
    });
    setBooks(filteredBooks ?? []);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputTarget = event.target.id;
    const inputValue = event.target.value;

    let inputsClone = { ...inputs };
    inputsClone[inputTarget] = inputValue.length > 0 ? inputValue : '';
    setInputs(inputsClone);
    filterBooks(inputsClone);
  }

  return (
    <div className="text-left">
      <div className="flex items-center mb-8">
        {keys.map((e, i) => (
          <Input
            type="text"
            key={i}
            placeholder={e}
            className={cn({ 'mr-2': i !== keys.length - 1 })}
            value={inputs[e]}
            onChange={handleInputChange}
            id={e}
          />
        ))}
      </div>
      <Table>
        <TableCaption>Filter Books by any property</TableCaption>
        <TableHeader>
          <TableRow>
            {keys.map((e, i) => (
              <TableHead key={i} className="capitalize">
                {e}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length > 0 &&
            books.map((book: Book, i) => (
              <TableRow key={i}>
                {keys.map((key, index) => (
                  <TableCell key={index}>{book[key]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
