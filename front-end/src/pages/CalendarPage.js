"use client"

import { useState, useEffect } from "react"
import "../styles/CalendarPage.css"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
]

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate()
}

function getMonthYear(offset = 0) {
  const today = new Date()
  let month = today.getMonth() + offset
  let year = today.getFullYear()
  if (month > 11) {
    month -= 12
    year += 1
  }
  return { month, year }
}


const fetchAvailableDays = async (month, year) => {
  // Khúc có thể thay API
  const { month: curMonth, year: curYear } = getMonthYear(0)
  const { month: nextMonth, year: nextYear } = getMonthYear(1)
  if (month === curMonth && year === curYear) {
    return [2, 5, 8, 12, 18, 22, 27]
  }
  if (month === nextMonth && year === nextYear) {
    return [3, 7, 11, 15, 20, 25, 29]
  }

  const daysInMonth = getDaysInMonth(month, year)
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
}

const fetchSlotsByDay = async (month, year) => {
  // Khúc có thể thay API
  const { month: curMonth, year: curYear } = getMonthYear(0)
  const { month: nextMonth, year: nextYear } = getMonthYear(1)
  if (month === curMonth && year === curYear) {
    return {
      2: ["08:00 - 09:00", "10:00 - 11:00", "14:00 - 15:00"],
      5: ["09:00 - 10:00", "13:00 - 14:00"],
      8: ["08:00 - 09:00", "15:00 - 16:00"],
      12: ["10:00 - 11:00", "14:00 - 15:00", "15:00 - 16:00"],
      18: ["09:00 - 10:00", "13:00 - 14:00", "16:00 - 17:00"],
      22: ["08:00 - 09:00", "09:00 - 10:00"],
      27: ["14:00 - 15:00", "15:00 - 16:00"],
    }
  }
  if (month === nextMonth && year === nextYear) {
    return {
      3: ["08:00 - 09:00", "10:00 - 11:00"],
      7: ["09:00 - 10:00", "13:00 - 14:00"],
      11: ["08:00 - 09:00", "15:00 - 16:00"],
      15: ["10:00 - 11:00", "14:00 - 15:00"],
      20: ["09:00 - 10:00", "13:00 - 14:00"],
      25: ["08:00 - 09:00", "09:00 - 10:00"],
      29: ["14:00 - 15:00", "15:00 - 16:00"],
    }
  }

  const daysInMonth = getDaysInMonth(month, year)
  const slots = {}
  for (let d = 1; d <= daysInMonth; d++) {
    slots[d] = [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
    ]
  }
  return slots
}

const CalendarPage = () => {
  const today = new Date()
  const { month: curMonth, year: curYear } = getMonthYear(0)
  const { month: nextMonth, year: nextYear } = getMonthYear(1)

  const [selectedMonth, setSelectedMonth] = useState(curMonth)
  const [selected, setSelected] = useState(null)
  const [availableDays, setAvailableDays] = useState([])
  const [slotsByDay, setSlotsByDay] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      const days = await fetchAvailableDays(selectedMonth, curYear)
      const slots = await fetchSlotsByDay(selectedMonth, curYear)
      setAvailableDays(days)
      setSlotsByDay(slots)
    }
    fetchData()
    setSelected(null)
  }, [selectedMonth, curYear])

  const daysInMonth = getDaysInMonth(selectedMonth, curYear)
  const firstDay = new Date(curYear, selectedMonth, 1).getDay()
  const calendarCells = []
  for (let i = 0; i < firstDay; i++) calendarCells.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d)
  const weeks = []
  for (let i = 0; i < calendarCells.length; i += 7) weeks.push(calendarCells.slice(i, i + 7))

  const handleMonthSelect = (monthIndex) => {
  
    if (
      monthIndex === curMonth ||
      (curYear === nextYear && monthIndex === nextMonth) ||
      (curYear === curYear && monthIndex === nextMonth)
    ) {
      setSelectedMonth(monthIndex)
    }
  }

  const handleDaySelect = (day) => {
    if (availableDays.includes(day)) {
      setSelected({ day, month: selectedMonth, year: curYear })
    }
  }

  const isCurrentMonthToday = selectedMonth === today.getMonth() && curYear === today.getFullYear()

  return (
    <div className="calendar-root">
      <div className="calendar-layout">
        
        <div className="calendar-sidebar">
          <h2 className="year-title">{curYear}</h2>
          <div className="month-list">
            {monthNames.map((name, idx) => {
             
              const isAllowed =
                idx === curMonth || idx === nextMonth
              return (
                <button
                  key={name}
                  onClick={() => isAllowed && handleMonthSelect(idx)}
                  className={`month-button ${selectedMonth === idx ? "active" : ""}`}
                  style={{
                    opacity: isAllowed ? 1 : 0.4,
                    cursor: isAllowed ? "pointer" : "not-allowed",
                  }}
                  disabled={!isAllowed}
                >
                  {name}
                </button>
              )
            })}
          </div>
        </div>
     
        <div className="calendar-main">
          <div className="calendar-container">
          
            <h1 className="calendar-header">
              {monthNames[selectedMonth]} {curYear}
            </h1>
        
            <div className="calendar-grid-container">
            
              <div className="calendar-weekdays">
                {daysOfWeek.map((day) => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
                ))}
              </div>
            
              <div className="calendar-days">
                {weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    const isAvailable = day && availableDays.includes(day)
                    const isToday = day && isCurrentMonthToday && day === today.getDate()
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className="calendar-day"
                        onClick={() => day && handleDaySelect(day)}
                        style={{ cursor: isAvailable ? "pointer" : "default" }}
                      >
                        {day && (
                          <>
                            <span className="calendar-day-number">{day}</span>
                            {isToday ? (
                              <span className="calendar-day-indicator today"></span>
                            ) : isAvailable ? (
                              <span className="calendar-day-indicator available"></span>
                            ) : null}
                          </>
                        )}
                      </div>
                    )
                  }),
                )}
              </div>
            </div>
          </div>
        </div>
       
        <div className="details-sidebar">
          {selected ? (
            <div>
              <h3 className="details-header">
                {monthNames[selected.month].charAt(0) + monthNames[selected.month].slice(1).toLowerCase()}{" "}
                {selected.day}, {selected.year}
              </h3>
              <h4 style={{ color: "#22d3ee", marginBottom: "16px" }}>Available Time Slots</h4>
              <div className="exam-details">
                {slotsByDay[selected.day] && slotsByDay[selected.day].length > 0 ? (
                  slotsByDay[selected.day].map((slot, idx) => (
                    <div key={idx} className="exam-detail-row">
                      <span className="exam-detail-value">• {slot}</span>
                    </div>
                  ))
                ) : (
                  <div className="exam-detail-row">
                    <span className="no-selection">No available slots</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="details-header">Select a Date</h3>
              <p className="no-selection">Click on a date to view details and available time slots.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
