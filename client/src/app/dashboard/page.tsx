'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
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
  category_icon: string;
  reporter_id?: number;
  reporter_email: string;
  images: Array<{
    id: number;
    image_url: string;
    caption: string;
  }>;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  issue_title: string;
  issue_id: number;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [myIssues, setMyIssues] = useState<Issue[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Ensure user is loaded before fetching data
      if (!user || !user.email) {
        console.log('Dashboard: User not loaded yet, skipping data fetch');
        setLoading(false);
        return;
      }
      
      console.log('Dashboard: Fetching data for user:', user.email);
      
      const [issuesResponse, notificationsResponse, unreadResponse] = await Promise.all([
        apiClient.getIssues({ limit: 50 }), // Get more issues to ensure we find user's issues
        apiClient.getNotifications({ limit: 10 }),
        apiClient.getUnreadCount(),
      ]);

      // Handle issues
      if (issuesResponse.data?.issues) {
        console.log('Dashboard: Total issues from API:', issuesResponse.data.issues.length);
        console.log('Dashboard: Current user:', user);
        console.log('Dashboard: Current user email:', user?.email);
        console.log('Dashboard: Sample issue reporter emails:', issuesResponse.data.issues.slice(0, 3).map((i: any) => i.reporter_email));
        
        // Filter issues reported by current user using email since reporter_id might not be available
        if (!user || !user.email) {
          console.log('Dashboard: No user or user email available, setting empty issues');
          setMyIssues([]);
        } else {
          const userIssues = issuesResponse.data.issues.filter(
            (issue: any) => {
              const matches = issue.reporter_email?.toLowerCase() === user?.email?.toLowerCase();
              if (matches) {
                console.log('Dashboard: Found matching issue:', issue.id, issue.title, issue.status);
              }
              return matches;
            }
          );
          console.log('Dashboard: User issues after filtering:', userIssues.length);
          console.log('Dashboard: Setting myIssues to filtered issues:', userIssues);
          setMyIssues(userIssues);
        }
      } else if (Array.isArray(issuesResponse.data)) {
        console.log('Dashboard: Data is direct array, total issues:', issuesResponse.data.length);
        // Handle case where data is directly an array
        if (!user || !user.email) {
          console.log('Dashboard: No user or user email available, setting empty issues');
          setMyIssues([]);
        } else {
          const userIssues = issuesResponse.data.filter(
            (issue: any) => issue.reporter_email?.toLowerCase() === user?.email?.toLowerCase()
          );
          setMyIssues(userIssues);
        }
      }

      // Handle notifications
      if (notificationsResponse.data?.notifications) {
        setNotifications(notificationsResponse.data.notifications);
      } else if (Array.isArray(notificationsResponse.data)) {
        setNotifications(notificationsResponse.data);
      }

      // Handle unread count
      if (unreadResponse.data?.unreadCount !== undefined) {
        setUnreadCount(unreadResponse.data.unreadCount);
      } else if (typeof unreadResponse.data === 'number') {
        setUnreadCount(unreadResponse.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      await apiClient.markNotificationRead(notificationId);
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

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

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user?.firstName}! Here's an overview of your Nagar Setu.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Logged in as: {user?.email} (ID: {user?.id})
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{myIssues.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">
                {myIssues.filter(issue => issue.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {myIssues.filter(issue => issue.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Notifications</p>
              <p className="text-2xl font-semibold text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Issues */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Recent Issues</h2>
            <Link
              href="/issues"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View All
            </Link>
          </div>

          {myIssues.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <p className="text-gray-500 mb-4">You haven't reported any issues yet.</p>
              <Link
                href="/report"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Report Your First Issue
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myIssues.slice(0, 5).map((issue) => (
                <Link
                  key={issue.id}
                  href={`/issues/${issue.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {issue.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            issue.status
                          )}`}
                        >
                          {issue.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            issue.priority
                          )}`}
                        >
                          {issue.priority.toUpperCase()}
                        </span>
                        <div className="flex items-center">
                          <CategoryIcon 
                            icon={issue.category_icon || 'folder'} 
                            color={issue.category_color || '#6B7280'} 
                            size="sm"
                            className="mr-1"
                          />
                          <span className="text-xs text-gray-600">{issue.category_name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 ml-4">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
            <Link
              href="/notifications"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View All
            </Link>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">🔔</div>
              <p className="text-gray-500">No notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    notification.is_read
                      ? 'bg-gray-50'
                      : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      {notification.issue_title && (
                        <p className="text-xs text-blue-600 mt-1">
                          Issue: {notification.issue_title}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 ml-4">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/report"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Report New Issue</h3>
              <p className="text-sm text-gray-600">Report a civic issue in your area</p>
            </div>
          </Link>

          <Link
            href="/issues"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Browse Issues</h3>
              <p className="text-sm text-gray-600">View all Nagar Setu in your area</p>
            </div>
          </Link>

          <Link
            href="/profile"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-purple-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Update Profile</h3>
              <p className="text-sm text-gray-600">Manage your account information</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
