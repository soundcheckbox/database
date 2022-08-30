import require$$0 from '../../get-intrinsic/dist/index.js';

var GetIntrinsic = require$$0;

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

var getOwnPropertyDescriptor = $gOPD;

export { getOwnPropertyDescriptor as default };
