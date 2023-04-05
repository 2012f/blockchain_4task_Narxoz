// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;
contract CoinFlipper{

    uint8 option;
    enum options{Kamen, Nozhnica, Bumaga}
    constructor() payable{

    } 
    
    event GamePlayed(address player, bool isWinner);

    function playGame(uint8 _option) public payable returns (bool){
        

        require(_option<3, "You can choose 0 or 1, or 2");
        require(address(this).balance>=msg.value*2, "Address do not have sufficient balance");
        option=_option;//орел-0, решка-1
        uint8 result = (uint8)(block.timestamp)%3;
        
        
        if((options)(option)==options.Kamen&& (options)(result)==options.Nozhnica){
            payable(msg.sender).transfer(msg.value*2); 
            emit GamePlayed(msg.sender, true);
            return true;
        }else if((options)(option)==options.Bumaga && (options)(result)==options.Kamen){
            payable(msg.sender).transfer(msg.value*2); 
            emit GamePlayed(msg.sender, true);

            return true;
        }else if((options)(option)==options.Nozhnica && (options)(result)==options.Bumaga){
            payable(msg.sender).transfer(msg.value*2); 
            emit GamePlayed(msg.sender, true);

            return true;
        }else{
            emit GamePlayed(msg.sender, false);
            return false;
        }

       
    }
     receive() external  payable {

    }
   
}
