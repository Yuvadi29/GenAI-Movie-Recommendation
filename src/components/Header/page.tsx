import React from 'react'
import Search from '../Search/page'

const Header = () => {
    return (
        <header className="p-10 pb-0 flex flex-col items-center sticky top-0 z-50">
            <Search />
        </header>
    )
}

export default Header