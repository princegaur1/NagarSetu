'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              <li><a href="#information-we-collect" className="text-blue-600 hover:text-blue-700">1. Information We Collect</a></li>
              <li><a href="#how-we-use-information" className="text-blue-600 hover:text-blue-700">2. How We Use Your Information</a></li>
              <li><a href="#information-sharing" className="text-blue-600 hover:text-blue-700">3. Information Sharing and Disclosure</a></li>
              <li><a href="#data-security" className="text-blue-600 hover:text-blue-700">4. Data Security</a></li>
              <li><a href="#your-rights" className="text-blue-600 hover:text-blue-700">5. Your Rights and Choices</a></li>
              <li><a href="#cookies" className="text-blue-600 hover:text-blue-700">6. Cookies and Tracking</a></li>
              <li><a href="#data-retention" className="text-blue-600 hover:text-blue-700">7. Data Retention</a></li>
              <li><a href="#children-privacy" className="text-blue-600 hover:text-blue-700">8. Children's Privacy</a></li>
              <li><a href="#policy-changes" className="text-blue-600 hover:text-blue-700">9. Changes to This Policy</a></li>
              <li><a href="#contact-us" className="text-blue-600 hover:text-blue-700">10. Contact Us</a></li>
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section id="information-we-collect" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p>When you use our platform, we may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, phone number, and password</li>
                  <li><strong>Profile Information:</strong> Profile picture, location, and other details you choose to provide</li>
                  <li><strong>Issue Reports:</strong> Descriptions, images, location data, and other information you submit when reporting civic issues</li>
                  <li><strong>Communication Data:</strong> Messages, comments, and other communications you send through our platform</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Usage Data:</strong> How you interact with our platform, pages visited, and features used</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                  <li><strong>Location Data:</strong> General location information based on your IP address or GPS coordinates</li>
                  <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section id="how-we-use-information" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Provision:</strong> To provide, maintain, and improve our civic engagement platform</li>
                  <li><strong>Issue Processing:</strong> To process, track, and manage civic issue reports</li>
                  <li><strong>Communication:</strong> To send you updates about your reports, platform changes, and important announcements</li>
                  <li><strong>Account Management:</strong> To create and manage your account, verify your identity, and provide customer support</li>
                  <li><strong>Analytics:</strong> To understand how our platform is used and improve user experience</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                  <li><strong>Safety and Security:</strong> To protect the safety and security of our users and platform</li>
                </ul>
              </div>
            </section>

            <section id="information-sharing" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Government Authorities:</strong> Issue reports and related information may be shared with relevant government departments and agencies for resolution purposes</li>
                  <li><strong>With Service Providers:</strong> We may share information with third-party service providers who help us operate our platform</li>
                  <li><strong>For Legal Reasons:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                  <li><strong>With Your Consent:</strong> We may share information when you explicitly consent to such sharing</li>
                  <li><strong>In Case of Merger:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                </ul>
                <p className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <strong>Note:</strong> We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            <section id="data-security" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement appropriate technical and organizational measures to protect your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> Data is encrypted in transit and at rest using industry-standard encryption protocols</li>
                  <li><strong>Access Controls:</strong> Strict access controls limit who can access your personal information</li>
                  <li><strong>Regular Audits:</strong> We conduct regular security audits and assessments</li>
                  <li><strong>Secure Infrastructure:</strong> Our platform is hosted on secure, monitored infrastructure</li>
                  <li><strong>Staff Training:</strong> Our team is trained on data protection and privacy best practices</li>
                </ul>
                <p className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <strong>Important:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section id="your-rights" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal and operational requirements)</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                  <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
                  <li><strong>Withdrawal of Consent:</strong> Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us at <a href="mailto:privacy@nagarsetu.com" className="text-blue-600 hover:text-blue-700">privacy@nagarsetu.com</a>.</p>
              </div>
            </section>

            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use cookies and similar technologies to enhance your experience:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Security Cookies:</strong> Help protect against fraud and unauthorized access</li>
                </ul>
                <p>You can control cookie settings through your browser preferences, but disabling certain cookies may affect platform functionality.</p>
              </div>
            </section>

            <section id="data-retention" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <div className="space-y-4 text-gray-700">
                <p>We retain your information for as long as necessary to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain historical records for civic engagement purposes</li>
                </ul>
                <p>When we no longer need your information, we will securely delete or anonymize it.</p>
              </div>
            </section>

            <section id="children-privacy" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <p>Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
              </div>
            </section>

            <section id="policy-changes" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>We may update this Privacy Policy from time to time. When we make changes, we will:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Post the updated policy on this page</li>
                  <li>Update the "Last updated" date</li>
                  <li>Notify you of significant changes via email or platform notification</li>
                </ul>
                <p>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
              </div>
            </section>

            <section id="contact-us" className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p><strong>Email:</strong> <a href="mailto:privacy@nagarsetu.com" className="text-blue-600 hover:text-blue-700">privacy@nagarsetu.com</a></p>
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
                This Privacy Policy is effective as of September 7, 2025.
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
