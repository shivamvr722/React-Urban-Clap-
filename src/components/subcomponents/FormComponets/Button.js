import "./button.css"

const Button = ({name, type, handleAction}) => {
  return <button  type={type} className="buttonStyle" onClick={handleAction} >{name}</button>
}

export default Button