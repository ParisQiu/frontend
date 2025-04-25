"use client"

import { useState, useEffect } from "react"
import { Clock, FileText, Pause, Play, RefreshCw } from "lucide-react"

export default function Utilities() {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [timerType, setTimerType] = useState<"focus" | "break">("focus")

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsTimerRunning(false)
            setTimerType(timerType === "focus" ? "break" : "focus")
            setMinutes(timerType === "focus" ? 5 : 25)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, minutes, seconds, timerType])

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setMinutes(timerType === "focus" ? 25 : 5)
    setSeconds(0)
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Study Utilities</h2>
      </div>
      <div className="p-4">
        <div className="mb-4 rounded-lg border p-4">
          <h3 className="mb-2 text-center text-sm font-medium">Pomodoro Timer</h3>
          <div className="mb-3 text-center text-3xl font-bold">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <p className="mb-3 text-center text-xs text-gray-500">
            {timerType === "focus" ? "Focus Session" : "Break Time"}
          </p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={toggleTimer}
              className="flex items-center rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
            >
              {isTimerRunning ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
              {isTimerRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center rounded-md border px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            <FileText className="mr-1 h-4 w-4" />
            Quick Note
          </button>
          <button className="flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            <Clock className="mr-1 h-4 w-4" />
            Track Time
          </button>
        </div>
      </div>
    </div>
  )
}
