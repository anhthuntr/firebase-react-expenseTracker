export const useGetUserInfo = () => {
    const { userID } =
      JSON.parse(localStorage.getItem("auth")) || {};
  
    return { userID };
  };