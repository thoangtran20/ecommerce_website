import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Lấy dữ liệu từ firebase/firestore
  const getCollection = () => {
    setIsLoading(true)
    try {
      // Lấy db từ firestore theo collectionName
      const docRef = collection(db, collectionName)
      // truy vấn sắp xếp theo field 'createdAt' sắp xếp theo thứ tự mới đến cũ
      const q = query(docRef, orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        // Lấy tất cả dữ liệu từ firebase theo id collection
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(allData)
        setIsLoading(false)
      })
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  // Thực thi callback getCollection() trả về data sau khi render lần đầu tiên
  useEffect(() => {
    getCollection()
  }, [])

  return { data, isLoading }
}

export default useFetchCollection
