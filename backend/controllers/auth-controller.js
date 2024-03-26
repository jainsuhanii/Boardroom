const otpService = require('../services/otp-service');
class AuthController {
    sendOtp(req,res){
        //logic
        const {phone} = req.body;
        if (!phone) {
            res.status(400).json({message: 'Phone number is required'});
        }
        const otp = otpService.generateOtp();

        res.json({otp: otp})

    }
}

module.exports = new AuthController();