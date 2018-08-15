import mockuser from '../MockUser';
import {MockUserDefaults} from '../MockUser';

export const initializeApp = (config) => {
  // do nothing
}

export const auth = () => {
  return {
    onAuthStateChanged: (callback) => {callback(mockuser)}
  }
}

export const database = () => {
  return {
    ref: (reference) => {
      return {
      }
    }
  }
}
