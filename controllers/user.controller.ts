import { asyncHandler } from "../utils/asyncHandler";
import e, { application, type Request, type Response } from "express";
import { userSignupSchemaValidator } from "../validator/user.validator";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";
import client from "../db/connectToDb";
import { ApiResponse } from "../utils/ApiResponse";
import { DeafaultAvatarGen } from "../utils/DefaultAvatarGen";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/GenerateAccessToken";

//user sign up end point

const userSignup = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, username, password, email } = req.body;
  try {
    const doesUserWithSameUsernameAlreadyExists = await client.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (doesUserWithSameUsernameAlreadyExists) {
      throw new ApiError({
        statusCode: 409,
        error:
          "User with the same username or email already exists, please try using a different username or email",
        success: false,
        message:
          "User with the same username or email already exists, please try using a different username or email",
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

    const userDefaultAvatar = DeafaultAvatarGen();

    const userCreation = await client.user.create({
      data: {
        username,
        password: hashedPassword,
        fullName,
        email,
        avatar: userDefaultAvatar,
      },
    });

    if (!userCreation) {
      throw new ApiError({
        statusCode: 500,
        error:
          "Error occured while signing up the user on the Wrytr App, Please try again later",
        success: false,
        message:
          "Error occured while signing up the user on the Wrytr App, Please try again later",
      });
    }

    //we generate access token so that user dont have to login after sign up in order to use the app
    const accessToken = generateAccessToken(userCreation.id);

    res.status(200).json(
      new ApiResponse({
        data: {
          username: userCreation.username,
          email: userCreation.email,
          fullName: userCreation.fullName,
          profileImage: userCreation.avatar,
          accessToken: accessToken,
        },
        statusCode: 200,
        message: "Signed up on the wrytr successfully",
      })
    );
  } catch (error) {
    throw new ApiError({
      statusCode: 500,
      message: "Something went wrong while signing up the user on Wrytr App",
      error: error,
      success: false,
    });
  }
});

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const doesUserEvenExists = await client.user.findFirst({
      where: {
        email,
      },
    });
    if (!doesUserEvenExists) {
      throw new ApiError({
        statusCode: 404,
        message: "User not found with the given email",
        success: false,
        error: "User not found with the given email",
      });
    }
    const comparedPassword = bcrypt.compare(
      password,
      doesUserEvenExists.password
    );
    if (!comparedPassword) {
      throw new ApiError({
        statusCode: 400,
        message: "Wrong Password",
        success: false,
        error: "Wrong Password",
      });
    }
    const accessToken = generateAccessToken(doesUserEvenExists.id);

    res.status(200).json(
        new ApiResponse(
            {
                data:{
                    accessToken
                },
                statusCode:200,
                message:"Logged In Success fully on Wrytr App"
            }
        )
    )
  } catch (error) {
    throw new ApiError({
        statusCode: 500,
        message: "Something went wrong while logging in on Wrytr App",
        success: false,
        error: error,
    })
  }
});

export { userSignup, userLogin };
