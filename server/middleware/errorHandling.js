// Middleware error handler
const errorHandler = (err, req, res, next) => {
    // console.error(err.stack)
    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
            message: "Email already exists",
        });

    } else if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
            message: err.errors.map((e) => e.message),
        });

    } else if (err.name === "Unauthorizated") {
        return res.status(401).json({ message: "Unauthorized" });

    } else if (err.name === "required") {
        return res.status(400).json({
            message: "Email and password are required",
        });

    } else if (err.name === "invalid") {
        return res.status(400).json({
            message: "Invalid email or password",
        });

    } else if (err.name === "error not found") {
        return res.status(404).json({
            message: "Error not found",
        });

    } else if (err.name === "Invalid Token") {
        return res.status(401).json({
            message: "Invalid Token",
        });

    } else if (err.name === "validation error") {
        return res.status(401).json({
            message: "validation error",
        });

    } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            message: "Unauthenticated",
        });

    } else if (err.name === "Invalid Token") {
        return res.status(401).json({
            message: "Unauthenticated",
        });

    } else if (err.name === "Price must be greater than 1000") {
        return res.status(401).json({
            message: "Price must be greater than 1000",
        });
    } else {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
    }

    if (err.message === "Unexpected end of form") {
        return res.status(400).json({
            message: "validation error",
        });
    }

};

module.exports = errorHandler;