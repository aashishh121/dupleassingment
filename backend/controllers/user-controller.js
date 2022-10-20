const User = require('../model/User');
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const jwt = require('jsonwebtoken');
// const JWT_SECRET_KEY = "MyKey";
const signup = async (req,resp,next)=>{
    const {name, email, password, cpassword } = req.body;

    if(!name || !email || !password || !cpassword){
        return resp.status(422).json({error: "Incorrect Input Field"});
    }

    if(password !== cpassword){
        return resp.status(422).json({error: "Password is not Mathing"});
    }

    try{
       let existingUser = await User.findOne({email: email});

       if(existingUser){
            return resp.status(400).json({message:"User Already Exisits"})
        }

        const hashedPassword = bcrypt.hashSync(password,saltRounds);
        const hashedCpassword = bcrypt.hashSync(cpassword,saltRounds)

        const user = new User({
            name:name,
            email:email,
            password:hashedPassword,
            cpassword:hashedCpassword
        });

        const userRegister = await user.save();

        if(userRegister){
            resp.status(201).json({message:user})
        }

    } catch (err){
        console.log(err);
    }
    // catch (err){
    //     console.log(err)
    // }

    // try{
        
    // } catch (err){
    //     console.log(err);
    // }

    // return resp.status(201).json({message:user});
}

const login = async (req,resp,next)=>{
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email:email});
    } catch (err){
        console.log(err);
    }

    if(!existingUser){
        return resp.status(400).json({message:"Invalid Input"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return resp.status(400).json({message:"Inavalid Email / Password"})
    }

    // const token = jwt.sign({id: existingUser._id}, JWT_SECRET_KEY,{
    //     expiresIn: "35s"
    // });

    // resp.cookie(String(existingUser._id),token,{
    //     path: '/',
    //     expires: new Date(Date.now() + 1000 * 30),
    //     httpOnly:true,
    //     sameSite:'lax',
    // })
    return resp.status(200).json({existingUser})
}

// const verifyToken = (req,resp,next) =>{
//     const cookies = req.header.cookie;
//     const token = cookies.split("=")[1]
//     console.log(token);
//     // const headers = req.headers[`authorization`];
//     // const token = headers.split(" ")[1];
//     if(!token){
//         resp.status(404).json({message:"No Token FOund"});
//     }

//     jwt.verify(String(token), JWT_SECRET_KEY, (err,user) =>{
//         if(err){
//             return resp.status(400).json({message:"Invalid Token"});
//         }
//         console.log(user.id);
//         req.id = user.id;
//     } )
//     next();
// };

// const getUser = async (req, resp, next) => {
//     const userId = req.id;
//     let user;
//     try{
//         user = await User.findById(userId,"-password");
//     }catch (err) {
//         return new Error(err)
//     }

//     if(!user){
//         return resp.status(404).json({message:"User Not Found"});
//     }

//     return resp.status(200).json({user})
// }


// const refreshToken = () =>{
//     const cookies = req.headers.cookie;
//     const prevToken = cookies.split("=")[1];
//     if(!prevToken){
//         return resp.status(400).json({message:"Not found Token"})
//     }
//     jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
//         if(err){
//             console.log(err);
//             return resp.status(403).json({message:"Auth failed"})
//         }
//         resp.clearCookie(`${user.id}`);
//         req.cookies[`${user.id}`] = "";

//         const token = jwt.sign({id: user.id},JWT_SECRET_KEY,{
//             expiresIn: "35s"
//         })

//         resp.cookie(String(user.id),token,{
//             path: '/',
//             expires: new Date(Date.now() + 1000 * 30),
//             httpOnly:true,
//             sameSite:'lax',
//         })

//         req.id = user.id;
//         next();

//     })
// }

exports.signup = signup ;
exports.login = login;
// exports.verifyToken = verifyToken;
// exports.getUser = getUser ;
// exports.refreshToken = refreshToken;