
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Privacy & Policy
      </h1>
      <p className="text-muted-foreground mb-8">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information when using our ride booking
        platform.
      </p>

      {/* Section 1 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">1. Information We Collect</h2>
        <p className="text-muted-foreground">
          We collect personal information such as your name, phone number, email
          address, and ride details. Location data is collected during rides to
          provide accurate pickup, drop-off, and live tracking.
        </p>
      </div>

      {/* Section 2 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>To provide ride booking and tracking services.</li>
          <li>To process payments securely.</li>
          <li>To communicate updates about your rides.</li>
          <li>To improve our services and user experience.</li>
        </ul>
      </div>

      {/* Section 3 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">3. Data Sharing & Security</h2>
        <p className="text-muted-foreground">
          We do not sell or rent your personal data. Limited information is
          shared with drivers to complete your ride. All data is protected with
          secure encryption and stored safely.
        </p>
      </div>

      {/* Section 4 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">4. Your Rights</h2>
        <p className="text-muted-foreground">
          You can update or delete your profile information anytime. You also
          have the right to request a copy of your personal data stored with us.
        </p>
      </div>

      {/* Section 5 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary mb-2">5. Updates to This Policy</h2>
        <p className="text-muted-foreground">
          We may update this Privacy Policy from time to time. Any changes will
          be notified via our app or website. Continued use of our services
          means you accept the updated terms.
        </p>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-xl font-semibold text-primary mb-2">Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions regarding our Privacy Policy, please contact
          us at: <span className="font-medium text-foreground">support@ridemate.com</span>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
