import {
    Campaign,
    Creator,
    Submission,
    Transaction,
    MOCK_CAMPAIGNS,
    MOCK_SUBMISSIONS,
    SubmissionStatus,
} from './types';

// ============================================
// Campaign Queries
// ============================================

export async function getCampaigns(): Promise<Campaign[]> {
    // TODO: Replace with Supabase query
    // const supabase = createClient();
    // const { data } = await supabase.from('campaigns').select('*').eq('status', 'active');
    return MOCK_CAMPAIGNS;
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
    // TODO: Replace with Supabase query
    return MOCK_CAMPAIGNS.find(c => c.id === id) || null;
}

// ============================================
// Submission Queries
// ============================================

export async function getSubmissionsByCreator(creatorId: string): Promise<Submission[]> {
    // TODO: Replace with Supabase query
    return MOCK_SUBMISSIONS.filter(s => s.creator_id === creatorId).map(s => ({
        ...s,
        campaign: MOCK_CAMPAIGNS.find(c => c.id === s.campaign_id),
    }));
}

export async function getPendingSubmissions(): Promise<Submission[]> {
    // TODO: Replace with Supabase query
    return MOCK_SUBMISSIONS.filter(s => s.status === 'pending').map(s => ({
        ...s,
        campaign: MOCK_CAMPAIGNS.find(c => c.id === s.campaign_id),
    }));
}

export async function getAllSubmissions(): Promise<Submission[]> {
    return MOCK_SUBMISSIONS.map(s => ({
        ...s,
        campaign: MOCK_CAMPAIGNS.find(c => c.id === s.campaign_id),
    }));
}

export async function createSubmission(data: {
    campaign_id: string;
    creator_id: string;
    link: string;
    platform: 'youtube_shorts' | 'instagram_reels' | 'both';
}): Promise<Submission> {
    // TODO: Replace with Supabase insert
    const newSubmission: Submission = {
        id: `sub_${Date.now()}`,
        ...data,
        status: 'pending',
        admin_notes: null,
        view_count: 0,
        earned: 0,
        last_scraped_at: null,
        submitted_at: new Date().toISOString(),
        approved_at: null,
    };
    MOCK_SUBMISSIONS.push(newSubmission);
    return newSubmission;
}

export async function updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
    notes?: string
): Promise<void> {
    // TODO: Replace with Supabase update
    const sub = MOCK_SUBMISSIONS.find(s => s.id === id);
    if (sub) {
        sub.status = status;
        if (notes) sub.admin_notes = notes;
        if (status === 'approved') sub.approved_at = new Date().toISOString();
    }
}

// ============================================
// Creator Queries
// ============================================

export async function getCreatorProfile(userId: string): Promise<Creator | null> {
    // TODO: Replace with Supabase query
    return {
        id: 'cr_1',
        user_id: userId,
        name: 'Rahul Creator',
        phone: '+91 98765 43210',
        email: 'rahul@example.com',
        avatar_url: null,
        instagram_handle: '@rahul_creates',
        youtube_handle: '@RahulCreates',
        total_earnings: 15600,
        balance: 8400,
        created_at: '2026-01-15T00:00:00Z',
    };
}

// ============================================
// Stats
// ============================================

export async function getCreatorStats(creatorId: string) {
    const submissions = await getSubmissionsByCreator(creatorId);
    return {
        totalEarnings: submissions.reduce((sum, s) => sum + s.earned, 0),
        activeGigs: submissions.filter(s => s.status === 'earning' || s.status === 'approved').length,
        pendingApprovals: submissions.filter(s => s.status === 'pending').length,
        totalViews: submissions.reduce((sum, s) => sum + s.view_count, 0),
    };
}

export async function getAdminStats() {
    const allSubmissions = await getAllSubmissions();
    return {
        pendingApprovals: allSubmissions.filter(s => s.status === 'pending').length,
        totalCampaigns: MOCK_CAMPAIGNS.length,
        activeCampaigns: MOCK_CAMPAIGNS.filter(c => c.status === 'active').length,
        totalSubmissions: allSubmissions.length,
        totalSpent: MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.spent, 0),
    };
}
