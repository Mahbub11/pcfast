import { useEffect, useState } from "react"

export const useTimerTwo = (startTime) => {
    const [ctime, setTime] = useState(startTime)
    const [intervalID, setIntervalID] = useState(null)
    const hasTimerEnded = ctime <= 0
    const isTimerRunning = intervalID != null

    const update = () => {
        setTime(time => time - 1)
    }
    const startCTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            setIntervalID(setInterval(update, 1000))
        }
    }
    const stopCTimer = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }
    // clear interval when the timer ends
    useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalID)
            setIntervalID(null)
        }
    }, [hasTimerEnded])
    // clear interval when component unmounts
    useEffect(() => () => {
        clearInterval(intervalID)
    }, [])
    return {
        ctime,
        startCTimer,
        stopCTimer,
        
    }
}