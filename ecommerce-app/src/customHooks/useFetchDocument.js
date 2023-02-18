import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

const useFetchDocument = (collectionName, documentID) => {
  // Khởi tạo state document ban đầu bằng null và thay đổi giá trị state sau khi setDocument
  const [document, setDocument] = useState(null)

  const getDocument = async () => {
    // Láy db theo collectionName và documentID
    const docRef = doc(db, collectionName, documentID)
    const docSnap = await getDoc(docRef)

    // Kiếm tra xem document có tồn tại trong firebase không
    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      }
      setDocument(obj)
    } else {
      toast.error('Document not found')
    }
  }

  // Thực thi callback getDocument() trả về document sau khi render lần đầu tiên
  useEffect(() => {
    getDocument()
  }, [])

  return { document }
}

export default useFetchDocument
