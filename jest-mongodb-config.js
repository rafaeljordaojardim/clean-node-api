module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3', // ver a versão do mongo de produção, pode ser algo que funcone aqui e nao funcione la
      skipMD5: true
    },
    autoStart: false,
    instance: {}
  }
}
