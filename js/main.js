import bookHeader from './cmps/books-header.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';
import { myRouter } from './service/routes.js';


const options = {
      el: '#app',
      router: myRouter,
      template: `
        <section>
            <userMsg />
            <book-header />
            <router-view />
            <footer class="footer"><p> &copy; Coffeerights 2021</p></footer>
        </section>
    `,
      components: {
            bookHeader,
            userMsg
      }
}

const app = new Vue(options)
