import "./CustomInput.css"

export const CustomInput = ({placeholder, type, name, handler, value=""}) => {

    return (
        <input placeholder={placeholder} type={type} name={name} value={value} onChange={(e) => handler(e)}></input>
    )
}