import bookPreview from './book-preview.cmp.js'

export default {
      props: ['books'],
      template: `
      <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                  <book-preview :book="book" @click.native="selectBook(book)"></book-preview>
           </li>
      </ul>
      `,
      data() {
            return {

            }
      },
      methods: {
            selectBook(book) {
                  this.$emit('selected', book);
            },
      },
      computed: {

      },
      components: {
            bookPreview,
      },
      created() {
      }

}
