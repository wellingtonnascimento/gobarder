import Bee from 'bee-queue';
import CancellationMall from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMall];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed').process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queoe ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
