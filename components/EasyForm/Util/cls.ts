export default function(...args: (string | boolean |  undefined | null)[]){
  return args.reduce<string>((finalClass, currentClass) => {
    if (!currentClass) return finalClass
    const prefix = finalClass === '' ? '' : ' '
    return finalClass + prefix + currentClass
  }, '')
}