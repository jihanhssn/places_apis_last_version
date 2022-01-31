const { Errorf } = require('./errorf');

class ServerException extends Errorf {
	constructor(message) {
		super(message || 'Server error', 500);
	}
}

class InvalidInputException extends Errorf {
	constructor(message) {
		super(message || 'Invalid input', 400);
	}
}

class UnauthorizedException extends Errorf {
	constructor(message) {
		super(message || 'Unauthorized', 401);
	}
}

class NotFoundException extends Errorf {
	constructor(message) {
		super(message || 'Not found', 404);
	}
}

class InvalidMobileNumberException extends Errorf {
	constructor(message) {
		super(message || 'Invalid mobile', 400);
	}
}

class InvalidUserIdException extends Errorf {
	constructor(message) {
		super(message || 'Invalid user id', 400);
	}
}

class InvalidDeviceIdException extends Errorf {
	constructor(message) {
		super(message || 'device not registered, contact support', 403);
	}
}

class BlockedUserException extends Errorf {
	constructor(message) {
		super(message || 'Account is blocked', 403);
	}
}

class S3IntegrationException extends Errorf {
	constructor(message) {
		
		super(message || 'cannot upload images to s3', 500);
	}
}

class SystemClosedException extends Errorf {
	constructor(message) {
		super(message || 'System is closed', 403);
	}
}

class SystemIntegrationException extends Errorf {
	constructor(message) {
		super(message || 'External integration failed', 500);
	}
}

module.exports = {
	ServerException: ServerException,
	InvalidInputException: InvalidInputException,
	UnauthorizedException: UnauthorizedException,
	NotFoundException: NotFoundException,
	InvalidMobileNumberException: InvalidMobileNumberException,
	InvalidUserIdException: InvalidUserIdException,
	InvalidDeviceIdException: InvalidDeviceIdException,
	BlockedUserException: BlockedUserException,
	S3IntegrationException: S3IntegrationException,
	SystemClosedException: SystemClosedException,
	SystemIntegrationException: SystemIntegrationException,
};
