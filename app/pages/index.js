import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { CircularProgress, IconButton, Tooltip, Paper } from "@material-ui/core"
import { useSession, signIn, signOut } from "next-auth/client";
import SweetAlert from 'react-bootstrap-sweetalert';
import LogIn from '@material-ui/icons/VpnKey';
import PreView from '@material-ui/icons/Visibility';
import LogOut from '@material-ui/icons/ExitToApp';
import NewForm from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Info from '@material-ui/icons/Info';
import Settings from '@material-ui/icons/Settings';
import Docs from '@material-ui/icons/MenuBook';
import Export from '@material-ui/icons/Storage';
import Axios from 'axios'
import React from 'react'
import Script from 'next/script'
var data = {}

const Styles = makeStyles((theme) => ({
  white: {
    color: "white"
  }
}));
export default function Home() {
  let [dash, setDash] = React.useState(false)
  const s = Styles(); 
  let exampleNames = ["My feedback form", "Staff application", "Beta access form", "Store survey", "Job application", "Contact form", "Test form"]
  useEffect(()=> {
    setTimeout(()=>{
    if (document.getElementById('imagecontainer')) {
      document.getElementById('titleMain').style.display = "initial"
      document.getElementById('csMain').style.display = "initial"
      document.getElementById('btnsMain').style.display = "initial"
      document.getElementById('descMain').style.display = "initial"
      document.getElementById('imagecontainer').innerHTML = `<center><img src="/files/form.svg" width="50%" /></center>`
  }
}, 2000)

setTimeout(() => {
  if (document.getElementById('firstLoad')) {
    window.location.reload()
  }
}, 5000)
  },[])
  const [session, loading] = useSession();
  if (session && !dash && !loading) {
    Axios.get('/api/forms/'+session.user.image.replace('https://avatars.githubusercontent.com/u/','').split('?')[0] + '/info').then(x => {
      data = x.data
      setDash(true)
    }).catch(e => {
      data = {
        name: "...",
        id: 0,
        forms: {
          all: [
            
          ],
          total: 0
        }
      }

      setDash(true)
    })
  }
    if (loading || (!dash && session)) return (<> <main id="firstLoad" className={styles.main}><CircularProgress style={{color: 'white'}} /></main> </>)
    if (!loading && !session && !dash) {
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
          Forms, <span id="type">Done Right</span> 🚀
        </h1>

        <p className={styles.description} id="descMain" style={{display: 'none'}}>
        A new way to collect data from HTML forms, and fetch responses from our API.<br />Just POST to us, and we handle the rest. Everything is powered by our API, so you control it all.
        </p>        <div className={styles.btns} id="btnsMain" style={{display: 'none'}}>
                  <Tooltip title="Login with GitHub">
                    <IconButton className={s.white} onClick={() => signIn("github")} id="authMain">
                        <LogIn className={s.white} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="View demo">
                    <IconButton className={s.white} onClick={() => {
                      window.location.href = 'https://ar-dev.cf/to/frd'
                    }}>
                        <PreView className={s.white} />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="View documentation">
                    <IconButton className={s.white} onClick={() => {
                      window.location.href = 'https://docs.formrocket.me'
                    }}>
                        <Docs className={s.white} />
                    </IconButton>
                    </Tooltip>
                    </div>


      </main>
    </div>
  )
  }
    if (!loading && dash) {
  return (
  <>
    <main className={styles.main}>
    <Script src="/files/onDashLoad.js" type="text/javascript" />
                    <h1 className={styles.title}><div id="avatarContainer"></div> Welcome, {data.name || 'your session has expired, please refresh'}</h1>
                    <p className={styles.description}>Manage your forms</p>
                    <div className={styles.grid}>
                      {/*{JSON.stringify(session.user)} &amp; ID {session.user.image.replace('https://avatars.githubusercontent.com/u/', '').split('?')[0]}*/}
                     {data.forms && data.forms.all.length > 0 ? data.forms.all.map(i => (
                       <>
                       <div className={styles.card}>
                         <h3>{i.name}</h3>
                         <Tooltip title={i.createdAt ? new Date(i.createdAt).toString() : 'FormRocket was unable to parse this date.'}>
                         <p>Created {i.createdAt != null ? (`${new Date().toLocaleDateString() != new Date(i.createdAt).toLocaleDateString() ? new Date(i.createdAt).toLocaleDateString() : 'today'}`) : 'unknown time'}</p>
                         </Tooltip>
                         <div className={styles.btns}>
                            <Tooltip title="View responses &amp; information">
                              <IconButton className={s.white} href={`https://gui.formrocket.me/?userId=${session.user.image.replace('https://avatars.githubusercontent.com/u/', '').split('?')[0]}&formName=${i.name}&formId=${i.formId}&formSecret=${i.formSecret}&from=fr_dash`} target="_blank">
                                <Info />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Configure form">
                              <IconButton className={s.white} onClick={() => { 
                              alert(`Configure "${i.name}"\n\n\nAdd this form to your website (HTML) & show success message when done:\n<form method="POST" action="https://www.formrocket.me/api/forms/${i.ownerId}/${encodeURIComponent(i.name)}/${i.formId}/post/showSuccessMessageOnDone">\n  <input name="example" placeholder="example input" />\n</form>\nOptionally you can add the ?message= parameter to the action URL to customize the success message.\n\nOr submit via the API & get JSON response:\nPOST https://www.formrocket.me/api/forms/${i.ownerId}/${encodeURIComponent(i.name)}/${i.formId}/post\n\nRead the documentation for everything you can do with our API here:\nhttps://docs.formrocket.me`)
                            }}>
                                <Settings />
                              </IconButton>
                            </Tooltip>
                         </div>
                       </div>
                       </>
                     )) :
                     <p><b>Oops, </b> there aren&apos; any forms here yet. Create one below.</p>
                     }
                     </div>
                     <div id="fetchImageUrl" style={{display: 'none'}}>
                        {session.user.image || ''}
                     </div>
                     <div className={styles.btns}>
                     <Tooltip title="Create new form">
                    <IconButton className={s.white} onClick={() => { 
                      document ? (document.getElementById('create').style.display = 'initial') : null
                    }}>
                        <NewForm className={s.white} />
                    </IconButton>
                    </Tooltip>

                        <Tooltip title="Logout">
                    <IconButton onClick={signOut} className={s.white}>
                        <LogOut className={s.white} />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Export &amp; download data as JSON">
                    <IconButton className={s.white} href={`/api/forms/${session.user.image.replace('https://avatars.githubusercontent.com/u/', '').split('?')[0]}/info`} download="data.json">
                        <Export className={s.white} />
                    </IconButton>
                    </Tooltip>

                    </div>
                    <div id="create" style={{display: 'none'}}>
                      <h3>Pick a name for your form</h3>
                      <Tooltip title="You cannot change your form's name once it has been made, because your submission URL would change everytime the form name is changed, which would result in broken code.">
                      <p>Choose wisely- you can&apos;t change it later.</p>
                      </Tooltip>
                      <Tooltip title="Enter a unique name that will help you identify this form. Must be over 3 characters and less than 23 characters.">
                      <input placeholder={exampleNames[Math.floor(exampleNames.length * Math.random())]} name="formName" id="createFormName" maxLength="23" className={styles.input} type="text" required /> 
                      </Tooltip>
                      <input id="createButton" value="Create" className={styles.inputSubmit} type="submit" onClick={() => {
                      var name = document.getElementById('createFormName').value
                      if (name.length <= 0) {
                        document.getElementById('comingSoonText').innerHTML = 'Form name is required.'
                        document.getElementById('comingSoonText').style.display = 'initial'
                      } else if (name.length > 23 || name.length < 3) {
                        document.getElementById('comingSoonText').innerHTML = 'Form name must be over 3 characters and less than 23 characters. You are currently using ' + name.length + '.'
                        document.getElementById('comingSoonText').style.display = 'initial'
                      } else {
                        document.getElementById('createButton').innerHTML = 'Creating...'
                      var xhr = new XMLHttpRequest();
                      var url = `https://www.formrocket.me/api/forms/${session.user.image.replace('https://avatars.githubusercontent.com/u/', '').split('?')[0]}/new`;
                      xhr.open("POST", url, true);
                      xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.onreadystatechange = function () {
                          if (xhr.readyState === 4 && xhr.status === 200) {
                              var json = JSON.parse(xhr.responseText);
                              window.location.reload()
                          } else if (xhr.readyState == 4 && xhr.status != 200 && xhr.status != 0) {
                            document.getElementById('createButton').innerHTML = 'Create'
                            document.getElementById('comingSoonText').innerHTML = 'An error occured. Status ' + xhr.status + ' & data ' + (xhr.responseText || 'N/A')
                            console.log(xhr)
                            document.getElementById('comingSoonText').style.display = 'initial'
                          }
                      };
                      var data = JSON.stringify({"formName": name});
                      xhr.send(data)
                    }
                    }} />
                    </div>
                    <p id="comingSoonText" style={{display: 'none'}}>The feature you&apos;re looking for is coming soon. (CE00001)</p>
                  </main>
    </>
  )
  }
}

