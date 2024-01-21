const verifyIsAdmin = () => {
    return (req, res, next) => {
        console.log(req.role);
        if (req?.role !== 'admin') return res.sendStatus(401);
        next();
    }
}

module.exports = verifyIsAdmin