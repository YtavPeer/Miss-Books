import { bookService } from '../service/book-service.js';
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'


export default {
      name: 'book-app',
      template: `
          <main class="book-app">
             <book-filter  @filtered="setFilter"></book-filter>
             <book-list  :books="booksToShow"></book-list>
          </main>
      `,
      data() {
            return {
                  books: null,
                  filterBy: null,
            }
      },
      methods: {
            loadBooks() {
                  bookService.query()
                        .then(books => this.books = books);
            },
            setFilter(filterValues) {
                  this.filterBy = filterValues;
            }
      },
      computed: {
            booksToShow() {
                  if (!this.filterBy) return this.books
                  const searchStr = this.filterBy.name.toLowerCase();
                  const booksToShow = this.books.filter(book => {
                        return book.title.toLowerCase().includes(searchStr) &&
                              book.listPrice.amount <= this.filterBy.price;
                  })
                  return booksToShow;
            }

      },
      created() {
            this.loadBooks()
      },
      components: {
            bookFilter,
            bookList,
      }


}
