<template>
  <nybmfx :type="type"></nybmfx>
</template>
<script>
  import Nybmfx from 'components/nyzhfx/nyfyjg/nybmfx'
  export default {
    components: {
      Nybmfx
    },
    data() {
      return {
        type: 'nh'
      }
    }
  }
</script>
