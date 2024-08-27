"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { changePassword, updateUser } from "@/store/slices/usersSlice";
import { z } from "zod";
import { UserUpdateOrChangePasswordSchema } from "@/schemas/updateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileDetails = () => {
  const { user } = useAppSelector((state) => state.users);
  const [isEditUserDetails, setIsEditUserDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof UserUpdateOrChangePasswordSchema>>({
    defaultValues: {
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
      oldPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(UserUpdateOrChangePasswordSchema),
  });

  const onSubmit = async (
    data: z.infer<typeof UserUpdateOrChangePasswordSchema>
  ) => {
    try {
      if (isEditUserDetails) {
        const { email, username, phoneNumber } = data;
        await dispatch(
          updateUser({
            id: user.id,
            username,
            phoneNumber,
            email,
          })
        );
        setIsEditUserDetails(false);
      }

      if (isChangingPassword) {
        await dispatch(
          changePassword({
            id: user.id,
            oldPassword: data.oldPassword!,
            newPassword: data.newPassword!,
          })
        );
        setIsChangingPassword(false);
      }
    } catch (error) {
      console.error("Error updating user details or changing password:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <h2 className="text-2xl font-bold mb-4">{user.username} Profile</h2>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user.username}
            />
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-6/12 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        disabled={!isEditUserDetails}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="phoneNumber"
                        {...field}
                        disabled={!isEditUserDetails}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isChangingPassword && (
                <>
                  <FormField
                    name="oldPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Old password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input placeholder="New password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="flex justify-start items-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (isEditUserDetails) {
                      form.handleSubmit(onSubmit)();
                    } else {
                      setIsEditUserDetails(true);
                    }
                  }}
                  className="w-full"
                >
                  {isEditUserDetails ? "Save Details" : "Change user details"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (isChangingPassword) {
                      form.handleSubmit(onSubmit)();
                    } else {
                      setIsChangingPassword(true);
                    }
                  }}
                  className="w-full"
                >
                  {isChangingPassword ? "Save Password" : "Change Password"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
