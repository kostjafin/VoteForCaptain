module.exports = {
  networks: {
    develop: {
      port: 8545
    },
    ganach: {
      port: 7545,
      host: "127.0.0.1",
      network_id: '5777'
    }
  },
  mocha: {
  },
  compilers: {
    solc: {
    }
  }
}
