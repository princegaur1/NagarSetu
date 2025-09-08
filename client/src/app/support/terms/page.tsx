'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our civic engagement platform.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: September 7, 2025</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Table of Contents */}
          <div className="mb-12 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              <li><a href="#acceptance" className="text-blue-600 hover:text-blue-700">1. Acceptance of Terms</a></li>
              <li><a href="#description" className="text-blue-600 hover:text-blue-700">2. Description of Service</a></li>
              <li><a href="#user-accounts" className="text-blue-600 hover:text-blue-700">3. User Accounts</a></li>
              <li><a href="#acceptable-use" className="text-blue-600 hover:text-blue-700">4. Acceptable Use Policy</a></li>
              <li><a href="#content-guidelines" className="text-blue-600 hover:text-blue-700">5. Content Guidelines</a></li>
              <li><a href="#privacy" className="text-blue-600 hover:text-blue-700">6. Privacy and Data Protection</a></li>
              <li><a href="#intellectual-property" className="text-blue-600 hover:text-blue-700">7. Intellectual Property</a></li>
              <li><a href="#disclaimers" className="text-blue-600 hover:text-blue-700">8. Disclaimers and Limitations</a></li>
              <li><a href="#termination" className="text-blue-600 hover:text-blue-700">9. Termination</a></li>
              <li><a href="#governing-law" className="text-blue-600 hover:text-blue-700">10. Governing Law</a></li>
              <li><a href="#changes" className="text-blue-600 hover:text-blue-700">11. Changes to Terms</a></li>
              <li><a href="#contact" className="text-blue-600 hover:text-blue-700">12. Contact Information</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="acceptance" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>By accessing and using the Nagar Setu platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These Terms of Service ("Terms") govern your use of our civic engagement platform operated by Nagar Setu ("us", "we", or "our").</p>
              </div>
            </section>

            <section id="description" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <div className="space-y-4 text-gray-700">
                <p>Nagar Setu is a civic engagement platform that enables citizens to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Report civic issues and problems in their communities</li>
                  <li>Track the status and progress of reported issues</li>
                  <li>Engage with local government and authorities</li>
                  <li>Participate in community discussions and feedback</li>
                  <li>Access information about local civic matters</li>
                </ul>
                <p>The platform serves as a bridge between citizens and government authorities to improve civic services and community development.</p>
              </div>
            </section>

            <section id="user-accounts" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">Account Creation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate, complete, and current information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One person or entity may maintain only one account</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You must keep your contact information up to date</li>
                  <li>You are responsible for ensuring your account information remains accurate</li>
                </ul>
              </div>
            </section>

            <section id="acceptable-use" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Violate any laws or regulations in your jurisdiction</li>
                  <li>Transmit any harmful, threatening, abusive, or harassing content</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Use automated systems to access the Service without permission</li>
                  <li>Engage in any activity that could harm or compromise the security of the Service</li>
                </ul>
              </div>
            </section>

            <section id="content-guidelines" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content Guidelines</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">User-Generated Content</h3>
                <p>When submitting content (reports, comments, images, etc.), you agree that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You own or have the right to submit the content</li>
                  <li>The content is accurate and truthful to the best of your knowledge</li>
                  <li>The content does not violate any third-party rights</li>
                  <li>The content is relevant to civic issues and community matters</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Prohibited Content</h3>
                <p>You may not submit content that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Is false, misleading, or fraudulent</li>
                  <li>Contains personal information of others without consent</li>
                  <li>Is defamatory, libelous, or slanderous</li>
                  <li>Contains hate speech or discriminatory language</li>
                  <li>Is sexually explicit or inappropriate</li>
                  <li>Violates any applicable laws or regulations</li>
                  <li>Contains spam or promotional content unrelated to civic issues</li>
                </ul>
              </div>
            </section>

            <section id="privacy" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
              <div className="space-y-4 text-gray-700">
                <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
                <p>By using the Service, you consent to the collection and use of information as described in our Privacy Policy.</p>
                <p>We may share your information with relevant government authorities as necessary to process and resolve civic issues you report.</p>
              </div>
            </section>

            <section id="intellectual-property" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">Our Rights</h3>
                <p>The Service and its original content, features, and functionality are owned by Nagar Setu and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Your Rights</h3>
                <p>You retain ownership of content you submit to the Service. However, by submitting content, you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and distribute your content in connection with the Service.</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Third-Party Content</h3>
                <p>The Service may contain content from third parties. We are not responsible for such content and do not endorse or assume any responsibility for third-party content.</p>
              </div>
            </section>

            <section id="disclaimers" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">Service Availability</h3>
                <p>The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Issue Resolution</h3>
                <p>While we facilitate communication between citizens and authorities, we cannot guarantee that reported issues will be resolved or addressed by government authorities. The resolution of civic issues depends on various factors beyond our control.</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Limitation of Liability</h3>
                <p>To the maximum extent permitted by law, Nagar Setu shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the Service.</p>
              </div>
            </section>

            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <p>Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.</p>
                <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, and limitations of liability.</p>
              </div>
            </section>

            <section id="governing-law" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <div className="space-y-4 text-gray-700">
                <p>These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions.</p>
                <p>Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in India.</p>
              </div>
            </section>

            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
              </div>
            </section>

            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p><strong>Email:</strong> <a href="mailto:legal@nagarsetu.com" className="text-blue-600 hover:text-blue-700">legal@nagarsetu.com</a></p>
                  <p><strong>Address:</strong> 123 Civic Center, Main Street, City - 123456</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                These Terms of Service are effective as of September 7, 2025.
              </p>
              <div className="mt-4 sm:mt-0">
                <Link
                  href="/support"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
