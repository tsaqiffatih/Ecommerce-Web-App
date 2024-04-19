const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const { where } = require('sequelize');
const clientId = process.env.CLIENT_ID

class userController {

    static async loginUser(req, res, next) {
        try {
            let { email, password } = req.body;

            if (!email || !password) throw { name: "required" };

            let user = await User.findOne({ where: { email } });
            // console.log(user.role)
            if (!user) throw { name: "invalid" };

            const isValidPassword = comparePassword(password, user.password);

            if (!isValidPassword) throw { name: "invalid" };

            let token = createToken({
                email: user.email,
            });

            res.status(200).json({
                user_token: token,
            });

        } catch (error) {
            console.log(error);
            res.send(error)
            next(error)
        }
    }

    static async registerUser(req, res, next) {
        try {
            let { fullName, email, password, phoneNumber } = req.body

            let user = await User.create({ fullName, email, password, phoneNumber })


            let emailNotif = user.dataValues.email;

            res.status(201).json({ message: `new user with email ${emailNotif} created` });
        } catch (error) {
            console.log(error);
            // res.send(error)
            next(error)
        }
    }

    static async loginUserWithGoogle(req, res, next) {
        try {
            const { google_token } = req.headers;
            // console.log(req.headers);
            
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: clientId,
            });
            const payload = ticket.getPayload();

            const { email, name } = payload;
            // console.log(email);

            const [ user, created ] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    fullName: name,
                    email,
                    password: `password${name}`
                }
            });

            // console.log(created);
            // console.log(user);
            const token = createToken({
                email: user.email,
            });

            res.status(200).json({ token });

        } catch (error) {
            console.log(error);
            res.send(error)
            next(error);
        }
    }


    // Get all users
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a single user by ID
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update a user by ID
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { fullName, email, password, phoneNumber } = req.body

            const updated = await User.update(req.body, {
                where: { id }
            });
            if (updated) {
                const updatedUser = await User.findByPk(id);
                return res.status(200).json(updatedUser);
            }
            throw new Error('User not found');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a user by ID
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({
                where: { id }
            });
            if (deleted) {
                return res.status(204).send();
            }
            throw new Error('User not found');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController

