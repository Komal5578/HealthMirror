import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { 
      toEmail, 
      recipientName,
      recipientType, // 'guider' or 'doctor'
      userName,
      summary,
      healthGoal,
      planName,
      progress,
      chatHistory,
      questionsForDoctor
    } = await request.json();

    // Validate required fields
    if (!toEmail || !summary) {
      return Response.json({ 
        error: 'Email and summary are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
      return Response.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Build email content based on recipient type
    const emailHtml = buildEmailHtml({
      recipientName,
      recipientType,
      userName,
      summary,
      healthGoal,
      planName,
      progress,
      chatHistory,
      questionsForDoctor
    });

    const subject = recipientType === 'doctor' 
      ? `Health Summary for ${userName} - Healthcare Twin Report`
      : `${userName}'s Health Progress Update`;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Healthcare Twin <reports@resend.dev>', // Use your verified domain in production
      to: toEmail,
      subject: subject,
      html: emailHtml,
    });

    if (error) {
      console.error('[Email Error]:', error);
      
      // Check for Resend free tier limitation
      if (error.statusCode === 403 && error.message?.includes('only send testing emails')) {
        return Response.json({ 
          error: 'Resend free tier limitation',
          details: 'With Resend free tier, you can only send emails to the email address you signed up with. To send to others, you need to verify a domain at resend.com/domains.',
          hint: 'For testing, try sending to your own email address.'
        }, { status: 403 });
      }
      
      return Response.json({ 
        error: 'Failed to send email',
        details: error.message 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      messageId: data?.id,
      message: `Email sent successfully to ${toEmail}`
    });

  } catch (error) {
    console.error('[Send Report Error]:', error);
    return Response.json({ 
      error: 'Failed to send report',
      details: error.message 
    }, { status: 500 });
  }
}

function buildEmailHtml({
  recipientName,
  recipientType,
  userName,
  summary,
  healthGoal,
  planName,
  progress,
  chatHistory,
  questionsForDoctor
}) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const greeting = recipientType === 'doctor' 
    ? `Dear Dr. ${recipientName || 'Doctor'},`
    : `Dear ${recipientName || 'Friend'},`;

  const intro = recipientType === 'doctor'
    ? `This is an automated health summary for your patient, ${userName}, generated from the Healthcare Twin health tracking application.`
    : `Here's an update on ${userName}'s health journey! They wanted to share their progress with you.`;

  const questionsSection = questionsForDoctor && questionsForDoctor.length > 0 
    ? `
      <div style="background-color: #FEF3C7; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h3 style="color: #92400E; margin-top: 0;">Questions to Discuss</h3>
        <ul style="color: #78350F; margin: 0; padding-left: 20px;">
          ${questionsForDoctor.map(q => `<li style="margin: 8px 0;">${q}</li>`).join('')}
        </ul>
      </div>
    `
    : '';

  const chatSection = chatHistory && chatHistory.length > 0
    ? `
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Recent Conversation Summary</h3>
        <div style="font-size: 14px; color: #4B5563;">
          ${chatHistory.slice(-5).map(msg => `
            <div style="margin: 12px 0; padding: 10px; background: ${msg.role === 'user' ? '#DBEAFE' : '#ffffff'}; border-radius: 8px;">
              <strong style="color: ${msg.role === 'user' ? '#1D4ED8' : '#059669'};">
                ${msg.role === 'user' ? userName : 'Healthcare Twin'}:
              </strong>
              <p style="margin: 5px 0 0 0;">${msg.content}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1F2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; padding: 30px 0; border-bottom: 1px solid #E5E7EB;">
        <div style="display: inline-block; background-color: #2563EB; padding: 12px; border-radius: 12px; margin-bottom: 15px;">
          <span style="font-size: 24px; color: white;">+</span>
        </div>
        <h1 style="color: #1F2937; margin: 10px 0; font-weight: 500;">Healthcare Twin</h1>
        <p style="color: #6B7280; margin: 0;">${date}</p>
      </div>

      <!-- Greeting -->
      <div style="padding: 30px 0;">
        <p style="font-size: 16px;">${greeting}</p>
        <p style="color: #4B5563;">${intro}</p>
      </div>

      <!-- Health Overview -->
      <div style="background-color: #EFF6FF; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h3 style="color: #1E40AF; margin-top: 0;">Health Overview</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">Health Goal:</td>
            <td style="padding: 8px 0; font-weight: 500; color: #1F2937;">${healthGoal || 'General Fitness'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">Current Plan:</td>
            <td style="padding: 8px 0; font-weight: 500; color: #1F2937;">${planName || 'Personalized Plan'}</td>
          </tr>
          ${progress ? `
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">Progress:</td>
            <td style="padding: 8px 0; font-weight: 500; color: #1F2937;">Day ${progress.currentDay} of ${progress.totalDays}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">Completion Rate:</td>
            <td style="padding: 8px 0; font-weight: 500; color: #059669;">${progress.completionRate || 0}%</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">Current Streak:</td>
            <td style="padding: 8px 0; font-weight: 500; color: #1F2937;">${progress.streak || 0} days</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <!-- Summary -->
      <div style="background-color: #F0FDF4; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h3 style="color: #166534; margin-top: 0;">Summary</h3>
        <div style="color: #166534; white-space: pre-wrap;">${summary}</div>
      </div>

      ${questionsSection}
      ${chatSection}

      <!-- Disclaimer -->
      <div style="background-color: #FEF2F2; padding: 15px; border-radius: 8px; margin: 30px 0;">
        <p style="color: #991B1B; font-size: 12px; margin: 0;">
          <strong>⚠️ Disclaimer:</strong> This report was generated by Healthcare Twin, an AI-assisted health tracking application. 
          The information provided is for informational purposes only and should not be considered medical advice. 
          Please consult with a qualified healthcare professional for medical decisions.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 30px 0; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 12px;">
        <p>This email was sent from Healthcare Twin</p>
        <p>© ${new Date().getFullYear()} Healthcare Twin. All rights reserved.</p>
      </div>

    </body>
    </html>
  `;
}
