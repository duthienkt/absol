/**
 * items array can be modified without reindexing
 * @param {Array} items
 * @param {string=} key
 * @constructor
 */
function QuickIndexedArrayHolder(items, key) {
    Object.defineProperty(this, "_items", {
        value: items || [],
        writable: true,
        configurable: true,
        enumerable: false
    });
    if (key) {
        this.key = key;
    }
    this.dict = {};
    this.reindex();
}

Object.defineProperty(QuickIndexedArrayHolder.prototype, "items", {
    get: function() {
        return this._items;
    },
    set: function(items) {
        this._items = items;
        this.reindex();
    },
    configurable: true,
    enumerable: true
});

QuickIndexedArrayHolder.prototype.key = 'id';

QuickIndexedArrayHolder.prototype.reindex = function () {
    this.dict = {};
    for (var i = 0; i < this.items.length; i++) {
        this.dict[this.items[i][this.key]] = i;
    }
    return this.dict;
}

QuickIndexedArrayHolder.prototype.getIndex = function (id) {
    var index = this.dict[id];
    var item;
    if (index !== undefined) {
        item = this.items[index];
        if (!item || (item[this.key] + '' !== id + '')) {
            this.reindex();
            index = this.dict[id];
        }
        return index;
    }
    else {
        this.reindex();
    }
    index = this.dict[id];
    if (index === undefined) index = -1;
    return index;
};

QuickIndexedArrayHolder.prototype.getItem = function (id) {
    var index = this.getIndex(id);
    if (index >= 0) {
        return this.items[index];
    }
    else {
        return null;
    }
};

/**
 * Note: make sure it call after reindex()
 * @param {{id: number}} item
 */
QuickIndexedArrayHolder.prototype.qckAddItem = function (item) {
    var id = item[this.key];
    var idx = this.dict[id];
    if (idx === undefined) {
        idx = this._items.length;
        this._items.push(item);
        this.dict[id] = idx;
    }
    else {
        this._items[idx] = item;
    }
};

/**
 * Note: make sure it call after reindex()
 * @param {*} id
 * @returns
 */
QuickIndexedArrayHolder.prototype.qckContains = function (id) {
    return this.dict[id] !== undefined;
};

export default QuickIndexedArrayHolder;