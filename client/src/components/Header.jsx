import logo from './assets/logo.png'

const Header = () => {
    return (
        <nav className='navbar bg-light mb-4 p-0'>
            <div className="container">
                <a className='navbar-brand' href="/">
                    <div className="d-flex gap-1">
                        <img src={logo} alt="logo" className="" />
                        <div>Project Management</div>
                    </div>
                </a>
            </div>
        </nav>
    )
}

export default Header