import User from '../models/user.model.js'
import extend from 'lodash/extend.js'


const me = async (req, res) => {
   
    try {
        console.log(req.auth.sub)
        const userId = req.auth?.sub;
            
        // if no userId in token, return invalid token error
        if (!userId) {
            return res.status(401).json({ "code": "INVALID_TOKEN" });
        }
        
        const user = await User.findById(userId).select('_id email name tag avatar_url createdAt');
        console.log("User found for me:", user);
        return res.json({
            "status": "ok",
            "data": {
                "user": {
                    "id": user._id,
                    "email": user.email,
                    "name": user.name,
                    "tag": user.tag,
                    "avatar_url": user.avatar_url,
                    "createdAt": user.createdAt
                },
            }
        });
    } catch (err) {
        return res.status(401).json({ "code": "INVALID_TOKEN" });
    }
}

const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    {/* TODO returns 400 error and doesn't update user info */}
    try {
        let userId = req.auth.sub;    
        if (!userId) {
            return res.status(403).json({
                error: "Unauthorized"
            });
        }
       
        let user = req.profile
        user = extend(user, req.body)
        await user.save()
        console.log("user");
        res.json(user)

    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

// New function to remove multiple contacts
const removeMany = async (req, res) => {
    const { ids } = req.body; // Assuming IDs are sent in the request body
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            error: "Please provide an array of IDs to delete."
        });
    }
    try {
        const result = await User.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({
            message: `${result.deletedCount} users successfully deleted!`
        });
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
};
export default { create, me, userByID, read, list, remove, removeMany, update }


