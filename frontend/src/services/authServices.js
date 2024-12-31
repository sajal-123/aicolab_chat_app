import axios from '../config/axios';

const registerUser = async (userData) => {
  try {
    console.log("userdata->", userData);
    const response = await axios.post(`${import.meta.env.VITE_BACKHOST}/register`, userData); // Assuming you're using VITE_BACKHOST
    return response.data;
  } catch (error) {
    console.error('Error during user registration:', error.message);
    // Ensure a meaningful error message is thrown
    throw new Error(error?.response?.data?.error || error.message);
  }
};

const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKHOST}/login`, userData); // Assuming you're using VITE_BACKHOST
        return response.data.message; // Customize the response based on your API
    } catch (error) {
        console.error('Error during login:', error.message);
        // Handle error and ensure a meaningful message is thrown
        throw new Error(error?.response?.data?.error || error.message);
    }
};

export { registerUser, loginUser };
