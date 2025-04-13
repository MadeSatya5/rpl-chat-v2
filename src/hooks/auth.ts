import axios from "axios";
import { CheckUsernameProps, CheckUsernameResponse, LoginProps, RegisterProps, RegisterResponse } from "@/types/form";
import { LoginResponse } from "@/types/form";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  
  const router = useRouter();

  const login = async (data: LoginProps) => {
    try {
      setIsLoadingLogin(true);
      setIsErrorLogin(false);

      const res = await axios.post<LoginResponse>(
        `${process.env.BASE_URL}/api/user/login`,
        {
          username: data.username,
          password: data.password,
        }
      );
      console.log(res.data);
      setCookie("acessToken", res.data.data.token);

      toast.success("Logged in Sucessfully!!");
      
      router.push("/home")
      
    } catch (error) {
      console.error(error);
      setIsErrorLogin(true);
      toast.error("Failed to Login");
      
    } finally {
      setIsLoadingLogin(false);
    }
  };
  return { login, isLoadingLogin, isErrorLogin };
};


export const useCheckUsername = () => {
    const [isLoadingCheckUsername, setIsLoadingCheckUsername] = useState(false);

    let responseStatusCheckUsername = false;

    const checkUsername = async (data: CheckUsernameProps) => {
      try {
        setIsLoadingCheckUsername(true);

        const res = await axios.post<CheckUsernameResponse>(`${process.env.BASE_URL}/api/user/check-username`, {
          username: data.username
        })

        console.log(res.data)

        responseStatusCheckUsername = res.data.status === true;

        if(!responseStatusCheckUsername) {
          toast.error("Username Already Exist!!");
        } 
        
      } catch (error){
        console.error(error);
        toast.error("Unable to Register!!")

      } finally {
        setIsLoadingCheckUsername(false);
      }
    }

    return {checkUsername, isLoadingCheckUsername, responseStatusCheckUsername}
}


export const useRegister = () => {
  const router = useRouter();

  const registerAccount = async (data: RegisterProps) => {

    try{
      const res = await axios.post<RegisterResponse>(`${process.env.BASE_URL}/api/user/register`, {
        name: data.name,
        username: data.username,
        password: data.password,
      })

      console.log(res);
      toast.success("Register Account Sucess!!");

      router.push("/login");
    } catch (error) {
      console.error(error);
    } 
    
  }
  return {registerAccount}
}
