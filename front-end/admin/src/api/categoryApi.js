import Axios from "axios";
import { API_BASE_URL } from "../constants";

var axios = Axios.create({
    baseURL: API_BASE_URL+"categories/",
    timeout: 10000
})

export const getAllCategoryApi = () => {
    return axios.get("find-all",{
        headers: {
           'Content-Security-Policy': 'default-src https:'
        }
    });
}

export const deleteCategoryApi = (categoryId) => {
    console.log(categoryId);
    return axios.delete(`delete-category-admin?id=${categoryId}`); //doc lại axios
}

export const createCategoryApi = (category) => {
    let newCategory = [{
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        categoryDes: category.categoryDes
    }];
    console.log(newCategory);
    return axios.post("save-categories",newCategory)
}

export const updateCategoryApi = (category) => {
    let newCategory = [{
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        categoryDes: category.categoryDes
    }];
    return axios.put("save-categories",newCategory)
}