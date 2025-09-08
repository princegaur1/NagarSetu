'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I report a new civic issue?",
      answer: "To report a new issue, click the 'Report Now' button on the homepage or navigate to the report page. Fill in the required details including title, description, category, location, and upload relevant images. Once submitted, you'll receive a unique ticket ID to track your issue."
    },
    {
      id: 2,
      question: "How can I track the status of my reported issue?",
      answer: "You can track your issue status by logging into your account and visiting the 'My Issues' section. You'll also receive email notifications when there are status updates. Use your unique ticket ID to reference your issue when contacting support."
    },
    {
      id: 3,
      question: "What types of issues can I report?",
      answer: "You can report various civic issues including road problems, water supply issues, electricity problems, waste management, public safety concerns, infrastructure issues, and more. Each category is handled by the appropriate department for faster resolution."
    },
    {
      id: 4,
      question: "How long does it take to resolve an issue?",
      answer: "Resolution time varies depending on the complexity and type of issue. Simple issues may be resolved within a few days, while complex infrastructure problems may take weeks. You'll receive regular updates on the progress of your issue."
    },
    {
      id: 5,
      question: "Can I upload images with my report?",
      answer: "Yes, you can upload multiple images to support your report. This helps authorities better understand the issue and take appropriate action. Supported formats include JPG, PNG, and WebP files up to 5MB each."
    },
    {
      id: 6,
      question: "What if my issue is rejected?",
      answer: "If your issue is rejected, you'll receive a detailed explanation. You can appeal the decision or modify your report with additional information. Contact our support team if you believe the rejection was made in error."
    },
    {
      id: 7,
      question: "How do I create an account?",
      answer: "Click on 'Join the Movement' or 'Register' to create your account. You'll need to provide your name, email address, and create a password. After registration, verify your email address to activate your account."
    },
    {
      id: 8,
      question: "Is my personal information secure?",
      answer: "Yes, we take your privacy seriously. Your personal information is encrypted and stored securely. We only share necessary information with relevant authorities to resolve your issues. Read our Privacy Policy for detailed information."
    }
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using our platform",
      icon: "🚀",
      steps: [
        "Create your account",
        "Verify your email address",
        "Complete your profile",
        "Start reporting issues"
      ]
    },
    {
      title: "How to Report Issues Effectively",
      description: "Tips for creating better issue reports",
      icon: "📝",
      steps: [
        "Choose the right category",
        "Write a clear, descriptive title",
        "Provide detailed description",
        "Upload clear, relevant images",
        "Include precise location details"
      ]
    },
    {
      title: "Understanding Issue Status",
      description: "Learn what different statuses mean",
      icon: "📊",
      steps: [
        "Pending: Issue received and under review",
        "In Progress: Work has started on your issue",
        "Resolved: Issue has been fixed",
        "Rejected: Issue doesn't meet criteria"
      ]
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions and learn how to make the most of our platform.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <ul className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
            {searchQuery && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({filteredFAQs.length} results)
              </span>
            )}
          </h2>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">Try searching with different keywords or browse our categories.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@nagarsetu.com"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
