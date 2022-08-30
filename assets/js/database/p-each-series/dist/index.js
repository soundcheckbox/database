var pEachSeries$1 = {exports: {}};

const pEachSeries = async (iterable, iterator) => {
	let index = 0;

	for (const value of iterable) {
		// eslint-disable-next-line no-await-in-loop
		const returnValue = await iterator(await value, index++);

		if (returnValue === pEachSeries.stop) {
			break;
		}
	}

	return iterable;
};

pEachSeries.stop = Symbol('pEachSeries.stop');

pEachSeries$1.exports = pEachSeries;
// TODO: Remove this for the next major release
pEachSeries$1.exports.default = pEachSeries;

var exports = pEachSeries$1.exports;
export { exports as default };
