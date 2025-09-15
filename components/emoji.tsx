interface IEmoji{
  className?: string
  code: string
}

export default function Emoji(props: IEmoji){
  return <img src={`/emojis/${props.code.toLowerCase()}.svg`} className={props.className}/>;
}