/**
 * Created by Lynn on 2016/9/29.
 */

module.exports =  PokerShuffle;


function PokerShuffle() {
    //spade heart club diamond
    this.pokerArray = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 'st', 'sj', 'sq', 'sk', 'sa'
            , 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'ht', 'hj', 'hq', 'hk', 'ha'
            , 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ct', 'cj', 'cq', 'ck', 'ca'
            , 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'dt', 'dj', 'dq', 'dk', 'da'];
}

PokerShuffle.prototype.resetPoker =  function (){
    this.pokerArray = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','st','sj','sq','sk','sa'
                     ,'h1','h2','h3','h4','h5','h6','h7','h8','h9','ht','hj','hq','hk','ha'
                     ,'c1','c2','c3','c4','c5','c6','c7','c8','c9','ct','cj','cq','ck','ca'
                     ,'d1','d2','d3','d4','d5','d6','d7','d8','d9','dt','dj','dq','dk','da'];
};

PokerShuffle.prototype.shufflePoker = function(){
    for (var index=0; index<this.pokerArray.length; index++){
        var under   = index;
        var over    = this.pokerArray.length-1;

        var rpIndex = random(under, over);
        var value   = this.pokerArray[index];
        this.pokerArray[index] = this.pokerArray[rpIndex];
        this.pokerArray[rpIndex] = value;
    }

    return this.pokerArray;
};

function random(n, m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}