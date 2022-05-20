import { AZR_Member } from 'src/typings/external/moltres'

const dummy_db: { [key: string]: AZR_Member } = {}

const getSavedUserInfo = (member_id: string): Promise<AZR_Member> => {
  console.log(member_id)

  return new Promise((resolve, reject) => {
    const stored_user = dummy_db?.[member_id]
    if (stored_user) resolve(stored_user)
    else reject(new Error('member not found'))
  })
}

const storeUserInfo = (member_id: string, user_info: AZR_Member): Promise<AZR_Member> => {
  console.log(member_id, user_info)

  return new Promise((resolve, reject) => {
    dummy_db[member_id] = user_info
    resolve(dummy_db[member_id])
  })
}

export default {
  getSavedUserInfo,
  storeUserInfo,
}
