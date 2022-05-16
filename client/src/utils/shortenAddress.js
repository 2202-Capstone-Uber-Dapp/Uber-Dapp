//Shortens a wallet adress if we want to display it somewhere on the front end 
export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
