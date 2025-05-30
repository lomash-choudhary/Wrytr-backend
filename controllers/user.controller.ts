import { asyncHandler } from "../utils/asyncHandler";
import e, { application, type Request, type Response } from "express";
import { userSignupSchemaValidator } from "../validator/user.validator";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";
import client from "../db/connectToDb";
import { ApiResponse } from "../utils/ApiResponse";
import { DeafaultAvatarGen } from "../utils/DefaultAvatarGen";

//user sign up end point
const userSignup = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, username, password, email } = req.body;
  try {
    const doesUserWithSameUsernameAlreadyExists = await client.user.findFirst({
      where: {
        OR: [
            {username},
            {email}
        ]
      },
    });

    if (doesUserWithSameUsernameAlreadyExists) {
      throw new ApiError({
        statusCode: 409,
        error:
          "User with the same username or email already exists, please try using a different username or email",
        success: false,
        message:"User with the same username or email already exists, please try using a different username or email"
      });
    }

    const parsedBody = userSignupSchemaValidator.safeParse(req.body);

    if (!parsedBody.success) {
      throw new ApiError({
        statusCode: 403,
        error: parsedBody.error.errors,
        success: false,
        message: "Error occured while validating the inputs",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDefaultAvatar = DeafaultAvatarGen()

    const userCreation = await client.user.create(
        {
            data:{
                username,
                password: hashedPassword,
                fullName,
                email,
                avatar: userDefaultAvatar
            }
        }
    )

    if(!userCreation){
        throw new ApiError(
            {
                statusCode: 500,
                error: "Error occured while signing up the user on the Wrytr App, Please try again later",
                success:false,
                message:"Error occured while signing up the user on the Wrytr App, Please try again later"
            }
        )
    }

    res.status(200).json(
        new ApiResponse(
            {
                data: {
                    username: userCreation.username,
                    email: userCreation.email,
                    fullName: userCreation.fullName,
                    profileImage: userCreation.avatar
                },
                statusCode:200,
                message: "Signed up on the wrytr successfully"
            }
        )
    )
  } catch (error) {
    throw new ApiError(
        {
            statusCode: 500,
            message:"Something went wrong while signing up the user on Wrytr App",
            error: error,
            success:false
        }
    )
  }
});

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running fine for the user",
  });
});

export { userSignup, userLogin };
