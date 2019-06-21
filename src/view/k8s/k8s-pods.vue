<template>
  <div>
    <Row>
      <Input v-model="name"
             placeholder="name"
             style="width: 200px" />&nbsp;
      <Input v-model="namespace"
             placeholder="namespace"
             style="width: 200px" />&nbsp;
      <Button @click="connection"
              type="primary">连接</Button>&nbsp;

    </Row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'nginx-7db9fccd9b-t5jlc',
      namespace: 'default'
    }
  },
  methods: {
    connection () {
      this.$router.push({
        path: `/webssh/${this.name}/${this.namespace}`
      })
    }
  }
}
</script>
