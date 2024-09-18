export type Task = {
    title:String, 
    timeframes: TimeFrames
}

export type TaskByTimeFrame = {
    title: String,
    current: Number,
    previous: Number
}

export type TimeFrames = {
    daily: TimeFrame,
    weekly: TimeFrame,
    monthly: TimeFrame
}

export type TimeFrame = {
    current: Number,
    previous: Number
}