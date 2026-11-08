import { useCallback, useEffect, useRef, useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import NeuButton from '../ui/NeuButton';
import NeuCard from '../ui/NeuCard';
import NeuInput from '../ui/NeuInput';

function Contact({ variant = 'section', isActive = true, revealKey }) {
  const revealRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const shouldReduceMotion = usePrefersReducedMotion();
  const shouldReveal = isActive;
  const replayKey = revealKey;

  useGsapReveal(revealRef, shouldReveal, shouldReduceMotion, [
    { selector: '.contact-reveal', delay: 0.05, stagger: 0.08 },
    { selector: '.contact-card', delay: 0.14, stagger: 0.08 },
    { selector: '.contact-form', delay: 0.18 },
    { selector: '.contact-field', delay: 0.22, stagger: 0.08 },
    { selector: '.contact-button', delay: 0.28 },
  ], replayKey);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Re-added the handleSubmit logic here for clarity and to ensure it's using the latest state
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        let errorPayload;
        try {
          errorPayload = await response.json();
        } catch (e) {
          errorPayload = {};
        }
        const message = errorPayload?.error ? String(errorPayload.error) : 'An unknown error occurred';
        setErrorMessage(message);
        setStatus('error');
      }
    } catch (err) {
      console.error("The magic failed:", err);
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }, [formData]); // Ensure formData is a dependency if it affects the fetch body

  // Removed the previous status message display and integrated it into the button logic for cleaner UX
  // The success/error messages are now conditionally rendered below the button.

  return (
    <SectionWrapper id="contact" className="contact-section bg-white" variant={variant}>
      <div ref={revealRef} className="contact-content grid w-full items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="pt-8">
          <div className="flex items-start justify-between gap-4">
            <div className="contact-reveal">
              <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-gray-400">
                Contact
              </p>
              <h2 className="font-heading text-4xl font-semibold leading-[0.9] tracking-[0.03em] text-[var(--ink-main)] md:text-5xl">
                Contact
              </h2>
            </div>
          </div>

          <p className="contact-reveal mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Based in Vadakkancherry, Palakkad, Kerala. Available for collaborative projects, internships, and
            full-stack builds.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { label: 'Email', val: 'naji03rahman@gmail.com' },
              { label: 'LinkedIn', val: 'https://www.linkedin.com/in/a-b-najeeb-rahman' },
              { label: 'GitHub', val: 'https://github.com/Sayonarakoto' },
            ].map((link) => (
              <NeuCard
                key={link.label}
                className="contact-card flex items-start justify-between gap-4 rounded-2xl border-l-[3px] border-l-gray-200 px-5 py-5"
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  {link.label}
                </span>
                <span className="text-right text-sm font-medium text-gray-900">
                  {link.val}
                </span>
              </NeuCard>
            ))}
          </div>
        </div>

        <div className="lg:mt-0">
          <NeuCard
            as="form"
            onSubmit={handleSubmit}
            className="contact-form rounded-[1.5rem] p-10"
          >
            <h3 className="border-b border-gray-900 pb-4 font-heading text-3xl font-semibold text-gray-900">
              Message
            </h3>

            <div className="mt-6 space-y-5">
              <NeuInput label="Name" className="contact-field" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
              <NeuInput label="Email" className="contact-field" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
              <NeuInput label="Message" className="contact-field" as="textarea" rows="4" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell me about your project" />
            </div>

            <NeuButton
              type="submit"
              disabled={status === 'sending'}
              className="contact-button mt-8 w-full justify-center px-5 py-3 text-[10px] uppercase tracking-[0.2em] disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </NeuButton>

            {status === 'success' && (
              <p className="mt-4 italic text-gray-900">
                Your message has been sent successfully!
              </p>
            )}

            {status === 'error' && (
              <p className="mt-4 italic text-red-600">
                Failed to send message{errorMessage ? `: ${errorMessage}` : ''}. Please try again.
              </p>
            )}
          </NeuCard>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Contact;
