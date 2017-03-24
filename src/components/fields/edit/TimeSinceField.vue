<template>
  <div class="hxb-form-field">
    <span class="hxb-u-display-block">{{ value }}</span>
    <button type="button" @click="resetTime" class="hxb-button">Reset</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  /*
   * This is a time since field. This shows the amount of time that has elapsed
   * since the time has been reset.
   * 
   * @TODO: Add datepicker.
   *
   * @param {STRING} {REQUIRED} id          The id and name of this date field.
   * @param {STRING} {REQUIRED} label       The label for this date field.
   */

  export default {
    name: 'date-field',
    methods: {
      resetTime (e) {
        // tell action in form vuex module to update its form field with the following key/value pair
        this.$store.dispatch('form/updateField', {
          name: this.id,
          value: new Date()
        })
      }
    },
    mounted: function () {
      this.$store.dispatch('form/updateField', {
        name: this.id,
        value: new Date()
      })
    },
    computed: {
      // get the latest value of this form field from the vuex store
      ...mapState({
        // @TODO: Refactor into utility fn (or likely replace with a date library)
        value: function (state) {
          let days,
            hours,
            minutes,
            seconds
          let latestDate = state.form.fields[this.id];
          
          if (latestDate) {
            // looks like it gets saved as a string, so convert to date
            latestDate = new Date(latestDate);
            
            // time difference in ms
            let timeDiff = new Date().getTime() - latestDate;
            
            // strip the ms
            timeDiff /= 1000;
            
            // get seconds
            seconds = Math.round(timeDiff % 60);
            
            // remove seconds from the date
            timeDiff = Math.floor(timeDiff / 60);
            
            // get minutes
            minutes = Math.round(timeDiff % 60);
            
            // remove minutes from the date
            timeDiff = Math.floor(timeDiff / 60);
            
            // get hours
            hours = Math.round(timeDiff % 24);
            
            // remove hours from the date
            timeDiff = Math.floor(timeDiff / 24);
            
            // the rest of timeDiff is number of days
            days = timeDiff;
          } else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
          }
          
          return days + 'd:' + hours + 'h:' + minutes + 'm:' + seconds + 's';
        }
      })
    },
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
</script>