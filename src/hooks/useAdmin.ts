import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

export function useAdmin(roomId: string) {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    database.ref(`rooms/${roomId}`).get().then(roomData => {
      const roomAuthor = roomData.val().authorId
      if (roomAuthor === user?.id) {
        console.log(roomAuthor)
        console.log(user?.id)
        setIsAdmin(true)
      } 
    })
  }, [roomId, user])

  return { isAdmin }
}