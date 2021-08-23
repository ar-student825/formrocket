import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import Typed from 'typed.js'
import {CircularProgress} from "@material-ui/core"
import { useSession, signIn, signOut } from "next-auth/client";
export default function Home() {

  useEffect(()=>{
    setTimeout(()=>{
    if (document.getElementById('imagecontainer')) {
      document.getElementById('titleMain').style.display = "initial"
      document.getElementById('csMain').style.display = "initial"
      document.getElementById('authMain').style.display = "initial"
      document.getElementById('descMain').style.display = "initial"
       new Typed('#type', {
        strings: ["Your Way", "The Right Way", "The Easy Way", "The Programmatic Way", "The Custom Way", "The Serverless Way"],
        typeSpeed: 40,
        smartBackspace: true,
        backDelay: 1000,
        backSpeed: 40
      })
      document.getElementById('imagecontainer').innerHTML = `<center><img src="/files/form.svg" width="50%" /></center>`
  }
}, 2000)
  },[])
  const [session, loading] = useSession();
    if (loading) return (<> <main className={styles.main}><CircularProgress style={{color: 'white'}} /></main> </>)
    if (!loading && !session) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <noscript>
          <h1>JavaScript is required for everything on FormRocket.</h1>
        </noscript>
        <div id="imagecontainer">
          <CircularProgress style={{color: 'white'}} />
        </div>
        <h2 id="csMain" style={{display: 'none'}}><b>COMING SOON</b></h2>
        <h1 className={styles.title} id="titleMain" style={{display: 'none'}}>
          Forms, <span id="type"></span> 🚀
        </h1>

        <p className={styles.description} id="descMain" style={{display: 'none'}}>
        A new way to collect data from HTML forms, and fetch responses from our API.<br />Just <a href="https://copy.ar-dev.cf/?content=%3Cform%20method%3D%22POST%22%20id%3D%22formID%22%20action%3D%22https%3A%2F%2Fformrocket.ar-dev.cf%2Fapi%2Fforms%2F%3Ausername%2F%3AformName%2F%3AformID%2Fpost%22%3E%3Cinput%20name%3D%22myinput%22%20placeholder%3D%22My%20Cool%20Input%22%20%2F%3E%3C%2Fform%3E%0A%3Cscript%3E%0A%20%20%20fetch%28%27https%3A%2F%2Fformrocket.ar-dev.cf%2Fapi%2Fforms%2F%3Ausername%2F%3AformName%2F%3AformID%2Fscript%27%29.then%28res%20%3D%3E%20res.text%28%29%29.then%28%28%29%3D%3E%7Beval%28res%29%7D%29%0A%3C%2Fscript%3E">make your form POST to us</a>, and we handle the rest. No ads, you control it all.
        </p>
                    <button onClick={() => signIn("github")} id="authMain" style={{display: 'none'}}>
                        Sign in with GitHub
                    </button>

      </main>

    </div>
  )
    }

  return (
    <>
    <main className={styles.main}></main>
    
                    <h1 className={styles.title}><Image src={session.user.image} width="100px" height="100px" style={{borderRadius: '50px', width: '100px !important'}} /> Welcome, {session.user.name}</h1>
                    <p className={styles.description}>Manage your forms</p>
                      {/*{JSON.stringify(session.user)} &amp; ID {session.user.image.replace('https://avatars.githubusercontent.com/u/', '').split('?')[0]}*/}
                     
                  <button onClick={signOut}>Logout</button> <br />
    </>
  )

   

}

