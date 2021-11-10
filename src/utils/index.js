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
const typeOfItem = type => {
  if(type === 'image/png' || type === 'image/jpeg'){
    return 'file:img'
  }
  if(type === 'application/pdf'){
    return 'file:pdf'
  }
  return 'file:others'
}

export {
  whichLevel,
  getDirectory,
  typeOfItem
} 