import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './terms-and-conditions.module.css'; // Reusing the same styles

const RefundPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy | Edufast</title>
        <meta name="description" content="Understand Edufast's strict no-refund policy for all consulting and service fees. This page details payment responsibilities and scenarios where refunds are not provided." />
      </Helmet>
      <div className={styles.legalPageContainer}>
        <div className={styles.header}>
          <h1>Refund Policy</h1>
          <p>Last Updated: October 26, 2023</p>
        </div>

        <div className={styles.content}>
          <section>
            <h2>1. Non-Refundable Fee Policy</h2>
            <p>
              All fees paid to Edufast for our educational consulting, application processing, and support services are strictly <strong>non-refundable</strong>. By engaging our services and making a payment, you acknowledge and agree that you will not be entitled to a refund for any reason whatsoever.
            </p>
            <p>
              Our fees compensate us for the extensive work, time, and resources we dedicate to your application and enrollment process from the moment you engage our services. This work is performed regardless of the final outcome of your application.
            </p>
          </section>

          <section>
            <h2>2. Scenarios Where Refunds Will Not Be Provided</h2>
            <p>To provide absolute clarity, refunds will not be issued under any circumstances, including but not limited to the following:</p>
            <ul>
              <li><strong>Change of Mind:</strong> If you decide to withdraw from the program or discontinue our services for any personal reason.</li>
              <li><strong>Application Rejection:</strong> If your application is rejected by a Partner Institution. While we strive to achieve successful outcomes, we do not guarantee admission.</li>
              <li><strong>Failure to Provide Documents:</strong> If you fail to provide the necessary documents or information required for your application within the specified timelines.</li>
              <li><strong>Dissatisfaction with Service:</strong> If you are dissatisfied with the services provided. Our fees are for the process and work performed, not for a guaranteed outcome or level of satisfaction.</li>
              <li><strong>Program Cancellation by Institution:</strong> If a Partner Institution cancels or modifies a program. In such cases, we will endeavor to find a suitable alternative, but no refund of our service fee will be provided.</li>
              <li><strong>Visa Rejection:</strong> For international students, if your student visa application is rejected.</li>
            </ul>
          </section>

          <section>
            <h2>3. Payment Responsibilities and Acknowledgment</h2>
            <p>
              You are responsible for paying all applicable fees in full and on time as per your service agreement. By making a payment, you confirm that you have read, understood, and agreed to this non-refundable policy.
            </p>
            <p>
              We strongly advise you to carefully consider your decision before engaging our services and making any payment. This policy is enforced strictly to ensure the sustainability of our comprehensive support model.
            </p>
          </section>

          <section>
            <h2>4. Chargebacks</h2>
            <p>
              Initiating a chargeback with your bank or credit card company for our non-refundable fees is a violation of our terms of service. We will contest any such chargeback and may pursue legal action to recover the fees, along with any costs incurred in the process.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about our Refund Policy, please contact us before making a payment. You can reach us at <a href="mailto:info@edufast.in">info@edufast.in</a> or call us at <a href="tel:+919538078333">+91 95380 78333</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default RefundPolicyPage;