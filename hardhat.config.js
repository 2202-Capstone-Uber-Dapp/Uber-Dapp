//Alchemy is an Blockchain development platform 
// enables developers to create apps for the blockchain 
// https://eth-ropsten.alchemyapi.io/v2/_Axa0QA-ETh9n6o0psAMdM73QBig77hI

//Plugin to build smart contract tests 
require('@nomiclabs/hardhat-waffle')


module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/_Axa0QA-ETh9n6o0psAMdM73QBig77hI",
      accounts: [
        "8f0b97c554057cbf243622cd15f5f458a199ae6a144c5da3de2f8217e68bf48e",
      ],
    },
  },
};