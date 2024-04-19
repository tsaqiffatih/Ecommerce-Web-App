const { User } = require('../models');
const { verifyToken } = require('../helper/jwt');


module.exports = {
    authentication: async (req, res, next) => {
        try {
            let access = req.headers.authorization;


            if (!access) throw { name: "Invalid Token" };
            let [bearer, token] = access.split(" ");

            if (bearer !== "Bearer" || !token) throw { name: "Invalid Token" };

            let verify = verifyToken(token);
            // console.log("<<<<<<<");

            if (!verify || !verify.email) throw { name: "Invalid Token" };


            let user = await User.findOne({ where: { email: verify.email } });

            if (!user) throw { name: "Invalid Token" };

            req.user = {
                id: user.id,
                email: user.email
            };

            next();
            // console.log(verify.email);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}