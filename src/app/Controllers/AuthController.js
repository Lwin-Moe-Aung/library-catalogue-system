const bcrypt = require( "bcryptjs");
const jwt = require( "jsonwebtoken");

require('dotenv').config();

const { DataBaseModelNames } = require('../../database/const');
const Admin = require('../Models')[DataBaseModelNames.ADMIN];

const logIn = (req, res) => {
    console.log(req.body);
    // return;
    Admin.findOne({ where: { email: req.body.email } })
        .then( admin => {
            if(admin == null)  return res.status(404).json({
                "isSuccess": false,
                "message": "Admin not found"
            });

            const isPasswordCorrect = bcrypt.compareSync( req.body.password , admin.password);

            if (!isPasswordCorrect) return res.status(400).json({
                "isSuccess": false,
                "message": "Wrong password"
            });

            // correct password
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "id": admin.id,
                        "name": admin.name,
                        "email": admin.email,
                        "role": admin.role
                    }
                }, 
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
        
            const refreshToken = jwt.sign(
                { "email": admin.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'}
            );
            
            admin.update({
                refreshToken: refreshToken
            }).then( data =>{
                console.log("refresh token updated" + data)
            }).catch(error =>{
                console.log(error);
            });
            //for web
            //Creates Secure Cookie with refresh token
            res
                .cookie('jwt', refreshToken, { 
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'None', 
                    maxAge: 24 * 60 * 60 * 1000
            });
            const { password, ...data } = admin.dataValues;
        
            return res.status(200)
                .json({data, accessToken});
        })
        .catch( error => {
            return res.status(500).json(error);
        });
}

const logOut = async (req, res) => {
    // on client, also delete the accessToken
    // const cookies = req.cookies;
    const refreshToken = req.body.refresh_token;
    //Is refreshToken in db?
    Admin.findOne({ where: { refreshToken: refreshToken } })
    .then(admin => {
        if(admin == null ) res.status(404).json("Admin not found!");
        Admin.update({
            refreshToken: null
        }).catch(error =>{
            console.log(error);
        });
    })
    .catch( error => {
        console.log(error);
    });
    //for web
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    
    res.status(400).json({
        "isSuccess": true,
        "message": "Logout Successfully"
    });
    
}

module.exports = { logIn, logOut }