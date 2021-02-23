import { bookService } from '../service/book-service.js';
import { eventBus } from '../service/event-bus.service.js';
import LongText from '../cmps/long-text.cmp.js';
import ReviewAdd from '../cmps/review-add.cmp.js';

export default {
      name: 'bookDetails',
      template: `
     <main v-if="book" class="book-details">
           <section class="decription-details">
            <h1>welcome </h1>
          <h1>Book details</h1>
          <p>ID: {{this.book.id}} </p>
          <p>title: {{this.book.title}} </p>
          <p>subtitle: {{this.book.subtitle}} </p>
          <p>authors: 
                <ul>
                      <li v-for="author in this.book.authors "> 
                            {{author}}
                      </li> 
                   </ul> 
          </p>
          <P>Published Date: {{publishDateForDisplay}} </P>
          <P>Description: <Long-text :text="this.book.description"></Long-text></P>
          <P>Page Count: {{pageCountForDisplay}} </P>
          <p>Categories: 
                <ul>
                      <li v-for="category in this.book.categories "> 
                            {{category}}
                        </li> 
                  </ul> 
            </p>
     </section>
     <section class="img-details">
            <img :src="this.book.thumbnail" /> 
            <P>Language: {{this.book.language}} </P>
            <P :class="{redPrice:this.book.listPrice.amount>150, greenPrice:this.book.listPrice.amount<20}">
                  Price: {{priceForDisplay}} 
            </P>
            <img class="details-img"  v-if="this.book.listPrice.isOnSale" src="../../img/sale.jpg" /> 
            <router-link to="/book">Back</router-link>
     </section>
     <section class="review">
           <ReviewAdd :book="book"></ReviewAdd>
           <div class="review">
              <p>Reviews: 
                  <ul>
                      <li class="review-article" v-for="(rev ,idx) in this.book.review" :key="idx"> 
                            <P>Reader name:{{rev.reviewName}}</P>
                            <P>Date:{{rev.dateReview}}</P>
                            <P>Rate:{{rev.rate}}</P>
                            <P>Description:{{rev.msgReview}}</P>
                            <button @click="removeReview(idx)">X</button>
                      </li> 
                  </ul> 
               </p>
           </div>
      </section>
</main>
      `,
      data() {
            return {
                  book: null,
            }
      },
      methods: {
            clearSelected() {
                  this.$emit('clear')
            },
            removeReview(ReviewIdx) {
                  bookService.removeReview(this.book, ReviewIdx)
                        .then(res => {
                              const msg = {
                                    txt: 'review deleted seccessfuly',
                                    type: 'success',
                                    link: this.$router.currentRoute.path
                              }
                              eventBus.$emit('reviewDelete', msg);
                        })
                        .catch(res => {
                              const msg = {
                                    txt: 'review deleted failed,try again later',
                                    type: 'failed',
                                    link: this.$router.currentRoute.path
                              }
                              eventBus.$emit('reviewDelete', msg);
                        });
            }
      },
      computed: {
            priceForDisplay() {
                  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount);
            },
            pageCountForDisplay() {
                  if (this.book.pageCount > 500) {
                        return 'Long reading (over 500)'
                  } else if (this.book.pageCount > 200) {
                        return 'Decent reading (over 200)'
                  } else if (this.book.pageCount < 100) {
                        return 'Light reading (less 100)'
                  } else {
                        return this.book.pageCount
                  }
            },
            publishDateForDisplay() {
                  var YearsDiff = new Date().getFullYear() - this.book.publishedDate
                  if (YearsDiff > 10) {
                        return 'Veteran Book'
                  } else if (YearsDiff < 1) {
                        return 'New!'
                  } else {
                        return this.book.publishedDate
                  }
            },
      },
      components: {
            LongText,
            ReviewAdd

      },
      created() {
            const id = this.$route.params.bookId;
            bookService.getBookById(id)
                  .then(bookFromDB => this.book = bookFromDB);
      }
}
