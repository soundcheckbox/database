var pDoWhilst$1 = {exports: {}};

const pDoWhilst = async (action, condition) => {
	const actionResult = await action();

	if (condition(actionResult)) {
		return pDoWhilst(action, condition);
	}
};

pDoWhilst$1.exports = pDoWhilst;
// TODO: Remove this for the next major release
pDoWhilst$1.exports.default = pDoWhilst;

var exports = pDoWhilst$1.exports;
export { exports as default };
