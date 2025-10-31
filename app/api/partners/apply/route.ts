import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const required = ['companyName', 'website', 'contactName', 'email', 'partnerType', 'employeeCount', 'description'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // URL validation
    try {
      new URL(data.website);
    } catch {
      return NextResponse.json(
        { error: 'Invalid website URL' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Store the application in a database
    // 2. Send notification emails to the partnership team
    // 3. Send a confirmation email to the applicant
    
    // For now, we'll just log it and return success
    console.log('Partner application received:', {
      company: data.companyName,
      email: data.email,
      type: data.partnerType,
    });

    // TODO: Implement actual storage and email sending
    // await storePartnerApplication(data);
    // await sendPartnerNotification(data);
    // await sendApplicantConfirmation(data.email, data.contactName);

    return NextResponse.json(
      { 
        success: true,
        message: 'Application submitted successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing partner application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}

