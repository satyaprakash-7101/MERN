const express = require('express');

const router = express.Router();

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const { check , validationResult } = require('express-validator');

const User = require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   public
router.post('/' , [
    check('name' , 'Name is required')
        .not()
        .isEmpty() ,

    check('email' , 'please include a valid email')
        .isEmail() ,

    check('password' , 'please enter a password wit 6 or more characters')
        .isLength( { min: 6 } )
    ] , 
    async (req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const {name, email, password} = req.body;

    try{
         //see if user exists
         let user = await User.findOne({ email });
         if (user) {
             res.status(400).json({errors: [{msg: 'user already exist'}] });
         }

        //get users gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r: 'pg',
            d:'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Encrypt password

        //return json webtoken

        res.send('user registered');

    } catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }

   
    }
    );

module.exports = router;