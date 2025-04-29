const User = require('../models/User.js');

// @desc     Register user
// @route    POST /api/v1/auth/register
// @access   Public
exports.register = async (req, res, next) => {
    // res.status(200).json({
    //     success: true
    // });
    try{
        
        const {name,username, email, password, role, tel} = req.body;
        
        // Create User
        const user = await User.create({
            name,
            username,
            email,
            password,
            role,
            tel
        });

        // Create token

        // const token = user.getSignedJwtToken();
        // res.status(200).json({success: true, token});
        sendTokenResponse(user, 200, res);
    } catch(err) {
        res.status(400).json({success: false});
        console.log(err.stack)
    }
};


// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public
exports.login = async (req, res, next) => {
    try{
        const {identifier, password} = req.body;

        // Validate email & password
        if(!identifier || !password){
            return res.status(400).json({success: false,
                msg: 'Please provide an email and password'
            });
        }

        // Check for user
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        }).select('+password');

        if(!user){
            return res.status(400).json({success: false,
                msg: 'Invalid credentials'
            });
        }    

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({success: false,
                msg: 'Invalid credentials'
            });
        }

        // Create token
        // const token = user.getSignedJwtToken();
        // res.status(200).json({success: true, token});
        sendTokenResponse(user, 200, res);
    } catch(err){
        return res.status(401).json({success: false, msg: 'Cannot convert email or password to string'});
    }
}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV==='production'){
        options.secure=true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
}

// At the end of file
// @desc     Get current Logged in user
// @route    POST /api/v1/auth/me
// @access   Private
exports.getMe = async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
};

// @desc     Log user out / clear cookie
// @route    GET /api/v1/auth/logout
// @access   Private
exports.logout = async(req, res, next) => {
    res.cookie('token', 'none',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};

// @desc     Update user profile
// @route    PUT /api/v1/auth/updateProfile
// @access   Private
exports.updateProfile = async (req, res, next) => {
    const { name,username, tel, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
    if (name) user.name = name;
    if (tel) user.tel = tel;
    if (username) user.username = username;
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    try {
        await user.save();

        res.status(200).json({
            success: true,
            data: {
                name: user.name,
                username: user.username,
                tel: user.tel,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error. Could not update profile.'
        });
    }
};