class Queue {
    constructor(config = {}) {
        this.running = false;
        this.jobs = [];
        this.callbacks = [];
        this.maxCallbacksLength = config.maxCallbacksLength || 1;
    }

    async run() {
        if (!this.running) {
            this.running = true;

            while (this.jobs.length > 0) {
                for (let i in this.callbacks) {
                    await this.callbacks[i](...this.jobs[0]);
                }

                this.jobs.shift();
            }

            this.running = false;
        }
    }

    createJob(...data) {
        this.jobs.push(data);
        this.run();
    }

    process(callback) {
        if (this.callbacks.length < this.maxCallbacksLength) {
            this.callbacks.push(callback);
        }
    }
}

module.exports = Queue;