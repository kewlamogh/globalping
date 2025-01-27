module.exports = {
	redis: {
		socket: {
			tls: false,
		},
	},
	admin: {
		key: 'admin',
	},
	ws: {
		fetchSocketsCacheTTL: 0,
	},
	measurement: {
		maxInProgressProbes: 2,
	},
};
