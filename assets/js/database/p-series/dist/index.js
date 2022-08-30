import require$$0 from '../../p-reduce/dist/index.js';
import require$$1 from '../../@sindresorhus/dist/index.js';

const pReduce = require$$0;
const is = require$$1;

var pSeries = iterable => {
	const ret = [];

	for (const task of iterable) {
		const type = is(task);

		if (type !== 'Function') {
			return Promise.reject(new TypeError(`Expected task to be a \`Function\`, received \`${type}\``));
		}
	}

	return pReduce(iterable, (_, fn) => {
		return Promise.resolve().then(fn).then(val => {
			ret.push(val);
		});
	}).then(() => ret);
};

export { pSeries as default };
