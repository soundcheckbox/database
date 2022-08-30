import require$$0 from '../../p-reduce/dist/index.js';

const pReduce = require$$0;

var pMapSeries = (iterable, iterator) => {
	const ret = [];

	return pReduce(iterable, (a, b, i) => {
		return Promise.resolve(iterator(b, i)).then(val => {
			ret.push(val);
		});
	}).then(() => ret);
};

export { pMapSeries as default };
