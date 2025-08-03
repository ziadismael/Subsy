import aj from '../config/arcjet.js'

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error : "Rate Limit Exceeded" });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ error : "Bot detected" });
            }

            return res.status(403).json({ error : "Access Denied" });
        }

        next();
    }
    catch(err) {
        console.log("Arcjet middleware error: ", err);
        next(err);
    }
}

export default arcjetMiddleware;