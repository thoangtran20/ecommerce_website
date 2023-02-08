import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getCollection = () => {
    setIsLoading(true)
    try {
      const docRef = collection(db, collectionName)
      const q = query(docRef, orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // console.log(allData);
        setData(allData)
        setData1(allData)
        setIsLoading(false)
      })
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getCollection()
  }, [])

  return { data, data1, isLoading }
}

export default useFetchCollection
