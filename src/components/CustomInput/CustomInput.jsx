import "./CustomInput.css"

export const CustomInput = ({placeholder, type, name, value="", handler}) => {

    return (
        <input placeholder={placeholder} type={type} name={name} value={value} onChange={(e) => handler(e)}></input>
    )
}