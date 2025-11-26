import rateLimit from "express-rate-limit"
import type { Options } from "express-rate-limit"

const options: Partial<Options> = {
    standardHeaders: "draft-6",
    legacyHeaders: false,
    ipv6Subnet: 48,
    message: { error: "Too many requests, please try again later." },
}

export const globalBurstLimit = rateLimit({
    ...options,
    windowMs: 1_000,
    limit: 10,
})

export const globalRateLimit = rateLimit({
    ...options,
    windowMs: 60_000,
    limit: 50,
})

export const authRatelimit = rateLimit({
    ...options,
    windowMs: 600_000,
    limit: 30,
})
