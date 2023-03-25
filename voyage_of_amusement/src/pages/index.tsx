import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@/component/Button'
import { useAppContext } from '@/contexts/GlobaclContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoggedIn, setLoggedIn } = useAppContext();
  console.log(isLoggedIn)
  return (
    <>

      <div className="container mx-auto h-16">
        content
      </div>
    </>

  )
}
