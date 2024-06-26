require('dotenv').config()
const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const { where } = require('sequelize');
const axios = require('axios');
const { response } = require('../app');


class userController {

    static async loginUser(req, res, next) {
        try {
            let { email, password } = req.body;
            console.log('Login User:', req.body);

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
            // res.send(error)
            next(error)
        }
    }

    static async registerUser(req, res, next) {
        try {
            let { fullName, email, password, phoneNumber } = req.body

            // if (!fullName || !email || !password || !phoneNumber) throw {name: 'required'}

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
                audience: process.env.FACEBOOK_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            const { email, name } = payload;
            // console.log(email);

            const [user, created] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    fullName: name,
                    email,
                    password: `password${name}`
                }
            });

            const token = createToken({
                email: user.email,
            });
            console.log(token);
            res.status(200).json({ token });

        } catch (error) {
            console.log(error);
            // res.send(error)
            next(error);
        }
    }

    static async githubLogin(req, res, next) {
        try {
            res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`);
        } catch (error) {
            console.log(error);
            // res.send(error)
            next(error)
        }
    }

    static async githubLoginCallback(req, res, next) {
        const { code } = req.query;
        try {
            // Mendapatkan token akses dari GitHub
            const accessTokenRes = await axios.post(
                "https://github.com/login/oauth/access_token",
                {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: code,
                    redirect_uri: process.env.GITHUB_REDIRECT_URI,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const { access_token } = accessTokenRes.data;

            // Menggunakan token akses untuk mengambil data pengguna dari GitHub API
            const [getEmailRes, getProfileRes] = await Promise.all([
                axios.get("https://api.github.com/user", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }),
                axios.get("https://api.github.com/user/emails", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }),
            ]);

            const userData = getEmailRes.data;
            const emailData = getProfileRes.data.find(
                (email) => email.primary === true && email.verified === true
            );

            // console.log(userData, emailData);
            const { login: fullName } = userData;
            const { email: email } = emailData;

            console.log('User Login:', fullName);
            console.log('User Email:', email);

            const [user, created] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    fullName,
                    email,
                    password: `password${fullName}`
                }
            });

            const token = createToken({
                email: user.email,
            });
            // console.log(token);
            res.status(200).json({ token });

        } catch (error) {
            console.log("Error:", error);
            next(error)
        }
    }

    // ...

    static async RedirectDataGithub(req, res, next) {
        const code = req.query.code;

        try {
            // Mendapatkan token akses dari GitHub
            const response = await axios.post(
                GITHUB_TOKEN_URL,
                {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: code,
                    redirect_uri: REDIRECT_URI,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const accessToken = response.data.access_token;

            // Menggunakan token akses untuk mengambil data pengguna dari GitHub API
            const userData = await axios.get("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Mengirim data pengguna ke frontend atau melakukan apa yang diperlukan
            res.json(userData.data);
        } catch (error) {
            console.error("Error:", error.response.data);
            res.status(500).json({ message: "Internal Server Error" });
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

