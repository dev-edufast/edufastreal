import React from "react";

interface ProcessFAQProps {
  className?: string;
}

export function ProcessFAQ({ className = "" }: ProcessFAQProps) {
  const faqs = [
    {
      question: "How long does the admission process take?",
      answer: "The admission process typically takes 2-3 business days after document submission."
    },
    {
      question: "What documents are required?",
      answer: "You need to submit your academic transcripts, ID proof, and passport-sized photographs."
    },
    {
      question: "Is there an application fee?",
      answer: "No, there is no application fee. You only pay the course fees after admission confirmation."
    },
    {
      question: "Can I track my application status?",
      answer: "Yes, you can track your application status in real-time through your student dashboard."
    }
  ];

  return (
    <section className={`process-faq ${className}`}>
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessFAQ;
