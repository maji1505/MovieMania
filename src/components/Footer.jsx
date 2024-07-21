import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-1'>
      <div className='flex items-center justify-center gap-6'>
        <Link to='/' >About</Link>
        <Link to='/'>Contanct</Link>
      </div>
      <p className='text-sm'>Created Dynamic Movie website by Kushal</p>
    </footer>
  )
}

export default Footer