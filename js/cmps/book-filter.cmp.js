export default {
      template: `
     <section class="book-filter">
        <label> Search a book: </label>    
         <input type="text" @input="setFilter" placeholder="Search..." v-model="filterBy.name">

         <label> Max Price: </label>    
         <input type="range" name="rangeInput" @change="setFilter"  min="0" max="200" v-model.number="filterBy.price">
         <input  type="text" class="showPrice" :value="filterBy.price" readonly>
      </section>
      `,
      data() {
            return {
                  filterBy: {
                        name: '',
                        price: null,
                  }
            }
      },
      methods: {
            setFilter() {
                  this.$emit('filtered', this.filterBy)
            }
      }
}


