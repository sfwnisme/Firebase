import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { storage } from '../src copy/firebase'
import { v4 } from 'uuid'

const App = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(null) // 'idle' | 'loading' | 'success' | 'error'
  const [fileUrls, setFileUrls] = useState([])
  const inputRef = useRef(null)


  // !timer to limit loading state appearing
  useEffect(() => {
    const time = setTimeout(() => {
      setLoading('idle')
    }, [3000])
    return () => clearTimeout(time)
  }, [loading])


  // !storage reference for the uploading function
  const storageRef = ref(storage, `images/${file?.name + v4()}`)
  const uploadFile = async () => {
    if (file == null) {
      setLoading('error')
      return
    }
    try {
      console.log('loading')
      setLoading('loading')
      await uploadBytes(storageRef, file)
      setLoading('success')
      console.log('success')

      // !clear the input data after uploading success
      inputRef.current.value = null
    } catch (error) {
      console.log(error.message)
    }
  }

  // download the files
  const folderRef = ref(storage, 'images/')

  useEffect(() => {
    listAll(folderRef).then((res) => {
      const promises = res.items.map((r) => getDownloadURL(r))
      Promise.all(promises).then((urls) => {
        setFileUrls(urls)
      })
      console.log(promises)
    })
  }, [loading == 'success'])


  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={inputRef} />
      <button onClick={uploadFile}>upload the file</button>
      {loading == 'idle' && ''}
      {loading == 'loading' && <mark>Loading...</mark>}
      {loading == 'success' && <mark>Success!</mark>}
      {loading == 'error' && <mark>No File!</mark>}

      {
        fileUrls.map((url) => <img src={url} key={url} />)
      }
    </div>
  )
}

export default App