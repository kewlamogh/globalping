function statusFinished(context, next) {
	const continueLooping = context.vars.status !== 'finished';
	// While `continueLooping` is true, the `next` function will
	// continue the loop in the test scenario.
	return next(continueLooping);
}

module.exports = {
	statusFinished,
};
