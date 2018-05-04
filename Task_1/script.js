'use strict'

var mesage = document.getElementById('status_block');
var start = document.getElementById('start_btn');
var request = new XMLHttpRequest();
var widgetData = null;

//configuring http request
request.open( 'GET', 'https://api.myjson.com/bins/10lny7', true );
request.send();
request.addEventListener('load',function () {
    if ( this.status === 200 ){
        widgetData = JSON.parse( this.response );
        console.log( widgetData );
    }else{
        console.error( 'ERROR' );
    }
});

//linking listener to start button
start.addEventListener('click', function () {
    var nullReplace = findNull(widgetData);
    var nullCounter = countNull(widgetData['wigdets']);    
    mesage.innerHTML = 'JSON:<br>' + JSON.stringify(nullReplace, null, 2) + '<br><br>';
    mesage.innerHTML += 'Ammount og nulls: ' + nullCounter;
});

//creating function that is looking and replacing all null with "null"
function findNull(arr){
    if (arr['wigdets']){
        arr['wigdets'].map(function (e) {
            for(var key in e){
                if (e[key] === null){
                    e[key] = "null";
                }
            }
            return e;
        })
    }
    return arr;
}

//creating function that counts nulls
function countNull(widgetData){
    var counter = 0;
    // console.log(widgetData);
    if (widgetData !== null && (Array.isArray(widgetData) || typeof widgetData === 'object')){
        for(let key in widgetData){
            counter += countNull(widgetData[key]);
        }
    }else if(widgetData == null) {
        counter++;
    }
    return counter;
}


