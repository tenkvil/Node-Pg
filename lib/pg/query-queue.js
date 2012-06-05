


/**
 * @constructor
 */
pg.QueryQueue = function() {
	/**
	 * @private
	 * @type {!pg.Query}
	 */
	this.__origin = new pg.Query('');

	this.__origin.prev = this.__origin;
	this.__origin.next = this.__origin;
};


/**
 * @param {!pg.Query} query
 */
pg.QueryQueue.prototype.push = function(query) {
	var tail = this.__origin.next;

	tail.prev = query;
	query.next = tail;

	this.__origin.next = query;
	query.prev = this.__origin;
};


/**
 * @return {pg.Query}
 */
pg.QueryQueue.prototype.shift = function() {
	if (this.__origin.prev !== this.__origin) {
		var head = this.__origin.prev;

		head.prev.next = this.__origin;
		this.__origin.prev = head.prev;

		head.next = null;
		head.prev = null;

		return head;
	}

	return null;
};