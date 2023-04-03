export function useDatetime() {
  return (option:string) => {
    let date = new Date
    return date.toLocaleString(option)
  }
}

export function useCapitalize() {
  return (text:string) => text && text[0].toUpperCase() + text.slice(1)
}

export function useFindHashTags() {
  return (str:string) => {
      let string = str.split('')
      let hashTags = ''
      
      string.map((item, index) =>{
        if (item === '#') {
          for (let i = index; i < string.length; i++) {
            if (string[i+1] === undefined) {
              hashTags += string[i]
              break;
            }
            
            if (string[i+1] === '#' || string[i+1] === ' ') {
              hashTags += string[i] + ' '
              break;
            }
            
            hashTags += string[i]
          } 
        }
      })
      
      const filtredHashTags: string[] = hashTags.split(' ').filter(el => el !== '' && el !== '#')
      const uniqueHashTags = [...new Set(filtredHashTags)]
      return uniqueHashTags
  }
}
