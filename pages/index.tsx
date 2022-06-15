import type { NextPage } from 'next'
import { checkIsManualRevalidate } from 'next/dist/server/api-utils'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { addAbortSignal } from 'stream'
import styles from '../styles/Home.module.css'
import  LogoutHandler  from '../components/logout'

const Home: NextPage = () => {
  
  return (
    <div>
      <h1>HOME PAGE</h1>
      <h2>Book store web</h2>
    </div>
  )
}

export default Home
