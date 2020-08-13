const BeerCaptain = artifacts.require("BeerCaptain");

module.exports = function(deployer) {
  deployer.deploy(BeerCaptain);
};
