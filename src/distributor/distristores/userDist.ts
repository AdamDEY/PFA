import axios from "axios";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://172.201.204.133:3000/distributor/api/v1/auth";

interface UserDist {
  userName: string;
  userId: string;
}

interface UserDistStore {
  userDist: UserDist | null;
  login: (loginData: LoginData) => Promise<void>;
  signUp: (signUpData: SignUpData) => Promise<void>;
  logout: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const useUserDistStore = create<UserDistStore>((set) => ({
  userDist: getUserFromLocalStorage(),

  login: async (loginData: LoginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      console.log("resp", response);

      if (response.status === 201) {
        // console.log("response.data", response.data.data.result.response.accessToken  );
        const accessToken = response.data.data.result.response.accessToken;
        console.log("tokenDistributor", accessToken);

        const decodedToken: any = jwtDecode(accessToken);

        const userDist: UserDist = {
          userName: decodedToken.username,
          userId: decodedToken.client_id,
        };
        console.log("user", userDist);

        localStorage.setItem("tokenDistributor", accessToken);
        set({ userDist });
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  signUp: async (signUpData: SignUpData) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, signUpData);
      if (response.status === 201) {
        await useUserDistStore.getState().login({
          email: signUpData.email,
          password: signUpData.password,
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("tokenDistributor");
    localStorage.removeItem("Distributor");
    localStorage.removeItem("Pharmacies");
    localStorage.removeItem("expiresIn");
    set({ userDist: null });
  },
}));

function getUserFromLocalStorage(): UserDist | null {
  const token = localStorage.getItem("tokenDistributor");
  if (token) {
    const decodedToken: any = jwtDecode(token);
    return {
      userName: decodedToken.name,
      userId: decodedToken.userId,
    };
  }
  return null;
}
