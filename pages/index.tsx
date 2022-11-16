import { useState, ChangeEvent, FormEvent, CSSProperties, useMemo } from "react"
import Head from "next/head"
import styles from "../styles/Home.module.scss"
import { useRouter } from "next/router"

const Home = () => {
  const [email, setEmail] = useState<string>("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const sendData = () => {
    setDisableSubmit(true)
    setLoading(true)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    }
    fetch("https://reqres.in/api/posts", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("response data", data))
      .finally(() => {
        setDisableSubmit(false)
        setLoading(false)
        router.push("/Todo")
      })
    // .then(data => this.setState({ postId: data.id }));
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    if (email !== "") {
      // check some other condition
      // regex to make sure entered text is email
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (emailRegex.test(email)) {
        // this clears email error after correct
        setEmailError("")
        setDisableSubmit(false)
        // this is for demo purposes only.  Use a database in real life.
      } else {
        setEmailError("Invalid Email")
        setDisableSubmit(true)
      }
    } else {
      setEmailError("Email Required")
      setDisableSubmit(true)
    }
    setSuccessMsg("")
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    // TODO these need to be different
    if (password.length < 5) {
      setPasswordError("Password must be at least 4 characters")
      setDisableSubmit(true)
    } else {
      setPasswordError("")
      setDisableSubmit(false)
    }
    if (password === "") {
      setPasswordError("Password Required")
      setDisableSubmit(true)
    }
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email !== "") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (emailRegex.test(email)) {
        // this clears email error after correct
        setEmailError("")
        sendData()
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

  const emailBorder = useMemo(() => {
    if (disableSubmit) {
      return { border: "solid #CA0606 2px" }
    }
    return { border: "solid black 2px" }
  }, [disableSubmit])

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
          {successMsg && <div className={styles.success}>{successMsg}</div>}
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={handleEmailChange}
            autoComplete="off"
            name="email"
            style={emailBorder}
            className={styles.emailInput}
            placeholder="user@rapptrlabs.com"
            maxLength={50}
          />

          {emailError && <div className={styles.error}>{emailError}</div>}

          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            onChange={handlePasswordChange}
            placeholder="Must be at least 4 characters"
            type="password"
            className={
              passwordError ? styles.passwordInputError : styles.passwordInput
            }
            maxLength={16}
          />
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          <input disabled={disableSubmit} type="submit" value="Submit" />
        </form>
        {loading && <div>Loading...</div>}
      </main>
    </div>
  )
}

export default Home
