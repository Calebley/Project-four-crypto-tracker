const isAuth = (req, res, next) => {
    console.log(req.session.user)
    if (req.session.user) {
        next()
    }
}

module.exports = isAuth