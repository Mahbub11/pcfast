import { useEffect, useState } from "react"

export const useTimer = (startTime) => {
    const [time, setTime] = useState(startTime)
    const [intervalID, setIntervalID] = useState(null)
    const hasTimerEnded = time <= 0
    const isTimerRunning = intervalID != null

    const update = () => {
        setTime(time => time - 1)
    }
    const startTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            setIntervalID(setInterval(update, 1000))
        }
    }
    const stopTimer = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }
    const setCustomTime = (val) => {
        setTime(val)
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
        time,
        startTimer,
        stopTimer,
        setCustomTime
    }
}