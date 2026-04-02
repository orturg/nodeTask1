import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Reset password',
        html: `
            <h2>Reset token:</h2>
            <p>${token}</p>
        `,
    });
}
