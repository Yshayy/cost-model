import axios from 'axios';

class AllocationService {
  BASE_URL = 'http://cost.localtest.me:8090/allocation';

  async fetchAllocation(win, aggregate, options) {
    const { accumulate, filters, } = options;
    const params = {
      window: win,
      aggregate: aggregate,
      step: '1d',
    };
    if (typeof accumulate === 'boolean') {
      params.accumulate = accumulate;
    }
    const result = await axios.get(`${this.BASE_URL}/compute`, { params });
    return result.data;
  }
}

export default new AllocationService();
