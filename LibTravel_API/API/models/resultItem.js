
var method = resultItem.prototype;

function resultItem() {
    //this._age = age;
    this._result = ""
}

method.addResult = function (result) {
    this._result+=result
};

method.getResultItem = function (){

    return JSON.parse(this._result.replace(/}{/g, ","))
}

method.clearItem = function(){
    this._result = ""
}



module.exports = resultItem;