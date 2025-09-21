export interface UserVisitData {
  version: number
  hasSeenLandingPage: boolean
  lastVisit: number
  firstVisit: number
  streak: number          // current streak count
  streakLastUpdated: number   // last time streak was updated
}

export class UserTracker {
  private static readonly STORAGE_KEY = "mindfulness-user-data"
  private static readonly VERSION = 2
  private static readonly ONE_DAY_MS = 24 * 60 * 60 * 1000
  private static cache: UserVisitData | null = null

  // -------------------------------
  // Helpers
  // -------------------------------
  private static createDefaultData(): UserVisitData {
    const now = Date.now()
    return {
      version: this.VERSION,
      hasSeenLandingPage: false,
      lastVisit: now,
      firstVisit: now,
      streak: 1,
      streakLastUpdated: now,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static validateData(data: any): data is UserVisitData {
    return (
      typeof data === "object" &&
      data !== null &&
      typeof data.version === "number" &&
      typeof data.hasSeenLandingPage === "boolean" &&
      typeof data.lastVisit === "number" &&
      typeof data.firstVisit === "number" &&
      typeof data.streak === "number" &&
      typeof data.streakLastUpdated === "number"
    )
  }

  // -------------------------------
  // Core
  // -------------------------------
  static getUserData(): UserVisitData {
    if (typeof window === "undefined") {
      return this.createDefaultData()
    }

    if (this.cache) return this.cache

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) {
      const fresh = this.createDefaultData()
      this.saveUserData(fresh)
      return fresh
    }

    try {
      const parsed = JSON.parse(stored)
      if (this.validateData(parsed) && parsed.version === this.VERSION) {
        this.cache = parsed
        return parsed
      }
      // fallback if version mismatch or invalid
      const fresh = this.createDefaultData()
      this.saveUserData(fresh)
      return fresh
    } catch {
      const fresh = this.createDefaultData()
      this.saveUserData(fresh)
      return fresh
    }
  }

  static saveUserData(data: UserVisitData): void {
    if (typeof window === "undefined") return
    this.cache = data
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
  }

  // -------------------------------
  // Public API
  // -------------------------------
  static shouldShowLandingPage(): boolean {
    const userData = this.getUserData()
    if (!userData.hasSeenLandingPage) return true

    const daysSinceLastVisit = (Date.now() - userData.lastVisit) / this.ONE_DAY_MS
    return daysSinceLastVisit >= 7
  }

  static markLandingPageSeen(): void {
    const userData = this.getUserData()
    userData.hasSeenLandingPage = true
    this.updateLastVisit()
  }

  static updateLastVisit(): void {
    const userData = this.getUserData()
    const now = Date.now()

    const daysSinceLastVisit = Math.floor((now - userData.lastVisit) / this.ONE_DAY_MS)

    if (daysSinceLastVisit === 1) {
      // visited on consecutive days → streak++
      userData.streak += 1
      userData.streakLastUpdated = now
    } else if (daysSinceLastVisit > 1) {
      // streak broken → reset
      userData.streak = 1
      userData.streakLastUpdated = now
    }
    // if daysSinceLastVisit === 0 → same day, streak unchanged

    userData.lastVisit = now
    this.saveUserData(userData)
  }

  static getDaysSinceFirstVisit(): number {
    const userData = this.getUserData()
    return Math.floor((Date.now() - userData.firstVisit) / this.ONE_DAY_MS)
  }

  static getDaysSinceLastVisit(): number {
    const userData = this.getUserData()
    return Math.floor((Date.now() - userData.lastVisit) / this.ONE_DAY_MS)
  }

  static getDaysstreak(): number {
    const userData = this.getUserData()
    return userData.streak
  }

  static resetUserData(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.STORAGE_KEY)
    this.cache = null
  }
}
