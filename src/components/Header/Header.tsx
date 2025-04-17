import logo from '../../assets/img/logo.svg'
import cart from "../../assets/img/cart.svg"

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <img src={cart} alt="cart" />
    </div>
  )
}

export default Header
