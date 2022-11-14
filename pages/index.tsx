import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.scss"
import userIcon from "../public/user-icon.png"
import pwIcon from "../public/password-icon.png"

const Home = () => {
  const [email, setEmail] = useState<string>("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleEmailChange = (e) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    setSuccessMsg("")
    // setEmailError("")
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setSuccessMsg("")
    setPasswordError("")
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email !== "") {
      // check some other condition
      // regex to make sure entered text is email
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (emailRegex.test(email)) {
        // this clears email error after correct
        setEmailError("")
        // this is for demo purposes only.  Use a database in real life.
        if (email === "admin@demo.com") {
          setEmailError("")
          if (password === "demo") {
            setSuccessMsg("You are successfully logged in")
          } else {
            setPasswordError("Password does not match with the email address")
          }
        } else {
          setEmailError("Email does not match with our database")
        }
      } else {
        setEmailError("Invalid Email")
      }
    } else {
      setEmailError("Email Required")
    }

    if (password !== "") {
      // check some other condition
    } else {
      setPasswordError("Password Required")
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rapptr Code Challenge</title>
        <meta
          name="Scott Flynn Rapptr Code Challenge"
          content="Login and Todo App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>Rapptr Labs</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {successMsg && <div>{successMsg}</div>}
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={handleEmailChange}
            name="email"
            className={styles.emailInput}
          />

          {emailError && <div>{emailError}</div>}

          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            onChange={handlePasswordChange}
            type="password"
            className={styles.passwordInput}
          />
          {passwordError && <div>{passwordError}</div>}
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  )
}

export default Home
