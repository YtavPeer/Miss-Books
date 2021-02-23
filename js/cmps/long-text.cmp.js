export default {
      props: ['text'],
      template: `
<section class="long-text">

      <p v-if="readMore">{{this.shortText}}
          <button @click="readMore = !readMore">Read more... </button>
      </p>

      <p v-if="!readMore">{{this.longText}}
         <button @click="readMore = !readMore">Read less </button>
      </p>

</section>
`,
      data() {
            return {
                  readMore: null,
                  shortText: null,
                  longText: null,
            }
      },
      created() {
            this.longText = this.text;
            this.shortText = this.text.substring(0, 100);

            if (this.text.length > 100) {
                  this.readMore = true;
            } else {
                  this.readMore = false;
            }
      }

}