const delayedCallback = (
  cb: (arg: any) => any,
  items = [],
  delay = 50
) => {
  if (items.length > 0) {
    setTimeout(() => {
      cb(items[0])
      items.unshift()
      delayedCallback(
        cb,
        items,
        delay
      )
    }, delay)
  }
}

export default delayedCallback
