const createHttpError = require("http-errors");
const { ObjectId } = require("mongodb");
const { postAppsCollection } = require("../../Dbconfig/DatabaseConfig");

const appCommentPost = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await postAppsCollection.updateOne(
      {
        _id: new ObjectId(payload?.postId),
      },
      {
        $push: {
          comments: {
            $each: [payload],
            $position: 0,
          },
        },
      }
    );

    return res.status(200).send(result);
  } catch (error) {
    next(
      createHttpError(
        "দুঃখিত এই মুহুর্তে পোস্টটি পাবলিশ করা সম্ভব হচ্ছে না।আবার চেষ্টা করুন"
      )
    );
  }
};

const appReactionPost = async (req, res, next) => {
  try {
    const { postId, email } = req.body; // Assuming postId and email are passed in the request body.

    // Check if the email is valid
    if (!email || !ObjectId.isValid(postId)) {
      return next(createHttpError(400, "Invalid email or post ID."));
    }

    // Define the postId to be an ObjectId
    const postObjectId = new ObjectId(postId);

    // Find the post and check if likes array exists or not
    const post = await postAppsCollection.findOne({ _id: postObjectId });

    if (!post) {
      return next(createHttpError(404, "Post not found."));
    }

    // Check if likes field exists, if not, initialize as an empty array
    const updateOperation = post.likes?.includes(email)
      ? {
          $pull: { likes: email }, // If email exists, pull it out of likes array
        }
      : {
          $addToSet: { likes: email }, // If email doesn't exist, add it to the likes array
        };

    // Update the likes field
    const updatedPost = await postAppsCollection.updateOne(
      { _id: postObjectId },
      updateOperation
    );

    if (updatedPost.modifiedCount === 0) {
      return next(createHttpError(400, "No changes made."));
    }

    // Return the updated post data
    const updatedPostData = await postAppsCollection.findOne({
      _id: postObjectId,
    });

    return res.status(200).json(updatedPostData);
  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Internal server error."));
  }
};

const appPostCommentController = {
  appCommentPost,
  appReactionPost,
};

module.exports = appPostCommentController;
