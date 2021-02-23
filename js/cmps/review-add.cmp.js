import { bookService } from '../service/book-service.js';
import { eventBus } from '../service/event-bus.service.js';

export default {
      name: 'review-add',
      props: ['book'],
      template: `
     <section class="review-add">
           <h1>Add review:</h1>
            <form class="review-form" @submit.prevent="sendReview">
               <label for="reviewName">Your Name:</label>
               <input v-model="review.reviewName" id="reviewName"  ref='reviewName' type="text" placeHolder="Books Reader">

               <label for="datepicker">Read at:</label>
               <input v-model="review.dateReview" type="date" id="datepicker" name="datepicker">
               
                              <label for="rate">Rate your book:</label>
                              <select name="rate" id="rate" v-model="review.rate">
                                <option value="1">1 star</option>
                                <option value="2">2 star</option>
                                <option value="3">3 star</option>
                                <option value="4">4 star</option>
                                <option value="5">5 star</option>
                             </select>

               <label for="freeText">Write your Review here:</label>
               <textarea v-model="review.msgReview" id="freeText" name="freeText" rows="4" cols="50">
                     </textarea>
  
                 <input type="submit" value="send review">  
           </form>
      </section>
      `,
      data() {
            return {
                  review: {
                        reviewName: '',
                        msgReview: '',
                        dateReview: new Date().toISOString().slice(0, 10),
                        rate: null,
                  }
            }
      },
      methods: {
            sendReview() {
                  bookService.addReview(this.book, this.review)
                        .then(res => {
                              const msg = {
                                    txt: 'review added seccessfuly',
                                    type: 'success',
                                    link: this.$router.currentRoute.path
                              }
                              eventBus.$emit('reviewAdd', msg);
                        })
                        .catch(res => {
                              const msg = {
                                    txt: 'review failed,try again later',
                                    type: 'failed',
                                    link: this.$router.currentRoute.path
                              }
                              eventBus.$emit('reviewAdd', msg);
                        });
            },
      },
      created() {
      },
      mounted() {
            this.$refs.reviewName.focus();
      }
}
