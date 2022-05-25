import { AZR_Member } from 'src/typings/external/moltres'

const dummy_db: { [key: string]: AZR_Member } = {}

/**
 * Retrieve a user's information from the database.
 * @param member_id The Discord user ID.
 * @returns {object} member
 */
const getUserInfo = async (member_id: string): Promise<AZR_Member> => {
  console.log(member_id)

  return new Promise((resolve, reject) => {
    const stored_user = dummy_db?.[member_id]
    if (stored_user) resolve(stored_user)
    else reject(new Error('member not found'))
  })
}

/**
 * Save a user's information (partial) to the database.
 * @param member_id The Discord user ID.
 * @param user_info The user's information to save.
 * @returns {object} member
 */
const storeUserInfo = async (member_id: string, user_info: AZR_Member): Promise<AZR_Member> => {
  console.log(member_id, user_info)

  return new Promise((resolve, reject) => {
    dummy_db[member_id] = user_info
    resolve(dummy_db[member_id])
  })
}

/**
 * Get a user's saved searches.
 * @param member_id The Discord user ID.
 * @returns {[string]} token
 */
const getSavedSearches = async (member_id: string): Promise<string[]> => {
  console.log(member_id)

  return new Promise((resolve, reject) => {
    resolve([''])
  })
}

/**
 * Save search results to a user's ID.
 * @param member_id The Discord user ID.
 * @param token Word, phrase, or translation to save.
 * @returns {string} token
 */
const saveSearch = async (member_id: string, token: string): Promise<string> => {
  console.log(member_id, token)

  return new Promise((resolve, reject) => {
    resolve(token)
  })
}

export default {
  getSavedSearches,
  getUserInfo,
  saveSearch,
  storeUserInfo,
}
