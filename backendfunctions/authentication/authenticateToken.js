const jwt =  require('jsonwebtoken');

var user = {};

const authAccount = (req, res, next) => {

    const account = req.header('authorization').split('Bearer ')[1];

    if(!account) {
        return res.status(403).json({
            msg: 'No token found'
        });
    }

    jwt.verify(account, process.env.secret_token, (err, isToken) => {

        if(err) return res.send(err);

        if(!isToken) return res.status(403).json({
            msg: `Unauthorized access`,
            success: false
        });

        user.email = isToken.email;

        next();
    });

};

module.exports = {
    authAccount, user
};
