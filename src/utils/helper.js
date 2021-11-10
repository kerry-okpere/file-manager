const whichLevel = (data, state) => {
  let tranisientState = JSON.parse(JSON.stringify(data))
  for (let level of state){
    tranisientState = JSON.parse(JSON.stringify(tranisientState.folders[level]))
  }
  return tranisientState;
}
const getDirectory = async url => {
  const request = await fetch(url)
  const response = await request.json()  
  return response
}

export {
  whichLevel,
  getDirectory
} 