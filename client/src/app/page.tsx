'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import CategoryIcon from '@/components/CategoryIcon';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  city: string;
  created_at: string;
  category_name: string;
  category_color: string;
  reporter_first_name: string;
  reporter_last_name: string;
  images: Array<{
    id: number;
    image_url: string;
    caption: string;
  }>;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export default function HomePage() {
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    inProgressIssues: 0,
    rejectedIssues: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recentIssuesResponse, allIssuesResponse, categoriesResponse] = await Promise.all([
          apiClient.getIssues({ limit: 6 }), // For recent issues display
          apiClient.getIssues({ limit: 100 }), // For statistics calculation
          apiClient.getCategories(),
        ]);

        if (recentIssuesResponse.data?.issues) {
          setRecentIssues(recentIssuesResponse.data.issues);
        }

        if (allIssuesResponse.data?.issues) {
          setStats({
            totalIssues: allIssuesResponse.data.pagination?.total || allIssuesResponse.data.issues.length,
            resolvedIssues: allIssuesResponse.data.issues.filter(
              (issue: Issue) => issue.status === 'resolved'
            ).length,
            inProgressIssues: allIssuesResponse.data.issues.filter(
              (issue: Issue) => issue.status === 'in_progress'
            ).length,
            pendingIssues: allIssuesResponse.data.issues.filter(
              (issue: Issue) => issue.status === 'pending'
            ).length,
            rejectedIssues: allIssuesResponse.data.issues.filter(
              (issue: Issue) => issue.status === 'rejected'
            ).length,
          });
        } 

        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-100 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Empowering Communities, One Issue at a Time
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Nagar Setu 
              <span style={{fontSize: '1.5rem'}} className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Your Voice, Our City's Future.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Bridge the gap between citizens and city administration. 
              Report issues, track progress, and witness real change in your neighborhood through our transparent, collaborative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/report"
                className="group relative inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Report Now
              </Link>
              <Link
                href="/issues"
                className="group inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Issues
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="relative h-24 overflow-hidden">
            {/* Modern geometric pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-blue-50/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <svg className="w-full h-full" viewBox="0 0 1200 64" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.05"/>
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path 
                  d="M0,32 Q300,0 600,32 T1200,32 L1200,64 L0,64 Z" 
                  fill="url(#modernGradient)"
                />
                <path 
                  d="M0,48 Q400,16 800,48 T1200,48 L1200,64 L0,64 Z" 
                  fill="url(#modernGradient)"
                  opacity="0.6"
                />
              </svg>
            </div>
            {/* Floating geometric elements */}
            <div className="absolute bottom-4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-6 right-1/4 w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Making Real Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our community is transforming neighborhoods through active civic participation
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Total Issues */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-2">{stats.totalIssues}</div>
              <div className="text-lg font-semibold text-blue-700 mb-1">Issues Reported</div>
              <div className="text-sm text-blue-600">By active citizens</div>
            </div>
            {/* Resolved Issues */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-green-900 mb-2">{stats.resolvedIssues}</div>
              <div className="text-lg font-semibold text-green-700 mb-1">Issues Fixed</div>
              <div className="text-sm text-green-600">Positive change delivered</div>
            </div>
            {/* In Progress (Pending) */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-yellow-900 mb-2">{stats.pendingIssues}</div>
              <div className="text-lg font-semibold text-yellow-700 mb-1">In Progress</div>
              <div className="text-sm text-yellow-600">Change happening now</div>
            </div>
            {/* Ongoing Issues (In Progress by Authority) */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-2">{stats.inProgressIssues}</div>
              <div className="text-lg font-semibold text-blue-700 mb-1">Ongoing Issues</div>
              <div className="text-sm text-blue-600">Issue in progress by the authority</div>
            </div>
            {/* Rejected Issues */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center border border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-red-900 mb-2">{stats.rejectedIssues}</div>
              <div className="text-lg font-semibold text-red-700 mb-1">Rejected Issues</div>
              <div className="text-sm text-red-600">Issues rejected by the authority</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Your Concern?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the right category to ensure your issue gets to the right people who can help
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/issues?category=${category.id}`}
                className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 hover:border-blue-300"
              >
                <div className="mb-6 flex justify-center">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    style={{ backgroundColor: category.color }}
                  >
                    <CategoryIcon 
                      icon={category.icon} 
                      color="white"
                      size="lg"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-3 text-center transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-center text-blue-600 group-hover:text-blue-700 font-medium text-sm">
                  Report This
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Community Updates</h2>
              <p className="text-xl text-gray-600">See what's happening in your neighborhood right now</p>
            </div>
            <Link
              href="/issues"
              className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              See All Updates
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {recentIssues.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-8">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Reports Yet</h3>
              <p className="text-lg text-gray-500 mb-8">Be the first to make a difference in your community!</p>
              <Link
                href="/report"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start the Change
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/issues/${issue.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
                >
                  {issue.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api').replace('/api','')}${issue.images[0].image_url}`}
                        alt={issue.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(
                            issue.status
                          )}`}
                        >
                          {issue.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getPriorityColor(
                            issue.priority
                          )}`}
                        >
                          {issue.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: issue.category_color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-600">{issue.category_name}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {issue.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {issue.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {issue.city}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(issue.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your City?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join a growing community of changemakers who are building better neighborhoods. 
              Every report counts, every voice matters, every action creates impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="group inline-flex items-center px-10 py-4 bg-white text-blue-900 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Join the Movement
              </Link>
              <Link
                href="/login"
                className="group inline-flex items-center px-10 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Welcome Back
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}