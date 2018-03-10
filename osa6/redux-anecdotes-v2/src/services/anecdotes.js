import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

export const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  return response.data
}

export const registerVote = async (id, votes) => {

  const resourceUrl = url + '/' + id
  const response = await axios.patch(resourceUrl, { votes: votes })
  
  return response.data
}

export default { getAll }