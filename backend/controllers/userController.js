import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = '24hr';

/* --------------------helpers--------------- */
const emailIsValid = (e) => /\S+@\S+\.\S+/.test(String(e || ""));
const extractCleanPhone = (p) => String(p || "").replace(/\D/g, "");
const mkToken = (payload) => jwt.sign(payload, JWT_SECRET , {expiresIn: TOKEN_EXPIRES_IN});

//REGISTER FUNCTION
export const registerUser = async (req, res) => {
    try {
        const { fullName, username, email, phone, birthDate, password} = req.body || {};

        if(!fullName || !username || !email || !phone || !birthDate || !password) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are required.'
            })
        }

        if(typeof fullName !== 'string' || fullName.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Full name must be atleast 2 characters.'
            })
        }

        if(typeof username !== 'string' || username.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: 'username must be atleast 3 characters.'
            })
        }

        if(!emailIsValid(email)){
            return res.status(400).json({
                success: false,
                message: 'Email is invalid'
            })
        }

        const cleanedPhone = extractCleanPhone(phone);
        if(cleanedPhone.length < 6){
            return res.status(400).json({
                success: false,
                message: 'Phone number seems invalid'
            })
        }

        if(String(password).length < 6){
            return res.status(400).json({
                success: false,
                message: 'Password must be atleast 6 characters long.'
            })
        }

        const parsedBirth = new Date(birthDate);
        if(Number.isNaN(parsedBirth.getTime())){
            return res.status(400).json({
                success: false,
                message: 'Birth date is invalid'
            })
        }

        const existingByEmail = await User.findOne({email: email.toLowerCase().trim() });
        if(existingByEmail) return res.status(400).json({
            success: false,
            message: 'Email is already exists'
        });

        const existingByUsername = await User.findOne({username: username.trim().toLowerCase()});
        if(existingByUsername) return res.status(400).json({
            success: false,
            message: 'Username is already in use.'
        });

        //HASH THE PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName: fullName.trim(),
            username: username.trim(),
            email: email.toLowerCase().trim(),
            phone: phone,
            birthDate: parsedBirth,
            password: hashedPassword
        });

        const token = mkToken({ id: newUser._id});

        const userToReturn = {
            id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            birthDate: newUser.birthDate
        }

        return res.status(201).json({
            success: true,
            message: 'User registered Successfully!',
            token,
            user: userToReturn
        });

    } catch (error) {
        console.error('Register error:', error);
        if(error.code === 11000){
            const dupKey =Object.keys(error.keyValue || {})[0];
            return res.status(400).json({
                success: false,
                message: `${dupKey} already exists.`
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
        
    }
}


//LOGIN FUNCTION
export async function login(req, res) {
    try {
        const {email, password} = req.body || {};

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'All field are required.'
            })
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if(!user) return res.status(401).json({
            success: false,
            message: 'Invalid email and password'
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({
            success: false,
            message: 'Invalid email and password'
        });

        const token = mkToken({id: user._id.toString() });
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        });


    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}