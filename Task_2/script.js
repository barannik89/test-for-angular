'use strict'

var input = document.getElementById('text_input');
var text = document.getElementById('text');

//adding listener to input that will copy user's text to lower block
input.addEventListener('keyup',  function() {
    text.innerHTML = replaceWord(this.value);
})


//creating fuction that will replace words with one that have color
function replaceWord(data){
    var words = ['але або','або але','але','або'];
    for(var i=0; i<words.length; i++){
        data = data.replace(new RegExp('('+words[i]+')', 'gm'), '{['+i+']}');
    }

    for(var j=0; j<words.length; j++){
        var patern = "{["+j+"]}";
        do {
            data = data.replace(patern, colorWord(words[j]));
        }
        while (data.indexOf(patern) >= 0);
    }

    return data;
}

//creating function that will add color to words we defined
function colorWord(word) {
    var color = '';
    switch(word){
        case "але": color = '#FF0000'; break;
        case "або": color = '#3914AF'; break;
        case 'але або': color = '#00CC00'; break;
        case 'або але': color = '#BF5E30'; break;
        default: color = '#000'; break;
    }
    return '<span style="color:' + color + ';">' + word + '</span>';
}
