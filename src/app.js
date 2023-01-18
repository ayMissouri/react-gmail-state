import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import Header from './components/header'
import initialEmails from './data/emails'

import './styles/app.css'
import './styles/header.css'
import './styles/styles.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [originalEmails, setOriginalEmails] = useState()
  const [starredEmails, setStarredEmails] = useState()

  const read = (target) => {
    setOriginalEmails(initialEmails)
    setEmails(emails.map((email) => {if(email === target){email = email.read ? {...email, read: !email.read}:{...email, read: !email.read}}
    return email}))
  }

  const star = (target) => {
    const starredEmail = emails.map((email) => {if(email === target){email = email.starred ? {...email, starred: !email.starred}:{...email, starred: !email.starred}}
    return email})
    setStarredEmails(starredEmail)
    setEmails(starredEmail)
  }

  const [stateForInboxCount, setStateForInboxCount] = useState()

  const inboxCount = () => {
    let count = emails.length
    emails.forEach((target) => {if (target.read) count--})
    setStateForInboxCount(count)
  }

  const [stateForStarredCount, setStateForStarredCount] = useState()

  const starredCount = () => {
    let count = 0
    emails.forEach((target) => {if (target.starred) count++})
    setStateForStarredCount(count)
  }

  useEffect(() => {
    inboxCount()
    starredCount()
  })

  const checkbox = useRef()
  const hideReadEmails = () => {
    setOriginalEmails(emails)
    if (checkbox.current.checked === true) {setEmails(emails.filter((target) => target.read !== true))
    } else {setEmails(originalEmails)}
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{stateForInboxCount}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{stateForStarredCount}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              ref={checkbox}
              onChange={() => hideReadEmails()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((target) => {
          return(
            <li key={target.id} className={target.read ? "email read" : "email unread"}>
              <div className='select'>
                <input type="checkbox" className='select-checkbox' onChange={() => read(target)} />
              </div>
              <div className='star'>
                <input type="checkbox" className='star-checkbox' onChange={() => {star(target)}} />
              </div>
              <div className='sender'>{target.sender}</div>
              <div className='title'>{target.title}</div>
            </li>
          )
        })
        }
      </main>
    </div>
  )
}

export default App
