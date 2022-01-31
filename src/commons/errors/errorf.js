class Errorf extends Error {
	constructor(message, status) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = message || 'Something went wrong.';
		this.status = status || 500;
		this.code = 0;
	}
}

exports.Errorf = Errorf;

exports.globalErrorHandler = ((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	console.log(err)
	if(process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else {
		let error = { ...err };
		sendErrorProd(error, res);
	}
});

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		message: err.message,
		error: err,
		stack: err.stack
	});
}

const sendErrorProd = (err, res) => {
	if(err.isOperational) {
		res.status(err.statusCode).json({
			message: err.message
		});
	} else {
		res.status(500).json({
			message: 'Something went wrong'
		});
	}
}
