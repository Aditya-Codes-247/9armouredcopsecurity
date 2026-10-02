export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      corporate,
      corporateEntity,
      officer,
      officerName,
      email,
      phone,
      service,
      ndaChecked,
      ndaRequired,
      requirements,
    } = req.body || {};

    const entityName = corporate || corporateEntity || 'Unspecified Corporate Entity';
    const contactOfficer = officer || officerName || 'Unspecified Officer';
    const contactPhone = phone || 'Not Provided';
    const contactEmail = email || 'Not Provided';
    const requestedService = service || 'General Operational Security Enquiry/Audit';
    const isNdaRequired =
      ndaChecked !== undefined
        ? ndaChecked
        : ndaRequired !== undefined
          ? ndaRequired
          : true;

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    const message = [
      `[9 ARMOURED COP SECURITY SERVICE - OPERATIONAL ENQUIRY/AUDIT DIRECTIVE]`,
      `🏢 Corporate Entity: ${entityName}`,
      `👤 Designated Officer: ${contactOfficer}`,
      `📞 Direct Mobile: ${contactPhone}`,
      `✉️ Official Email: ${contactEmail}`,
      `🛡️ Service Scope: ${requestedService}`,
      `🔒 Mutual NDA Required: ${isNdaRequired ? 'YES (Strict Prerequisite)' : 'NO'}`,
      requirements ? `📋 Requirements: ${requirements}` : null,
      `⏱️ Timestamp: ${timestamp}`,
    ]
      .filter(Boolean)
      .join('\n');

    const ntfyResponse = await fetch('https://ntfy.sh/9armouredcopsecurity', {
      method: 'POST',
      body: message,
      headers: {
        Title: '9 Armoured Cop - Enquiry/Audit Directive Transmitted',
        Priority: 'urgent',
        Tags: 'shield,rotating_light,briefcase',
      },
    });

    if (!ntfyResponse.ok) {
      const errorText = await ntfyResponse.text();
      console.warn(
        'ntfy.sh responded with non-200 status:',
        ntfyResponse.status,
        errorText
      );
    }

    return res.status(200).json({
      success: true,
      message:
        'Enquiry/Audit directive transmitted successfully to 9 Armoured Cop Security Directorate.',
      directiveRef: `9AC-${Date.now().toString().slice(-6)}`,
    });
  } catch (error) {
    console.error('Error dispatching audit directive:', error);
    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        'Failed to dispatch enquiry/audit directive via backend service.',
    });
  }
}
