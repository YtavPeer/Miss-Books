export default {
      props: ['book'],
      template: `
     <section class="book-preview">

     <div class="wrapper">
      <div class="card"><img :src="book.thumbnail"/>
       <div class="info">
        <h1>{{book.title}}</h1>
        <p>Only: {{priceForDisplay}}</p>
        <p>{{book.subtitle}}</p>
      <button><router-link :to="'/book/'+book.id">Read More</router-link></button>
    </div>
  </div>
</div>
      </section>
      `,
      computed: {
            priceForDisplay() {
                  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount);
            }
      }

}
