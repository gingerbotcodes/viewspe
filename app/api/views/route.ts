import { NextRequest, NextResponse } from 'next/server';
import { calculateEarnings } from '@/lib/viewCounter';

/**
 * POST /api/views
 * Called by the external Python/Puppeteer scraper service to update view counts.
 * 
 * Body: { submissionId: string, viewCount: number }
 * 
 * This endpoint:
 * 1. Updates the submission's view_count
 * 2. Recalculates earnings based on campaign rate & max cap
 * 3. Returns the updated submission data
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { submissionId, viewCount } = body;

        if (!submissionId || typeof viewCount !== 'number') {
            return NextResponse.json(
                { error: 'Missing required fields: submissionId, viewCount' },
                { status: 400 }
            );
        }

        // TODO: Replace with Supabase queries when connected
        // 1. Fetch submission + campaign
        // const supabase = createClient();
        // const { data: submission } = await supabase
        //   .from('submissions')
        //   .select('*, campaigns(*)')
        //   .eq('id', submissionId)
        //   .single();

        // Mock campaign data for now
        const mockRatePerThousand = 50;
        const mockMaxCap = 5000;

        // 2. Calculate earnings
        const result = calculateEarnings(viewCount, mockRatePerThousand, mockMaxCap);

        // 3. Update submission
        // await supabase
        //   .from('submissions')
        //   .update({
        //     view_count: viewCount,
        //     earned: result.earned,
        //     status: result.isCapped ? 'capped' : 'earning',
        //     last_scraped_at: new Date().toISOString(),
        //   })
        //   .eq('id', submissionId);

        // 4. Create/update transaction
        // await supabase
        //   .from('transactions')
        //   .upsert({
        //     creator_id: submission.creator_id,
        //     submission_id: submissionId,
        //     type: 'earning',
        //     amount: result.earned,
        //     description: `Earning from ${viewCount} views`,
        //   });

        return NextResponse.json({
            success: true,
            submissionId,
            ...result,
        });
    } catch (error) {
        console.error('View counter API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/views?submissionId=xxx
 * Returns current view count and earnings for a submission.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
        return NextResponse.json(
            { error: 'Missing submissionId parameter' },
            { status: 400 }
        );
    }

    // TODO: Replace with Supabase query
    return NextResponse.json({
        submissionId,
        viewCount: 45200,
        earned: 2260,
        status: 'earning',
        lastScrapedAt: new Date().toISOString(),
    });
}
