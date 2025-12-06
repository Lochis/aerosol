import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import extend from 'lodash/extend.js'
import type { Request as JWTRequest } from "express-jwt"
import type { NextFunction, Response } from 'express'

type UserRequest = JWTRequest & {
  profile?: any
}

const me = async (req: JWTRequest, res: Response) => {
  try {
    console.log(req.auth?.sub)
    const userId = req.auth?.sub;

    // if no userId in token, return invalid token error
    if (!userId) {
      return res.status(401).json({ "code": "INVALID_TOKEN" });
    }

    const user = await User.findById(userId).select('_id email name tag avatar_url createdAt');
    console.log("User found for me:", user);
    return res.json({
      "user": {
        "id": user?._id,
        "email": user?.email,
        "name": user?.name,
        "tag": user?.tag,
        "avatar_url": user?.avatar_url,
        "createdAt": user?.createdAt
      },
    });
  } catch (err) {
    return res.status(401).json({ "code": "INVALID_TOKEN" });
  }
}

const create = async (req: JWTRequest, res: Response) => {
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
const list = async (req: JWTRequest, res: Response) => {
  let currentUserId = req.auth?.sub; 

  try {
    // get users whose tag starts with the search query, excluding _deleted and the current user
    let filter = {
      $and: [
        {
          "tag": {
            $regex: `^${req.query.search}`,
          }
        },
        {
          "tag": {
            $ne: "_deleted",
          }
        },
        {
          _id: { $ne: currentUserId }
        }
      ]
    }
    let users = await User.find(filter).select('_id name tag')
    console.log(users.length, "users found for search:", req.query.search);
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: err
    })
  }
}

const userByTag = async (req: UserRequest, res: Response, next: NextFunction, tag: string) => {
  try {
    let user = await User.findOne({ tag: tag })
    if (!user)
      return res.status(400).json({
        error: "User not found"
      })
    req.profile = user
    console.log("Request profile set to:", req.profile.tag);
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    })
  }
}
const read = (req: UserRequest, res: Response) => {
  console.log("Read request for user:", req.profile.tag);
  req.profile.email = undefined
  //console.log("Read user:", req.profile);
  return res.json(req.profile)
}


const update = async (req: JWTRequest, res: Response) => {
  try {
    let userId = req.auth?.sub;
    if (!userId) {
      return res.status(403).json({
        error: "Unauthorized"
      });
    }

    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: "USER_NOT_FOUND" })
    }

    user = extend(user, req.body)
    await user?.save()
    res.json(user)

  } catch (err) {
    return res.status(400).json({
      error: err
    })
  }
}
const remove = async (req: JWTRequest, res: Response) => {
  console.log("Delete request received for user:", req.auth?.sub);
  try {
    let user = await User.findById(req.auth?.sub);

    const placeholderDeletedUser = await User.findOneAndUpdate(
      { tag: "_deleted" },
      {
        $setOnInsert: {
          email: "deleted",
          name: "deleted",
          tag: "_deleted",
          avatar_url: "",
          createdAt: new Date(),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );


    if (user) {
      let postFilter = { author: user?._id };
      await Post.updateMany(postFilter, { $set: { 
        author: placeholderDeletedUser._id, 
        email: placeholderDeletedUser.email, 
        name: placeholderDeletedUser.name, 
        tag: placeholderDeletedUser.tag, 
        avatar_url: placeholderDeletedUser.avatar_url, 
      } });
    }


    let deletedUser = await user?.deleteOne()
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: err
    })
  }
}

// New function to remove multiple
const removeMany = async (req: JWTRequest, res: Response) => {
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
export default { create, me, userByTag, read, list, remove, removeMany, update }
