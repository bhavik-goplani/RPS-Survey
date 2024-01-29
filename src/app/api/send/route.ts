import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const link = body['link'];
    const email = body['participant_email'];
    const password = body['password'];

    try {
        const data = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: 'noreply@rps-survey.info',
            to: [email],
            subject: 'Link for the Survey',
            html: `<h1>Welcome to the Rock Paper Scissors Survey!</h1><p>Please click the link below to start the survey. You can save your progress and come back to the survey at any time. Your username is ${email} and password is ${password}</p><br /><a href="${link}">Start Survey</a>`,
            }),
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
