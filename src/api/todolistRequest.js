import axios from "axios";

const todolistRequest = axios.create({
  baseURL: "https://vue-lessons-api.vercel.app/",
});
//打API前攔截
todolistRequest.interceptors.request.use( (config) => {
    if(config.data === "") throw {response: {data: "資料不得為空"}};//測試

    return config;
  },  (error) => {
    return Promise.reject(error);
  });
//資料回來送到你手上前攔截
todolistRequest.interceptors.response.use( (response) => {
    return {
      status: true,
      data: response
    };
  },  (error) => {
    return Promise.resolve({
      status: false,
      data: []
    });
  });

export const getTodolistRequest = () => todolistRequest.get("/photo/list");