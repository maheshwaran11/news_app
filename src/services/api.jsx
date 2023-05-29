import axios from "axios";

axios.defaults.baseURL = "https://tnsltu.in/newsAPI/api";
const REGISTER_URL = "/createUser.php";
const LOGIN_URL = "/validateUser.php";
const ADD_CATEGORY_URL = "/addCategory.php";
const UPLOAD_CATEGORY_IMAGE = "/uploadFile.php";
const GET_ALL_CATEGORIES = "/getAllCategories.php";
const ADD_NEWS_URL = "/addNews.php";
const GET_ALL_NEWS = "/getAllNews.php";
const GET_NEWS_DETAILS = "/getNewsDetails.php";
const GET_CATEGORY_DETAILS = "/getCategoryDetails.php";


export const RegisterAPI = (inputs) => {
    let data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        userType: "Admin",
        status: 1
    }

    return axios.post(REGISTER_URL, data)
}

export const LoginAPI = (inputs) => {
    let data = {
        username: inputs.username,
        password: inputs.password
    }

    return axios.post(LOGIN_URL, data)
}

export const AddCategoryAPI = (inputs) => {
    let data = {
        title: inputs.title,
        description: inputs.description,
        image_url: inputs.image_url,
        createdBy: inputs.createdBy || 'Admin'
    }

    return axios.post(ADD_CATEGORY_URL, data)
}

export const AddNewsAPI = (inputs) => {
    let data = {
        title: inputs.title,
        description: inputs.description,
        image_url: inputs.image_url,
        category: inputs.category,
        tags: inputs.tags,
        createdBy: inputs.createdBy || 'Admin'
    }

    return axios.post(ADD_NEWS_URL, data)
}

export const UploadCategoryImage = (inputs, selectedFile, type) => {
    let data = {
        inputs,
        file: selectedFile,
        type: type
    }

    return axios.post(UPLOAD_CATEGORY_IMAGE, data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const UploadNewsImage = (inputs, selectedFile, type) => {
    let data = {
        inputs,
        file: selectedFile,
        type: type
    }

    return axios.post(UPLOAD_CATEGORY_IMAGE, data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const GetAllCategories = () => {
    
    return axios.get(GET_ALL_CATEGORIES, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

export const GetAllNews = (categoryID) => {
    let data = {
        categoryID
    }
    return axios.post(GET_ALL_NEWS, data)
}


export const GetNewsDetails = (id) => {
    let data = {
        id
    }
    return axios.post(GET_NEWS_DETAILS, data)
}

export const GetCategoryDetails = (id) => {
    let data = {
        id
    }
    return axios.post(GET_CATEGORY_DETAILS, data)
}