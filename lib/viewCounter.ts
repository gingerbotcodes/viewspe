// ============================================
// View Counter & Payout Calculation
// ============================================

export interface EarningsResult {
    earned: number;
    isCapped: boolean;
    cappedAt: number;
    viewCount: number;
    ratePerThousand: number;
}

/**
 * Calculate earnings from view count.
 * @param viewCount - Total views scraped from the platform
 * @param ratePerThousand - Payment rate per 1,000 views (e.g., ₹10)
 * @param maxCap - Maximum payout for this creator on this campaign
 * @returns EarningsResult with calculated earnings
 */
export function calculateEarnings(
    viewCount: number,
    ratePerThousand: number,
    maxCap: number
): EarningsResult {
    const rawEarnings = (viewCount / 1000) * ratePerThousand;
    const isCapped = rawEarnings >= maxCap;
    const earned = isCapped ? maxCap : Math.floor(rawEarnings);

    return {
        earned,
        isCapped,
        cappedAt: maxCap,
        viewCount,
        ratePerThousand,
    };
}

/**
 * Format currency in INR
 */
export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Format view count with abbreviations
 */
export function formatViews(count: number): string {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
}
