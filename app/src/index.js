import Web3 from "web3";
import beerCaptain from "../../build/contracts/BeerCaptain.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = beerCaptain.networks[networkId];
      this.meta = new web3.eth.Contract(
        beerCaptain.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      //this.setVoteable();
      this.setEventListener();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setVoteable: async function() {
      const { votable } = this.meta.methods
      let vot = await votable().call()
      if (!vot) {
        document.querySelector('#ralf_btn').setAttribute('disabled', true)
        document.querySelector('#tristan_btn').setAttribute('disabled', true)
      }
  },

  setEventListener: async function() {
      this.meta.events.Voted({}, async (err, event) => {
        let vot = await this.meta.methods.getVotes(event.returnValues[1]).call()
        this.setVotes(event.returnValues[1], event.returnValues[0], vot)
      })
  },
  
  voteFor: async function(name) {
    const { vote } = this.meta.methods
    await vote(name).send({ from: this.account })
  },

  setVotes: function(name, votee, votes) {
    const status = document.getElementById(`${name}_votes`);
    status.innerHTML = votes;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
