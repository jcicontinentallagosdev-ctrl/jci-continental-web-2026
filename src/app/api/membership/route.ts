import { NextResponse } from 'next/server';

/*
 * ============================================================
 * GOOGLE APPS SCRIPT SETUP GUIDE
 * ============================================================
 *
 * 1. Create a new Google Sheet. Name it "JCI Membership Applications".
 *    Add these column headers in row 1:
 *
 *    A: Timestamp
 *    B: Full Name
 *    C: Email
 *    D: Phone
 *    E: Nickname
 *    F: Date of Birth
 *    G: Sex
 *    H: Location
 *    I: Current Employer
 *    J: Job Role
 *    K: Entrepreneur
 *    L: Industry
 *    M: Was Collegiate Member
 *    N: Collegiate Org
 *    O: Is Current Member
 *    P: Current Org
 *    Q: How Did You Know
 *
 * 2. Open Extensions > Apps Script.
 *
 * 3. Replace the default Code.gs content with the script in
 *    /scripts/google-apps-script.js
 *
 * 4. Click Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *
 * 5. Copy the Web App URL and add it to your .env.local:
 *
 *    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 *
 * ============================================================
 */

interface MembershipPayload {
  fullName: string;
  email: string;
  phone: string;
  nickname: string;
  dateOfBirth: string;
  sex: string;
  location: string;
  currentEmployer: string;
  jobRole: string;
  entrepreneur: string;
  industry: string;
  wasCollegiateMember: string;
  collegiateOrg: string;
  isCurrentMember: string;
  currentOrg: string;
  howDidYouKnow: string;
}

const REQUIRED_FIELDS: (keyof MembershipPayload)[] = [
  'fullName',
  'email',
  'phone',
  'dateOfBirth',
  'sex',
  'location',
  'currentEmployer',
  'wasCollegiateMember',
  'isCurrentMember',
];

export async function POST(request: Request) {
  try {
    const body: MembershipPayload = await request.json();

    const missing = REQUIRED_FIELDS.filter(f => !body[f]?.trim());
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Use text/plain to avoid Google's CORS/preflight issues with
    // application/json. The Apps Script reads e.postData.contents
    // as a raw string and JSON.parse()s it regardless of Content-Type.
    // Use redirect: 'manual' so the 302 isn't followed -- the script
    // has already executed and appended the row by the time Google
    // returns the redirect.
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
      redirect: 'manual',
    });

    // 302 = Google processed the script and is redirecting to the
    // response page. 200 = direct response. Both mean success.
    if (response.status !== 302 && response.status !== 200) {
      const text = await response.text().catch(() => '');
      throw new Error(
        `Google Script responded with status ${response.status}: ${text}`
      );
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Membership submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
