const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const authHeader = req.header("Authorization");
    
    // Debugging: Log the received Authorization header
    console.log("Received Authorization Header:", authHeader);

    // Check if token is missing or incorrectly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        // Extract token after "Bearer "
        const token = authHeader.split(" ")[1];

        // Debugging: Log the extracted token
        console.log("Extracted Token:", token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        
        // Attach user info to request object
        req.user = decoded;

        // Debugging: Log the decoded user payload
        console.log("Decoded Token Payload:", decoded);

        next(); // Proceed to next middleware or controller
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ error: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
