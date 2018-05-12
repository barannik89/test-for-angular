'use strict'

let table = document.querySelector('table');
let tableHead = document.querySelector('thead');
let originalNameArray = [];
let originalExpArray = [];
let originalBirthArray = [];
let originalBirthArrayforSort = [];
let nameFlag = 0; 
let expFlag = 0;
let birthFlag = 0;
 

window.onload = function(){
    let namesTd = document.querySelectorAll('tbody>tr>td:nth-child(1)');
    let expTd = document.querySelectorAll('tbody>tr>td:nth-child(2)');
    let birthTd = document.querySelectorAll('tbody>tr>td:nth-child(3)');
    let date; 
    
    for (var i = 0; i<namesTd.length; i++){        
        originalNameArray.push(namesTd[i].innerText);
        originalExpArray.push(expTd[i].innerText);

        date = birthTd[i].innerText.split('.');
        originalBirthArrayforSort.push( new Date(date[2], date[1], date[0]) );

        originalBirthArray.push(birthTd[i].innerText);
    }

}

tableHead.addEventListener('click', function(){
    if ( event.target.id === 'header_name' ){
        expFlag = 0;
        birthFlag = 0;
        
        switch(nameFlag){
            case 0 : ascendSort('nam'); break;
            case 1 : descendSort('nam'); break;
            case 2 : originalSort('nam'); break;
        }
    } else if ( event.target.id === 'header_experience' ) {
        nameFlag = 0;
        birthFlag = 0;

        switch(expFlag){
            case 0 : ascendSort('exp'); break;
            case 1 : descendSort('exp'); break;
            case 2 : originalSort('exp'); break;
        }
    } else {
        nameFlag = 0;
        expFlag = 0;

        switch(birthFlag){
            case 0 : ascendSort('bir'); break;
            case 1 : descendSort('bir'); break;
            case 2 : originalSort('bir'); break;
        }
    }

});

function createItem(name, exp, birth){
    var item = document.createElement('tr');
    var itemName = document.createElement('td');
    var itemExp = document.createElement('td');
    var itemBirth = document.createElement('td');
    itemName.innerHTML = name;
    itemExp.innerHTML = exp;
    itemBirth.innerHTML = birth;
    item.appendChild(itemName);
    item.appendChild(itemExp);
    item.appendChild(itemBirth);

    return item;
}

function SORT_NAME_ASC(a,b){
    return ( a > b ) ? 1 : -1; 
}

function SORT_NAME_DESC(a,b){
    return ( a < b ) ? 1 : -1; 
}

function SORT_EXP_ASC(a, b) {
    return a - b;
}

function SORT_EXP_DESC(a, b) {
    return b - a;
 }

function ascendSort(col){
    var newList = document.createElement('tbody');
    var oldList = document.querySelector('tbody');
    var sortArray;

    if ( col === 'nam' ){
        sortArray = originalNameArray.slice();;
        sortArray.sort(SORT_NAME_ASC);
        for ( var i = 0; i<sortArray.length; i++ ){
            newList.appendChild( createItem(sortArray[i], originalExpArray[i], originalBirthArray[i]) );
        }

        nameFlag = 1; 
    } else if ( col === 'exp' ) {
        sortArray = originalExpArray.slice();;
        sortArray.sort(SORT_EXP_ASC);
        for ( var i = 0; i<sortArray.length; i++ ){
            newList.appendChild( createItem(originalNameArray[i], sortArray[i], originalBirthArray[i]) );
        }

        expFlag = 1; 
    } else{
        sortArray = originalBirthArrayforSort.slice();;
        sortArray.sort(SORT_NAME_ASC);
        for ( var i = 0; i<sortArray.length; i++ ){
            newList.appendChild( createItem(originalNameArray[i], originalExpArray[i], sortArray[i].toLocaleString("ru-RU", { day: "numeric", month: "numeric", year: "numeric",})) );
        }

        birthFlag = 1; 
    }   

    return table.replaceChild( newList, oldList );
}


function descendSort(col){
    var newList = document.createElement('tbody');
    var oldList = document.querySelector('tbody');
    var sortArray;

    if ( col === 'nam' ){
        sortArray = originalNameArray.slice();;
        sortArray.sort(SORT_NAME_DESC);
        for ( var i = 0; i<sortArray.length; i++ ){
            newList.appendChild( createItem(sortArray[i], originalExpArray[i], originalBirthArray[i]) );
        }

        nameFlag = 2;
    } else if ( col === 'exp' ) {
        sortArray = originalExpArray.slice();;
        sortArray.sort(SORT_EXP_DESC);
        for ( var i = 0; i<sortArray.length; i++ ){
            newList.appendChild( createItem(originalNameArray[i], sortArray[i], originalBirthArray[i]) );
        }

        expFlag = 2;
    } else{
        sortArray = originalBirthArrayforSort.slice();;
        sortArray.sort(SORT_NAME_DESC);
        for ( var i = 0; i<sortArray.length; i++ ){
            newList.appendChild( createItem(originalNameArray[i], originalExpArray[i], sortArray[i].toLocaleString("ru-RU", { day: "numeric", month: "numeric", year: "numeric",}) ) );
        }

        birthFlag = 2;
    }
    
    return table.replaceChild( newList, oldList );
}

function originalSort(){
    var newList = document.createElement('tbody');
    var oldList = document.querySelector('tbody');

    for ( var i = 0; i<originalNameArray.length; i++ ){
        newList.appendChild( createItem(originalNameArray[i], originalExpArray[i], originalBirthArray[i]) );
    }

    nameFlag = 0; 
    expFlag = 0;
    birthFlag = 0;

    return table.replaceChild( newList, oldList );
}
