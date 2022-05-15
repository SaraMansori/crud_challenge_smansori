import axios from "axios";
import { IData } from "../types";

const moviesService = axios.create({
  baseURL: 'http://localhost:5000/films',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export function getAllMovies() {
  return moviesService.get('/')
}

export function getOneMovie(id: string) {
  return moviesService.get(`/${id}`)
}

export function createMovie({ title, releaseDate, runningTime, director, producer, score }: IData) {
  const newMovie = {
    title,
    release_date: releaseDate,
    running_time: runningTime,
    director,
    producer,
    rt_score: score,
  }
  return moviesService.post(`/`, newMovie)
}

export function editOneMovie(id: string, { title, releaseDate, runningTime, director, producer, score }: IData) {
  const editedMovie = {
    title,
    release_date: releaseDate,
    running_time: runningTime,
    director,
    producer,
    rt_score: score,
  }
  return moviesService.patch(`/${id}`, editedMovie)
}

export function deleteOneMovie(id: string) {
  return moviesService.delete(`/${id}`)
}

