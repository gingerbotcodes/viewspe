// ============================================
// ViewsPeCash Database Types
// ============================================

export type CampaignStatus = 'active' | 'paused' | 'completed' | 'draft';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'earning' | 'capped';
export type TransactionType = 'earning' | 'payout' | 'refund';
export type Platform = 'youtube_shorts' | 'instagram_reels' | 'both';

export interface Campaign {
    id: string;
    advertiser_id: string;
    title: string;
    description: string;
    script: string;
    video_asset_url: string;
    platform: Platform;
    rate_per_thousand: number; // e.g., 10 means ₹10 per 1k views
    budget_cap: number;        // max total spend for this campaign
    max_payout_per_creator: number;
    spent: number;
    status: CampaignStatus;
    created_at: string;
    updated_at: string;
}

export interface Creator {
    id: string;
    user_id: string;
    name: string;
    phone: string;
    email: string | null;
    avatar_url: string | null;
    instagram_handle: string | null;
    youtube_handle: string | null;
    total_earnings: number;
    balance: number;
    created_at: string;
}

export interface Submission {
    id: string;
    campaign_id: string;
    creator_id: string;
    link: string;
    platform: Platform;
    status: SubmissionStatus;
    admin_notes: string | null;
    view_count: number;
    earned: number;
    last_scraped_at: string | null;
    submitted_at: string;
    approved_at: string | null;
    campaign?: Campaign;  // joined
    creator?: Creator;    // joined
}

export interface Transaction {
    id: string;
    creator_id: string;
    submission_id: string | null;
    type: TransactionType;
    amount: number;
    description: string;
    created_at: string;
}

// Mock data for development before Supabase is connected
export const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: '1',
        advertiser_id: 'adv_1',
        title: 'Ludo King Promo',
        description: 'Create a fun reel playing Ludo King with friends. Show the app download and first game.',
        script: '1. Open with "Found the best timepass app!" \n2. Show gameplay \n3. End with "Download from link in bio"',
        video_asset_url: '#',
        platform: 'instagram_reels',
        rate_per_thousand: 50,
        budget_cap: 100000,
        max_payout_per_creator: 5000,
        spent: 23400,
        status: 'active',
        created_at: '2026-02-01T00:00:00Z',
        updated_at: '2026-02-01T00:00:00Z',
    },
    {
        id: '2',
        advertiser_id: 'adv_2',
        title: 'CryptoTrade App Review',
        description: 'Do an honest review of the CryptoTrade app showing real-time trading features.',
        script: '1. Start with "Best crypto app for beginners?" \n2. Show the UI, place a demo trade \n3. "Link in bio to start free"',
        video_asset_url: '#',
        platform: 'youtube_shorts',
        rate_per_thousand: 100,
        budget_cap: 200000,
        max_payout_per_creator: 10000,
        spent: 56000,
        status: 'active',
        created_at: '2026-02-03T00:00:00Z',
        updated_at: '2026-02-03T00:00:00Z',
    },
    {
        id: '3',
        advertiser_id: 'adv_1',
        title: 'FitTrack Band Unboxing',
        description: 'Unbox the FitTrack fitness band and show step counting, heart rate monitoring features.',
        script: '1. "Just got this for ₹999!" \n2. Unbox and wear it \n3. Show features on phone app \n4. "Worth it? 100%"',
        video_asset_url: '#',
        platform: 'both',
        rate_per_thousand: 30,
        budget_cap: 50000,
        max_payout_per_creator: 3000,
        spent: 0,
        status: 'active',
        created_at: '2026-02-05T00:00:00Z',
        updated_at: '2026-02-05T00:00:00Z',
    },
    {
        id: '4',
        advertiser_id: 'adv_3',
        title: 'SnackBox Monthly Subscription',
        description: 'Open your SnackBox subscription and taste-test at least 3 snacks on camera.',
        script: '1. "My monthly snack box is here!" \n2. Open and show all snacks \n3. Taste test 3 favorites \n4. "Use code CREATOR20 for 20% off"',
        video_asset_url: '#',
        platform: 'instagram_reels',
        rate_per_thousand: 20,
        budget_cap: 80000,
        max_payout_per_creator: 2000,
        spent: 12000,
        status: 'active',
        created_at: '2026-02-07T00:00:00Z',
        updated_at: '2026-02-07T00:00:00Z',
    },
    {
        id: '5',
        advertiser_id: 'adv_2',
        title: 'LearnCode Bootcamp Ad',
        description: 'Share your coding journey and recommend LearnCode\'s 3-month web dev bootcamp.',
        script: '1. "How I started my coding career" \n2. Show your projects \n3. "This bootcamp made it possible" \n4. CTA with link',
        video_asset_url: '#',
        platform: 'youtube_shorts',
        rate_per_thousand: 75,
        budget_cap: 150000,
        max_payout_per_creator: 7500,
        spent: 34000,
        status: 'active',
        created_at: '2026-02-08T00:00:00Z',
        updated_at: '2026-02-08T00:00:00Z',
    },
];

export const MOCK_SUBMISSIONS: Submission[] = [
    {
        id: 'sub_1',
        campaign_id: '1',
        creator_id: 'cr_1',
        link: 'https://www.instagram.com/reel/abc123',
        platform: 'instagram_reels',
        status: 'earning',
        admin_notes: null,
        view_count: 45200,
        earned: 2260,
        last_scraped_at: '2026-02-09T12:00:00Z',
        submitted_at: '2026-02-02T10:30:00Z',
        approved_at: '2026-02-02T14:00:00Z',
    },
    {
        id: 'sub_2',
        campaign_id: '2',
        creator_id: 'cr_1',
        link: 'https://youtube.com/shorts/xyz789',
        platform: 'youtube_shorts',
        status: 'pending',
        admin_notes: null,
        view_count: 0,
        earned: 0,
        last_scraped_at: null,
        submitted_at: '2026-02-09T16:00:00Z',
        approved_at: null,
    },
    {
        id: 'sub_3',
        campaign_id: '3',
        creator_id: 'cr_2',
        link: 'https://www.instagram.com/reel/def456',
        platform: 'instagram_reels',
        status: 'approved',
        admin_notes: 'Great content, approved!',
        view_count: 1200,
        earned: 36,
        last_scraped_at: '2026-02-09T10:00:00Z',
        submitted_at: '2026-02-06T08:00:00Z',
        approved_at: '2026-02-06T12:00:00Z',
    },
    {
        id: 'sub_4',
        campaign_id: '1',
        creator_id: 'cr_3',
        link: 'https://www.instagram.com/reel/ghi789',
        platform: 'instagram_reels',
        status: 'rejected',
        admin_notes: 'Video does not follow script guidelines. Please re-submit.',
        view_count: 0,
        earned: 0,
        last_scraped_at: null,
        submitted_at: '2026-02-08T14:00:00Z',
        approved_at: null,
    },
    {
        id: 'sub_5',
        campaign_id: '5',
        creator_id: 'cr_1',
        link: 'https://youtube.com/shorts/learn123',
        platform: 'youtube_shorts',
        status: 'pending',
        admin_notes: null,
        view_count: 0,
        earned: 0,
        last_scraped_at: null,
        submitted_at: '2026-02-10T01:00:00Z',
        approved_at: null,
    },
];
