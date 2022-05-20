import { PythonShell } from 'python-shell'

const pyScript = (script, args) => new Promise((resolve, reject) => {
  PythonShell.run(script, { mode: 'json', args }, (err, res) => {
    if (err) return reject(err)
    return resolve(res)
  })
})

export default pyScript
