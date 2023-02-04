export default {
  name: 'standard',
  modules: {
    blog: {
      client: false,
      options: [
        {
          name: 'layout',
          type: 'select',
          options: ['flat', 'alternate'],
          default: 'flat',
        }
      ]
    }
  }
}
