class LocStorage {
  setLocStorage(key: string, value: any) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
  getLocStorage(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeLocStorage(key: string) {
    localStorage.removeItem(key)
  }
  clearLocStorage() {
    localStorage.clear()
  }
}

export default new LocStorage()
