/**
 * Google Apps Script — paste this into your Google Sheet's Apps Script editor.
 *
 * Setup:
 *   1. Open your Google Sheet ("JCI Membership Applications").
 *   2. Add these column headers in row 1:
 *      A: TimesNtamp | B: Full Name | C: Email | D: Phone | E: Nickname
 *      F: Date of Birth | G: Sex | H: Location | I: Current Employer
 *      J: Job Role | K: Entrepreneur | L: Industry
 *      M: Was Collegiate Member | N: Collegiate Org
 *      O: Is Current Member | P: Current Org | Q: How Did You Know
 *   3. Go to Extensions > Apps Script, replace Code.gs with this file.
 *   4. Deploy > New deployment > Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   5. Copy the URL into .env.local as GOOGLE_SCRIPT_URL.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date().toISOString(),
    data.fullName,
    data.email,
    data.phone,
    data.nickname || '',
    data.dateOfBirth,
    data.sex,
    data.location,
    data.currentEmployer,
    data.jobRole || '',
    data.entrepreneur || '',
    data.industry || '',
    data.wasCollegiateMember,
    data.collegiateOrg || '',
    data.isCurrentMember,
    data.currentOrg || '',
    data.howDidYouKnow || '',
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}
