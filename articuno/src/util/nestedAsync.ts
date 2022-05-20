const isPlainObject = (value) => (
  typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && value.constructor === Object
)

const resolve = async (value) => {
  // Await the value in case it's a promise.
  const resolved = await value;

  if (isPlainObject(resolved)) {
    const entries = Object.entries(resolved);
    const resolvedEntries = entries.map(
      // Recursively resolve object values.
      async ([key, _value]) => [key, await resolve(_value)]
    );
    return Object.fromEntries(
      await Promise.all(resolvedEntries)
    );
  }
  if (Array.isArray(resolved)) {
    // Recursively resolve array values.
    return Promise.all(resolved.map(resolve));
  }

  return resolved;
}

export default resolve
