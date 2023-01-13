import axios from "axios";

const url = 'http://localhost:3000/results'
export async function getUsers(params = {}) {
    const response = await axios.get(url, {params})
    return response.data
}