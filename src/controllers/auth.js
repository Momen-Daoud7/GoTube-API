const crypto = require('crypto')
const {Op} = require('sequelize');
const jwt  = require('jsonwebtoken')
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const userServices = require('../services/user.services');
const User = require('../models/1-user');


//@desc		Register user
//@route	POST /api/v1/auth/register
//@access	Public
exports.register = asyncHandler( async(req,res,next) => {
	// Genreate a confirmationCode
	const token = jwt.sign({email:req.body.email},"foenfoneofnoenfoeneonfoweneo")
	req.body.confirmationCode = token;
	const user = await userServices.store(req.body);

	// Create confirmation Url
	const url = `${req.protocol}://${req.get('host')}/api/v1/auth/confirm/${token}`;
	const message = `Thank you for regsiter please confrim your email <a href=${url}>confrim</a>`;

	// send an email
	try {
		await sendEmail({
			email:user.email,
			subject: "Email confirmation",
			message
		});
	}catch(error) {
		console.log(error)
		await user.delete(user.id);

	    return res.status(500).json({
	    	success:false,
	    	msg:'email not sent'
	    })
	}

	sendTokenResponse(user,200,res)
})

//@desc		Login user
//@route	POST /api/v1/auth/login
//@access	Public
exports.login = asyncHandler(async (req,res,next) => {
	const user = await User.findOne({where:{email:req.body.email}});

	// if user does'nt exits
	if(!user) {
		return res.status(404).json({ success:false, message:"Email does'nt exists" });
	}

	// Check for the password
	const matchedPassword = await user.matchPassword(req.body.password);

	if(!matchedPassword) {
		return res.status(401).json({ success:false, message:"Wrong password" });
	}

	sendTokenResponse(user,200,res)

});

//@desc		Logout user
//@route	POST /api/v1/auth/logout
//@access	Private
exports.logout = asyncHandler( async (req,res) => {
	res.cookie('token', 'none', {
	    expires: new Date(Date.now() + 10 * 1000),
	    httpOnly: true
  	});

	res.status(200).json({
	    success: true,
	    data: {}
	});
})

//@desc		Confirm user email
//@route	POST /api/v1/auth/confirm/:token
//@access	Private
exports.confirmEmail = asyncHandler( async (req,res) => {
	const user = await User.findOne({where:{confirmationCode:req.params.token}});

	if(!user) {
		return res.status(404).json({ success:false, message:"User not found"});	
	}
	console.log(user)
	await user.update({status:'Active',confirmationCode:''})

	res.status(200).json({success:true,msg: "Your account is active now"})

})

//@desc		User froget his password
//@route	POST /api/v1/auth/forget-password
//@access	Public
exports.forgotPassword = asyncHandler(async(req,res,next) => {
	// find a user by email
	const user = await User.findOne({where:{email:req.body.email}});

	// Check if there's a user with that email or not
	if(!user) {
		return res.status(404).json({
			sucess:false,
			msg: 'User not found with this email',
		})
	}

	// Get reset token
	const resetToken = await user.getResetPasswordToken();

	await user.save();

// Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetPassword/${resetToken}`;
   console.log(resetToken)

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    await user.update({ resetPasswordToken: '', resetPasswordExpire:'' });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);

    await user.update({
    	resetPasswordToken: '',
    	resetPasswordExpire:''
    });

    return res.status(500).json({
    	success:false,
    	msg:'email not sent'
    })
  }

	res.status(200).json({success:true,data:user});
});


//@desc		Reset token
//@route	POST /api/v1/auth/resetToken/:resetToken
//@access	Public
exports.resetPassword = asyncHandler(async (req,res,next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex');
	    console.log(resetPasswordToken)
	const user = await User.findOne({
		where: {
		  	resetPasswordToken:resetPasswordToken,
		  	resetPasswordExpire: {
		  		[Op.gt] : Date.now()
		  	}
		}
	})

	if (!user) {
		return res.status(404).json({
			sucess:false,
			msg: 'User not found with this email',
		})
	}

	// Set new password
	const salt = await bcrypt.genSalt(10);
	req.body.password = await bcrypt.hash(req.body.password,salt);
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
	
})

//@desc		User profile
//@route	POST /api/v1/auth/profile
//@access	Private
exports.profile = asyncHandler(async (req,res,next) => {
	const user = await userServices.getUser(req.user.id);
	res.status(200).json({success:true,data:user});
})

// Get token from model,create cookie and send ErrorResponse
const sendTokenResponse = (user,statusCode,res) => {
	// create a token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(Date.now() + 30 * 24 * 60 *60 * 1000),
		httpOnly:true
	}

	if(process.env.NODE_ENV='production') {
		options.secure = true
	}

	res.status(statusCode)
		.cookie('token', token,options)
		.json({success:true,token})
}