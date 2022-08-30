import require$$0 from '../../errno/dist/index.js';

const createError = require$$0.create;
const LevelUPError = createError('LevelUPError');
const NotFoundError = createError('NotFoundError', LevelUPError);

NotFoundError.prototype.notFound = true;
NotFoundError.prototype.status = 404;

var errors = {
  LevelUPError: LevelUPError,
  InitializationError: createError('InitializationError', LevelUPError),
  OpenError: createError('OpenError', LevelUPError),
  ReadError: createError('ReadError', LevelUPError),
  WriteError: createError('WriteError', LevelUPError),
  NotFoundError: NotFoundError,
  EncodingError: createError('EncodingError', LevelUPError)
};

export { errors as default };
