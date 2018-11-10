<template>
  <kpi :lx="lx"></kpi>
</template>
<script>
  import Kpi from 'components/kpizbfx/kpi'
  export default {
    components: {
      Kpi
    },
    data() {
      return {
        lx: '1'
      }
    }
  }
</script>
