export default {
      template: `
     <section class="about">
          <h1>about us</h1>
             <p> By buying your publications through the IMRF Bookshop, you are helping to improve Maritime SAR capability worldwide.
              Every penny we make, goes into sustaining the International Maritime Rescue Federation (IMRF) and it's projects.  
              IMRF help new and existing SAR organisations to train their crews, find and exchange equipment and services, and educate people in water safety. 
            </p>
            <img src="../../img/about.jpg" />
            
      </section>
      `,
      data() {
            return {
                  interval: null
            }
      },
      created() {
            this.interval = setInterval(() => { console.log('make because about interval') }, 10000)
      },
      destroyed() {
            clearInterval(this.interval);
      }

}
