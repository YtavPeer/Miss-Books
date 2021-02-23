import { eventBus } from '../service/event-bus.service.js';

export default {
      name: 'user-msg',
      template: `
     <section v-if="msg" class="user-msg" :class="msg.type">
          <h1>{{msg.txt}}</h1>
          <router-link :to="msg.link">Cheack it out</router-link>
          <button @click="msg=null">X</button>
      </section>
      `,
      data() {
            return {
                  msg: null,
            }
      },
      methods: {
            setMeassage(msgFromEv) {
                  this.msg = msgFromEv;
                  setTimeout(() => {
                        this.msg = null;
                  }, 10000)
            }
      },
      created() {
            eventBus.$on('reviewAdd', this.setMeassage)
            eventBus.$on('reviewDelete', this.setMeassage)
      },
      destroyed() {
            eventBus.$off('reviewAdd', this.setMeassage)
            eventBus.$off('reviewDelete', this.setMeassage)
      }
}
