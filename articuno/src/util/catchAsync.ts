/**
 * Attempt an async function and catch any errors.
 * @param fn The async function or Promise to attempt
 * @returns A Promise that resolves to the result of the function or rejects with the error
 */
const catchAsync = async (fn: (args?: any) => Promise<any>) => {
  let response
  try {
    response = await fn()
  } catch (error) {
    console.error(error)
    response = null
  }
  return response
}

export default catchAsync
