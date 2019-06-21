<template>
  <div>
    <Row>
      <Card>

        <br />
        <div class="container">
          <my-terminal :terminal="terminal"
                       :url="url"></my-terminal>
        </div>

      </Card>
    </Row>

  </div>
</template>

<script>
import Console from '_c/k8s/Console'
export default {
  data () {
    return {
      title: 'webssh',
      name: '',
      namespace: '',
      terminal: {
        pid: 1,
        name: 'terminal',
        cols: 400,
        rows: 400
      },
      url: `ws://192.168.100.90:8000/ws/${this.$route.params.name}/${this.$route.params.namespace}`
    }
  },
  methods: {
    connection () {
      console.log(this.$route.params.name)
    }
  },
  components: {
    'my-terminal': Console
  }
}
</script>
