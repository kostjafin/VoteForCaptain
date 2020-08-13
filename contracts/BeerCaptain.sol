pragma solidity >=0.4.21 <0.7.0;

contract BeerCaptain {
  mapping(bytes32 => address[]) votes;
  mapping(address => bool) voters;

  event Voted(address indexed voter, string votee);

  constructor() public {
  }

  function vote(string memory votee) public returns(bool) {
    bytes32 votee_hash = keccak256(bytes(votee));
    require(votee_hash == keccak256(bytes('tristan')) || votee_hash == keccak256(bytes('ralf')) );
    require(voters[msg.sender] == false);
    votes[votee_hash].push(msg.sender); 
    voters[msg.sender] = true;
    emit Voted(msg.sender, votee);
    return true;
  }

  function getVotes(string memory votee) public view returns(uint) {
    bytes32 votee_hash = keccak256(bytes(votee));
    return votes[votee_hash].length;
  }

  function votable() public view returns(bool) {
    return voters[msg.sender] == false;
  }
}
