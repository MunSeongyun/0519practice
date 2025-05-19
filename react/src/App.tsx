import { useEffect, useRef, useState } from 'react'
import './App.css'
type Post = {
  id: number
  title: string
  content: string
}
function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [render, setRender] = useState(false)
  const [o, setO] = useState(0)
  let count = 0
  const test = useRef(0)
  
  useEffect(() => {
    fetch('http://localhost:3000/post')
      .then((response) => {
        console.log(response)
        return response.json()})
      .then((data) => {
        console.log(data)
        setPosts(data)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
      })
  }, [render])
  const handleCreatePost = () => {
    const newPost = {
      title: title,
      content: content,
    }
    fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    }).then(()=>{
      setRender(!render)
      setTitle('')
      setContent('')
    })   
  }
  return (
    <>
    <div>{o}</div>
    <button onClick={()=>{
      setO(o+1)
      console.log(o)
      }}>add useState</button>
    <div>{test.current}</div>
    <button
      onClick={()=>{
        test.current++
        console.log(test.current)
        }}>
      add useRef
    </button>
  {count}
    <button onClick={()=>{
      count++
      console.log(count)
      }}>add let</button>
    <h1>게시판</h1>
    <h2>게시글 추가</h2>
    <h3>제목</h3>
    <input type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
    <h3>내용</h3>
    <input type="text" onChange={(e)=>{setContent(e.target.value)}}/>
    <button onClick={handleCreatePost}>추가</button>
    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ))}
    </>
  )
}

export default App
