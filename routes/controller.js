const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');



const signUp = (req, res) => {

    if (!req.body.email) {
        return res.status(401).json({ message: 'No email provided' });
    }

    if (!req.body.password) {
        return res.status(401).json({ message: 'No username provided' });
    }

    const email = req.body.email;
    const password = req.body.password;

    const hash = bcrypt.hashSync(password, salt);

    User.init()
        .then(async () => {
            const result = await User.create({
                email,
                password: hash
            })

            const token = jwt.sign({
                data: {
                    email,
                    uuid: result.id
                }
            }, 'authenticateuser');

            res.cookie('token', token).json({
                email,
                token,
                message: 'User Created',
                createdAt: result.created_at,
                updatedAt: result.updatedAt,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'User already exist, try a different user',
                ...error
            })
        });


};

const signIn = async (req, res) => {

    try {
        if (!req.body.email) {
            return res.status(401).json({ message: 'No Email provided' });
        }

        if (!req.body.password) {
            return res.status(401).json({ message: 'No password provided' });
        }
        const { email, password } = req.body;
        const result = await User.findOne({ email });
        const isPasswordValid = bcrypt.compareSync(password, result.password);

        // No User found
        if (!result) {
            return res.status(401).json({ message: 'No user found!' });
        }

        // Check password
        if (isPasswordValid) {
            const token = jwt.sign({
                data: {
                    email,
                    uuid: result.id
                }
            }, 'authenticateuser');

            return res.cookie('token', token).json({
                email,
                token,
                uuid: result._id,
                createdAt: result.created_at,
                updatedAt: result.updatedAt
            });
        }

        // Password doesn't not match
        res.status(401).json({
            message: 'Password or email is wrong'
        });

    } catch (error) {
        res.status(500).json({
            message: 'No user found!'
        });
    }
};


const home = (req, res) => {
    res.json({
        message: 'Welcome to my Page'
    });
};


const findUserProfileByIdAndEmail = (req, res) => {
    const id = req.id;
    const email = req.email;

    User.findOne({
        _id: id,
        email
    })
        .select('-password')
        .then((user) => {
            res.json({ user });
        })
        .catch((err) => {
            res.status(500).json({
                message: 'No user found',
                err
            });
        })
};



const save = (req, res) => {

    let obj = {};
    const id = req.id;
    const keyValidations = ['location', 'username', 'bio', 'portfolio'];

    for (let key in req.body) {
        if (keyValidations.includes(key)) {
            obj[key] = req.body[key]
        }
    }

    User.findOneAndUpdate({ _id: id }, obj, (err, docs) => {
        if (!err) {
            return res.json({ message: 'Data successfully saved!' });
        }
        return res.status(500).json({
            message: 'Internal Error'
        });
    })
}


module.exports = {
    signUp,
    signIn,
    home,
    findUserProfileByIdAndEmail,
    save
};