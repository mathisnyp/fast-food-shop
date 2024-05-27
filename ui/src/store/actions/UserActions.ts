import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import { Login_data, Register_data } from "../../api/model"
import { ProfileUpdate } from "../../api/dto"
import { UserManagementClient } from "../../api/Client/UserManagementClient"
import { RootState } from "../../index"
import { User } from "../../api/model/user"

export const register: AsyncThunk<void, Register_data, { state: RootState }> =
  createAsyncThunk<void, Register_data, { state: RootState }>(
    "user/register",
    async (registerData: Register_data) => {
      await UserManagementClient.register(registerData)
    }
  )

export const login: AsyncThunk<void, Login_data, { state: RootState }> =
  createAsyncThunk<void, Login_data, { state: RootState }>(
    "user/login",
    async (loginData: Login_data) => {
      await UserManagementClient.login(loginData)
    }
  )

export const fetchUserByLoginToken: AsyncThunk<
  User,
  void,
  { state: RootState }
> = createAsyncThunk<User, void, { state: RootState }>(
  "user/fetchUserByLoginToken",
  async (arg, thunkAPI) => {
    return await UserManagementClient.getMyProfile()
  }
)

export const editUserProfile: AsyncThunk<
  ProfileUpdate,
  ProfileUpdate,
  { state: RootState }
> = createAsyncThunk<ProfileUpdate, ProfileUpdate, { state: RootState }>(
  "user/editUserProfile",
  async (userProfileUpdate: ProfileUpdate, thunkAPI) => {
    try {
      await UserManagementClient.editMyProfile(userProfileUpdate)
      return userProfileUpdate
    } catch (e) {
      return {}
    }
  }
)

export const logout: AsyncThunk<boolean, void, { state: RootState }> =
  createAsyncThunk<boolean, void, { state: RootState }>(
    "user/logout",
    async () => {
      try {
        await UserManagementClient.logout()
        return true
      } catch (e) {
        return false
      }
    }
  )
