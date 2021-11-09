// abstract API integration 
const getDirectory = async () => {
  const request = await fetch('https://api-dev.reo.so/api/folderStructure')
  const response = await request.json()  
  return response
}

export {
  getDirectory
}