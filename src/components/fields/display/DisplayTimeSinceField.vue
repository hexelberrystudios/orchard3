<template>
  <p>{{ displayValue }}</p>
</template>

<script>
  /*
   * This is the output of a time since field.
   */

  export default {
    name: 'display-time-since-field',
    computed: {
      // @TODO: Refactor into utility fn (or likely replace with a date library)
      displayValue: function (state) {
        let days,
          hours,
          minutes,
          seconds
        let latestDate = this.value;
        
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
    },
    props: {
      value: {
        required: false
      }
    }
  }
</script>