var method = resultItem.prototype;

function resultItem() {              //constructor
    this._result = ""
}

method.addResult = function (result) {
    this._result += result
};

method.getResultItem = function () {

    return this._result
}

module.exports = resultItem;