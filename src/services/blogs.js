import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs"

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (newBlog) => {
  console.log(newBlog)
  const updateUrl = `${baseUrl}/${newBlog.id}`
  const config = {
    headers: {Authorization: token},
  }
  
  const response = await axios.put(updateUrl, newBlog, config)
  return response.data
}

const deleteBlog = async id => {
  const deleteUrl = `${baseUrl}/${id}`
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.delete(deleteUrl, config)
  if (response.status === 204) {
    return true
  } 
  return false
}

export default { getAll , setToken, create, updateBlog, deleteBlog}