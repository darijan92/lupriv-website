import type { Access } from 'payload'

/** Public read for frontend content. */
export const anyone: Access = () => true

/** Authenticated users only (admin writes). */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
