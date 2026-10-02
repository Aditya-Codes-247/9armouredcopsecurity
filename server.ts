import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON and form payloads
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: '9 Armoured Cop Security Service Backend' });
  });

  // Backend endpoint to process and send audit directive to ntfy.sh
  app.post('/api/audit-directive', async (req, res) => {
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
        requirements
      } = req.body;

      const entityName = corporate || corporateEntity || 'Unspecified Corporate Entity';
      const contactOfficer = officer || officerName || 'Unspecified Officer';
      const contactPhone = phone || 'Not Provided';
      const contactEmail = email || 'Not Provided';
      const requestedService = service || 'General Operational Security Enquiry/Audit';
      const isNdaRequired = ndaChecked !== undefined ? ndaChecked : (ndaRequired !== undefined ? ndaRequired : true);

      const timestamp = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium'
      });

      // Format payload matching: curl -d "<Message Here>" ntfy.sh/9armouredcopsecurity
      const message = [
        `[9 ARMOURED COP SECURITY SERVICE - OPERATIONAL ENQUIRY/AUDIT DIRECTIVE]`,
        `🏢 Corporate Entity: ${entityName}`,
        `👤 Designated Officer: ${contactOfficer}`,
        `📞 Direct Mobile: ${contactPhone}`,
        `✉️ Official Email: ${contactEmail}`,
        `🛡️ Service Scope: ${requestedService}`,
        `🔒 Mutual NDA Required: ${isNdaRequired ? 'YES (Strict Prerequisite)' : 'NO'}`,
        requirements ? `📋 Requirements: ${requirements}` : null,
        `⏱️ Timestamp: ${timestamp}`
      ].filter(Boolean).join('\n');

      console.log('Sending notification to ntfy.sh/9armouredcopsecurity...');
      console.log(message);

      // Send POST request directly from backend to ntfy.sh
      const ntfyResponse = await fetch('https://ntfy.sh/9armouredcopsecurity', {
        method: 'POST',
        body: message,
        headers: {
          'Title': '9 Armoured Cop - Enquiry/Audit Directive Transmitted',
          'Priority': 'urgent',
          'Tags': 'shield,rotating_light,briefcase',
        }
      });

      if (!ntfyResponse.ok) {
        const errorText = await ntfyResponse.text();
        console.warn('ntfy.sh responded with non-200 status:', ntfyResponse.status, errorText);
      } else {
        console.log('Successfully dispatched audit directive to ntfy.sh/9armouredcopsecurity');
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry/Audit directive transmitted successfully to 9 Armoured Cop Security Directorate.',
        directiveRef: `9AC-${Date.now().toString().slice(-6)}`
      });
    } catch (error: any) {
      console.error('Error dispatching audit directive:', error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'Failed to dispatch enquiry/audit directive via backend service.'
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`9 Armoured Cop Security server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
