import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Brevo API configuration
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY) {
      console.error("Brevo API key not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Add contact to Brevo list
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name,
          MESSAGE: message,
        },
        listIds: BREVO_LIST_ID ? [parseInt(BREVO_LIST_ID)] : [],
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error("Brevo API error:", errorData);
      
      // If contact already exists, try to update instead
      if (brevoResponse.status === 400 && errorData.code === "contact_already_exists") {
        const updateResponse = await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "api-key": BREVO_API_KEY,
            },
            body: JSON.stringify({
              attributes: {
                FIRSTNAME: name,
                MESSAGE: message,
              },
            }),
          }
        );

        if (!updateResponse.ok) {
          const updateError = await updateResponse.json();
          console.error("Brevo update error:", updateError);
          return NextResponse.json(
            { error: "Failed to update contact" },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Failed to add contact" },
          { status: 500 }
        );
      }
    }

    // Optionally send a transactional email
    if (process.env.BREVO_SENDER_EMAIL && process.env.BREVO_SENDER_NAME) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: {
            email: process.env.BREVO_SENDER_EMAIL,
            name: process.env.BREVO_SENDER_NAME,
          },
          to: [
            {
              email: process.env.BREVO_NOTIFICATION_EMAIL || "bilel.ab@esprit.tn",
              name: "Bilel Abbassi",
            },
          ],
          subject: `Nouveau message du portfolio de ${name}`,
          htmlContent: `
            <h2>Nouveau message du formulaire de contact</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}