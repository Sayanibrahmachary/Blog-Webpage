const asyncHandler = (fun) => async (req, res, next) => {
    try {
        await fun(req, res, next);
    } catch (error) {
        const statusCode = (typeof error.code === 'number' && error.code >= 100 && error.code < 600)
            ? error.code
            : 500;

        res.status(statusCode).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};

export { asyncHandler };
