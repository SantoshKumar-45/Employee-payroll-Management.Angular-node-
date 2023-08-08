function Auth(req, res, next) {
    try {
        if (!req._User)
            throw new Error('Access Denied.!');
        next();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports = Auth;