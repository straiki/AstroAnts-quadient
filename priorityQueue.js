class PriorityQueue {
	constructor() {
		this.list = [];
		this.length = 0;
		this.minPriority = 1 / 0;
	}

	static getItem() {
		return {data: null, priority: 1 / 0};
	}

	push(item, priority) {
		let obj = PriorityQueue.getItem();

		obj.data = item;
		obj.priority = priority;
		this.list.push(obj);
		this.length++;
		if (priority < this.minPriority) {
			this.minPriority = priority;
		} else {
			this.list.sort((a, b) => b.priority - a.priority)
		}
	}

	pop() {
		this.length--;
		this.minPriority = this.length > 0 ? this.list[this.length - 1].priority : 1 / 0;
		return this.list.pop().data;
	}
}

module.exports = new PriorityQueue();
