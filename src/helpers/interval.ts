import { Game } from '../../src/mvc/models';

// Note : this web socket logic is kinda secured 
// it wont work with tw0 browsers at the same time


let webSocket;

export function connected(socket){     
    webSocket = socket
}

  let initNumber = 0;
  let update = null ;
  let realTimeNumber = 0;
  let closeTime ;

  const GenerateNewCloseTime = () => {
    return Math.round(Math.random() * 10 ) + 1;
  }

  const countUp = async ( reset : boolean ) => { 
    if(reset){

      Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: 0 }).exec().then(() => {
           setTimeout( () => handleUpdate(GenerateNewCloseTime()) , 5000)
       }); 
      realTimeNumber = await Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
    }
    if(!reset){
       initNumber = await Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
       update = await Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: +(initNumber[0].gameValue + 0.1 ).toFixed(1) }).exec();
       realTimeNumber = await Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
    }     
  }

    closeTime = GenerateNewCloseTime();


export const handleUpdate = ( closeTime ) => {
  console.log(`close at : ${closeTime}`)
  
  let interval : any = setInterval(function () {
     
    if( realTimeNumber &&  Math.trunc(realTimeNumber[0].gameValue) + 1 === closeTime ){
        clearInterval(interval); 
        countUp(true);
        webSocket.emit('gameValue' , 'Expired' )
        return
        }

    realTimeNumber && console.log(realTimeNumber[0].gameValue);
    webSocket && realTimeNumber && webSocket.emit('gameValue' , realTimeNumber[0].gameValue )
    
    countUp(false); 
    }, 300);
}

handleUpdate(closeTime);





