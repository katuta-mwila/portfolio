// Is the checkpath a subpath of the currentPath
export default function isSubPath(currentPath: string, pathToCheck: string){
  const currentPathSplit = currentPath.split('/')
  const checkPathSplit = pathToCheck.split('/')

  for (let i = 0; i < checkPathSplit.length; i++){
    if (currentPathSplit.length - 1 < i) return false
    if (checkPathSplit[i] !== currentPathSplit[i]) return false
  }
  return true
}