//pages/contact.tsx
import axios from 'axios'
import React from 'react'

const baseUrl = 'http://localhost:5000/api'
const UploadPost = () => {
  const [title, setTitle] = React.useState('')
  const [file, setFile] = React.useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${baseUrl}/posts`, { title, postImage: file }, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className="container">
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>New Post Creator</h1>
          <input type="text" placeholder="Title" required className="form-field" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            type="file"
            required
            placeholder="Upload Image"
            accept="image/*"
            className="form-field"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadPost
