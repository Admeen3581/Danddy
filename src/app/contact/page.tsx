import './contact.css'

export default function Contact() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>
                We'd love to hear from you! Whether you have a question, feedback, or just want to chat about Dungeons & Dragons, feel free to reach out.
            </p>

            <section className="contact-info">
                <h2>Contact Information</h2>
                <p>
                    <a href="mailto:danddysmmith@gmail.com">danddysmmith@gmail.com </a>
                </p>
            </section>

            <section className="feedback">
                <p>
                    Your feedback is important to us! Please let us know how we can improve your experience.
                </p>
            </section>
        </div>
    );
};